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

function initPullToRefresh(){
  if(!isStandaloneWebApp()) return;

  const PULL_THRESHOLD = 70; // px à tirer avant que le relâchement déclenche le rafraîchissement
  const PULL_MAX = 100;      // au-delà, le spinner ne descend plus (résistance)

  const indicator = document.createElement('div');
  indicator.id = 'pullRefreshIndicator';
  indicator.setAttribute('aria-hidden', 'true');
  indicator.innerHTML = '<span class="pull-refresh-spinner"></span>';
  document.body.appendChild(indicator);

  let startY = null;
  let tracking = false; // le doigt a démarré en haut de la page, on suit le geste
  let refreshing = false;

  function pageScrollTop(){
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function reset(){
    indicator.style.transform = '';
    indicator.classList.remove('visible', 'ready');
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
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if(!tracking){ startY = null; return; }
    const ready = indicator.classList.contains('ready');
    tracking = false;
    startY = null;
    if(ready){
      refreshing = true;
      indicator.classList.add('spinning');
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
