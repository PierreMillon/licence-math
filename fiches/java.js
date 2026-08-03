/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/java.js
   Rendu + vérification des exercices de la fiche JAVA.
   Tous les exercices sont des QCM à 3 réponses.
   Java n'a jamais fait partie du programme officiel de L1 (ajout
   personnel, hors matériel de cours) : contenu construit sur la
   syntaxe Java standard plutôt qu'extrait d'un cours spécifique.
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_java_state';
const CHAPTER_ID = 'java';

/* ---------- données des exercices (QCM, 3 réponses) ---------- */
const EXERCISES = [
  {
    id: "ex1", section: "syntaxe",
    statement: "Quelle est la signature correcte du point d'entrée d'un programme Java ?",
    options: ["<code>public static void main(String[] args)</code>", "<code>def main():</code>", "<code>function main() {}</code>"],
    correctIndex: 0,
    explain: "En Java, l'exécution démarre toujours par la méthode public static void main(String[] args), placée dans une classe.",
  },
  {
    id: "ex2", section: "syntaxe",
    statement: "Quelle déclaration de variable est correcte en Java ?",
    options: ["<code>x = 42;</code>", "<code>int x = 42;</code>", "<code>let x = 42;</code>"],
    correctIndex: 1,
    explain: "Java est typé statiquement : toute variable doit être déclarée avec son type (ici int), contrairement à Python où x = 42 suffit.",
  },
  {
    id: "ex3", section: "syntaxe",
    statement: "Que se passe-t-il si on oublie le point-virgule à la fin d'une instruction ?",
    options: ["Une erreur de compilation", "Le programme s'exécute normalement", "Java ajoute le point-virgule automatiquement"],
    correctIndex: 0,
    explain: "Contrairement à Python, chaque instruction Java doit se terminer par un point-virgule ; l'omettre provoque une erreur de compilation.",
  },
  {
    id: "ex4", section: "syntaxe",
    statement: "Une fois qu'une variable est déclarée <code>int x = 5;</code>, peut-on ensuite écrire <code>x = \"bonjour\";</code> ?",
    options: ["Non, erreur de compilation : x est typé int, on ne peut pas lui affecter un String", "Oui, comme en Python le type s'adapte automatiquement", "Oui, mais seulement à l'intérieur d'une boucle"],
    correctIndex: 0,
    explain: "Le typage statique de Java interdit de changer le type d'une variable après sa déclaration : x reste un int pour toute sa durée de vie.",
  },
  {
    id: "ex5", section: "syntaxe",
    statement: "Quelle est la différence entre <code>System.out.print(x)</code> et <code>System.out.println(x)</code> ?",
    options: ["println ajoute un saut de ligne après l'affichage, print non", "print affiche en majuscules", "Aucune différence"],
    correctIndex: 0,
    explain: "println (« print line ») termine l'affichage par un retour à la ligne ; print enchaîne les affichages sur la même ligne.",
  },
  {
    id: "ex6", section: "conditions-java",
    statement: "Pour comparer le CONTENU de deux chaînes <code>String a</code> et <code>String b</code>, quelle écriture est correcte ?",
    options: ["<code>a == b</code>", "<code>a.equals(b)</code>", "<code>a = b</code>"],
    correctIndex: 1,
    explain: "En Java, == compare les références (l'adresse mémoire des objets), pas leur contenu ; pour comparer le contenu de deux String il faut utiliser equals().",
  },
  {
    id: "ex7", section: "conditions-java",
    statement: "En Java, comment délimite-t-on le bloc d'instructions d'un <code>if</code> ?",
    options: ["Avec des accolades <code>{ }</code>", "Avec l'indentation, comme en Python", "Avec le mot-clé <code>end</code>"],
    correctIndex: 0,
    explain: "Contrairement à Python où l'indentation est syntaxiquement obligatoire, Java délimite les blocs avec des accolades ; l'indentation n'est qu'une convention de lisibilité.",
  },
  {
    id: "ex8", section: "conditions-java",
    statement: "<code>int m = 2;<br>if (m == 1) { System.out.println(\"Or\"); }<br>else if (m == 2) { System.out.println(\"Argent\"); }<br>else if (m == 3) { System.out.println(\"Bronze\"); }</code><br>Qu'affiche ce code ?",
    options: ["<code>Or</code>", "<code>Argent</code>", "Rien"],
    correctIndex: 1,
    explain: "m==1 est faux, m==2 est vrai : \"Argent\" s'affiche et la clause else if (m==3) n'est plus testée.",
  },
  {
    id: "ex9", section: "conditions-java",
    statement: "Dans un <code>switch</code>, que se passe-t-il si on oublie le <code>break</code> à la fin d'un <code>case</code> ?",
    options: ["L'exécution continue dans le case suivant (comportement de \"fall-through\")", "Une erreur de compilation est levée", "Rien ne s'affiche du tout"],
    correctIndex: 0,
    explain: "Sans break, l'exécution d'un switch \"tombe\" dans le case suivant et l'exécute aussi, même si sa condition n'est pas vérifiée : c'est le comportement par défaut en Java.",
  },
  {
    id: "ex10", section: "conditions-java",
    statement: "Que vaut l'expression <code>(5 &gt; 3) &amp;&amp; (4 &gt; 7)</code> ?",
    options: ["<code>true</code>", "<code>false</code>", "Erreur de compilation"],
    correctIndex: 1,
    explain: "&& (ET) n'est vrai que si les deux opérandes sont vraies ; ici 4 > 7 est faux donc l'expression entière vaut false.",
  },
  {
    id: "ex11", section: "boucles-java",
    statement: "<code>for (int i = 0; i &lt; 3; i++) { System.out.println(i); }</code><br>Combien de fois println s'exécute-t-il ?",
    options: ["2 fois", "3 fois", "4 fois"],
    correctIndex: 1,
    explain: "La boucle affiche i pour i=0, 1, 2 (3 tours), puis s'arrête quand i==3 car la condition i<3 devient fausse.",
  },
  {
    id: "ex12", section: "boucles-java",
    statement: "Quelle est la différence essentielle entre <code>while</code> et <code>do...while</code> ?",
    options: ["do...while exécute le corps au moins une fois, même si la condition est fausse dès le départ", "while est plus rapide à l'exécution", "do...while ne peut pas contenir de break"],
    correctIndex: 0,
    explain: "while teste la condition avant chaque tour (le corps peut ne jamais s'exécuter), alors que do...while teste après : le corps s'exécute donc toujours au moins une fois.",
  },
  {
    id: "ex13", section: "boucles-java",
    statement: "Que représente <code>i++</code> ?",
    options: ["<code>i = i + 1</code>", "<code>i = i - 1</code>", "<code>i = i * 2</code>"],
    correctIndex: 0,
    explain: "L'opérateur ++ incrémente la variable de 1 ; i++ est équivalent à i = i + 1.",
  },
  {
    id: "ex14", section: "boucles-java",
    statement: "Dans une boucle, quelle est la différence entre <code>break</code> et <code>continue</code> ?",
    options: ["break sort complètement de la boucle, continue passe seulement au tour suivant", "Ce sont deux synonymes stricts", "continue sort de la boucle, break passe au tour suivant"],
    correctIndex: 0,
    explain: "break interrompt définitivement la boucle ; continue saute le reste du corps pour ce tour mais poursuit la boucle au tour suivant.",
  },
  {
    id: "ex15", section: "tableaux",
    statement: "Après <code>int[] t = {10, 20, 30};</code>, que vaut <code>t.length</code> ?",
    options: ["<code>2</code>", "<code>3</code>", "<code>t.length()</code>, avec parenthèses"],
    correctIndex: 1,
    explain: "t.length (sans parenthèses, car length est un attribut du tableau, pas une méthode) donne le nombre d'éléments, ici 3.",
  },
  {
    id: "ex16", section: "tableaux",
    statement: "Après <code>int[] t = {10, 20, 30};</code>, que renvoie <code>t[3]</code> ?",
    options: ["<code>30</code>", "Une exception ArrayIndexOutOfBoundsException", "<code>0</code> par défaut"],
    correctIndex: 1,
    explain: "Les indices valides vont de 0 à t.length-1, soit 0 à 2 ici ; accéder à t[3] dépasse la taille du tableau et lève une exception.",
  },
  {
    id: "ex17", section: "tableaux",
    statement: "Que fait <code>for (int x : t) { System.out.println(x); }</code> ?",
    options: ["Affiche chaque élément du tableau t, sans indice explicite", "Affiche uniquement le premier élément de t", "Provoque une erreur de compilation"],
    correctIndex: 0,
    explain: "C'est la boucle for-each : elle parcourt automatiquement tous les éléments du tableau (ou d'une collection) sans avoir besoin d'un indice i.",
  },
  {
    id: "ex18", section: "tableaux",
    statement: "Peut-on ajouter un élément supplémentaire à un tableau <code>int[] t = new int[3];</code> une fois créé ?",
    options: ["Non, la taille d'un tableau Java est fixe une fois créée", "Oui, avec t.append(x) comme en Python", "Oui, la taille s'ajuste automatiquement"],
    correctIndex: 0,
    explain: "Contrairement à une liste Python, un tableau Java a une taille fixe définie à sa création ; il faut créer un nouveau tableau plus grand pour \"l'agrandir\".",
  },
  {
    id: "ex19", section: "methodes",
    statement: "<code>static int carre(int x) {<br>&nbsp;&nbsp;return x * x;<br>}</code><br>Que représente le premier <code>int</code> dans cette déclaration ?",
    options: ["Le type de retour de la méthode", "Le type du paramètre x", "Il ne sert à rien, c'est juste une convention"],
    correctIndex: 0,
    explain: "En Java, le type de retour est annoncé avant le nom de la méthode ; ici carre renvoie un int, ce que confirme l'instruction return x * x.",
  },
  {
    id: "ex20", section: "methodes",
    statement: "Une méthode déclarée <code>static void afficher(String msg)</code> peut-elle être utilisée ainsi : <code>String r = afficher(\"salut\");</code> ?",
    options: ["Non, void signifie qu'elle ne renvoie rien : il n'y a rien à récupérer dans r", "Oui, r contiendra \"salut\"", "Oui, r contiendra null automatiquement de façon utilisable"],
    correctIndex: 0,
    explain: "void est le type de retour \"rien\" : une méthode void ne peut jamais être utilisée comme une expression qui produit une valeur à stocker.",
  },
  {
    id: "ex21", section: "methodes",
    statement: "Que signifie le mot-clé <code>static</code> devant une méthode ?",
    options: ["La méthode appartient à la classe et peut être appelée sans créer d'objet", "La méthode ne peut être appelée qu'une seule fois", "La méthode ne peut pas avoir de paramètres"],
    correctIndex: 0,
    explain: "static rattache la méthode à la classe elle-même (pas à une instance particulière) : on peut l'appeler directement, ex. Main.carre(5), sans faire new Main().",
  },
  {
    id: "ex22", section: "methodes",
    statement: "Comment déclare-t-on une méthode avec deux paramètres, un <code>String</code> et un <code>int</code> ?",
    options: ["<code>static void f(String msg, int n)</code>", "<code>static void f(msg, n)</code>", "<code>static void f(msg: String, n: int)</code>"],
    correctIndex: 0,
    explain: "Chaque paramètre doit être déclaré avec son type explicite en Java : type puis nom, séparés par des virgules entre les paramètres.",
  },
  {
    id: "ex23", section: "poo-base",
    statement: "Comment crée-t-on un nouvel objet à partir d'une classe <code>Chien</code> ?",
    options: ["<code>Chien c = new Chien();</code>", "<code>Chien c = Chien();</code>", "<code>c = create Chien();</code>"],
    correctIndex: 0,
    explain: "Le mot-clé new suivi du nom de la classe et de parenthèses appelle le constructeur et alloue un nouvel objet en mémoire.",
  },
  {
    id: "ex24", section: "poo-base",
    statement: "Quel type de retour porte le constructeur d'une classe <code>Chien</code> ?",
    options: ["Aucun (pas de type de retour, pas même void)", "<code>void</code>", "<code>Chien</code>"],
    correctIndex: 0,
    explain: "Un constructeur n'a jamais de type de retour, pas même void : il porte simplement le même nom que la classe.",
  },
  {
    id: "ex25", section: "poo-base",
    statement: "Dans <code>public Chien(String nom) { this.nom = nom; }</code>, à quoi sert <code>this</code> ?",
    options: ["À désigner l'objet en cours de création, pour distinguer l'attribut nom du paramètre nom", "À créer une nouvelle variable locale", "This n'a aucune utilité ici, il est facultatif"],
    correctIndex: 0,
    explain: "this.nom fait référence à l'attribut de l'objet, tandis que nom seul désigne le paramètre reçu : sans this, on ne pourrait pas les distinguer puisqu'ils portent le même nom.",
  },
  {
    id: "ex26", section: "poo-base",
    statement: "Une méthode d'instance (non static) <code>aboyer()</code> définie dans la classe <code>Chien</code>, comment l'appelle-t-on ?",
    options: ["<code>c.aboyer()</code>, à partir d'un objet c déjà créé", "<code>Chien.aboyer()</code>, directement sur la classe", "<code>aboyer(Chien)</code>"],
    correctIndex: 0,
    explain: "Une méthode d'instance agit sur les attributs d'un objet particulier : elle ne peut être appelée qu'à partir d'un objet existant (c.aboyer()), contrairement à une méthode static.",
  },
  {
    id: "ex27", section: "poo-base",
    statement: "Quelle est la différence entre une classe et un objet ?",
    options: ["La classe est le modèle ; l'objet est une instance concrète créée à partir de ce modèle", "Ce sont des synonymes stricts en Java", "Un objet peut contenir plusieurs classes"],
    correctIndex: 0,
    explain: "La classe décrit la structure (attributs, méthodes) ; chaque objet créé avec new est une instance concrète possédant ses propres valeurs d'attributs.",
  },
];

