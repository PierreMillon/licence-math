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
   disparaît/se transforme plus jamais). Durée du clignement variable
   (11/08/2026, demande explicite) : la plupart du temps un clignement
   rapide (140ms, comportement d'origine), mais parfois un clignement
   long — œil gardé fermé une seconde entière — pour casser la
   régularité mécanique. Pas un taux fixe : la fréquence du clignement
   long est elle-même retirée au hasard entre 10% et 50% À CHAQUE
   clignement ("varie... entre une fois sur deux et une fois sur dix
   au hasard"), plutôt qu'un seul pourcentage constant pour toute la
   session. */
let birdBlinkTimer = null;
const LONG_BLINK_MS = 1000;
const SHORT_BLINK_MS = 140;
const LONG_BLINK_CHANCE_MIN = 0.1;
const LONG_BLINK_CHANCE_MAX = 0.5;

function scheduleBirdBlink(figure, heightPx){
  clearTimeout(birdBlinkTimer);
  const delay = 3000 + Math.random() * 7000;
  birdBlinkTimer = setTimeout(() => {
    figure.innerHTML = BIRD_SVG_BLINK;
    const blinkEl = figure.querySelector('.creature-icon');
    if(blinkEl) blinkEl.style.height = heightPx + 'px';
    const longBlinkChance = LONG_BLINK_CHANCE_MIN + Math.random() * (LONG_BLINK_CHANCE_MAX - LONG_BLINK_CHANCE_MIN);
    const closedDuration = Math.random() < longBlinkChance ? LONG_BLINK_MS : SHORT_BLINK_MS;
    setTimeout(() => {
      figure.innerHTML = BIRD_SVG;
      const openEl = figure.querySelector('.creature-icon');
      if(openEl) openEl.style.height = heightPx + 'px';
      scheduleBirdBlink(figure, heightPx);
    }, closedDuration);
  }, delay);
}

/* Bulle BD (voir style.css .creature-bubble) : trois petits helpers
   pour poser son contenu, réutilisés par le rendu automatique
   (renderCreature, seuil L>=3) ET par l'appui sur l'oiseau
   (initBirdTapReveal ci-dessous, toujours disponible). Signature
   ("— Le Scribe aux Six Voix") retirée le 11/08/2026 : n'intéressait
   pas Pierre, seule la phrase reste. */
function showBubblePhrase(bubble){
  const idx = nextTeasePhraseIndex();
  bubble.innerHTML = `“${BIRD_TEASE_PHRASES[idx]}”`;
  bubble.classList.remove('glyph');
  bubble.classList.add('phrase', 'visible');
}
function showBubbleGlyph(bubble, txt){
  bubble.textContent = txt;
  bubble.classList.remove('phrase');
  bubble.classList.add('glyph', 'visible');
}
function hideBubble(bubble){
  bubble.innerHTML = '';
  bubble.classList.remove('visible', 'glyph', 'phrase');
}

/* Appui sur l'oiseau (11/08/2026, demande explicite) : l'oiseau
   lui-même n'intéresse pas Pierre, ce qui compte c'est le message —
   un appui le remplace donc par sa bulle (une phrase taquine,
   toujours disponible, indépendante du seuil d'absence L>=3 qui régit
   l'apparition automatique). Ré-appuyer (même zone, restée cliquable
   même une fois l'oiseau caché) referme la bulle et fait réapparaître
   l'oiseau. */
function initBirdTapReveal(){
  const figure = document.getElementById('creatureFigure');
  const bubble = document.getElementById('creatureBubble');
  if(!figure || !bubble) return;
  let peeking = false;

  function togglePeek(){
    peeking = !peeking;
    figure.classList.toggle('peeking', peeking);
    if(peeking) showBubblePhrase(bubble);
    else{
      // Ne referme pas une bulle affichée pour une vraie raison
      // (absence en cours, L>=3) — repasse juste par le rendu normal.
      const state = tickDailyGrowth();
      const txt = bubbleText(state.lateness);
      if(txt) showBubbleGlyph(bubble, txt);
      else hideBubble(bubble);
    }
  }

  figure.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePeek();
  });
}

function renderCreature(){
  const zone = document.getElementById('creatureZone');
  if(!zone) return;

  const state = tickDailyGrowth();
  const L = state.lateness;

  const figure = document.getElementById('creatureFigure');
  const bubble = document.getElementById('creatureBubble');
  const pile = document.getElementById('skullPile');

  figure.innerHTML = BIRD_SVG;
  const svgEl = figure.querySelector('.creature-icon');
  if(svgEl) svgEl.style.height = BIRD_HEIGHT_PX + 'px';

  clearTimeout(birdBlinkTimer);
  scheduleBirdBlink(figure, BIRD_HEIGHT_PX);

  /* Bulle BD au-dessus de l'oiseau (redesign du 11/08/2026, demande
     explicite — voir CLAUDE.md) : fusionne ce qui était deux blocs
     séparés (le marqueur d'absence "?"/"!"/"×N" — bubbleText — et la
     phrase taquine — BIRD_TEASE_PHRASES) dans UNE seule bulle, qui
     alterne au hasard entre les deux à chaque chargement de page
     (pas de préférence pour l'un ou l'autre — 50/50, décidé une fois
     par rendu, pas en boucle). Toujours le même seuil d'apparition
     (L>=3, bubbleText). Signature ("— Le Scribe aux Six Voix")
     retirée le 11/08/2026 (demande explicite, n'intéressait pas
     Pierre) — seule la phrase reste. */
  const txt = bubbleText(L);
  if(bubble){
    if(txt){
      if(Math.random() < 0.5) showBubblePhrase(bubble);
      else showBubbleGlyph(bubble, txt);
    }else{
      hideBubble(bubble);
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
  initBirdTapReveal();
});
