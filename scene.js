/* ============================================================
   L1 MATHS — SYNTHÈSE — scene.js
   Habillage de la scène de combat de la page d'accueil :
   - le chevalier (personnage complet, en couleur) posé dans la
     zone chevalier, à côté du système de pièces d'équipement
     existant (inchangé) ;
   - l'oiseau posé entre le dragon (mascotte de progression,
     creature.js) et le chevalier, qui cligne des yeux à un
     intervalle aléatoire entre 3 et 10 secondes ;
   - un petit monstre qui traverse le bas de l'écran après 3
     minutes sans la moindre activité (souris, clavier, tactile,
     scroll), avec un bruitage synthétisé. Se réarme à chaque
     traversée pour recommencer après une nouvelle pause de 3 min.
   Chargé uniquement sur la page d'accueil, après creature-svgs.js
   et menu.js (pour les fonctions audio partagées).
   ============================================================ */

/* ---------- chevalier (personnage complet) ---------- */
function renderKnightGirl(){
  const el = document.getElementById('knightGirl');
  if(!el || typeof KNIGHT_GIRL_SVG === 'undefined') return;
  el.innerHTML = KNIGHT_GIRL_SVG;
}

/* ---------- lune, dans le ciel au-dessus du château ---------- */
function renderSceneMoon(){
  const el = document.getElementById('sceneMoon');
  if(!el || typeof MOON_SVG === 'undefined') return;
  el.innerHTML = MOON_SVG;
  applyMoonPhase(el);
}

/* Phase réelle de la lune, calculée localement (aucune API/réseau —
   cohérent avec le reste du site, ex. transfert de progression par
   phrase). Approximation classique (précision ~1 jour) : fraction de
   cycle lunaire écoulée depuis une nouvelle lune de référence connue,
   puis fraction éclairée déduite par la formule standard
   (1-cos(2π·phase))/2 (0 à la nouvelle lune, 1 à la pleine lune).
   Représentée en couvrant la partie NON éclairée du dessin (clip-path,
   pas un nouveau dessin par phase) : un croissant qui grandit/
   rétrécit avec la vraie date du jour, jusqu'au disque plein complet
   à la pleine lune. Fonctionne sur tout le cycle depuis que MOON_SVG
   est un disque plein (redessiné le 10/08/2026 — un croissant fixe
   ne pouvait pas représenter une vraie pleine lune, seule la partie
   déjà visible du croissant restait affichée quel que soit le clip). */
function moonPhaseFraction(date){
  const LUNAR_CYCLE_S = 2551443; // 29,53059 jours
  const KNOWN_NEW_MOON_S = Date.UTC(1970, 0, 7, 20, 35, 0) / 1000;
  const elapsed = (date.getTime() / 1000) - KNOWN_NEW_MOON_S;
  return (((elapsed % LUNAR_CYCLE_S) + LUNAR_CYCLE_S) % LUNAR_CYCLE_S) / LUNAR_CYCLE_S;
}

function applyMoonPhase(el){
  const phase = moonPhaseFraction(new Date());
  const illuminated = (1 - Math.cos(2 * Math.PI * phase)) / 2; // 0..1
  const hiddenPct = Math.round((1 - illuminated) * 100);
  el.style.clipPath = `inset(0 0 0 ${hiddenPct}%)`;
}

/* ---------- château + grotte, en arrière-plan au-dessus des personnages ---------- */
/* Le chevalier descend du château pour affronter le dragon, qui vit
   dans la grotte juste sous ses fondations — métaphore assumée : on ne
   se bat pas contre quelqu'un d'autre, on va chercher en soi-même
   (sous ses propres fondations) quelque chose qu'il faut mériter. */
function renderSceneCastle(){
  const castleEl = document.getElementById('sceneCastle');
  if(castleEl && typeof CASTLE_SVG !== 'undefined') castleEl.innerHTML = CASTLE_SVG;

  const caveEl = document.getElementById('sceneCave');
  if(caveEl && typeof CAVE_SVG !== 'undefined') caveEl.innerHTML = CAVE_SVG;
}

/* ---------- oiseau : clin d'œil aléatoire (3 à 10 s) ---------- */
function initSceneBird(){
  const el = document.getElementById('sceneBird');
  if(!el || typeof BIRD_SVG === 'undefined') return;

  /* Tant que la mascotte de progression est encore un oiseau (peu de
     retard), pas la peine d'en afficher un deuxième juste à côté :
     l'oiseau décoratif n'apparaît qu'une fois le dragon sorti. */
  const lateness = typeof window.getCreatureLateness === 'function' ? window.getCreatureLateness() : 2;
  if(lateness <= 1){
    el.hidden = true;
    return;
  }

  let blinking = false;
  function render(){
    el.innerHTML = blinking ? BIRD_SVG_BLINK : BIRD_SVG;
  }
  function scheduleNext(){
    const delay = 3000 + Math.random() * 7000; // 3 à 10 s
    setTimeout(() => {
      blinking = true;
      render();
      setTimeout(() => {
        blinking = false;
        render();
        scheduleNext();
      }, 140); // durée du clignement
    }, delay);
  }

  render();
  scheduleNext();
}

