/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/statistiques.js
   Rendu + vérification des exercices de la fiche STATISTIQUES.
   Tous les exercices sont des QCM à 3 réponses.
   Contenu construit à partir des TDs 2/3 et des CC1/Session 2
   (L1 INU Champollion, semestre 2).
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_statistiques_state';
const CHAPTER_ID = 'statistiques';

/* ---------- données des exercices (QCM, 3 réponses) ---------- */
const EXERCISES = [
{
    id: 'ex1', section: 'univariee',
  statement: `Une série statistique de notes (0,1,2,3) a pour effectifs (10,10,40,20) sur \\(N=80\\) étudiants. Quelle est la moyenne \\(\\bar x\\) ?`,
  options: [`\\(1.875\\)`, `\\(1.5\\)`, `\\(2\\)`],
  correctIndex: 0,
  explain: `\\(\\bar x=(0\\times10+1\\times10+2\\times40+3\\times20)/80=150/80=1.875\\).`
},
{
    id: 'ex2', section: 'univariee',
  statement: `Avec la même série (notes 0,1,2,3 ; effectifs 10,10,40,20 sur 80), quelle est la variance \\(V(X)\\) ?`,
  options: [`\\(0.859375\\)`, `\\(1.875\\)`, `\\(4.375\\)`],
  correctIndex: 0,
  explain: `\\(E(X^2)=(0\\times10+1\\times10+4\\times40+9\\times20)/80=350/80=4.375\\), donc \\(V(X)=4.375-1.875^2=4.375-3.515625=0.859375\\).`
},
{
    id: 'ex3', section: 'univariee',
  statement: `On transforme les notes en points via \\(T=4X-3\\) (barème : +4 par bonne réponse, -3 fixe). Sachant \\(\\bar x=1.875\\), quelle est la moyenne de T ?`,
  options: [`\\(4.5\\)`, `\\(1.875\\)`, `\\(7.5\\)`],
  correctIndex: 0,
  explain: `\\(E(T)=4\\times E(X)-3=4\\times1.875-3=7.5-3=4.5\\).`
},
{
    id: 'ex4', section: 'univariee',
  statement: `Toujours avec \\(T=4X-3\\) et \\(V(X)=0.859375\\), quelle est \\(V(T)\\) ?`,
  options: [`\\(13.75\\)`, `\\(0.859375\\)`, `\\(0.4375\\)`],
  correctIndex: 0,
  explain: `\\(V(aX+b)=a^2V(X)\\) : le terme constant -3 n'affecte PAS la variance, donc \\(V(T)=4^2\\times0.859375=16\\times0.859375=13.75\\).`
},
{
    id: 'ex5', section: 'univariee',
  statement: `Si \\(V(X)=2\\), que vaut \\(V(3X+7)\\) ?`,
  options: [`\\(18\\)`, `\\(13\\)`, `\\(6\\)`],
  correctIndex: 0,
  explain: `\\(V(aX+b)=a^2V(X)\\) : la constante \\(b=7\\) n'intervient pas, donc \\(V(3X+7)=3^2\\times2=9\\times2=18\\).`
},
{
    id: 'ex6', section: 'univariee',
  statement: `Dans la série précédente (notes 0,1,2,3 ; effectifs 10,10,40,20 sur 80), quelle est la fréquence \\(f\\) de la note 2 ?`,
  options: [`\\(0.5\\)`, `\\(0.4\\)`, `\\(0.25\\)`],
  correctIndex: 0,
  explain: `\\(f = n_i/N = 40/80 = 0.5\\).`
},
{
    id: 'ex7', section: 'boite-moustache',
  statement: `Pour la série de notes (0,1,2,3 ; effectifs 10,10,40,20 sur 80), la fréquence cumulée atteint exactement 0.25 à la valeur 1. Quel est donc \\(Q_1\\) ?`,
  options: [`\\(1\\)`, `\\(0\\)`, `\\(1.5\\)`],
  correctIndex: 0,
  explain: `\\(Q_1\\) est la valeur où la fréquence cumulée croissante atteint 0.25 ; ici cela correspond exactement à \\(x=1\\).`
},
{
    id: 'ex8', section: 'boite-moustache',
  statement: `Avec la même série, la fréquence cumulée atteint exactement 0.75 à la valeur 2. Quel est \\(Q_3\\) ?`,
  options: [`\\(2\\)`, `\\(3\\)`, `\\(1.5\\)`],
  correctIndex: 0,
  explain: `\\(Q_3\\) est la valeur où la fréquence cumulée croissante atteint 0.75 ; ici cela correspond exactement à \\(x=2\\).`
},
{
    id: 'ex9', section: 'boite-moustache',
  statement: `Avec \\(Q_1=1\\) et \\(Q_3=2\\), quel est l'écart interquartile ?`,
  options: [`\\(1\\)`, `\\(2\\)`, `\\(3\\)`],
  correctIndex: 0,
  explain: `\\(EIQ = Q_3-Q_1 = 2-1 = 1\\).`
},
{
    id: 'ex10', section: 'boite-moustache',
  statement: `Par interpolation linéaire entre les points (1 ; 0.25) et (2 ; 0.75) de la courbe des fréquences cumulées, quelle est la médiane (fréquence cumulée = 0.5) ?`,
  options: [`\\(1.5\\)`, `\\(1\\)`, `\\(2\\)`],
  correctIndex: 0,
  explain: `La fraction \\((0.5-0.25)/(0.75-0.25)=0.5\\), donc médiane \\(= 1+0.5\\times(2-1)=1.5\\).`
},
{
    id: 'ex11', section: 'boite-moustache',
  statement: `Quelles sont les 5 valeurs représentées par une boîte à moustaches ?`,
  options: [
    `Minimum, \\(Q_1\\), médiane, \\(Q_3\\), maximum`,
    `Moyenne, écart-type, min, max, médiane`,
    `\\(Q_1, Q_2, Q_3, Q_4, Q_5\\)`
  ],
  correctIndex: 0,
  explain: `La boîte à moustaches résume la série par le minimum, le premier quartile, la médiane, le troisième quartile et le maximum.`
},
{
    id: 'ex12', section: 'ajustements',
  statement: `Pour un nuage de points avec \\(\\bar x=3\\) et \\(\\bar y=5\\), quel est le point moyen G ?`,
  options: [`\\((3,5)\\)`, `\\((5,3)\\)`, `\\((3,3)\\)`],
  correctIndex: 0,
  explain: `Le point moyen est simplement \\(G(\\bar x,\\bar y) = (3,5)\\).`
},
{
    id: 'ex13', section: 'ajustements',
  statement: `Pour une série de points avec \\(Cov(X,Y)=1.8\\) et \\(V(X)=2\\), quel est le coefficient directeur a de la droite de régression des moindres carrés ?`,
  options: [`\\(0.9\\)`, `\\(1.8\\)`, `\\(3.6\\)`],
  correctIndex: 0,
  explain: `\\(a = Cov(X,Y)/V(X) = 1.8/2 = 0.9\\).`
},
{
    id: 'ex14', section: 'ajustements',
  statement: `La droite de régression obtenue par la méthode des moindres carrés passe toujours par...`,
  options: [
    `Le point moyen \\(G(\\bar x,\\bar y)\\)`,
    `L'origine (0,0)`,
    `Le premier point du nuage`
  ],
  correctIndex: 0,
  explain: `Par construction (\\(b=\\bar y-a\\bar x\\)), la droite de régression des moindres carrés passe toujours par le point moyen \\(G(\\bar x,\\bar y)\\).`
},
{
    id: 'ex15', section: 'ajustements',
  statement: `Avec \\(Cov(X,Y)=1.8\\), \\(\\sigma_X=\\sqrt2\\) et \\(\\sigma_Y=\\sqrt2\\), quel est le coefficient de corrélation linéaire r ?`,
  options: [`\\(0.9\\)`, `\\(1.8\\)`, `\\(2\\)`],
  correctIndex: 0,
  explain: `\\(r = Cov(X,Y)/(\\sigma_X\\sigma_Y) = 1.8/(\\sqrt2\\times\\sqrt2) = 1.8/2 = 0.9\\), proche de 1 : ajustement affine pertinent.`
},
{
    id: 'ex16', section: 'ajustements',
  statement: `La droite de Mayer est construite en reliant...`,
  options: [
    `Les points moyens \\(G_1\\) et \\(G_2\\) des deux moitiés du nuage (classé selon x)`,
    `Le premier et le dernier point du nuage`,
    `Deux points choisis au hasard`
  ],
  correctIndex: 0,
  explain: `La méthode de Mayer sépare les points en deux groupes selon x, calcule leurs moyennes \\(G_1\\) et \\(G_2\\), et trace la droite passant par ces deux points — un ajustement simple, antérieur aux moindres carrés.`
},
{
    id: 'ex17', section: 'ajustements',
  statement: `Pour ajuster un nuage de points qui semble suivre une évolution exponentielle \\(y=e^{ax+b}\\), quelle transformation permet de se ramener à un ajustement affine ?`,
  options: [
    `Poser \\(z=\\ln y\\) et ajuster z de façon affine en x`,
    `Poser \\(z=y^2\\)`,
    `Aucune transformation n'est nécessaire`
  ],
  correctIndex: 0,
  explain: `En posant \\(z=\\ln y\\), le modèle \\(y=e^{ax+b}\\) devient \\(z=ax+b\\), une relation affine que l'on ajuste ensuite par la méthode des moindres carrés classique.`
},
];

