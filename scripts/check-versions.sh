#!/usr/bin/env bash
# Vérifie que SITE_VERSION (menu.js) correspond à tous les paramètres
# ?v=N des <link>/<script> locaux dans les fichiers HTML du site.
# Un décalage est exactement le bug du 2026-08-03 documenté en tête
# de menu.js : le navigateur sert alors une version en cache.
set -euo pipefail

cd "$(dirname "$0")/.."

SITE_VERSION=$(grep -oE "const SITE_VERSION = [0-9]+;" menu.js | grep -oE "[0-9]+")
if [ -z "$SITE_VERSION" ]; then
  echo "Impossible de lire SITE_VERSION dans menu.js" >&2
  exit 1
fi
echo "SITE_VERSION = $SITE_VERSION"

fail=0

# sw.js a sa propre constante VERSION (nom de cache) qui doit avancer en
# même temps que SITE_VERSION — sinon soit le service worker sert
# indéfiniment une vieille version en cache, soit il précache des ?v=
# qui ne correspondent à aucune entrée jamais mise à jour. Voir sw.js.
SW_VERSION=$(grep -oE "const VERSION = [0-9]+;" sw.js | grep -oE "[0-9]+" || true)
if [ -z "$SW_VERSION" ]; then
  echo "Impossible de lire VERSION dans sw.js" >&2
  exit 1
fi
if [ "$SW_VERSION" != "$SITE_VERSION" ]; then
  echo "::error file=sw.js::VERSION ($SW_VERSION) désynchronisé de SITE_VERSION ($SITE_VERSION)"
  fail=1
fi

# sw.js ne précharge que les chapitres actifs (ACTIVE_CHAPTER_IDS,
# audit du 08/09/2026 — les chapitres masqués sont de toute façon
# injoignables, les précharger gonflerait le 1er chargement pour rien).
# Cette liste doit rester synchronisée avec CHAPTERS.filter(active) de
# chapters.js — sinon un chapitre nouvellement activé resterait non
# précaché (hors-ligne cassé dessus), ou un chapitre redésactivé
# resterait précaché pour rien.
CHAPTERS_ACTIVE=$(grep -oE "id: '[a-z]+'[^}]*active: true" chapters.js | grep -oE "id: '[a-z]+'" | grep -oE "[a-z]+'" | tr -d "'" | sort)
SW_ACTIVE=$(grep -oE "const ACTIVE_CHAPTER_IDS = \[[^]]*\]" sw.js | grep -oE "'[a-z]+'" | tr -d "'" | sort)
if [ "$CHAPTERS_ACTIVE" != "$SW_ACTIVE" ]; then
  echo "::error file=sw.js::ACTIVE_CHAPTER_IDS désynchronisé de CHAPTERS.filter(active) (chapters.js)"
  echo "  chapters.js (actifs) : $(echo "$CHAPTERS_ACTIVE" | tr '\n' ' ')"
  echo "  sw.js ACTIVE_CHAPTER_IDS : $(echo "$SW_ACTIVE" | tr '\n' ' ')"
  fail=1
fi
while IFS= read -r -d '' file; do
  # ?v=N sur des fichiers locaux uniquement (pas les CDN externes type Google Fonts)
  mismatches=$(grep -oE '(href|src)="[^"]*\?v=[0-9]+"' "$file" | grep -v "fonts.googleapis" | grep -oE '\?v=[0-9]+' | grep -oE '[0-9]+' | sort -u | grep -v "^${SITE_VERSION}$" || true)
  if [ -n "$mismatches" ]; then
    echo "::error file=$file::paramètre(s) ?v= désynchronisé(s) de SITE_VERSION ($SITE_VERSION) : $mismatches"
    fail=1
  fi
done < <(find . -name "*.html" -not -path "./.git/*" -print0)

if [ "$fail" -ne 0 ]; then
  echo "Des fichiers HTML ont un ?v= différent de SITE_VERSION=$SITE_VERSION." >&2
  exit 1
fi
echo "OK — tous les ?v= sont synchronisés avec SITE_VERSION=$SITE_VERSION."
