/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/probabilites.js
   Rendu + vérification des exercices de la fiche PROBABILITES.
   Tous les exercices sont des QCM à 3 réponses.
   Contenu construit à partir des TDs 5/6/7/9 et des CC1/Session 2
   (L1 INU Champollion, semestre 2).
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_probabilites_state';
const CHAPTER_ID = 'probabilites';

/* ---------- données des exercices (QCM, 3 réponses) ---------- */
const EXERCISES = [
{
    id: 'ex1', section: 'denombrement',
  statement: `Dans une population de 80 femmes, 36 sont salariées (événement A), 39 sont mères (événement B), et 15 sont les deux à la fois. Que vaut \\(P(A\\cup B)\\) ?`,
  options: [`\\(3/4\\)`, `\\(36/80\\)`, `\\(1/4\\)`],
  correctIndex: 0,
  explain: `\\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B) = 36/80+39/80-15/80 = 60/80 = 3/4\\).`
},
{
    id: 'ex2', section: 'denombrement',
  statement: `Avec les mêmes données (36 salariées, 39 mères, 15 les deux, sur 80 femmes), quelle est la probabilité qu'une femme choisie au hasard ne soit NI salariée NI mère ?`,
  options: [`\\(1/4\\)`, `\\(3/4\\)`, `\\(15/80\\)`],
  correctIndex: 0,
  explain: `\\(P(\\overline{A\\cup B})=1-P(A\\cup B)=1-3/4=1/4\\).`
},
{
    id: 'ex3', section: 'denombrement',
  statement: `On lance trois dés équilibrés et on additionne les points. Il existe 6 façons non ordonnées d'obtenir la somme 9 (ex. {1,2,6}), tout comme pour la somme 10. Quelle est la probabilité d'obtenir la somme 9 ?`,
  options: [`\\(25/216\\)`, `\\(27/216\\)`, `\\(6/216\\)`],
  correctIndex: 0,
  explain: `Il faut compter les tirages ORDONNÉS : la somme 9 correspond à 25 triplets ordonnés sur \\(6^3=216\\) (contre 27 pour la somme 10).`
},
{
    id: 'ex4', section: 'denombrement',
  statement: `Dans le problème de Galilée, pourquoi la somme 10 est-elle plus probable que la somme 9 alors que les deux ont 6 combinaisons non ordonnées ?`,
  options: [
    `Le nombre de triplets ORDONNÉS diffère (27 contre 25)`,
    `Il y a plus de combinaisons non ordonnées pour la somme 10`,
    `Les deux sommes sont en réalité équiprobables`
  ],
  correctIndex: 0,
  explain: `L'équiprobabilité s'applique aux résultats ordonnés (les 3 dés étant distinguables), pas aux combinaisons non ordonnées : 10 admet 27 triplets ordonnés contre 25 pour 9.`
},
{
    id: 'ex5', section: 'denombrement',
  statement: `Une urne contient 5 boules rouges et 3 boules noires (8 boules au total). On tire 2 boules sans remise. Quelle est la probabilité que les 2 boules soient rouges ?`,
  options: [`\\(5/14\\)`, `\\(1/4\\)`, `\\(5/8\\)`],
  correctIndex: 0,
  explain: `\\(P = \\dfrac{C_5^2}{C_8^2} = \\dfrac{10}{28} = \\dfrac{5}{14}\\).`
},
{
    id: 'ex6', section: 'denombrement',
  statement: `Le mot STATISTIQUES comporte 12 lettres : S répété 3 fois, T répété 3 fois, I répété 2 fois (les autres lettres une seule fois). Combien d'anagrammes distincts peut-on former ?`,
  options: [`\\(6\\,652\\,800\\)`, `\\(12!\\)`, `\\(479\\,001\\,600\\)`],
  correctIndex: 0,
  explain: `Nombre d'anagrammes \\(= \\dfrac{12!}{3!\\times 3!\\times 2!} = \\dfrac{479\\,001\\,600}{72} = 6\\,652\\,800\\).`
},
{
    id: 'ex7', section: 'conditionnelle',
  statement: `Un lac contient 40% de brochets, 25% de truites et 35% de sandres. 50% des brochets, 60% des truites et 45% des sandres sont de taille réglementaire. Quelle est la probabilité qu'un poisson pêché soit un brochet ET de taille réglementaire ?`,
  options: [`\\(0.20\\)`, `\\(0.50\\)`, `\\(0.40\\)`],
  correctIndex: 0,
  explain: `\\(P(\\text{brochet}\\cap\\text{réglementaire}) = P(\\text{brochet})\\times P(\\text{réglementaire}\\mid\\text{brochet}) = 0.40\\times 0.50 = 0.20\\).`
},
{
    id: 'ex8', section: 'conditionnelle',
  statement: `Avec les mêmes données, quelle est la probabilité qu'un poisson pêché au hasard dans ce lac soit de taille réglementaire (toutes espèces confondues) ?`,
  options: [`\\(0.5075\\)`, `\\(0.45\\)`, `\\(0.6\\)`],
  correctIndex: 0,
  explain: `Par la formule des probabilités totales : \\(P(\\text{réglementaire}) = 0.40\\times0.50+0.25\\times0.60+0.35\\times0.45 = 0.20+0.15+0.1575 = 0.5075\\).`
},
{
    id: 'ex9', section: 'conditionnelle',
  statement: `Toujours avec les mêmes données, sachant qu'un poisson pêché n'est PAS de taille réglementaire, quelle est la probabilité que ce soit une truite ?`,
  options: [`\\(\\approx 0.203\\)`, `\\(0.25\\)`, `\\(0.60\\)`],
  correctIndex: 0,
  explain: `\\(P(\\text{truite}\\mid\\overline{\\text{rég.}}) = \\dfrac{0.25\\times0.40}{1-0.5075} = \\dfrac{0.10}{0.4925}\\approx 0.203\\) (formule de Bayes).`
},
{
    id: 'ex10', section: 'conditionnelle',
  statement: `On lance deux dés équilibrés. Soit A = "le 1er dé est pair", B = "le 2e dé est pair", C = "les deux dés ont la même parité". On montre que A, B, C sont indépendants deux à deux. Peut-on en conclure qu'ils sont mutuellement indépendants ?`,
  options: [
    `Non, car \\(P(A\\cap B\\cap C)=1/4 \\neq P(A)P(B)P(C)=1/8\\)`,
    `Oui, l'indépendance deux à deux suffit toujours`,
    `Oui, car les trois événements ont la même probabilité 1/2`
  ],
  correctIndex: 0,
  explain: `L'indépendance deux à deux n'implique pas l'indépendance mutuelle : ici \\(P(A\\cap B\\cap C)=P(\\text{les deux dés pairs})=1/4\\) alors que \\(P(A)P(B)P(C)=1/8\\).`
},
{
    id: 'ex11', section: 'conditionnelle',
  statement: `Une urne A contient 3 boules rouges et 2 noires, une urne B contient 1 boule rouge et 4 noires. On choisit une urne au hasard (1 chance sur 2 chacune) puis on tire une boule : elle est rouge. Quelle est la probabilité qu'elle provienne de l'urne A ?`,
  options: [`\\(3/4\\)`, `\\(3/5\\)`, `\\(1/2\\)`],
  correctIndex: 0,
  explain: `\\(P(\\text{rouge})=\\tfrac12\\times\\tfrac35+\\tfrac12\\times\\tfrac15=\\tfrac25\\). Par Bayes, \\(P(A\\mid\\text{rouge})=\\dfrac{\\tfrac12\\times\\tfrac35}{\\tfrac25}=\\dfrac{3}{4}\\).`
},
{
    id: 'ex12', section: 'variables-aleatoires',
  statement: `Une loterie de 10000 billets comporte 1 lot de 5000€, 10 lots de 500€ et 20 lots de 100€ (les autres billets ne gagnent rien). Quelle est l'espérance du gain brut pour un billet ?`,
  options: [`\\(1.2\\)€`, `\\(12\\)€`, `\\(0.12\\)€`],
  correctIndex: 0,
  explain: `\\(E(X) = \\dfrac{1\\times5000+10\\times500+20\\times100}{10000} = \\dfrac{12000}{10000} = 1.2\\)€.`
},
{
    id: 'ex13', section: 'variables-aleatoires',
  statement: `Une urne contient \\(2n=10\\) trombones dont \\(n-1=4\\) verts et \\(n+1=6\\) jaunes (\\(n=5\\)). On tire 2 trombones avec remise. Quelle est la probabilité de tirer deux trombones verts ?`,
  options: [`\\(0.16\\)`, `\\(0.36\\)`, `\\(0.4\\)`],
  correctIndex: 0,
  explain: `Tirages avec remise donc indépendants : \\(P(\\text{vert})=4/10=0.4\\), donc \\(P(\\text{2 verts})=0.4^2=0.16\\).`
},
{
    id: 'ex14', section: 'variables-aleatoires',
  statement: `Dans ce jeu de trombones (2n trombones, n-1 verts, n+1 jaunes, tirage de 2 avec remise), un tirage de couleurs différentes rapporte 0, deux verts rapportent +9, deux jaunes rapportent -4. Pour quelle valeur de n ce jeu est-il équitable ?`,
  options: [`\\(n=5\\)`, `\\(n=10\\)`, `\\(n=1\\)`],
  correctIndex: 0,
  explain: `\\(E(\\text{gain})=9\\left(\\tfrac{n-1}{2n}\\right)^2-4\\left(\\tfrac{n+1}{2n}\\right)^2=0 \\Rightarrow n=5\\) (vérification : 4 verts/6 jaunes sur 10, \\(9\\times0.16-4\\times0.36=1.44-1.44=0\\)).`
},
{
    id: 'ex15', section: 'variables-aleatoires',
  statement: `Une v.a. X suit la loi : \\(P(X=0)=0.2\\), \\(P(X=1)=0.5\\), \\(P(X=2)=0.3\\). Quelle est \\(V(X)\\) ?`,
  options: [`\\(0.49\\)`, `\\(1.1\\)`, `\\(1.7\\)`],
  correctIndex: 0,
  explain: `\\(E(X)=1.1\\), \\(E(X^2)=0\\times0.2+1\\times0.5+4\\times0.3=1.7\\), donc \\(V(X)=E(X^2)-E(X)^2=1.7-1.21=0.49\\).`
},
{
    id: 'ex16', section: 'variables-aleatoires',
  statement: `Un jeu d'argent est dit équitable lorsque...`,
  options: [
    `L'espérance du gain net du joueur est nulle`,
    `La variance du gain est nulle`,
    `Le joueur gagne à chaque partie`
  ],
  correctIndex: 0,
  explain: `Un jeu équitable est caractérisé par \\(E(\\text{gain net})=0\\) : en moyenne, sur un grand nombre de parties, le joueur ne gagne ni ne perd d'argent.`
},
{
    id: 'ex17', section: 'variables-aleatoires',
  statement: `Soit X une v.a. uniforme sur \\(\\{-1,0,1\\}\\) (chaque valeur de probabilité 1/3) et \\(Y=X^2\\). On calcule \\(Cov(X,Y)=0\\). Peut-on en conclure que X et Y sont indépendantes ?`,
  options: [
    `Non, Cov=0 n'implique pas l'indépendance : ici Y est même totalement déterminée par X`,
    `Oui, Cov=0 équivaut toujours à l'indépendance`,
    `Non, car Cov ne peut jamais être nulle pour des v.a. dépendantes`
  ],
  correctIndex: 0,
  explain: `\\(Cov(X,Y)=0\\) est une condition NÉCESSAIRE mais pas SUFFISANTE pour l'indépendance : ici \\(E(X)=0\\) et \\(E(XY)=E(X^3)=0\\) donc Cov=0, alors que \\(Y=X^2\\) est une fonction déterministe de X (donc clairement dépendante).`
},
{
    id: 'ex18', section: 'variables-aleatoires',
  statement: `Un couple (X,Y) a pour loi conjointe (extrait) : \\(P(X=1,Y=1)=0.08\\), \\(P(X=1,Y=2)=0.04\\), \\(P(X=1,Y=3)=0.16\\), \\(P(X=1,Y=4)=0.12\\). Comment obtient-on la loi marginale \\(P(X=1)\\) à partir de cette ligne du tableau conjoint ?`,
  options: [
    `En sommant les probabilités de la ligne \\(X=1\\) sur toutes les valeurs de Y : \\(0.08+0.04+0.16+0.12=0.40\\)`,
    `En multipliant les probabilités de la ligne \\(X=1\\)`,
    `En prenant la probabilité la plus élevée de la ligne \\(X=1\\)`
  ],
  correctIndex: 0,
  explain: `La loi marginale de X s'obtient en sommant, pour chaque valeur \\(x_i\\), les probabilités conjointes sur toutes les valeurs de Y (somme des lignes du tableau conjoint).`
},
{
    id: 'ex19', section: 'lois-usuelles',
  statement: `On tire successivement des boules dans une urne. Si les tirages se font AVEC remise, le nombre de boules rouges obtenues suit une loi...`,
  options: [`Binomiale`, `Hypergéométrique`, `Géométrique`],
  correctIndex: 0,
  explain: `Avec remise, les tirages sont indépendants et de même probabilité de succès à chaque fois : c'est le cadre de la loi binomiale (sans remise, ce serait la loi hypergéométrique).`
},
{
    id: 'ex20', section: 'lois-usuelles',
  statement: `Soit X qui suit une loi binomiale \\(\\mathcal B(10;0.3)\\). Que valent \\(E(X)\\) et \\(V(X)\\) ?`,
  options: [
    `\\(E(X)=3\\), \\(V(X)=2.1\\)`,
    `\\(E(X)=3\\), \\(V(X)=0.3\\)`,
    `\\(E(X)=0.3\\), \\(V(X)=2.1\\)`
  ],
  correctIndex: 0,
  explain: `\\(E(X)=np=10\\times0.3=3\\) et \\(V(X)=np(1-p)=10\\times0.3\\times0.7=2.1\\).`
},
{
    id: 'ex21', section: 'lois-usuelles',
  statement: `On tire 3 boules sans remise dans une urne contenant 5 rouges et 3 noires (8 boules). Soit X le nombre de boules rouges tirées. Quelle est \\(E(X)\\) ?`,
  options: [`\\(15/8=1.875\\)`, `\\(3/8\\)`, `\\(5/8\\)`],
  correctIndex: 0,
  explain: `Pour la loi hypergéométrique, \\(E(X)=n\\times K/N=3\\times5/8=15/8=1.875\\).`
},
{
    id: 'ex22', section: 'lois-usuelles',
  statement: `On lance un dé truqué pour lequel \\(P(\\text{obtenir un 6})=1/4\\), jusqu'à obtenir un premier 6. Quel est le nombre moyen de lancers nécessaires ?`,
  options: [`\\(4\\)`, `\\(1/4\\)`, `\\(6\\)`],
  correctIndex: 0,
  explain: `Pour une loi géométrique de paramètre p, \\(E(X)=1/p=1/(1/4)=4\\).`
},
{
    id: 'ex23', section: 'lois-usuelles',
  statement: `Parmi les lois suivantes, laquelle n'est PAS l'une des 5 lois discrètes usuelles du formulaire de ce cours (uniforme, Bernoulli, binomiale, hypergéométrique, géométrique) ?`,
  options: [`Loi normale`, `Loi binomiale`, `Loi géométrique`],
  correctIndex: 0,
  explain: `La loi normale est une loi CONTINUE ; elle ne fait pas partie des lois discrètes usuelles du formulaire (uniforme, Bernoulli, binomiale, hypergéométrique, géométrique).`
},
];

