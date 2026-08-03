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

const SITE_VERSION = 12;

const MENU_CHAPTERS = [
  { name: 'LOGIQUE',       file: 'logique.html',       available: true  },
  { name: 'CALCULUS',      file: 'calculus.html',      available: true  },
  { name: 'ALGÈBRE',       file: 'algebre.html',       available: true  },
  { name: 'ANALYSE',       file: 'analyse.html',       available: false },
  { name: 'PROBABILITÉS',  file: 'probabilites.html',  available: false },
  { name: 'STATISTIQUES',  file: 'statistiques.html',  available: false },
  { name: 'JAVA',          file: 'java.html',          available: false },
  { name: 'PYTHON',        file: 'python.html',        available: false },
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

function buildDrawer(){
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';

  const drawer = document.createElement('nav');
  drawer.className = 'drawer';
  drawer.setAttribute('aria-label', 'Menu des chapitres');

  const itemsHTML = MENU_CHAPTERS.map(ch => {
    if(ch.available){
      return `<a class="drawer__link" href="${chapterHref(ch.file)}">${ch.name}</a>`;
    }
    return `<span class="drawer__link locked">${ch.name} <span class="drawer__tag">[ À VENIR ]</span></span>`;
  }).join('');

  drawer.innerHTML = `
    <div class="drawer__head">
      <span>CHAPITRES</span>
      <button class="drawer__close" type="button" aria-label="Fermer">✕</button>
    </div>
    <a class="drawer__link" href="${homeHref()}">&lt;&lt; ACCUEIL</a>
    <div class="drawer__sep"></div>
    ${itemsHTML}
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
}

function buildVersionBadge(){
  const badge = document.createElement('div');
  badge.className = 'version-badge';
  badge.textContent = 'v' + SITE_VERSION;
  document.body.appendChild(badge);
}

document.addEventListener('DOMContentLoaded', () => {
  buildDrawer();
  buildVersionBadge();
});
