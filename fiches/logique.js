/* ============================================================
   L1 MATHS — SYNTHÉTIQUE — fiches/logique.js
   Rendu + vérification des 10 exercices de la fiche LOGIQUE.
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_logique_state';
const CHAPTER_ID = 'logique';

/* ---------- normalisation des réponses texte ---------- */
function normalize(raw){
  let s = ' ' + raw.toLowerCase().trim() + ' ';

  // phrases -> symboles (avant suppression des espaces)
  s = s.replace(/quel que soit/g, '∀')
       .replace(/pour tout(e|es)?/g, '∀')
       .replace(/il existe au moins un(e)?/g, '∃')
       .replace(/il existe/g, '∃')
       .replace(/n'appartient pas|n appartient pas/g, '∉')
       .replace(/appartient/g, '∈')
       .replace(/\bet\b/g, '∧')
       .replace(/\bou\b/g, '∨')
       .replace(/\bnon\b/g, '¬');

  // symboles ascii -> unicode
  s = s.replace(/<=>|<->/g, '⟺')
       .replace(/=>|->|-->/g, '⟹')
       .replace(/!=|<>/g, '≠')
       .replace(/>=/g, '≥')
       .replace(/<=/g, '≤')
       .replace(/\^2/g, '²')
       .replace(/\*\*2/g, '²');

  // lettres isolées d'ensembles usuels
  s = s.replace(/\br\b/g, 'ℝ')
       .replace(/\bn\b/g, 'ℕ')
       .replace(/\bz\b/g, 'ℤ')
       .replace(/\bq\b/g, 'ℚ');

  // ponctuation / espaces
  s = s.replace(/[",.;]/g, '');
  s = s.replace(/\s+/g, '');
  return s;
}

function matchesAny(userRaw, acceptedList){
  const u = normalize(userRaw);
  if(u.length === 0) return false;
  return acceptedList.some(a => normalize(a) === u);
}

/* ---------- données des exercices ---------- */
const EXERCISES = [
  {
    id: 'ex1', section: 'propositions', type: 'bool',
    statement: 'P ∨ ¬P est une tautologie (toujours vraie).',
    correct: true,
  },
  {
    id: 'ex2', section: 'propositions', type: 'qcm',
    statement: 'La négation de « P ⟹ Q » est équivalente à :',
    options: ['¬P ⟹ ¬Q', 'P ∧ ¬Q', '¬P ∨ Q', 'Q ⟹ P'],
    correctIndex: 1,
  },
  {
    id: 'ex3', section: 'propositions', type: 'input',
    statement: 'Donnez la négation de « P ∧ Q » (loi de De Morgan).',
    accepted: ['¬P ∨ ¬Q', '¬P∨¬Q', 'non P ou non Q'],
    hint: 'Forme : ¬P ∨ ¬Q',
  },
  {
    id: 'ex4', section: 'propositions', type: 'bool',
    statement: '« P ⟹ Q » est équivalente à sa contraposée « ¬Q ⟹ ¬P ».',
    correct: true,
  },
  {
    id: 'ex5', section: 'quantificateurs', type: 'input',
    statement: 'Écrivez la négation de : « ∀x ∈ ℝ, x² ≥ 0 »',
    accepted: ['∃x ∈ ℝ, x² < 0', '∃x∈ℝ, x²<0', 'il existe x dans R tel que x^2 < 0'],
    hint: 'Forme : ∃x ∈ ℝ, x² < 0',
  },
  {
    id: 'ex6', section: 'quantificateurs', type: 'qcm',
    statement: 'La négation de « ∃x ∈ E, P(x) » est :',
    options: ['∃x ∈ E, ¬P(x)', '∀x ∈ E, ¬P(x)', '∀x ∈ E, P(x)', 'Cette proposition n’a pas de négation'],
    correctIndex: 1,
  },
  {
    id: 'ex7', section: 'quantificateurs', type: 'input',
    statement: 'Écrivez la négation de : « ∃x ∈ ℕ, x + 1 = 0 »',
    accepted: ['∀x ∈ ℕ, x + 1 ≠ 0', '∀x∈ℕ, x+1≠0', 'pour tout x dans N, x+1 different de 0'],
    hint: 'Forme : ∀x ∈ ℕ, x + 1 ≠ 0',
  },
  {
    id: 'ex8', section: 'raisonnements', type: 'qcm',
    statement: 'La contraposée de « P ⟹ Q » est :',
    options: ['¬Q ⟹ ¬P', 'Q ⟹ P', '¬P ⟹ ¬Q', '¬P ⟹ Q'],
    correctIndex: 0,
  },
  {
    id: 'ex9', section: 'raisonnements', type: 'input',
    statement: 'Appliquez la loi de De Morgan à : ¬(P ∨ Q)',
    accepted: ['¬P ∧ ¬Q', '¬P∧¬Q', 'non P et non Q'],
    hint: 'Forme : ¬P ∧ ¬Q',
  },
  {
    id: 'ex10', section: 'raisonnements', type: 'bool',
    statement: 'Le principe de récurrence permet de démontrer P(n) pour tout n ≥ n₀ en établissant P(n₀), puis P(n) ⟹ P(n+1).',
    correct: true,
  },
];

const SECTIONS = [
  { id: 'propositions',     title: '§1 — PROPOSITIONS',
    cours: 'Une proposition est un énoncé vrai ou faux. On la combine avec les connecteurs ¬ (non), ∧ (et), ∨ (ou), ⟹ (implique), ⟺ (équivalent). Une <span class="math">tautologie</span> est une proposition toujours vraie, quelles que soient les valeurs de vérité de ses composantes.' },
  { id: 'quantificateurs',  title: '§2 — QUANTIFICATEURS',
    cours: 'Le quantificateur universel ∀ signifie « pour tout », l’existentiel ∃ signifie « il existe ». Règle de négation : ¬(∀x, P(x)) ⟺ ∃x, ¬P(x), et ¬(∃x, P(x)) ⟺ ∀x, ¬P(x). On inverse le quantificateur et on nie la proposition.' },
  { id: 'raisonnements',    title: '§3 — RAISONNEMENTS',
    cours: 'La <span class="math">contraposée</span> de P ⟹ Q est ¬Q ⟹ ¬P (logiquement équivalente). Les lois de <span class="math">De Morgan</span> : ¬(P ∨ Q) ⟺ ¬P ∧ ¬Q et ¬(P ∧ Q) ⟺ ¬P ∨ ¬Q. Le <span class="math">raisonnement par récurrence</span> établit P(n₀) (initialisation) puis P(n) ⟹ P(n+1) (hérédité) pour conclure P(n) vrai pour tout n ≥ n₀.' },
];

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
  if(ex.type === 'bool'){
    return `
      <div class="exo__controls">
        <button class="term-btn" data-answer="true">VRAI</button>
        <button class="term-btn" data-answer="false">FAUX</button>
      </div>`;
  }
  if(ex.type === 'qcm'){
    const opts = ex.options.map((opt, i) => `
      <label><input type="radio" name="${ex.id}" value="${i}"> ${opt}</label>
    `).join('');
    return `
      <div class="qcm-options">${opts}</div>
      <div class="exo__controls">
        <button class="term-btn" data-action="validate">VALIDER</button>
      </div>`;
  }
  // input
  return `
    <div class="exo__controls">
      <input type="text" class="term-input" placeholder="Votre réponse...">
      <button class="term-btn" data-action="validate">VALIDER</button>
    </div>`;
}

function renderSections(){
  const container = document.getElementById('sectionsContainer');
  if(!container) return;

  container.innerHTML = SECTIONS.map(sec => {
    const exos = EXERCISES.filter(e => e.section === sec.id);
    const exosHTML = exos.map((ex, idx) => `
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
}

/* ---------- vérification ---------- */
function checkAnswer(ex, userValue){
  if(ex.type === 'bool'){
    return userValue === ex.correct;
  }
  if(ex.type === 'qcm'){
    return Number(userValue) === ex.correctIndex;
  }
  return matchesAny(userValue, ex.accepted);
}

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
    let expected = '';
    if(ex.type === 'bool') expected = ex.correct ? 'VRAI' : 'FAUX';
    else if(ex.type === 'qcm') expected = ex.options[ex.correctIndex];
    else expected = ex.hint || ex.accepted[0];
    feedbackEl.textContent = `✗ INCORRECT — réponse attendue : ${expected}`;
  }

  state[ex.id] = { answered: true, correct: isCorrect };
  saveState(state);
}

function bindExercise(ex, state){
  const exoEl = document.getElementById(`exo-${ex.id}`);

  if(ex.type === 'bool'){
    exoEl.querySelectorAll('button[data-answer]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.answer === 'true';
        applyFeedback(ex, checkAnswer(ex, val), state);
      });
    });
    return;
  }

  if(ex.type === 'qcm'){
    const validateBtn = exoEl.querySelector('[data-action="validate"]');
    validateBtn.addEventListener('click', () => {
      const checked = exoEl.querySelector(`input[name="${ex.id}"]:checked`);
      if(!checked){
        const fb = document.getElementById(`feedback-${ex.id}`);
        fb.classList.remove('ok'); fb.classList.add('ko');
        fb.textContent = '✗ Choisissez une réponse.';
        return;
      }
      applyFeedback(ex, checkAnswer(ex, checked.value), state);
    });
    return;
  }

  // input
  const input = exoEl.querySelector('.term-input');
  const validateBtn = exoEl.querySelector('[data-action="validate"]');
  const submit = () => applyFeedback(ex, checkAnswer(ex, input.value), state);
  validateBtn.addEventListener('click', submit);
  input.addEventListener('keydown', e => {
    if(e.key === 'Enter') submit();
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
