/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/logique.js
   Rendu + vérification des 10 exercices de la fiche LOGIQUE.
   Tous les exercices sont des QCM à 3 réponses. Les formules
   sont écrites en LaTeX et typesetées avec KaTeX.
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_logique_state';
const CHAPTER_ID = 'logique';

/* ---------- données des exercices (QCM, 3 réponses) ---------- */
const EXERCISES = [
  {
    id: 'ex1', section: 'propositions',
    statement: '\\(P \\lor \\neg P\\) est :',
    options: [
      'Une tautologie (toujours vraie)',
      'Une contradiction (toujours fausse)',
      'Vraie seulement si \\(P\\) est vraie',
    ],
    correctIndex: 0,
    explain: 'L’une des deux propositions \\(P\\) ou \\(\\neg P\\) est forcément vraie, quelle que soit la valeur de \\(P\\).',
  },
  {
    id: 'ex2', section: 'propositions',
    statement: 'La négation de \\(P \\Rightarrow Q\\) est équivalente à :',
    options: ['\\(P \\land \\neg Q\\)', '\\(\\neg P \\lor Q\\)', '\\(Q \\Rightarrow P\\)'],
    correctIndex: 0,
    explain: '\\(P \\Rightarrow Q\\) équivaut à \\(\\neg P \\lor Q\\) ; nier ce « ou » donne un « et » avec chaque terme nié.',
  },
  {
    id: 'ex3', section: 'propositions',
    statement: 'La négation de \\(P \\land Q\\) (loi de De Morgan) est :',
    options: ['\\(\\neg P \\lor \\neg Q\\)', '\\(\\neg P \\land \\neg Q\\)', '\\(P \\lor Q\\)'],
    correctIndex: 0,
    explain: 'La négation d’un « et » devient un « ou » de négations (loi de De Morgan).',
  },
  {
    id: 'ex4', section: 'propositions',
    statement: '\\(P \\Rightarrow Q\\) est logiquement équivalente à :',
    options: [
      '\\(\\neg Q \\Rightarrow \\neg P\\) (contraposée)',
      '\\(Q \\Rightarrow P\\) (réciproque)',
      '\\(\\neg P \\Rightarrow \\neg Q\\)',
    ],
    correctIndex: 0,
    explain: 'La contraposée a exactement la même table de vérité que l’implication de départ ; la réciproque n’est pas équivalente.',
  },
  {
    id: 'ex5', section: 'quantificateurs',
    statement: 'La négation de \\(\\forall x \\in \\mathbb{R},\\ x^2 \\geq 0\\) est :',
    options: [
      '\\(\\exists x \\in \\mathbb{R},\\ x^2 < 0\\)',
      '\\(\\forall x \\in \\mathbb{R},\\ x^2 < 0\\)',
      '\\(\\exists x \\in \\mathbb{R},\\ x^2 \\geq 0\\)',
    ],
    correctIndex: 0,
    explain: 'Nier un \\(\\forall\\) donne un \\(\\exists\\), et on nie aussi l’inégalité (\\(\\geq\\) devient \\(<\\)).',
  },
  {
    id: 'ex6', section: 'quantificateurs',
    statement: 'La négation de \\(\\exists x \\in E,\\ P(x)\\) est :',
    options: [
      '\\(\\exists x \\in E,\\ \\neg P(x)\\)',
      '\\(\\forall x \\in E,\\ \\neg P(x)\\)',
      '\\(\\forall x \\in E,\\ P(x)\\)',
    ],
    correctIndex: 1,
    explain: 'Nier un \\(\\exists\\) donne un \\(\\forall\\), appliqué à la négation de \\(P(x)\\) — le quantificateur ET la proposition changent.',
  },
  {
    id: 'ex7', section: 'quantificateurs',
    statement: 'La négation de \\(\\exists x \\in \\mathbb{N},\\ x + 1 = 0\\) est :',
    options: [
      '\\(\\forall x \\in \\mathbb{N},\\ x + 1 \\neq 0\\)',
      '\\(\\exists x \\in \\mathbb{N},\\ x + 1 \\neq 0\\)',
      '\\(\\forall x \\in \\mathbb{N},\\ x + 1 = 0\\)',
    ],
    correctIndex: 0,
    explain: 'On inverse le quantificateur (\\(\\exists \\to \\forall\\)) et on nie l’égalité (\\(=\\) devient \\(\\neq\\)).',
  },
  {
    id: 'ex8', section: 'raisonnements',
    statement: 'La contraposée de \\(P \\Rightarrow Q\\) est :',
    options: ['\\(\\neg Q \\Rightarrow \\neg P\\)', '\\(Q \\Rightarrow P\\)', '\\(\\neg P \\Rightarrow \\neg Q\\)'],
    correctIndex: 0,
    explain: 'La contraposée s’obtient en inversant les deux membres de l’implication ET en les niant tous les deux.',
  },
  {
    id: 'ex9', section: 'raisonnements',
    statement: 'En appliquant la loi de De Morgan, \\(\\neg(P \\lor Q)\\) est égal à :',
    options: ['\\(\\neg P \\land \\neg Q\\)', '\\(\\neg P \\lor \\neg Q\\)', '\\(P \\land Q\\)'],
    correctIndex: 0,
    explain: 'Nier un « ou » donne un « et » de négations — symétrique de la négation d’un « et ».',
  },
  {
    id: 'ex10', section: 'raisonnements',
    statement: 'Le principe de récurrence pour démontrer \\(P(n)\\) pour tout \\(n \\geq n_0\\) repose sur :',
    options: [
      '\\(P(n_0)\\) vraie, puis \\(P(n) \\Rightarrow P(n+1)\\)',
      '\\(P(n_0)\\) vraie, puis \\(P(n+1) \\Rightarrow P(n)\\)',
      '\\(P(n)\\) vraie pour un seul \\(n\\)',
    ],
    correctIndex: 0,
    explain: 'L’hérédité \\(P(n) \\Rightarrow P(n+1)\\) combinée à l’initialisation propage la vérité de proche en proche à tous les rangs suivants.',
  },
];

