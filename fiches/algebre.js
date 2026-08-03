/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/algebre.js
   Fiche ALGÈBRE — Nombres complexes.
   Source : Algèbre linéaire 1, Pascal Ortiz, L1 mathématiques,
   INU Champollion (chapitre I : Nombres complexes).
   QCM à 3 réponses, formules en LaTeX typesetées avec KaTeX.
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_algebre_state';
const CHAPTER_ID = 'algebre';

const EXERCISES = [
  {
    id: 'ex1', section: 'definition',
    statement: '\\(i^2\\) est égal à :',
    options: ['\\(-1\\)', '\\(1\\)', '\\(i\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex2', section: 'definition',
    statement: 'L’écriture \\(z = a + ib\\) (avec \\(a, b \\in \\mathbb{R}\\)) d’un nombre complexe \\(z\\) est :',
    options: ['Toujours unique', 'Possible seulement si \\(b = 0\\)', 'Jamais unique'],
    correctIndex: 0,
  },
  {
    id: 'ex3', section: 'definition',
    statement: 'Pour \\(a, b \\in \\mathbb{C}\\), \\(a^2 + b^2\\) se factorise en :',
    options: ['\\((a+ib)(a-ib)\\)', '\\((a+b)^2\\)', '\\((a-ib)^2\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex4', section: 'algebrique',
    statement: 'Si \\(z = 3 - 4i\\), alors \\(|z|\\) vaut :',
    options: ['\\(5\\)', '\\(7\\)', '\\(1\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex5', section: 'algebrique',
    statement: 'Le conjugué de \\(z = a + ib\\) est :',
    options: ['\\(a - ib\\)', '\\(-a + ib\\)', '\\(-a - ib\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex6', section: 'algebrique',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), \\(|zz\'|\\) est égal à :',
    options: ['\\(|z| \\times |z\'|\\)', '\\(|z| + |z\'|\\)', '\\(|z| - |z\'|\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex7', section: 'trigo',
    statement: 'La forme exponentielle de \\(i\\) est :',
    options: ['\\(e^{i\\pi/2}\\)', '\\(e^{i\\pi}\\)', '\\(e^{2i\\pi}\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex8', section: 'trigo',
    statement: 'La formule de Moivre s’écrit \\((\\cos t + i\\sin t)^n =\\)',
    options: [
      '\\(\\cos(nt) + i\\sin(nt)\\)',
      '\\(n\\cos t + in\\sin t\\)',
      '\\(\\cos^n t + i\\sin^n t\\)',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex9', section: 'trigo',
    statement: 'D’après les formules d’Euler, \\(\\cos t\\) vaut :',
    options: [
      '\\(\\dfrac{e^{it} + e^{-it}}{2}\\)',
      '\\(\\dfrac{e^{it} - e^{-it}}{2}\\)',
      '\\(\\dfrac{e^{it}}{2}\\)',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex10', section: 'equations',
    statement: 'Un nombre complexe non nul admet toujours :',
    options: [
      'Exactement deux racines carrées, opposées l’une de l’autre',
      'Une seule racine carrée',
      'Trois racines carrées',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex11', section: 'equations',
    statement: 'Dans \\(\\mathbb{C}\\), l’équation \\(az^2 + bz + c = 0\\) (avec \\(a \\neq 0\\)) admet toujours :',
    options: ['Au moins une solution', 'Zéro ou deux solutions', 'Exactement une solution'],
    correctIndex: 0,
  },
  {
    id: 'ex12', section: 'equations',
    statement: 'Les \\(n\\) racines \\(n\\)-ièmes de l’unité forment, dans le plan complexe :',
    options: [
      'Un polygone régulier à \\(n\\) côtés, inscrit dans le cercle trigonométrique',
      'Une droite passant par l’origine',
      'Un cercle de rayon \\(n\\)',
    ],
    correctIndex: 0,
  },
];

const SECTIONS = [
  {
    id: 'definition', title: '§1 — DÉFINITION DE ℂ',
    cours: 'On construit un ensemble \\(\\mathbb{C}\\) contenant \\(\\mathbb{R}\\), muni d’une addition et d’une multiplication qui prolongent celles de \\(\\mathbb{R}\\), et contenant un nombre \\(i\\) tel que \\(i^2 = -1\\). Tout nombre complexe \\(z\\) s’écrit de manière <span class="math">unique</span> \\(z = a + ib\\) avec \\(a, b \\in \\mathbb{R}\\). \\(\\mathbb{C}\\) a, comme \\(\\mathbb{R}\\), une structure de <span class="math">corps commutatif</span> : addition et multiplication y sont commutatives, associatives, distributives, avec éléments neutres et inverses.',
  },
  {
    id: 'algebrique', title: '§2 — FORME ALGÉBRIQUE',
    cours: 'Pour \\(z = a + ib\\), \\(a = \\text{Re}(z)\\) est la partie réelle et \\(b = \\text{Im}(z)\\) la partie imaginaire. Le <span class="math">conjugué</span> de \\(z\\) est \\(\\bar z = a - ib\\), avec \\(\\text{Re}(z) = \\dfrac{z+\\bar z}{2}\\) et \\(\\text{Im}(z) = \\dfrac{z-\\bar z}{2i}\\). Le <span class="math">module</span> \\(|z| = \\sqrt{a^2+b^2} = \\sqrt{z\\bar z}\\) vérifie \\(|zz\'| = |z||z\'|\\) et l’inégalité triangulaire \\(|z+z\'| \\leq |z|+|z\'|\\).',
  },
  {
    id: 'trigo', title: '§3 — FORME TRIGONOMÉTRIQUE ET EXPONENTIELLE',
    cours: 'Pour \\(z \\neq 0\\), on écrit \\(z = \\varrho(\\cos\\theta + i\\sin\\theta) = \\varrho e^{i\\theta}\\) où \\(\\varrho = |z|\\) et \\(\\theta = \\arg(z)\\) (unique modulo \\(2\\pi\\)). <span class="math">Formules d’Euler</span> : \\(\\cos t = \\dfrac{e^{it}+e^{-it}}{2}\\), \\(\\sin t = \\dfrac{e^{it}-e^{-it}}{2i}\\). <span class="math">Formule de Moivre</span> : \\((e^{it})^n = e^{int}\\). À connaître par cœur : \\(i = e^{i\\pi/2}\\), \\(-i = e^{-i\\pi/2}\\), \\(-1 = e^{i\\pi}\\).',
  },
  {
    id: 'equations', title: '§4 — ÉQUATIONS DANS ℂ',
    cours: 'Tout \\(z \\in \\mathbb{C}^*\\) admet exactement deux <span class="math">racines carrées</span> complexes, opposées (jamais notées \\(\\sqrt{z}\\), sauf si \\(z\\) est réel positif). Pour \\(az^2+bz+c=0\\) (\\(a \\neq 0\\)), on calcule \\(\\Delta = b^2-4ac \\in \\mathbb{C}\\) : si \\(\\Delta = 0\\), une solution \\(-\\dfrac{b}{2a}\\) ; sinon deux solutions \\(\\dfrac{-b \\pm \\delta}{2a}\\) où \\(\\delta^2 = \\Delta\\). L’équation \\(Z^n = z\\) (\\(z \\neq 0\\)) admet exactement \\(n\\) solutions, les <span class="math">racines n-ièmes</span>.',
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
    feedbackEl.innerHTML = `✗ INCORRECT — réponse attendue : ${ex.options[ex.correctIndex]}`;
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
      feedbackEl.textContent = s.correct ? '✓ CORRECT (déjà validé)' : '✗ INCORRECT (déjà tenté — vous pouvez réessayer)';
      if(typeof s.selectedIndex === 'number'){
        const radio = exoEl.querySelector(`input[name="${ex.id}"][value="${s.selectedIndex}"]`);
        if(radio) radio.checked = true;
      }
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
