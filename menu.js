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

const SITE_VERSION = 30;

const SKULL_SVG = '<svg class="skull-icon" viewBox="0 0 13 27" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true"><rect x="4" y="0" width="1" height="1"/><rect x="5" y="0" width="1" height="1"/><rect x="6" y="0" width="1" height="1"/><rect x="7" y="0" width="1" height="1"/><rect x="8" y="0" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/><rect x="4" y="1" width="1" height="1"/><rect x="5" y="1" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="7" y="1" width="1" height="1"/><rect x="8" y="1" width="1" height="1"/><rect x="9" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="3" y="2" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="7" y="2" width="1" height="1"/><rect x="8" y="2" width="1" height="1"/><rect x="9" y="2" width="1" height="1"/><rect x="10" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="4" y="3" width="1" height="1"/><rect x="5" y="3" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="8" y="3" width="1" height="1"/><rect x="9" y="3" width="1" height="1"/><rect x="10" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="4" width="1" height="1"/><rect x="5" y="4" width="1" height="1"/><rect x="6" y="4" width="1" height="1"/><rect x="7" y="4" width="1" height="1"/><rect x="9" y="4" width="1" height="1"/><rect x="10" y="4" width="1" height="1"/><rect x="2" y="5" width="1" height="1"/><rect x="3" y="5" width="1" height="1"/><rect x="5" y="5" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="7" y="5" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="10" y="5" width="1" height="1"/><rect x="2" y="6" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="4" y="6" width="1" height="1"/><rect x="5" y="6" width="1" height="1"/><rect x="7" y="6" width="1" height="1"/><rect x="8" y="6" width="1" height="1"/><rect x="9" y="6" width="1" height="1"/><rect x="10" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="7" width="1" height="1"/><rect x="4" y="7" width="1" height="1"/><rect x="5" y="7" width="1" height="1"/><rect x="6" y="7" width="1" height="1"/><rect x="7" y="7" width="1" height="1"/><rect x="8" y="7" width="1" height="1"/><rect x="9" y="7" width="1" height="1"/><rect x="10" y="7" width="1" height="1"/><rect x="2" y="8" width="1" height="1"/><rect x="4" y="8" width="1" height="1"/><rect x="6" y="8" width="1" height="1"/><rect x="8" y="8" width="1" height="1"/><rect x="10" y="8" width="1" height="1"/><rect x="3" y="9" width="1" height="1"/><rect x="4" y="9" width="1" height="1"/><rect x="5" y="9" width="1" height="1"/><rect x="6" y="9" width="1" height="1"/><rect x="7" y="9" width="1" height="1"/><rect x="8" y="9" width="1" height="1"/><rect x="9" y="9" width="1" height="1"/><rect x="4" y="10" width="1" height="1"/><rect x="5" y="10" width="1" height="1"/><rect x="6" y="10" width="1" height="1"/><rect x="7" y="10" width="1" height="1"/><rect x="8" y="10" width="1" height="1"/><rect x="0" y="13" width="1" height="1"/><rect x="1" y="13" width="1" height="1"/><rect x="11" y="13" width="1" height="1"/><rect x="12" y="13" width="1" height="1"/><rect x="1" y="14" width="1" height="1"/><rect x="2" y="14" width="1" height="1"/><rect x="10" y="14" width="1" height="1"/><rect x="11" y="14" width="1" height="1"/><rect x="2" y="15" width="1" height="1"/><rect x="3" y="15" width="1" height="1"/><rect x="10" y="15" width="1" height="1"/><rect x="3" y="16" width="1" height="1"/><rect x="4" y="16" width="1" height="1"/><rect x="9" y="16" width="1" height="1"/><rect x="4" y="17" width="1" height="1"/><rect x="5" y="17" width="1" height="1"/><rect x="8" y="17" width="1" height="1"/><rect x="5" y="18" width="1" height="1"/><rect x="6" y="18" width="1" height="1"/><rect x="7" y="18" width="1" height="1"/><rect x="4" y="19" width="1" height="1"/><rect x="5" y="19" width="1" height="1"/><rect x="6" y="19" width="1" height="1"/><rect x="7" y="19" width="1" height="1"/><rect x="8" y="19" width="1" height="1"/><rect x="5" y="20" width="1" height="1"/><rect x="6" y="20" width="1" height="1"/><rect x="7" y="20" width="1" height="1"/><rect x="4" y="21" width="1" height="1"/><rect x="5" y="21" width="1" height="1"/><rect x="8" y="21" width="1" height="1"/><rect x="3" y="22" width="1" height="1"/><rect x="4" y="22" width="1" height="1"/><rect x="9" y="22" width="1" height="1"/><rect x="2" y="23" width="1" height="1"/><rect x="3" y="23" width="1" height="1"/><rect x="10" y="23" width="1" height="1"/><rect x="1" y="24" width="1" height="1"/><rect x="2" y="24" width="1" height="1"/><rect x="10" y="24" width="1" height="1"/><rect x="11" y="24" width="1" height="1"/><rect x="0" y="25" width="1" height="1"/><rect x="1" y="25" width="1" height="1"/><rect x="11" y="25" width="1" height="1"/><rect x="12" y="25" width="1" height="1"/></svg>';

const MENU_CHAPTERS = [
  { name: 'LOGIQUE',       file: 'logique.html',       available: true  },
  { name: 'CALCULUS',      file: 'calculus.html',      available: true  },
  { name: 'ALGÈBRE',       file: 'algebre.html',       available: true  },
  { name: 'ANALYSE',       file: 'analyse.html',       available: true  },
  { name: 'PROBABILITÉS',  file: 'probabilites.html',  available: true  },
  { name: 'STATISTIQUES',  file: 'statistiques.html',  available: true  },
  { name: 'JAVA',          file: 'java.html',          available: true  },
  { name: 'PYTHON',        file: 'python.html',        available: true  },
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
    window.location.reload();
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