const SECTIONS = [
  {
    id: 'propositions', title: '§1 — PROPOSITIONS',
    cours: 'Proposition = énoncé vrai ou faux<br>\\(\\neg\\) (non), \\(\\land\\) (et), \\(\\lor\\) (ou), \\(\\Rightarrow\\) (implique), \\(\\Leftrightarrow\\) (équivalent)<br><span class="math">Tautologie</span> = toujours vraie',
  },
  {
    id: 'quantificateurs', title: '§2 — QUANTIFICATEURS',
    cours: '\\(\\forall\\) = pour tout, \\(\\exists\\) = il existe<br>\\(\\neg(\\forall x,\\ P(x)) \\Leftrightarrow \\exists x,\\ \\neg P(x)\\)<br>\\(\\neg(\\exists x,\\ P(x)) \\Leftrightarrow \\forall x,\\ \\neg P(x)\\)',
  },
  {
    id: 'raisonnements', title: '§3 — RAISONNEMENTS',
    cours: '<span class="math">Contraposée</span> : \\(P \\Rightarrow Q \\Leftrightarrow \\neg Q \\Rightarrow \\neg P\\)<br><span class="math">De Morgan</span> : \\(\\neg(P \\lor Q) \\Leftrightarrow \\neg P \\land \\neg Q\\), \\(\\neg(P \\land Q) \\Leftrightarrow \\neg P \\lor \\neg Q\\)<br><span class="math">Récurrence</span> : \\(P(n_0)\\) puis \\(P(n) \\Rightarrow P(n+1)\\) \\(\\Rightarrow\\) \\(P(n)\\) vrai \\(\\forall n \\geq n_0\\)',
  },
];

/* ---------- typographie LaTeX (KaTeX) ---------- */
function typesetMath(el){
  if(window.renderMathInElement && el){
    window.renderMathInElement(el, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
      throwOnError: false,
    });
  }
}

/* ---------- état / progression ---------- */
function loadState(){
  try{ return JSON.parse(localStorage.getItem(STATE_KEY)) || {}; }
  catch(e){ return {}; }
}

function saveState(state){
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
  syncProgress(state);
}

