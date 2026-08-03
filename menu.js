/* ============================================================
   L1 MATHS — SYNTHÈSE — menu.js
   Menu coulissant (chapitres) déclenché par le bouton diamant.
   Chargé sur toutes les pages (index + fiches).

   IMPORTANT : à chaque changement de style.css, menu.js, app.js
   ou d'un fichier JS de fiche, incrémenter SITE_VERSION ci-dessous
   ET le paramètre ?v=N sur tous les <link>/<script> locaux dans
   les fichiers HTML (sinon le navigateur sert une version en
   cache — voir bug du 2026-08-03).
   ============================================================ */

const SITE_VERSION = 48;

const SKULL_SVG = '<svg class="skull-icon" viewBox="0 0 23 30" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true"><rect x="8" y="0" width="1" height="1"/><rect x="9" y="0" width="1" height="1"/><rect x="10" y="0" width="1" height="1"/><rect x="11" y="0" width="1" height="1"/><rect x="12" y="0" width="1" height="1"/><rect x="13" y="0" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="7" y="1" width="1" height="1"/><rect x="14" y="1" width="1" height="1"/><rect x="15" y="1" width="1" height="1"/><rect x="16" y="1" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="17" y="2" width="1" height="1"/><rect x="18" y="2" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="19" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="20" y="4" width="1" height="1"/><rect x="1" y="5" width="1" height="1"/><rect x="2" y="5" width="1" height="1"/><rect x="20" y="5" width="1" height="1"/><rect x="21" y="5" width="1" height="1"/><rect x="1" y="6" width="1" height="1"/><rect x="21" y="6" width="1" height="1"/><rect x="0" y="7" width="1" height="1"/><rect x="1" y="7" width="1" height="1"/><rect x="21" y="7" width="1" height="1"/><rect x="22" y="7" width="1" height="1"/><rect x="0" y="8" width="1" height="1"/><rect x="2" y="8" width="1" height="1"/><rect x="20" y="8" width="1" height="1"/><rect x="22" y="8" width="1" height="1"/><rect x="0" y="9" width="1" height="1"/><rect x="2" y="9" width="1" height="1"/><rect x="20" y="9" width="1" height="1"/><rect x="22" y="9" width="1" height="1"/><rect x="0" y="10" width="1" height="1"/><rect x="2" y="10" width="1" height="1"/><rect x="20" y="10" width="1" height="1"/><rect x="22" y="10" width="1" height="1"/><rect x="0" y="11" width="1" height="1"/><rect x="1" y="11" width="1" height="1"/><rect x="5" y="11" width="1" height="1"/><rect x="6" y="11" width="1" height="1"/><rect x="7" y="11" width="1" height="1"/><rect x="8" y="11" width="1" height="1"/><rect x="14" y="11" width="1" height="1"/><rect x="15" y="11" width="1" height="1"/><rect x="16" y="11" width="1" height="1"/><rect x="17" y="11" width="1" height="1"/><rect x="21" y="11" width="1" height="1"/><rect x="22" y="11" width="1" height="1"/><rect x="0" y="12" width="1" height="1"/><rect x="1" y="12" width="1" height="1"/><rect x="4" y="12" width="1" height="1"/><rect x="5" y="12" width="1" height="1"/><rect x="6" y="12" width="1" height="1"/><rect x="7" y="12" width="1" height="1"/><rect x="8" y="12" width="1" height="1"/><rect x="9" y="12" width="1" height="1"/><rect x="13" y="12" width="1" height="1"/><rect x="14" y="12" width="1" height="1"/><rect x="15" y="12" width="1" height="1"/><rect x="16" y="12" width="1" height="1"/><rect x="17" y="12" width="1" height="1"/><rect x="18" y="12" width="1" height="1"/><rect x="21" y="12" width="1" height="1"/><rect x="22" y="12" width="1" height="1"/><rect x="0" y="13" width="1" height="1"/><rect x="1" y="13" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="4" y="13" width="1" height="1"/><rect x="5" y="13" width="1" height="1"/><rect x="6" y="13" width="1" height="1"/><rect x="7" y="13" width="1" height="1"/><rect x="8" y="13" width="1" height="1"/><rect x="9" y="13" width="1" height="1"/><rect x="13" y="13" width="1" height="1"/><rect x="14" y="13" width="1" height="1"/><rect x="15" y="13" width="1" height="1"/><rect x="16" y="13" width="1" height="1"/><rect x="17" y="13" width="1" height="1"/><rect x="18" y="13" width="1" height="1"/><rect x="19" y="13" width="1" height="1"/><rect x="21" y="13" width="1" height="1"/><rect x="22" y="13" width="1" height="1"/><rect x="1" y="14" width="1" height="1"/><rect x="3" y="14" width="1" height="1"/><rect x="4" y="14" width="1" height="1"/><rect x="5" y="14" width="1" height="1"/><rect x="6" y="14" width="1" height="1"/><rect x="7" y="14" width="1" height="1"/><rect x="8" y="14" width="1" height="1"/><rect x="9" y="14" width="1" height="1"/><rect x="13" y="14" width="1" height="1"/><rect x="14" y="14" width="1" height="1"/><rect x="15" y="14" width="1" height="1"/><rect x="16" y="14" width="1" height="1"/><rect x="17" y="14" width="1" height="1"/><rect x="18" y="14" width="1" height="1"/><rect x="19" y="14" width="1" height="1"/><rect x="21" y="14" width="1" height="1"/><rect x="1" y="15" width="1" height="1"/><rect x="3" y="15" width="1" height="1"/><rect x="4" y="15" width="1" height="1"/><rect x="5" y="15" width="1" height="1"/><rect x="6" y="15" width="1" height="1"/><rect x="7" y="15" width="1" height="1"/><rect x="8" y="15" width="1" height="1"/><rect x="10" y="15" width="1" height="1"/><rect x="11" y="15" width="1" height="1"/><rect x="12" y="15" width="1" height="1"/><rect x="14" y="15" width="1" height="1"/><rect x="15" y="15" width="1" height="1"/><rect x="16" y="15" width="1" height="1"/><rect x="17" y="15" width="1" height="1"/><rect x="18" y="15" width="1" height="1"/><rect x="19" y="15" width="1" height="1"/><rect x="21" y="15" width="1" height="1"/><rect x="0" y="16" width="1" height="1"/><rect x="4" y="16" width="1" height="1"/><rect x="5" y="16" width="1" height="1"/><rect x="6" y="16" width="1" height="1"/><rect x="7" y="16" width="1" height="1"/><rect x="10" y="16" width="1" height="1"/><rect x="11" y="16" width="1" height="1"/><rect x="12" y="16" width="1" height="1"/><rect x="15" y="16" width="1" height="1"/><rect x="16" y="16" width="1" height="1"/><rect x="17" y="16" width="1" height="1"/><rect x="18" y="16" width="1" height="1"/><rect x="22" y="16" width="1" height="1"/><rect x="0" y="17" width="1" height="1"/><rect x="9" y="17" width="1" height="1"/><rect x="10" y="17" width="1" height="1"/><rect x="11" y="17" width="1" height="1"/><rect x="12" y="17" width="1" height="1"/><rect x="13" y="17" width="1" height="1"/><rect x="22" y="17" width="1" height="1"/><rect x="0" y="18" width="1" height="1"/><rect x="1" y="18" width="1" height="1"/><rect x="9" y="18" width="1" height="1"/><rect x="10" y="18" width="1" height="1"/><rect x="11" y="18" width="1" height="1"/><rect x="12" y="18" width="1" height="1"/><rect x="13" y="18" width="1" height="1"/><rect x="21" y="18" width="1" height="1"/><rect x="22" y="18" width="1" height="1"/><rect x="1" y="19" width="1" height="1"/><rect x="2" y="19" width="1" height="1"/><rect x="3" y="19" width="1" height="1"/><rect x="4" y="19" width="1" height="1"/><rect x="9" y="19" width="1" height="1"/><rect x="10" y="19" width="1" height="1"/><rect x="11" y="19" width="1" height="1"/><rect x="12" y="19" width="1" height="1"/><rect x="13" y="19" width="1" height="1"/><rect x="18" y="19" width="1" height="1"/><rect x="19" y="19" width="1" height="1"/><rect x="20" y="19" width="1" height="1"/><rect x="21" y="19" width="1" height="1"/><rect x="2" y="20" width="1" height="1"/><rect x="3" y="20" width="1" height="1"/><rect x="5" y="20" width="1" height="1"/><rect x="17" y="20" width="1" height="1"/><rect x="19" y="20" width="1" height="1"/><rect x="20" y="20" width="1" height="1"/><rect x="2" y="21" width="1" height="1"/><rect x="5" y="21" width="1" height="1"/><rect x="17" y="21" width="1" height="1"/><rect x="20" y="21" width="1" height="1"/><rect x="2" y="22" width="1" height="1"/><rect x="5" y="22" width="1" height="1"/><rect x="7" y="22" width="1" height="1"/><rect x="9" y="22" width="1" height="1"/><rect x="11" y="22" width="1" height="1"/><rect x="13" y="22" width="1" height="1"/><rect x="15" y="22" width="1" height="1"/><rect x="17" y="22" width="1" height="1"/><rect x="20" y="22" width="1" height="1"/><rect x="3" y="23" width="1" height="1"/><rect x="5" y="23" width="1" height="1"/><rect x="6" y="23" width="1" height="1"/><rect x="7" y="23" width="1" height="1"/><rect x="8" y="23" width="1" height="1"/><rect x="9" y="23" width="1" height="1"/><rect x="10" y="23" width="1" height="1"/><rect x="11" y="23" width="1" height="1"/><rect x="12" y="23" width="1" height="1"/><rect x="13" y="23" width="1" height="1"/><rect x="14" y="23" width="1" height="1"/><rect x="15" y="23" width="1" height="1"/><rect x="16" y="23" width="1" height="1"/><rect x="17" y="23" width="1" height="1"/><rect x="19" y="23" width="1" height="1"/><rect x="3" y="24" width="1" height="1"/><rect x="6" y="24" width="1" height="1"/><rect x="7" y="24" width="1" height="1"/><rect x="9" y="24" width="1" height="1"/><rect x="11" y="24" width="1" height="1"/><rect x="13" y="24" width="1" height="1"/><rect x="15" y="24" width="1" height="1"/><rect x="16" y="24" width="1" height="1"/><rect x="19" y="24" width="1" height="1"/><rect x="3" y="25" width="1" height="1"/><rect x="7" y="25" width="1" height="1"/><rect x="9" y="25" width="1" height="1"/><rect x="11" y="25" width="1" height="1"/><rect x="13" y="25" width="1" height="1"/><rect x="15" y="25" width="1" height="1"/><rect x="19" y="25" width="1" height="1"/><rect x="4" y="26" width="1" height="1"/><rect x="18" y="26" width="1" height="1"/><rect x="5" y="27" width="1" height="1"/><rect x="17" y="27" width="1" height="1"/><rect x="6" y="28" width="1" height="1"/><rect x="16" y="28" width="1" height="1"/><rect x="7" y="29" width="1" height="1"/><rect x="8" y="29" width="1" height="1"/><rect x="9" y="29" width="1" height="1"/><rect x="10" y="29" width="1" height="1"/><rect x="11" y="29" width="1" height="1"/><rect x="12" y="29" width="1" height="1"/><rect x="13" y="29" width="1" height="1"/><rect x="14" y="29" width="1" height="1"/><rect x="15" y="29" width="1" height="1"/></svg>';

