/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/logique.js
   Rendu + vérification des 10 exercices de la fiche LOGIQUE.
   Tous les exercices sont des QCM à 4 réponses. Les formules
   sont écrites en LaTeX et typesetées avec KaTeX.
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_logique_state';
const CHAPTER_ID = 'logique';

/* ---------- données des exercices (QCM, 4 réponses) ---------- */
const EXERCISES = [
  {
    id: 'ex1', section: 'propositions',
    statement: '\\(P \\lor \\neg P\\) est :',
    options: [
      'Une tautologie (toujours vraie)',
      'Une contradiction (toujours fausse)',
      'Vraie seulement si \\(P\\) est vraie',
      'Indéterminable',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex2', section: 'propositions',
    statement: 'La négation de \\(P \\Rightarrow Q\\) est équivalente à :',
    options: ['\\(\\neg P \\Rightarrow \\neg Q\\)', '\\(P \\land \\neg Q\\)', '\\(\\neg P \\lor Q\\)', '\\(Q \\Rightarrow P\\)'],
    correctIndex: 1,
  },
  {
    id: 'ex3', section: 'propositions',
    statement: 'La négation de \\(P \\land Q\\) (loi de De Morgan) est :',
    options: ['\\(\\neg P \\lor \\neg Q\\)', '\\(\\neg P \\land \\neg Q\\)', '\\(P \\lor Q\\)', '\\(\\neg(P \\lor Q)\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex4', section: 'propositions',
    statement: '\\(P \\Rightarrow Q\\) est logiquement équivalente à :',
    options: [
      '\\(\\neg Q \\Rightarrow \\neg P\\) (contraposée)',
      '\\(Q \\Rightarrow P\\) (réciproque)',
      '\\(\\neg P \\Rightarrow \\neg Q\\)',
      '\\(P \\land \\neg Q\\)',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex5', section: 'quantificateurs',
    statement: 'La négation de \\(\\forall x \\in \\mathbb{R},\\ x^2 \\geq 0\\) est :',
    options: [
      '\\(\\exists x \\in \\mathbb{R},\\ x^2 < 0\\)',
      '\\(\\forall x \\in \\mathbb{R},\\ x^2 < 0\\)',
      '\\(\\exists x \\in \\mathbb{R},\\ x^2 \\geq 0\\)',
      '\\(\\forall x \\in \\mathbb{R},\\ x^2 \\leq 0\\)',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex6', section: 'quantificateurs',
    statement: 'La négation de \\(\\exists x \\in E,\\ P(x)\\) est :',
    options: [
      '\\(\\exists x \\in E,\\ \\neg P(x)\\)',
      '\\(\\forall x \\in E,\\ \\neg P(x)\\)',
      '\\(\\forall x \\in E,\\ P(x)\\)',
      'Cette proposition n’a pas de négation',
    ],
    correctIndex: 1,
  },
  {
    id: 'ex7', section: 'quantificateurs',
    statement: 'La négation de \\(\\exists x \\in \\mathbb{N},\\ x + 1 = 0\\) est :',
    options: [
      '\\(\\forall x \\in \\mathbb{N},\\ x + 1 \\neq 0\\)',
      '\\(\\exists x \\in \\mathbb{N},\\ x + 1 \\neq 0\\)',
      '\\(\\forall x \\in \\mathbb{N},\\ x + 1 = 0\\)',
      '\\(\\exists x \\in \\mathbb{Z},\\ x + 1 = 0\\)',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex8', section: 'raisonnements',
    statement: 'La contraposée de \\(P \\Rightarrow Q\\) est :',
    options: ['\\(\\neg Q \\Rightarrow \\neg P\\)', '\\(Q \\Rightarrow P\\)', '\\(\\neg P \\Rightarrow \\neg Q\\)', '\\(\\neg P \\Rightarrow Q\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex9', section: 'raisonnements',
    statement: 'En appliquant la loi de De Morgan, \\(\\neg(P \\lor Q)\\) est égal à :',
    options: ['\\(\\neg P \\land \\neg Q\\)', '\\(\\neg P \\lor \\neg Q\\)', '\\(P \\land Q\\)', '\\(\\neg P \\Rightarrow \\neg Q\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex10', section: 'raisonnements',
    statement: 'Le principe de récurrence pour démontrer \\(P(n)\\) pour tout \\(n \\geq n_0\\) repose sur :',
    options: [
      '\\(P(n_0)\\) vraie, puis \\(P(n) \\Rightarrow P(n+1)\\)',
      '\\(P(n_0)\\) vraie, puis \\(P(n+1) \\Rightarrow P(n)\\)',
      '\\(P(n)\\) vraie pour un seul \\(n\\)',
      '\\(P(n_0)\\) fausse, puis \\(P(n) \\Rightarrow P(n+1)\\)',
    ],
    correctIndex: 0,
  },
];

const SECTIONS = [
  {
    id: 'propositions', title: '§1 — PROPOSITIONS',
    cours: 'Une proposition est un énoncé vrai ou faux. On la combine avec les connecteurs \\(\\neg\\) (non), \\(\\land\\) (et), \\(\\lor\\) (ou), \\(\\Rightarrow\\) (implique), \\(\\Leftrightarrow\\) (équivalent). Une <span class="math">tautologie</span> est une proposition toujours vraie, quelles que soient les valeurs de vérité de ses composantes.',
  },
  {
    id: 'quantificateurs', title: '§2 — QUANTIFICATEURS',
    cours: 'Le quantificateur universel \\(\\forall\\) signifie « pour tout », l’existentiel \\(\\exists\\) signifie « il existe ». Règle de négation : \\(\\neg(\\forall x,\\ P(x)) \\Leftrightarrow \\exists x,\\ \\neg P(x)\\), et \\(\\neg(\\exists x,\\ P(x)) \\Leftrightarrow \\forall x,\\ \\neg P(x)\\). On inverse le quantificateur et on nie la proposition.',
  },
  {
    id: 'raisonnements', title: '§3 — RAISONNEMENTS',
    cours: 'La <span class="math">contraposée</span> de \\(P \\Rightarrow Q\\) est \\(\\neg Q \\Rightarrow \\neg P\\) (logiquement équivalente). Les lois de <span class="math">De Morgan</span> : \\(\\neg(P \\lor Q) \\Leftrightarrow \\neg P \\land \\neg Q\\) et \\(\\neg(P \\land Q) \\Leftrightarrow \\neg P \\lor \\neg Q\\). Le <span class="math">raisonnement par récurrence</span> établit \\(P(n_0)\\) (initialisation) puis \\(P(n) \\Rightarrow P(n+1)\\) (hérédité) pour conclure \\(P(n)\\) vrai pour tout \\(n \\geq n_0\\).',
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
  return `
    <div class="qcm-options">${opts}</div>
    <div class="exo__controls">
      <button class="term-btn" data-action="validate">VALIDER</button>
    </div>`;
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
function applyFeedback(ex, isCorrect, state){
  const exoEl = document.getElementById(`exo-${ex.id}`);
  const feedbackEl = document.getElementById(`feedback-${ex.id}`);

  exoEl.classList.remove('answered', 'ok', 'ko');
  exoEl.classList.add('answered', isCorrect ? 'ok' : 'ko');
  feedbackEl.classList.remove('ok', 'ko');
  feedbackEl.classList.add(isCorrect ? 'ok' : 'ko');

  if(isCorrect){
    feedbackEl.textContent = '✓ CORRECT';
  }else{
    feedbackEl.innerHTML = `✗ INCORRECT — réponse attendue : ${ex.options[ex.correctIndex]}`;
    typesetMath(feedbackEl);
  }

  state[ex.id] = { answered: true, correct: isCorrect };
  saveState(state);
}

function bindExercise(ex, state){
  const exoEl = document.getElementById(`exo-${ex.id}`);
  const validateBtn = exoEl.querySelector('[data-action="validate"]');

  validateBtn.addEventListener('click', () => {
    const checked = exoEl.querySelector(`input[name="${ex.id}"]:checked`);
    if(!checked){
      const fb = document.getElementById(`feedback-${ex.id}`);
      fb.classList.remove('ok'); fb.classList.add('ko');
      fb.textContent = '✗ Choisissez une réponse.';
      return;
    }
    applyFeedback(ex, Number(checked.value) === ex.correctIndex, state);
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
      feedbackEl.textContent = s.correct ? '✓ CORRECT (déjà validé)' : '✗ INCORRECT (déjà tenté — vous pouvez réessayer)';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSections();
  const state = loadState();
  EXERCISES.forEach(ex => bindExercise(ex, state));
  restoreState(state);
  syncProgress(state);
});
