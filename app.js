/* ============================================================
   L1 MATHS — SYNTHÉTIQUE — app.js
   Rendu de la page d'accueil : cartes chapitres + progression
   localStorage.
   ============================================================ */

const STORAGE_KEY = 'l1maths_progress';

const CHAPTERS = [
  { id: 'logique',       name: 'LOGIQUE',       file: 'fiches/logique.html',       total: 10, available: true  },
  { id: 'algebre',       name: 'ALGÈBRE',       file: 'fiches/algebre.html',       total: 0,  available: false },
  { id: 'analyse',       name: 'ANALYSE',       file: 'fiches/analyse.html',       total: 0,  available: false },
  { id: 'probabilites',  name: 'PROBABILITÉS',  file: 'fiches/probabilites.html',  total: 0,  available: false },
  { id: 'statistiques',  name: 'STATISTIQUES',  file: 'fiches/statistiques.html',  total: 0,  available: false },
];

function loadProgress(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  }catch(e){
    return {};
  }
}

function renderChapters(){
  const grid = document.getElementById('chapterGrid');
  if(!grid) return;
  const progress = loadProgress();

  grid.innerHTML = CHAPTERS.map(ch => {
    const p = progress[ch.id] || { completed: 0, correct: 0 };
    const total = ch.total;
    const pct = total > 0 ? Math.round((p.completed / total) * 100) : 0;
    const scoreLabel = total > 0
      ? `${p.correct}/${total}`
      : '--/--';
    const status = ch.available
      ? (p.completed >= total && total > 0 ? '[ TERMINÉ ]' : '[ DISPONIBLE ]')
      : '[ À VENIR ]';
    const lockedClass = ch.available ? '' : ' locked';

    return `
      <div class="chapter-card${lockedClass}" data-file="${ch.file}" data-available="${ch.available}" tabindex="0" role="button" aria-label="Ouvrir ${ch.name}">
        <div class="chapter-card__title">
          <span>${ch.name}</span>
          <span class="chapter-card__badge">${total} exos</span>
        </div>
        <div class="chapter-card__meta">
          <span>SCORE</span>
          <span class="chapter-card__score">${scoreLabel}</span>
        </div>
        <div class="progress-bar" aria-hidden="true">
          <div class="progress-bar__fill" style="width:${pct}%"></div>
        </div>
        <div class="chapter-card__status">${status}</div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.chapter-card').forEach(card => {
    const open = () => {
      if(card.dataset.available === 'true'){
        window.location.href = card.dataset.file;
      }
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        open();
      }
    });
  });
}

function renderFooterCycle(){
  const el = document.getElementById('footerHint');
  if(!el) return;
  const messages = [
    'CHOISIR CHAPITRE',
    'APPUYEZ SUR UNE CARTE',
    'BONNE RÉVISION',
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % messages.length;
    el.firstChild.textContent = messages[i] + ' ';
  }, 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  renderChapters();
  renderFooterCycle();
});