const SECTIONS = [
{
  id: 'univariee',
  title: '§1 — STATISTIQUE UNIVARIÉE (SÉRIE STATISTIQUE)',
  cours: `Série statistique \\((x_i,n_i)\\) : effectif \\(n_i\\), fréquence \\(f_i=n_i/N\\) avec \\(N=\\sum_i n_i\\).<br>
<span class="math">Moyenne</span> : \\(\\bar x=\\dfrac{1}{N}\\sum_i n_i x_i\\).<br>
<span class="math">Variance</span> : \\(V(X)=\\dfrac{1}{N}\\sum_i n_i(x_i-\\bar x)^2 = \\dfrac{1}{N}\\sum_i n_i x_i^2 - \\bar x^2\\), écart-type \\(\\sigma=\\sqrt{V(X)}\\).<br>
<span class="math">Transformation affine</span> \\(T=aX+b\\) : \\(E(T)=a\\bar x+b\\), et surtout \\(V(T)=a^2V(X)\\) — le décalage b n'a AUCUN effet sur la variance.`
},
{
  id: 'boite-moustache',
  title: '§2 — BOÎTE À MOUSTACHES ET QUARTILES',
  cours: `<span class="math">Boîte à moustaches</span> : résume une série par 5 valeurs — minimum, \\(Q_1\\), médiane, \\(Q_3\\), maximum.<br>
<span class="math">Quartiles</span> \\(Q_1, Q_3\\) : obtenus par interpolation linéaire sur la courbe des fréquences cumulées croissantes (\\(Q_1\\) : fréquence cumulée = 0.25 ; \\(Q_3\\) : = 0.75 ; médiane : = 0.5).<br>
<span class="math">Écart interquartile</span> : \\(EIQ=Q_3-Q_1\\), mesure la dispersion de la moitié centrale des données (moins sensible aux valeurs extrêmes que l'étendue).<br>
Une valeur est souvent jugée atypique si elle sort de l'intervalle \\([Q_1-1.5\\,EIQ,\\ Q_3+1.5\\,EIQ]\\).`
},
{
  id: 'ajustements',
  title: '§3 — AJUSTEMENTS STATISTIQUES (RÉGRESSION LINÉAIRE)',
  cours: `<span class="math">Point moyen</span> \\(G(\\bar x,\\bar y)\\) du nuage de points \\((x_i,y_i)\\).<br>
<span class="math">Droite de Mayer</span> : méthode simple (antérieure aux moindres carrés) reliant \\(G_1\\) (moyenne du 1er groupe de points, classés selon x) et \\(G_2\\) (moyenne du 2e groupe).<br>
<span class="math">Droite de régression</span> (moindres carrés) : \\(y=ax+b\\) avec \\(a=\\dfrac{Cov(X,Y)}{V(X)}\\), \\(b=\\bar y-a\\bar x\\) — cette droite passe TOUJOURS par le point moyen G.<br>
<span class="math">Coefficient de corrélation linéaire</span> : \\(r=\\dfrac{Cov(X,Y)}{\\sigma_X\\sigma_Y}\\in[-1,1]\\) ; \\(|r|\\) proche de 1 ⇒ ajustement affine pertinent.<br>
Ajustement non linéaire : changement de variable (ex. \\(z=\\ln y\\)), on ajuste z de façon affine en x, d'où le modèle exponentiel \\(y=e^{ax+b}\\).`
}
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
