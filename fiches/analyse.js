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
    id: 'limites', title: '§6 — LIMITES',
    cours: '\\(\\lim_{x \\to a} f(x) = l\\) : \\(\\forall \\varepsilon&gt;0, \\exists \\alpha&gt;0, |x-a|&lt;\\alpha \\Rightarrow |f(x)-l|&lt;\\varepsilon\\)<br>Limite finie en \\(a\\) \\(\\Rightarrow\\) \\(f\\) localement bornée<br><span class="math">Théorème des gendarmes</span> (encadrement)<br>\\(f \\mathop{\\sim}\\limits_{a} g \\Leftrightarrow \\lim_{x \\to a} f/g = 1\\), et alors mêmes limites',
  },
  {
    id: 'continuite', title: '§7 — CONTINUITÉ',
    cours: '\\(f\\) continue en \\(a\\) \\(\\Leftrightarrow\\) \\(\\lim_{x \\to a} f(x) = f(a)\\)<br><span class="math">Théorème des valeurs intermédiaires</span> : \\(f\\) continue sur \\([a,b]\\), \\(y\\) entre \\(f(a)\\) et \\(f(b)\\) \\(\\Rightarrow\\) \\(\\exists c, f(c)=y\\)<br>\\(f\\) continue sur \\([a,b]\\) \\(\\Rightarrow\\) \\(f\\) bornée et atteint ses bornes',
  },
  {
    id: 'derivation', title: '§8 — DÉRIVATION',
    cours: '\\(f\\) dérivable en \\(a\\) \\(\\Leftrightarrow\\) \\(\\lim_{x \\to a} \\dfrac{f(x)-f(a)}{x-a}\\) existe\\(= f\'(a)\\)<br>Dérivable \\(\\Rightarrow\\) continue (réciproque fausse : \\(|x|\\) en 0)<br><span class="math">Théorème de Rolle</span> : \\(f(a)=f(b)\\) \\(\\Rightarrow\\) \\(\\exists c \\in ]a,b[, f\'(c)=0\\)<br><span class="math">TAF</span> : \\(f(b)-f(a) = (b-a)f\'(c)\\)',
  },
  {
    id: 'usuelles', title: '§9 — FONCTIONS USUELLES (ARCCOS, ARCSIN, ARCTAN)',
    cours: '\\(\\arccos : [-1,1] \\to [0,\\pi]\\), \\(\\arcsin : [-1,1] \\to [-\\pi/2,\\pi/2]\\), \\(\\arctan : \\mathbb{R} \\to \\ ]-\\pi/2,\\pi/2[\\)<br>\\(\\arccos x + \\arcsin x = \\pi/2\\)<br>\\((\\arctan)\'(x) = \\dfrac{1}{1+x^2}\\)',
  },
  {
    id: 'dl', title: '§10 — DÉVELOPPEMENTS LIMITÉS',
    cours: '<span class="math">Taylor-Young</span> : \\(f(t) = \\displaystyle\\sum_{k=0}^{n} \\dfrac{f^{(k)}(a)}{k!}(t-a)^k + o((t-a)^n)\\)<br>DL usuels en 0 : \\(e^x = 1+x+\\dfrac{x^2}{2}+\\cdots\\), \\(\\sin x = x - \\dfrac{x^3}{6}+\\cdots\\), \\(\\cos x = 1 - \\dfrac{x^2}{2}+\\cdots\\)<br>DL \\(\\to\\) équivalent : premier terme non nul du DL',
  },
  {
    id: 'integration', title: '§11 — INTÉGRATION SUR UN SEGMENT',
    cours: '\\(f\\) continue sur \\([a,b]\\) \\(\\Rightarrow\\) \\(F(x)=\\int_a^x f(t)\\,dt\\) est \\(C^1\\) et \\(F\'=f\\)<br>\\(\\int_a^b f(t)\\,dt = \\Phi(b)-\\Phi(a)\\) où \\(\\Phi\\) est une primitive de \\(f\\)<br><span class="math">Relation de Chasles</span> : \\(\\int_u^v f = \\int_u^w f + \\int_w^v f\\)',
  },
  {
    id: 'primitives', title: '§12 — PRIMITIVES',
    cours: 'Primitive de \\(x^\\alpha\\) (\\(\\alpha \\neq -1\\)) : \\(\\dfrac{x^{\\alpha+1}}{\\alpha+1}\\) ; primitive de \\(1/x\\) : \\(\\ln|x|\\)<br><span class="math">Changement de variable</span> : \\(x=\\varphi(t)\\), \\(dx = \\varphi\'(t)\\,dt\\)<br>Deux primitives d’une même fonction diffèrent d’une constante',
  },
  {
    id: 'suites', title: '§13 — SUITES',
    cours: '<span class="math">Suite monotone bornée</span> \\(\\Rightarrow\\) converge ; monotone non bornée \\(\\Rightarrow\\) diverge<br>Géométrique de raison \\(\\rho\\) : converge \\(\\Leftrightarrow |\\rho|&lt;1\\) ou \\(\\rho=1\\)<br>Sous-suites de limites différentes \\(\\Rightarrow\\) divergence ; \\((u_{2n})\\) et \\((u_{2n+1})\\) vers la même limite \\(\\Rightarrow\\) convergence<br><span class="math">Gendarmes</span> : \\(v_n\\leq u_n\\leq w_n\\), \\(v_n,w_n\\to l\\) \\(\\Rightarrow\\) \\(u_n\\to l\\)<br><span class="math">Suites adjacentes</span> : \\(u_n\\) croissante, \\(v_n\\) décroissante, \\(v_n-u_n\\to0\\) \\(\\Rightarrow\\) même limite<br>\\(u_n=o(v_n)\\Leftrightarrow u_n/v_n\\to0\\) ; \\(u_n\\sim v_n\\Leftrightarrow u_n/v_n\\to1\\) (même nature)<br>Croissances comparées : exponentielle \\(\\gg\\) puissance \\(\\gg\\) logarithme',
  },
  {
    id: 'series', title: '§14 — SÉRIES NUMÉRIQUES',
    cours: 'Divergence grossière : \\(u_n\\not\\to0 \\Rightarrow \\sum u_n\\) diverge (condition nécessaire, PAS suffisante)<br><span class="math">Série géométrique</span> \\(\\sum\\rho^n\\) : converge \\(\\Leftrightarrow|\\rho|&lt;1\\), somme \\(=\\dfrac{1}{1-\\rho}\\)<br><span class="math">Série de Riemann</span> \\(\\sum1/n^\\alpha\\) : converge \\(\\Leftrightarrow\\alpha&gt;1\\)<br><span class="math">Séries alternées</span> : \\(u_n\\to0\\) ET \\((u_n)\\) décroissante \\(\\Rightarrow\\) convergence<br>Convergence absolue (\\(\\sum|u_n|\\) CV) \\(\\Rightarrow\\) convergence simple<br><span class="math">d\'Alembert</span> : \\(|u_{n+1}/u_n|\\to L\\) — \\(L&lt;1\\) CV, \\(L&gt;1\\) DV, \\(L=1\\) indéterminé<br><span class="math">Cauchy</span> : \\(\\sqrt[n]{u_n}\\to L\\), même conclusion selon \\(L\\)<br>Comparaison (termes positifs) : \\(0\\leq u_n\\leq v_n\\), \\(\\sum v_n\\) CV \\(\\Rightarrow\\) \\(\\sum u_n\\) CV',
  },
];

initFiche({ STATE_KEY: CHAPTER_STATE_KEYS.analyse, CHAPTER_ID: 'analyse', EXERCISES, SECTIONS });