function syncProgress(state){
  const entries = Object.values(state);
  const completed = entries.filter(e => e.answered).length;
  const correct = entries.filter(e => e.correct).length;

  let progress = {};
  try{ progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch(e){ progress = {}; }

  progress[CHAPTER_ID] = { completed, correct };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  updateScoreHeader(completed, correct);
}

function updateScoreHeader(completed, correct){
  const el = document.getElementById('ficheScore');
  if(el){
    el.textContent = `SCORE : ${correct}/${EXERCISES.length}   —   COMPLÉTÉS : ${completed}/${EXERCISES.length}`;
  }
}

/* ---------- rendu ---------- */
function exoControlsHTML(ex){
  const opts = ex.options.map((opt, i) => `
    <label><input type="radio" name="${ex.id}" value="${i}"> <span>${opt}</span></label>
  `).join('');
  return `<div class="qcm-options">${opts}</div>`;
}

function renderSections(){
  const container = document.getElementById('sectionsContainer');
  if(!container) return;

  container.innerHTML = SECTIONS.map(sec => {
    const exos = EXERCISES.filter(e => e.section === sec.id);
    const exosHTML = exos.map(ex => `
      <div class="exo" id="exo-${ex.id}" data-id="${ex.id}">
        <div class="exo__head">
          <span>EXERCICE ${EXERCISES.indexOf(ex) + 1}/${EXERCISES.length}</span>
        </div>
        <div class="exo__statement">${ex.statement}</div>
        ${exoControlsHTML(ex)}
        <div class="exo__feedback" id="feedback-${ex.id}"></div>
      </div>
    `).join('');

    return `
      <section class="section" id="section-${sec.id}">
        <div class="section__title">${sec.title}</div>
        <p class="cours">${sec.cours}</p>
        ${exosHTML}
      </section>
    `;
  }).join('');

  typesetMath(container);
}

/* ---------- vérification ---------- */
function applyFeedback(ex, selectedIndex, state){
  const isCorrect = selectedIndex === ex.correctIndex;
  const exoEl = document.getElementById(`exo-${ex.id}`);
  const feedbackEl = document.getElementById(`feedback-${ex.id}`);

  exoEl.classList.remove('answered', 'ok', 'ko');
  exoEl.classList.add('answered', isCorrect ? 'ok' : 'ko');
  feedbackEl.classList.remove('ok', 'ko');
  feedbackEl.classList.add(isCorrect ? 'ok' : 'ko');

  if(isCorrect){
    feedbackEl.textContent = '✓ CORRECT';
  }else{
    const explainLine = ex.explain ? `<br>→ ${ex.explain}` : '';
    feedbackEl.innerHTML = `✗ INCORRECT — réponse attendue : ${ex.options[ex.correctIndex]}${explainLine}`;
    typesetMath(feedbackEl);
  }

  state[ex.id] = { answered: true, correct: isCorrect, selectedIndex };
  saveState(state);
}

function bindExercise(ex, state){
  const exoEl = document.getElementById(`exo-${ex.id}`);
  const radios = exoEl.querySelectorAll(`input[name="${ex.id}"]`);

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      applyFeedback(ex, Number(radio.value), state);
    });
  });
}

function restoreState(state){
  EXERCISES.forEach(ex => {
    const s = state[ex.id];
    if(s && s.answered){
      const exoEl = document.getElementById(`exo-${ex.id}`);
      const feedbackEl = document.getElementById(`feedback-${ex.id}`);
      exoEl.classList.add('answered', s.correct ? 'ok' : 'ko');
      feedbackEl.classList.add(s.correct ? 'ok' : 'ko');
      if(s.correct){
        feedbackEl.textContent = '✓ CORRECT (déjà validé)';
      }else{
        const explainLine = ex.explain ? `<br>→ ${ex.explain}` : '';
        feedbackEl.innerHTML = `✗ INCORRECT (déjà tenté — vous pouvez réessayer)${explainLine}`;
        typesetMath(feedbackEl);
      }
      if(typeof s.selectedIndex === 'number'){
        const radio = exoEl.querySelector(`input[name="${ex.id}"][value="${s.selectedIndex}"]`);
        if(radio) radio.checked = true;
      }
    }
  });
}

function resetChapter(){
  if(!confirm('Réinitialiser ce chapitre ? Toutes tes réponses seront effacées.')) return;
  localStorage.removeItem(STATE_KEY);
  let progress = {};
  try{ progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch(e){ progress = {}; }
  delete progress[CHAPTER_ID];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  renderSections();
  const state = loadState();
  EXERCISES.forEach(ex => bindExercise(ex, state));
  restoreState(state);
  syncProgress(state);
  const resetBtn = document.getElementById('resetChapterBtn');
  if(resetBtn) resetBtn.addEventListener('click', resetChapter);
});
