/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/analyse.js
   Fiche ANALYSE — Analyse 2, Pascal Ortiz, L1 mathématiques,
   INU Champollion (limites, continuité, dérivation, fonctions
   usuelles, développements limités, intégration, primitives).
   QCM à 3 réponses, formules en LaTeX typesetées avec KaTeX.
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_analyse_state';
const CHAPTER_ID = 'analyse';

const EXERCISES = [
  {
    id: 'ex1', section: 'limites',
    statement: 'Si \\(f(x) \\geq 0\\) près de \\(a\\) et \\(\\lim_{x \\to a} f(x) = l\\) existe, alors :',
    options: ['\\(l \\geq 0\\)', '\\(l > 0\\)', '\\(l = 0\\)'],
    correctIndex: 0,
    explain: 'Le passage à la limite ne conserve que les inégalités larges : par exemple \\(f(x)=x^2 \\geq 0\\) près de 0, mais sa limite en 0 est \\(0\\), pas strictement positive.',
  },
  {
    id: 'ex2', section: 'limites',
    statement: '\\(f \\sim_a g\\) signifie :',
    options: [
      '\\(\\lim_{x \\to a} \\dfrac{f(x)}{g(x)} = 1\\)',
      '\\(f(x) = g(x)\\) partout',
      '\\(\\lim_{x \\to a} (f(x) - g(x)) = 0\\)',
    ],
    correctIndex: 0,
    explain: 'C’est la définition même de l’équivalence de deux fonctions en un point.',
  },
  {
    id: 'ex3', section: 'limites',
    statement: 'L’équivalence de fonctions \\(\\sim_a\\) est compatible avec :',
    options: ['Le produit et le quotient', 'L’addition', 'Toute composition à gauche'],
    correctIndex: 0,
    explain: 'L’équivalence se comporte comme une égalité pour produits/quotients, mais pas pour l’addition : \\(1-x \\sim_0 1+x\\) et \\(-1 \\sim_0 -1\\), pourtant leur différence \\(x \\sim_0 -x\\) est fausse.',
  },
  {
    id: 'ex4', section: 'continuite',
    statement: 'D’après le théorème des valeurs intermédiaires, si \\(f\\) est continue sur \\([a,b]\\) et \\(f(a)f(b) < 0\\), alors :',
    options: [
      'Il existe \\(c \\in ]a,b[\\) tel que \\(f(c) = 0\\)',
      '\\(f\\) est croissante sur \\([a,b]\\)',
      '\\(f(a) = f(b)\\)',
    ],
    correctIndex: 0,
    explain: '\\(f(a)\\) et \\(f(b)\\) sont de signes opposés, donc \\(0\\) est une valeur intermédiaire entre les deux : le TVI garantit l’existence de \\(c\\).',
  },
  {
    id: 'ex5', section: 'continuite',
    statement: 'Une fonction continue sur un segment \\([a,b]\\) est :',
    options: ['Bornée, et elle atteint ses bornes', 'Seulement bornée', 'Pas nécessairement bornée'],
    correctIndex: 0,
    explain: 'C’est le théorème des bornes atteintes : sur un intervalle fermé ET borné (un segment), une fonction continue est bornée et atteint son min et son max.',
  },
  {
    id: 'ex6', section: 'continuite',
    statement: 'L’image d’un intervalle par une fonction continue est :',
    options: ['Un intervalle', 'Toujours un segment', 'Un ensemble fini'],
    correctIndex: 0,
    explain: 'La continuité interdit les « sauts » : l’image ne peut pas avoir de trou. Ce n’est un segment que si l’ensemble de départ en est un.',
  },
  {
    id: 'ex7', section: 'derivation',
    statement: 'Si \\(f\\) est dérivable en \\(a\\), alors \\(f\\) est nécessairement :',
    options: ['Continue en \\(a\\)', 'Croissante en \\(a\\)', 'Bornée sur \\(\\mathbb{R}\\)'],
    correctIndex: 0,
    explain: 'Si le taux d’accroissement a une limite finie en \\(a\\) (dérivabilité), alors \\(f(x) \\to f(a)\\) quand \\(x \\to a\\) : c’est la continuité.',
  },
  {
    id: 'ex8', section: 'derivation',
    statement: 'D’après le théorème de Rolle, si \\(f(a) = f(b)\\), il existe \\(c \\in ]a,b[\\) tel que :',
    options: ['\\(f\'(c) = 0\\)', '\\(f(c) = 0\\)', '\\(f\'\'(c) = 0\\)'],
    correctIndex: 0,
    explain: 'Le théorème de Rolle garantit un point à tangente horizontale entre deux points de même hauteur.',
  },
  {
    id: 'ex9', section: 'derivation',
    statement: 'Le théorème des accroissements finis (TAF) affirme qu’il existe \\(c \\in ]a,b[\\) tel que :',
    options: ['\\(f(b) - f(a) = (b-a) f\'(c)\\)', '\\(f(b) = f(a)\\)', '\\(f\'(c) = 0\\)'],
    correctIndex: 0,
    explain: 'Géométriquement : il existe un point où la tangente est parallèle à la corde reliant \\((a,f(a))\\) et \\((b,f(b))\\).',
  },
  {
    id: 'ex10', section: 'usuelles',
    statement: '\\(\\arccos(x) + \\arcsin(x)\\) est toujours égal à :',
    options: ['\\(\\pi/2\\)', '\\(\\pi\\)', '\\(0\\)'],
    correctIndex: 0,
    explain: 'Identité à connaître par cœur, valable pour tout \\(x \\in [-1,1]\\).',
  },
  {
    id: 'ex11', section: 'usuelles',
    statement: 'Le domaine de définition de \\(\\arctan\\) est :',
    options: ['\\(\\mathbb{R}\\) tout entier', '\\([-1,1]\\)', '\\(]0,+\\infty[\\)'],
    correctIndex: 0,
    explain: 'Contrairement à \\(\\arccos\\)/\\(\\arcsin\\) (définis sur \\([-1,1]\\), car \\(\\cos\\) et \\(\\sin\\) sont bornés), \\(\\tan\\) prend toutes les valeurs réelles : son inverse \\(\\arctan\\) est donc défini sur \\(\\mathbb{R}\\).',
  },
  {
    id: 'ex12', section: 'usuelles',
    statement: 'La dérivée de \\(\\arctan(x)\\) est :',
    options: ['\\(\\dfrac{1}{1+x^2}\\)', '\\(\\dfrac{1}{\\sqrt{1-x^2}}\\)', '\\(-\\dfrac{1}{1+x^2}\\)'],
    correctIndex: 0,
    explain: 'À connaître par cœur ; contrairement à \\(\\arcsin\\)/\\(\\arccos\\), cette dérivée est valable sur \\(\\mathbb{R}\\) tout entier (pas de bornes \\(\\pm1\\) à exclure).',
  },
  {
    id: 'ex13', section: 'dl',
    statement: 'Le développement limité de \\(e^x\\) à l’ordre 2 en 0 est :',
    options: [
      '\\(1 + x + \\dfrac{x^2}{2} + o(x^2)\\)',
      '\\(1 + x + o(x^2)\\)',
      '\\(1 + \\dfrac{x^2}{2} + o(x^2)\\)',
    ],
    correctIndex: 0,
    explain: 'Le DL de \\(e^x\\) à l’ordre \\(n\\) est \\(1+x+\\frac{x^2}{2!}+\\cdots+\\frac{x^n}{n!}\\) ; à l’ordre 2, on garde les termes jusqu’à \\(x^2/2\\).',
  },
  {
    id: 'ex14', section: 'dl',
    statement: 'Le développement limité de \\(\\sin x\\) à l’ordre 3 en 0 est :',
    options: [
      '\\(x - \\dfrac{x^3}{6} + o(x^3)\\)',
      '\\(x + \\dfrac{x^3}{6} + o(x^3)\\)',
      '\\(x - \\dfrac{x^2}{2} + o(x^3)\\)',
    ],
    correctIndex: 0,
    explain: '\\(\\sin\\) étant impaire, son DL ne contient que des puissances impaires, avec un signe qui alterne : \\(x - x^3/3! + \\cdots\\)',
  },
  {
    id: 'ex15', section: 'dl',
    statement: 'Si \\(f\\) est dérivable en \\(a\\), son développement limité à l’ordre 1 en \\(a\\) est :',
    options: [
      '\\(f(a) + f\'(a)(x-a) + o(x-a)\\)',
      '\\(f\'(a) + f(a)(x-a)\\)',
      '\\(f(a) - f\'(a)(x-a)\\)',
    ],
    correctIndex: 0,
    explain: 'Un DL à l’ordre 1 en \\(a\\) redonne exactement la définition de la dérivabilité de \\(f\\) en \\(a\\).',
  },
  {
    id: 'ex16', section: 'integration',
    statement: 'Si \\(\\Phi\\) est une primitive de \\(f\\) sur \\([a,b]\\), alors \\(\\displaystyle\\int_a^b f(t)\\,dt\\) est égal à :',
    options: ['\\(\\Phi(b) - \\Phi(a)\\)', '\\(\\Phi(a) - \\Phi(b)\\)', '\\(\\Phi(b) + \\Phi(a)\\)'],
    correctIndex: 0,
    explain: 'C’est le corollaire fondamental du calcul intégral : l’intégrale se calcule à l’aide de n’importe quelle primitive \\(\\Phi\\) de \\(f\\).',
  },
  {
    id: 'ex17', section: 'integration',
    statement: 'Le théorème fondamental du calcul intégral dit que \\(F(x) = \\int_a^x f(t)\\,dt\\) est de classe \\(C^1\\), avec :',
    options: ['\\(F\' = f\\)', '\\(F = f\'\\)', '\\(F\' = f^2\\)'],
    correctIndex: 0,
    explain: 'La fonction « aire sous la courbe » \\(F\\) est dérivable, et sa dérivée est \\(f\\) elle-même.',
  },
  {
    id: 'ex18', section: 'integration',
    statement: 'La relation de Chasles pour les intégrales s’écrit :',
    options: [
      '\\(\\int_u^v f = \\int_u^w f + \\int_w^v f\\)',
      '\\(\\int_u^v f = \\int_u^w f \\times \\int_w^v f\\)',
      '\\(\\int_u^v f = \\int_v^u f\\)',
    ],
    correctIndex: 0,
    explain: 'La relation de Chasles découpe l’intervalle d’intégration en sous-intervalles dont les contributions s’additionnent.',
  },
  {
    id: 'ex19', section: 'primitives',
    statement: 'Pour \\(\\alpha \\neq -1\\), une primitive de \\(x^\\alpha\\) est :',
    options: ['\\(\\dfrac{x^{\\alpha+1}}{\\alpha+1}\\)', '\\(\\alpha x^{\\alpha-1}\\)', '\\(\\dfrac{x^\\alpha}{\\alpha}\\)'],
    correctIndex: 0,
    explain: 'On augmente l’exposant de 1 et on divise par ce nouvel exposant — c’est l’opération inverse de la dérivation des puissances.',
  },
  {
    id: 'ex20', section: 'primitives',
    statement: 'Le théorème de changement de variable (\\(x = \\varphi(t)\\), \\(\\varphi\\) de classe \\(C^1\\)) s’écrit :',
    options: [
      '\\(\\int_a^b f(\\varphi(t))\\varphi\'(t)\\,dt = \\int_{\\varphi(a)}^{\\varphi(b)} f(x)\\,dx\\)',
      '\\(\\int_a^b f(\\varphi(t))\\,dt = \\int_a^b f(x)\\,dx\\)',
      '\\(\\int_a^b \\varphi\'(t)\\,dt = f(b) - f(a)\\)',
    ],
    correctIndex: 0,
    explain: 'Poser \\(x=\\varphi(t)\\) transforme \\(dx\\) en \\(\\varphi\'(t)\\,dt\\), et les bornes deviennent \\(\\varphi(a)\\) et \\(\\varphi(b)\\).',
  },
  {
    id: 'ex21', section: 'primitives',
    statement: 'Deux primitives d’une même fonction \\(f\\) sur un intervalle \\(I\\) diffèrent :',
    options: ['D’une constante', 'D’un facteur multiplicatif', 'L’une de l’autre par leur dérivée'],
    correctIndex: 0,
    explain: 'Si \\(F\\) et \\(G\\) ont la même dérivée \\(f\\) sur \\(I\\), alors \\((F-G)\'=0\\) sur \\(I\\), donc \\(F-G\\) est constante.',
  },
];

