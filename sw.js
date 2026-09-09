/* ============================================================
   L1 MATHS — SYNTHÈSE — sw.js
   Service worker : mode hors-ligne minimal mais complet — une fois le
   site visité une première fois avec réseau, cache-first offre à la
   fois vitesse et fonctionnement à 100% en avion (recharger la page
   ne casse rien, contrairement à un site qui ne ferait que du
   "add to home screen" sans service worker).

   Stratégie volontairement simple, cohérente avec le reste du site
   (statique, pas d'API, pas de données à synchroniser) :
   - install  : précharge tout ce qu'il faut pour une utilisation
     complète hors-ligne (toutes les pages génériques, tout le JS/CSS
     partagé, KaTeX vendorisé, les icônes) — SAUF les fiches des
     chapitres pas encore actifs (voir ACTIVE_CHAPTER_IDS ci-dessous) :
     elles sont de toute façon bloquées en accès direct par la garde
     de chapters.js (voir CLAUDE.md, "chapitres masqués"), donc
     injoignables par navigation normale — les précharger ne ferait
     que gonfler le tout premier téléchargement pour du contenu
     invisible (audit du 08/09/2026, ~7 chapitres sur 8 concernés
     actuellement).
   - activate : supprime les anciens caches (versions précédentes du
     site) pour ne jamais accumuler de fichiers obsolètes.
   - fetch    : sert depuis le cache en priorité (cache-first) — plus
     rapide, et ne dépend du réseau que pour aller chercher une
     MISE À JOUR (nouveau sw.js, détecté automatiquement par le
     navigateur à chaque visite quand il y a du réseau ; rien de
     spécial à coder pour ça, comportement natif des service workers).
   Google Fonts et le script goatcounter (analytics) NE SONT PAS mis
   en cache : ce sont des ressources externes non essentielles — le
   site doit rester utilisable sans elles (police de secours déjà
   gérée, voir menu.js/typesetMath), pas la peine de bloquer
   l'installation du cache dessus ni de les stocker.

   VERSION doit être bumpée en même temps que SITE_VERSION (menu.js)
   à CHAQUE ship — vérifié par scripts/check-versions.sh, comme les
   ?v= des balises <link>/<script>. Sans ça : soit le service worker
   sert indéfiniment une vieille version en cache (VERSION pas
   montée), soit il retélécharge tout à chaque visite sans jamais
   trouver le cache à jour (des ?v= qui ne correspondent à aucune
   entrée précachée). */
const VERSION = 152;
const CACHE_NAME = 'l1maths-v' + VERSION;

/* Fiche HTML/JS de chaque chapitre — pas un import de chapters.js
   (un service worker n'a pas de `window`, et la garde d'accès direct
   de chapters.js plante sans lui) : cette table reste une copie
   volontairement séparée, à tenir synchronisée avec CHAPTERS
   (chapters.js) à chaque activation/désactivation de chapitre —
   vérifié par scripts/check-versions.sh (compare ACTIVE_CHAPTER_IDS
   ci-dessous à CHAPTERS.filter(active) de chapters.js). */
const CHAPTER_FICHE_FILES = {
  logique:      { html: 'fiches/logique.html',      js: 'fiches/logique.js' },
  calculus:     { html: 'fiches/calculus.html',     js: 'fiches/calculus.js' },
  algebre:      { html: 'fiches/algebre.html',      js: 'fiches/algebre.js' },
  analyse:      { html: 'fiches/analyse.html',      js: 'fiches/analyse.js' },
  probabilites: { html: 'fiches/probabilites.html', js: 'fiches/probabilites.js' },
  statistiques: { html: 'fiches/statistiques.html', js: 'fiches/statistiques.js' },
  java:         { html: 'fiches/java.html',         js: 'fiches/java.js' },
  python:       { html: 'fiches/python.html',       js: 'fiches/python.js' },
};
const ACTIVE_CHAPTER_IDS = ['calculus', 'algebre'];

/* Fichiers versionnés (?v=VERSION dans les balises <link>/<script> de
   chaque page, voir scripts/check-versions.sh) — la query string est
   ajoutée ci-dessous, pas ici, pour ne pas la dupliquer 30 fois. */
const VERSIONED_FILES = [
  'style.css',
  'app.js', 'chapters.js', 'changelog.js', 'creature-svgs.js', 'creature.js',
  'knight-svgs.js', 'knight.js', 'menu.js', 'mistakes.js', 'music.js',
  'notation.js', 'progression-page.js', 'progression.js', 'pwa.js',
  'revision.js', 'scene.js', 'tooltips.js', 'victory.js', 'weekly.js',
  'fiches/fiche-engine.js',
  ...ACTIVE_CHAPTER_IDS.map(id => CHAPTER_FICHE_FILES[id].js),
];

/* Fichiers sans query string de version (pages HTML — l'URL de la
   page elle-même n'a jamais de ?v=, seuls les <link>/<script> qu'elle
   contient en ont un ; KaTeX vendorisé, icônes, manifest — aucun de
   ces trois n'est versionné avec le reste du site). */
const STATIC_FILES = [
  './', 'index.html', 'changelog.html', 'mistakes.html', 'notation.html',
  'progression.html', 'revision.html',
  ...ACTIVE_CHAPTER_IDS.map(id => CHAPTER_FICHE_FILES[id].html),
  'manifest.json',
  'vendor/katex/katex.min.css', 'vendor/katex/katex.min.js',
  'vendor/katex/auto-render.min.js',
  'vendor/katex/fonts/KaTeX_AMS-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Main-Bold.woff2',
  'vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Italic.woff2',
  'vendor/katex/fonts/KaTeX_Main-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2',
  'vendor/katex/fonts/KaTeX_Math-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2',
  'vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Script-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size1-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size2-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size3-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Size4-Regular.woff2',
  'vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2',
  'icons/apple-touch-icon.png', 'icons/icon-16.png', 'icons/icon-32.png',
  'icons/icon-192.png', 'icons/icon-512.png',
];

const PRECACHE_URLS = STATIC_FILES.concat(
  VERSIONED_FILES.map(f => f + '?v=' + VERSION)
);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      // skipWaiting : la nouvelle version prend la main dès son
      // installation terminée, sans attendre la fermeture de tous les
      // onglets — cohérent avec "se reconnecte juste pour les mises à
      // jour" (demande explicite) plutôt qu'un service worker qui
      // reste bloqué sur l'ancienne version tant qu'un onglet traîne.
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Laisse passer tel quel tout ce qui n'est pas sur ce domaine
  // (Google Fonts, goatcounter) — jamais mis en cache, jamais ce qui
  // bloque le mode hors-ligne du reste du site s'ils sont injoignables.
  if(url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
