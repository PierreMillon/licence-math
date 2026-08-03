/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/python.js
   Rendu + vérification des exercices de la fiche PYTHON.
   Tous les exercices sont des QCM à 3 réponses.
   Contenu construit à partir de « Découverte de la programmation »
   (L1 INU Champollion). Variables, Matplotlib,
   conditions, boucle for, listes, boucle while et fonctions
   reprennent des exemples et résultats vérifiés du PDF source
   (splitté par l'utilisateur pour contourner la limite d'extraction).
   Le chapitre « chaînes de caractères » du PDF n'a pas encore été
   reçu : un seul exercice (ex38) est ancré sur un extrait réel
   (parcours de "ALIBABA"), le reste repose sur la syntaxe Python
   standard.
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';
const STATE_KEY = 'l1maths_python_state';
const CHAPTER_ID = 'python';

/* ---------- données des exercices (QCM, 3 réponses) ---------- */
const EXERCISES = [
  {
    id: "ex1", section: "variables",
    statement: "Que renvoie <code>print(42 // 10)</code> ?",
    options: ["<code>4.2</code>", "<code>4</code>", "<code>5</code>"],
    correctIndex: 1,
    explain: "L'opérateur <code>//</code> renvoie le quotient de la division entière : 42 divisé par 10 vaut 4 avec un reste de 2.",
  },
  {
    id: "ex2", section: "variables",
    statement: "Que renvoie <code>print(42 % 10)</code> ?",
    options: ["<code>2</code>", "<code>4</code>", "<code>4.2</code>"],
    correctIndex: 0,
    explain: "L'opérateur <code>%</code> (modulo) renvoie le reste de la division entière : 42 = 4×10 + 2.",
  },
  {
    id: "ex3", section: "variables",
    statement: "Quel est le type du résultat de l'expression <code>10 / 2</code> ?",
    options: ["<code>int</code>", "<code>float</code>", "<code>bool</code>"],
    correctIndex: 1,
    explain: "L'opérateur <code>/</code> (division exacte) renvoie toujours un résultat de type flottant, même quand la division tombe juste.",
  },
  {
    id: "ex4", section: "variables",
    statement: "Que vaut <code>x == y</code> après <code>x = 10</code> et <code>y = 10.0</code> ?",
    options: ["<code>True</code>", "<code>False</code>", "Erreur"],
    correctIndex: 0,
    explain: "10 et 10.0 ont des types différents (<code>int</code> et <code>float</code>) mais la même valeur, donc <code>==</code> renvoie <code>True</code>.",
  },
  {
    id: "ex5", section: "variables",
    statement: "Que produit <code>print(\"toto\", 42+100)</code> ?",
    options: ["<code>toto42+100</code>", "<code>toto 142</code>", "<code>toto, 142</code>"],
    correctIndex: 1,
    explain: "print sépare les éléments qu'on lui transmet par un seul espace, et affiche la valeur de l'expression 42+100, soit 142.",
  },
  {
    id: "ex6", section: "variables",
    statement: "Que se passe-t-il à l'exécution de <code>R = 10</code> puis <code>print(2 * pi * R)</code> (sans avoir défini <code>pi</code> avant) ?",
    options: ["Un nombre s'affiche", "<code>NameError</code> : pi n'est pas défini", "<code>SyntaxError</code>"],
    correctIndex: 1,
    explain: "Une variable utilisée sans avoir été affectée au préalable déclenche une <code>NameError</code> à l'exécution, pas une erreur de syntaxe.",
  },
  {
    id: "ex7", section: "matplotlib",
    statement: "Pour tracer un segment entre A=(-5,5) et B=(4,-4), quelle instruction est correcte ?",
    options: ["<code>plt.plot(A, B)</code>", "<code>plt.plot([-5, 4], [5, -4])</code>", "<code>plt.line(A, B)</code>"],
    correctIndex: 1,
    explain: "<code>plot</code> attend une liste des abscisses puis une liste des ordonnées, pas les points eux-mêmes ; Matplotlib ne propose pas de fonction <code>line(A,B)</code> toute faite.",
  },
  {
    id: "ex8", section: "matplotlib",
    statement: "Quelle instruction donne un repère avec les mêmes unités sur les deux axes (évite les déformations) ?",
    options: ["<code>plt.axis('off')</code>", "<code>plt.axis('equal')</code>", "<code>plt.axis('on')</code>"],
    correctIndex: 1,
    explain: "Par défaut le repère de Matplotlib n'est pas orthonormé ; <code>plt.axis('equal')</code> active des unités identiques sur les deux axes.",
  },
  {
    id: "ex9", section: "matplotlib",
    statement: "Dans <code>Rectangle(xy, w, h)</code>, que représente le point <code>xy</code> ?",
    options: ["Le centre du rectangle", "Le coin en bas à gauche", "Le coin en haut à droite"],
    correctIndex: 1,
    explain: "Le constructeur <code>Rectangle</code> attend le point situé en bas à gauche, puis la largeur et la hauteur.",
  },
  {
    id: "ex10", section: "matplotlib",
    statement: "Après <code>circ = plt.Circle((0,0), 2)</code>, que faut-il faire pour que le disque apparaisse dans le dessin ?",
    options: ["<code>plt.show(circ)</code>", "<code>ax.add_patch(circ)</code>", "Rien, il s'affiche automatiquement"],
    correctIndex: 1,
    explain: "Sans <code>ax.add_patch(circ)</code>, la forme créée n'est pas insérée dans le dessin courant et reste invisible.",
  },
  {
    id: "ex11", section: "matplotlib",
    statement: "Quand aucune couleur n'est précisée pour un disque, quelle couleur Matplotlib utilise-t-il par défaut ?",
    options: ["Rouge", "Un bleu (proche du \"bleu acier\")", "Noir"],
    correctIndex: 1,
    explain: "Par défaut, une forme remplie utilise un bleu proche du bleu acier, disponible aussi via la chaîne \"tab:blue\".",
  },
  {
    id: "ex12", section: "conditions",
    statement: "Que vaut l'expression <code>(5 &gt; 3) and (4 &gt; 7)</code> ?",
    options: ["<code>True</code>", "<code>False</code>", "Erreur"],
    correctIndex: 1,
    explain: "<code>p and q</code> n'est vrai que si les deux opérandes sont vrais ; ici <code>4 &gt; 7</code> est faux donc l'expression entière est fausse.",
  },
  {
    id: "ex13", section: "conditions",
    statement: "Avec <code>m = 2</code> :<br><code>if m == 1: print(\"Or\")<br>elif m == 2: print(\"Argent\")<br>elif m == 3: print(\"Bronze\")</code><br>Qu'affiche ce code ?",
    options: ["<code>Or</code>", "<code>Argent</code>", "Rien ne s'affiche"],
    correctIndex: 1,
    explain: "La condition <code>m == 1</code> est fausse, puis <code>m == 2</code> est vraie : \"Argent\" est affiché et la clause <code>elif m == 3</code> n'est plus testée.",
  },
  {
    id: "ex14", section: "conditions",
    statement: "Avec <code>m = 0</code> :<br><code>if m &gt;= 0: print(\"positif\")<br>if m &lt;= 0: print(\"negatif\")</code><br>(deux <code>if</code> indépendants) — qu'affiche ce code ?",
    options: ["\"positif\" seulement", "\"positif\" puis \"negatif\"", "\"negatif\" seulement"],
    correctIndex: 1,
    explain: "Ce sont deux instructions <code>if</code> indépendantes, donc les deux conditions sont testées séparément ; m=0 vérifie les deux, donc les deux messages s'affichent.",
  },
  {
    id: "ex15", section: "conditions",
    statement: "Avec <code>m = 0</code> :<br><code>if m &gt;= 0: print(\"positif\")<br>elif m &lt;= 0: print(\"negatif\")</code><br>Qu'affiche ce code cette fois ?",
    options: ["\"positif\" seulement", "\"negatif\" seulement", "Les deux messages"],
    correctIndex: 0,
    explain: "Dès qu'une condition <code>if</code> est vraie, la clause <code>elif</code> suivante n'est plus testée du tout, même si elle serait vraie aussi.",
  },
  {
    id: "ex16", section: "conditions",
    statement: "Laquelle de ces écritures est syntaxiquement correcte en Python ?",
    options: ["<code>else x &lt; 42:</code>", "<code>else:</code>", "<code>else if x &lt; 42:</code>"],
    correctIndex: 1,
    explain: "Une clause <code>else</code> ne peut jamais être suivie d'une condition : elle est toujours immédiatement suivie de deux-points.",
  },
  {
    id: "ex17", section: "conditions",
    statement: "Sachant que <code>estBissext = (n % 4 == 0 and n % 100 != 0) or (n % 400 == 0)</code>, que vaut cette expression pour <code>n = 2000</code> ?",
    options: ["<code>True</code>", "<code>False</code>", "Erreur"],
    correctIndex: 0,
    explain: "2000 est multiple de 400, donc la partie <code>n % 400 == 0</code> du OU est vraie : l'année est bissextile même si 2000 est aussi multiple de 100.",
  },
  {
    id: "ex18", section: "boucles",
    statement: "Quels entiers <code>range(6, 10)</code> génère-t-il ?",
    options: ["<code>6, 7, 8, 9</code>", "<code>6, 7, 8, 9, 10</code>", "<code>7, 8, 9, 10</code>"],
    correctIndex: 0,
    explain: "Le deuxième argument de <code>range</code> est exclu : <code>range(a, b)</code> génère exactement b − a entiers, de a à b−1.",
  },
  {
    id: "ex19", section: "boucles",
    statement: "<code>for i in range(3): print(i)</code> — que produit ce code ?",
    options: ["<code>1 2 3</code> sur une ligne", "<code>0</code>, <code>1</code>, <code>2</code> chacun sur sa ligne", "<code>0 1 2 3</code> sur une ligne"],
    correctIndex: 1,
    explain: "<code>range(3)</code> équivaut à <code>range(0, 3)</code> (donc 0, 1, 2) et chaque <code>print</code> effectue un saut de ligne par défaut.",
  },
  {
    id: "ex20", section: "boucles",
    statement: "<code>for i in range(10): print(i, end=\" \")</code> — quel est l'effet de <code>end=\" \"</code> ?",
    options: ["Chaque nombre s'affiche sur sa propre ligne", "Tous les nombres s'affichent sur une même ligne, séparés par un espace", "Cela provoque une erreur"],
    correctIndex: 1,
    explain: "L'argument nommé <code>end=\" \"</code> remplace le saut de ligne par défaut de <code>print</code> par un simple espace.",
  },
  {
    id: "ex21", section: "boucles",
    statement: "<code>n = 5<br>s = 0<br>for k in range(1, n+1): s = s + k**3<br>print(s)</code><br>Que représente <code>s</code> affiché à la fin ?",
    options: ["La somme des cubes de 1 à 5", "La somme des cubes de 1 à 4", "Le cube de 5 uniquement"],
    correctIndex: 0,
    explain: "<code>s</code> est une variable accumulatrice initialisée à 0 puis augmentée de <code>k**3</code> à chaque tour, pour k allant de 1 à n inclus.",
  },
  {
    id: "ex22", section: "boucles",
    statement: "<code>for i in range(0, 4): print(\"Bonjour!\")</code> — combien de fois \"Bonjour!\" est-il affiché ?",
    options: ["3 fois", "4 fois", "5 fois"],
    correctIndex: 1,
    explain: "<code>range(0, 4)</code> génère les 4 entiers 0, 1, 2, 3 (4 exclu), donc le corps de la boucle s'exécute 4 fois.",
  },
  {
    id: "ex23", section: "listes",
    statement: "<code>L = [65, 31, 9, 32, 81, 82, 46, 12]<br>for z in L:<br>&nbsp;&nbsp;if z % 2 == 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(z)</code><br>Que s'affiche-t-il ?",
    options: ["<code>32</code>, <code>82</code>, <code>46</code>, <code>12</code> chacun sur sa ligne", "Tous les éléments de L, chacun sur sa ligne", "<code>65</code>, <code>31</code>, <code>9</code>, <code>81</code> chacun sur sa ligne"],
    correctIndex: 0,
    explain: "Le filtrage <code>if z % 2 == 0</code> ne laisse passer que les éléments pairs de L, dans leur ordre d'apparition : 32, 82, 46, 12.",
  },
  {
    id: "ex24", section: "listes",
    statement: "<code>L = [65, 31, 9, 32, 81, 82, 46, 12]<br>cpt = 0<br>for z in L:<br>&nbsp;&nbsp;if z % 2 == 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;cpt = cpt + 1<br>print(cpt)</code><br>Que vaut <code>cpt</code> affiché à la fin ?",
    options: ["<code>4</code>", "<code>8</code>", "<code>12</code>"],
    correctIndex: 0,
    explain: "cpt est un compteur associé au filtre « z pair » : L contient exactement 4 entiers pairs (32, 82, 46, 12), donc cpt vaut 4 à la fin.",
  },
  {
    id: "ex25", section: "listes",
    statement: "<code>L = [10, 3, 12, 5]<br>maxi = L[0]<br>for i in range(1, len(L)):<br>&nbsp;&nbsp;if L[i] &gt; maxi:<br>&nbsp;&nbsp;&nbsp;&nbsp;maxi = L[i]<br>print(maxi)</code><br>Que s'affiche-t-il ?",
    options: ["<code>10</code>", "<code>12</code>", "<code>5</code>"],
    correctIndex: 1,
    explain: "maxi est initialisé au premier terme puis mis à jour à chaque fois qu'un plus grand terme est trouvé ; le plus grand élément de L est 12.",
  },
  {
    id: "ex26", section: "listes",
    statement: "<code>L = [310, 12, 8100, 90, 31]<br>s = 0<br>for z in L:<br>&nbsp;&nbsp;s = s + z<br>s = s - L[0] - L[len(L)-1]<br>print(s)</code><br>Que s'affiche-t-il ?",
    options: ["<code>8543</code>", "<code>8202</code>", "<code>8161</code>"],
    correctIndex: 1,
    explain: "s vaut d'abord la somme de tous les termes de L (8543), puis on lui retire le premier terme (310) et le dernier (31) : 8543 − 310 − 31 = 8202.",
  },
  {
    id: "ex27", section: "listes",
    statement: "<code>L = [42, 33, 0, 0, 81, 0, 82, 31]</code><br>En ne comptant que les valeurs non nulles de L, dans l'ordre, quelle est la 4ᵉ valeur non nulle et à quel indice se trouve-t-elle dans L ?",
    options: ["<code>82</code>, à l'indice 6", "<code>81</code>, à l'indice 4", "<code>31</code>, à l'indice 7"],
    correctIndex: 0,
    explain: "Les valeurs non nulles de L, dans l'ordre, sont 42, 33, 81, 82, 31 : la 4ᵉ est 82, qui se trouve à l'indice 6 de L.",
  },
  {
    id: "ex28", section: "listes",
    statement: "Que vaut <code>3 in [1, 2, 3]</code> ?",
    options: ["<code>2</code> (la position de 3)", "<code>True</code>", "<code>3</code>"],
    correctIndex: 1,
    explain: "L'opérateur in teste seulement l'appartenance et renvoie un booléen ; il ne donne pas la position de l'élément.",
  },
  {
    id: "ex29", section: "boucle-while",
    statement: "<code>i = 1<br>while i &lt;= 5:<br>&nbsp;&nbsp;print(10 * i)<br>&nbsp;&nbsp;i = i + 1</code><br>Que s'affiche-t-il ?",
    options: ["<code>10 20 30 40 50</code>, chacun sur sa ligne", "<code>0 10 20 30 40</code>, chacun sur sa ligne", "Une boucle infinie"],
    correctIndex: 0,
    explain: "La condition i≤5 est vraie pour i=1,2,3,4,5 : le code affiche successivement 10, 20, 30, 40, 50, puis s'arrête quand i devient 6.",
  },
  {
    id: "ex30", section: "boucle-while",
    statement: "<code>n = 42<br>k = 0<br>while 10 * k &lt; n:<br>&nbsp;&nbsp;k = k + 1<br>print(k)</code><br>Que vaut <code>k</code> affiché à la fin ?",
    options: ["<code>4</code>", "<code>5</code>", "<code>42</code>"],
    correctIndex: 1,
    explain: "La condition 10k&lt;42 reste vraie pour k=0,1,2,3,4 (10×4=40&lt;42) mais devient fausse pour k=5 (10×5=50, qui n'est pas &lt;42) : la boucle s'arrête donc avec k=5.",
  },
  {
    id: "ex31", section: "boucle-while",
    statement: "Pourquoi utilise-t-on une boucle <code>while</code> plutôt qu'une boucle <code>for</code> ?",
    options: ["Quand le nombre d'itérations n'est pas connu à l'avance (l'arrêt dépend d'un calcul)", "Quand on veut parcourir une liste", "while et for sont strictement interchangeables, aucune différence"],
    correctIndex: 0,
    explain: "for convient quand on connaît le nombre d'itérations à l'avance (range, liste) ; while convient quand l'arrêt dépend d'une condition calculée pendant l'exécution.",
  },
  {
    id: "ex32", section: "boucle-while",
    statement: "Dans une boucle for ou while, quel est l'effet de l'instruction <code>break</code> ?",
    options: ["Elle interrompt immédiatement la boucle en cours", "Elle passe simplement au tour suivant", "Elle relance la boucle depuis le début"],
    correctIndex: 0,
    explain: "break sort immédiatement de la boucle, sans attendre que la condition d'arrêt naturelle soit atteinte.",
  },
  {
    id: "ex33", section: "fonctions-py",
    statement: "<code>from math import pi<br>def aire_disque(r):<br>&nbsp;&nbsp;return pi * r**2<br>print(aire_disque(10))</code><br>Que s'affiche-t-il (approximativement) ?",
    options: ["<code>31.4</code>", "<code>314.159...</code>", "<code>100</code>"],
    correctIndex: 1,
    explain: "aire_disque(10) renvoie π×10² ≈ 314.1592653589793, la valeur exacte fournie par le module math de Python.",
  },
  {
    id: "ex34", section: "fonctions-py",
    statement: "<code>def consecutifs(n):<br>&nbsp;&nbsp;return list(range(1, n+1))<br>print(consecutifs(4))</code><br>Que s'affiche-t-il ?",
    options: ["<code>[1, 2, 3, 4]</code>", "<code>[0, 1, 2, 3]</code>", "<code>[1, 2, 3, 4, 5]</code>"],
    correctIndex: 0,
    explain: "consecutifs(n) doit renvoyer la liste de tous les entiers consécutifs entre 1 et n, donc consecutifs(4) renvoie [1, 2, 3, 4].",
  },
  {
    id: "ex35", section: "fonctions-py",
    statement: "Une fonction <code>diviseurs(n)</code> renvoie la liste de tous les diviseurs de n. D'après <code>diviseurs(42)</code>, laquelle de ces listes est correcte ?",
    options: ["<code>[1, 2, 3, 6, 7, 14, 21, 42]</code>", "<code>[1, 2, 3, 7, 14, 42]</code>", "<code>[2, 3, 6, 7, 14, 21]</code>"],
    correctIndex: 0,
    explain: "42 = 2×3×7 : ses diviseurs sont 1, 2, 3, 6, 7, 14, 21 et 42 lui-même.",
  },
  {
    id: "ex36", section: "fonctions-py",
    statement: "Un entier est dit premier s'il admet exactement deux diviseurs. Lequel de ces deux nombres est premier : 41 ou 42 ?",
    options: ["41 seulement (ses seuls diviseurs sont 1 et 41)", "42 seulement", "Les deux sont premiers"],
    correctIndex: 0,
    explain: "42 admet au moins trois diviseurs (1, 6 et 42 par exemple), il n'est donc pas premier ; 41 n'a que deux diviseurs, 1 et 41, il est donc premier.",
  },
  {
    id: "ex37", section: "fonctions-py",
    statement: "<code>def f(x):<br>&nbsp;&nbsp;if x &gt; 0:<br>&nbsp;&nbsp;&nbsp;&nbsp;return 'positif'<br>&nbsp;&nbsp;return 'non positif'<br>print(f(5))</code><br>Que s'affiche-t-il ?",
    options: ["<code>positif</code>", "<code>non positif</code>", "Les deux lignes s'affichent"],
    correctIndex: 0,
    explain: "Dès qu'un return est exécuté (ici dans le if, car 5>0), la fonction s'arrête immédiatement : la ligne return 'non positif' n'est jamais atteinte.",
  },
  {
    id: "ex38", section: "chaines",
    statement: "<code>for c in \"ALIBABA\":<br>&nbsp;&nbsp;print(c * 2)</code><br>Combien de lignes ce code affiche-t-il ?",
    options: ["7 (autant que de caractères dans \"ALIBABA\")", "1 seule ligne, tout concaténé", "14"],
    correctIndex: 0,
    explain: "\"ALIBABA\" contient 7 caractères ; le parcours avec for se fait un caractère à la fois et chaque tour fait un print, donc 7 lignes s'affichent (AA, LL, II, BB, AA, BB, AA).",
  },
  {
    id: "ex39", section: "chaines",
    statement: "Que produit <code>\"Bon\" + \"jour\"</code> ?",
    options: ["<code>Bon jour</code> (avec espace)", "<code>Bonjour</code>", "Une erreur : on ne peut pas additionner des chaînes"],
    correctIndex: 1,
    explain: "L'opérateur + concatène directement les deux chaînes, sans ajouter d'espace : le résultat est \"Bonjour\".",
  },
  {
    id: "ex40", section: "chaines",
    statement: "Que vaut <code>\"abc\"[1]</code> ?",
    options: ["<code>a</code>", "<code>b</code>", "<code>c</code>"],
    correctIndex: 1,
    explain: "Une chaîne s'indexe comme une liste de caractères, à partir de 0 : \"abc\"[0]='a', [1]='b', [2]='c'.",
  },
  {
    id: "ex41", section: "chaines",
    statement: "Que se passe-t-il si on exécute <code>s = \"abc\"</code> puis <code>s[0] = \"A\"</code> ?",
    options: ["Une erreur, car les chaînes sont immutables", "s devient \"Abc\"", "s devient \"Aabc\""],
    correctIndex: 0,
    explain: "Contrairement aux listes, les chaînes sont immutables en Python : on ne peut pas modifier un caractère en place, il faut construire une nouvelle chaîne.",
  },
  {
    id: "ex42", section: "chaines",
    statement: "Que renvoie <code>\"lo\" in \"Bonjour\"</code> ?",
    options: ["<code>True</code>", "<code>False</code>", "La position 2"],
    correctIndex: 0,
    explain: "\"lo\" apparaît bien dans \"Bonjour\" ; l'opérateur in renvoie un booléen (True), jamais une position.",
  },
  {
    id: "ex43", section: "chaines",
    statement: "Que produit <code>\"Bonjour\".upper()</code> ?",
    options: ["<code>bonjour</code>", "<code>BONJOUR</code>", "<code>Bonjour</code> (upper ne fait rien seule)"],
    correctIndex: 1,
    explain: "upper() renvoie une nouvelle chaîne où toutes les lettres sont en majuscules, sans modifier la chaîne d'origine.",
  },
];

