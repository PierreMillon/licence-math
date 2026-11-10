/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/analyse.js
   Fiche ANALYSE — Analyse 2, L1 mathématiques,
   INU Champollion (limites, continuité, dérivation, fonctions
   usuelles, développements limités, intégration, primitives).
   QCM à 3 réponses, formules en LaTeX typesetées avec KaTeX.

   §8 (SUITES) et §9 (SÉRIES NUMÉRIQUES) ajoutées le 09/09/2026,
   demande explicite — sujet absent des §1-7 d'origine (écrites de
   mémoire, avant l'adoption de la méthode "extraire d'un vrai
   document", voir CLAUDE.md). Sources : 4 fichiers du dossier Math du
   Drive, partagés par Gaël (gaelboury@gmail.com, le tuteur de Pierre) :
   « Analyse - Suites small.pdf » et « Analyse - Suites récurrence
   échelle.pdf »/« ...Pour l'hérédité.pdf » sont des scans manuscrits
   à l'OCR très dégradé (illisibles en l'état) — utilisés seulement
   pour confirmer les notions attendues (suites majorées/minorées/
   bornées, suites adjacentes, théorème du point fixe), pas comme
   source de texte. La vraie source structurée est « Analyse - Séries
   fiche mémo.pdf » (Université Claude Bernard Lyon 1, fiche mémo
   « Convergence de suites et séries numériques », 17 théorèmes + 2
   définitions numérotés) — même logique que le mémento d'ALGÈBRE
   (chapitre I) : un théorème numéroté = une question de cours.
   Récurrence (la TECHNIQUE de preuve elle-même, initialisation/
   hérédité) déjà couverte dans LOGIQUE §recurrence — pas dupliquée
   ici, seuls les théorèmes propres aux suites/séries sont repris.

   4 nouvelles sections §1-4 ajoutées le 21/10/2026 (demande explicite
   « fais une compilation de tous les exercices/TD/cours et mets en
   place les bonnes fiches, questions ciblées, micro-trucs par cœur »),
   décalant les anciennes §1-9 en §5-13 (simple renumérotation des
   titres affichés, aucun id d'exercice touché). Sources réelles,
   dossier Drive partagé par le prof (cours daté du 12/10/2026 et TD
   datés du 19/10/2026, plus un CC1 du 3/11/2025 réutilisé comme
   référence) :
   - « cours analyse L1 p1-9 12 10 26 moodle.pdf » (A. CHARRON, INU
     Champollion) — Partie 1 « Fonctions de référence » : intervalles
     de ℝ, propriétés de la relation d'ordre (composition avec une
     fonction monotone, piège ℝ* pas un intervalle), partie entière,
     valeur absolue, croissances comparées exp/ln/puissances réelles.
   - « Analyse_1_td-1_avec_correction_vdef.pdf » (TD1, Inégalités) et
     « TD2_Analyse1_2026_corrigé.pdf » (TD2, Inégalités/valeur absolue/
     partie entière) — méthodes de résolution (tableau de signes,
     ne jamais multiplier par un dénominateur de signe inconnu, vérifier
     le signe avant d'élever au carré, symétrie x↔-x, encadrements).
   - « Epreuve_CC1_analyse 3 novembre 2025-2026.pdf » (énoncé seul, la
     correction manuscrite n'a pas de calque texte exploitable) —
     source de l'exemple \\(5^x=5x\\) (changement de variable, croissances
     comparées) et de l'astuce de symétrie sur \\(|x^2-4|-|3x|<0\\).
   §1-4 restent `§` par cohérence avec le reste du site (un numéro de
   section = un repère pour l'élève, pas un sommaire de cours figé) —
   seule la FICHE change de numérotation, pas le cours réel de Pierre. */

const EXERCISES = [
  // ---------- §1 — Intervalles, inégalités ----------
  {
    id: 'ex43', section: 'intervalles-inegalites',
    statement: 'Une partie \\(I\\) de \\(\\mathbb{R}\\) est un intervalle si :',
    options: [
      'Pour tous \\(x,y \\in I\\) avec \\(x \\leq y\\), tout \\(z\\) tel que \\(x \\leq z \\leq y\\) est aussi dans \\(I\\)',
      '\\(I\\) contient au moins deux éléments distincts',
      '\\(I\\) est fini ou égal à \\(\\mathbb{R}\\)',
    ],
    correctIndex: 0,
    explain: 'C’est la définition même d’un intervalle : aucun « trou » n’est permis entre deux éléments de \\(I\\).',
    wrongExplain: {
      1: 'Un intervalle comme \\([3,3]=\\{3\\}\\) n’a qu’un seul élément — avoir au moins deux éléments n’est pas une condition nécessaire.',
      2: 'Des intervalles bornés non réduits à un point, comme \\([0,1]\\), sont infinis et différents de \\(\\mathbb{R}\\) tout entier — cette option exclut la plupart des vrais intervalles.',
    },
  },
  {
    id: 'ex44', section: 'intervalles-inegalites',
    statement: 'Selon le cours, quel est l’ordre correct d’inclusion des ensembles de nombres ?',
    options: [
      '\\(\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}\\)',
      '\\(\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{D} \\subset \\mathbb{R} \\subset \\mathbb{C}\\)',
      '\\(\\mathbb{Z} \\subset \\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{D} \\subset \\mathbb{C}\\)',
    ],
    correctIndex: 0,
    explain: '\\(\\mathbb{D}\\) (les décimaux, de la forme \\(k/10^n\\)) se place entre les entiers et les rationnels : tout décimal est rationnel, mais pas l’inverse (ex. \\(1/3\\)).',
    wrongExplain: {
      1: '\\(\\mathbb{D}\\) (décimaux) est inclus dans \\(\\mathbb{Q}\\) (rationnels), pas l’inverse — \\(1/3\\) est rationnel mais n’est pas décimal (écriture infinie non périodique de 10).',
      2: '\\(\\mathbb{N}\\) (entiers naturels, positifs) est inclus dans \\(\\mathbb{Z}\\) (entiers relatifs), pas l’inverse — \\(-5 \\in \\mathbb{Z}\\) mais \\(-5 \\notin \\mathbb{N}\\).',
    },
  },
  {
    id: 'ex45', section: 'intervalles-inegalites',
    statement: 'D’après le cours, l’assertion \\(A \\leq B\\) équivaut à :',
    options: ['\\(A - B \\leq 0\\)', '\\(A/B \\leq 1\\)', '\\(B - A \\leq A\\)'],
    correctIndex: 0,
    explain: 'Réflexe de base pour manipuler une inégalité : la ramener à une comparaison avec 0 en étudiant le signe de la différence.',
    wrongExplain: {
      1: 'Diviser par \\(B\\) suppose de connaître son signe (sinon le sens de l’inégalité peut s’inverser) — ce n’est pas une équivalence valable en général, contrairement à la soustraction.',
      2: 'Cette expression n’est pas équivalente à \\(A \\leq B\\) — ce n’est pas une reformulation valide de l’inégalité de départ.',
    },
  },
  {
    id: 'ex46', section: 'intervalles-inegalites',
    statement: 'Si \\(f\\) est strictement croissante sur un intervalle \\(I\\) et \\(a,b \\in I\\), alors \\(a&lt;b\\) équivaut à :',
    options: ['\\(f(a)&lt;f(b)\\)', '\\(f(a)&gt;f(b)\\)', '\\(f(a)=f(b)\\)'],
    correctIndex: 0,
    explain: 'Composer une inégalité stricte par une fonction strictement croissante CONSERVE son sens — c’est une équivalence, pas seulement une implication.',
    wrongExplain: {
      1: 'C’est le cas d’une fonction strictement DÉCROISSANTE, qui inverse le sens de l’inégalité — pas une fonction croissante.',
      2: 'Une fonction strictement croissante ne peut jamais donner deux images égales pour deux antécédents distincts — ce serait contredire la stricte croissance elle-même.',
    },
  },
  {
    id: 'ex47', section: 'intervalles-inegalites',
    statement: 'Si \\(f\\) est strictement décroissante sur \\(I\\) et \\(a,b \\in I\\), alors \\(a&lt;b\\) équivaut à :',
    options: ['\\(f(a)&gt;f(b)\\)', '\\(f(a)&lt;f(b)\\)', '\\(f(a) \\leq f(b)\\)'],
    correctIndex: 0,
    explain: 'Une fonction strictement décroissante INVERSE le sens de l’inégalité stricte.',
    wrongExplain: {
      1: 'C’est le cas d’une fonction CROISSANTE — une fonction décroissante inverse le sens, elle ne le conserve pas.',
      2: 'L’inégalité large ne traduit pas la stricte décroissance : avec \\(a&lt;b\\) strict et \\(f\\) strictement décroissante, on obtient \\(f(a)&gt;f(b)\\) strict aussi.',
    },
  },
  {
    id: 'ex48', section: 'intervalles-inegalites',
    statement: 'Pour \\(a,b \\in \\mathbb{R}^*\\), peut-on toujours déduire \\(a&lt;b \\Rightarrow \\dfrac{1}{a}&gt;\\dfrac{1}{b}\\) (fonction inverse strictement décroissante) ?',
    options: [
      'Non : \\(\\mathbb{R}^*\\) n’est PAS un intervalle, la règle ne s’applique que si \\(a,b\\) sont de même signe',
      'Oui, toujours, car l’inverse est strictement décroissante sur \\(\\mathbb{R}^*\\)',
      'Non, car l’inverse n’est pas monotone sur \\(\\mathbb{R}^*\\)',
    ],
    correctIndex: 0,
    explain: 'Piège classique : \\(-2&lt;3\\) mais \\(-1/2&lt;1/3\\) (pas \\(&gt;\\)) — la règle de composition par une fonction monotone exige un INTERVALLE, et \\(\\mathbb{R}^*=\\mathbb{R}\\setminus\\{0\\}\\) n’en est pas un (il « saute » 0).',
    wrongExplain: {
      1: 'C’est faux dès que \\(a\\) et \\(b\\) sont de signes opposés (ex. \\(a=-2,b=3\\)) : la fonction inverse est bien décroissante SUR CHAQUE intervalle \\(\\mathbb{R}_-^*\\) et \\(\\mathbb{R}_+^*\\) séparément, mais \\(\\mathbb{R}^*\\) tout entier n’est pas un intervalle.',
      2: 'L’inverse EST monotone (strictement décroissante) sur chacun des deux intervalles \\(\\mathbb{R}_-^*\\) et \\(\\mathbb{R}_+^*\\) — le problème n’est pas l’absence de monotonie, mais le fait que \\(\\mathbb{R}^*\\) n’est pas un intervalle unique.',
    },
  },
  {
    id: 'ex49', section: 'intervalles-inegalites',
    statement: 'Pour \\(a,b\\geq0\\) et \\(c,d&gt;0\\), le produit en croix donne :',
    options: [
      '\\(\\dfrac{a}{c}&lt;\\dfrac{b}{d} \\Leftrightarrow ad&lt;bc\\)',
      '\\(\\dfrac{a}{c}&lt;\\dfrac{b}{d} \\Leftrightarrow ac&lt;bd\\)',
      '\\(\\dfrac{a}{c}&lt;\\dfrac{b}{d} \\Leftrightarrow a&lt;b\\) et \\(c&lt;d\\)',
    ],
    correctIndex: 0,
    explain: 'Le produit en croix compare le produit du numérateur de gauche par le dénominateur de droite, et inversement — valide ici car \\(c,d&gt;0\\) (multiplier par des quantités positives conserve le sens).',
    wrongExplain: {
      1: 'Ce n’est pas le produit EN CROIX : cette expression multiplie les numérateurs entre eux et les dénominateurs entre eux, ce qui ne correspond à aucune règle de comparaison de fractions.',
      2: 'Cette option confond deux conditions séparées sur \\(a,b\\) et sur \\(c,d\\) avec la comparaison du quotient global, qui est une opération différente.',
    },
  },
  {
    id: 'ex50', section: 'intervalles-inegalites',
    statement: 'Pour \\(a,b\\geq0\\), \\(a&lt;b\\) équivaut à :',
    options: ['\\(\\sqrt{a}&lt;\\sqrt{b}\\)', '\\(\\sqrt{a}&gt;\\sqrt{b}\\)', '\\(a^2&lt;b^2\\) seulement si \\(a,b\\leq0\\)'],
    correctIndex: 0,
    explain: 'La fonction racine carrée est strictement croissante sur \\(\\mathbb{R}_+\\) (un intervalle) : composer par elle conserve le sens de l’inégalité.',
    wrongExplain: {
      1: 'La racine carrée est CROISSANTE, pas décroissante : elle conserve le sens de l’inégalité, elle ne l’inverse pas.',
      2: 'La condition porte sur \\(a,b\\geq0\\) dans l’énoncé, pas sur \\(a,b\\leq0\\) — cette option ne correspond pas aux hypothèses données.',
    },
  },

  // ---------- §2 — Partie entière et valeur absolue ----------
  {
    id: 'ex51', section: 'partie-entiere-valeur-absolue',
    statement: 'D’après le théorème du cours, pour tout réel \\(x\\), la partie entière \\(E(x)\\) est :',
    options: [
      'L’unique entier \\(n\\) tel que \\(n \\leq x &lt; n+1\\)',
      'L’entier le plus proche de \\(x\\)',
      'Le nombre de chiffres avant la virgule de \\(x\\)',
    ],
    correctIndex: 0,
    explain: 'C’est la définition exacte (et l’existence/unicité est un théorème du cours) — ne pas confondre avec un arrondi.',
    wrongExplain: {
      1: 'L’arrondi au plus proche peut dépasser \\(x\\) (ex. arrondir \\(2.7\\) donne \\(3&gt;2.7\\)) — la partie entière, elle, est toujours \\(\\leq x\\), jamais au-dessus.',
      2: 'Cette description ne fonctionne même pas pour des nombres négatifs ou non-entiers (ex. \\(E(0.5)\\)) — ce n’est pas la définition mathématique.',
    },
  },
  {
    id: 'ex52', section: 'partie-entiere-valeur-absolue',
    statement: 'La fonction partie entière \\(E\\) est, selon le cours :',
    options: ['Croissante sur \\(\\mathbb{R}\\)', 'Strictement croissante sur \\(\\mathbb{R}\\)', 'Décroissante sur \\(\\mathbb{R}\\)'],
    correctIndex: 0,
    explain: '\\(E\\) est croissante (large) mais PAS strictement : \\(E(0.2)=E(0.8)=0\\) alors que \\(0.2&lt;0.8\\).',
    wrongExplain: {
      1: 'Elle n’est pas STRICTEMENT croissante : deux réels différents dans le même intervalle \\([n,n+1[\\) ont la même partie entière (ex. \\(E(0.2)=E(0.8)=0\\)).',
      2: '\\(E\\) ne redescend jamais quand \\(x\\) augmente — c’est une fonction croissante (en escalier), pas décroissante.',
    },
  },
  {
    id: 'ex53', section: 'partie-entiere-valeur-absolue',
    statement: 'Que vaut \\(E(-0.5)\\) ?',
    options: ['\\(-1\\)', '\\(0\\)', '\\(-0.5\\)'],
    correctIndex: 0,
    explain: '\\(E(-0.5)\\) est l’unique entier \\(n\\) tel que \\(n\\leq-0.5&lt;n+1\\) : c’est \\(n=-1\\) (car \\(-1\\leq-0.5&lt;0\\)), PAS \\(0\\) — piège classique pour les réels négatifs non entiers.',
    wrongExplain: {
      1: 'Piège classique : \\(0\\leq-0.5\\) est FAUX, donc \\(0\\) ne convient pas — la partie entière « tronque vers le bas », pas vers 0 (différent d’une troncature informatique).',
      2: 'La partie entière est toujours un ENTIER, par définition — \\(-0.5\\) lui-même ne peut pas être la réponse.',
    },
  },
  {
    id: 'ex54', section: 'partie-entiere-valeur-absolue',
    statement: 'Pour tout \\(x \\in \\mathbb{R}\\), \\(|x|\\) est égal à :',
    options: ['\\(\\sqrt{x^2}\\)', '\\(x^2\\)', '\\(-x\\)'],
    correctIndex: 0,
    explain: 'Formule utile en calcul algébrique : la racine carrée d’un carré redonne la valeur absolue, pas le nombre lui-même (qui pourrait être négatif).',
    wrongExplain: {
      1: '\\(x^2\\) n’est pas égal à \\(|x|\\) en général (ex. \\(x=3\\) : \\(x^2=9\\neq3=|x|\\)) — confondre les deux est une erreur fréquente.',
      2: '\\(-x\\) ne vaut \\(|x|\\) que si \\(x\\leq0\\) — pour \\(x&gt;0\\), \\(|x|=x\\), pas \\(-x\\).',
    },
  },
  {
    id: 'ex55', section: 'partie-entiere-valeur-absolue',
    statement: 'Pour \\(\\lambda,x \\in \\mathbb{R}\\), \\(|\\lambda x|\\) est égal à :',
    options: ['\\(|\\lambda|\\,|x|\\)', '\\(\\lambda|x|\\)', '\\(|\\lambda+x|\\)'],
    correctIndex: 0,
    explain: 'La valeur absolue est multiplicative : \\(|\\lambda x|=|\\lambda||x|\\) — cas particulier \\(\\lambda=-1\\) : \\(|-x|=|x|\\).',
    wrongExplain: {
      1: 'Si \\(\\lambda&lt;0\\), \\(\\lambda|x|\\) serait négatif alors qu’une valeur absolue est toujours \\(\\geq0\\) — il faut \\(|\\lambda|\\), pas \\(\\lambda\\) lui-même.',
      2: '\\(|\\lambda+x|\\) est la valeur absolue d’une SOMME, pas d’un produit \\(\\lambda x\\) — ce sont deux expressions différentes.',
    },
  },
  {
    id: 'ex56', section: 'partie-entiere-valeur-absolue',
    statement: 'Pour tout \\(x \\in \\mathbb{R}\\), laquelle de ces affirmations est toujours vraie ?',
    options: ['\\(|x| \\geq x\\)', '\\(|x| = x\\)', '\\(|x| &lt; x\\)'],
    correctIndex: 0,
    explain: 'Si \\(x\\geq0\\), \\(|x|=x\\) ; si \\(x&lt;0\\), \\(|x|=-x&gt;x\\). Dans les deux cas \\(|x|\\geq x\\), avec égalité seulement si \\(x\\geq0\\).',
    wrongExplain: {
      1: 'Ce n’est vrai que si \\(x\\geq0\\) — pour \\(x&lt;0\\) (ex. \\(x=-3\\)), \\(|x|=3\\neq-3=x\\).',
      2: '\\(|x|\\) ne peut jamais être STRICTEMENT inférieur à \\(x\\) — au pire ils sont égaux (si \\(x\\geq0\\)).',
    },
  },
  {
    id: 'ex57', section: 'partie-entiere-valeur-absolue',
    statement: 'L’inégalité triangulaire \\(|x+y|\\leq|x|+|y|\\) est une égalité si et seulement si :',
    options: ['\\(xy \\geq 0\\) (x et y de même signe, ou l’un des deux nul)', '\\(x=y\\)', '\\(x+y=0\\)'],
    correctIndex: 0,
    explain: 'La preuve (en comparant les carrés) montre que l’écart entre les deux membres vaut \\(2(|xy|-xy)\\), nul exactement quand \\(xy\\geq0\\).',
    wrongExplain: {
      1: '\\(x=y\\) est un cas particulier où \\(xy=x^2\\geq0\\) (égalité a bien lieu), mais ce n’est pas la seule possibilité — ex. \\(x=1,y=2\\) donne aussi l’égalité sans que \\(x=y\\).',
      2: '\\(x+y=0\\) correspond à \\(y=-x\\), donc \\(xy=-x^2\\leq0\\) : c’est au contraire un cas où l’inégalité est généralement STRICTE (sauf si \\(x=y=0\\)).',
    },
  },
  {
    id: 'ex58', section: 'partie-entiere-valeur-absolue',
    statement: 'De l’inégalité triangulaire, on déduit la deuxième inégalité triangulaire :',
    options: ['\\(\\big||x|-|y|\\big|\\leq|x+y|\\)', '\\(|x|+|y|\\leq|x+y|\\)', '\\(|x-y|\\geq|x|+|y|\\)'],
    correctIndex: 0,
    explain: 'Obtenue en appliquant l’inégalité triangulaire à \\(x=(x+y)-y\\) : \\(|x|\\leq|x+y|+|y|\\), puis en réarrangeant.',
    wrongExplain: {
      1: 'C’est l’inégalité triangulaire INVERSÉE — la vraie inégalité triangulaire est \\(|x+y|\\leq|x|+|y|\\), pas l’inverse.',
      2: 'Cette direction contredit l’inégalité triangulaire habituelle — une somme ne peut pas avoir un module plus grand que celui obtenu en additionnant les deux modules.',
    },
  },
  {
    id: 'ex59', section: 'partie-entiere-valeur-absolue',
    statement: 'Pour \\(R&gt;0\\), l’inéquation \\(|u|&gt;R\\) équivaut à :',
    options: ['\\(u&gt;R\\) ou \\(u&lt;-R\\)', '\\(-R&lt;u&lt;R\\)', '\\(u&gt;R\\) et \\(u&lt;-R\\)'],
    correctIndex: 0,
    explain: '« Au-delà de R dans un sens ou dans l’autre » se traduit par un OU (réunion de deux demi-droites), pas par un ET.',
    wrongExplain: {
      1: 'C’est la solution de \\(|u|&lt;R\\) (strictement À L’INTÉRIEUR de l’intervalle), l’inégalité opposée à celle posée ici.',
      2: 'Aucun nombre ne peut vérifier \\(u&gt;R\\) ET \\(u&lt;-R\\) simultanément (puisque \\(R&gt;0\\)) — ce serait l’ensemble vide, pas la bonne réponse.',
    },
  },
  {
    id: 'ex60', section: 'partie-entiere-valeur-absolue',
    statement: 'Pour \\(x,y \\in \\mathbb{R}\\), a-t-on toujours \\(E(x+y)=E(x)+E(y)\\) ?',
    options: [
      'Non — contre-exemple : \\(x=0.6,y=0.7\\) donnent \\(E(x)+E(y)=0\\) mais \\(E(x+y)=E(1.3)=1\\)',
      'Oui, toujours',
      'Non, car \\(E(x+y)\\) est toujours strictement inférieur à \\(E(x)+E(y)\\)',
    ],
    correctIndex: 0,
    explain: 'On a seulement l’encadrement \\(E(x)+E(y)\\leq E(x+y)\\leq E(x)+E(y)+1\\) — l’égalité n’est pas garantie, à cause des parties décimales qui peuvent « se cumuler » pour dépasser 1.',
    wrongExplain: {
      1: 'Le contre-exemple \\(x=0.6,y=0.7\\) suffit à invalider cette égalité générale — ce n’est vrai que dans certains cas particuliers.',
      2: 'C’est l’inverse qui est vrai : \\(E(x+y)\\) est toujours SUPÉRIEUR OU ÉGAL à \\(E(x)+E(y)\\), jamais strictement inférieur.',
    },
  },

  // ---------- §3 — Croissances comparées, puissances réelles ----------
  {
    id: 'ex61', section: 'croissances-comparees',
    statement: 'Selon le cours, \\(\\lim_{x\\to-\\infty}e^x\\) et \\(\\lim_{x\\to+\\infty}e^x\\) valent respectivement :',
    options: ['\\(0\\) et \\(+\\infty\\)', '\\(-\\infty\\) et \\(+\\infty\\)', '\\(1\\) et \\(+\\infty\\)'],
    correctIndex: 0,
    explain: 'L’exponentielle tend vers 0 (sans jamais l’atteindre) en \\(-\\infty\\), et vers \\(+\\infty\\) en \\(+\\infty\\).',
    wrongExplain: {
      1: '\\(e^x\\) est TOUJOURS strictement positive, elle ne peut jamais tendre vers \\(-\\infty\\) — c’est \\(0\\) la bonne limite en \\(-\\infty\\).',
      2: '\\(e^0=1\\), mais ce n’est pas la limite en \\(-\\infty\\) : la limite en \\(-\\infty\\) est \\(0\\), pas la valeur prise en \\(x=0\\).',
    },
  },
  {
    id: 'ex62', section: 'croissances-comparees',
    statement: 'Pour tout \\(n\\in\\mathbb{Z}\\), \\(\\lim_{x\\to+\\infty}x^n e^{-x}\\) vaut :',
    options: ['\\(0\\)', '\\(+\\infty\\)', '\\(1\\)'],
    correctIndex: 0,
    explain: 'C’est la croissance comparée de base : l’exponentielle (ici \\(e^{-x}\\to0\\) très vite) l’emporte toujours sur n’importe quelle puissance de \\(x\\).',
    wrongExplain: {
      1: 'C’est le cas de \\(x^n/e^{-x}=x^ne^x\\), pas de \\(x^ne^{-x}\\) — ici l’exponentielle décroissante écrase la puissance, le résultat tend vers 0, pas vers l’infini.',
      2: 'La limite n’est pas une constante non nulle : \\(e^{-x}\\) décroît strictement plus vite que \\(x^n\\) ne croît, donc le produit tend vers \\(0\\), pas vers \\(1\\).',
    },
  },
  {
    id: 'ex63', section: 'croissances-comparees',
    statement: 'Pour tout \\(n\\in\\mathbb{N}^*\\), \\(\\lim_{x\\to+\\infty}\\dfrac{\\ln x}{x^n}\\) vaut :',
    options: ['\\(0\\)', '\\(+\\infty\\)', '\\(1\\)'],
    correctIndex: 0,
    explain: 'Croissance comparée : n’importe quelle puissance positive de \\(x\\) l’emporte sur \\(\\ln x\\) en \\(+\\infty\\).',
    wrongExplain: {
      1: 'C’est l’inverse, \\(x^n/\\ln x\\), qui tend vers \\(+\\infty\\) — ici c’est \\(\\ln x\\) au numérateur, qui est dominé par \\(x^n\\), donc le quotient tend vers \\(0\\).',
      2: 'Le numérateur \\(\\ln x\\) et le dénominateur \\(x^n\\) ne croissent pas à la même vitesse : \\(x^n\\) l’emporte largement, le quotient ne se stabilise pas à une constante non nulle.',
    },
  },
  {
    id: 'ex64', section: 'croissances-comparees',
    statement: 'Pour tout \\(n\\in\\mathbb{N}^*\\), \\(\\lim_{x\\to0^+}x^n\\ln x\\) vaut :',
    options: ['\\(0\\)', '\\(-\\infty\\)', '\\(1\\)'],
    correctIndex: 0,
    explain: 'Bien que \\(\\ln x\\to-\\infty\\) en \\(0^+\\), le facteur \\(x^n\\to0\\) l’emporte : le produit tend vers \\(0\\) (croissance comparée, version « près de 0 »).',
    wrongExplain: {
      1: 'C’est la limite de \\(\\ln x\\) SEUL en \\(0^+\\) — mais ici il est multiplié par \\(x^n\\to0\\), qui « rattrape » cette divergence et ramène le produit à \\(0\\).',
      2: 'Rien ne justifie une limite finie non nulle : le produit d’un terme qui tend vers 0 et d’un terme qui diverge (lentement) tend vers \\(0\\) ici, pas vers une constante.',
    },
  },
  {
    id: 'ex65', section: 'croissances-comparees',
    statement: 'La fonction logarithme décimal \\(\\log\\) est définie par :',
    options: ['\\(\\log(x)=\\dfrac{\\ln x}{\\ln 10}\\)', '\\(\\log(x)=\\ln(10x)\\)', '\\(\\log(x)=10\\ln x\\)'],
    correctIndex: 0,
    explain: 'Le logarithme décimal est le logarithme népérien divisé par \\(\\ln 10\\) — un simple changement d’échelle, utile en sciences (pH, décibels...).',
    wrongExplain: {
      1: 'Cette expression correspond à \\(\\ln(10)+\\ln(x)\\) (propriété du log d’un produit), pas à une division par \\(\\ln10\\) — ce n’est pas la bonne formule.',
      2: 'Multiplier \\(\\ln x\\) par \\(10\\) (au lieu de diviser par \\(\\ln10\\)) ne donne pas la bonne échelle : \\(\\log(10)\\) devrait valoir \\(1\\), pas \\(10\\ln(10)\\approx23\\).',
    },
  },
  {
    id: 'ex66', section: 'croissances-comparees',
    statement: 'Pour \\(a&gt;0\\) et \\(x\\in\\mathbb{R}\\), on définit (et on note) \\(a^x\\) par :',
    options: ['\\(e^{x\\ln a}\\)', '\\(x^a\\)', '\\(e^{a\\ln x}\\)'],
    correctIndex: 0,
    explain: 'Cette définition permet d’étudier \\(a^x\\) (exposant réel quelconque) à l’aide des propriétés déjà connues de la fonction exponentielle usuelle.',
    wrongExplain: {
      1: '\\(x^a\\) est une fonction PUISSANCE (base variable, exposant fixé \\(a\\)) — c’est l’inverse de \\(a^x\\) (base fixée \\(a\\), exposant variable \\(x\\)).',
      2: 'Cette expression échange les rôles de \\(a\\) et \\(x\\) par rapport à la bonne définition — c’est \\(x\\ln a\\) qu’il faut mettre en exposant, pas \\(a\\ln x\\).',
    },
  },
  {
    id: 'ex67', section: 'croissances-comparees',
    statement: 'Pour \\(a&gt;1\\), \\(\\lim_{x\\to+\\infty}a^x\\) et \\(\\lim_{x\\to-\\infty}a^x\\) valent respectivement :',
    options: ['\\(+\\infty\\) et \\(0\\)', '\\(0\\) et \\(+\\infty\\)', '\\(+\\infty\\) et \\(+\\infty\\)'],
    correctIndex: 0,
    explain: 'Pour une base \\(a&gt;1\\), \\(a^x=e^{x\\ln a}\\) avec \\(\\ln a&gt;0\\) : on retrouve exactement le comportement de l’exponentielle usuelle (croissante, tend vers \\(+\\infty\\) puis \\(0\\)).',
    wrongExplain: {
      1: 'C’est le comportement pour \\(0&lt;a&lt;1\\) (base entre 0 et 1), pas pour \\(a&gt;1\\) — ne pas confondre les deux cas, qui sont inversés l’un de l’autre.',
      2: '\\(a^x\\) ne peut pas tendre vers \\(+\\infty\\) des DEUX côtés — en \\(-\\infty\\), avec \\(a&gt;1\\), \\(a^x\\) tend au contraire vers \\(0\\).',
    },
  },
  {
    id: 'ex68', section: 'croissances-comparees',
    statement: 'Pour \\(\\alpha\\in\\mathbb{R}\\), la fonction puissance \\(f(x)=x^\\alpha\\) (définie sur \\(\\mathbb{R}_+^*\\)) est dérivable, avec :',
    options: ['\\(f\'(x)=\\alpha x^{\\alpha-1}\\)', '\\(f\'(x)=\\alpha^x\\ln\\alpha\\)', '\\(f\'(x)=x^{\\alpha-1}\\)'],
    correctIndex: 0,
    explain: 'La formule de dérivation des puissances entières \\((x^n)\'=nx^{n-1}\\) se généralise EXACTEMENT aux exposants réels \\(\\alpha\\) quelconques.',
    wrongExplain: {
      1: 'Cette formule est celle de la dérivée d’une exponentielle de base \\(\\alpha\\) (\\(\\alpha^x\\)), pas d’une fonction puissance \\(x^\\alpha\\) — base et exposant sont inversés par rapport à la bonne fonction.',
      2: 'Il manque le facteur \\(\\alpha\\) devant : la dérivation d’une puissance multiplie TOUJOURS par l’exposant d’origine, même réel.',
    },
  },
  {
    id: 'ex69', section: 'croissances-comparees',
    statement: 'Pour la fonction puissance \\(f:x\\mapsto x^\\alpha\\) sur \\(\\mathbb{R}_+^*\\), si \\(\\alpha&lt;0\\) alors \\(f\\) est :',
    options: ['Strictement décroissante', 'Strictement croissante', 'Constante'],
    correctIndex: 0,
    explain: '\\(f\'(x)=\\alpha x^{\\alpha-1}\\) est alors strictement négative (car \\(\\alpha&lt;0\\) et \\(x^{\\alpha-1}&gt;0\\)) : \\(f\\) décroît strictement.',
    wrongExplain: {
      1: 'C’est le cas \\(\\alpha&gt;0\\) qui donne une fonction strictement croissante — pour \\(\\alpha&lt;0\\), le signe de la dérivée s’inverse.',
      2: 'C’est le cas particulier \\(\\alpha=0\\) (fonction constante égale à 1) — ici \\(\\alpha&lt;0\\), la fonction varie bel et bien, elle décroît.',
    },
  },
  {
    id: 'ex70', section: 'croissances-comparees',
    statement: 'Où est l’erreur dans ce « calcul » : \\(-1=(-1)^1=\\big((-1)^2\\big)^{1/2}=1^{1/2}=1\\) ?',
    options: [
      'La règle \\((a^m)^n=a^{mn}\\) avec des exposants réels n’est valable que pour \\(a&gt;0\\) : appliquer une puissance \\(1/2\\) à une expression issue d’une base négative n’est pas légitime',
      'Il n’y a aucune erreur, \\(-1=1\\) est correct ici',
      'L’erreur est que \\((-1)^2\\) ne vaut pas 1',
    ],
    correctIndex: 0,
    explain: 'La fonction puissance réelle \\(x\\mapsto x^\\alpha\\) n’est définie que pour \\(x&gt;0\\) : appliquer \\((a^m)^n=a^{mn}\\) en partant d’une base négative comme \\(-1\\) est invalide, l’identité ne généralise pas aux exposants réels avec base négative.',
    wrongExplain: {
      1: 'Le résultat \\(-1=1\\) est évidemment faux (ce sont deux nombres distincts) — il y a bien une erreur de raisonnement quelque part dans la chaîne d’égalités.',
      2: '\\((-1)^2=1\\) est parfaitement correct (c’est juste une puissance ENTIÈRE, toujours valable) — l’erreur se situe plus loin, en traitant cette expression comme une puissance réelle \\((\\cdots)^{1/2}\\).',
    },
  },

  // ---------- §4 — Méthodes : résoudre des inéquations ----------
  {
    id: 'ex71', section: 'methodes-inequations',
    statement: 'Pour résoudre \\(x^2-3x+1\\geq0\\), la méthode standard (TD) consiste à :',
    options: [
      'Calculer \\(\\Delta\\), trouver les racines, puis étudier le signe du trinôme via le signe de \\(a\\) à l’extérieur/l’intérieur des racines',
      'Isoler \\(x\\) d’un côté de l’inégalité comme pour une équation affine',
      'Remplacer \\(x\\) par \\(0\\) pour deviner le signe général',
    ],
    correctIndex: 0,
    explain: 'Un trinôme du second degré se signe grâce à ses racines (quand \\(\\Delta&gt;0\\)) : signe de \\(a\\) à l’extérieur des racines, signe opposé entre les racines.',
    wrongExplain: {
      1: '« Isoler \\(x\\) » ne fonctionne que pour des inégalités AFFINES (degré 1) — dès qu’il y a un \\(x^2\\), cette méthode ne s’applique plus directement.',
      2: 'Remplacer par une seule valeur ne donne le signe qu’EN CE POINT, pas sur tout \\(\\mathbb{R}\\) — un trinôme change de signe aux racines.',
    },
  },
  {
    id: 'ex72', section: 'methodes-inequations',
    statement: 'Pour résoudre \\(\\dfrac{2}{x^2-4x+3}&gt;1\\) (TD), la bonne méthode est de :',
    options: [
      'Tout ramener d’un côté et étudier le signe de \\(\\dfrac{2-(x^2-4x+3)}{x^2-4x+3}\\)',
      'Multiplier directement les deux membres par \\(x^2-4x+3\\)',
      'Multiplier en croix comme pour une égalité de fractions',
    ],
    correctIndex: 0,
    explain: 'Le dénominateur \\(x^2-4x+3\\) change de signe selon \\(x\\) : il faut ramener l’inégalité à une comparaison avec 0 et faire un tableau de signes, jamais multiplier par une expression de signe inconnu.',
    wrongExplain: {
      1: 'Multiplier par une expression dont le signe est INCONNU (ici \\(x^2-4x+3\\), qui change de signe) peut inverser l’inégalité sans qu’on le sache — c’est une erreur classique à éviter.',
      2: 'Le produit en croix n’est valable que pour une ÉGALITÉ de fractions, ou une inégalité avec des dénominateurs de signe connu et positif — pas ici.',
    },
  },
  {
    id: 'ex73', section: 'methodes-inequations',
    statement: 'Pour résoudre \\(\\sqrt{x^2-1}&lt;2-x\\) (TD), avant d’élever au carré, il faut d’abord vérifier que :',
    options: [
      'Le membre de droite \\(2-x\\) est positif (sinon l’inégalité n’a aucune solution, une racine carrée étant toujours \\(\\geq0\\))',
      'Le membre de gauche est positif',
      '\\(x\\) est un entier',
    ],
    correctIndex: 0,
    explain: 'Une racine carrée est toujours \\(\\geq0\\) : si \\(2-x&lt;0\\), l’inégalité \\(\\sqrt{\\cdots}&lt;2-x\\) est automatiquement fausse. Ce n’est qu’après avoir vérifié \\(2-x&gt;0\\) qu’on peut élever au carré en toute sécurité (les deux membres étant alors positifs).',
    wrongExplain: {
      1: 'Le membre de gauche \\(\\sqrt{x^2-1}\\) est TOUJOURS positif ou nul par définition de la racine carrée — ce n’est pas lui qu’il faut vérifier, c’est le membre de droite.',
      2: 'Rien n’impose que \\(x\\) soit entier dans cette inéquation — la condition à vérifier porte sur le SIGNE du second membre, pas sur la nature de \\(x\\).',
    },
  },
  {
    id: 'ex74', section: 'methodes-inequations',
    statement: 'Pour l’inéquation \\((E)\\) : \\(|x^2-4|-|3x|&lt;0\\), pourquoi peut-on affirmer que \\(x\\) est solution si et seulement si \\(-x\\) l’est aussi ?',
    options: [
      'Parce que \\(|(-x)^2-4|=|x^2-4|\\) et \\(|3(-x)|=|3x|\\) : l’expression ne change pas en remplaçant \\(x\\) par \\(-x\\)',
      'Parce que toute inéquation a une solution symétrique par définition',
      'Parce que \\(x^2-4\\) et \\(3x\\) sont tous deux positifs',
    ],
    correctIndex: 0,
    explain: '\\((-x)^2=x^2\\) et \\(|-3x|=|3x|\\) : les deux termes de l’inéquation sont des fonctions PAIRES de \\(x\\), donc toute l’expression l’est aussi — son ensemble de solutions est symétrique par rapport à 0.',
    wrongExplain: {
      1: 'Ce n’est pas une propriété générale de toutes les inéquations — ici, la symétrie vient spécifiquement de la parité des deux termes en valeur absolue, pas d’un principe universel.',
      2: '\\(3x\\) change de signe selon le signe de \\(x\\) (ce n’est pas toujours positif) — c’est justement la valeur absolue \\(|3x|\\) qui est toujours positive, pas \\(3x\\) lui-même.',
    },
  },
  {
    id: 'ex75', section: 'methodes-inequations',
    statement: 'Si \\(-3\\leq x\\leq4\\) et \\(-5\\leq y\\leq2\\), pour encadrer \\(x^2-y^2\\) il faut d’abord encadrer \\(-y^2\\), ce qui demande de :',
    options: [
      'Encadrer \\(y^2\\) d’abord (ici \\(0\\leq y^2\\leq25\\)), PUIS inverser les bornes en changeant de signe pour \\(-y^2\\)',
      'Changer juste le signe de l’encadrement de \\(y\\) directement',
      'Ignorer le signe, \\(-y^2\\) a le même encadrement que \\(y^2\\)',
    ],
    correctIndex: 0,
    explain: 'Passer à l’opposé INVERSE l’ordre des bornes (le signe « retourne » l’inégalité) : de \\(0\\leq y^2\\leq25\\) on déduit \\(-25\\leq-y^2\\leq0\\), pas l’inverse — un piège si on va trop vite.',
    wrongExplain: {
      1: 'On ne peut pas passer directement de l’encadrement de \\(y\\) à celui de \\(-y^2\\) sans passer par \\(y^2\\) d’abord — l’opération \\(y\\mapsto-y^2\\) n’est pas monotone sur \\([-5,2]\\) tout entier (il faut élever au carré séparément).',
      2: 'Prendre l’opposé change bien le signe ET inverse l’ordre des bornes — \\(-y^2\\) n’a pas le même encadrement que \\(y^2\\), ce serait ignorer l’effet du signe moins.',
    },
  },
  {
    id: 'ex76', section: 'methodes-inequations',
    statement: 'Pour encadrer \\(\\dfrac{2x+3y}{x+y}\\) avec \\(x,y&gt;0\\) (TD), la technique consiste à réécrire l’expression sous la forme :',
    options: [
      '\\(2+\\dfrac{y}{x+y}\\), où le second terme est toujours strictement entre 0 et 1',
      '\\(\\dfrac{2x}{x+y}+\\dfrac{3y}{x+y}\\) sans aller plus loin',
      'Une constante unique, l’expression ne dépend pas de \\(x,y\\)',
    ],
    correctIndex: 0,
    explain: 'Réécrire en « constante + reste compris entre 0 et 1 » est une technique puissante : ici \\(\\frac{2x+3y}{x+y}=\\frac{2(x+y)+y}{x+y}=2+\\frac{y}{x+y}\\), et \\(0&lt;\\frac{y}{x+y}&lt;1\\) car \\(0&lt;y&lt;x+y\\) (\\(x,y&gt;0\\)).',
    wrongExplain: {
      1: 'Cette décomposition est correcte mais inachevée : il faut continuer à simplifier (regrouper) pour obtenir une forme « constante + terme borné entre 0 et 1 » exploitable, sinon l’encadrement n’est pas direct.',
      2: 'L’expression dépend bien de \\(x\\) et \\(y\\) (ex. elle vaut \\(2.5\\) si \\(x=y\\), mais tend vers \\(2\\) si \\(y\\ll x\\)) — ce n’est pas une constante fixe.',
    },
  },
  {
    id: 'ex77', section: 'methodes-inequations',
    statement: 'La fonction \\(t\\mapsto 1/t\\) est strictement décroissante sur \\(\\mathbb{R}_-^*\\) et sur \\(\\mathbb{R}_+^*\\) séparément. Peut-on en déduire qu’elle est décroissante sur \\(\\mathbb{R}^*\\) tout entier ?',
    options: [
      'Non : on peut avoir \\(a&lt;0&lt;b\\) avec \\(1/a&lt;0&lt;1/b\\), ce qui n’a rien de décroissant globalement',
      'Oui, la décroissance sur chaque morceau implique la décroissance globale',
      'Oui, car \\(\\mathbb{R}^*\\) est un intervalle',
    ],
    correctIndex: 0,
    explain: 'Exemple du TD : \\(a=-1,b=1\\) donnent \\(a&lt;b\\) mais \\(1/a=-1&lt;1=1/b\\) (pas \\(1/a&gt;1/b\\)) — la monotonie « par morceaux » ne se recolle pas quand l’ensemble de départ n’est pas un intervalle.',
    wrongExplain: {
      1: 'La décroissance sur CHAQUE intervalle séparé ne garantit rien sur le comportement GLOBAL quand on compare un élément de chaque morceau — c’est exactement le piège illustré par le contre-exemple \\(a&lt;0&lt;b\\).',
      2: '\\(\\mathbb{R}^*=\\mathbb{R}\\setminus\\{0\\}\\) n’est PAS un intervalle (il « saute » 0) — c’est précisément pour cette raison que la règle de composition par une fonction monotone ne s’applique pas directement dessus.',
    },
  },
  {
    id: 'ex78', section: 'methodes-inequations',
    statement: 'Pour calculer \\(\\lim_{x\\to+\\infty} x\\cdot5^{1-x}\\) (en écrivant \\(5^{1-x}=e^{(1-x)\\ln5}\\)), le changement de variable \\(X=x\\ln5\\) permet de :',
    options: [
      'Se ramener à une forme connue de croissance comparée (puissance de \\(X\\) fois exponentielle décroissante en \\(X\\)), déjà traitée dans le cours',
      'Transformer l’exponentielle en polynôme',
      'Éviter tout calcul de limite',
    ],
    correctIndex: 0,
    explain: 'Après le changement de variable, l’expression se réécrit avec une exponentielle décroissante multipliée par une puissance de \\(X\\) — exactement la forme \\(X^ne^{-X}\\to0\\) du théorème de croissance comparée, déjà connue.',
    wrongExplain: {
      1: 'Un changement de variable ne transforme jamais une exponentielle en polynôme — ce sont des natures de fonctions fondamentalement différentes, aucune substitution ne change cela.',
      2: 'Le changement de variable sert justement à calculer la limite en la ramenant à un résultat connu — il ne permet pas d’éviter le calcul, il le simplifie.',
    },
  },

  // ---------- §5 — Synthèse (questions combinées, difficulté croissante) ----------
  {
    id: 'ex79', section: 'synthese-prelim',
    statement: 'Soit \\(x&gt;0\\). En utilisant \\(x-1&lt;E(x)\\leq x\\), que vaut \\(\\lim_{x\\to+\\infty}\\dfrac{E(x)}{x}\\) ?',
    options: ['\\(1\\)', '\\(0\\)', '\\(+\\infty\\)'],
    correctIndex: 0,
    explain: 'Diviser l’encadrement par \\(x&gt;0\\) donne \\(1-\\frac{1}{x}&lt;\\frac{E(x)}{x}\\leq1\\) ; les deux bornes tendent vers \\(1\\), donc par le théorème des gendarmes \\(E(x)/x\\to1\\) — la partie entière « colle » à \\(x\\) de plus en plus précisément en proportion.',
    wrongExplain: {
      1: 'La partie entière reste très proche de \\(x\\) lui-même (à moins de 1 d’écart), donc leur RAPPORT tend vers 1, pas vers 0 — ce serait le cas si l’écart grandissait proportionnellement à \\(x\\), ce qui n’est pas le cas ici.',
      2: 'Le rapport \\(E(x)/x\\) est toujours encadré entre deux quantités qui tendent vers 1, donc il ne peut pas diverger vers l’infini — l’encadrement l’en empêche.',
    },
  },
  {
    id: 'ex80', section: 'synthese-prelim',
    statement: 'Soit \\(x\\in\\mathbb{R}\\) vérifiant à la fois \\(E(x)=3\\) et \\(|x-1|\\leq5\\). Quel est l’ensemble des solutions ?',
    options: ['\\([3,4[\\)', '\\([-4,6]\\)', '\\(\\{3\\}\\)'],
    correctIndex: 0,
    explain: '\\(E(x)=3 \\Leftrightarrow x\\in[3,4[\\) ; \\(|x-1|\\leq5 \\Leftrightarrow -4\\leq x\\leq6\\). Comme \\([3,4[\\subset[-4,6]\\), l’intersection des deux conditions est simplement \\([3,4[\\) — la seconde condition est automatiquement vérifiée sur ce domaine, donc sans effet ici.',
    wrongExplain: {
      1: 'C’est l’ensemble donné par la DEUXIÈME condition seule — il faut prendre l’INTERSECTION des deux conditions, pas la plus large des deux.',
      2: '\\(\\{3\\}\\) ne contient qu’un seul point alors que \\(E(x)=3\\) est vérifié par tout un intervalle \\([3,4[\\), pas par \\(x=3\\) seulement.',
    },
  },
  {
    id: 'ex81', section: 'synthese-prelim',
    statement: 'Sachant que \\(xe^{-x}\\to0\\) en \\(+\\infty\\) et que \\(\\ln(xe^{-x})=\\ln x - x\\), que vaut \\(\\lim_{x\\to+\\infty}(\\ln x - x)\\) ?',
    options: ['\\(-\\infty\\)', '\\(0\\)', '\\(+\\infty\\)'],
    correctIndex: 0,
    explain: '\\(\\ln x\\) est négligeable devant \\(x\\) en \\(+\\infty\\) (croissance comparée) : c’est donc le terme \\(-x\\) qui impose le comportement, et \\(\\ln x - x\\to-\\infty\\) — cohérent avec \\(\\ln(xe^{-x})\\to\\ln(0^+)=-\\infty\\) puisque \\(xe^{-x}\\to0^+\\).',
    wrongExplain: {
      1: '\\(\\ln x\\to+\\infty\\) mais BEAUCOUP plus lentement que \\(x\\) — le terme \\(-x\\) l’emporte largement, la différence ne tend donc pas vers 0.',
      2: 'C’est \\(-x\\) qui domine la somme \\(\\ln x - x\\), pas \\(\\ln x\\) — la limite est \\(-\\infty\\), pas \\(+\\infty\\).',
    },
  },
  {
    id: 'ex82', section: 'synthese-prelim',
    statement: 'Pourquoi l’équivalence \\(x&lt;y \\Leftrightarrow x^2&lt;y^2\\) est-elle FAUSSE si \\(x\\) et \\(y\\) peuvent être négatifs ?',
    options: [
      'Parce que \\(x\\mapsto x^2\\) n’est monotone que sur \\(\\mathbb{R}_+\\) (ou sur \\(\\mathbb{R}_-\\)) séparément, pas sur \\(\\mathbb{R}\\) entier — contre-exemple \\(x=-3&lt;y=1\\) mais \\(x^2=9&gt;1=y^2\\)',
      'Parce que le carré d’un réel négatif n’existe pas',
      'Parce que cette équivalence est en fait toujours vraie',
    ],
    correctIndex: 0,
    explain: 'La fonction carré décroît sur \\(\\mathbb{R}_-\\) et croît sur \\(\\mathbb{R}_+\\) : elle n’est pas monotone sur \\(\\mathbb{R}\\) tout entier, donc composer une inégalité par elle n’est valide que si \\(x\\) et \\(y\\) sont de même signe.',
    wrongExplain: {
      1: 'Le carré d’un réel négatif existe parfaitement (ex. \\((-3)^2=9\\)) — ce n’est pas un problème d’existence, mais de MONOTONIE de la fonction carré sur \\(\\mathbb{R}\\) tout entier.',
      2: 'Le contre-exemple \\(x=-3,y=1\\) suffit à montrer que l’équivalence est bien fausse en général — elle n’est valable que sous l’hypothèse supplémentaire \\(x,y\\geq0\\) (ou tous deux \\(\\leq0\\)).',
    },
  },
  {
    id: 'ex83', section: 'synthese-prelim',
    statement: 'Si \\(|x-a|\\leq\\varepsilon\\) et \\(|y-b|\\leq\\eta\\), que peut-on dire de \\(|(x+y)-(a+b)|\\) ?',
    options: [
      '\\(|(x+y)-(a+b)|\\leq\\varepsilon+\\eta\\) (par l’inégalité triangulaire)',
      '\\(|(x+y)-(a+b)|\\leq\\varepsilon\\times\\eta\\)',
      'On ne peut rien dire sans plus d’information',
    ],
    correctIndex: 0,
    explain: '\\((x+y)-(a+b)=(x-a)+(y-b)\\), donc par l’inégalité triangulaire \\(|(x+y)-(a+b)|\\leq|x-a|+|y-b|\\leq\\varepsilon+\\eta\\) — les erreurs d’approximation s’additionnent (au pire).',
    wrongExplain: {
      1: 'Les erreurs d’approximation s’ADDITIONNENT (comme pour toute somme bornée), elles ne se multiplient pas — ce serait une borne beaucoup trop optimiste en général.',
      2: 'L’inégalité triangulaire donne directement une borne explicite et exploitable : \\(\\varepsilon+\\eta\\), pas une impossibilité de conclure.',
    },
  },
  {
    id: 'ex84', section: 'synthese-prelim',
    statement: 'Pour \\(\\alpha&gt;0\\) fixé, sachant que \\(E(x)/x\\to1\\) en \\(+\\infty\\) et que \\(t\\mapsto t^\\alpha\\) est continue en \\(1\\), que vaut \\(\\lim_{x\\to+\\infty}\\left(\\dfrac{E(x)}{x}\\right)^\\alpha\\) ?',
    options: ['\\(1\\)', '\\(0\\)', '\\(\\alpha\\)'],
    correctIndex: 0,
    explain: 'Composer une limite (ici \\(E(x)/x\\to1\\)) par une fonction continue au point limite (ici \\(t\\mapsto t^\\alpha\\) continue en \\(1\\)) donne la limite de la fonction composée : \\(1^\\alpha=1\\).',
    wrongExplain: {
      1: '\\(E(x)/x\\) tend vers \\(1\\), pas vers \\(0\\) — élever une quantité qui tend vers \\(1\\) à une puissance \\(\\alpha\\) donne \\(1^\\alpha=1\\), pas \\(0\\).',
      2: '\\(\\alpha\\) est l’EXPOSANT fixé dans l’énoncé, pas le résultat de la limite — ici la base \\((E(x)/x)\\) tend vers 1, donc toute la limite vaut \\(1^\\alpha=1\\), quel que soit \\(\\alpha\\).',
    },
  },

  // ---------- §13 — Suites : définitions du cours (Charron, partie 3) ----------
  {
    id: 'ex85', section: 'suites-cours',
    statement: 'Une suite \\((u_n)\\) est bornée. Quelle écriture le traduit exactement (propriété I-1 du cours) ?',
    options: [
      '\\(\\exists A&gt;0,\\ \\forall n\\in\\mathbb{N},\\ |u_n|\\leq A\\)',
      '\\(\\forall A&gt;0,\\ \\exists n\\in\\mathbb{N},\\ |u_n|\\leq A\\)',
      '\\(\\forall n\\in\\mathbb{N},\\ \\exists A&gt;0,\\ |u_n|\\leq A\\)',
    ],
    correctIndex: 0,
    explain: 'Le \\(A\\) est choisi EN PREMIER, une fois pour toutes, et doit convenir pour TOUS les \\(n\\) : on choisit la taille de la boîte avant d’y ranger les termes.',
    wrongExplain: {
      1: 'Ici le « il existe \\(n\\) » ne demande qu’UN seul terme petit : \\(u_n=n\\) la vérifie (avec \\(u_0=0\\)) alors qu’elle n’est pas bornée.',
      2: 'Quand \\(n\\) est choisi d’abord, on peut prendre \\(A=|u_n|+1\\) : c’est vrai pour TOUTE suite, bornée ou non. Le \\(A\\) doit passer avant le \\(n\\).',
    },
  },
  {
    id: 'ex86', section: 'suites-cours',
    statement: 'Définition (II-1) : \\((u_n)\\) tend vers \\(\\ell\\) lorsque :',
    options: [
      '\\(\\forall\\varepsilon&gt;0,\\ \\exists n_0,\\ \\forall n\\geq n_0,\\ |u_n-\\ell|\\leq\\varepsilon\\)',
      '\\(\\exists\\varepsilon&gt;0,\\ \\forall n_0,\\ \\exists n\\geq n_0,\\ |u_n-\\ell|\\leq\\varepsilon\\)',
      '\\(\\forall\\varepsilon&gt;0,\\ \\exists n_0,\\ \\exists n\\geq n_0,\\ |u_n-\\ell|\\leq\\varepsilon\\)',
    ],
    correctIndex: 0,
    explain: 'L’adversaire annonce une précision \\(\\varepsilon\\) aussi petite qu’il veut, tu réponds par un rang \\(n_0\\), et à partir de ce rang TOUS les termes restent dans la bande.',
    wrongExplain: {
      1: 'Cette phrase dit seulement qu’une infinité de termes tombent dans une bande fixée : \\((-1)^n\\) la vérifie avec \\(\\ell=1\\), \\(\\varepsilon=1\\) sans converger.',
      2: 'Un seul terme dans la bande après \\(n_0\\) ne suffit pas : il faut \\(\\forall n\\geq n_0\\), c’est-à-dire tous les termes à partir de ce rang.',
    },
  },
  {
    id: 'ex87', section: 'suites-cours',
    statement: 'Pour démontrer que \\((u_n)\\) converge vers \\(\\ell\\) avec la définition, on commence la rédaction par :',
    options: [
      '« Soit \\(\\varepsilon&gt;0\\). Cherchons \\(n_0\\) tel que \\(n\\geq n_0\\Rightarrow|u_n-\\ell|\\leq\\varepsilon\\). »',
      '« Prenons \\(\\varepsilon=0{,}001\\). Cherchons \\(n_0\\) tel que \\(n\\geq n_0\\Rightarrow|u_n-\\ell|\\leq\\varepsilon\\). »',
      '« Soit \\(n_0\\in\\mathbb{N}\\). Cherchons \\(\\varepsilon\\) tel que \\(n\\geq n_0\\Rightarrow|u_n-\\ell|\\leq\\varepsilon\\). »',
    ],
    correctIndex: 0,
    explain: 'La définition commence par « pour tout \\(\\varepsilon\\) » : on prend un \\(\\varepsilon&gt;0\\) QUELCONQUE, sans lui donner de valeur, puis on exprime \\(n_0\\) en fonction de \\(\\varepsilon\\).',
    wrongExplain: {
      1: 'Avec une seule valeur de \\(\\varepsilon\\), tu ne prouves que cette précision-là. Il faut un \\(\\varepsilon\\) quelconque pour couvrir toutes les précisions.',
      2: 'Les quantificateurs sont à l’envers : c’est \\(\\varepsilon\\) qui est donné d’abord, et \\(n_0\\) qui dépend de lui.',
    },
  },
  {
    id: 'ex88', section: 'suites-cours',
    statement: 'Dans ton cours (définition I-3), une suite « stationnaire » est une suite :',
    options: [
      'Constante : \\(u_{n+1}=u_n\\) pour tout \\(n\\)',
      'Convergente',
      'Monotone',
    ],
    correctIndex: 0,
    explain: 'Le cours dit « stationnaire (ou constante) » pour \\(\\forall n,\\ u_{n+1}=u_n\\). L’idée « à partir d’un certain rang » est introduite à part (définitions I-4, pour le sens de variation).',
    wrongExplain: {
      1: 'Convergente et stationnaire sont deux notions différentes : \\(1/n\\) converge sans jamais être constante.',
      2: 'Une suite monotone peut changer à chaque terme (\\(u_n=n\\)) ; stationnaire est bien plus fort : tous les termes sont égaux.',
    },
  },
  {
    id: 'ex89', section: 'suites-cours',
    statement: 'D’après la propriété II-1, \\((u_n)\\) converge vers \\(\\ell\\) si et seulement si :',
    options: [
      '\\(\\lim\\limits_{n\\to+\\infty}|u_n-\\ell|=0\\)',
      '\\(\\lim\\limits_{n\\to+\\infty}|u_n|=|\\ell|\\) seulement',
      '\\(\\lim\\limits_{n\\to+\\infty}(u_n-\\ell)=1\\)',
    ],
    correctIndex: 0,
    explain: 'La distance entre \\(u_n\\) et \\(\\ell\\) tend vers 0 : c’est la définition avec \\(\\varepsilon\\) réécrite en limite.',
    wrongExplain: {
      1: 'Réciproque fausse : \\((-1)^n\\) vérifie \\(|u_n|\\to1\\) sans converger. La valeur absolue perd le signe, donc la limite elle-même.',
      2: 'La distance doit tendre vers 0, pas vers 1 : si \\(u_n-\\ell\\to1\\), alors \\(u_n\\) tend vers \\(\\ell+1\\), pas vers \\(\\ell\\).',
    },
  },
  {
    id: 'ex90', section: 'suites-cours',
    statement: 'Application II-2 : pour \\(u_n=\\dfrac{(-1)^n}{n}\\) (\\(n\\geq1\\)) et \\(\\varepsilon&gt;0\\) donné, quel rang \\(n_0\\) convient pour montrer que \\(u_n\\to0\\) ?',
    options: [
      '\\(n_0\\geq\\dfrac{1}{\\varepsilon}\\)',
      '\\(n_0\\geq\\varepsilon\\)',
      '\\(n_0=1\\) quel que soit \\(\\varepsilon\\)',
    ],
    correctIndex: 0,
    explain: '\\(|u_n|=\\dfrac{1}{n}\\leq\\dfrac{1}{n_0}\\leq\\varepsilon\\) dès que \\(n_0\\geq\\dfrac{1}{\\varepsilon}\\) : plus \\(\\varepsilon\\) est petit, plus le rang est grand.',
    wrongExplain: {
      1: 'Pour \\(\\varepsilon\\) petit, ce rang serait petit, alors que la précision demandée est plus exigeante : \\(n_0\\) doit AUGMENTER quand \\(\\varepsilon\\) diminue.',
      2: 'Avec \\(n_0=1\\), le terme \\(u_1=-1\\) est loin de 0 : un rang fixe ne peut pas convenir à toutes les précisions \\(\\varepsilon\\).',
    },
  },
  {
    id: 'ex91', section: 'suites-cours',
    statement: 'Propriété II-2 : si \\(u_n\\to\\ell_1\\) et \\(u_n\\to\\ell_2\\), alors :',
    options: [
      '\\(\\ell_1=\\ell_2\\) (la limite est unique)',
      '\\(\\ell_1\\leq\\ell_2\\) seulement',
      '\\(\\ell_1\\) et \\(\\ell_2\\) peuvent différer si la suite n’est pas monotone',
    ],
    correctIndex: 0,
    explain: 'Une suite qui converge n’a qu’une seule limite : à partir d’un certain rang elle serait dans deux bandes disjointes sinon.',
    wrongExplain: {
      1: 'L’unicité donne l’égalité, pas une simple inégalité : \\(\\ell_1\\leq\\ell_2\\) laisserait croire qu’il peut y avoir deux limites.',
      2: 'La monotonie n’intervient pas : la limite est unique pour toute suite convergente, monotone ou pas.',
    },
  },
  {
    id: 'ex92', section: 'suites-cours',
    statement: 'Si \\((u_n)\\) est bornée et \\((v_n)\\) converge vers 0, alors \\((u_nv_n)\\) :',
    options: [
      'Converge vers 0',
      'Converge vers \\(\\ell\\times0\\) seulement si \\((u_n)\\) converge aussi',
      'Peut diverger',
    ],
    correctIndex: 0,
    explain: 'Bornée × tend vers 0 donne 0 : \\(|u_nv_n|\\leq A|v_n|\\to0\\). Aucun besoin que \\((u_n)\\) converge (ex. \\((-1)^n/n\\)).',
    wrongExplain: {
      1: 'Le théorème du cours est plus fort : il suffit que \\((u_n)\\) soit bornée, même si elle oscille comme \\((-1)^n\\).',
      2: 'Une suite bornée multipliée par une suite qui tend vers 0 ne peut pas diverger : le produit est majoré en valeur absolue par \\(A|v_n|\\to0\\).',
    },
  },
  {
    id: 'ex93', section: 'suites-cours',
    statement: 'Si \\(u_n\\to0\\) (avec \\(u_n\\neq0\\)), que dit le cours sur \\(\\dfrac{1}{u_n}\\) ?',
    options: [
      'Elle diverge (vers \\(\\pm\\infty\\), ou sans limite)',
      'Elle converge vers 1',
      'Elle tend toujours vers \\(+\\infty\\)',
    ],
    correctIndex: 0,
    explain: 'L’inverse d’une suite qui tend vers 0 devient énorme en valeur absolue, donc ne converge pas. Le signe décide s’il part vers \\(+\\infty\\), \\(-\\infty\\) ou oscille.',
    wrongExplain: {
      1: 'Aucun rapport : pour \\(u_n=1/n\\), \\(1/u_n=n\\) tend vers \\(+\\infty\\), pas vers 1.',
      2: 'Seulement si \\(u_n&gt;0\\). Pour \\(u_n=(-1)^n/n\\), \\(1/u_n=(-1)^nn\\) n’a pas de limite.',
    },
  },
  {
    id: 'ex94', section: 'suites-cours',
    statement: 'D’après le cours (II-6), que dire de \\((x^n)\\) pour \\(x=-2\\) ?',
    options: [
      'Elle n’a pas de limite',
      'Elle tend vers \\(-\\infty\\)',
      'Elle tend vers \\(+\\infty\\)',
    ],
    correctIndex: 0,
    explain: '\\((-2)^n\\) alterne de signe tout en grossissant en valeur absolue : elle n’a ni limite finie ni limite infinie. Pour \\(x&lt;-1\\), « \\(\\lim x^n\\) n’existe pas ».',
    wrongExplain: {
      1: 'Les termes de rang pair sont positifs (\\(4, 16,\\dots\\)) : la suite ne peut pas tendre vers \\(-\\infty\\).',
      2: 'Les termes de rang impair sont négatifs (\\(-2,-8,\\dots\\)) : la suite ne peut pas tendre vers \\(+\\infty\\).',
    },
  },
  {
    id: 'ex95', section: 'suites-cours',
    statement: 'Théorème II-4 : \\((u_n)\\) converge et \\(u_n&gt;0\\) pour tout \\(n\\). On peut conclure que sa limite \\(\\ell\\) vérifie :',
    options: [
      '\\(\\ell\\geq0\\) (inégalité large)',
      '\\(\\ell&gt;0\\) (inégalité stricte)',
      '\\(\\ell=0\\)',
    ],
    correctIndex: 0,
    explain: 'Le passage à la limite transforme une inégalité stricte en inégalité LARGE : \\(u_n=1/n&gt;0\\) mais \\(\\ell=0\\).',
    wrongExplain: {
      1: 'Contre-exemple : \\(u_n=1/n\\) est strictement positive et converge vers 0, pas vers un nombre strictement positif.',
      2: 'La limite peut très bien être positive : \\(u_n=1+1/n\\) converge vers 1. Seule la borne \\(\\ell\\geq0\\) est garantie.',
    },
  },
  {
    id: 'ex96', section: 'suites-cours',
    statement: 'Application II-6 : pour calculer \\(\\lim\\dfrac{\\sin n}{n}\\), la bonne méthode est :',
    options: [
      'Gendarmes : \\(-\\dfrac{1}{n}\\leq\\dfrac{\\sin n}{n}\\leq\\dfrac{1}{n}\\), donc limite 0',
      '\\(\\sin n\\) oscille, donc la suite n’a pas de limite',
      '« Ça ressemble à \\(\\dfrac{\\sin x}{x}\\to1\\) », donc la limite est 1',
    ],
    correctIndex: 0,
    explain: 'On encadre par deux suites de limite 0 (ou on utilise bornée × tend vers 0) : \\(|\\sin n|\\leq1\\) donne l’encadrement.',
    wrongExplain: {
      1: 'Le numérateur oscille, mais il est borné et le dénominateur grandit : le quotient est étouffé vers 0.',
      2: '\\(\\dfrac{\\sin x}{x}\\to1\\) concerne \\(x\\to0\\), pas \\(n\\to+\\infty\\). Ici \\(n\\) devient grand, pas petit.',
    },
  },
  {
    id: 'ex97', section: 'suites-cours',
    statement: 'Théorème II-7 (limite monotone, admis) : laquelle de ces suites converge forcément ?',
    options: [
      'Une suite croissante et majorée',
      'Une suite croissante et minorée',
      'Une suite décroissante et majorée',
    ],
    correctIndex: 0,
    explain: 'Croissante + majorée : elle monte mais est freinée par un plafond, donc converge. Décroissante + minorée : elle descend mais est arrêtée par un plancher.',
    wrongExplain: {
      1: 'Une suite croissante est déjà minorée par \\(u_0\\) : cette condition n’apporte rien. \\(u_n=n\\) est croissante, minorée, et diverge.',
      2: 'Une suite décroissante est déjà majorée par \\(u_0\\) : \\(u_n=-n\\) est décroissante, majorée, et diverge.',
    },
  },
  {
    id: 'ex98', section: 'suites-cours',
    statement: 'Théorème II-3 (point fixe) : \\(f\\) est continue, \\(u_{n+1}=f(u_n)\\) et \\(u_n\\to\\ell\\). Pour \\(u_{n+1}=\\sqrt{u_n+2}\\) avec \\(u_0=0\\), on trouve \\(\\ell^2=\\ell+2\\), donc \\(\\ell=2\\) ou \\(\\ell=-1\\). On retient :',
    options: [
      '\\(\\ell=2\\), car tous les \\(u_n\\) sont \\(\\geq0\\), donc \\(\\ell\\geq0\\)',
      '\\(\\ell=-1\\), car c’est la plus petite des deux',
      '\\(\\ell=2\\) ou \\(\\ell=-1\\) : on ne peut pas trancher',
    ],
    correctIndex: 0,
    explain: 'Le point fixe donne les candidats (\\(f(\\ell)=\\ell\\)), le passage à la limite dans \\(u_n\\geq0\\) élimine \\(-1\\) : on combine II-3 et II-4.',
    wrongExplain: {
      1: 'La racine carrée est toujours positive, donc tous les \\(u_n\\) sont \\(\\geq0\\) et la limite ne peut pas être \\(-1\\).',
      2: 'On peut trancher : la limite d’une suite de termes \\(\\geq0\\) est \\(\\geq0\\) (théorème II-4), ce qui écarte \\(-1\\).',
    },
  },
  {
    id: 'ex99', section: 'suites-cours',
    statement: 'Théorème II-8 : \\((u_n)\\) croissante, \\((v_n)\\) décroissante, \\(u_n-v_n\\to0\\). Elles convergent vers la même limite \\(\\ell\\), et pour tout \\(n\\) :',
    options: [
      '\\(u_n\\leq\\ell\\leq v_n\\)',
      '\\(v_n\\leq\\ell\\leq u_n\\)',
      '\\(\\ell=\\dfrac{u_n+v_n}{2}\\)',
    ],
    correctIndex: 0,
    explain: '\\((u_n)\\) monte vers \\(\\ell\\) par le bas, \\((v_n)\\) descend vers \\(\\ell\\) par le haut : \\(\\ell\\) est coincée entre elles, ce qui donne un encadrement de la limite.',
    wrongExplain: {
      1: 'Les rôles sont inversés : la suite croissante reste en dessous de sa limite, la décroissante au-dessus.',
      2: 'Le milieu \\(\\dfrac{u_n+v_n}{2}\\) n’est qu’une approximation de \\(\\ell\\), pas sa valeur exacte.',
    },
  },
  {
    id: 'ex100', section: 'suites-cours',
    statement: 'Application II-4 : pour prouver que \\(u_n=(-1)^n\\) diverge, on utilise (théorème III-1) :',
    options: [
      'Deux suites extraites de limites différentes : \\(u_{2n}\\to1\\) et \\(u_{2n+1}\\to-1\\)',
      'Le fait qu’elle est bornée',
      'Le fait qu’elle n’est pas croissante',
    ],
    correctIndex: 0,
    explain: 'Si \\((u_n)\\) convergeait vers \\(\\ell\\), toutes ses extraites tendraient vers \\(\\ell\\). Deux extraites en désaccord (\\(1\\neq-1\\)) interdisent la convergence.',
    wrongExplain: {
      1: 'Être bornée n’empêche pas de diverger, ni de converger : ça ne permet de conclure ni dans un sens ni dans l’autre.',
      2: 'Une suite non monotone peut converger (\\((-1)^n/n\\)) : ne pas être croissante ne prouve rien.',
    },
  },
  {
    id: 'ex101', section: 'suites-cours',
    statement: 'Remarque III-1 : pour une extractrice \\(\\sigma\\) strictement croissante de \\(\\mathbb{N}\\) dans \\(\\mathbb{N}\\), on a toujours :',
    options: [
      '\\(\\sigma(n)\\geq n\\)',
      '\\(\\sigma(n)\\leq n\\)',
      '\\(\\sigma(n)=n\\)',
    ],
    correctIndex: 0,
    explain: 'Par récurrence : \\(\\sigma(0)\\geq0\\), et \\(\\sigma(n+1)&gt;\\sigma(n)\\geq n\\), donc \\(\\sigma(n+1)\\geq n+1\\). On saute des indices, on n’en revient jamais en arrière.',
    wrongExplain: {
      1: 'Une extraction saute des termes (\\(\\sigma(n)=2n\\) pour les rangs pairs) : l’indice d’origine est plus grand ou égal, jamais plus petit.',
      2: 'Seule l’identité vérifie \\(\\sigma(n)=n\\) : en général (\\(\\sigma(n)=2n\\), \\(2n+1\\), …) on a \\(\\sigma(n)\\geq n\\) avec des sauts.',
    },
  },
  {
    id: 'ex102', section: 'suites-cours',
    statement: 'Théorème II-2 : \\(u_n\\to\\ell\\) et \\(f\\) continue en \\(\\ell\\) donne \\(f(u_n)\\to f(\\ell)\\). Avec \\(u_n=1-\\dfrac{1}{n}\\) (\\(n\\geq2\\)), \\(\\ell=1\\) et \\(f=E\\) (partie entière), on observe :',
    options: [
      '\\(E(u_n)=0\\) pour tout \\(n\\), alors que \\(E(1)=1\\) : \\(E\\) n’est pas continue en 1',
      '\\(E(u_n)\\to E(1)=1\\), comme prévu par le théorème',
      '\\(E(u_n)\\) n’est pas définie',
    ],
    correctIndex: 0,
    explain: 'Le théorème exige la continuité en \\(\\ell\\). La partie entière saute en 1, donc \\(E(u_n)\\to0\\) mais \\(E(1)=1\\) : l’hypothèse sert vraiment.',
    wrongExplain: {
      1: 'Le théorème ne s’applique que si \\(f\\) est continue en \\(\\ell\\). \\(E\\) ne l’est pas en 1 (elle passe de 0 à 1) : la conclusion tombe.',
      2: 'La partie entière est définie pour tout réel ; ici \\(0\\leq u_n&lt;1\\), donc \\(E(u_n)=0\\) sans problème.',
    },
  },
  {
    id: 'ex103', section: 'suites-cours',
    statement: 'Quelle affirmation est vraie ? (démontrée dans l’exercice 2 du TD 4)',
    options: [
      'Toute suite convergente est bornée, mais une suite bornée n’est pas forcément convergente (ex. \\((-1)^n\\))',
      'Une suite est bornée si et seulement si elle converge',
      'Toute suite convergente est monotone',
    ],
    correctIndex: 0,
    explain: 'Preuve du sens direct : avec \\(\\varepsilon=1\\), tous les termes après un rang \\(n_0\\) sont dans \\([\\ell-1,\\ell+1]\\), et il reste un nombre fini de termes avant \\(n_0\\) : on prend le maximum des valeurs absolues.',
    wrongExplain: {
      1: 'Faux dans le sens bornée ⇒ convergente : \\((-1)^n\\) est bornée par 1 mais ne converge pas.',
      2: 'Faux : \\((-1)^n/n\\) converge vers 0 sans être monotone (ses signes alternent).',
    },
  },

  // ---------- §6 — Limites ----------
  {
    id: 'ex1', section: 'limites',
    statement: 'Si \\(f(x) \\geq 0\\) près de \\(a\\) et \\(\\lim_{x \\to a} f(x) = l\\) existe, alors :',
    options: ['\\(l \\geq 0\\)', '\\(l &gt; 0\\)', '\\(l = 0\\)'],
    correctIndex: 0,
    explain: 'Le passage à la limite ne conserve que les inégalités larges : par exemple \\(f(x)=x^2 \\geq 0\\) près de 0, mais sa limite en 0 est \\(0\\), pas strictement positive.',
  },
  {
    id: 'ex2', section: 'limites',
    statement: '\\(f \\mathop{\\sim}\\limits_{a} g\\) signifie :',
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
    statement: 'L’équivalence de fonctions \\(\\mathop{\\sim}\\limits_{a}\\) est compatible avec :',
    options: ['Le produit et le quotient', 'L’addition', 'Toute composition à gauche'],
    correctIndex: 0,
    explain: 'L’équivalence se comporte comme une égalité pour produits/quotients, mais pas pour l’addition : \\(1-x \\mathop{\\sim}\\limits_{0} 1+x\\) et \\(-1 \\mathop{\\sim}\\limits_{0} -1\\), pourtant leur différence \\(x \\mathop{\\sim}\\limits_{0} -x\\) est fausse.',
  },
  {
    id: 'ex4', section: 'continuite',
    statement: 'D’après le théorème des valeurs intermédiaires, si \\(f\\) est continue sur \\([a,b]\\) et \\(f(a)f(b) &lt; 0\\), alors :',
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
    statement: 'La méthode de changement de variable (\\(x = \\varphi(t)\\), \\(\\varphi\\) de classe \\(C^1\\)) s’écrit :',
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

  // ---------- §8 — Suites ----------
  {
    id: 'ex22', section: 'suites',
    statement: 'Une suite monotone est convergente si et seulement si elle est :',
    options: ['Bornée', 'Positive', 'Définie par récurrence'],
    correctIndex: 0,
    explain: 'Une suite croissante et majorée (ou décroissante et minorée) converge ; une suite monotone non bornée diverge, vers \\(+\\infty\\) ou \\(-\\infty\\).',
  },
  {
    id: 'ex23', section: 'suites',
    statement: 'Une suite croissante et majorée par 5 converge nécessairement :',
    options: [
      'Vers une limite \\(\\leq 5\\), pas forcément égale à 5',
      'Vers exactement 5',
      'Vers \\(+\\infty\\)',
    ],
    correctIndex: 0,
    explain: 'Piège classique : un majorant n’est pas la limite. \\(u_n = 1 - 1/n\\) est croissante, majorée par 5, mais converge vers 1, pas vers 5.',
  },
  {
    id: 'ex24', section: 'suites',
    statement: 'Une suite géométrique \\((u_n)\\) de raison \\(\\rho\\) converge si et seulement si :',
    options: ['\\(|\\rho| &lt; 1\\) ou \\(\\rho = 1\\)', '\\(\\rho &gt; 0\\)', '\\(|\\rho| \\leq 1\\)'],
    correctIndex: 0,
    explain: 'Attention au cas \\(\\rho=-1\\) (module 1 mais pas convergent) : il faut \\(|\\rho|&lt;1\\) STRICT, sauf le cas particulier \\(\\rho=1\\) (suite constante).',
  },
  {
    id: 'ex25', section: 'suites',
    statement: 'Pour une suite géométrique de raison \\(\\rho = -1\\), on peut affirmer que la suite :',
    options: ['Diverge (elle oscille sans limite)', 'Converge vers 0', 'Converge vers \\(-1\\)'],
    correctIndex: 0,
    explain: '\\(u_n = u_0 \\times (-1)^n\\) alterne indéfiniment entre \\(u_0\\) et \\(-u_0\\) sans jamais se stabiliser — cas limite du théorème précédent.',
  },
  {
    id: 'ex26', section: 'suites',
    statement: 'Si les sous-suites \\((u_{2n})\\) et \\((u_{2n+1})\\) convergent vers deux limites différentes, alors la suite \\((u_n)\\) :',
    options: ['Diverge', 'Converge vers la moyenne des deux limites', 'Converge vers la plus grande des deux'],
    correctIndex: 0,
    explain: 'Une suite convergente a toutes ses sous-suites qui convergent vers SA limite ; deux sous-suites en désaccord empêchent donc toute convergence de la suite entière.',
  },
  {
    id: 'ex27', section: 'suites',
    statement: 'D’après le théorème des gendarmes (encadrement), si \\(v_n \\leq u_n \\leq w_n\\) à partir d’un certain rang et que \\((v_n)\\), \\((w_n)\\) convergent vers la même limite \\(l\\), alors :',
    options: ['\\((u_n)\\) converge aussi vers \\(l\\)', '\\((u_n)\\) est nécessairement constante', '\\((u_n)\\) diverge'],
    correctIndex: 0,
    explain: '\\((u_n)\\) est coincée entre deux suites qui se resserrent sur \\(l\\) — elle n’a donc pas d’autre choix que de converger vers \\(l\\) elle aussi.',
  },
  {
    id: 'ex28', section: 'suites',
    statement: 'Deux suites \\((u_n)\\) et \\((v_n)\\) sont dites adjacentes si \\((u_n)\\) est croissante, \\((v_n)\\) est décroissante, et :',
    options: ['\\(v_n - u_n \\to 0\\)', '\\(u_n = v_n\\) pour tout \\(n\\)', '\\(u_n \\times v_n \\to 1\\)'],
    correctIndex: 0,
    explain: 'Sous ces trois conditions, les deux suites convergent vers LA MÊME limite — un outil puissant pour prouver l’existence d’une limite sans la calculer.',
  },
  {
    id: 'ex29', section: 'suites',
    statement: 'Pour deux suites \\((u_n)\\) et \\((v_n)\\), la notation \\(u_n \\mathop{\\sim}\\limits_{+\\infty} v_n\\) (équivalence) signifie :',
    options: [
      '\\(\\lim_{n \\to +\\infty} \\dfrac{u_n}{v_n} = 1\\)',
      '\\(\\lim_{n \\to +\\infty} \\dfrac{u_n}{v_n} = 0\\)',
      '\\(u_n = v_n\\) à partir d’un certain rang',
    ],
    correctIndex: 0,
    explain: 'Même définition que pour les fonctions (voir §1) : le rapport des deux suites tend vers 1.',
  },
  {
    id: 'ex30', section: 'suites',
    statement: 'La notation \\(u_n = o(v_n)\\) (« petit o ») signifie :',
    options: [
      '\\(\\lim_{n \\to +\\infty} \\dfrac{u_n}{v_n} = 0\\)',
      '\\(\\lim_{n \\to +\\infty} \\dfrac{u_n}{v_n} = 1\\)',
      '\\(u_n \\leq v_n\\) pour tout \\(n\\)',
    ],
    correctIndex: 0,
    explain: 'Ne pas confondre avec \\(\\sim\\) (rapport vers 1) : \\(o(v_n)\\) veut dire que \\(u_n\\) est négligeable devant \\(v_n\\), le rapport tend vers 0.',
  },
  {
    id: 'ex31', section: 'suites',
    statement: 'Si \\(u_n \\mathop{\\sim}\\limits_{+\\infty} v_n\\), alors \\((u_n)\\) et \\((v_n)\\) :',
    options: [
      'Ont la même nature (convergent toutes les deux ou divergent toutes les deux)',
      'Convergent nécessairement',
      'Sont égales à partir d’un certain rang',
    ],
    correctIndex: 0,
    explain: 'L’équivalence garantit le même comportement à l’infini, pas l’égalité ni la convergence en elle-même.',
  },
  {
    id: 'ex32', section: 'suites',
    statement: 'En croissances comparées, à l’infini, l’ordre de domination est :',
    options: [
      'Exponentielle \\(\\gg\\) puissance \\(\\gg\\) logarithme',
      'Logarithme \\(\\gg\\) puissance \\(\\gg\\) exponentielle',
      'Puissance \\(\\gg\\) exponentielle \\(\\gg\\) logarithme',
    ],
    correctIndex: 0,
    explain: 'Quel que soit \\(k&gt;0\\), \\(e^n/n^k \\to +\\infty\\) et \\(n^k/\\ln n \\to +\\infty\\) : l’exponentielle l’emporte toujours sur la puissance, qui l’emporte toujours sur le logarithme.',
  },

  // ---------- §9 — Séries numériques ----------
  {
    id: 'ex33', section: 'series',
    statement: 'Une série \\(\\sum u_n\\) diverge grossièrement (ou trivialement) si :',
    options: ['\\(u_n\\) ne tend PAS vers 0', '\\(u_n\\) tend vers 0', '\\(u_n\\) est positive'],
    correctIndex: 0,
    explain: 'Premier réflexe avant d’étudier une série : si le terme général ne tend pas vers 0, la série diverge immédiatement.',
  },
  {
    id: 'ex34', section: 'series',
    statement: 'Si \\(u_n \\to 0\\), peut-on conclure que \\(\\sum u_n\\) converge ?',
    options: [
      'Non — contre-exemple : la série harmonique \\(\\sum 1/n\\) diverge pourtant \\(1/n \\to 0\\)',
      'Oui, toujours',
      'Seulement si \\(u_n\\) est positive',
    ],
    correctIndex: 0,
    explain: '\\(u_n \\to 0\\) est une condition NÉCESSAIRE mais pas suffisante — c’est le piège le plus classique sur les séries.',
  },
  {
    id: 'ex35', section: 'series',
    statement: 'La série géométrique \\(\\sum \\rho^n\\) converge si et seulement si :',
    options: ['\\(|\\rho| &lt; 1\\)', '\\(|\\rho| \\leq 1\\)', '\\(\\rho &gt; 0\\)'],
    correctIndex: 0,
    explain: 'Contrairement à la SUITE géométrique (où \\(\\rho=1\\) « convergeait » aussi, vers une constante), pour la SÉRIE \\(\\rho=1\\) donne \\(\\sum 1 = +\\infty\\) : elle diverge. Quand elle converge, la somme vaut \\(\\dfrac{1}{1-\\rho}\\).',
  },
  {
    id: 'ex36', section: 'series',
    statement: 'La série de Riemann \\(\\sum \\dfrac{1}{n^\\alpha}\\) converge si et seulement si :',
    options: ['\\(\\alpha &gt; 1\\)', '\\(\\alpha \\geq 0\\)', '\\(\\alpha &lt; 1\\)'],
    correctIndex: 0,
    explain: 'Cas particulier \\(\\alpha=1\\) : c’est la série harmonique, qui diverge (tout juste) — la frontière \\(\\alpha=1\\) est du côté de la divergence.',
  },
  {
    id: 'ex37', section: 'series',
    statement: 'D’après le critère des séries alternées, une série \\(\\sum (-1)^n u_n\\) (avec \\(u_n \\geq 0\\)) converge si :',
    options: [
      '\\(u_n \\to 0\\) ET \\((u_n)\\) est décroissante',
      '\\(u_n \\to 0\\) seulement',
      '\\((u_n)\\) est décroissante seulement',
    ],
    correctIndex: 0,
    explain: 'Les deux conditions sont nécessaires ENSEMBLE : ni la décroissance seule, ni la limite nulle seule, ne suffisent à garantir la convergence.',
  },
  {
    id: 'ex38', section: 'series',
    statement: 'Si \\(\\sum |u_n|\\) converge (convergence absolue), alors :',
    options: ['\\(\\sum u_n\\) converge aussi', '\\(\\sum u_n\\) diverge nécessairement', 'On ne peut rien dire de \\(\\sum u_n\\)'],
    correctIndex: 0,
    explain: 'La convergence absolue est plus forte que la convergence simple et l’implique toujours — la réciproque est fausse (ex. série harmonique alternée : converge, mais pas absolument).',
  },
  {
    id: 'ex39', section: 'series',
    statement: 'D’après la règle de d’Alembert, si \\(\\lim_{n \\to +\\infty} \\left|\\dfrac{u_{n+1}}{u_n}\\right| = L\\) avec \\(L&lt;1\\), alors la série \\(\\sum u_n\\) :',
    options: ['Converge', 'Diverge grossièrement', 'Ne permet aucune conclusion'],
    correctIndex: 0,
    explain: 'Et si \\(L&gt;1\\), la série diverge grossièrement (le terme général ne tend même pas vers 0).',
  },
  {
    id: 'ex40', section: 'series',
    statement: 'Dans la règle de d’Alembert, si \\(L = 1\\), on peut conclure que la série :',
    options: [
      'Rien : le test ne permet aucune conclusion, il faut une autre méthode',
      'Converge toujours',
      'Diverge toujours',
    ],
    correctIndex: 0,
    explain: '\\(L=1\\) est le cas indéterminé — les séries de Riemann le montrent : \\(\\sum 1/n\\) (diverge) et \\(\\sum 1/n^2\\) (converge) donnent TOUTES LES DEUX \\(L=1\\), pourtant elles n’ont pas la même nature.',
  },
  {
    id: 'ex41', section: 'series',
    statement: 'D’après le critère de Cauchy, s’il existe \\(r&lt;1\\) tel que \\(\\sqrt[n]{u_n} &lt; r\\) à partir d’un certain rang, alors \\(\\sum u_n\\) :',
    options: ['Converge', 'Diverge', 'Diverge grossièrement seulement'],
    correctIndex: 0,
    explain: 'Symétrique à d’Alembert, mais avec la racine \\(n\\)-ième au lieu du rapport \\(u_{n+1}/u_n\\) — utile quand \\(u_n\\) contient déjà une puissance \\(n\\)-ième.',
  },
  {
    id: 'ex42', section: 'series',
    statement: 'Pour deux séries à termes positifs telles que \\(0 \\leq u_n \\leq v_n\\), si \\(\\sum v_n\\) converge, alors :',
    options: ['\\(\\sum u_n\\) converge aussi', '\\(\\sum u_n\\) diverge', 'On ne peut rien dire de \\(\\sum u_n\\)'],
    correctIndex: 0,
    explain: 'Et par contraposée : si \\(\\sum u_n\\) diverge, alors \\(\\sum v_n\\) diverge aussi — un majorant convergent entraîne la convergence du plus petit.',
  },
  {
    id: 'ex104', section: 'valeur-absolue-td',
    statement: 'Résoudre \\(|x+4|&lt;-1\\).',
    options: [
      'Aucune solution : \\(S=\\emptyset\\)',
      '\\(S=]-5,-3[\\)',
      '\\(S=\\mathbb{R}\\)',
    ],
    correctIndex: 0,
    explain: 'Une valeur absolue est toujours \\(\\geq0\\), donc elle ne peut jamais être strictement inférieure à un nombre négatif. Réflexe : regarder le signe du membre de droite AVANT de calculer quoi que ce soit.',
    wrongExplain: {
      1: 'C’est ce qu’on obtiendrait avec \\(|x+4|&lt;1\\). Ici le membre de droite est \\(-1\\) : aucune valeur absolue ne peut être plus petite.',
      2: 'Une valeur absolue n’est jamais négative : l’inégalité est donc fausse pour TOUT \\(x\\), pas vraie pour tout \\(x\\).',
    },
  },
  {
    id: 'ex105', section: 'valeur-absolue-td',
    statement: 'Résoudre \\(|x+2|&gt;5\\).',
    options: [
      '\\(S=]-\\infty,-7[\\ \\cup\\ ]3,+\\infty[\\)',
      '\\(S=]-7,3[\\)',
      '\\(S=]-\\infty,-3[\\ \\cup\\ ]7,+\\infty[\\)',
    ],
    correctIndex: 0,
    explain: '\\(|u|&gt;R \\Leftrightarrow u&gt;R\\) ou \\(u&lt;-R\\) : ici \\(x+2&gt;5\\) donne \\(x&gt;3\\), et \\(x+2&lt;-5\\) donne \\(x&lt;-7\\). Le « supérieur à » donne deux morceaux à l’EXTÉRIEUR, le « inférieur à » un seul intervalle au milieu.',
    wrongExplain: {
      1: 'C’est la solution de \\(|x+2|&lt;5\\) (un seul intervalle centré en \\(-2\\)). Ici c’est « strictement supérieur à », donc l’extérieur.',
      2: 'Ce sont les bornes de \\(|x-2|&gt;5\\)… et encore, avec un signe à l’envers. Pour \\(|x+2|\\), le centre est \\(-2\\), donc \\(-2\\pm5=-7\\) et \\(3\\).',
    },
  },
  {
    id: 'ex106', section: 'valeur-absolue-td',
    statement: 'Résoudre « \\(|x+1|&lt;1\\) OU \\(|x+2|\\leq4\\) ».',
    options: [
      '\\(S=[-6,2]\\)',
      '\\(S=]-2,0[\\)',
      '\\(S=]-6,2[\\)',
    ],
    correctIndex: 0,
    explain: '\\(|x+1|&lt;1\\) donne \\(]-2,0[\\) et \\(|x+2|\\leq4\\) donne \\([-6,2]\\). Avec « OU », on prend la RÉUNION : le premier intervalle est contenu dans le second, donc \\(S=[-6,2]\\) (bornes fermées, car l’inégalité est large dans le second).',
    wrongExplain: {
      1: 'C’est seulement l’ensemble de la première condition. Avec « ou », il faut ajouter les solutions de la seconde.',
      2: 'Les bornes \\(-6\\) et \\(2\\) sont atteintes par la seconde inégalité (large \\(\\leq\\)), donc elles restent dans l’ensemble.',
    },
  },
  {
    id: 'ex107', section: 'valeur-absolue-td',
    statement: 'Résoudre « \\(|x-5|&lt;2\\) ET \\(|x+1|\\leq1\\) ».',
    options: [
      '\\(S=\\emptyset\\)',
      '\\(S=[-2,7[\\)',
      '\\(S=]3,7[\\)',
    ],
    correctIndex: 0,
    explain: '\\(|x-5|&lt;2\\) donne \\(]3,7[\\) et \\(|x+1|\\leq1\\) donne \\([-2,0]\\). Avec « ET », on prend l’INTERSECTION : les deux intervalles sont disjoints, donc \\(S=\\emptyset\\). Réflexe : dessiner les deux intervalles sur une droite.',
    wrongExplain: {
      1: 'C’est l’enveloppe des deux intervalles, comme si on avait un « ou » et qu’on remplissait le trou. Un « et » demande les deux conditions simultanément.',
      2: 'C’est la solution de la première condition seule, il faut aussi vérifier la seconde.',
    },
  },
  {
    id: 'ex108', section: 'valeur-absolue-td',
    statement: 'Résoudre \\(|2x-1|=|x+2|\\).',
    options: [
      '\\(S=\\left\\{3,\\,-\\tfrac13\\right\\}\\)',
      '\\(S=\\{3\\}\\)',
      '\\(S=\\left\\{3,\\,\\tfrac13\\right\\}\\)',
    ],
    correctIndex: 0,
    explain: '\\(|A|=|B| \\Leftrightarrow A=B\\) ou \\(A=-B\\). Cas 1 : \\(2x-1=x+2\\) donne \\(x=3\\). Cas 2 : \\(2x-1=-(x+2)\\) donne \\(3x=-1\\), soit \\(x=-\\tfrac13\\). Vérification : \\(|{-\\tfrac23}-1|=\\tfrac53=|{-\\tfrac13}+2|\\).',
    wrongExplain: {
      1: 'Il manque le cas \\(A=-B\\) : une égalité de valeurs absolues donne TOUJOURS deux équations.',
      2: 'Erreur de signe dans le cas \\(A=-B\\) : \\(2x-1=-x-2\\) donne \\(3x=-1\\), donc \\(x=-\\tfrac13\\) et non \\(+\\tfrac13\\).',
    },
  },
  {
    id: 'ex109', section: 'valeur-absolue-td',
    statement: 'Résoudre \\(|2x-1|\\leq|2x+1|\\) en élevant au carré.',
    options: [
      '\\(S=[0,+\\infty[\\)',
      '\\(S=]-\\infty,0]\\)',
      '\\(S=\\mathbb{R}\\)',
    ],
    correctIndex: 0,
    explain: '\\((2x-1)^2\\leq(2x+1)^2 \\Leftrightarrow 4x^2-4x+1\\leq4x^2+4x+1 \\Leftrightarrow -4x\\leq4x \\Leftrightarrow x\\geq0\\). Les \\(4x^2\\) et les \\(1\\) se simplifient, il ne reste que le terme croisé.',
    wrongExplain: {
      1: 'Inégalité retournée : \\(-4x\\leq4x\\) donne \\(8x\\geq0\\), donc \\(x\\geq0\\) et non \\(x\\leq0\\). Test : \\(x=1\\) donne \\(1\\leq3\\), vrai.',
      2: 'L’inégalité n’est pas vraie partout : pour \\(x=-1\\) on obtient \\(3\\leq1\\), faux.',
    },
  },
  {
    id: 'ex110', section: 'valeur-absolue-td',
    statement: 'Pourquoi peut-on passer de \\(|A|\\leq|B|\\) à \\(A^2\\leq B^2\\) sans perdre l’équivalence ?',
    options: [
      'Car \\(|A|^2=A^2\\) et \\(t\\mapsto t^2\\) est croissante sur \\(\\mathbb{R}_+\\), où vivent \\(|A|\\) et \\(|B|\\)',
      'Car élever au carré conserve toujours une inégalité',
      'Car \\(|A|\\leq|B|\\) est la même chose que \\(A\\leq B\\)',
    ],
    correctIndex: 0,
    explain: 'On élève au carré deux quantités POSITIVES (\\(|A|\\) et \\(|B|\\)), sur \\(\\mathbb{R}_+\\) le carré est strictement croissant, donc on a bien une équivalence. C’est pour ça que la méthode marche avec des valeurs absolues, et pas avec des \\(A\\) et \\(B\\) de signe quelconque.',
    wrongExplain: {
      1: 'Faux en général : \\(-3\\leq1\\) mais \\(9\\leq1\\) est faux. La croissance du carré n’est valable que sur les positifs.',
      2: 'Faux : \\(|{-3}|\\leq|1|\\) est faux alors que \\(-3\\leq1\\) est vrai. La valeur absolue efface le signe.',
    },
  },
  {
    id: 'ex111', section: 'valeur-absolue-td',
    statement: 'Résoudre \\(2x^2-7|x|-4&lt;0\\). Quel changement de variable est le bon réflexe ?',
    options: [
      '\\(X=|x|\\), on résout \\(2X^2-7X-4&lt;0\\) avec \\(X\\geq0\\) : \\(S=]-4,4[\\)',
      '\\(X=|x|\\), et on garde \\(X\\in]-\\tfrac12,4[\\) : \\(S=]-\\tfrac12,4[\\)',
      '\\(X=|x|\\) : \\(S=]-\\infty,-4[\\ \\cup\\ ]4,+\\infty[\\)',
    ],
    correctIndex: 0,
    explain: 'Comme \\(x^2=|x|^2\\), on obtient un trinôme en \\(X=|x|\\) : \\(2X^2-7X-4&lt;0\\), racines \\(4\\) et \\(-\\tfrac12\\), donc \\(-\\tfrac12&lt;X&lt;4\\). Mais \\(X=|x|\\geq0\\) : on garde \\(0\\leq X&lt;4\\), soit \\(|x|&lt;4\\) et \\(S=]-4,4[\\).',
    wrongExplain: {
      1: 'On a oublié de revenir à \\(x\\) : la solution en \\(X\\) est \\(]-\\tfrac12,4[\\), mais l’inconnue est \\(x\\), avec la contrainte \\(X=|x|\\geq0\\).',
      2: 'Signe du trinôme oublié : il est négatif ENTRE les racines (coefficient dominant positif), pas à l’extérieur.',
    },
  },
  {
    id: 'ex112', section: 'valeur-absolue-td',
    statement: 'On sait \\(|a|\\in[2,4]\\) et \\(|b|\\in[5,6]\\). Quel encadrement de \\(|a+b|\\) obtient-on ?',
    options: [
      '\\(1\\leq|a+b|\\leq10\\)',
      '\\(3\\leq|a+b|\\leq10\\)',
      '\\(1\\leq|a+b|\\leq6\\)',
    ],
    correctIndex: 0,
    explain: 'Majorant : \\(|a+b|\\leq|a|+|b|\\leq4+6=10\\). Minorant : seconde inégalité triangulaire, \\(|a+b|\\geq\\big||b|-|a|\\big|\\geq5-4=1\\), le pire cas étant \\(|b|\\) le plus petit et \\(|a|\\) le plus grand.',
    wrongExplain: {
      1: 'Le minorant \\(3=5-2\\) mélange les mauvaises bornes : pour minorer \\(|b|-|a|\\), il faut prendre \\(|b|\\) minimal (5) ET \\(|a|\\) maximal (4), donc \\(1\\).',
      2: 'Le majorant est \\(|a|+|b|\\leq4+6=10\\), pas \\(6\\) : il faut additionner les majorants des deux termes.',
    },
  },
  {
    id: 'ex113', section: 'valeur-absolue-td',
    statement: 'Même hypothèses (\\(|a|\\in[2,4]\\), \\(|b|\\in[5,6]\\)). Quel encadrement de \\(|a+2b|\\) ?',
    options: [
      '\\(6\\leq|a+2b|\\leq16\\)',
      '\\(8\\leq|a+2b|\\leq16\\)',
      '\\(6\\leq|a+2b|\\leq12\\)',
    ],
    correctIndex: 0,
    explain: 'Majorant : \\(|a|+2|b|\\leq4+12=16\\). Minorant : \\(|a+2b|\\geq2|b|-|a|\\geq10-4=6\\). Attention au facteur \\(2\\) : il porte sur \\(|b|\\), pas sur \\(|a|\\).',
    wrongExplain: {
      1: '\\(8=10-2\\) utilise \\(|a|\\) minimal alors qu’il faut le maximal pour minorer \\(2|b|-|a|\\) : le pire cas est \\(10-4=6\\).',
      2: '\\(12\\) correspond à \\(2|b|\\) seul : on a oublié d’ajouter \\(|a|\\leq4\\) pour le majorant.',
    },
  },
  {
    id: 'ex114', section: 'valeur-absolue-td',
    statement: 'Pour MAJORER \\(\\dfrac{a^2\\,|b+1|}{|a-2b|}\\) (même cadre), que faut-il faire ?',
    options: [
      'Majorer le numérateur ET minorer le dénominateur',
      'Majorer le numérateur ET majorer le dénominateur',
      'Minorer le numérateur ET majorer le dénominateur',
    ],
    correctIndex: 0,
    explain: 'Une fraction est la plus grande quand le numérateur est grand et le dénominateur PETIT. Ici : numérateur \\(\\leq16\\times7=112\\), dénominateur \\(\\geq2|b|-|a|\\geq6\\), donc quotient \\(\\leq\\dfrac{112}{6}=\\dfrac{56}{3}\\).',
    wrongExplain: {
      1: 'Majorer le dénominateur ferait baisser la fraction : cela donnerait un majorant du numérateur sur un majorant du dénominateur, qui ne majore rien.',
      2: 'C’est la méthode pour MINORER la fraction (numérateur petit, dénominateur grand), pas pour la majorer.',
    },
  },
  {
    id: 'ex115', section: 'valeur-absolue-td',
    statement: 'Pour montrer \\(|x|+|y|\\leq|x+y|+|x-y|\\), quelle idée fonctionne ?',
    options: [
      'Poser \\(a=x+y\\), \\(b=x-y\\), écrire \\(x=\\tfrac{a+b}2\\), \\(y=\\tfrac{a-b}2\\) et appliquer l’inégalité triangulaire',
      'Supposer \\(x,y\\geq0\\) seulement, le cas général est impossible',
      'Appliquer la seconde inégalité triangulaire à \\(x\\) et \\(y\\)',
    ],
    correctIndex: 0,
    explain: '\\(|x|+|y|\\leq\\tfrac{|a|+|b|}2+\\tfrac{|a|+|b|}2=|a|+|b|=|x+y|+|x-y|\\). Réflexe : quand l’inégalité à montrer fait apparaître \\(x+y\\) et \\(x-y\\), on les nomme et on exprime \\(x,y\\) en fonction d’eux.',
    wrongExplain: {
      1: 'Le cas général n’est pas impossible, il est prouvé par ce changement de variable. Se limiter à \\(x,y\\geq0\\) ne démontre rien pour les autres signes.',
      2: 'La seconde inégalité donne une minoration de \\(|x-y|\\), pas le lien avec \\(|x+y|+|x-y|\\). Il faut revenir à \\(x\\) et \\(y\\) par demi-somme et demi-différence.',
    },
  },
  {
    id: 'ex116', section: 'valeur-absolue-td',
    statement: 'Quand y a-t-il égalité dans \\(|a+b+c|\\leq|a|+|b|+|c|\\) ?',
    options: [
      'Quand \\(a,b,c\\) sont tous \\(\\geq0\\) ou tous \\(\\leq0\\)',
      'Jamais',
      'Dès que deux des trois sont positifs',
    ],
    correctIndex: 0,
    explain: 'On démontre l’inégalité en l’appliquant deux fois : \\(|(a+b)+c|\\leq|a+b|+|c|\\leq|a|+|b|+|c|\\). Il y a égalité aux deux étapes seulement si tous les nombres sont de même signe (au sens large).',
    wrongExplain: {
      1: 'L’égalité est atteinte, par exemple avec \\(a=b=c=1\\) : \\(3=3\\).',
      2: 'Contre-exemple : \\(a=b=1\\), \\(c=-1\\) donne \\(|a+b+c|=1&lt;3\\). Il faut que les TROIS aient le même signe.',
    },
  },
  {
    id: 'ex117', section: 'valeur-absolue-td',
    statement: 'Pour quelles valeurs de \\(x\\) a-t-on \\(\\dfrac{|x|}{1+x^2}=\\dfrac12\\) ?',
    options: [
      '\\(x=1\\) et \\(x=-1\\)',
      '\\(x=0\\)',
      '\\(x=1\\) uniquement',
    ],
    correctIndex: 0,
    explain: '\\(\\dfrac{|x|}{1+x^2}\\leq\\dfrac12 \\Leftrightarrow 1+x^2-2|x|\\geq0 \\Leftrightarrow (|x|-1)^2\\geq0\\), toujours vrai. L’égalité a lieu quand \\((|x|-1)^2=0\\), donc \\(|x|=1\\) : les deux valeurs \\(\\pm1\\).',
    wrongExplain: {
      1: 'En \\(x=0\\) on trouve \\(0\\), loin de \\(\\tfrac12\\). C’est le MINIMUM de la fraction, pas son maximum.',
      2: 'La fonction est paire (elle ne dépend que de \\(|x|\\)) : si \\(x=1\\) convient, \\(x=-1\\) aussi.',
    },
  },
  {
    id: 'ex118', section: 'valeur-absolue-td',
    statement: 'Pour \\(|x|\\leq1\\) et \\(|y|\\leq1\\), on veut \\(\\left|\\dfrac{x+y}{1+xy}\\right|\\leq1\\). Quelle identité conclut ?',
    options: [
      '\\((1+xy)^2-(x+y)^2=(1-x^2)(1-y^2)\\geq0\\)',
      '\\((1+xy)^2-(x+y)^2=(1+x^2)(1+y^2)\\)',
      '\\((1+xy)^2-(x+y)^2=(1-x)(1-y)\\)',
    ],
    correctIndex: 0,
    explain: 'En développant : \\(1+2xy+x^2y^2-x^2-2xy-y^2=1-x^2-y^2+x^2y^2=(1-x^2)(1-y^2)\\). Comme \\(|x|,|y|\\leq1\\), les deux facteurs sont \\(\\geq0\\), donc \\((x+y)^2\\leq(1+xy)^2\\), c’est-à-dire \\(|x+y|\\leq|1+xy|\\).',
    wrongExplain: {
      1: 'Le signe est faux : le terme en \\(x^2\\) est \\(-x^2\\), pas \\(+x^2\\). Cette identité ne servirait d’ailleurs pas à conclure.',
      2: 'Les degrés ne collent pas : le membre de gauche contient un terme en \\(x^2y^2\\), qui n’apparaît pas dans \\((1-x)(1-y)\\).',
    },
  },
  {
    id: 'ex119', section: 'partie-entiere-td',
    statement: 'Quel encadrement de \\(E(x)\\) en fonction de \\(x\\) est correct ?',
    options: [
      '\\(x-1&lt;E(x)\\leq x\\)',
      '\\(x\\leq E(x)&lt;x+1\\)',
      '\\(x-1\\leq E(x)&lt;x\\)',
    ],
    correctIndex: 0,
    explain: 'Par définition \\(E(x)\\leq x&lt;E(x)+1\\), donc \\(E(x)\\leq x\\) et \\(E(x)&gt;x-1\\). Les bornes strictes/larges comptent : \\(E(x)=x\\) quand \\(x\\) est entier, d’où le « \\(\\leq x\\) » à droite.',
    wrongExplain: {
      1: 'C’est l’encadrement de \\(x\\) en fonction de \\(E(x)\\) à l’envers : \\(E(x)\\) est plus petit que \\(x\\) (ou égal), jamais plus grand.',
      2: 'La borne droite est large : pour \\(x=3\\), \\(E(x)=3=x\\), donc \\(E(x)&lt;x\\) serait faux.',
    },
  },
  {
    id: 'ex120', section: 'partie-entiere-td',
    statement: 'Pour \\(x\\notin\\mathbb{Z}\\), la partie entière par excès \\(\\lceil x\\rceil\\) vaut…',
    options: [
      '\\(E(x)+1\\)',
      '\\(E(x)\\)',
      '\\(E(x)-1\\)',
    ],
    correctIndex: 0,
    explain: '\\(\\lceil x\\rceil\\) est le plus petit entier \\(\\geq x\\). Si \\(x\\) n’est pas entier, c’est l’entier juste au-dessus de \\(x\\), soit \\(E(x)+1\\) (ex. \\(\\lceil2{,}3\\rceil=3=E(2{,}3)+1\\)). Si \\(x\\) est entier, \\(\\lceil x\\rceil=x=E(x)\\).',
    wrongExplain: {
      1: 'Cela n’arrive que si \\(x\\) est entier. Pour \\(2{,}3\\), \\(E=2\\) mais \\(\\lceil2{,}3\\rceil=3\\).',
      2: '\\(E(x)-1\\) serait plus petit que \\(x\\) : ce n’est jamais un entier \\(\\geq x\\).',
    },
  },
  {
    id: 'ex121', section: 'partie-entiere-td',
    statement: 'Que vaut \\(\\lceil-2{,}3\\rceil\\), sachant que \\(\\lceil x\\rceil=-E(-x)\\) ?',
    options: [
      '\\(-2\\)',
      '\\(-3\\)',
      '\\(2\\)',
    ],
    correctIndex: 0,
    explain: '\\(\\lceil-2{,}3\\rceil=-E(2{,}3)=-2\\). Vérification directe : le plus petit entier \\(\\geq-2{,}3\\) est bien \\(-2\\). Attention, \\(E(-2{,}3)=-3\\) : la partie entière « classique » d’un négatif s’éloigne de zéro.',
    wrongExplain: {
      1: '\\(-3\\) est \\(E(-2{,}3)\\), la partie entière par défaut. La partie entière par excès est l’entier juste au-dessus, \\(-2\\).',
      2: 'Signe oublié : \\(\\lceil x\\rceil=-E(-x)\\), donc le résultat est \\(-E(2{,}3)=-2\\).',
    },
  },
  {
    id: 'ex122', section: 'partie-entiere-td',
    statement: 'Pour \\(x\\notin\\mathbb{Z}\\), que vaut \\(E(-x)\\) ?',
    options: [
      '\\(-E(x)-1\\)',
      '\\(-E(x)\\)',
      '\\(-E(x)+1\\)',
    ],
    correctIndex: 0,
    explain: 'Exemple : \\(x=2{,}3\\), \\(E(x)=2\\), \\(E(-x)=E(-2{,}3)=-3=-2-1\\). Écrire \\(x=n+f\\) avec \\(0&lt;f&lt;1\\) : \\(-x=-(n+1)+(1-f)\\) avec \\(0&lt;1-f&lt;1\\), donc \\(E(-x)=-n-1\\). Pour \\(x\\in\\mathbb{Z}\\), en revanche, \\(E(-x)=-E(x)\\).',
    wrongExplain: {
      1: 'Cela n’est vrai que pour \\(x\\) entier. Contre-exemple : \\(x=2{,}3\\) donne \\(E(-x)=-3\\neq-2\\).',
      2: 'Ce serait un entier plus grand que \\(-x\\) : mais \\(E(-x)\\leq-x\\), le « +1 » est donc impossible ici.',
    },
  },
  {
    id: 'ex123', section: 'partie-entiere-td',
    statement: 'Quelle est la partie fractionnaire \\(\\{-1{,}3\\}=-1{,}3-E(-1{,}3)\\) ?',
    options: [
      '\\(0{,}7\\)',
      '\\(0{,}3\\)',
      '\\(-0{,}3\\)',
    ],
    correctIndex: 0,
    explain: '\\(E(-1{,}3)=-2\\), donc \\(\\{-1{,}3\\}=-1{,}3+2=0{,}7\\). La partie fractionnaire est TOUJOURS dans \\([0,1[\\) : un résultat négatif signale une erreur sur \\(E\\).',
    wrongExplain: {
      1: '\\(0{,}3\\) serait la distance à l’entier \\(-1\\), obtenue avec \\(E(-1{,}3)=-1\\) à tort : \\(E(-1{,}3)=-2\\).',
      2: 'Une partie fractionnaire est toujours \\(\\geq0\\) (elle vaut \\(x-E(x)\\) avec \\(E(x)\\leq x\\)).',
    },
  },
  {
    id: 'ex124', section: 'partie-entiere-td',
    statement: 'Pour \\(x,y\\) réels, \\(E(x+y)=E(x)+E(y)+1\\) exactement quand…',
    options: [
      '\\(\\{x\\}+\\{y\\}\\geq1\\)',
      '\\(\\{x\\}+\\{y\\}&gt;1\\)',
      '\\(x\\) et \\(y\\) sont de signes contraires',
    ],
    correctIndex: 0,
    explain: 'Avec \\(x=E(x)+\\{x\\}\\) et \\(y=E(y)+\\{y\\}\\) : \\(x+y=E(x)+E(y)+(\\{x\\}+\\{y\\})\\), où \\(\\{x\\}+\\{y\\}\\in[0,2[\\). Si la somme est \\(&lt;1\\), on a \\(E(x+y)=E(x)+E(y)\\) ; si elle est \\(\\geq1\\) (égalité comprise), on gagne un entier.',
    wrongExplain: {
      1: 'L’égalité est incluse : \\(\\{x\\}+\\{y\\}=1\\) donne un entier exact, par exemple \\(0{,}5+0{,}5=1\\) et \\(E(1)=1\\).',
      2: 'Le signe de \\(x\\) et \\(y\\) n’intervient pas : seules les parties fractionnaires comptent.',
    },
  },
  {
    id: 'ex125', section: 'partie-entiere-td',
    statement: 'Si \\(\\{x\\}\\geq\\tfrac12\\), que vaut \\(E(2x)\\) ?',
    options: [
      '\\(2E(x)+1\\)',
      '\\(2E(x)\\)',
      '\\(2E(x)-1\\)',
    ],
    correctIndex: 0,
    explain: '\\(2x=2E(x)+2\\{x\\}\\) avec \\(2\\{x\\}\\in[1,2[\\), donc \\(E(2x)=2E(x)+1\\). Si \\(\\{x\\}&lt;\\tfrac12\\), \\(2\\{x\\}\\in[0,1[\\) et \\(E(2x)=2E(x)\\). Test : \\(x=3{,}7\\) donne \\(E(7{,}4)=7=2\\times3+1\\).',
    wrongExplain: {
      1: 'C’est le cas \\(\\{x\\}&lt;\\tfrac12\\). Test : \\(x=3{,}7\\), \\(2E(x)=6\\) mais \\(E(2x)=E(7{,}4)=7\\).',
      2: 'Le terme \\(2\\{x\\}\\) est dans \\([1,2[\\), donc on gagne un entier, on n’en perd pas.',
    },
  },
  {
    id: 'ex126', section: 'partie-entiere-td',
    statement: 'À quelle condition a-t-on \\(E\\!\\left(x+\\tfrac12\\right)=E(x)\\) ?',
    options: [
      '\\(\\{x\\}&lt;\\tfrac12\\)',
      '\\(\\{x\\}\\geq\\tfrac12\\)',
      '\\(x\\in\\mathbb{Z}\\) uniquement',
    ],
    correctIndex: 0,
    explain: '\\(x+\\tfrac12=E(x)+\\{x\\}+\\tfrac12\\) : on reste dans le même entier tant que \\(\\{x\\}+\\tfrac12&lt;1\\), soit \\(\\{x\\}&lt;\\tfrac12\\). C’est l’arrondi à l’entier le plus proche : \\(E(x+\\tfrac12)\\) arrondit, \\(E(x)\\) tronque.',
    wrongExplain: {
      1: 'C’est la condition pour que \\(E(x+\\tfrac12)=E(x)+1\\) : dans ce cas on franchit l’entier suivant.',
      2: 'Pour \\(x\\) entier c’est vrai, mais aussi pour tout \\(x\\) de partie fractionnaire \\(&lt;\\tfrac12\\), comme \\(3{,}2\\).',
    },
  },
  {
    id: 'ex127', section: 'partie-entiere-td',
    statement: 'Résoudre \\(E(2x)=5+E(-x)\\), pour \\(x\\notin\\mathbb{Z}\\). Quel est l’ensemble des solutions ?',
    options: [
      '\\(\\left[\\tfrac32,2\\right[\\)',
      '\\([1,2[\\)',
      '\\(\\left[1,\\tfrac32\\right[\\)',
    ],
    correctIndex: 0,
    explain: 'Avec \\(E(-x)=-E(x)-1\\) et \\(E(2x)=2E(x)+\\varepsilon\\) (\\(\\varepsilon\\in\\{0,1\\}\\)) : \\(3E(x)+\\varepsilon=4\\), donc \\(\\varepsilon=1\\) et \\(E(x)=1\\). \\(\\varepsilon=1\\) veut dire \\(\\{x\\}\\geq\\tfrac12\\), d’où \\(x\\in[\\tfrac32,2[\\). Le cas \\(x\\in\\mathbb{Z}\\) ne donne rien (\\(3n=5\\)).',
    wrongExplain: {
      1: 'On a oublié la condition sur \\(\\{x\\}\\) : \\(\\varepsilon=1\\) impose \\(\\{x\\}\\geq\\tfrac12\\), donc \\(x\\geq\\tfrac32\\).',
      2: 'Ici \\(E(x)=1\\) mais \\(\\varepsilon=1\\) force \\(\\{x\\}\\geq\\tfrac12\\) : \\(x\\in[1,\\tfrac32[\\) correspondrait à \\(\\varepsilon=0\\), qui n’est pas solution.',
    },
  },
  {
    id: 'ex128', section: 'partie-entiere-td',
    statement: 'Pour un entier \\(k\\geq1\\), que vaut \\(E\\!\\left(\\dfrac{E(kx)}{k}\\right)\\) ?',
    options: [
      '\\(E(x)\\)',
      '\\(E(kx)\\)',
      '\\(kE(x)\\)',
    ],
    correctIndex: 0,
    explain: 'Avec \\(n=E(x)\\), on a \\(kn\\leq E(kx)\\leq kn+k-1\\), donc \\(n\\leq\\dfrac{E(kx)}k&lt;n+1\\) et la partie entière de ce quotient est \\(n=E(x)\\). Test : \\(k=2\\), \\(x=3{,}7\\) : \\(E(7{,}4)/2=3{,}5\\) et \\(E(3{,}5)=3=E(x)\\).',
    wrongExplain: {
      1: 'C’est \\(E(kx)\\) lui-même, avant la division par \\(k\\). Le quotient \\(\\tfrac{E(kx)}k\\) est plus petit.',
      2: '\\(kE(x)\\) est ce qu’on trouverait en multipliant au lieu de diviser : le quotient est de l’ordre de \\(x\\), pas de \\(kx\\).',
    },
  },
  {
    id: 'ex129', section: 'partie-entiere-td',
    statement: 'Pour \\(x=0{,}9\\), que valent \\(E(x)+E(2x)+E(3x)\\) et \\(E(6x)\\) ?',
    options: [
      '\\(3\\) et \\(5\\)',
      '\\(0\\) et \\(5\\)',
      '\\(3\\) et \\(6\\)',
    ],
    correctIndex: 0,
    explain: '\\(E(0{,}9)=0\\), \\(E(1{,}8)=1\\), \\(E(2{,}7)=2\\), somme \\(3\\) ; \\(E(5{,}4)=5\\). On vérifie bien \\(E(x)+E(2x)+E(3x)\\leq E(6x)\\), avec une inégalité STRICTE ici : pas d’égalité en général.',
    wrongExplain: {
      1: '\\(E(2x)=E(1{,}8)=1\\) et \\(E(3x)=E(2{,}7)=2\\) : on ne peut pas les remplacer par \\(0\\).',
      2: '\\(E(6x)=E(5{,}4)=5\\), pas \\(6\\) : \\(6\\) serait la valeur de \\(6x\\) arrondie au plus proche, pas tronquée.',
    },
  },
  {
    id: 'ex130', section: 'partie-entiere-td',
    statement: 'Quelle est l’allure du graphe de la partie fractionnaire \\(x\\mapsto x-E(x)\\) ?',
    options: [
      'Dents de scie : périodique de période \\(1\\), valeurs dans \\([0,1[\\), saut en chaque entier',
      'Une droite de pente \\(1\\)',
      'Un escalier à marches de hauteur \\(1\\)',
    ],
    correctIndex: 0,
    explain: 'Sur chaque \\([n,n+1[\\), \\(E(x)=n\\) et la fonction vaut \\(x-n\\) : un segment de pente \\(1\\) de \\(0\\) (inclus) à \\(1\\) (exclu), qui se répète à l’identique. L’escalier est le graphe de \\(E\\), et la droite celui de \\(x\\mapsto x\\) : la partie fractionnaire est leur différence.',
    wrongExplain: {
      1: 'C’est le graphe de \\(x\\mapsto x\\), sans la soustraction de \\(E(x)\\). La soustraction « casse » la droite en morceaux.',
      2: 'Un escalier est le graphe de \\(E(x)\\). En soustrayant \\(E(x)\\) à \\(x\\), les marches disparaissent et il reste des dents de scie.',
    },
  },
  {
    id: 'ex131', section: 'limites-reflexes',
    statement: 'Parmi ces écritures, laquelle est une forme indéterminée ?',
    options: [
      '\\(+\\infty-\\infty\\)',
      '\\(+\\infty+\\infty\\)',
      '\\(\\dfrac{1}{+\\infty}\\)',
    ],
    correctIndex: 0,
    explain: '\\(+\\infty-\\infty\\) ne permet pas de conclure (tout dépend des vitesses de croissance). \\(+\\infty+\\infty=+\\infty\\) et \\(\\tfrac1{+\\infty}=0\\) sont des limites déterminées. Les autres formes indéterminées : \\(0\\times\\infty\\), \\(\\tfrac\\infty\\infty\\), \\(\\tfrac00\\), \\(1^\\infty\\).',
    wrongExplain: {
      1: 'C’est une limite déterminée : deux termes qui tendent vers \\(+\\infty\\) s’additionnent en \\(+\\infty\\).',
      2: 'C’est une limite déterminée valant \\(0\\) : le dénominateur géant écrase le numérateur.',
    },
  },
  {
    id: 'ex132', section: 'limites-reflexes',
    statement: 'Que vaut \\(\\displaystyle\\lim_{n\\to+\\infty}\\left(\\sqrt{n+1}-\\sqrt n\\right)\\) ?',
    options: [
      '\\(0\\)',
      '\\(+\\infty\\)',
      '\\(1\\)',
    ],
    correctIndex: 0,
    explain: 'Forme \\(\\infty-\\infty\\) : on multiplie par la quantité conjuguée. \\(\\sqrt{n+1}-\\sqrt n=\\dfrac{(n+1)-n}{\\sqrt{n+1}+\\sqrt n}=\\dfrac{1}{\\sqrt{n+1}+\\sqrt n}\\to0\\).',
    wrongExplain: {
      1: 'Les deux racines tendent vers \\(+\\infty\\), mais leur différence est très petite : la conjuguée montre que c’est \\(\\tfrac1{2\\sqrt n}\\) environ.',
      2: '\\(1\\) est la différence \\((n+1)-n\\), avant extraction des racines. Elle devient le numérateur de la fraction, qui a un dénominateur géant.',
    },
  },
  {
    id: 'ex133', section: 'limites-reflexes',
    statement: 'Que vaut \\(\\displaystyle\\lim_{n\\to+\\infty}\\frac{3n^2-n+1}{n^2+5}\\) ?',
    options: [
      '\\(3\\)',
      '\\(+\\infty\\)',
      '\\(0\\)',
    ],
    correctIndex: 0,
    explain: 'Forme \\(\\tfrac\\infty\\infty\\) : on factorise le terme dominant en haut et en bas. \\(\\dfrac{n^2(3-\\tfrac1n+\\tfrac1{n^2})}{n^2(1+\\tfrac5{n^2})}\\to\\dfrac31=3\\). Même degré : le quotient tend vers le quotient des coefficients dominants.',
    wrongExplain: {
      1: 'Même degré en haut et en bas : le numérateur ne l’emporte pas sur le dénominateur.',
      2: 'Ce serait le cas si le dénominateur était de degré strictement plus grand. Ici les degrés sont égaux.',
    },
  },
  {
    id: 'ex134', section: 'limites-reflexes',
    statement: 'Que dire de la suite \\(\\left((-2)^n\\right)\\) ?',
    options: [
      'Elle n’a pas de limite',
      'Elle tend vers \\(-\\infty\\)',
      'Elle tend vers \\(0\\)',
    ],
    correctIndex: 0,
    explain: 'Pour une raison \\(\\rho&lt;-1\\), les termes alternent de signe tout en grandissant en valeur absolue : \\(|(-2)^n|\\to+\\infty\\) mais le signe oscille, donc ni \\(+\\infty\\) ni \\(-\\infty\\), ni limite finie.',
    wrongExplain: {
      1: 'Les termes d’indice pair sont positifs (\\(4,16,\\dots\\)) : la suite ne peut pas tendre vers \\(-\\infty\\).',
      2: 'Il faudrait \\(|\\rho|&lt;1\\) pour que \\(\\rho^n\\to0\\). Ici \\(|\\rho|=2&gt;1\\).',
    },
  },
  {
    id: 'ex135', section: 'limites-reflexes',
    statement: 'Que vaut \\(\\displaystyle\\lim_{n\\to+\\infty}n\\,(0{,}9)^n\\) ?',
    options: [
      '\\(0\\)',
      '\\(+\\infty\\)',
      'Il n’y a pas de limite : forme indéterminée donc pas de conclusion possible',
    ],
    correctIndex: 0,
    explain: 'C’est une forme \\(\\infty\\times0\\), mais les croissances comparées tranchent : \\(n^k q^n\\to0\\) pour \\(|q|&lt;1\\) (l’exponentielle décroissante l’emporte sur toute puissance de \\(n\\)).',
    wrongExplain: {
      1: 'Le facteur \\(n\\) croît, mais \\((0{,}9)^n\\) décroît plus vite que n’importe quelle puissance de \\(n\\) ne croît.',
      2: 'Une forme indéterminée se LÈVE avec un théorème (ici croissances comparées) : cela ne signifie pas que la limite n’existe pas.',
    },
  },
  {
    id: 'ex136', section: 'limites-reflexes',
    statement: 'Pour prouver \\(\\dfrac{\\sin n}{n}\\to0\\), quel théorème et quelle majoration utilise-t-on ?',
    options: [
      'Les gendarmes avec \\(\\left|\\dfrac{\\sin n}n\\right|\\leq\\dfrac1n\\)',
      'Suite monotone bornée, car \\(\\sin n\\) est bornée',
      '« \\(\\sin n\\to0\\) donc le quotient tend vers \\(0\\) »',
    ],
    correctIndex: 0,
    explain: '\\(|\\sin n|\\leq1\\) donne \\(\\left|\\dfrac{\\sin n}n\\right|\\leq\\dfrac1n\\to0\\), donc \\(\\dfrac{\\sin n}n\\to0\\) par gendarmes. (Variante : suite bornée × suite qui tend vers \\(0\\).)',
    wrongExplain: {
      1: 'La suite n’est pas monotone (le sinus oscille). Une suite bornée peut diverger : monotonie ET bornée sont nécessaires.',
      2: '\\(\\sin n\\) ne tend PAS vers \\(0\\) : elle n’a pas de limite. Le raisonnement est faux même si le résultat est juste.',
    },
  },
  {
    id: 'ex137', section: 'limites-reflexes',
    statement: 'Que vaut \\(\\displaystyle\\lim_{n\\to+\\infty}\\frac{(-1)^n}{n}\\) ?',
    options: [
      '\\(0\\)',
      'Il n’y a pas de limite, car \\((-1)^n\\) n’en a pas',
      '\\(\\pm1\\)',
    ],
    correctIndex: 0,
    explain: 'Théorème : si \\((u_n)\\) est bornée et \\(v_n\\to0\\), alors \\(u_nv_n\\to0\\). Ici \\(u_n=(-1)^n\\) est bornée par \\(1\\) et \\(v_n=\\tfrac1n\\to0\\). Autre route : \\(\\left|\\tfrac{(-1)^n}n\\right|=\\tfrac1n\\to0\\).',
    wrongExplain: {
      1: 'Un produit n’a pas de limite seulement si ses facteurs « gênent » ensemble : ici l’un est borné et l’autre tend vers \\(0\\), et le résultat tend vers \\(0\\).',
      2: '\\(\\pm1\\) sont les valeurs de \\((-1)^n\\) : on les divise par un \\(n\\) de plus en plus grand, donc on s’approche de \\(0\\).',
    },
  },
  {
    id: 'ex138', section: 'limites-reflexes',
    statement: 'Quelle est la négation de « \\(u_n\\to\\ell\\) », c’est-à-dire de \\(\\forall\\varepsilon&gt;0,\\ \\exists n_0,\\ \\forall n\\geq n_0,\\ |u_n-\\ell|\\leq\\varepsilon\\) ?',
    options: [
      '\\(\\exists\\varepsilon&gt;0,\\ \\forall n_0,\\ \\exists n\\geq n_0,\\ |u_n-\\ell|&gt;\\varepsilon\\)',
      '\\(\\forall\\varepsilon&gt;0,\\ \\exists n_0,\\ \\forall n\\geq n_0,\\ |u_n-\\ell|&gt;\\varepsilon\\)',
      '\\(\\exists\\varepsilon&gt;0,\\ \\exists n_0,\\ \\forall n\\geq n_0,\\ |u_n-\\ell|&gt;\\varepsilon\\)',
    ],
    correctIndex: 0,
    explain: 'Négation : chaque \\(\\forall\\) devient \\(\\exists\\), chaque \\(\\exists\\) devient \\(\\forall\\), et on nie la conclusion (\\(\\leq\\) devient \\(&gt;\\)). On obtient : il existe un \\(\\varepsilon\\) tel que, quel que soit le rang \\(n_0\\), il y a encore des termes à distance \\(&gt;\\varepsilon\\) de \\(\\ell\\) (infiniment souvent).',
    wrongExplain: {
      1: 'Les quantificateurs n’ont pas été échangés : cela dirait que TOUS les termes finissent loin de \\(\\ell\\) pour tout \\(\\varepsilon\\), bien plus fort que la négation.',
      2: 'Le \\(\\forall n_0\\) est devenu un \\(\\exists n_0\\) : cela dirait « à partir d’un certain rang, tous les termes sont loin », plus fort que la négation (qui dit juste « il y en a toujours encore »).',
    },
  },
  {
    id: 'ex139', section: 'limites-reflexes',
    statement: 'Une suite croissante est majorée par \\(2\\). Que peut-on conclure ?',
    options: [
      'Elle converge vers une limite \\(\\ell\\leq2\\) (pas forcément \\(2\\))',
      'Elle converge vers \\(2\\)',
      'On ne peut rien conclure',
    ],
    correctIndex: 0,
    explain: 'Théorème de la limite monotone : croissante et majorée implique convergente, avec \\(\\ell\\leq\\) tout majorant. Contre-exemple pour « \\(=2\\) » : \\(u_n=1-\\tfrac1n\\) est croissante, majorée par \\(2\\), et converge vers \\(1\\).',
    wrongExplain: {
      1: '\\(2\\) est UN majorant, pas forcément le plus petit : \\(1-\\tfrac1n\\) converge vers \\(1&lt;2\\).',
      2: 'On peut conclure : monotone ET bornée du bon côté (croissante majorée) garantit la convergence.',
    },
  },
  {
    id: 'ex140', section: 'limites-reflexes',
    statement: 'La suite définie par \\(u_{n+1}=\\sqrt{2+u_n}\\), \\(u_0=0\\), converge vers \\(\\ell\\). Que vaut \\(\\ell\\) ?',
    options: [
      '\\(2\\)',
      '\\(-1\\)',
      '\\(2\\) ou \\(-1\\), les deux conviennent',
    ],
    correctIndex: 0,
    explain: '\\(f(x)=\\sqrt{2+x}\\) est continue, donc \\(\\ell=f(\\ell)\\) : \\(\\ell^2=2+\\ell\\), soit \\(\\ell^2-\\ell-2=0\\), racines \\(2\\) et \\(-1\\). Tous les \\(u_n\\) sont \\(\\geq0\\) (racines carrées), donc \\(\\ell\\geq0\\) et \\(\\ell=2\\). Réflexe : toujours rejeter la racine qui contredit le signe de la suite.',
    wrongExplain: {
      1: '\\(-1\\) est racine de l’équation de point fixe, mais la suite est positive, donc sa limite l’est aussi (passage à la limite dans \\(u_n\\geq0\\)).',
      2: 'Une suite n’a qu’UNE limite. Les deux racines sont des points fixes possibles, mais une seule est compatible avec \\(u_n\\geq0\\).',
    },
  },
  {
    id: 'ex141', section: 'limites-reflexes',
    statement: 'Si \\(u_n&lt;v_n\\) pour tout \\(n\\), avec \\(u_n\\to\\ell\\) et \\(v_n\\to\\ell\'\\), que peut-on affirmer ?',
    options: [
      '\\(\\ell\\leq\\ell\'\\)',
      '\\(\\ell&lt;\\ell\'\\)',
      '\\(\\ell\\geq\\ell\'\\)',
    ],
    correctIndex: 0,
    explain: 'Le passage à la limite transforme une inégalité stricte en inégalité LARGE. Contre-exemple pour le strict : \\(u_n=\\tfrac1n&lt;v_n=\\tfrac2n\\), mais les deux tendent vers \\(0\\), donc \\(\\ell=\\ell\'\\).',
    wrongExplain: {
      1: 'Le strict ne passe pas à la limite : \\(\\tfrac1n&lt;\\tfrac2n\\) pour tout \\(n\\) mais les deux limites sont égales à \\(0\\).',
      2: 'Le sens est faux : si \\(u_n\\) est toujours plus petit que \\(v_n\\), sa limite ne peut pas être plus grande que celle de \\(v_n\\).',
    },
  },
  {
    id: 'ex142', section: 'synthese-va-pe-lim',
    statement: 'Que vaut \\(\\displaystyle\\lim_{n\\to+\\infty}\\frac{E(nx)}n\\), pour \\(x\\) réel fixé ?',
    options: [
      '\\(x\\)',
      '\\(E(x)\\)',
      '\\(0\\)',
    ],
    correctIndex: 0,
    explain: 'Encadrement : \\(nx-1&lt;E(nx)\\leq nx\\), donc \\(x-\\tfrac1n&lt;\\dfrac{E(nx)}n\\leq x\\). Les deux bornes tendent vers \\(x\\) : gendarmes, la limite est \\(x\\) (pas \\(E(x)\\)).',
    wrongExplain: {
      1: '\\(E(x)\\) est la partie entière de \\(x\\), mais on divise par \\(n\\) la partie entière de \\(nx\\) : cela donne une valeur de plus en plus proche de \\(x\\) lui-même.',
      2: '\\(E(nx)\\) est de l’ordre de \\(nx\\), qu’on divise par \\(n\\) : le quotient ne tend pas vers \\(0\\) sauf si \\(x=0\\).',
    },
  },
  {
    id: 'ex143', section: 'synthese-va-pe-lim',
    statement: 'Si \\(|u_n|\\to0\\), que dire de \\((u_n)\\) ?',
    options: [
      '\\(u_n\\to0\\)',
      'On ne peut rien dire',
      '\\(u_n\\) converge vers \\(0\\) ou vers un autre nombre de même valeur absolue',
    ],
    correctIndex: 0,
    explain: '\\(|u_n-0|=|u_n|\\) : dire que \\(|u_n|\\to0\\) est EXACTEMENT dire que \\(u_n\\to0\\) (même définition avec \\(\\varepsilon\\)). Le \\(0\\) est le seul cas où la réciproque marche, car \\(-0=0\\).',
    wrongExplain: {
      1: 'Au contraire, on peut conclure : \\(||u_n|-0|=|u_n-0|\\), les deux énoncés ont la même définition.',
      2: 'Il n’y a pas d’autre nombre de même valeur absolue que \\(0\\), donc cette formulation n’a pas de sens ici.',
    },
  },
  {
    id: 'ex144', section: 'synthese-va-pe-lim',
    statement: 'Si \\(|u_n|\\to1\\), que peut-on affirmer sur \\((u_n)\\) ?',
    options: [
      'Rien de sûr : par exemple \\(u_n=(-1)^n\\) vérifie \\(|u_n|=1\\) sans avoir de limite',
      '\\(u_n\\to1\\)',
      '\\(u_n\\to1\\) ou \\(u_n\\to-1\\)',
    ],
    correctIndex: 0,
    explain: 'La valeur absolue efface le signe : \\(|u_n|\\to\\ell\\) n’implique pas \\(u_n\\to\\ell\\) quand \\(\\ell\\neq0\\). Contre-exemple : \\((-1)^n\\), de valeur absolue constante \\(1\\), mais sans limite. Réciproque vraie : \\(u_n\\to\\ell\\Rightarrow|u_n|\\to|\\ell|\\).',
    wrongExplain: {
      1: 'Le contre-exemple \\((-1)^n\\) montre que le signe peut osciller.',
      2: 'Le même contre-exemple \\((-1)^n\\) n’a aucune limite : il ne tend ni vers \\(1\\) ni vers \\(-1\\).',
    },
  },
  {
    id: 'ex145', section: 'synthese-va-pe-lim',
    statement: 'Quelle inégalité permet de démontrer que \\(u_n\\to\\ell\\) implique \\(|u_n|\\to|\\ell|\\) ?',
    options: [
      'La seconde inégalité triangulaire : \\(\\big||u_n|-|\\ell|\\big|\\leq|u_n-\\ell|\\)',
      'La première inégalité triangulaire : \\(|u_n+\\ell|\\leq|u_n|+|\\ell|\\)',
      '\\(|x|\\geq x\\)',
    ],
    correctIndex: 0,
    explain: 'Si \\(|u_n-\\ell|\\leq\\varepsilon\\), alors \\(\\big||u_n|-|\\ell|\\big|\\leq|u_n-\\ell|\\leq\\varepsilon\\) : le même rang \\(n_0\\) convient pour \\(|u_n|\\) et \\(|\\ell|\\). C’est la seconde inégalité triangulaire (celle qui contrôle une DIFFÉRENCE de valeurs absolues).',
    wrongExplain: {
      1: 'Elle majore une somme, alors qu’on veut contrôler une différence \\(|u_n|-|\\ell|\\).',
      2: '\\(|x|\\geq x\\) ne relie pas \\(|u_n|-|\\ell|\\) à \\(|u_n-\\ell|\\) : il manque une information sur la différence.',
    },
  },
  {
    id: 'ex146', section: 'synthese-va-pe-lim',
    statement: 'Que vaut \\(\\displaystyle\\lim_{n\\to+\\infty}\\frac{E(\\sqrt n)}{\\sqrt n}\\) ?',
    options: [
      '\\(1\\)',
      '\\(0\\)',
      '\\(+\\infty\\)',
    ],
    correctIndex: 0,
    explain: '\\(\\sqrt n-1&lt;E(\\sqrt n)\\leq\\sqrt n\\), donc \\(1-\\dfrac1{\\sqrt n}&lt;\\dfrac{E(\\sqrt n)}{\\sqrt n}\\leq1\\). Gendarmes : limite \\(1\\). (Même mécanisme que \\(E(x)/x\\to1\\) quand \\(x\\to+\\infty\\).)',
    wrongExplain: {
      1: 'Numérateur et dénominateur sont du même ordre : \\(E(\\sqrt n)\\) ne diffère de \\(\\sqrt n\\) que de moins de \\(1\\), ce qui devient négligeable.',
      2: 'C’est un quotient de deux quantités équivalentes, donc il ne tend ni vers \\(0\\) ni vers \\(+\\infty\\).',
    },
  },
  {
    id: 'ex147', section: 'synthese-va-pe-lim',
    statement: 'Résoudre \\(|E(x)|=2\\).',
    options: [
      '\\(S=[-2,-1[\\ \\cup\\ [2,3[\\)',
      '\\(S=\\{-2,2\\}\\)',
      '\\(S=]-3,-2]\\ \\cup\\ [2,3[\\)',
    ],
    correctIndex: 0,
    explain: '\\(|E(x)|=2\\Leftrightarrow E(x)=2\\) ou \\(E(x)=-2\\). \\(E(x)=2\\Leftrightarrow x\\in[2,3[\\) et \\(E(x)=-2\\Leftrightarrow x\\in[-2,-1[\\) (la partie entière « tronque vers le bas », même pour un négatif).',
    wrongExplain: {
      1: '\\(\\{-2,2\\}\\) serait la solution de \\(|x|=2\\). Ici c’est \\(E(x)\\) qui vaut \\(\\pm2\\) : tout un intervalle de réels donne la même partie entière.',
      2: '\\(E(x)=-2\\) signifie \\(-2\\leq x&lt;-1\\) et non \\(-3&lt;x\\leq-2\\) : la partie entière est la borne INFÉRIEURE de la marche.',
    },
  },
  {
    id: 'ex148', section: 'synthese-va-pe-lim',
    statement: 'Si \\(|x-3|&lt;\\tfrac12\\), que vaut \\(E(x)\\) ?',
    options: [
      '\\(2\\) ou \\(3\\), selon la position de \\(x\\)',
      '\\(3\\)',
      '\\(2\\)',
    ],
    correctIndex: 0,
    explain: '\\(|x-3|&lt;\\tfrac12\\Leftrightarrow x\\in]2{,}5;3{,}5[\\). Pour \\(x\\in]2{,}5;3[\\), \\(E(x)=2\\) ; pour \\(x\\in[3;3{,}5[\\), \\(E(x)=3\\). Une valeur approchée à \\(\\tfrac12\\) près ne détermine pas la partie entière : elle peut basculer en traversant l’entier.',
    wrongExplain: {
      1: '\\(3\\) n’est vrai que pour \\(x\\geq3\\). Avec \\(x=2{,}8\\), \\(|x-3|=0{,}2&lt;\\tfrac12\\) et pourtant \\(E(x)=2\\).',
      2: '\\(2\\) n’est vrai que pour \\(x&lt;3\\). Avec \\(x=3{,}2\\), \\(E(x)=3\\) alors que \\(|x-3|&lt;\\tfrac12\\).',
    },
  },
  {
    id: 'ex149', section: 'synthese-va-pe-lim',
    statement: 'Que vaut \\(\\displaystyle\\lim_{n\\to+\\infty}\\left|\\,n-\\sqrt{n^2+1}\\,\\right|\\) ?',
    options: [
      '\\(0\\)',
      '\\(1\\)',
      '\\(+\\infty\\)',
    ],
    correctIndex: 0,
    explain: 'Quantité conjuguée : \\(\\sqrt{n^2+1}-n=\\dfrac{(n^2+1)-n^2}{\\sqrt{n^2+1}+n}=\\dfrac1{\\sqrt{n^2+1}+n}\\to0\\). La valeur absolue (ici \\(\\sqrt{n^2+1}&gt;n\\) donc sans effet) ne change rien : \\(|v_n|\\to|0|=0\\).',
    wrongExplain: {
      1: '\\(1\\) est le numérateur après multiplication par la conjuguée. Il est divisé par un dénominateur qui tend vers \\(+\\infty\\).',
      2: 'Les deux termes tendent vers \\(+\\infty\\), mais leur différence tend vers \\(0\\) : on reconnaît la forme \\(\\infty-\\infty\\) qu’on lève par la conjuguée.',
    },
  },
];

const SECTIONS = [
  {
    id: 'intervalles-inegalites', title: '§1 — INTERVALLES, INÉGALITÉS',
    cours: 'Intervalle de \\(\\mathbb{R}\\) : entre deux éléments de \\(I\\), tout réel intermédiaire est aussi dans \\(I\\)<br>\\(\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{D}\\subset\\mathbb{Q}\\subset\\mathbb{R}\\subset\\mathbb{C}\\)<br>\\(A\\leq B \\Leftrightarrow A-B\\leq0\\) : réflexe de base, à privilégier sur « isoler \\(x\\) » (qui ne marche qu’en degré 1)<br>Produit en croix (\\(a,b\\geq0\\), \\(c,d&gt;0\\)) : \\(\\dfrac{a}{c}&lt;\\dfrac{b}{d}\\Leftrightarrow ad&lt;bc\\)<br><span class="math">Composition avec une fonction monotone</span> sur un intervalle \\(I\\) : \\(f\\) strictement croissante \\(\\Rightarrow a&lt;b\\Leftrightarrow f(a)&lt;f(b)\\) ; \\(f\\) strictement décroissante \\(\\Rightarrow a&lt;b\\Leftrightarrow f(a)&gt;f(b)\\)<br>Piège : \\(\\mathbb{R}^*\\) n’est PAS un intervalle — la règle de composition par une fonction monotone (ex. l’inverse) ne s’y applique pas globalement',
  },
  {
    id: 'partie-entiere-valeur-absolue', title: '§2 — PARTIE ENTIÈRE ET VALEUR ABSOLUE',
    cours: '<span class="math">Partie entière</span> \\(E(x)\\) : unique entier \\(n\\) tel que \\(n\\leq x&lt;n+1\\) ; fonction croissante (pas strictement) sur \\(\\mathbb{R}\\)<br>\\(E(x)+E(y)\\leq E(x+y)\\leq E(x)+E(y)+1\\) (pas toujours égal, ex. \\(E(0.6)+E(0.7)=0\\neq E(1.3)=1\\)) ; pour \\(x,y&gt;0\\) : \\(E(x)E(y)\\leq E(xy)\\)<br><span class="math">Valeur absolue</span> \\(|x|=\\sqrt{x^2}\\) ; \\(|\\lambda x|=|\\lambda||x|\\) ; \\(|x|\\geq x\\) toujours<br><span class="math">Inégalité triangulaire</span> \\(|x+y|\\leq|x|+|y|\\) (égalité \\(\\Leftrightarrow xy\\geq0\\)) ; deuxième inégalité triangulaire \\(\\big||x|-|y|\\big|\\leq|x+y|\\)<br>\\(|u|&gt;R\\) (\\(R&gt;0\\)) \\(\\Leftrightarrow u&gt;R\\) ou \\(u&lt;-R\\) ; \\(|x-a|\\leq\\varepsilon\\) : \\(a\\) est une approximation de \\(x\\) « à \\(\\varepsilon\\) près »',
  },
  {
    id: 'croissances-comparees', title: '§3 — CROISSANCES COMPARÉES, PUISSANCES RÉELLES',
    cours: '\\(\\lim_{x\\to-\\infty}e^x=0\\), \\(\\lim_{x\\to+\\infty}e^x=+\\infty\\)<br><span class="math">Croissances comparées</span> : \\(\\forall n, x^ne^{-x}\\to0\\) et \\(\\dfrac{\\ln x}{x^n}\\to0\\) en \\(+\\infty\\) ; \\(x^n\\ln x\\to0\\) en \\(0^+\\)<br>Mnémonique (en \\(+\\infty\\)) : \\((\\ln x)^\\beta \\ll x^\\gamma \\ll e^x\\) — l’exponentielle l’emporte toujours sur toute puissance, qui l’emporte toujours sur le logarithme<br>\\(\\log(x)=\\dfrac{\\ln x}{\\ln10}\\) (logarithme décimal)<br><span class="math">Exposant réel</span> : \\(a^x=e^{x\\ln a}\\) (\\(a&gt;0\\)) ; \\(x^\\alpha=e^{\\alpha\\ln x}\\) (\\(x&gt;0\\)), dérivable sur \\(\\mathbb{R}_+^*\\) avec \\((x^\\alpha)\'=\\alpha x^{\\alpha-1}\\), croissante si \\(\\alpha&gt;0\\), décroissante si \\(\\alpha&lt;0\\)<br>Piège : ces définitions supposent une base \\(&gt;0\\) — les identités de puissances ne se généralisent pas à une base négative',
  },
  {
    id: 'methodes-inequations', title: '§4 — MÉTHODES : RÉSOUDRE DES INÉQUATIONS',
    cours: 'Trinôme \\(ax^2+bx+c\\) : signe de \\(a\\) à l’extérieur des racines (si \\(\\Delta&gt;0\\)), signe opposé entre elles<br>Fraction rationnelle : TOUT ramener d’un côté, étudier le signe du quotient par un tableau — ne jamais multiplier par un dénominateur de signe inconnu<br>Inéquation avec racine carrée (\\(\\sqrt{\\cdots}&lt;g(x)\\)) : vérifier D’ABORD que \\(g(x)&gt;0\\) (sinon aucune solution), SEULEMENT ENSUITE élever au carré<br>Symétrie \\(x\\leftrightarrow-x\\) : si l’inéquation ne contient que des termes PAIRS en \\(x\\) (carrés, valeurs absolues), son ensemble de solutions est symétrique par rapport à 0<br>Encadrer une différence/un produit : toujours repasser par l’encadrement de chaque terme SÉPARÉMENT (attention au changement de signe qui inverse l’ordre des bornes)<br>Réécrire une fraction en « constante + reste borné entre 0 et 1 » pour l’encadrer facilement',
  },
  {
    id: 'synthese-prelim', title: '§5 — SYNTHÈSE : QUESTIONS COMBINÉES',
    cours: 'Mélange volontaire des §1 à §4 — chaque question combine au moins deux techniques vues séparément plus haut (encadrement + limite, composition par une fonction monotone + cas particulier, etc.), difficulté croissante au fil des questions.',
  },
  {
    id: 'valeur-absolue-td', title: '§6 — VALEUR ABSOLUE : MÉTHODES DE TD',
    cours: '<span class="math">|x|</span> \\(=\\sqrt{x^2}\\) ; \\(|x|\\geq0\\) toujours (un second membre négatif dans \\(|u|&lt;c\\) donne \\(\\emptyset\\))<br><span class="math">|u|&lt;R</span> \\(\\Leftrightarrow -R&lt;u&lt;R\\) (un intervalle centré) ; <span class="math">|u|&gt;R</span> \\(\\Leftrightarrow u&gt;R\\) ou \\(u&lt;-R\\) (deux morceaux à l’extérieur)<br><span class="math">|A|=|B|</span> \\(\\Leftrightarrow A=B\\) ou \\(A=-B\\) ; <span class="math">|A|\\leq|B|</span> \\(\\Leftrightarrow A^2\\leq B^2\\) (les deux côtés sont positifs)<br><span class="math">Inégalités triangulaires</span> \\(\\big||x|-|y|\\big|\\leq|x+y|\\leq|x|+|y|\\) ; égalité à droite si \\(xy\\geq0\\)<br>« ET » = intersection, « OU » = réunion : dessiner les intervalles sur une droite<br>Pour encadrer un quotient : majorer le numérateur ET minorer le dénominateur (et inversement pour minorer)',
  },
  {
    id: 'partie-entiere-td', title: '§7 — PARTIE ENTIÈRE : MÉTHODES DE TD',
    cours: '<span class="math">Partie entière</span> \\(E(x)\\) : \\(E(x)\\leq x&lt;E(x)+1\\), soit \\(x-1&lt;E(x)\\leq x\\)<br><span class="math">Partie fractionnaire</span> \\(\\{x\\}=x-E(x)\\in[0,1[\\) ; réflexe : écrire \\(x=E(x)+\\{x\\}\\) puis discuter selon la position de \\(\\{x\\}\\)<br>\\(E(x+y)=E(x)+E(y)\\) si \\(\\{x\\}+\\{y\\}&lt;1\\), \\(=E(x)+E(y)+1\\) sinon<br>\\(E(2x)=2E(x)\\) si \\(\\{x\\}&lt;\\tfrac12\\), \\(2E(x)+1\\) sinon ; \\(E(x+\\tfrac12)=E(x)\\Leftrightarrow\\{x\\}&lt;\\tfrac12\\)<br>Pour \\(x\\notin\\mathbb{Z}\\) : \\(E(-x)=-E(x)-1\\) et \\(\\lceil x\\rceil=E(x)+1\\) ; en général \\(\\lceil x\\rceil=-E(-x)\\)<br>\\(E\\!\\left(\\dfrac{E(kx)}k\\right)=E(x)\\) pour \\(k\\in\\mathbb{N}^*\\)',
  },
  {
    id: 'limites-reflexes', title: '§8 — LIMITES DE SUITES : CALCULS ET RÉFLEXES',
    cours: '<span class="math">Formes indéterminées</span> : \\(\\infty-\\infty\\), \\(0\\times\\infty\\), \\(\\tfrac\\infty\\infty\\), \\(\\tfrac00\\), \\(1^\\infty\\) — on les LÈVE (conjuguée, factorisation du dominant, croissances comparées), elles ne disent pas « pas de limite »<br><span class="math">Géométrique</span> \\(\\rho^n\\) : \\(\\to0\\) si \\(|\\rho|&lt;1\\), \\(\\to+\\infty\\) si \\(\\rho&gt;1\\), pas de limite si \\(\\rho\\leq-1\\)<br><span class="math">Gendarmes</span> : \\(|u_n-\\ell|\\leq v_n\\to0\\Rightarrow u_n\\to\\ell\\) ; <span class="math">bornée × \\(\\to0\\)</span> \\(\\Rightarrow\\to0\\)<br><span class="math">Limite monotone</span> : croissante majorée converge, avec \\(\\ell\\leq\\) tout majorant<br><span class="math">Point fixe</span> : \\(u_{n+1}=f(u_n)\\), \\(f\\) continue, \\(u_n\\to\\ell\\Rightarrow f(\\ell)=\\ell\\) (puis rejeter les racines incompatibles avec le signe/domaine)<br><span class="math">Passage à la limite</span> : \\(u_n&lt;v_n\\Rightarrow\\ell\\leq\\ell\'\\) (le strict devient large)',
  },
  {
    id: 'synthese-va-pe-lim', title: '§9 — SYNTHÈSE : VALEUR ABSOLUE, PARTIE ENTIÈRE, LIMITES',
    cours: 'Mélange volontaire des trois sections précédentes (valeur absolue, partie entière, limites de suites) : chaque question combine au moins deux techniques — encadrement par la partie entière + gendarmes, valeur absolue + limite, partie entière + équation, etc. Difficulté croissante.',
  },
  {
    id: 'limites', title: '§10 — LIMITES',
    cours: '\\(\\lim_{x \\to a} f(x) = l\\) : \\(\\forall \\varepsilon&gt;0, \\exists \\alpha&gt;0, |x-a|&lt;\\alpha \\Rightarrow |f(x)-l|&lt;\\varepsilon\\)<br>Limite finie en \\(a\\) \\(\\Rightarrow\\) \\(f\\) localement bornée<br><span class="math">Théorème des gendarmes</span> (encadrement)<br>\\(f \\mathop{\\sim}\\limits_{a} g \\Leftrightarrow \\lim_{x \\to a} f/g = 1\\), et alors mêmes limites',
  },
  {
    id: 'continuite', title: '§11 — CONTINUITÉ',
    cours: '\\(f\\) continue en \\(a\\) \\(\\Leftrightarrow\\) \\(\\lim_{x \\to a} f(x) = f(a)\\)<br><span class="math">Théorème des valeurs intermédiaires</span> : \\(f\\) continue sur \\([a,b]\\), \\(y\\) entre \\(f(a)\\) et \\(f(b)\\) \\(\\Rightarrow\\) \\(\\exists c, f(c)=y\\)<br>\\(f\\) continue sur \\([a,b]\\) \\(\\Rightarrow\\) \\(f\\) bornée et atteint ses bornes',
  },
  {
    id: 'derivation', title: '§12 — DÉRIVATION',
    cours: '\\(f\\) dérivable en \\(a\\) \\(\\Leftrightarrow\\) \\(\\lim_{x \\to a} \\dfrac{f(x)-f(a)}{x-a}\\) existe\\(= f\'(a)\\)<br>Dérivable \\(\\Rightarrow\\) continue (réciproque fausse : \\(|x|\\) en 0)<br><span class="math">Théorème de Rolle</span> : \\(f(a)=f(b)\\) \\(\\Rightarrow\\) \\(\\exists c \\in ]a,b[, f\'(c)=0\\)<br><span class="math">TAF</span> : \\(f(b)-f(a) = (b-a)f\'(c)\\)',
  },
  {
    id: 'usuelles', title: '§13 — FONCTIONS USUELLES (ARCCOS, ARCSIN, ARCTAN)',
    cours: '<span class="math">Arccos</span> \\(\\arccos : [-1,1] \\to [0,\\pi]\\)<br><span class="math">Arcsin</span> \\(\\arcsin : [-1,1] \\to [-\\pi/2,\\pi/2]\\)<br><span class="math">Arctan</span> \\(\\arctan : \\mathbb{R} \\to \\ ]-\\pi/2,\\pi/2[\\)<br>\\(\\arccos x + \\arcsin x = \\pi/2\\)<br>\\((\\arctan)\'(x) = \\dfrac{1}{1+x^2}\\)',
  },
  {
    id: 'dl', title: '§14 — DÉVELOPPEMENTS LIMITÉS',
    cours: '<span class="math">Taylor-Young</span> : \\(f(t) = \\displaystyle\\sum_{k=0}^{n} \\dfrac{f^{(k)}(a)}{k!}(t-a)^k + o((t-a)^n)\\)<br>DL usuels en 0 : \\(e^x = 1+x+\\dfrac{x^2}{2}+\\cdots\\), \\(\\sin x = x - \\dfrac{x^3}{6}+\\cdots\\), \\(\\cos x = 1 - \\dfrac{x^2}{2}+\\cdots\\)<br>DL \\(\\to\\) équivalent : premier terme non nul du DL',
  },
  {
    id: 'integration', title: '§15 — INTÉGRATION SUR UN SEGMENT',
    cours: '\\(f\\) continue sur \\([a,b]\\) \\(\\Rightarrow\\) \\(F(x)=\\int_a^x f(t)\\,dt\\) est \\(C^1\\) et \\(F\'=f\\)<br>\\(\\int_a^b f(t)\\,dt = \\Phi(b)-\\Phi(a)\\) où \\(\\Phi\\) est une primitive de \\(f\\)<br><span class="math">Relation de Chasles</span> : \\(\\int_u^v f = \\int_u^w f + \\int_w^v f\\)',
  },
  {
    id: 'primitives', title: '§16 — PRIMITIVES',
    cours: 'Primitive de \\(x^\\alpha\\) (\\(\\alpha \\neq -1\\)) : \\(\\dfrac{x^{\\alpha+1}}{\\alpha+1}\\) ; primitive de \\(1/x\\) : \\(\\ln|x|\\)<br><span class="math">Changement de variable</span> : \\(x=\\varphi(t)\\), \\(dx = \\varphi\'(t)\\,dt\\)<br>Deux primitives d’une même fonction diffèrent d’une constante',
  },
  {
    id: 'suites-cours', title: '§17 — SUITES : DÉFINITIONS DU COURS (CHARRON)',
    cours: 'Bornée : \\(\\exists A&gt;0,\\ \\forall n,\\ |u_n|\\leq A\\) (le \\(A\\) d’abord, pour tous les \\(n\\))<br><span class="math">Convergence</span> : \\(\\forall\\varepsilon&gt;0,\\ \\exists n_0,\\ \\forall n\\geq n_0,\\ |u_n-\\ell|\\leq\\varepsilon\\) (le \\(\\varepsilon\\) d’abord, puis \\(n_0\\))<br>Limite unique ; bornée × tend vers 0 donne 0 ; \\(u_n&gt;0\\) et \\(u_n\\to\\ell\\) donnent \\(\\ell\\geq0\\)<br><span class="math">Gendarmes</span>, <span class="math">limite monotone</span>, <span class="math">adjacentes</span>, <span class="math">point fixe</span> \\(f(\\ell)=\\ell\\) (\\(f\\) continue)<br><span class="math">Suites extraites</span> : \\(u_n\\to\\ell\\) donne toute extraite \\(\\to\\ell\\) ; deux extraites en désaccord donnent divergence',
  },
  {
    id: 'suites', title: '§18 — SUITES : THÉORÈMES DE LA FICHE MÉMO',
    cours: '<span class="math">Suite monotone bornée</span> \\(\\Rightarrow\\) converge ; monotone non bornée \\(\\Rightarrow\\) diverge<br>Géométrique de raison \\(\\rho\\) : converge \\(\\Leftrightarrow |\\rho|&lt;1\\) ou \\(\\rho=1\\)<br>Sous-suites de limites différentes \\(\\Rightarrow\\) divergence ; \\((u_{2n})\\) et \\((u_{2n+1})\\) vers la même limite \\(\\Rightarrow\\) convergence<br><span class="math">Gendarmes</span> : \\(v_n\\leq u_n\\leq w_n\\), \\(v_n,w_n\\to l\\) \\(\\Rightarrow\\) \\(u_n\\to l\\)<br><span class="math">Suites adjacentes</span> : \\(u_n\\) croissante, \\(v_n\\) décroissante, \\(v_n-u_n\\to0\\) \\(\\Rightarrow\\) même limite<br>\\(u_n=o(v_n)\\Leftrightarrow u_n/v_n\\to0\\) ; \\(u_n\\sim v_n\\Leftrightarrow u_n/v_n\\to1\\) (même nature)<br>Croissances comparées : exponentielle \\(\\gg\\) puissance \\(\\gg\\) logarithme',
  },
  {
    id: 'series', title: '§19 — SÉRIES NUMÉRIQUES',
    cours: 'Divergence grossière : \\(u_n\\not\\to0 \\Rightarrow \\sum u_n\\) diverge (condition nécessaire, PAS suffisante)<br><span class="math">Série géométrique</span> \\(\\sum\\rho^n\\) : converge \\(\\Leftrightarrow|\\rho|&lt;1\\), somme \\(=\\dfrac{1}{1-\\rho}\\)<br><span class="math">Série de Riemann</span> \\(\\sum1/n^\\alpha\\) : converge \\(\\Leftrightarrow\\alpha&gt;1\\)<br><span class="math">Séries alternées</span> : \\(u_n\\to0\\) ET \\((u_n)\\) décroissante \\(\\Rightarrow\\) convergence<br>Convergence absolue (\\(\\sum|u_n|\\) CV) \\(\\Rightarrow\\) convergence simple<br><span class="math">d\'Alembert</span> : \\(|u_{n+1}/u_n|\\to L\\) — \\(L&lt;1\\) CV, \\(L&gt;1\\) DV, \\(L=1\\) indéterminé<br><span class="math">Cauchy</span> : \\(\\sqrt[n]{u_n}\\to L\\), même conclusion selon \\(L\\)<br>Comparaison (termes positifs) : \\(0\\leq u_n\\leq v_n\\), \\(\\sum v_n\\) CV \\(\\Rightarrow\\) \\(\\sum u_n\\) CV',
  },
];

initFiche({ STATE_KEY: CHAPTER_STATE_KEYS.analyse, CHAPTER_ID: 'analyse', EXERCISES, SECTIONS });
