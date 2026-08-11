#!/usr/bin/env bash
# Non-régression visuelle de la scène de combat (page d'accueil).
# Ajouté le 11/08/2026 (voir CLAUDE.md, "fragilité des positions
# absolues") : full_regression2.js ne vérifie que l'absence d'erreurs
# JS, jamais l'apparence — ça n'aurait pas attrapé la bulle de
# l'oiseau qui a chevauché le château. Ce script capture l'état
# actuel et le compare à une image de référence.
#
# Usage :
#   scripts/visual_regression.sh            → compare à la référence existante
#   scripts/visual_regression.sh --baseline → (re)crée la référence (à faire
#                                               volontairement après un vrai
#                                               changement visuel du décor)
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "${1:-}" = "--baseline" ]; then
  node scripts/visual_capture.js baseline
  echo "Référence recréée. Vérifie-la à l'œil avant de la commiter (scripts/visual-baselines/)."
  exit 0
fi

node scripts/visual_capture.js check
python3 scripts/visual_diff.py \
  scripts/visual-baselines/battle-scene.png \
  scripts/visual-check/battle-scene.png \
  --diff-out scripts/visual-check/battle-scene-diff.png
