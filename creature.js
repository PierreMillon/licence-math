/* ============================================================
   L1 MATHS — SYNTHÈSE — creature.js
   Mascotte permanente : un oiseau, toujours affiché (posé en bas de
   la scène de combat), qui ne se transforme plus en dragon — voir
   scene.js pour le dragon, désormais un personnage à part entière lié
   au jour de la semaine (refonte du 11/08/2026, voir CLAUDE.md).
   L'oiseau garde deux rôles : une bulle d'alerte progressive dès 3
   jours sans exercice répondu (bubbleText), et une phrase taquine
   piochée dans BIRD_TEASE_PHRASES au même seuil, signée par un des
   auteurs de CLAUDE.md. Pile de crânes : +1 uniquement à la
   réinitialisation de TOUT le site, et seulement s'il y avait une
   vraie progression à perdre (jamais sur une réinitialisation de
   chapitre, jamais si le site était déjà à zéro — pour ne pas pouvoir
   en farmer gratuitement). Chargé sur toutes les pages ; ne rend la
   mascotte que si #creatureZone existe (page d'accueil).
   ============================================================ */

const CREATURE_STATE_KEY = 'l1maths_creature_state';
const SKULL_PILE_KEY = 'l1maths_skull_pile';
const MAX_LATENESS = 40;
/* Calé le 10/08/2026 sur la grille de densité du système de profondeur
   à 4 plans (plan 1 = personnages+sol, densité cible 0,5 unité de
   grille par px écran, calée sur le chevalier — grille 33×94 affichée
   à 188px de haut, densité réelle 0,52). L'oiseau (grille BIRD_SVG
   31×23, voir creature-svgs.js) doit avoir la même densité que le
   chevalier puisqu'ils sont sur le même plan : hauteur affichée =
   hauteur de grille / densité cible = 23 / 0,5 = 46px. Fixe depuis la
   refonte du 11/08/2026 (l'oiseau ne grossit plus jamais). */
const BIRD_HEIGHT_PX = 46;

function todayStr(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function daysBetween(a, b){
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / 86400000);
}

function loadCreatureState(){
  let s;
  try{ s = JSON.parse(localStorage.getItem(CREATURE_STATE_KEY)); }
  catch(e){ s = null; }
  if(!s || typeof s.lateness !== 'number' || !s.lastCheckDate){
    s = { lateness: 0, lastCheckDate: todayStr() };
    localStorage.setItem(CREATURE_STATE_KEY, JSON.stringify(s));
  }
  return s;
}

function saveCreatureState(s){
  localStorage.setItem(CREATURE_STATE_KEY, JSON.stringify(s));
}

function tickDailyGrowth(){
  const s = loadCreatureState();
  const today = todayStr();
  const diff = daysBetween(s.lastCheckDate, today);
  if(diff > 0){
    s.lateness = Math.min(MAX_LATENESS, s.lateness + diff);
    s.lastCheckDate = today;
    saveCreatureState(s);
  }
  return s;
}

function decrementLateness(){
  const s = loadCreatureState();
  if(s.lateness > 0){
    s.lateness = Math.max(0, s.lateness - 1);
    saveCreatureState(s);
  }
}
window.decrementLateness = decrementLateness;

function loadSkullPile(){
  const n = parseInt(localStorage.getItem(SKULL_PILE_KEY), 10);
  return Number.isFinite(n) ? n : 0;
}

function incrementSkullPile(){
  localStorage.setItem(SKULL_PILE_KEY, String(loadSkullPile() + 1));
}
window.incrementSkullPile = incrementSkullPile;

function decrementSkullPile(){
  localStorage.setItem(SKULL_PILE_KEY, String(Math.max(0, loadSkullPile() - 1)));
}
window.decrementSkullPile = decrementSkullPile;

function bubbleText(lateness){
  if(lateness < 3) return '';
  if(lateness === 3) return '!';
  const count = lateness - 3;
  return count <= 8 ? '?'.repeat(count) : ('×' + count);
}

/* Phrases taquines de l'oiseau, une fois le seuil de la bulle atteint
   (L>=3, même seuil que bubbleText). Demande explicite de Pierre du
   11/08/2026 (voir CLAUDE.md) : PAS dix pastiches séparés, un par
   auteur, ni des phrases qui reprennent une tournure reconnaissable
   d'un auteur précis (deux versions précédentes rejetées pour ça) —
   une seule voix fictive, "Le Scribe aux Six Voix", qui a fondu en
   elle l'esprit d'Asimov, Shakespeare, Edgar Allan Poe, Lovecraft,
   Woody Allen et Monty Python sans jamais les citer : juste leur
   ambiance commune, en pince-sans-rire avec une dimension
   philosophique. 6 phrases retenues par Pierre parmi 20 proposées.
   Tirage sans répétition immédiate, même mécanique que END_PHRASES
   (menu.js). */
