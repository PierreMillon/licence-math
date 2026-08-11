/* ============================================================
   L1 MATHS — SYNTHÈSE — pwa.js
   Petit indicateur de "tirer pour rafraîchir" (pull-to-refresh),
   chargé sur toutes les pages (index + fiches).

   Pourquoi ce fichier existe : sur un navigateur normal, glisser la
   page vers le bas quand on est en haut affiche le spinner natif du
   navigateur (Safari/Chrome). Mais une fois le site ajouté à l'écran
   d'accueil de l'iPhone (voir apple-mobile-web-app-capable dans le
   <head>), il s'ouvre en plein écran SANS la barre du navigateur —
   et donc sans son spinner natif non plus. Glisser vers le bas ne
   fait alors plus rien de visible, ce qui donne l'impression que le
   rafraîchissement a disparu (demande explicite du 11/08/2026).

   Ce script ne s'active QUE dans ce mode "plein écran" (standalone/
   ajouté à l'écran d'accueil) : sur un onglet de navigateur classique,
   le spinner natif suffit déjà, pas besoin de le dupliquer.
   ============================================================ */

function isStandaloneWebApp(){
  // navigator.standalone : iOS Safari (ajouté à l'écran d'accueil).
  // display-mode:standalone : couvre aussi Android/Chrome installé.
  return window.navigator.standalone === true ||
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
}

/* Petite pièce d'or (même dessin que COIN_SMALL_SVG, creature-svgs.js
   — copiée ici plutôt qu'importée : pwa.js est chargé sur TOUTES les
   pages, y compris celles qui ne chargent pas creature-svgs.js comme
   changelog/notation/mistakes/progression/revision). Elle tourne sur
   elle-même de plus en plus vite à mesure qu'on tire vers le bas
   (demande explicite du 11/08/2026 : "un petit logo qui s'affiche et
   qui tourne" pour qu'on comprenne que ça va rafraîchir). */
const PULL_REFRESH_COIN_SVG = '<svg viewBox="0 0 9 9" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true"><rect x="0" y="2" width="1" height="1"/><rect x="0" y="3" width="1" height="1"/><rect x="0" y="4" width="1" height="1"/><rect x="0" y="5" width="1" height="1"/><rect x="0" y="6" width="1" height="1"/><rect x="1" y="1" width="1" height="1"/><rect x="1" y="2" width="1" height="1"/><rect x="1" y="3" width="1" height="1"/><rect x="1" y="4" width="1" height="1"/><rect x="1" y="5" width="1" height="1"/><rect x="1" y="6" width="1" height="1"/><rect x="1" y="7" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="2" y="5" width="1" height="1"/><rect x="2" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="0" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/><rect x="3" y="2" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="3" y="4" width="1" height="1"/><rect x="3" y="5" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="3" y="7" width="1" height="1"/><rect x="3" y="8" width="1" height="1"/><rect x="4" y="0" width="1" height="1"/><rect x="4" y="1" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="4" y="3" width="1" height="1"/><rect x="4" y="4" width="1" height="1"/><rect x="4" y="5" width="1" height="1"/><rect x="4" y="6" width="1" height="1"/><rect x="4" y="7" width="1" height="1"/><rect x="4" y="8" width="1" height="1"/><rect x="5" y="0" width="1" height="1"/><rect x="5" y="1" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="5" y="3" width="1" height="1"/><rect x="5" y="4" width="1" height="1"/><rect x="5" y="5" width="1" height="1"/><rect x="5" y="6" width="1" height="1"/><rect x="5" y="7" width="1" height="1"/><rect x="5" y="8" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="6" y="4" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="6" y="6" width="1" height="1"/><rect x="6" y="7" width="1" height="1"/><rect x="7" y="1" width="1" height="1"/><rect x="7" y="2" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="7" y="4" width="1" height="1"/><rect x="7" y="5" width="1" height="1"/><rect x="7" y="6" width="1" height="1"/><rect x="7" y="7" width="1" height="1"/><rect x="8" y="2" width="1" height="1"/><rect x="8" y="3" width="1" height="1"/><rect x="8" y="4" width="1" height="1"/><rect x="8" y="5" width="1" height="1"/><rect x="8" y="6" width="1" height="1"/></svg>';

/* Zones à ignorer pour le geste de tirage : des éléments qui ont déjà
   leur propre interaction tactile en haut de page (barre de
   progression globale — grade-tooltip, app.js — et toute zone
   d'infobulle, tooltips.js). Sans ça, poser le doigt dessus déclenche
   AUSSI le pull-to-refresh en plus de leur propre geste — bug constaté
   le 11/08/2026 sur la barre de progression de l'accueil. */
