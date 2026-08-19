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
     complète hors-ligne (toutes les pages, tout le JS/CSS, KaTeX
     vendorisé, les icônes).
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
const VERSION = 142;
const CACHE_NAME = 'l1maths-v' + VERSION;

/* Fichiers versionnés (?v=VERSION dans les balises <link>/<script> de
   chaque page, voir scripts/check-versions.sh) — la query string est
   ajoutée ci-dessous, pas ici, pour ne pas la dupliquer 30 fois. */
const VERSIONED_FILES = [
  'style.css',
  'app.js', 'changelog.js', 'creature-svgs.js', 'creature.js',
  'knight-svgs.js', 'knight.js', 'menu.js', 'mistakes.js', 'music.js',
  'notation.js', 'progression-page.js', 'progression.js', 'pwa.js',
  'revision.js', 'scene.js', 'tooltips.js', 'victory.js', 'weekly.js',
  'fiches/algebre.js', 'fiches/analyse.js', 'fiches/calculus.js',
  'fiches/fiche-engine.js', 'fiches/java.js', 'fiches/logique.js',
  'fiches/probabilites.js', 'fiches/python.js', 'fiches/statistiques.js',
];

/* Fichiers sans query string de version (pages HTML — l'URL de la
   page elle-même n'a jamais de ?v=, seuls les <link>/<script> qu'elle
   contient en ont un ; KaTeX vendorisé, icônes, manifest — aucun de
   ces trois n'est versionné avec le reste du site). */
const STATIC_FILES = [
  './', 'index.html', 'changelog.html', 'mistakes.html', 'notation.html',
  'progression.html', 'revision.html',
  'fiches/algebre.html', 'fiches/analyse.html', 'fiches/calculus.html',
  'fiches/java.html', 'fiches/logique.html', 'fiches/probabilites.html',
  'fiches/python.html', 'fiches/statistiques.html',
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
