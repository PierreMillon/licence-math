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
    explain: 'Par définition, \\(i\\) est un nombre tel que \\(i^2=-1\\) — c’est la propriété fondatrice de \\(\\mathbb{C}\\).',
  },
  {
    id: 'ex2', section: 'definition',
    statement: 'L’écriture \\(z = a + ib\\) (avec \\(a, b \\in \\mathbb{R}\\)) d’un nombre complexe \\(z\\) est :',
    options: ['Toujours unique', 'Possible seulement si \\(b = 0\\)', 'Jamais unique'],
    correctIndex: 0,
    explain: 'L’unicité de l’écriture algébrique (parties réelle et imaginaire) est une propriété fondamentale de la construction de \\(\\mathbb{C}\\).',
  },
  {
    id: 'ex3', section: 'definition',
    statement: 'Pour \\(a, b \\in \\mathbb{C}\\), \\(a^2 + b^2\\) se factorise en :',
    options: ['\\((a+ib)(a-ib)\\)', '\\((a+b)^2\\)', '\\((a-ib)^2\\)'],
    correctIndex: 0,
    explain: 'En développant \\((a+ib)(a-ib) = a^2 - (ib)^2 = a^2 + b^2\\) car \\(i^2=-1\\).',
  },
  {
    id: 'ex4', section: 'algebrique',
    statement: 'Si \\(z = 3 - 4i\\), alors \\(|z|\\) vaut :',
    options: ['\\(5\\)', '\\(7\\)', '\\(1\\)'],
    correctIndex: 0,
    explain: '\\(|z| = \\sqrt{\\text{Re}(z)^2+\\text{Im}(z)^2} = \\sqrt{3^2+4^2} = \\sqrt{25} = 5\\).',
  },
  {
    id: 'ex5', section: 'algebrique',
    statement: 'Le conjugué de \\(z = a + ib\\) est :',
    options: ['\\(a - ib\\)', '\\(-a + ib\\)', '\\(-a - ib\\)'],
    correctIndex: 0,
    explain: 'Le conjugué garde la partie réelle inchangée et inverse uniquement le signe de la partie imaginaire.',
  },
  {
    id: 'ex6', section: 'algebrique',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), \\(|zz\'|\\) est égal à :',
    options: ['\\(|z| \\times |z\'|\\)', '\\(|z| + |z\'|\\)', '\\(|z| - |z\'|\\)'],
    correctIndex: 0,
    explain: 'Le module est multiplicatif : \\(|zz\'|^2 = (zz\')\\overline{(zz\')} = (z\\bar z)(z\'\\overline{z\'}) = |z|^2|z\'|^2\\).',
  },
  {
    id: 'ex7', section: 'trigo',
    statement: 'La forme exponentielle de \\(i\\) est :',
    options: ['\\(e^{i\\pi/2}\\)', '\\(e^{i\\pi}\\)', '\\(e^{2i\\pi}\\)'],
    correctIndex: 0,
    explain: '\\(i\\) est de module 1 et d’argument \\(\\pi/2\\) : sur le cercle trigonométrique, c’est l’angle droit.',
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
    explain: 'Moivre multiplie l’angle par \\(n\\) (car \\((e^{it})^n=e^{int}\\)) — elle n’élève pas \\(\\cos\\) et \\(\\sin\\) séparément à la puissance \\(n\\).',
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
    explain: '\\(\\cos t\\) est la moyenne de \\(e^{it}\\) et de son conjugué \\(e^{-it}\\) ; la différence (divisée par \\(2i\\)) donne \\(\\sin t\\).',
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
    explain: 'Si \\(Z_0\\) est une racine carrée de \\(z\\), alors \\((-Z_0)^2 = Z_0^2 = z\\) aussi : les deux racines sont toujours opposées.',
  },
  {
    id: 'ex11', section: 'equations',
    statement: 'Dans \\(\\mathbb{C}\\), l’équation \\(az^2 + bz + c = 0\\) (avec \\(a \\neq 0\\)) admet toujours :',
    options: ['Au moins une solution', 'Zéro ou deux solutions', 'Exactement une solution'],
    correctIndex: 0,
    explain: 'Contrairement à \\(\\mathbb{R}\\), tout nombre complexe (même un \\(\\Delta\\) « négatif ») admet une racine carrée dans \\(\\mathbb{C}\\) : il y a donc toujours au moins une solution.',
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
    explain: 'Elles sont toutes de module 1, régulièrement espacées d’un angle \\(2\\pi/n\\) : leurs images dessinent un polygone régulier.',
  },
];

const SECTIONS = [
  {
    id: 'definition', title: '§1 — DÉFINITION DE ℂ',
    cours: '\\(\\mathbb{C} \\supset \\mathbb{R}\\), contient \\(i\\) tel que \\(i^2 = -1\\)<br>Tout \\(z \\in \\mathbb{C}\\) s’écrit de façon <span class="math">unique</span> \\(z = a + ib\\) (\\(a, b \\in \\mathbb{R}\\))<br>\\(\\mathbb{C}\\) = <span class="math">corps commutatif</span>, comme \\(\\mathbb{R}\\)',
  },
  {
    id: 'algebrique', title: '§2 — FORME ALGÉBRIQUE',
    cours: '\\(z = a+ib\\) : \\(\\text{Re}(z) = a\\), \\(\\text{Im}(z) = b\\)<br><span class="math">Conjugué</span> \\(\\bar z = a - ib\\)<br><span class="math">Module</span> \\(|z| = \\sqrt{a^2+b^2} = \\sqrt{z\\bar z}\\), avec \\(|zz\'| = |z||z\'|\\)',
  },
  {
    id: 'trigo', title: '§3 — FORME TRIGONOMÉTRIQUE ET EXPONENTIELLE',
    cours: '\\(z \\neq 0\\) : \\(z = \\varrho e^{i\\theta}\\), \\(\\varrho = |z|\\), \\(\\theta = \\arg(z)\\)<br><span class="math">Euler</span> : \\(\\cos t = \\dfrac{e^{it}+e^{-it}}{2}\\)<br><span class="math">Moivre</span> : \\((e^{it})^n = e^{int}\\)<br>Par cœur : \\(i = e^{i\\pi/2}\\), \\(-1 = e^{i\\pi}\\)',
  },
  {
    id: 'equations', title: '§4 — ÉQUATIONS DANS ℂ',
    cours: '\\(z \\neq 0\\) \\(\\Rightarrow\\) 2 <span class="math">racines carrées</span> opposées<br>\\(az^2+bz+c=0\\) : \\(\\Delta = b^2-4ac\\) \\(\\Rightarrow\\) \\(z = \\dfrac{-b \\pm \\delta}{2a}\\)<br>\\(Z^n = z\\) \\(\\Rightarrow\\) \\(n\\) solutions',
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
