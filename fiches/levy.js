/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/levy.js
   Fiche RÉFLEXES LÉVY — séances du vendredi soir avec M. Lévy,
   indépendantes du programme officiel des autres chapitres : des
   réflexes de rédaction/calcul que M. Lévy fait travailler à Pierre
   en tête-à-tête (discours formel, astuces de calcul récurrentes,
   pièges de rédaction relevés en direct sur ses propres copies).

   Source : deux docs Drive rédigés par Pierre à partir de ces
   séances — « Fiches Lévy — Réflexes à savoir par cœur » (Fiche 0 à
   5 : discours formel, limite ε/≤ε, quantité conjuguée, majoration
   de fraction, fonction = ensemble de couples, règle des entiers
   a>b⇒a≥b+1) et « Fiches Lévy — Partie 2 : tableau Miro » (Fiche 6 et
   7, déchiffrées du tableau Miro des séances : image d'un intervalle
   par une fonction continue — corrigé en direct par M. Lévy, « TROP
   RAPIDE » — et les deux écritures d'ensemble type-condition/
   forme-type). Demande explicite de Pierre (14/11/2026) : « ajoute
   une catégorie chapitre réflexes M. Lévy avec des notions qu'il me
   fait travailler ».

   QCM à 3 réponses, wrongExplain pour chaque option fausse (convention
   du 21/09/2026). Section finale §9 « synthèse » : questions qui
   combinent explicitement deux fiches entre elles (convention du
   21/10/2026 pour tout nouveau contenu — clore un bloc de sections
   par une synthèse qui recombine les techniques déjà vues), ici
   reprise des liens que les docs sources signalent déjà eux-mêmes
   (ex. Fiche 3 réutilise Fiche 2 ; Fiche 6 réutilise Fiche 4).

   &lt;/&gt; partout où `<`/`>` est un signe (jamais le caractère brut —
   voir CLAUDE.md, convention du 22/10/2026 : un `<` brut est avalé
   par le parseur HTML avant que KaTeX n'existe). Fiches à compléter
   après chaque nouvelle séance avec M. Lévy, sur demande explicite. */

const EXERCISES = [
  // ---------- §1 — Fiche 0 : le discours formel ----------
  {
    id: 'ex1', section: 'discours-formel',
    statement: 'Après avoir écrit « Soit \\(\\varepsilon&gt;0\\) », quel est le statut de \\(\\varepsilon\\) dans la suite de la démonstration ?',
    options: [
      '\\(\\varepsilon\\) est désormais fixé : on peut raisonner sur lui comme un nombre donné, il n’y a plus de \\(\\forall\\) devant lui',
      '\\(\\varepsilon\\) reste quantifié universellement, comme si le \\(\\forall\\) était encore explicite à chaque ligne',
      '\\(\\varepsilon\\) devient un paramètre libre qu’on peut re-choisir à n’importe quel moment plus loin dans la preuve',
    ],
    correctIndex: 0,
    explain: '« Soit \\(\\varepsilon&gt;0\\) » fixe \\(\\varepsilon\\) : la suite du raisonnement porte sur CE \\(\\varepsilon\\) précis, pas sur tous les \\(\\varepsilon\\) à la fois — c’est en relisant la preuve de bout en bout qu’on voit qu’elle marche pour n’importe quel \\(\\varepsilon\\), donc qu’on a bien montré le \\(\\forall\\).',
    wrongExplain: {
      1: 'Le \\(\\forall\\) a déjà été « consommé » par le mot « Soit » : réécrire le \\(\\forall\\) à chaque ligne reviendrait à ne jamais fixer \\(\\varepsilon\\), et donc à ne jamais pouvoir calculer sur lui.',
      2: 'Une fois fixé par « Soit », \\(\\varepsilon\\) ne doit plus être changé — c’est justement la différence entre « fixer une variable » et introduire un paramètre encore libre.',
    },
  },
  {
    id: 'ex2', section: 'discours-formel',
    statement: 'Pour démontrer un énoncé qui commence par \\(\\exists N\\) (par exemple « \\(\\exists N\\in\\mathbb{N}\\), … »), quel réflexe de rédaction appliquer ?',
    options: [
      'Donner explicitement \\(N\\) : écrire « Posons \\(N=\\ldots\\) » avec une valeur ou une formule précise',
      'Affirmer que \\(N\\) existe, sans donner sa valeur ni sa formule',
      'Majorer directement l’expression visée sans jamais introduire de nom pour \\(N\\)',
    ],
    correctIndex: 0,
    explain: 'Montrer un \\(\\exists\\), c’est exhiber l’objet : on écrit « Posons \\(N=\\ldots\\) » avec une valeur concrète (un entier, une formule en fonction de \\(\\varepsilon\\)…), puis on vérifie qu’elle convient.',
    wrongExplain: {
      1: 'Affirmer l’existence sans la construire n’est pas une démonstration — il faut que \\(N\\) soit identifiable, pas juste supposé exister.',
      2: 'Sans nommer \\(N\\), impossible de vérifier ensuite qu’il convient (par exemple que \\(n\\geq N\\) entraîne bien l’inégalité voulue) — le nommer est une étape obligatoire.',
    },
  },
  {
    id: 'ex3', section: 'discours-formel',
    statement: 'Entre deux AFFIRMATIONS (deux propositions logiques, par exemple « \\(n\\geq N\\) » et « \\(|u_n-\\ell|&lt;\\varepsilon\\) »), quel signe relie l’une à l’autre ?',
    options: ['\\(\\Rightarrow\\) (ou \\(\\Leftrightarrow\\))', '\\(\\leq\\)', '\\(=\\)'],
    correctIndex: 0,
    explain: '\\(\\Rightarrow\\) et \\(\\Leftrightarrow\\) relient des PROPOSITIONS entre elles (« ceci entraîne cela »). \\(\\leq\\) et \\(=\\) relient des NOMBRES ou des expressions — jamais deux affirmations.',
    wrongExplain: {
      1: '\\(\\leq\\) est un signe numérique : il compare deux nombres, pas deux propositions logiques — écrire « \\(n\\geq N\\leq|u_n-\\ell|&lt;\\varepsilon\\) » n’a aucun sens.',
      2: '\\(=\\) compare deux valeurs, pas deux affirmations — « \\(n\\geq N\\) » et « \\(|u_n-\\ell|&lt;\\varepsilon\\) » ne sont pas des nombres qu’on peut égaler.',
    },
  },
  {
    id: 'ex4', section: 'discours-formel',
    statement: 'Les énoncés « \\(\\forall\\varepsilon\\,\\exists N,\\ldots\\) » et « \\(\\exists N\\,\\forall\\varepsilon,\\ldots\\) » sont :',
    options: [
      'Deux énoncés différents : dans le premier, \\(N\\) peut dépendre de \\(\\varepsilon\\) ; dans le second, un seul \\(N\\) doit marcher pour tous les \\(\\varepsilon\\) (énoncé plus fort)',
      'Exactement le même énoncé, l’ordre des quantificateurs n’a aucune importance',
      'Le premier est plus fort que le second',
    ],
    correctIndex: 0,
    explain: 'L’ordre des quantificateurs change le sens : « \\(\\forall\\varepsilon\\,\\exists N\\) » autorise \\(N\\) à dépendre de \\(\\varepsilon\\) (un \\(N\\) différent pour chaque \\(\\varepsilon\\)) ; « \\(\\exists N\\,\\forall\\varepsilon\\) » impose un SEUL \\(N\\) qui marche pour tous les \\(\\varepsilon\\) — beaucoup plus restrictif, donc plus fort.',
    wrongExplain: {
      1: 'L’ordre compte énormément en logique : échanger un \\(\\forall\\) et un \\(\\exists\\) qui se suivent change la force de l’énoncé, ce n’est jamais un détail de style.',
      2: 'C’est l’inverse : c’est « \\(\\exists N\\,\\forall\\varepsilon\\) » qui est plus fort (un seul \\(N\\) pour tout \\(\\varepsilon\\)), pas « \\(\\forall\\varepsilon\\,\\exists N\\) » qui est la définition usuelle, plus souple.',
    },
  },
  {
    id: 'ex5', section: 'discours-formel',
    statement: 'Pour conclure une démonstration, quel est le bon réflexe de rédaction ?',
    options: [
      'Recopier exactement l’énoncé qu’on voulait démontrer au départ',
      'Écrire « donc c’est bon » sans reformuler l’énoncé',
      'Conclure sur une version légèrement simplifiée de l’énoncé de départ, plus facile à écrire',
    ],
    correctIndex: 0,
    explain: 'La conclusion doit reprendre mot pour mot (ou quantificateur pour quantificateur) l’énoncé visé au départ — c’est la seule façon de vérifier qu’on a bien démontré CE qu’on devait démontrer, ni plus ni moins.',
    wrongExplain: {
      1: 'Une conclusion vague ne permet pas de vérifier que tous les quantificateurs et toutes les hypothèses de l’énoncé de départ ont bien été traités.',
      2: 'Simplifier l’énoncé en concluant revient à démontrer autre chose que ce qui était demandé — la conclusion doit correspondre exactement à l’énoncé visé.',
    },
  },

  // ---------- §2 — Fiche 1 : limite, ≤ε ou strict ε, l'astuce ε/2 ----------
  {
    id: 'ex6', section: 'limite-epsilon',
    statement: 'Pourquoi l’implication \\((1)\\Rightarrow(2)\\) [« \\(\\forall\\varepsilon\\exists N\\forall n\\geq N, |u_n-\\ell|&lt;\\varepsilon\\) » \\(\\Rightarrow\\) « … \\(|u_n-\\ell|\\leq\\varepsilon\\) »] est-elle immédiate, sans aucun calcul ?',
    options: [
      'Une inégalité stricte \\(&lt;\\) entraîne toujours l’inégalité large \\(\\leq\\) correspondante',
      'Une inégalité large \\(\\leq\\) entraîne toujours l’inégalité stricte \\(&lt;\\) correspondante',
      'Les deux énoncés utilisent le même \\(N\\), donc ils sont automatiquement équivalents',
    ],
    correctIndex: 0,
    explain: 'Si \\(|u_n-\\ell|&lt;\\varepsilon\\) est vrai, alors \\(|u_n-\\ell|\\leq\\varepsilon\\) est vrai aussi (le strict entraîne le large) — aucune construction supplémentaire n’est nécessaire, le même \\(N\\) convient tel quel.',
    wrongExplain: {
      1: 'C’est l’inverse : le large n’entraîne PAS le strict (\\(2\\leq2\\) est vrai mais \\(2&lt;2\\) est faux) — c’est justement pourquoi le sens \\((2)\\Rightarrow(1)\\) demande, lui, un vrai argument (l’astuce \\(\\varepsilon/2\\)).',
      2: 'Ce n’est pas une question du \\(N\\) utilisé, mais de la relation logique entre \\(&lt;\\) et \\(\\leq\\) elle-même, vraie indépendamment de tout \\(N\\).',
    },
  },
  {
    id: 'ex7', section: 'limite-epsilon',
    statement: 'Pour démontrer \\((2)\\Rightarrow(1)\\) (passer du \\(\\leq\\varepsilon\\) au \\(&lt;\\varepsilon\\)), quelle astuce appliquer à \\(\\varepsilon\\) ?',
    options: [
      'Appliquer l’hypothèse (2) à \\(\\varepsilon’=\\varepsilon/2\\) au lieu de \\(\\varepsilon\\)',
      'Appliquer l’hypothèse (2) à \\(\\varepsilon’=2\\varepsilon\\) au lieu de \\(\\varepsilon\\)',
      'Appliquer l’hypothèse (2) à \\(\\varepsilon\\) lui-même, sans rien changer',
    ],
    correctIndex: 0,
    explain: 'En appliquant (2) à \\(\\varepsilon’=\\varepsilon/2\\), on obtient \\(|u_n-\\ell|\\leq\\varepsilon/2\\), et comme \\(\\varepsilon/2&lt;\\varepsilon\\) (strictement), on en déduit \\(|u_n-\\ell|&lt;\\varepsilon\\) : c’est bien l’inégalité stricte recherchée.',
    wrongExplain: {
      1: '\\(2\\varepsilon\\) est PLUS GRAND que \\(\\varepsilon\\), pas plus petit — appliquer (2) à \\(2\\varepsilon\\) donnerait \\(|u_n-\\ell|\\leq2\\varepsilon\\), ce qui n’entraîne pas \\(|u_n-\\ell|&lt;\\varepsilon\\).',
      2: 'Appliquer (2) directement à \\(\\varepsilon\\) donne seulement \\(|u_n-\\ell|\\leq\\varepsilon\\), l’inégalité LARGE — exactement ce qu’on avait déjà, pas l’inégalité stricte cherchée.',
    },
  },
  {
    id: 'ex8', section: 'limite-epsilon',
    statement: 'Avant d’appliquer l’hypothèse (2) à \\(\\varepsilon’=\\varepsilon/2\\), quelle vérification est indispensable ?',
    options: [
      'Vérifier que \\(\\varepsilon’&gt;0\\), sinon on n’a pas le droit d’appliquer (2) (qui ne vaut que pour des \\(\\varepsilon\\) strictement positifs)',
      'Aucune vérification n’est nécessaire, \\(\\varepsilon/2\\) est toujours valable',
      'Vérifier que \\(\\varepsilon’\\) est un entier',
    ],
    correctIndex: 0,
    explain: '(2) est de la forme « \\(\\forall\\varepsilon&gt;0,\\ldots\\) » : elle ne peut être appliquée qu’à des valeurs strictement positives. Comme \\(\\varepsilon&gt;0\\), on a bien \\(\\varepsilon/2&gt;0\\), donc l’application est licite — mais cette vérification doit être écrite, pas juste supposée.',
    wrongExplain: {
      1: 'Si \\(\\varepsilon’\\) n’était pas strictement positif, (2) ne s’appliquerait pas du tout — la vérification est une étape de la preuve, pas un détail à sauter.',
      2: '\\(\\varepsilon\\) est un réel quelconque strictement positif, pas nécessairement un entier — rien dans (2) n’exige que \\(\\varepsilon’\\) soit entier.',
    },
  },
  {
    id: 'ex9', section: 'limite-epsilon',
    statement: 'L’astuce « remplacer \\(\\varepsilon\\) par \\(\\varepsilon/2\\), \\(\\varepsilon/3\\), \\(\\varepsilon/(2M)\\)… » dans une définition « \\(\\forall\\varepsilon&gt;0,\\ldots\\) » fonctionne parce que :',
    options: [
      'La définition doit valoir pour N’IMPORTE QUEL \\(\\varepsilon’&gt;0\\), donc on choisit celui qui simplifie le calcul, tant qu’il reste strictement positif',
      'Cette substitution change la définition de la limite elle-même',
      'Cette astuce n’est valable qu’avec \\(\\varepsilon/2\\), jamais avec une autre fraction de \\(\\varepsilon\\)',
    ],
    correctIndex: 0,
    explain: 'Un « \\(\\forall\\varepsilon&gt;0\\) » autorise à choisir N’IMPORTE QUEL \\(\\varepsilon’\\) strictement positif bien adapté au calcul — c’est l’astuce de base de toute l’analyse, pas limitée à \\(\\varepsilon/2\\).',
    wrongExplain: {
      1: 'La définition de la limite n’est jamais modifiée : on choisit juste une valeur particulière de \\(\\varepsilon\\) (parmi tous les \\(\\varepsilon&gt;0\\) possibles) pour faire avancer le calcul, rien de plus.',
      2: 'Le choix \\(\\varepsilon/2\\), \\(\\varepsilon/3\\), \\(\\varepsilon/(2M)\\)… dépend seulement de ce qui simplifie l’inégalité visée — rien n’impose \\(\\varepsilon/2\\) spécifiquement.',
    },
  },

  // ---------- §3 — Fiche 2 : la quantité conjuguée ----------
  {
    id: 'ex10', section: 'quantite-conjuguee',
    statement: 'Face à une expression de la forme \\(\\sqrt{A}-\\sqrt{B}\\) qui donne une forme indéterminée \\(\\infty-\\infty\\), quel réflexe appliquer ?',
    options: [
      'Multiplier et diviser par la quantité conjuguée \\(\\sqrt{A}+\\sqrt{B}\\)',
      'Factoriser directement par \\(\\sqrt{A}\\) sans rien multiplier',
      'Élever immédiatement toute l’expression au carré',
    ],
    correctIndex: 0,
    explain: '\\((\\sqrt{A}-\\sqrt{B})(\\sqrt{A}+\\sqrt{B})=A-B\\) fait disparaître les racines du numérateur — c’est le réflexe standard devant une différence de deux racines en forme \\(\\infty-\\infty\\).',
    wrongExplain: {
      1: 'Factoriser par \\(\\sqrt{A}\\) seul ne fait pas disparaître la deuxième racine ni la forme indéterminée — il faut la quantité conjuguée, pas une factorisation partielle.',
      2: 'Élever au carré toute l’expression \\(\\sqrt{A}-\\sqrt{B}\\) changerait sa valeur (\\((\\sqrt{A}-\\sqrt{B})^2\\neq A-B\\) en général) — ce n’est pas une opération réversible ici.',
    },
  },
  {
    id: 'ex11', section: 'quantite-conjuguee',
    statement: 'Dans l’exemple \\(u_n=\\sqrt{n^2+n}-n\\) (\\(n\\geq1\\)), après multiplication par la quantité conjuguée, le numérateur \\((n^2+n)-n^2\\) vaut :',
    options: ['\\(n\\)', '\\(n^2\\)', '\\(n^2+n\\)'],
    correctIndex: 0,
    explain: '\\((n^2+n)-n^2=n\\), tout simplement — le terme \\(n^2\\) s’annule, il ne reste que \\(n\\).',
    wrongExplain: {
      1: '\\(n^2\\) serait le résultat si on n’avait pas soustrait \\(n^2\\) — ici les deux termes en \\(n^2\\) s’annulent exactement.',
      2: '\\(n^2+n\\) est l’expression de DÉPART avant la soustraction de \\(n^2\\) — la soustraction ne redonne pas l’expression initiale.',
    },
  },
  {
    id: 'ex12', section: 'quantite-conjuguee',
    statement: 'Pour écrire \\(\\sqrt{n^2+n}=n\\sqrt{1+1/n}\\) (et non \\(-n\\sqrt{1+1/n}\\)), quelle justification est indispensable ?',
    options: [
      '\\(n\\geq1&gt;0\\) : on a le droit d’écrire \\(\\sqrt{n^2}=n\\) (et pas \\(|n|=-n\\)) seulement parce que \\(n\\) est positif',
      'Aucune : \\(\\sqrt{n^2x}=n\\sqrt{x}\\) est toujours vrai quel que soit le signe de \\(n\\)',
      'Le fait que \\(n^2\\) soit positif suffit, peu importe le signe de \\(n\\) lui-même',
    ],
    correctIndex: 0,
    explain: '\\(\\sqrt{n^2}=|n|\\), qui vaut \\(n\\) seulement si \\(n\\geq0\\). Ici \\(n\\geq1&gt;0\\), donc \\(|n|=n\\) — mais cette justification du signe doit être écrite explicitement, ce n’est jamais automatique.',
    wrongExplain: {
      1: 'C’est faux pour \\(n&lt;0\\) : si \\(n\\) était négatif, \\(\\sqrt{n^2}=|n|=-n\\), et non \\(n\\) — la formule dépend bien du signe de \\(n\\).',
      2: '\\(n^2\\) est toujours positif, mais ce n’est pas lui qu’on extrait de la racine : c’est \\(|n|\\) qui sort de \\(\\sqrt{n^2}\\), et son signe dépend de celui de \\(n\\), pas de \\(n^2\\).',
    },
  },
  {
    id: 'ex13', section: 'quantite-conjuguee',
    statement: 'L’identité \\(\\sqrt{n^2}=|n|\\) signifie que, en général (sans hypothèse de signe sur \\(n\\)) :',
    options: [
      '\\(\\sqrt{n^2}\\) n’est PAS automatiquement égal à \\(n\\) : c’est égal à \\(n\\) seulement si \\(n\\geq0\\)',
      '\\(\\sqrt{n^2}\\) est toujours égal à \\(n\\), pour tout réel \\(n\\)',
      '\\(\\sqrt{n^2}\\) est toujours égal à \\(n^2\\), quel que soit le signe de \\(n\\)',
    ],
    correctIndex: 0,
    explain: '\\(\\sqrt{n^2}=|n|\\) : ce n’est égal à \\(n\\) que si \\(n\\geq0\\). Pour \\(n&lt;0\\), \\(\\sqrt{n^2}=|n|=-n\\). C’est un piège classique de confondre les deux.',
    wrongExplain: {
      1: 'Ce n’est vrai que pour \\(n\\geq0\\) — pour \\(n&lt;0\\) (par exemple \\(n=-3\\)), \\(\\sqrt{n^2}=\\sqrt{9}=3=-n\\neq n\\).',
      2: '\\(\\sqrt{n^2}\\) est une racine carrée, donc un nombre \\(\\geq0\\) — \\(n^2\\) lui-même n’a aucune raison d’être égal à cette racine sauf cas particulier.',
    },
  },
  {
    id: 'ex14', section: 'quantite-conjuguee',
    statement: 'Pour une expression sous une racine comme \\(\\sqrt{n^2+n}\\) quand \\(n\\to+\\infty\\), le réflexe est de :',
    options: [
      'Factoriser sous la racine par le terme dominant (ici \\(n^2\\))',
      'Factoriser sous la racine par le terme le plus petit (ici \\(n\\))',
      'Développer d’abord un carré avant de simplifier',
    ],
    correctIndex: 0,
    explain: 'On factorise par le terme dominant (\\(n^2\\) ici) pour isoler la partie qui tend vers l’infini et faire apparaître un facteur qui tend vers 1 (ici \\(\\sqrt{1+1/n}\\to1\\)).',
    wrongExplain: {
      1: 'Factoriser par le terme le plus petit (\\(n\\)) laisserait un facteur \\((n+1)\\) qui ne tend pas vers une limite simple sous la racine — c’est le terme DOMINANT qui doit sortir.',
      2: 'Il n’y a rien à développer : \\(n^2+n\\) est déjà une somme, pas un carré à développer — c’est une factorisation qu’il faut faire, pas un développement.',
    },
  },

  // ---------- §4 — Fiche 3 : majorer une fraction ----------
  {
    id: 'ex15', section: 'majorer-fraction',
    statement: 'Pour majorer une fraction \\(a/b\\) avec \\(0\\leq a\\) et \\(b&gt;0\\), quelle technique appliquer ?',
    options: [
      'Majorer le numérateur \\(a\\) ET minorer le dénominateur \\(b\\) par un nombre strictement positif',
      'Majorer à la fois le numérateur et le dénominateur',
      'Minorer le numérateur et majorer le dénominateur',
    ],
    correctIndex: 0,
    explain: 'Pour obtenir une MAJORATION de \\(a/b\\), il faut un numérateur le plus grand possible (majorer \\(a\\)) et un dénominateur le plus petit possible mais strictement positif (minorer \\(b\\) par \\(m&gt;0\\)) — les deux choix vont dans des sens opposés.',
    wrongExplain: {
      1: 'Majorer le dénominateur ferait AUGMENTER \\(b\\), ce qui diminuerait \\(a/b\\) — ça donnerait une minoration de \\(a/b\\), pas une majoration.',
      2: 'Minorer \\(a\\) réduirait le numérateur, ce qui diminue \\(a/b\\) — c’est l’inverse de ce qu’il faut pour majorer la fraction.',
    },
  },
  {
    id: 'ex16', section: 'majorer-fraction',
    statement: 'Si \\(b\\geq m&gt;0\\), pourquoi peut-on en déduire \\(1/b\\leq1/m\\) ?',
    options: [
      'Passer à l’inverse renverse le sens d’une inégalité, à condition que les deux nombres comparés soient strictement positifs',
      'C’est toujours vrai, même si \\(b\\) ou \\(m\\) sont négatifs ou nuls',
      '\\(m\\geq0\\) suffit, sans besoin que \\(m\\) soit strictement positif',
    ],
    correctIndex: 0,
    explain: 'La fonction inverse renverse les inégalités entre nombres strictement positifs : \\(b\\geq m&gt;0\\Rightarrow1/b\\leq1/m\\). Il faut \\(m\\) strictement positif pour que \\(1/m\\) existe et que l’argument soit valable.',
    wrongExplain: {
      1: 'Avec des nombres négatifs, passer à l’inverse ne se comporte pas de la même façon (et diviser par 0 n’a aucun sens) — la règle suppose des nombres strictement positifs.',
      2: 'Si \\(m=0\\), \\(1/m\\) n’existe même pas — il faut \\(m\\) strictement positif, pas seulement \\(m\\geq0\\).',
    },
  },
  {
    id: 'ex17', section: 'majorer-fraction',
    statement: 'Dans l’exemple \\(u_n=1/(\\sqrt{1+1/n}+1)\\), pourquoi peut-on affirmer que le dénominateur est strictement supérieur à 2 (pour \\(n\\geq1\\)) ?',
    options: [
      '\\(\\sqrt{1+1/n}&gt;1\\) (strictement, car \\(1/n&gt;0\\)), donc le dénominateur \\(\\sqrt{1+1/n}+1&gt;1+1=2\\)',
      '\\(\\sqrt{1+1/n}&lt;1\\) toujours',
      '\\(1/n&gt;1\\) pour tout \\(n\\geq1\\)',
    ],
    correctIndex: 0,
    explain: 'Pour \\(n\\geq1\\), \\(1/n&gt;0\\) donc \\(1+1/n&gt;1\\), donc \\(\\sqrt{1+1/n}&gt;1\\) (strictement) — en ajoutant 1 des deux côtés, le dénominateur est \\(&gt;2\\).',
    wrongExplain: {
      1: 'C’est l’inverse : comme \\(1/n&gt;0\\), on a \\(1+1/n&gt;1\\), donc sa racine est STRICTEMENT SUPÉRIEURE à 1, pas inférieure.',
      2: '\\(1/n\\leq1\\) pour tout \\(n\\geq1\\) (égal à 1 seulement pour \\(n=1\\), puis décroît) — ce n’est jamais strictement supérieur à 1.',
    },
  },
  {
    id: 'ex18', section: 'majorer-fraction',
    statement: 'Pourquoi est-il interdit de minorer un dénominateur par 0 dans une majoration de fraction ?',
    options: [
      'La règle \\(a/b\\leq M/m\\) n’a de sens que si \\(m&gt;0\\) (sinon \\(M/m\\) n’existe pas, ou division par 0)',
      'Ce n’est jamais interdit, 0 est une minoration valable comme une autre',
      'C’est interdit seulement si le numérateur \\(a\\) est lui-même nul',
    ],
    correctIndex: 0,
    explain: 'Si \\(m=0\\), \\(M/m\\) n’a aucun sens (division par 0) — la minoration du dénominateur doit toujours se faire par un nombre STRICTEMENT positif pour que la majoration de la fraction soit utilisable.',
    wrongExplain: {
      1: '0 est une minoration mathématiquement vraie (\\(b\\geq0\\)) mais INUTILISABLE pour conclure sur \\(a/b\\), puisqu’on ne peut rien dire d’une division par une quantité pouvant être nulle.',
      2: 'Le problème vient du dénominateur, pas du numérateur — même avec \\(a&gt;0\\), minorer \\(b\\) par 0 rend la majoration de \\(a/b\\) inexploitable.',
    },
  },

  // ---------- §5 — Fiche 4 : une fonction est un ensemble de couples ----------
  {
    id: 'ex19', section: 'fonction-couples',
    statement: 'Une fonction \\(f\\) de \\(E\\) dans \\(F\\) est une partie \\(f\\subseteq E\\times F\\) telle que :',
    options: [
      'Chaque \\(x\\in E\\) a AU PLUS une image : \\((x,y)\\in f\\) et \\((x,y’)\\in f\\) entraînent \\(y=y’\\)',
      'N’importe quelle partie de \\(E\\times F\\), sans condition supplémentaire',
      'Chaque \\(y\\in F\\) a au plus un antécédent',
    ],
    correctIndex: 0,
    explain: 'La condition qui définit une fonction porte sur l’UNICITÉ de l’image : pour un même \\(x\\), on ne peut pas avoir deux images différentes \\(y\\) et \\(y’\\). Sans cette condition, une partie de \\(E\\times F\\) quelconque n’est qu’une RELATION, pas forcément une fonction.',
    wrongExplain: {
      1: 'Sans la condition d’unicité de l’image, une partie de \\(E\\times F\\) est une simple relation, pas forcément une fonction — un même \\(x\\) pourrait avoir plusieurs images.',
      2: 'C’est la condition d’INJECTIVITÉ (pas la définition de fonction elle-même) — une fonction peut très bien avoir un \\(y\\) avec plusieurs antécédents.',
    },
  },
  {
    id: 'ex20', section: 'fonction-couples',
    statement: 'L’ensemble de définition \\(D_f\\) d’une fonction \\(f\\) est :',
    options: [
      '\\(\\{x\\in E:\\exists y\\in F,(x,y)\\in f\\}\\) — l’ensemble des \\(x\\) qui ont effectivement une image',
      '\\(E\\) tout entier, par définition',
      '\\(\\text{Im}\\,f\\), l’ensemble des images',
    ],
    correctIndex: 0,
    explain: '\\(D_f\\) regroupe exactement les \\(x\\in E\\) qui possèdent une image par \\(f\\) — ce n’est pas forcément tout \\(E\\) (une fonction peut être partiellement définie sur \\(E\\)).',
    wrongExplain: {
      1: '\\(E\\) est l’ensemble de DÉPART, mais rien ne garantit que chaque élément de \\(E\\) ait une image par \\(f\\) — \\(D_f\\) peut être strictement plus petit que \\(E\\).',
      2: '\\(\\text{Im}\\,f\\) est l’ensemble des VALEURS atteintes (dans \\(F\\)), pas l’ensemble des \\(x\\) qui ont une image (qui est dans \\(E\\)) — les deux ensembles vivent dans des espaces différents.',
    },
  },
  {
    id: 'ex21', section: 'fonction-couples',
    statement: 'L’image \\(\\text{Im}\\,f\\) d’une fonction \\(f\\) vérifie :',
    options: [
      '\\(\\text{Im}\\,f=\\{f(x):x\\in D_f\\}\\subseteq F\\) — ce n’est pas nécessairement égal à \\(F\\) tout entier',
      '\\(\\text{Im}\\,f\\) est toujours égal à \\(F\\)',
      '\\(\\text{Im}\\,f\\) est l’ensemble des \\(x\\) qui ont une image',
    ],
    correctIndex: 0,
    explain: '\\(\\text{Im}\\,f\\) est l’ensemble des valeurs effectivement ATTEINTES par \\(f\\) — une inclusion dans \\(F\\), pas forcément une égalité (\\(f\\) peut très bien ne pas être surjective).',
    wrongExplain: {
      1: '\\(\\text{Im}\\,f\\subseteq F\\) mais rien n’impose l’égalité — par exemple une fonction constante a une image réduite à un seul point, très différente de \\(F\\) tout entier.',
      2: 'C’est la description de \\(D_f\\) (dans \\(E\\)), pas de \\(\\text{Im}\\,f\\) (qui est dans \\(F\\), l’ensemble des valeurs atteintes).',
    },
  },
  {
    id: 'ex22', section: 'fonction-couples',
    statement: 'Si \\(f(x)=y\\), quelle affirmation sur le vocabulaire est correcte ?',
    options: [
      '\\(y\\) est L’image de \\(x\\) (une seule) ; \\(x\\) est UN antécédent de \\(y\\) (il peut y en avoir zéro, un, ou plusieurs)',
      '\\(x\\) est l’image de \\(y\\), et \\(y\\) est un antécédent de \\(x\\)',
      '\\(y\\) et \\(x\\) sont chacun uniques dans tous les cas',
    ],
    correctIndex: 0,
    explain: 'L’image d’un \\(x\\) donné est toujours unique par définition de fonction. Un antécédent d’un \\(y\\) donné, en revanche, n’a aucune raison d’être unique : il peut y en avoir zéro, un, ou plusieurs.',
    wrongExplain: {
      1: 'C’est l’inverse exact des définitions : l’image se lit « dans le sens de \\(f\\) » (\\(x\\to y\\)), l’antécédent dans le sens inverse (\\(y\\to x\\)).',
      2: 'Seule l’image d’un \\(x\\) est garantie unique — un \\(y\\) donné peut très bien avoir plusieurs antécédents (\\(f\\) non injective) ou aucun (\\(y\\notin\\text{Im}\\,f\\)).',
    },
  },
  {
    id: 'ex23', section: 'fonction-couples',
    statement: 'Pour montrer qu’un élément \\(y\\in F\\) appartient à \\(\\text{Im}\\,f\\), le réflexe de rédaction est :',
    options: [
      'Exhiber explicitement un \\(x\\in D_f\\) tel que \\(f(x)=y\\)',
      'Montrer seulement que \\(y\\in F\\)',
      'Montrer que \\(f\\) est injective',
    ],
    correctIndex: 0,
    explain: 'Montrer \\(y\\in\\text{Im}\\,f\\), c’est montrer l’existence d’un antécédent : on exhibe (ou on construit) un \\(x\\in D_f\\) précis tel que \\(f(x)=y\\) — même logique que montrer un \\(\\exists\\) en général (Fiche 0).',
    wrongExplain: {
      1: '\\(y\\in F\\) est nécessaire mais pas suffisant : \\(F\\) est l’ensemble d’ARRIVÉE, \\(\\text{Im}\\,f\\) peut être strictement plus petit si \\(f\\) n’est pas surjective.',
      2: 'L’injectivité de \\(f\\) (unicité de l’antécédent) n’a rien à voir avec l’existence d’UN antécédent — ce sont deux questions différentes.',
    },
  },

  // ---------- §6 — Fiche 5 : entiers, a strictement supérieur à b donne a≥b+1 ----------
  {
    id: 'ex24', section: 'entiers-superieur',
    statement: 'Si \\(a,b\\) sont des entiers (\\(\\mathbb{N}\\) ou \\(\\mathbb{Z}\\)) avec \\(a&gt;b\\), alors on peut en déduire :',
    options: ['\\(a\\geq b+1\\)', '\\(a=b+1\\) exactement', '\\(a\\geq b+2\\)'],
    correctIndex: 0,
    explain: '\\(a-b\\) est un entier strictement positif, donc \\(a-b\\geq1\\) (il n’y a aucun entier dans l’intervalle ouvert \\(]0,1[\\)) — d’où \\(a\\geq b+1\\), pas plus précis que ça.',
    wrongExplain: {
      1: '\\(a\\) pourrait très bien être \\(b+5\\) ou \\(b+100\\) : la seule chose garantie est \\(a\\geq b+1\\), pas une égalité exacte.',
      2: 'Rien n’empêche \\(a=b+1\\) exactement (par exemple \\(a=4\\), \\(b=3\\)) — la règle donne une minoration, \\(a\\geq b+2\\) serait une affirmation trop forte.',
    },
  },
  {
    id: 'ex25', section: 'entiers-superieur',
    statement: 'La règle « \\(a&gt;b\\Rightarrow a\\geq b+1\\) » pour \\(a,b\\) entiers repose sur quel argument ?',
    options: [
      '\\(a-b\\) est un entier strictement positif, donc \\(a-b\\geq1\\), car il n’y a aucun entier strictement compris entre 0 et 1',
      '\\(a\\) et \\(b\\) sont forcément positifs',
      '\\(a-b\\) est toujours un multiple de \\(b\\)',
    ],
    correctIndex: 0,
    explain: 'C’est l’absence d’entier dans \\(]0,1[\\) qui force \\(a-b\\) (entier \\(&gt;0\\)) à valoir au moins 1 — rien à voir avec le signe de \\(a\\) ou de \\(b\\) eux-mêmes.',
    wrongExplain: {
      1: 'La règle n’exige aucune hypothèse de signe sur \\(a\\) ou \\(b\\) (elle marche aussi dans \\(\\mathbb{Z}\\), avec des entiers négatifs) — seul leur caractère ENTIER compte.',
      2: 'Rien n’impose que \\(a-b\\) soit un multiple de \\(b\\) — c’est juste un entier strictement positif, donc \\(\\geq1\\), point final.',
    },
  },
  {
    id: 'ex26', section: 'entiers-superieur',
    statement: 'Cette règle (\\(a&gt;b\\Rightarrow a\\geq b+1\\)) est-elle vraie pour \\(a,b\\) réels quelconques (pas nécessairement entiers) ?',
    options: [
      'Non : par exemple \\(2{,}5&gt;2\\) mais \\(2{,}5&lt;3=2+1\\)',
      'Oui, elle reste vraie pour tout réel',
      'Oui, mais seulement pour les réels positifs',
    ],
    correctIndex: 0,
    explain: 'Le contre-exemple \\(2{,}5&gt;2\\) mais \\(2{,}5&lt;3\\) montre que la règle est FAUSSE en général dans \\(\\mathbb{R}\\) — elle dépend essentiellement du caractère entier de \\(a\\) et \\(b\\) (absence d’entier dans \\(]0,1[\\)).',
    wrongExplain: {
      1: 'C’est faux justement à cause du contre-exemple \\(2{,}5\\) : la règle est spécifique aux entiers, elle ne se généralise pas à \\(\\mathbb{R}\\).',
      2: 'Le signe de \\(a\\) et \\(b\\) n’a rien à voir avec la validité de la règle — c’est son caractère ENTIER qui est en cause, pas son signe.',
    },
  },
  {
    id: 'ex27', section: 'entiers-superieur',
    statement: 'Dans une hérédité où l’on sait \\(f(n+1)&gt;n\\) avec \\(f(n+1)\\) et \\(n\\) des entiers, pourquoi peut-on conclure \\(f(n+1)\\geq n+1\\) ?',
    options: [
      'On applique la règle « \\(a&gt;b\\Rightarrow a\\geq b+1\\) » avec \\(a=f(n+1)\\) et \\(b=n\\), tous deux entiers',
      'Parce que \\(f\\) est croissante, ça suffit sans autre justification',
      'C’est toujours vrai pour n’importe quels nombres réels, pas seulement entiers',
    ],
    correctIndex: 0,
    explain: '\\(f(n+1)\\) et \\(n\\) sont des entiers, et \\(f(n+1)&gt;n\\) par hypothèse : la règle des entiers (Fiche 5) s’applique directement pour obtenir l’inégalité plus précise \\(f(n+1)\\geq n+1\\), utile pour conclure l’hérédité.',
    wrongExplain: {
      1: 'La croissance de \\(f\\) donne seulement \\(f(n+1)&gt;f(n)\\), pas directement \\(f(n+1)&gt;n\\) ni la précision \\(\\geq n+1\\) — c’est bien le caractère ENTIER qui apporte le « +1 ».',
      2: 'C’est précisément FAUX pour des réels quelconques (voir le contre-exemple \\(2{,}5&gt;2\\)) — ça ne marche que parce que \\(f(n+1)\\) et \\(n\\) sont des entiers ici.',
    },
  },

  // ---------- §7 — Fiche 6 : l'image d'un intervalle ----------
  {
    id: 'ex28', section: 'image-intervalle',
    statement: 'Le théorème central mobilisé dans cette fiche énonce que :',
    options: [
      'L’image d’un intervalle par une fonction continue est un intervalle',
      'L’image d’un intervalle par une fonction continue est toujours un intervalle OUVERT',
      'L’image de n’importe quel ensemble par une fonction continue est toujours \\(\\mathbb{R}\\) tout entier',
    ],
    correctIndex: 0,
    explain: 'C’est le théorème des valeurs intermédiaires, sous sa forme ensembliste : \\(f\\) continue sur un intervalle \\(I\\) \\(\\Rightarrow\\) \\(f(I)\\) est un intervalle — rien n’impose qu’il soit ouvert, fermé ou borné : ça dépend du cas.',
    wrongExplain: {
      1: 'La nature de l’intervalle image (ouvert, fermé, semi-ouvert) dépend du cas précis (continuité + monotonie + limites aux bornes) — le théorème garantit juste que c’est UN intervalle, pas sa forme exacte.',
      2: '\\(f(I)\\) dépend entièrement de \\(f\\) et de \\(I\\) — rien ne garantit que ce soit \\(\\mathbb{R}\\) tout entier (par exemple une fonction bornée ne peut pas avoir \\(\\mathbb{R}\\) comme image).',
    },
  },
  {
    id: 'ex29', section: 'image-intervalle',
    statement: 'D’après M. Lévy, un simple tableau de variations suffit-il, à lui seul, pour conclure quel ensemble exact est l’image d’un intervalle ?',
    options: [
      'Non : il faut citer le théorème (continuité, stricte monotonie, limites aux bornes, bornes atteintes ou non) — un tableau seul est « trop rapide »',
      'Oui, un tableau de variations suffit toujours à déterminer l’image exacte',
      'Non, un tableau de variations ne donne aucune information utile',
    ],
    correctIndex: 0,
    explain: 'Le tableau de variations montre le sens de variation, mais ne prouve pas à lui seul quel intervalle exact est atteint (bornes ouvertes ou fermées, valeurs limites) — il faut la checklist complète des 4 justifications.',
    wrongExplain: {
      1: 'C’est précisément le jugement « TROP RAPIDE » de M. Lévy : le tableau seul ne suffit pas, il manque la justification des bornes (atteintes ou non) et des limites.',
      2: 'Le tableau de variations donne une information réelle et utile (le sens de variation) — ce n’est pas qu’il soit inutile, c’est qu’il est INSUFFISANT seul.',
    },
  },
  {
    id: 'ex30', section: 'image-intervalle',
    statement: 'Parmi les 4 justifications à écrire pour conclure sur l’image d’un intervalle par une fonction, laquelle manque dans cette liste : continuité, stricte monotonie, bornes atteintes ou non, … ?',
    options: [
      'Les limites aux bornes de l’intervalle (pas une « valeur » en une borne exclue)',
      'Le calcul de la dérivée seconde',
      'La parité de la fonction',
    ],
    correctIndex: 0,
    explain: 'La checklist complète est : 1) continuité, 2) stricte monotonie, 3) limites aux bornes (pas une valeur en une borne exclue de l’intervalle), 4) bornes atteintes ou non.',
    wrongExplain: {
      1: 'La dérivée seconde (convexité) n’intervient pas dans cette checklist — elle porte sur continuité, monotonie, limites et bornes atteintes.',
      2: 'La parité n’est pas une des 4 justifications requises par ce théorème — elle est hors sujet ici.',
    },
  },
  {
    id: 'ex31', section: 'image-intervalle',
    statement: 'Dans l’exemple \\(E=\\{(x-1)/x\\,;\\,x&gt;1\\}\\), pourquoi est-il incorrect d’écrire « \\(f(1)=0\\) » pour justifier la borne inférieure de l’image ?',
    options: [
      '\\(x&gt;1\\) est une inégalité STRICTE : 1 n’appartient pas à l’ensemble de départ \\(]1,+\\infty[\\), il faut calculer la limite quand \\(x\\to1^+\\)',
      'Parce que \\(f(1)\\) n’existe pas du tout, même comme limite',
      'Parce que c’est correct d’écrire \\(f(1)=0\\), aucun problème',
    ],
    correctIndex: 0,
    explain: 'L’ensemble de départ est \\(]1,+\\infty[\\), ouvert en 1 : \\(x=1\\) n’en fait pas partie, donc « \\(f(1)\\) » n’a pas de sens dans ce contexte — il faut calculer la LIMITE de \\(f\\) quand \\(x\\) tend vers 1 par valeurs supérieures (\\(1^+\\)), pas une valeur en un point exclu.',
    wrongExplain: {
      1: '\\(f(x)=(x-1)/x\\) EST bien définie en \\(x=1\\) (ça vaudrait 0) — le problème n’est pas que \\(f(1)\\) n’existe pas mathématiquement, c’est que 1 n’est pas dans l’ensemble de départ considéré ici (\\(]1,+\\infty[\\)).',
      2: 'C’est exactement le piège signalé par M. Lévy : 1 n’étant pas dans \\(]1,+\\infty[\\), parler de « \\(f(1)\\) » n’a pas de sens dans ce raisonnement, même si le calcul semble donner la même valeur numérique.',
    },
  },
  {
    id: 'ex32', section: 'image-intervalle',
    statement: 'Sur un intervalle OUVERT, une fonction strictement croissante atteint-elle ses limites aux bornes (incluses dans l’image) ?',
    options: [
      'Non : les limites aux bornes ne sont jamais atteintes sur un intervalle ouvert, donc les crochets de l’intervalle image restent ouverts à ces bornes',
      'Oui, elle les atteint toujours',
      'Cela dépend uniquement du signe de la dérivée',
    ],
    correctIndex: 0,
    explain: 'Sur un intervalle ouvert, aucune des deux bornes n’appartient à l’ensemble de départ — la fonction ne peut donc jamais atteindre sa limite EN ces bornes : l’intervalle image reste ouvert à ces deux extrémités.',
    wrongExplain: {
      1: 'C’est l’inverse : justement parce que les bornes sont EXCLUES de l’intervalle de départ, la fonction ne peut jamais y atteindre sa valeur limite.',
      2: 'Le signe de la dérivée donne le sens de variation (croissante/décroissante), pas le caractère ouvert ou fermé de l’intervalle image — ce sont deux questions séparées.',
    },
  },
  {
    id: 'ex33', section: 'image-intervalle',
    statement: 'Dans la « méthode de secours » par double inclusion pour montrer \\(E=]0,1[\\), le sens « \\(]0,1[\\subseteq E\\) » consiste à :',
    options: [
      'Prendre \\(y\\in]0,1[\\), résoudre \\((x-1)/x=y\\), trouver \\(x\\), puis vérifier que \\(x&gt;1\\) (c’est exhiber un antécédent)',
      'Prendre \\(x&gt;1\\) et encadrer \\((x-1)/x\\) entre 0 et 1',
      'Affirmer directement l’égalité sans aucune vérification',
    ],
    correctIndex: 0,
    explain: 'Ce sens de l’inclusion revient exactement à « exhiber un antécédent » (comme en Fiche 4) : partir d’un \\(y\\) donné, résoudre l’équation, trouver le \\(x\\) correspondant, et vérifier qu’il est bien dans l’ensemble de départ.',
    wrongExplain: {
      1: 'Cette démarche (partir de \\(x&gt;1\\), encadrer) correspond à l’AUTRE sens de l’inclusion, \\(E\\subseteq]0,1[\\) — pas à celui-ci.',
      2: 'Une double inclusion sert précisément à éviter d’affirmer sans preuve : chaque sens doit être démontré séparément.',
    },
  },

  // ---------- §8 — Fiche 7 : décrire un ensemble (type-condition / forme-type) ----------
  {
    id: 'ex34', section: 'ensembles-notation',
    statement: 'Dans l’écriture « type-condition » \\(\\{\\text{variables}\\in\\text{type}\\,;\\,\\text{condition}\\}\\), que représente le « type » ?',
    options: [
      'L’ensemble général (souvent plus grand) dans lequel vivent les variables, avant d’appliquer la condition',
      'La condition elle-même qui restreint l’ensemble',
      'Le paramètre utilisé dans la forme-type équivalente',
    ],
    correctIndex: 0,
    explain: 'Le « type » est l’ensemble ambiant de départ (par exemple \\(\\mathbb{R}^2\\)) ; la « condition » vient ensuite restreindre cet ensemble (par exemple \\(y=3x\\)) — les deux rôles sont distincts.',
    wrongExplain: {
      1: 'La condition est la contrainte qui s’ajoute APRÈS avoir précisé le type — ce sont deux informations séparées dans l’écriture type-condition.',
      2: 'Le paramètre n’apparaît que dans l’écriture « forme-type », une notation différente — il n’a pas sa place dans l’écriture type-condition.',
    },
  },
  {
    id: 'ex35', section: 'ensembles-notation',
    statement: 'Dans l’écriture « forme-type » \\(\\{\\text{forme}\\,;\\,\\text{paramètre}\\in\\text{type}\\}\\), à quoi est attaché le « type » ?',
    options: [
      'Au paramètre : c’est lui qui porte l’indication de type (par exemple \\(\\lambda\\in\\mathbb{R}\\)), pas la forme',
      'À la forme elle-même',
      'Rien n’a besoin d’un type dans cette écriture',
    ],
    correctIndex: 0,
    explain: 'Dans la forme-type, le type est précisé pour le PARAMÈTRE (\\(\\lambda\\in\\mathbb{R}\\) par exemple) — la forme, elle, décrit juste à quoi ressemblent les éléments de l’ensemble.',
    wrongExplain: {
      1: 'La forme décrit l’allure des éléments (par exemple \\((\\lambda,3\\lambda)\\)) — c’est le paramètre, pas la forme, qui porte l’information de type.',
      2: 'Omettre le type du paramètre est précisément le piège signalé : sans lui, on ne sait pas dans quel ensemble \\(\\lambda\\) varie.',
    },
  },
  {
    id: 'ex36', section: 'ensembles-notation',
    statement: 'Pour passer de l’écriture type-condition \\(\\{(x,y)\\in\\mathbb{R}^2\\,;\\,y=3x\\}\\) à une écriture forme-type, le réflexe est :',
    options: [
      'Résoudre la condition pour exprimer certaines variables en fonction des autres ; les variables restées libres deviennent les paramètres',
      'Garder toutes les variables \\((x,y)\\) telles quelles sans aucune substitution',
      'Supprimer purement et simplement la condition',
    ],
    correctIndex: 0,
    explain: 'On résout \\(y=3x\\) pour exprimer \\(y\\) en fonction de \\(x\\), ce qui donne \\(\\{(x,3x)\\,;\\,x\\in\\mathbb{R}\\}\\) : \\(x\\), resté libre, devient le paramètre de la forme-type.',
    wrongExplain: {
      1: 'Garder \\((x,y)\\) sans substitution ne fait pas disparaître la condition — c’est justement la substitution qui permet d’écrire les éléments sous une FORME explicite, sans condition à vérifier séparément.',
      2: 'Supprimer la condition changerait l’ensemble décrit — il faut l’UTILISER (en résolvant) pour passer à la forme-type, pas l’ignorer.',
    },
  },
  {
    id: 'ex37', section: 'ensembles-notation',
    statement: 'Un piège signalé par M. Lévy dans l’écriture forme-type est :',
    options: [
      'Réécrire « \\(\\in\\mathbb{R}^2\\) » après la forme et oublier de préciser le type du paramètre (qui est l’information réellement nécessaire)',
      'Utiliser une lettre grecque comme \\(\\lambda\\) pour le paramètre',
      'Utiliser des parenthèses dans la forme, comme \\((\\lambda,3\\lambda)\\)',
    ],
    correctIndex: 0,
    explain: 'Le piège signalé est d’écrire l’ancien type (celui des variables de l’écriture type-condition, \\(\\mathbb{R}^2\\) ici) au lieu du type du PARAMÈTRE — c’est ce dernier qui porte l’information utile dans la forme-type.',
    wrongExplain: {
      1: 'Utiliser \\(\\lambda\\) (ou toute autre lettre) pour le paramètre n’est pas un piège, c’est juste une convention de notation sans conséquence.',
      2: 'Écrire la forme avec des parenthèses, comme \\((\\lambda,3\\lambda)\\), est la notation standard et correcte — ce n’est pas le piège visé.',
    },
  },
  {
    id: 'ex38', section: 'ensembles-notation',
    statement: 'La notation \\(\\text{Vect}\\) pour engendrer un sous-espace par une famille à un seul vecteur, par exemple \\((1,3)\\), s’écrit correctement :',
    options: [
      '\\(\\text{Vect}((1,3))\\) — avec deux paires de parenthèses (une pour la famille, une pour le vecteur)',
      '\\(\\text{Vect}(1,3)\\) — avec une seule paire de parenthèses',
      '\\(\\text{Vect}[1,3]\\) — avec des crochets',
    ],
    correctIndex: 0,
    explain: '\\(\\text{Vect}\\) prend en argument une FAMILLE de vecteurs (même réduite à un seul) : il faut une paire de parenthèses pour le vecteur \\((1,3)\\), et une autre pour la famille qui le contient — d’où \\(\\text{Vect}((1,3))\\).',
    wrongExplain: {
      1: '\\(\\text{Vect}(1,3)\\) laisse croire que \\(\\text{Vect}\\) prend deux scalaires séparés en arguments, alors qu’il prend UNE famille contenant le vecteur \\((1,3)\\) — il manque une paire de parenthèses.',
      2: 'Les crochets ne sont pas la notation utilisée pour \\(\\text{Vect}\\) dans ce cours — ce sont des parenthèses, à deux niveaux.',
    },
  },
  {
    id: 'ex39', section: 'ensembles-notation',
    statement: 'L’ensemble \\(E=\\{(x-1)/x\\,;\\,x&gt;1\\}\\) (Fiche 6) est écrit sous quelle forme, et que vaut-il en conséquence ?',
    options: [
      'C’est une écriture forme-type (forme \\((x-1)/x\\), paramètre \\(x\\in]1,+\\infty[\\)), donc \\(E=f(]1,+\\infty[)\\) pour \\(f(x)=(x-1)/x\\)',
      'C’est une écriture type-condition, donc \\(E=\\{(x,y)\\in\\mathbb{R}^2\\,;\\ldots\\}\\)',
      'Cette écriture ne correspond à aucune des deux formes vues',
    ],
    correctIndex: 0,
    explain: 'La forme est \\((x-1)/x\\) et le paramètre est \\(x\\), qui varie dans \\(]1,+\\infty[\\) — exactement une écriture forme-type, ce qui permet de la relire directement comme l’image d’un intervalle par une fonction : \\(E=f(]1,+\\infty[)\\).',
    wrongExplain: {
      1: 'Il n’y a ici qu’UNE seule variable (\\(x\\)) avec une condition sur elle (\\(x&gt;1\\)) et une forme calculée à partir d’elle — ce n’est pas une paire \\((x,y)\\in\\mathbb{R}^2\\) comme dans l’exemple type-condition de la Fiche 7.',
      2: 'C’est exactement le même type d’écriture que \\(\\{(\\lambda,3\\lambda)\\,;\\,\\lambda\\in\\mathbb{R}\\}\\) de la Fiche 7 : une forme, un paramètre et son type — une écriture forme-type.',
    },
  },

  // ---------- §9 — Synthèse : combiner les réflexes ----------
  {
    id: 'ex40', section: 'synthese-levy',
    statement: 'Pour calculer \\(\\lim_{n\\to\\infty}(\\sqrt{n^2+n}-n)\\) ET montrer l’encadrement \\(0&lt;u_n&lt;1/2\\) pour \\(n\\geq1\\), quelles DEUX techniques de ces fiches faut-il combiner ?',
    options: [
      'La quantité conjuguée (Fiche 2) pour transformer la différence de racines, puis la majoration de fraction par encadrement numérateur/dénominateur (Fiche 3)',
      'Uniquement la règle des entiers \\(a&gt;b\\Rightarrow a\\geq b+1\\) (Fiche 5)',
      'Uniquement le théorème de l’image d’un intervalle (Fiche 6)',
    ],
    correctIndex: 0,
    explain: 'C’est exactement l’enchaînement de l’exemple Lévy : la conjuguée (Fiche 2) transforme \\(u_n\\) en une fraction simple, puis la technique « majorer en haut, minorer en bas » (Fiche 3) donne l’encadrement final \\(0&lt;u_n&lt;1/2\\).',
    wrongExplain: {
      1: 'La règle des entiers (Fiche 5) porte sur des inégalités strictes entre ENTIERS — \\(u_n\\) n’est pas un entier, cette règle ne s’applique pas ici.',
      2: 'Le théorème de l’image d’un intervalle (Fiche 6) concerne les fonctions continues sur un intervalle, pas le calcul direct d’une limite de suite par conjuguée.',
    },
  },
  {
    id: 'ex41', section: 'synthese-levy',
    statement: 'Pour prouver proprement que \\(f(]1,+\\infty[)=]0,1[\\) (Fiche 6), quel réflexe de la Fiche 0 (discours formel) doit impérativement apparaître dans la rédaction des 4 justifications ?',
    options: [
      'Fixer explicitement les variables concernées (« Soit \\(x&gt;1\\) », par exemple) et conclure en recopiant exactement l’ensemble visé, sans raccourci',
      'Aucun : la Fiche 0 ne concerne que les démonstrations de limites',
      'Utiliser uniquement des signes \\(=\\) et \\(\\leq\\), jamais \\(\\Rightarrow\\) ni \\(\\Leftrightarrow\\)',
    ],
    correctIndex: 0,
    explain: 'Même une démonstration « géométrique » comme celle-ci suit les réflexes généraux de rédaction : fixer les objets utilisés, et conclure en recopiant précisément ce qui était demandé — ces réflexes de la Fiche 0 s’appliquent à toute démonstration, pas seulement aux limites.',
    wrongExplain: {
      1: 'La Fiche 0 pose des règles générales de rédaction mathématique (fixer une variable, conclure précisément…), valables pour N’IMPORTE QUELLE démonstration, pas seulement celles sur les limites.',
      2: 'Entre deux AFFIRMATIONS (comme les 4 justifications elles-mêmes, enchaînées logiquement), ce sont \\(\\Rightarrow\\)/\\(\\Leftrightarrow\\) qu’il faut utiliser, pas \\(=\\) ou \\(\\leq\\) qui relient des nombres.',
    },
  },
  {
    id: 'ex42', section: 'synthese-levy',
    statement: 'Un antécédent (Fiche 4) est exactement ce qu’on construit dans quelle autre fiche, pour démontrer le sens « \\(]0,1[\\subseteq E\\) » de la double inclusion ?',
    options: [
      'Fiche 6 (image d’un intervalle, méthode de secours) : on part de \\(y\\), on résout, on trouve \\(x\\), on vérifie qu’il convient — exactement « exhiber un antécédent »',
      'Fiche 3 (majorer une fraction)',
      'Fiche 5 (entiers et inégalité stricte)',
    ],
    correctIndex: 0,
    explain: 'C’est le lien explicitement signalé entre les deux fiches : prouver \\(]0,1[\\subseteq E\\) revient, méthodologiquement, à exhiber un antécédent par \\(f\\) pour chaque \\(y\\) — exactement la définition et le réflexe de la Fiche 4, réutilisés dans la Fiche 6.',
    wrongExplain: {
      1: 'La Fiche 3 porte sur la majoration de fractions par encadrement numérateur/dénominateur — une technique de calcul, sans rapport avec la notion d’antécédent.',
      2: 'La Fiche 5 porte sur les entiers et l’inégalité stricte — sans lien avec la notion d’antécédent d’une fonction.',
    },
  },
  {
    id: 'ex43', section: 'synthese-levy',
    statement: 'Pour démontrer \\((2)\\Rightarrow(1)\\) avec l’astuce \\(\\varepsilon/2\\) (Fiche 1), quel réflexe de la Fiche 0 faut-il appliquer AVANT de choisir \\(\\varepsilon’=\\varepsilon/2\\) ?',
    options: [
      'Fixer d’abord \\(\\varepsilon&gt;0\\) (« Soit \\(\\varepsilon&gt;0\\) ») avant de définir \\(\\varepsilon’\\) en fonction de lui — on ne peut poser \\(\\varepsilon’=\\varepsilon/2\\) qu’après avoir fixé \\(\\varepsilon\\)',
      'Aucun réflexe de la Fiche 0 n’est nécessaire dans ce calcul',
      'Conclure immédiatement sans passer par \\(\\varepsilon’\\)',
    ],
    correctIndex: 0,
    explain: 'Comme toute démonstration d’un \\(\\forall\\varepsilon\\), on commence par fixer \\(\\varepsilon\\) (« Soit \\(\\varepsilon&gt;0\\) »), ce qui permet ENSUITE de définir \\(\\varepsilon’=\\varepsilon/2\\) en fonction de ce \\(\\varepsilon\\) précis — l’ordre des réflexes de la Fiche 0 s’applique ici aussi.',
    wrongExplain: {
      1: 'Même un calcul « technique » comme celui-ci suit les réflexes généraux de rédaction (fixer une variable avant de l’utiliser) — ce n’est jamais superflu.',
      2: 'Sans fixer \\(\\varepsilon\\) d’abord, \\(\\varepsilon’=\\varepsilon/2\\) n’aurait pas de sens : l’astuce dépend justement d’avoir déjà un \\(\\varepsilon\\) fixé sur lequel travailler.',
    },
  },
  {
    id: 'ex44', section: 'synthese-levy',
    statement: 'Pour l’exercice 56 (\\(f:\\mathbb{N}\\to\\mathbb{N}\\) strictement croissante \\(\\Rightarrow\\forall n, f(n)\\geq n\\)), quelles DEUX fiches se combinent dans l’étape d’hérédité ?',
    options: [
      'La stricte croissance de \\(f\\) (\\(f(n+1)&gt;f(n)\\)) ET la règle des entiers \\(a&gt;b\\Rightarrow a\\geq b+1\\) (Fiche 5) pour passer de \\(f(n+1)&gt;n\\) à \\(f(n+1)\\geq n+1\\)',
      'La quantité conjuguée (Fiche 2) et la majoration de fraction (Fiche 3)',
      'Le théorème de l’image d’un intervalle (Fiche 6) uniquement',
    ],
    correctIndex: 0,
    explain: '\\(f(n+1)&gt;f(n)\\geq n\\) donne \\(f(n+1)&gt;n\\) ; comme \\(f(n+1)\\) et \\(n\\) sont des entiers, la règle de la Fiche 5 permet de resserrer cette inégalité stricte en \\(f(n+1)\\geq n+1\\), ce qui conclut l’hérédité.',
    wrongExplain: {
      1: 'La conjuguée et la majoration de fraction portent sur des calculs de limites de suites réelles — sans rapport avec cette récurrence sur des entiers.',
      2: 'Le théorème de l’image d’un intervalle concerne les fonctions continues sur \\(\\mathbb{R}\\) — \\(f\\) ici est une fonction de \\(\\mathbb{N}\\) dans \\(\\mathbb{N}\\), un cadre totalement différent.',
    },
  },
];

const SECTIONS = [
  {
    id: 'discours-formel', title: '§1 — LE DISCOURS FORMEL : RÉFLEXES DE RÉDACTION (FICHE 0)',
    cours: 'Fixer une variable avant de l’utiliser : <span class="math">« Soit »</span> consomme le \\(\\forall\\) — \\(\\varepsilon\\) ou \\(n\\) deviennent fixés<br>Pour montrer un \\(\\exists\\), on l’exhibe : <span class="math">« Posons N = … »</span>, jamais une existence vague<br>Entre deux affirmations : \\(\\Rightarrow\\) ou \\(\\Leftrightarrow\\) ; entre deux nombres : \\(=\\), \\(\\leq\\), \\(&lt;\\) — jamais \\(\\Rightarrow\\) entre deux nombres<br><span class="math">Ordre des quantificateurs</span> : \\(\\forall\\varepsilon\\,\\exists N\\) (\\(N\\) dépend de \\(\\varepsilon\\)) \\(\\neq\\) \\(\\exists N\\,\\forall\\varepsilon\\) (plus fort)<br>Conclure : on recopie exactement l’énoncé visé au départ',
  },
  {
    id: 'limite-epsilon', title: '§2 — LIMITE : « ≤ε » OU « &lt;ε », L’ASTUCE ε/2 (FICHE 1)',
    cours: '\\(\\forall\\varepsilon&gt;0,\\exists N,\\forall n\\geq N,|u_n-\\ell|&lt;\\varepsilon\\) et la version en \\(\\leq\\varepsilon\\) sont équivalentes<br>\\((&lt;)\\Rightarrow(\\leq)\\) immédiat ; \\((\\leq)\\Rightarrow(&lt;)\\) : on applique l’hypothèse à \\(\\varepsilon’=\\varepsilon/2&gt;0\\), puis \\(\\varepsilon/2&lt;\\varepsilon\\)<br><span class="math">Astuce ε/2</span> généralisable : dans un \\(\\forall\\varepsilon&gt;0\\), on choisit n’importe quel \\(\\varepsilon’&gt;0\\) bien adapté (\\(\\varepsilon/2\\), \\(\\varepsilon/3\\), \\(\\varepsilon/(2M)\\)…)',
  },
  {
    id: 'quantite-conjuguee', title: '§3 — LA QUANTITÉ CONJUGUÉE (FICHE 2)',
    cours: '<span class="math">Quantité conjuguée</span> \\((\\sqrt{A}-\\sqrt{B})(\\sqrt{A}+\\sqrt{B})=A-B\\) pour \\(A,B\\geq0\\) : réflexe devant une forme \\(\\infty-\\infty\\) de différence de racines<br>\\(\\sqrt{n^2}=|n|\\), égal à \\(n\\) SEULEMENT si \\(n\\geq0\\) — à justifier, jamais automatique<br>\\(a\\sqrt{b}=\\sqrt{a^2b}\\) valide seulement si \\(a\\geq0\\) ; \\(\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}\\)<br>Sous une racine, on factorise par le terme DOMINANT',
  },
  {
    id: 'majorer-fraction', title: '§4 — MAJORER UNE FRACTION (FICHE 3)',
    cours: 'Pour \\(0\\leq a\\leq M\\) et \\(b\\geq m&gt;0\\) : \\(a/b\\leq M/m\\)<br><span class="math">Réflexe</span> : majorer le numérateur, minorer le dénominateur par un nombre STRICTEMENT positif<br>Inverse : \\(b\\geq m&gt;0\\Rightarrow1/b\\leq1/m\\) (l’inégalité se retourne, seulement entre strictement positifs)<br>Minorer un dénominateur par 0 est interdit (division par 0, et \\(M/m\\) n’a alors aucun sens)',
  },
  {
    id: 'fonction-couples', title: '§5 — UNE FONCTION EST UN ENSEMBLE DE COUPLES (FICHE 4)',
    cours: 'Une fonction \\(f\\) de \\(E\\) dans \\(F\\) : partie \\(f\\subseteq E\\times F\\) où chaque \\(x\\) a AU PLUS une image<br>\\(D_f=\\{x\\in E:\\exists y\\in F,(x,y)\\in f\\}\\) ; \\(\\text{Im}\\,f=\\{f(x):x\\in D_f\\}\\subseteq F\\)<br>Vocabulaire : <span class="math">image</span> (une seule) / <span class="math">antécédent</span> (zéro, un ou plusieurs)<br>Pour montrer \\(y\\in\\text{Im}\\,f\\) : exhiber un \\(x\\in D_f\\) tel que \\(f(x)=y\\)',
  },
  {
    id: 'entiers-superieur', title: '§6 — ENTIERS : « a&gt;b » DONNE « a≥b+1 » (FICHE 5)',
    cours: 'Pour \\(a,b\\) entiers (\\(\\mathbb{N}\\) ou \\(\\mathbb{Z}\\)) : \\(a&gt;b\\Rightarrow a\\geq b+1\\)<br>Pourquoi : \\(a-b\\) est un entier strictement positif, donc \\(\\geq1\\) (aucun entier dans \\(]0,1[\\))<br><span class="math">Faux dans ℝ</span> : \\(2{,}5&gt;2\\) mais \\(2{,}5&lt;3\\) — toujours préciser « car ce sont des entiers »',
  },
  {
    id: 'image-intervalle', title: '§7 — L’IMAGE D’UN INTERVALLE (FICHE 6)',
    cours: '<span class="math">Théorème</span> : l’image d’un intervalle par une fonction continue est un intervalle — un tableau de variations seul ne suffit pas à conclure (« trop rapide »)<br>Les 4 justifications : continuité, stricte monotonie, limites aux bornes (pas une valeur en borne exclue), bornes atteintes ou non<br>Sur un intervalle ouvert, une fonction strictement croissante n’atteint jamais ses limites : crochets ouverts<br><span class="math">Méthode de secours</span> (double inclusion) : \\(E\\subseteq]0,1[\\) par encadrement direct ; \\(]0,1[\\subseteq E\\) en exhibant un antécédent (lien Fiche 4)',
  },
  {
    id: 'ensembles-notation', title: '§8 — DÉCRIRE UN ENSEMBLE : TYPE-CONDITION / FORME-TYPE (FICHE 7)',
    cours: '<span class="math">Type-condition</span> \\(\\{\\text{variables}\\in\\text{type};\\text{condition}\\}\\) : le type est l’ensemble ambiant, la condition le restreint<br><span class="math">Forme-type</span> \\(\\{\\text{forme};\\text{paramètre}\\in\\text{type}\\}\\) : le type est attaché au PARAMÈTRE, pas à la forme<br>Passage : on résout la condition, les variables libres deviennent des paramètres — \\(\\text{Vect}((1,3))\\), deux paires de parenthèses<br>Piège : ne pas réécrire l’ancien type (ex. \\(\\mathbb{R}^2\\)) à la place du type du paramètre',
  },
  {
    id: 'synthese-levy', title: '§9 — SYNTHÈSE : COMBINER LES RÉFLEXES',
    cours: '<span class="math">Synthèse</span> : ces réflexes se combinent dans un même exercice — conjuguée (Fiche 2) puis majoration de fraction (Fiche 3) pour un encadrement complet de limite<br>Discours formel (Fiche 0) : règles générales de rédaction, valables pour TOUTE démonstration, pas seulement les limites<br>« Antécédent » (Fiche 4) et « image d’un intervalle » (Fiche 6) : même geste, exhiber un \\(x\\) qui convient<br>Entiers (Fiche 5) + stricte croissance : resserrer une inégalité stricte entre entiers en \\(\\geq+1\\)',
  },
];

initFiche({ STATE_KEY: CHAPTER_STATE_KEYS.levy, CHAPTER_ID: 'levy', EXERCISES, SECTIONS });
