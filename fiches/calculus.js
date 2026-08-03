/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/calculus.js
   Fiche CALCULUS (Pratique du calcul mathématique).
   Source : TD de Séance 1 (fractions, coeff. binomiaux,
   puissances, radicaux), Séance 2 (trinôme), Séance 3 (exp/ln),
   Séance 4 (dérivation), Séance 7 (trigonométrie) et Séance 8
   (sommes), M. Leroux / M. Pascaud, INU Champollion.
   QCM à 3 réponses, formules en LaTeX typesetées avec KaTeX.
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_calculus_state';
const CHAPTER_ID = 'calculus';

const EXERCISES = [
  {
    id: 'ex1', section: 'algebrique',
    statement: 'Le coefficient binomial \\(\\binom{n}{p}\\) pour \\(p > n\\) vaut :',
    options: ['\\(0\\)', '\\(1\\)', '\\(n!\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex2', section: 'algebrique',
    statement: '\\(\\sqrt{x^2}\\) est égal à :',
    options: ['\\(|x|\\)', '\\(x\\)', '\\(x^2\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex3', section: 'algebrique',
    statement: 'Pour \\(a \\neq 0\\), \\(a^0\\) vaut :',
    options: ['\\(1\\)', '\\(0\\)', '\\(a\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex4', section: 'trinome',
    statement: 'Si \\(\\Delta < 0\\), l’équation \\(ax^2+bx+c=0\\) admet, dans \\(\\mathbb{R}\\) :',
    options: ['Aucune solution', 'Une solution', 'Deux solutions'],
    correctIndex: 0,
  },
  {
    id: 'ex5', section: 'trinome',
    statement: '\\(x\\) et \\(y\\) ont pour somme \\(S\\) et produit \\(P\\) si et seulement s’ils sont racines de :',
    options: ['\\(X^2 - SX + P = 0\\)', '\\(X^2 + SX - P = 0\\)', '\\(X^2 - PX + S = 0\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex6', section: 'trinome',
    statement: 'La forme factorisée d’un trinôme ayant deux racines réelles \\(x_1, x_2\\) est :',
    options: ['\\(a(x-x_1)(x-x_2)\\)', '\\(a(x+x_1)(x+x_2)\\)', '\\((x-x_1)(x-x_2)\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex7', section: 'explog',
    statement: '\\(\\ln x\\) est défini :',
    options: ['Seulement pour \\(x > 0\\)', 'Pour tout \\(x \\in \\mathbb{R}\\)', 'Seulement pour \\(x \\geq 0\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex8', section: 'explog',
    statement: '\\(\\ln(ab)\\) est égal à :',
    options: ['\\(\\ln a + \\ln b\\)', '\\(\\ln a \\times \\ln b\\)', '\\(\\ln(a+b)\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex9', section: 'explog',
    statement: '\\(e^{x+y}\\) est égal à :',
    options: ['\\(e^x \\times e^y\\)', '\\(e^x + e^y\\)', '\\(e^{xy}\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex10', section: 'derivation',
    statement: 'La dérivée de \\(fg\\) est :',
    options: ['\\(f\'g + fg\'\\)', '\\(f\'g\'\\)', '\\(f\' + g\'\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex11', section: 'derivation',
    statement: 'La dérivée de \\(\\dfrac{f}{g}\\) est :',
    options: ['\\(\\dfrac{f\'g - fg\'}{g^2}\\)', '\\(\\dfrac{f\'g + fg\'}{g^2}\\)', '\\(\\dfrac{f\'}{g\'}\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex12', section: 'derivation',
    statement: 'La dérivée de \\((f \\circ g)(x)\\) est :',
    options: ['\\(g\'(x) \\times f\'[g(x)]\\)', '\\(f\'(x) \\times g\'(x)\\)', '\\(f\'[g(x)]\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex13', section: 'trigo',
    statement: '\\(\\cos^2 x + \\sin^2 x\\) est toujours égal à :',
    options: ['\\(1\\)', '\\(0\\)', '\\(2\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex14', section: 'trigo',
    statement: 'La fonction cosinus est :',
    options: ['Paire', 'Impaire', 'Ni paire ni impaire'],
    correctIndex: 0,
  },
  {
    id: 'ex15', section: 'trigo',
    statement: 'La fonction tangente est périodique, de période :',
    options: ['\\(\\pi\\)', '\\(2\\pi\\)', '\\(\\pi/2\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex16', section: 'sommes',
    statement: '\\(\\displaystyle\\sum_{k=1}^{n} k\\) est égal à :',
    options: ['\\(\\dfrac{n(n+1)}{2}\\)', '\\(\\dfrac{n(n-1)}{2}\\)', '\\(n^2\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex17', section: 'sommes',
    statement: '\\(\\displaystyle\\sum_{k=1}^{n} k^2\\) est égal à :',
    options: ['\\(\\dfrac{n(n+1)(2n+1)}{6}\\)', '\\(\\dfrac{n^2(n+1)}{2}\\)', '\\(\\dfrac{n(n+1)}{2}\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex18', section: 'sommes',
    statement: 'D’après la formule du binôme, \\((a+b)^n\\) se développe en :',
    options: [
      '\\(\\displaystyle\\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}\\)',
      '\\(\\displaystyle\\sum_{k=0}^{n} a^k + b^{n-k}\\)',
      '\\(n \\cdot a^b\\)',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex19', section: 'factorisation',
    statement: '\\(a^3 - b^3\\) se factorise en :',
    options: ['\\((a-b)(a^2+ab+b^2)\\)', '\\((a-b)(a^2-ab+b^2)\\)', '\\((a+b)(a^2-ab+b^2)\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex20', section: 'factorisation',
    statement: '\\((a+b)^3\\) développé donne :',
    options: ['\\(a^3+3a^2b+3ab^2+b^3\\)', '\\(a^3+b^3\\)', '\\(a^3+3ab^2+b^3\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex21', section: 'factorisation',
    statement: '\\(a^n - b^n\\) admet toujours pour facteur :',
    options: ['\\((a-b)\\)', '\\((a+b)\\)', '\\((a^2-b^2)\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex22', section: 'primitives',
    statement: 'La formule d’intégration par parties s’écrit :',
    options: [
      '\\(\\int u\'v = uv - \\int uv\'\\)',
      '\\(\\int u\'v = \\int uv\'\\)',
      '\\(\\int u\'v = uv + \\int uv\'\\)',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex23', section: 'primitives',
    statement: 'Une primitive de \\(e^x\\) est :',
    options: ['\\(e^x\\)', '\\(xe^x\\)', '\\(e^x/x\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex24', section: 'primitives',
    statement: 'Une primitive de \\(\\dfrac{1}{x}\\) sur \\(]0, +\\infty[\\) est :',
    options: ['\\(\\ln x\\)', '\\(\\dfrac{1}{x^2}\\)', '\\(-\\dfrac{1}{x^2}\\)'],
    correctIndex: 0,
  },
  {
    id: 'ex25', section: 'systemes',
    statement: 'Un système linéaire peut avoir :',
    options: [
      'Une solution unique, aucune, ou une infinité',
      'Toujours exactement une solution',
      'Toujours une infinité de solutions',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex26', section: 'systemes',
    statement: 'Pour résoudre un système linéaire, une méthode standard consiste à :',
    options: [
      'Combiner les équations pour éliminer des inconnues (pivot de Gauss)',
      'Dériver chaque équation terme à terme',
      'Calculer le discriminant du système',
    ],
    correctIndex: 0,
  },
  {
    id: 'ex27', section: 'systemes',
    statement: 'Quand un système dépend d’un paramètre \\(m\\), on :',
    options: [
      'Discute suivant les valeurs de \\(m\\)',
      'Remplace \\(m\\) par \\(0\\) systématiquement',
      'Ignore \\(m\\)',
    ],
    correctIndex: 0,
  },
];

const SECTIONS = [
  {
    id: 'algebrique', title: '§1 — FRACTIONS, COEFF. BINOMIAUX, PUISSANCES, RADICAUX',
    cours: 'Fraction : jamais diviser par 0<br>Coefficient binomial : \\(\\binom{n}{p} = \\dfrac{n!}{p!(n-p)!}\\), \\(= 0\\) si \\(p>n\\)<br>Puissances : \\(a^0=1\\) (\\(a \\neq 0\\)), \\(a^{n+m}=a^n \\cdot a^m\\)<br>Racine carrée : toujours positive, \\(\\sqrt{x^2} = |x|\\)',
  },
  {
    id: 'trinome', title: '§2 — TRINÔME DU SECOND DEGRÉ',
    cours: '<span class="math">Discriminant</span> \\(\\Delta\\) : \\(\\Delta>0 \\to\\) 2 solutions, \\(\\Delta=0 \\to\\) 1 solution, \\(\\Delta<0 \\to\\) aucune (dans \\(\\mathbb{R}\\))<br>Forme factorisée : \\(a(x-x_1)(x-x_2)\\)<br>\\(x, y\\) racines de \\(X^2-SX+P=0 \\Leftrightarrow x+y=S\\) et \\(xy=P\\)',
  },
  {
    id: 'explog', title: '§3 — EXPONENTIELLE ET LOGARITHME',
    cours: '\\(\\ln x\\) défini seulement pour \\(x>0\\), \\(\\ln 1 = 0\\), \\(\\ln e = 1\\)<br>\\(\\ln(ab)=\\ln a+\\ln b\\), \\(\\ln(a/b)=\\ln a-\\ln b\\), \\(\\ln(a^r)=r\\ln a\\)<br>\\(e^{x+y}=e^x e^y\\), et \\(a = \\ln b \\Leftrightarrow e^a = b\\)',
  },
  {
    id: 'derivation', title: '§4 — DÉRIVATION',
    cours: '\\((fg)\' = f\'g + fg\'\\)<br>\\(\\left(\\dfrac{f}{g}\\right)\' = \\dfrac{f\'g - fg\'}{g^2}\\)<br>\\((f \\circ g)\'(x) = g\'(x) \\times f\'[g(x)]\\)',
  },
  {
    id: 'trigo', title: '§5 — TRIGONOMÉTRIE',
    cours: '\\(\\cos^2 x + \\sin^2 x = 1\\)<br>\\(\\cos\\) paire, \\(\\sin\\) impaire, \\(\\tan\\) impaire<br>\\(\\cos\\), \\(\\sin\\) : \\(2\\pi\\)-périodiques ; \\(\\tan\\) : \\(\\pi\\)-périodique',
  },
  {
    id: 'sommes', title: '§6 — SOMMES',
    cours: '\\(\\displaystyle\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}\\)<br>\\(\\displaystyle\\sum_{k=1}^{n} k^2 = \\dfrac{n(n+1)(2n+1)}{6}\\)<br>\\((a+b)^n = \\displaystyle\\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}\\)',
  },
  {
    id: 'factorisation', title: '§7 — DÉVELOPPEMENT ET FACTORISATION',
    cours: '\\((a+b)^3 = a^3+3a^2b+3ab^2+b^3\\)<br>\\(a^3+b^3=(a+b)(a^2-ab+b^2)\\), \\(a^3-b^3=(a-b)(a^2+ab+b^2)\\)<br>\\(a^n-b^n=(a-b)(a^{n-1}+a^{n-2}b+\\cdots+b^{n-1})\\)',
  },
  {
    id: 'primitives', title: '§8 — PRIMITIVES',
    cours: '<span class="math">Intégration par parties</span> : \\(\\int u\'v = uv - \\int uv\'\\)<br>Pas de primitive « classique » pour \\(u^n\\), \\(e^u\\), \\(\\sin u\\) si \\(u\\) est une fonction composée<br>Primitive de \\(e^x\\) : \\(e^x\\) ; primitive de \\(1/x\\) : \\(\\ln|x|\\)',
  },
  {
    id: 'systemes', title: '§9 — SYSTÈMES LINÉAIRES',
    cours: 'Résolution par substitution ou combinaison (<span class="math">pivot de Gauss</span>)<br>Un système peut avoir : une solution unique, aucune, ou une infinité<br>Paramètre \\(m\\) \\(\\to\\) discuter suivant sa valeur',
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