const SECTIONS = [
  {
    id: 'limites', title: '§1 — LIMITES',
    cours: '\\(\\lim_{x \\to a} f(x) = l\\) : \\(\\forall \\varepsilon>0, \\exists \\alpha>0, |x-a|<\\alpha \\Rightarrow |f(x)-l|<\\varepsilon\\)<br>Limite finie en \\(a\\) \\(\\Rightarrow\\) \\(f\\) localement bornée<br><span class="math">Théorème des gendarmes</span> (encadrement)<br>\\(f \\sim_a g \\Leftrightarrow \\lim_{x \\to a} f/g = 1\\), et alors mêmes limites',
  },
  {
    id: 'continuite', title: '§2 — CONTINUITÉ',
    cours: '\\(f\\) continue en \\(a\\) \\(\\Leftrightarrow\\) \\(\\lim_{x \\to a} f(x) = f(a)\\)<br><span class="math">Théorème des valeurs intermédiaires</span> : \\(f\\) continue sur \\([a,b]\\), \\(y\\) entre \\(f(a)\\) et \\(f(b)\\) \\(\\Rightarrow\\) \\(\\exists c, f(c)=y\\)<br>\\(f\\) continue sur \\([a,b]\\) \\(\\Rightarrow\\) \\(f\\) bornée et atteint ses bornes',
  },
  {
    id: 'derivation', title: '§3 — DÉRIVATION',
    cours: '\\(f\\) dérivable en \\(a\\) \\(\\Leftrightarrow\\) \\(\\lim_{x \\to a} \\dfrac{f(x)-f(a)}{x-a}\\) existe\\(= f\'(a)\\)<br>Dérivable \\(\\Rightarrow\\) continue (réciproque fausse : \\(|x|\\) en 0)<br><span class="math">Théorème de Rolle</span> : \\(f(a)=f(b)\\) \\(\\Rightarrow\\) \\(\\exists c \\in ]a,b[, f\'(c)=0\\)<br><span class="math">TAF</span> : \\(f(b)-f(a) = (b-a)f\'(c)\\)',
  },
  {
    id: 'usuelles', title: '§4 — FONCTIONS USUELLES (ARCCOS, ARCSIN, ARCTAN)',
    cours: '\\(\\arccos : [-1,1] \\to [0,\\pi]\\), \\(\\arcsin : [-1,1] \\to [-\\pi/2,\\pi/2]\\), \\(\\arctan : \\mathbb{R} \\to \\ ]-\\pi/2,\\pi/2[\\)<br>\\(\\arccos x + \\arcsin x = \\pi/2\\)<br>\\((\\arctan)\'(x) = \\dfrac{1}{1+x^2}\\)',
  },
  {
    id: 'dl', title: '§5 — DÉVELOPPEMENTS LIMITÉS',
    cours: '<span class="math">Taylor-Young</span> : \\(f(t) = \\displaystyle\\sum_{k=0}^{n} \\dfrac{f^{(k)}(a)}{k!}(t-a)^k + o((t-a)^n)\\)<br>DL usuels en 0 : \\(e^x = 1+x+\\dfrac{x^2}{2}+\\cdots\\), \\(\\sin x = x - \\dfrac{x^3}{6}+\\cdots\\), \\(\\cos x = 1 - \\dfrac{x^2}{2}+\\cdots\\)<br>DL \\(\\to\\) équivalent : premier terme non nul du DL',
  },
  {
    id: 'integration', title: '§6 — INTÉGRATION SUR UN SEGMENT',
    cours: '\\(f\\) continue sur \\([a,b]\\) \\(\\Rightarrow\\) \\(F(x)=\\int_a^x f(t)\\,dt\\) est \\(C^1\\) et \\(F\'=f\\)<br>\\(\\int_a^b f(t)\\,dt = \\Phi(b)-\\Phi(a)\\) où \\(\\Phi\\) est une primitive de \\(f\\)<br><span class="math">Relation de Chasles</span> : \\(\\int_u^v f = \\int_u^w f + \\int_w^v f\\)',
  },
  {
    id: 'primitives', title: '§7 — PRIMITIVES',
    cours: 'Primitive de \\(x^\\alpha\\) (\\(\\alpha \\neq -1\\)) : \\(\\dfrac{x^{\\alpha+1}}{\\alpha+1}\\) ; primitive de \\(1/x\\) : \\(\\ln|x|\\)<br><span class="math">Changement de variable</span> : \\(x=\\varphi(t)\\), \\(dx = \\varphi\'(t)\\,dt\\)<br>Deux primitives d’une même fonction diffèrent d’une constante',
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