const SECTIONS = [
  {
    id: "syntaxe", title: "§1 — SYNTAXE DE BASE",
    cours: "Un programme Java tient dans une <span class=\"math\">classe</span> ; le point d'entrée est toujours <code>public static void main(String[] args) { ... }</code><br>Java est <span class=\"math\">typé statiquement</span> : chaque variable est déclarée avec son type, ex. <code>int x = 42;</code>, <code>double d = 3.14;</code>, <code>boolean b = true;</code>, <code>String s = \"toto\";</code><br>Chaque instruction se termine par un <span class=\"math\">point-virgule</span> <code>;</code> — l'oublier est l'erreur de syntaxe la plus fréquente pour un débutant<br><code>int</code> est un entier (pas de virgule), <code>double</code> un nombre à virgule flottante ; contrairement à Python, le type ne change jamais après la déclaration<br><code>System.out.println(x)</code> affiche x suivi d'un saut de ligne ; <code>System.out.print(x)</code> sans saut de ligne",
  },
  {
    id: "conditions-java", title: "§2 — OPÉRATEURS ET CONDITIONS",
    cours: "Comparaisons <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code> renvoient un <code>boolean</code> ; opérateurs logiques <code>&amp;&amp;</code> (ET), <code>||</code> (OU), <code>!</code> (NON)<br><code>if (condition) { ... } else { ... }</code> : les accolades délimitent le bloc (contrairement à Python, l'indentation seule n'a pas de valeur syntaxique)<br><span class=\"math\">Piège classique</span> : pour comparer deux objets <code>String</code>, il faut utiliser <code>a.equals(b)</code> et non <code>a == b</code> (qui compare les références mémoire, pas le contenu)<br><code>if / else if / else</code> : les conditions sont testées dans l'ordre, la première vraie est exécutée et les suivantes sont ignorées<br><code>switch (x) { case 1: ...; break; default: ...; }</code> : le <code>break</code> est nécessaire, sinon l'exécution continue dans le cas suivant",
  },
  {
    id: "boucles-java", title: "§3 — BOUCLES",
    cours: "<code>for (int i = 0; i &lt; n; i++) { ... }</code> : initialisation, condition d'arrêt, incrément, les trois parties séparées par <code>;</code><br><code>while (condition) { ... }</code> teste la condition AVANT chaque tour ; <code>do { ... } while (condition);</code> l'exécute APRÈS, donc le corps s'exécute toujours au moins une fois<br><code>i++</code> équivaut à <code>i = i + 1</code> ; <code>i--</code> équivaut à <code>i = i - 1</code><br><span class=\"math\">Boucle infinie</span> : même risque qu'en Python si la variable de contrôle n'est jamais mise à jour dans le corps de la boucle<br><code>break</code> sort immédiatement de la boucle ; <code>continue</code> passe directement au tour suivant sans exécuter le reste du corps",
  },
  {
    id: "tableaux", title: "§4 — TABLEAUX",
    cours: "Déclaration : <code>int[] t = new int[5];</code> crée un tableau de 5 entiers, initialisés à 0 ; <code>int[] t = {1, 2, 3};</code> crée et initialise directement<br>Indexation depuis 0 comme en Python : <code>t[0]</code> premier élément ; <code>t.length</code> (sans parenthèses !) donne le nombre d'éléments<br>Accéder à <code>t[t.length]</code> lève une <span class=\"math\">ArrayIndexOutOfBoundsException</span> : le dernier indice valide est <code>t.length - 1</code><br><span class=\"math\">Boucle for-each</span> <code>for (int x : t) { ... }</code> parcourt tous les éléments du tableau sans indice explicite<br>La taille d'un tableau Java est <span class=\"math\">fixe</span> une fois créé (contrairement à une liste Python qu'on peut agrandir avec append)",
  },
  {
    id: "methodes", title: "§5 — MÉTHODES",
    cours: "<code>static int carre(int x) { return x * x; }</code> : le type de retour (<code>int</code>) est annoncé avant le nom de la méthode, contrairement à Python<br><code>void</code> comme type de retour signifie que la méthode ne renvoie rien (équivalent du <code>None</code> implicite de Python)<br>Chaque paramètre est déclaré avec son type : <code>static void afficher(String msg, int n)</code><br>Une méthode <code>void</code> ne peut pas être utilisée dans une expression comme <code>int y = f(x);</code> si f est void : il n'y a rien à récupérer<br>Le mot-clé <code>static</code> signifie que la méthode appartient à la classe elle-même, appelable sans créer d'objet (ex. <code>Main.carre(5)</code>)",
  },
  {
    id: "poo-base", title: "§6 — CLASSES ET OBJETS",
    cours: "Une <span class=\"math\">classe</span> décrit un modèle (attributs + méthodes) ; un <span class=\"math\">objet</span> est une instance créée avec <code>new</code> : <code>Chien c = new Chien();</code><br>Le <span class=\"math\">constructeur</span> porte le même nom que la classe et n'a pas de type de retour : <code>public Chien(String nom) { this.nom = nom; }</code><br><code>this</code> désigne l'objet courant, utile pour distinguer un attribut d'un paramètre de même nom<br>Un <span class=\"math\">attribut</span> stocke une donnée propre à chaque objet ; une <span class=\"math\">méthode d'instance</span> (non static) agit sur les attributs de l'objet qui l'appelle : <code>c.aboyer()</code><br>Contrairement à une méthode static, une méthode d'instance ne peut être appelée qu'à partir d'un objet existant, jamais directement sur la classe",
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