const BIRD_TEASE_PHRASES = [
  "On ne sait jamais vraiment si on a compris. Seulement si on a essayé.",
  "Le dragon ne juge pas. Il compte.",
  "Ce qui est facile aujourd'hui a été difficile hier, pour quelqu'un.",
  "On progresse rarement en avançant vite. On progresse en avançant.",
  "Ce n'est pas la difficulté qui arrête. C'est l'absence de premier pas.",
  "Ce que tu remets à demain, demain le remet à quelqu'un d'autre — toi, un peu plus tard.",
];
const BIRD_TEASE_SIGNATURE = "Le Scribe aux Six Voix";

const TEASE_BAG_KEY = 'l1maths_teasephrase_bag';
const TEASE_LAST_KEY = 'l1maths_teasephrase_last';

function shuffledIndices(length){
  const arr = Array.from({ length }, (_, i) => i);
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function nextTeasePhraseIndex(){
  let bag = [];
  try{ bag = JSON.parse(sessionStorage.getItem(TEASE_BAG_KEY)) || []; }
  catch(e){ bag = []; }

  if(!Array.isArray(bag) || bag.length === 0){
    const previousLast = Number(sessionStorage.getItem(TEASE_LAST_KEY));
    bag = shuffledIndices(BIRD_TEASE_PHRASES.length);
    if(BIRD_TEASE_PHRASES.length > 1){
      while(bag[0] === previousLast) bag = shuffledIndices(BIRD_TEASE_PHRASES.length);
    }
  }

  const idx = bag.shift();
  sessionStorage.setItem(TEASE_BAG_KEY, JSON.stringify(bag));
  sessionStorage.setItem(TEASE_LAST_KEY, String(idx));
  return idx;
}

/* Clin d'œil de l'oiseau : intervalle aléatoire entre 3 et 10
   secondes. Permanent depuis la refonte du 11/08/2026 (l'oiseau ne
   disparaît/se transforme plus jamais). */
let birdBlinkTimer = null;

function scheduleBirdBlink(figure, heightPx){
  clearTimeout(birdBlinkTimer);
  const delay = 3000 + Math.random() * 7000;
  birdBlinkTimer = setTimeout(() => {
    figure.innerHTML = BIRD_SVG_BLINK;
    const blinkEl = figure.querySelector('.creature-icon');
    if(blinkEl) blinkEl.style.height = heightPx + 'px';
    setTimeout(() => {
      figure.innerHTML = BIRD_SVG;
      const openEl = figure.querySelector('.creature-icon');
      if(openEl) openEl.style.height = heightPx + 'px';
      scheduleBirdBlink(figure, heightPx);
    }, 140);
  }, delay);
}

function renderCreature(){
  const zone = document.getElementById('creatureZone');
  if(!zone) return;

  const state = tickDailyGrowth();
  const L = state.lateness;

  const figure = document.getElementById('creatureFigure');
  const bubble = document.getElementById('creatureBubble');
  const tease = document.getElementById('creatureTease');
  const pile = document.getElementById('skullPile');

  figure.innerHTML = BIRD_SVG;
  const svgEl = figure.querySelector('.creature-icon');
  if(svgEl) svgEl.style.height = BIRD_HEIGHT_PX + 'px';

  clearTimeout(birdBlinkTimer);
  scheduleBirdBlink(figure, BIRD_HEIGHT_PX);

  const txt = bubbleText(L);
  if(bubble){
    if(txt){
      bubble.textContent = txt;
      bubble.classList.add('visible');
    }else{
      bubble.textContent = '';
      bubble.classList.remove('visible');
    }
  }

  /* Phrase taquine : même seuil que la bulle (L>=3), une seule par
     rendu (pas une par bulle affichée en boucle, ça bougerait sans
     arrêt) — voir BIRD_TEASE_PHRASES plus haut. */
  if(tease){
    if(txt){
      const idx = nextTeasePhraseIndex();
      tease.innerHTML = `“${BIRD_TEASE_PHRASES[idx]}”<span class="creature-tease__sig">— ${BIRD_TEASE_SIGNATURE}</span>`;
      tease.classList.add('visible');
    }else{
      tease.innerHTML = '';
      tease.classList.remove('visible');
    }
  }

  if(pile){
    const n = loadSkullPile();
    const ICON_CAP = 5;
    if(n === 0){
      pile.innerHTML = '';
    }else if(n <= ICON_CAP){
      pile.innerHTML = Array.from({ length: n }, () => SKULL_SMALL_SVG).join('');
    }else{
      pile.innerHTML = SKULL_SMALL_SVG + `<span class="skull-pile__more">×${n}</span>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  tickDailyGrowth();
  renderCreature();
});