const SECTIONS = [
  {
    id: "variables", title: "§1 — INTERFACE, VARIABLES, OPÉRATIONS",
    cours: "<span class=\"math\">Variable</span> = étiquette qui référence un objet en mémoire, définie par affectation <code>x = 42</code> (pas de déclaration de type)<br>Types de base : <code>int</code>, <code>float</code> (point décimal, ex. <code>3.14</code>), <code>bool</code> (<code>True</code>/<code>False</code>), <code>str</code><br><span class=\"math\">Division entière</span> <code>a // b</code> = quotient, <code>a % b</code> = reste (modulo) ; <code>a / b</code> = division flottante, toujours de type <code>float</code><br>Opérateurs de comparaison <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code> renvoient un <span class=\"math\">booléen</span> ; ne jamais comparer deux flottants avec <code>==</code><br><code>print(a, b)</code> affiche les valeurs séparées d'un espace, avec saut de ligne automatique ; ne pas confondre affectation <code>=</code> et test d'égalité <code>==</code><br>Un nom non affecté déclenche <code>NameError</code> à l'exécution (pas une erreur de syntaxe)",
  },
  {
    id: "matplotlib", title: "§2 — DESSINER AVEC MATPLOTLIB",
    cours: "<code>import matplotlib.pyplot as plt</code> : bibliothèque utilisée ici pour du dessin géométrique, pas seulement des graphiques<br>Segment : <code>plt.plot([xA, xB], [yA, yB])</code> — on fournit la liste des abscisses puis la liste des ordonnées, pas les points eux-mêmes<br><span class=\"math\">Disque</span> : <code>plt.Circle(centre, rayon)</code> puis <code>ax.add_patch(...)</code> pour l'insérer dans le dessin (sinon il reste invisible)<br>Rectangle : <code>Rectangle(xy, largeur, hauteur)</code> où <span class=\"math\">xy</span> est le coin bas-gauche<br><code>plt.axis('equal')</code> = repère orthonormé (évite les déformations) ; <code>plt.axis('off')</code> = masque les axes<br>Couleurs passées comme chaîne nommée, ex. <code>color=\"red\"</code> (insensible à la casse) ; couleur par défaut = un bleu (\"tab:blue\")",
  },
  {
    id: "conditions", title: "§3 — CONDITIONS",
    cours: "<span class=\"math\">Booléen</span> : type <code>bool</code>, valeurs <code>True</code>/<code>False</code>, obtenu par une comparaison<br>Opérateurs logiques <code>and</code> (ET), <code>or</code> (OU non exclusif), <code>not</code> (NON) — <code>p and q</code> vrai seulement si p ET q vrais, <code>p or q</code> faux seulement si p ET q faux<br><code>if condition:</code> exécute le bloc indenté seulement si la condition vaut <code>True</code><br><code>if / else</code> = alternative ; le mot <code>else</code> est toujours suivi directement de <code>:</code>, jamais d'une condition<br><span class=\"math\">if / elif / else</span> : conditions testées dans l'ordre, la première vraie est exécutée puis les suivantes sont ignorées — contrairement à une suite de <code>if</code> indépendants, tous testés séparément<br>Indentation obligatoire et uniforme dans le corps d'une instruction composée",
  },
  {
    id: "boucles", title: "§4 — BOUCLE FOR",
    cours: "<code>for i in range(a, b):</code> répète le corps pour i parcourant les entiers de a à b, b exclu (<code>range(n)</code> = raccourci de <code>range(0, n)</code>)<br>Nombre d'itérations connu à l'avance → boucle <span class=\"math\">for</span> ; le corps est indenté sous l'en-tête terminé par <code>:</code><br><code>print(i, end=\" \")</code> remplace le saut de ligne par défaut par un espace, pour tout afficher sur une même ligne<br><span class=\"math\">Accumulateur</span> : variable initialisée à 0 avant la boucle, puis mise à jour par <code>s = s + ...</code> à chaque tour<br><code>range(a, b)</code> génère exactement <code>b - a</code> entiers",
  },
  {
    id: "listes", title: "§5 — LISTES",
    cours: "<span class=\"math\">Liste</span> = collection ordonnée modifiable : <code>L = [1, 2, 3]</code> ; indexation depuis 0, <code>L[0]</code> premier élément, <code>L[-1]</code> dernier<br><code>len(L)</code> = nombre d'éléments ; <code>L.append(x)</code> ajoute x à la fin ; <code>x in L</code> teste l'appartenance (booléen)<br><span class=\"math\">Slicing</span> <code>L[a:b]</code> = sous-liste des indices a à b-1 (b exclu, comme <code>range</code>) ; <code>L[:]</code> copie toute la liste<br><span class=\"math\">Liste en compréhension</span> <code>[f(x) for x in L]</code> construit une nouvelle liste en appliquant f à chaque élément ; <code>[x for x in L if cond]</code> filtre selon une condition<br>Une liste est un objet <span class=\"math\">mutable</span> : <code>L[0] = 99</code> modifie L directement, sans créer de nouvelle liste",
  },
  {
    id: "boucle-while", title: "§6 — BOUCLE WHILE",
    cours: "<code>while condition:</code> répète le bloc indenté tant que la condition vaut <code>True</code>, testée avant chaque tour<br>Contrairement à <code>for</code>, le nombre d'itérations n'est pas connu à l'avance : on utilise <code>while</code> quand l'arrêt dépend d'un calcul fait pendant la boucle<br>Risque de <span class=\"math\">boucle infinie</span> : si la condition ne devient jamais fausse (variable de contrôle jamais mise à jour dans le corps), le programme ne s'arrête pas<br>Toute boucle <code>for i in range(...)</code> peut se réécrire en <code>while</code> avec un compteur initialisé puis incrémenté manuellement à chaque tour<br><code>break</code> interrompt immédiatement la boucle (for ou while) en cours, avant que la condition ne redevienne fausse",
  },
  {
    id: "fonctions-py", title: "§7 — FONCTIONS",
    cours: "<code>def nom(param1, param2):</code> définit une fonction ; le corps indenté s'exécute uniquement lors de l'appel <code>nom(a, b)</code><br><code>return valeur</code> termine la fonction et renvoie le résultat à l'appelant ; le code après un <code>return</code> exécuté n'est jamais atteint<br>Une fonction <span class=\"math\">sans instruction return</span> renvoie implicitement <code>None</code>, même si elle affiche quelque chose avec <code>print</code><br>Paramètre avec <span class=\"math\">valeur par défaut</span> <code>def f(x, n=2):</code> : n prend 2 si l'appelant ne le précise pas, sinon la valeur fournie<br>Une variable définie à l'intérieur d'une fonction est <span class=\"math\">locale</span> : elle n'existe pas en dehors de la fonction, même après son exécution",
  },
  {
    id: "chaines", title: "§8 — CHAÎNES DE CARACTÈRES",
    cours: "Une <span class=\"math\">chaîne</span> <code>str</code> se comporte comme une liste de caractères en lecture : <code>s[0]</code> premier caractère, <code>len(s)</code> nombre de caractères, <code>s[a:b]</code> sous-chaîne<br><code>+</code> concatène deux chaînes (pas d'addition numérique) ; <code>s * 3</code> répète la chaîne 3 fois<br><code>'motif' in s</code> teste si le motif apparaît dans s (booléen) ; ne renvoie pas une position<br>Une chaîne est <span class=\"math\">immutable</span> : <code>s[0] = 'A'</code> lève une erreur, il faut construire une nouvelle chaîne<br>Méthodes courantes : <code>s.upper()</code>/<code>s.lower()</code> (renvoient une nouvelle chaîne, ne modifient pas s), <code>s.split(' ')</code> découpe en liste de mots",
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
