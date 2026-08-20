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

/* Zones à ignorer pour le geste de tirage : toute zone d'infobulle
   (tooltips.js) a déjà sa propre interaction tactile. Sans ça, poser
   le doigt dessus déclenche AUSSI le pull-to-refresh en plus de son
   propre geste — bug constaté le 11/08/2026 sur la barre de
   progression de l'accueil (barre globale depuis retirée le
   19/08/2026, voir CLAUDE.md — la barre hebdomadaire restante est
   déjà couverte par [data-tooltip]). */
const PULL_REFRESH_IGNORE_SELECTOR = '[data-tooltip]';

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

/* ---------- révélation de la phrase de sagesse / ligne de séparation
   en bas de page (11/08/2026, demande explicite) ---------- */
/* Normalement masquée (max-height:0, voir .footer-reveal, style.css)
   — ne se montre qu'en forçant le glissement au-delà du vrai bas de
   la page (rebond natif iOS/Android), PAS un tiré pour rafraîchir :
   aucun rechargement déclenché ("ce n'est pas un tiré pour
   rafraîchir", demande explicite de Pierre). Contrairement à
   initPullToRefresh ci-dessus, marche PARTOUT (onglet classique ou
   PWA) — pas de garde isStandaloneWebApp() ici, la réponse de Pierre
   sur ce point décrivait un geste générique, pas propre au mode
   plein écran. */
/* Distance minimale de tiré (px) avant qu'un relâchement recharge une
   nouvelle phrase (12/08/2026, demande explicite : "à chaque fois on
   a envie de tirer" — effet loterie/machine à sous assumé). Volontai-
   rement > 0 : un tout petit tremblement de doigt qui arme puis
   relâche tout de suite ne doit pas grill er une phrase pour rien. */
const PHRASE_RELOAD_MIN_DRAG = 20;

/* Recharge la phrase du pied de page — fonctions différentes selon la
   page (renderEndPhrase pour #ficheEndPhrase, menu.js, chargé partout ;
   renderFooterCycle pour #footerHint, app.js, uniquement sur l'accueil)
   : on appelle celle qui existe, l'autre est simplement absente de
   `window` sur les pages où elle ne s'applique pas. Sur les 5 pages à
   étiquette fixe (progression/mistakes/revision/changelog/notation),
   aucune des deux n'existe/ne trouve son élément : no-op silencieux. */
function reloadFooterPhrase(){
  if(typeof window.renderEndPhrase === 'function') window.renderEndPhrase();
  if(typeof window.renderFooterCycle === 'function') window.renderFooterCycle();
}

function initFooterReveal(){
  const wrap = document.querySelector('.footer-reveal');
  if(!wrap) return;

  let startY = null;
  let armed = false;   // le doigt a démarré alors qu'on était déjà au vrai bas de la page
  let dragging = false;
  let maxDy = 0;        // tiré maximum atteint pendant le geste (voir PHRASE_RELOAD_MIN_DRAG)

  function isAtBottom(){
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    return window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
  }
  // Même garde que initPullToRefresh (sélection de texte en cours) :
  // sans ça, étendre une sélection près du bas de page pourrait aussi
  // révéler ce bloc.
  function hasActiveSelection(){
    const sel = window.getSelection && window.getSelection();
    return !!(sel && sel.toString().length > 0);
  }
  function collapse(){
    wrap.style.transition = 'max-height .3s ease';
    wrap.style.maxHeight = '0px';
  }

  document.addEventListener('touchstart', (e) => {
    if(e.touches.length !== 1){ armed = false; startY = null; return; }
    armed = isAtBottom() && !hasActiveSelection();
    startY = armed ? e.touches[0].clientY : null;
    dragging = false;
    maxDy = 0;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if(!armed || startY === null) return;
    if(hasActiveSelection()){ armed = false; startY = null; if(dragging) collapse(); dragging = false; return; }
    // dy positif si le doigt continue de "pousser" la page vers le bas
    // alors qu'il n'y a déjà plus rien à faire défiler — le geste de
    // rebond qu'on détourne ici.
    const dy = startY - e.touches[0].clientY;
    if(dy <= 0){ if(dragging) collapse(); dragging = false; return; }
    dragging = true;
    if(dy > maxDy) maxDy = dy;
    wrap.style.transition = 'none';
    wrap.style.maxHeight = Math.min(dy, wrap.scrollHeight) + 'px';
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if(dragging){
      // Nouvelle phrase posée AVANT le repli (pas après) : on la voit
      // apparaître un instant pendant que le bloc se referme, retour
      // visuel immédiat que le tiré a "fait quelque chose" — donne
      // envie de retirer pour en voir une autre.
      if(maxDy >= PHRASE_RELOAD_MIN_DRAG) reloadFooterPhrase();
      collapse();
    }
    armed = false;
    startY = null;
    dragging = false;
    maxDy = 0;
  }, { passive: true });

  document.addEventListener('touchcancel', () => {
    if(dragging) collapse();
    armed = false;
    startY = null;
    dragging = false;
    maxDy = 0;
  }, { passive: true });
}

/* ---------- service worker (mode hors-ligne, 18/08/2026) ----------
   Enregistré ici plutôt que dans menu.js : pwa.js est déjà le fichier
   dédié à tout ce qui touche au comportement PWA/plein écran du site,
   chargé sur toutes les pages juste après menu.js. Garde de support
   standard (`'serviceWorker' in navigator`) — les navigateurs qui ne
   le supportent pas continuent de fonctionner normalement, juste sans
   le mode hors-ligne. La mise à jour (nouveau sw.js détecté) est un
   comportement natif du navigateur à chaque visite avec réseau, rien
   à coder ici pour ça — voir sw.js pour le détail de la stratégie. */
function registerServiceWorker(){
  if(!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('sw.js').catch(() => {
    // Échec silencieux (ex. sw.js indisponible) : le site continue de
    // fonctionner normalement, juste sans le mode hors-ligne.
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPullToRefresh();
  initFooterReveal();
  registerServiceWorker();
});
