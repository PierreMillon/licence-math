/* ============================================================
   L1 MATHS — SYNTHÉTIQUE — app.js
   Rendu de la page d'accueil : cartes chapitres + progression
   localStorage.
   ============================================================ */

const STORAGE_KEY = 'l1maths_progress';

const CHAPTERS = [
  { id: 'logique',       name: 'LOGIQUE',       file: 'fiches/logique.html',       total: 34, available: true,
    gem: { g1: '#ffd9d9', g2: '#e0384f', g3: '#4a0d12' } }, // rubis
  { id: 'calculus',      name: 'CALCULUS',      file: 'fiches/calculus.html',      total: 27, available: true,
    gem: { g1: '#ffffff', g2: '#cfe3ff', g3: '#6c7a8c' } }, // diamant
  { id: 'algebre',       name: 'ALGÈBRE',       file: 'fiches/algebre.html',       total: 12, available: true,
    gem: { g1: '#dbe9ff', g2: '#3b82f6', g3: '#0b2c5c' } }, // saphir
  { id: 'analyse',       name: 'ANALYSE',       file: 'fiches/analyse.html',       total: 21, available: true,
    gem: { g1: '#d9ffe6', g2: '#2ecc71', g3: '#0b5c2e' } }, // émeraude
  { id: 'probabilites',  name: 'PROBABILITÉS',  file: 'fiches/probabilites.html',  total: 23, available: true,
    gem: { g1: '#ecdcff', g2: '#9b59b6', g3: '#3c1a5c' } }, // améthyste
  { id: 'statistiques',  name: 'STATISTIQUES',  file: 'fiches/statistiques.html',  total: 17, available: true,
    gem: { g1: '#fff6d8', g2: '#ffd873', g3: '#8a6300' } }, // or
  { id: 'java',          name: 'JAVA',           file: 'fiches/java.html',          total: 0,  available: false,
    gem: { g1: '#f0d9a0', g2: '#b5772f', g3: '#3d2409' } }, // bronze
  { id: 'python',        name: 'PYTHON',         file: 'fiches/python.html',        total: 22, available: true,
    gem: { g1: '#ffe873', g2: '#4b8bbe', g3: '#1e3a5c' } }, // python (bleu/jaune)
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
    const done = p.completed >= total && total > 0;
    const status = ch.available
      ? (done ? '[ TERMINÉ ]' : '[ DISPONIBLE ]')
      : '[ À VENIR ]';
    const lockedClass = ch.available ? '' : ' locked';
    const doneClass = done ? ' done' : '';

    return `
      <div class="chapter-card${lockedClass}${doneClass}" data-file="${ch.file}" data-available="${ch.available}" tabindex="0" role="button" aria-label="Ouvrir ${ch.name}">
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

function renderGlobalProgress(){
  const fill = document.getElementById('globalProgressFill');
  if(!fill) return;
  const progress = loadProgress();

  let totalExercises = 0;
  let totalCorrect = 0;
  CHAPTERS.forEach(ch => {
    if(ch.total <= 0) return;
    totalExercises += ch.total;
    const p = progress[ch.id] || { completed: 0, correct: 0 };
    totalCorrect += p.correct;
  });

  const pct = totalExercises > 0 ? Math.round((totalCorrect / totalExercises) * 100) : 0;
  fill.style.width = pct + '%';
}

function renderTreasure(){
  const grid = document.getElementById('treasureGrid');
  if(!grid) return;
  const progress = loadProgress();

  grid.innerHTML = CHAPTERS.map(ch => {
    const p = progress[ch.id] || { completed: 0, correct: 0 };
    const unlocked = ch.total > 0 && p.correct >= ch.total;
    const style = `--g1:${ch.gem.g1};--g2:${ch.gem.g2};--g3:${ch.gem.g3};`;

    if(unlocked){
      return `
        <div class="treasure-slot unlocked">
          <span class="gem" style="${style}"><span class="glare"></span></span>
          <div class="treasure-name">${ch.name}</div>
          <div class="treasure-status">DÉBLOQUÉ</div>
        </div>`;
    }
    return `
      <div class="treasure-slot locked">
        <span class="gem locked"></span>
        <div class="treasure-name">?</div>
        <div class="treasure-status">[ VERROUILLÉ ]</div>
      </div>`;
  }).join('');
}

const FOOTER_MESSAGES = [
  'CHOISIR CHAPITRE',
  'APPUYEZ SUR UNE CARTE',
  'BONNE RÉVISION',
  "L'infini existe, paraît-il. C'est déjà plus que ce qu'on espérait pour ce semestre.",
  "Un mathématicien est quelqu'un qui préfère un problème qu'il ne résoudra jamais à une vie qu'il pourrait vivre.",
  "Je ne crains pas l'échec au partiel. Je crains juste d'être présent quand il arrivera.",
  "Deux droites parallèles ne se rencontrent jamais, ce qui est déjà plus que ce qu'on peut dire de moi et de mes révisions.",
  "L'éternité c'est long, surtout vers la fin du chapitre sur les intégrales.",
  "Je ne crois pas à la vie après le cc, mais j'apporte quand même mes fiches au cas où.",
  "0,999... = 1, à condition d'y croire très fort et de ne jamais y repenser.",
  "Ce diamant en haut à droite ne mène nulle part d'important. Comme presque tout le reste.",
  "La différence entre un optimiste et un pessimiste en maths, c'est que le pessimiste a déjà vérifié.",
  "Certains cherchent le sens de la vie. Moi je cherche juste où j'ai perdu mon epsilon.",
  "Un théorème n'est jamais vraiment terminé, il est juste abandonné par son démonstrateur.",
  "La barre de progression avance. Contrairement à moi face à ce chapitre.",
  "Je ne suis pas contre le travail, c'est juste qu'il arrive toujours pendant que je fais autre chose.",
];
let footerLast = -1;

function renderFooterCycle(){
  const el = document.getElementById('footerHint');
  if(!el) return;
  setInterval(() => {
    let i = Math.floor(Math.random() * FOOTER_MESSAGES.length);
    if(FOOTER_MESSAGES.length > 1){
      while(i === footerLast) i = Math.floor(Math.random() * FOOTER_MESSAGES.length);
    }
    footerLast = i;
    el.firstChild.textContent = FOOTER_MESSAGES[i] + ' ';
  }, 3800);
}

document.addEventListener('DOMContentLoaded', () => {
  renderChapters();
  renderGlobalProgress();
  renderTreasure();
  renderFooterCycle();
});