const SECTIONS = [
{
  id: 'denombrement',
  title: '§1 — DÉNOMBREMENT',
  cours: `Probabilité uniforme (équiprobabilité) sur un univers fini \\(\\Omega\\) : <span class="math">P(A) = \\dfrac{|A|}{|\\Omega|}</span> (cas favorables / cas possibles).<br>
<span class="math">P(A\\cup B) = P(A)+P(B)-P(A\\cap B)</span> ; si A, B incompatibles (\\(A\\cap B=\\emptyset\\)) : \\(P(A\\cup B)=P(A)+P(B)\\). Toujours : \\(P(\\bar A)=1-P(A)\\).<br>
Arrangements (l'ordre compte, sans répétition) : <span class="math">A_n^p = \\dfrac{n!}{(n-p)!}</span>. Combinaisons (l'ordre ne compte pas) : <span class="math">C_n^p=\\dfrac{n!}{p!(n-p)!}</span>. Cardinal de l'ensemble des parties : \\(|\\mathcal P(E)|=2^n\\).<br>
Anagrammes : n lettres distinctes → n! anagrammes ; si des lettres se répètent, on divise par le produit des factorielles des répétitions.<br>
Tirages avec/sans remise : le dénombrement change selon le cas. <span class="math">Problème de Galilée</span> : pour 3 dés, les sommes 9 et 10 ont chacune 6 combinaisons non ordonnées, mais un nombre différent de tirages ORDONNÉS (25 contre 27 sur 216) — l'équiprobabilité porte sur les résultats ordonnés, pas sur les combinaisons.`
},
{
  id: 'conditionnelle',
  title: '§2 — PROBABILITÉ CONDITIONNELLE ET INDÉPENDANCE',
  cours: `<span class="math">Probabilité conditionnelle</span> : \\(P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}\\), définie si \\(P(B)&gt;0\\).<br>
A et B <span class="math">indépendants</span> \\(\\iff P(A\\cap B)=P(A)P(B) \\iff P(A\\mid B)=P(A)\\).<br>
<span class="math">Formule des probabilités totales</span> : si \\((B_i)_i\\) forme une partition de \\(\\Omega\\), \\(P(A)=\\sum_i P(A\\mid B_i)\\,P(B_i)\\).<br>
<span class="math">Formule de Bayes</span> : \\(P(B_i\\mid A)=\\dfrac{P(A\\mid B_i)P(B_i)}{\\sum_j P(A\\mid B_j)P(B_j)}\\).<br>
Piège : l'indépendance deux à deux de 3 événements n'entraîne PAS leur indépendance mutuelle (il faudrait en plus \\(P(A\\cap B\\cap C)=P(A)P(B)P(C)\\)).`
},
{
  id: 'variables-aleatoires',
  title: '§3 — VARIABLES ALÉATOIRES DISCRÈTES',
  cours: `<span class="math">Loi de probabilité</span> d'une v.a. discrète X : tableau \\((x_i, P(X=x_i))\\) avec \\(\\sum_i P(X=x_i)=1\\).<br>
<span class="math">Espérance</span> : \\(E(X)=\\sum_i x_i P(X=x_i)\\) (moyenne théorique). <span class="math">Jeu équitable</span> : \\(E(\\text{gain net})=0\\).<br>
<span class="math">Variance</span> : \\(V(X)=\\sum_i (x_i-E(X))^2 P(X=x_i) = E(X^2)-E(X)^2\\) (Koenig-Huygens), écart-type \\(\\sigma(X)=\\sqrt{V(X)}\\).<br>
<span class="math">Couple de v.a.</span> (X,Y) : loi conjointe \\(P(X=x,Y=y)\\), lois marginales obtenues en sommant les lignes/colonnes du tableau conjoint.<br>
<span class="math">Cov(X,Y)=E(XY)-E(X)E(Y)</span> : indépendance \\(\\Rightarrow\\) Cov=0, mais la réciproque est FAUSSE — Cov=0 n'implique pas l'indépendance.`
},
{
  id: 'lois-usuelles',
  title: '§4 — LOIS DISCRÈTES USUELLES',
  cours: `<span class="math">Loi uniforme</span> sur \\(\\{1,...,n\\}\\) : \\(P(X=k)=1/n\\), \\(E(X)=\\dfrac{n+1}{2}\\), \\(V(X)=\\dfrac{n^2-1}{12}\\).<br>
<span class="math">Loi de Bernoulli</span> \\(\\mathcal B(p)\\) : \\(P(X=1)=p\\), \\(E(X)=p\\), \\(V(X)=p(1-p)\\).<br>
<span class="math">Loi binomiale</span> \\(\\mathcal B(n,p)\\) (tirages AVEC remise, n répétitions indépendantes de Bernoulli) : \\(P(X=k)=C_n^k\\,p^k(1-p)^{n-k}\\), \\(E(X)=np\\), \\(V(X)=np(1-p)\\).<br>
<span class="math">Loi hypergéométrique</span> \\(\\mathcal H(N,n,p)\\) (tirages SANS remise dans une population finie de taille N) : \\(E(X)=np\\), \\(V(X)=np(1-p)\\dfrac{N-n}{N-1}\\).<br>
<span class="math">Loi géométrique</span> \\(\\mathcal G(p)\\) (rang du premier succès) : \\(P(X=k)=(1-p)^{k-1}p\\), \\(E(X)=1/p\\), \\(V(X)=\\dfrac{1-p}{p^2}\\).`
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