const PULL_REFRESH_IGNORE_SELECTOR = '#globalProgressBar, .grade-block-wrap, [data-tooltip]';

function initPullToRefresh(){
  if(!isStandaloneWebApp()) return;

  const PULL_THRESHOLD = 70; // px à tirer avant que le relâchement déclenche le rafraîchissement
  const PULL_MAX = 100;      // au-delà, le spinner ne descend plus (résistance)
  // La pièce apparaît dès qu'on tire un peu, mais ne se met à tourner
  // TOUTE SEULE (animation CSS, indépendante du geste) qu'à partir de
  // cette fraction du seuil — de plus en plus vite à l'approche du
  // seuil, comme une toupie qu'on lance (demande explicite du
  // 11/08/2026 : avant, la rotation suivait le doigt image par image
  // et s'arrêtait dès qu'on arrêtait de bouger, ce n'était pas ça).
  const SPIN_START_FRACTION = 0.35;
  const SPIN_DURATION_MAX_S = 1.1; // vitesse au tout début de la rotation
  const SPIN_DURATION_MIN_S = 0.25; // vitesse une fois le seuil atteint

  const indicator = document.createElement('div');
  indicator.id = 'pullRefreshIndicator';
  indicator.setAttribute('aria-hidden', 'true');
  const coin = document.createElement('span');
  coin.className = 'pull-refresh-coin';
  coin.innerHTML = PULL_REFRESH_COIN_SVG;
  indicator.appendChild(coin);
  document.body.appendChild(indicator);

  let startY = null;
  let tracking = false; // le doigt a démarré en haut de la page, on suit le geste
  let refreshing = false;

  function pageScrollTop(){
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  /* Sélection de texte en cours (11/08/2026, bug rapporté) : sur la
     page changelog, glisser le doigt pour étendre une sélection de
     texte déclenchait AUSSI le pull-to-refresh — au relâchement, la
     page rechargeait avant d'avoir pu appuyer sur "Copier". Si une
     sélection non vide existe, on abandonne le geste de rafraîchissement. */
  function hasActiveSelection(){
    const sel = window.getSelection && window.getSelection();
    return !!(sel && sel.toString().length > 0);
  }

  function reset(){
    indicator.style.transform = '';
    coin.style.animationDuration = '';
    coin.classList.remove('spinning');
    indicator.classList.remove('visible', 'ready');
  }

  document.addEventListener('touchstart', (e) => {
    if(refreshing || e.touches.length !== 1) return;
    if(pageScrollTop() > 0){ startY = null; tracking = false; return; }
    if(e.target.closest && e.target.closest(PULL_REFRESH_IGNORE_SELECTOR)){ startY = null; tracking = false; return; }
    if(hasActiveSelection()){ startY = null; tracking = false; return; }
    startY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if(!tracking || startY === null || refreshing) return;
    if(hasActiveSelection()){ tracking = false; startY = null; reset(); return; }
    const dy = e.touches[0].clientY - startY;
    if(dy <= 0 || pageScrollTop() > 0){ reset(); return; }
    const pull = Math.min(dy, PULL_MAX);
    indicator.style.transform = `translateY(${pull}px)`;
    indicator.classList.add('visible');
    const ready = pull >= PULL_THRESHOLD;
    indicator.classList.toggle('ready', ready);

    const spinStartPull = PULL_THRESHOLD * SPIN_START_FRACTION;
    if(pull >= spinStartPull){
      const t = Math.min(1, (pull - spinStartPull) / (PULL_THRESHOLD - spinStartPull));
      const duration = SPIN_DURATION_MAX_S + (SPIN_DURATION_MIN_S - SPIN_DURATION_MAX_S) * t;
      coin.style.animationDuration = duration + 's';
      coin.classList.add('spinning');
    }else{
      coin.classList.remove('spinning');
      coin.style.animationDuration = '';
    }
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if(!tracking){ startY = null; return; }
    const ready = indicator.classList.contains('ready');
    tracking = false;
    startY = null;
    if(ready){
      refreshing = true;
      coin.style.animationDuration = SPIN_DURATION_MIN_S + 's';
      coin.classList.add('spinning'); // tourne en continu (CSS) pendant le rechargement
      indicator.style.transform = `translateY(${PULL_THRESHOLD}px)`;
      window.location.reload();
    }else{
      reset();
    }
  }, { passive: true });

  document.addEventListener('touchcancel', () => {
    tracking = false;
    startY = null;
    if(!refreshing) reset();
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initPullToRefresh);
