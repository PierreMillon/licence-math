/* ============================================================
   L1 MATHS — SYNTHÈSE — creature.js
   Mascotte de progression : un oiseau qui grossit en dragon plus
   le nombre de jours sans exercice répondu augmente (à partir du
   2e jour, plafonné à 40 jours), et redescend d'un cran à chaque
   exercice répondu. Bulle d'alerte progressive au-delà de 3 jours.
   Pile de crânes : +1 uniquement à la réinitialisation de TOUT le
   site, et seulement s'il y avait une vraie progression à perdre
   (jamais sur une réinitialisation de chapitre, jamais si le site
   était déjà à zéro — pour ne pas pouvoir en farmer gratuitement).
   Chargé sur toutes les pages ; ne rend la mascotte que si
   #creatureZone existe (page d'accueil).
   ============================================================ */

const CREATURE_STATE_KEY = 'l1maths_creature_state';
const SKULL_PILE_KEY = 'l1maths_skull_pile';
const MAX_LATENESS = 40;
const BIRD_HEIGHT_PX = 70;
const DRAGON_MAX_HEIGHT_PX = 260;

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

function renderCreature(){
  const zone = document.getElementById('creatureZone');
  if(!zone) return;

  const state = tickDailyGrowth();
  const L = state.lateness;

  const figure = document.getElementById('creatureFigure');
  const bubble = document.getElementById('creatureBubble');
  const pile = document.getElementById('skullPile');

  let svg, heightPx;
  if(L <= 1){
    svg = BIRD_SVG;
    heightPx = BIRD_HEIGHT_PX;
  }else{
    svg = DRAGON_SVG;
    const t = Math.min(1, (L - 2) / (MAX_LATENESS - 2));
    heightPx = Math.round(BIRD_HEIGHT_PX + t * (DRAGON_MAX_HEIGHT_PX - BIRD_HEIGHT_PX));
  }
  figure.innerHTML = svg;
  const svgEl = figure.querySelector('.creature-icon');
  if(svgEl) svgEl.style.height = heightPx + 'px';

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