/* ---------- aligne le bas de l'oiseau sur le bas du chevalier ---------- */
/* La colonne du chevalier contient aussi les pièces d'or gagnées sous
   elle : son bord bas (utilisé par align-items:flex-end de la rangée)
   n'est donc pas au niveau des pieds du chevalier, mais plus bas.
   Un margin-bottom fixe en CSS ne peut pas suivre une hauteur de
   colonne variable (le nombre de pièces peut faire changer de ligne)
   → mesure réelle des deux SVG et ajustement au pixel près. */
function alignSceneBird(){
  const bird = document.getElementById('sceneBird');
  const knightGirl = document.getElementById('knightGirl');
  if(!bird || bird.hidden || !knightGirl) return;
  const birdSvg = bird.querySelector('svg');
  const knightSvg = knightGirl.querySelector('svg');
  if(!birdSvg || !knightSvg) return;

  const birdRect = birdSvg.getBoundingClientRect();
  const knightRect = knightSvg.getBoundingClientRect();
  if(birdRect.height === 0 || knightRect.height === 0) return; // pas encore rendu

  const delta = knightRect.bottom - birdRect.bottom;
  const currentMargin = parseFloat(getComputedStyle(bird).marginBottom) || 0;
  bird.style.marginBottom = (currentMargin + delta) + 'px';
}

/* ---------- aligne le bas de la mascotte (oiseau/dragon) sur le bas du
   chevalier, crânes rejetés sous la ligne commune ---------- */
/* Même problème que pour l'oiseau décoratif, mais pour la mascotte de
   progression (#creatureFigure) : sa colonne (#creatureZone) contient
   aussi la pile de crânes et les défaites de la semaine SOUS elle, donc
   son bord bas (utilisé par align-items:flex-end) n'est pas non plus au
   niveau des pieds de la mascotte. Contrairement à l'oiseau décoratif
   (un seul élément, on ajuste juste sa marge), ici on veut que les
   crânes restent sous la ligne commune une fois la mascotte réalignée :
   on déplace donc toute la colonne #creatureZone d'un bloc avec un
   translateY (pas de marge sur un enfant, qui grandirait la colonne et
   ferait bouger le chevalier via align-items:flex-end) — les crânes,
   déjà sous la mascotte dans le flux normal, suivent avec elle. */
function alignCreatureFoot(){
  const zone = document.getElementById('creatureZone');
  const figure = document.getElementById('creatureFigure');
  const knightGirl = document.getElementById('knightGirl');
  if(!zone || !figure || !knightGirl) return;
  const icon = figure.querySelector('.creature-icon');
  const knightSvg = knightGirl.querySelector('svg');
  if(!icon || !knightSvg) return;

  /* Repart toujours d'une mesure "naturelle" (sans l'ajustement précédent) :
     sinon un deuxième appel (au load, après un premier appel déjà
     correct au DOMContentLoaded) mesure une position DÉJÀ corrigée,
     retrouve un delta de 0, et écrase le transform correct par une
     chaîne vide au lieu de le laisser tel quel. */
  zone.style.transform = '';
  const iconRect = icon.getBoundingClientRect();
  const knightRect = knightSvg.getBoundingClientRect();
  if(iconRect.height === 0 || knightRect.height === 0) return; // pas encore rendu

  const delta = knightRect.bottom - iconRect.bottom;
  if(delta) zone.style.transform = `translateY(${delta}px)`;
}

/* ---------- petit monstre : traverse l'écran après 3 min d'inactivité ---------- */
const WANDER_IDLE_MS = 3 * 60 * 1000;
const WANDER_ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'wheel'];

function playMonsterGroikSound(){
  if(typeof getAudioCtx !== 'function' || typeof playSlide !== 'function') return;
  const ctx = getAudioCtx();
  const now = ctx.currentTime;
  playSlide(ctx, 220, 80, now, 0.22, { vol: 0.28, shape: 'sawtooth', attack: 0.008, release: 0.08 });
  playSlide(ctx, 130, 65, now + 0.03, 0.24, { vol: 0.16, shape: 'square', attack: 0.008, release: 0.1 });
}

function initWanderMonster(){
  const el = document.getElementById('wanderMonster');
  if(!el || typeof MONSTER_WALK_SVG === 'undefined') return;
  el.innerHTML = MONSTER_WALK_SVG;

  let idleTimer = null;

  function runWander(){
    el.hidden = false;
    el.classList.remove('walking');
    void el.offsetWidth; // force reflow pour pouvoir rejouer l'animation
    el.classList.add('walking');
    playMonsterGroikSound();
  }

  function onWalkEnd(e){
    if(e.target !== el) return;
    el.hidden = true;
    el.classList.remove('walking');
    scheduleWander();
  }
  el.addEventListener('animationend', onWalkEnd);

  function scheduleWander(){
    clearTimeout(idleTimer);
    idleTimer = setTimeout(runWander, WANDER_IDLE_MS);
  }

  WANDER_ACTIVITY_EVENTS.forEach(evt => {
    window.addEventListener(evt, scheduleWander, { passive: true });
  });

  scheduleWander();
}

document.addEventListener('DOMContentLoaded', () => {
  renderKnightGirl();
  renderSceneMoon();
  renderSceneCastle();
  initSceneBird();
  initWanderMonster();
  alignSceneBird();
  alignCreatureFoot();
  // Les polices/webfonts peuvent charger après coup et décaler la mise
  // en page : on réajuste une fois de plus au chargement complet.
  window.addEventListener('load', () => {
    alignSceneBird();
    alignCreatureFoot();
  });
});