const MENU_CHAPTERS = [
  { name: 'LOGIQUE',       file: 'logique.html' },
  { name: 'CALCULUS',      file: 'calculus.html' },
  { name: 'ALGÈBRE',       file: 'algebre.html' },
  { name: 'ANALYSE',       file: 'analyse.html' },
  { name: 'PROBABILITÉS',  file: 'probabilites.html' },
  { name: 'STATISTIQUES',  file: 'statistiques.html' },
  { name: 'JAVA',          file: 'java.html' },
  { name: 'PYTHON',        file: 'python.html' },
];

function inFichesFolder(){
  return window.location.pathname.includes('/fiches/');
}

function chapterHref(file){
  return inFichesFolder() ? file : 'fiches/' + file;
}

function homeHref(){
  return inFichesFolder() ? '../index.html' : 'index.html';
}

function changelogHref(){
  return inFichesFolder() ? '../changelog.html' : 'changelog.html';
}

function buildDrawer(){
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';

  const drawer = document.createElement('nav');
  drawer.className = 'drawer';
  drawer.setAttribute('aria-label', 'Menu des chapitres');

  const itemsHTML = MENU_CHAPTERS.map(ch =>
    `<a class="drawer__link" href="${chapterHref(ch.file)}">${ch.name}</a>`
  ).join('');

  drawer.innerHTML = `
    <div class="drawer__head">
      <span>CHAPITRES</span>
      <button class="drawer__close" type="button" aria-label="Fermer">✕</button>
    </div>
    <a class="drawer__link" href="${homeHref()}">&lt;&lt; ACCUEIL</a>
    <div class="drawer__sep"></div>
    ${itemsHTML}
    <button class="drawer__reset" id="resetSiteBtn" type="button">${SKULL_SVG}RÉINITIALISER LA PROGRESSION DE TOUT LE SITE</button>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  const open = () => { drawer.classList.add('open'); overlay.classList.add('open'); };
  const close = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); };

  const menuBtn = document.querySelector('.menu-btn');
  if(menuBtn){
    menuBtn.addEventListener('click', e => {
      e.preventDefault();
      open();
    });
  }
  overlay.addEventListener('click', close);
  drawer.querySelector('.drawer__close').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') close();
  });

  drawer.querySelector('#resetSiteBtn').addEventListener('click', () => {
    if(!confirm('Réinitialiser TOUT le site ? Toute la progression de tous les chapitres sera effacée.')) return;
    localStorage.removeItem('l1maths_progress');
    MENU_CHAPTERS.forEach(ch => {
      const id = ch.file.replace('.html', '');
      localStorage.removeItem('l1maths_' + id + '_state');
    });
    localStorage.removeItem('l1maths_logique_state_v2');
    if(window.incrementSkullPile) window.incrementSkullPile();
    window.location.reload();
  });
}

function buildVersionBadge(){
  const badge = document.createElement('a');
  badge.className = 'version-badge';
  badge.href = changelogHref();
  badge.textContent = 'v' + SITE_VERSION;
  document.body.appendChild(badge);
}

/* ---------- phrase de fin de fiche (question ouverte, ton encourageant) ---------- */
const END_PHRASES = [
  "ET SI CE CHAPITRE N'ÉTAIT QUE LE DÉBUT DE CE QUE TU PEUX COMPRENDRE ?",
  "JUSQU'OÙ PEUT TE MENER UN CHAPITRE DE PLUS ?",
  "QUI SERAS-TU QUAND TOUT CECI TE SEMBLERA ÉVIDENT ?",
  "ET SI TU ÉTAIS DÉJÀ PLUS PRÊT QUE TU NE LE CROIS ?",
  "QU'EST-CE QUI DEVIENT POSSIBLE MAINTENANT QUE TU SAIS ÇA ?",
  "ET SI COMPRENDRE ÉTAIT DÉJÀ UNE FORME DE VICTOIRE ?",
  "COMBIEN DE CHAPITRES TE SÉPARENT ENCORE DE TOI-MÊME ?",
  "ET SI LA PROCHAINE FICHE ÉTAIT CELLE QUI CHANGE TOUT ?",
  "QU'AS-TU DE PLUS EN TOI MAINTENANT QU'IL Y A UNE HEURE ?",
  "ET SI LE PLUS DUR ÉTAIT DÉJÀ DERRIÈRE TOI ?",
  "JUSQU'OÙ COMPTES-TU ALLER, AU FOND ?",
  "QUI SAIT CE QUE LE CHAPITRE SUIVANT VA T'APPRENDRE SUR TOI-MÊME ?",
  "ET SI CHAQUE EXERCICE TE RAPPROCHAIT D'UNE MEILLEURE VERSION DE TOI ?",
  "ET SI TU ÉTAIS PLUS PROCHE DU BUT QUE TU NE LE PENSES ?",
  "QU'EST-CE QUE TU SAURAS DEMAIN QUE TU IGNORES ENCORE CE SOIR ?",
  "ET SI LA SUITE ÉTAIT PLUS FACILE QUE TU NE LE CROIS ?",
  "JUSQU'OÙ IRA CE QUE TU VIENS D'APPRENDRE ?",
  "ET SI C'ÉTAIT ÇA, LE DÉCLIC ?",
];

const END_PHRASE_BAG_KEY = 'l1maths_endphrase_bag';
const END_PHRASE_LAST_KEY = 'l1maths_endphrase_last';

function shuffledIndices(length){
  const arr = Array.from({ length }, (_, i) => i);
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function nextEndPhraseIndex(){
  let bag = [];
  try{ bag = JSON.parse(sessionStorage.getItem(END_PHRASE_BAG_KEY)) || []; }
  catch(e){ bag = []; }

  if(!Array.isArray(bag) || bag.length === 0){
    const previousLast = Number(sessionStorage.getItem(END_PHRASE_LAST_KEY));
    bag = shuffledIndices(END_PHRASES.length);
    if(END_PHRASES.length > 1){
      while(bag[0] === previousLast) bag = shuffledIndices(END_PHRASES.length);
    }
  }

  const idx = bag.shift();
  sessionStorage.setItem(END_PHRASE_BAG_KEY, JSON.stringify(bag));
  sessionStorage.setItem(END_PHRASE_LAST_KEY, String(idx));
  return idx;
}

function renderEndPhrase(){
  const el = document.getElementById('ficheEndPhrase');
  if(!el) return;
  el.firstChild.textContent = END_PHRASES[nextEndPhraseIndex()] + ' ';
}

document.addEventListener('DOMContentLoaded', () => {
  buildDrawer();
  renderEndPhrase();
  buildVersionBadge();
});
