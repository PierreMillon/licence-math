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

function initPullToRefresh(){
  if(!isStandaloneWebApp()) return;

  const PULL_THRESHOLD = 70; // px à tirer avant que le relâchement déclenche le rafraîchissement
  const PULL_MAX = 100;      // au-delà, le spinner ne descend plus (résistance)
  const SPIN_MAX_DEG_PER_PULL_PX = 6; // plus on tire, plus la pièce tourne vite

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
  let spinDeg = 0;

  function pageScrollTop(){
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function reset(){
    indicator.style.transform = '';
    coin.style.transform = '';
    coin.classList.remove('spinning');
    indicator.classList.remove('visible', 'ready');
    spinDeg = 0;
  }

  document.addEventListener('touchstart', (e) => {
    if(refreshing || e.touches.length !== 1) return;
    if(pageScrollTop() > 0){ startY = null; tracking = false; return; }
    startY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if(!tracking || startY === null || refreshing) return;
    const dy = e.touches[0].clientY - startY;
    if(dy <= 0 || pageScrollTop() > 0){ reset(); return; }
    const pull = Math.min(dy, PULL_MAX);
    indicator.style.transform = `translateY(${pull}px)`;
    indicator.classList.add('visible');
    indicator.classList.toggle('ready', pull >= PULL_THRESHOLD);
    // La pièce tourne d'autant plus vite qu'on tire loin — vitesse
    // proportionnelle à la distance tirée, pas juste un on/off.
    spinDeg += (pull / PULL_MAX) * SPIN_MAX_DEG_PER_PULL_PX;
    coin.style.transform = `rotateY(${spinDeg}deg)`;
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if(!tracking){ startY = null; return; }
    const ready = indicator.classList.contains('ready');
    tracking = false;
    startY = null;
    if(ready){
      refreshing = true;
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
