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
  initSceneBird();
  initWanderMonster();
});
