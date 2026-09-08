/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/algebre.js
   Fiche ALGÈBRE — Nombres complexes.
   Source : « Algèbre linéaire 1 », L1 mathématiques, INU Champollion,
   Pascal Ortiz — chapitre I (Nombres complexes), section 5 « Résultats
   à connaître, mémento des formules » (fichier algebre_lineaire1.pdf,
   dossier Math du Drive de Pierre). QCM à 3 réponses, LaTeX (KaTeX).

   Réécrite le 08/09/2026 (demande explicite : au moins une question
   de cours par paragraphe du mémento) à partir du mémento lui-même
   plutôt que de l'exposé détaillé du chapitre — le mémento EST déjà
   le condensé que le cours fournit, section par section, exactement
   ce qu'il faut pour construire les QCM. Sections organisées comme le
   mémento (formules générales / forme algébrique / conjugaison /
   module / forme trigo-expo / racines & équations), pas comme le
   sommaire du chapitre (qui mélange définition et forme algébrique
   en une seule section 1). Chapitre II (Polynômes) et III (Espaces
   vectoriels) du même document : pas encore traités, à faire dans une
   prochaine session sur ce sujet (voir CLAUDE.md). */

const EXERCISES = [
  // ---------- §1 — Formules générales (valables dans ℂ comme dans ℝ) ----------
  {
    id: 'ex1', section: 'general',
    statement: '\\(i^2\\) est égal à :',
    options: ['\\(-1\\)', '\\(1\\)', '\\(i\\)'],
    correctIndex: 0,
    explain: 'Par définition, \\(i\\) est un nombre tel que \\(i^2=-1\\) — c’est la propriété fondatrice de \\(\\mathbb{C}\\).',
  },
  {
    id: 'ex2', section: 'general',
    statement: 'Pour \\(r \\in \\mathbb{R}^+\\), le nombre réel \\(-r\\) (négatif) s’écrit comme un carré dans \\(\\mathbb{C}\\) sous la forme :',
    options: ['\\((i\\sqrt{r})^2\\)', '\\((\\sqrt{r})^2\\)', '\\((-i\\sqrt{r})^2\\) n’existe pas'],
    correctIndex: 0,
    explain: '\\((i\\sqrt{r})^2 = i^2 \\cdot r = -r\\) : tout réel négatif devient un carré complexe, c’est exactement ce que \\(\\mathbb{C}\\) apporte de plus par rapport à \\(\\mathbb{R}\\).',
  },
  {
    id: 'ex3', section: 'general',
    statement: 'Pour \\(z \\in \\mathbb{C}\\), \\(z \\neq 1\\), et \\(n \\in \\mathbb{N}^*\\), la somme géométrique \\(1+z+\\cdots+z^{n-1}\\) est égale à :',
    options: ['\\(\\dfrac{1-z^n}{1-z}\\)', '\\(\\dfrac{1-z^n}{n}\\)', '\\(n \\cdot z^{n-1}\\)'],
    correctIndex: 0,
    explain: 'C’est la même formule de somme géométrique que dans \\(\\mathbb{R}\\), toujours valable pour des nombres complexes (si \\(z=1\\), la somme vaut simplement \\(n\\)).',
  },
  {
    id: 'ex4', section: 'general',
    statement: 'Pour \\(a, b \\in \\mathbb{C}\\) et \\(n \\in \\mathbb{N}\\), la formule du binôme de Newton \\((a+b)^n\\) se développe :',
    options: [
      'Exactement comme dans \\(\\mathbb{R}\\), avec les coefficients binomiaux \\(\\binom{n}{k}\\)',
      'Différemment, avec des coefficients divisés par \\(i\\)',
      'Seulement si \\(a\\) et \\(b\\) sont réels',
    ],
    correctIndex: 0,
    explain: 'La formule \\((a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}\\) ne dépend d’aucune propriété propre à \\(\\mathbb{R}\\) — elle reste valable pour des nombres complexes \\(a, b\\).',
  },
  {
    id: 'ex5', section: 'general',
    statement: 'Pour \\(a, b \\in \\mathbb{C}\\) et \\(n \\in \\mathbb{N}^*\\), \\(a^n - b^n\\) admet toujours pour facteur :',
    options: ['\\((a-b)\\)', '\\((a+b)\\)', '\\((a-ib)\\)'],
    correctIndex: 0,
    explain: '\\(a^n-b^n=(a-b)(a^{n-1}+a^{n-2}b+\\cdots+b^{n-1})\\), identité valable dans \\(\\mathbb{C}\\) comme dans \\(\\mathbb{R}\\).',
  },
  {
    id: 'ex6', section: 'general',
    statement: 'Pour \\(a, b \\in \\mathbb{C}\\), \\(a^2 + b^2\\) se factorise en :',
    options: ['\\((a+ib)(a-ib)\\)', '\\((a+b)^2\\)', '\\((a-ib)^2\\)'],
    correctIndex: 0,
    explain: 'En développant \\((a+ib)(a-ib) = a^2 - (ib)^2 = a^2 + b^2\\) car \\(i^2=-1\\) — une factorisation qui n’existe pas dans \\(\\mathbb{R}\\), rendue possible par \\(i\\).',
  },

  // ---------- §2 — Forme algébrique ----------
  {
    id: 'ex7', section: 'forme_algebrique',
    statement: 'L’écriture \\(z = a + ib\\) (avec \\(a, b \\in \\mathbb{R}\\)) d’un nombre complexe \\(z\\) est :',
    options: ['Toujours unique', 'Possible seulement si \\(b = 0\\)', 'Jamais unique'],
    correctIndex: 0,
    explain: 'L’unicité de l’écriture algébrique (parties réelle et imaginaire) est une propriété fondamentale de la construction de \\(\\mathbb{C}\\).',
  },
  {
    id: 'ex8', section: 'forme_algebrique',
    statement: 'Pour \\(a, b, c, d \\in \\mathbb{R}\\), \\(a + ib = c + id\\) équivaut à :',
    options: ['\\(a = c\\) et \\(b = d\\)', '\\(a + b = c + d\\)', '\\(ac = bd\\)'],
    correctIndex: 0,
    explain: 'C’est « l’identification des parties réelles et imaginaires » — conséquence directe de l’unicité de l’écriture \\(a+ib\\).',
  },
  {
    id: 'ex9', section: 'forme_algebrique',
    statement: 'Pour \\(a, b \\in \\mathbb{R}\\), \\(a + ib = 0\\) équivaut à :',
    options: ['\\(a = 0\\) et \\(b = 0\\)', '\\(a = -b\\)', '\\(a = 0\\) ou \\(b = 0\\)'],
    correctIndex: 0,
    explain: 'Cas particulier de l’identification (avec \\(c=d=0\\)) : les deux parties doivent être nulles simultanément.',
  },
  {
    id: 'ex10', section: 'forme_algebrique',
    statement: 'Un nombre complexe \\(z\\) est réel si et seulement si :',
    options: ['\\(\\text{Im}(z) = 0\\)', '\\(\\text{Re}(z) = 0\\)', '\\(z = 0\\)'],
    correctIndex: 0,
    explain: 'Par définition, \\(\\mathbb{R} \\subset \\mathbb{C}\\) correspond exactement aux nombres complexes de partie imaginaire nulle.',
  },
  {
    id: 'ex11', section: 'forme_algebrique',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), \\(\\text{Re}(z + z\')\\) est égal à :',
    options: ['\\(\\text{Re}(z) + \\text{Re}(z\')\\)', '\\(\\text{Re}(z) \\times \\text{Re}(z\')\\)', '\\(\\text{Re}(zz\')\\)'],
    correctIndex: 0,
    explain: 'Re et Im se comportent bien vis-à-vis de l’addition (linéarité) : la partie réelle d’une somme est la somme des parties réelles.',
  },
  {
    id: 'ex12', section: 'forme_algebrique',
    statement: 'Pour \\(k \\in \\mathbb{R}\\) et \\(z \\in \\mathbb{C}\\), \\(\\text{Re}(kz)\\) est égal à :',
    options: ['\\(k\\,\\text{Re}(z)\\)', '\\(k + \\text{Re}(z)\\)', '\\(\\text{Re}(k) \\times \\text{Re}(z)\\)'],
    correctIndex: 0,
    explain: 'Attention, cette propriété (« \\(\\mathbb{R}\\)-linéarité ») exige que \\(k\\) soit RÉEL — pour le produit par un complexe quelconque, Re ne se comporte pas aussi simplement.',
  },

  // ---------- §3 — Conjugaison ----------
  {
    id: 'ex13', section: 'conjugaison',
    statement: 'Le conjugué de \\(z = a + ib\\) est :',
    options: ['\\(a - ib\\)', '\\(-a + ib\\)', '\\(-a - ib\\)'],
    correctIndex: 0,
    explain: 'Le conjugué garde la partie réelle inchangée et inverse uniquement le signe de la partie imaginaire.',
  },
  {
    id: 'ex14', section: 'conjugaison',
    statement: 'D’après les formules d’Euler pour la conjugaison, \\(\\text{Re}(z)\\) est égal à :',
    options: ['\\(\\dfrac{z + \\bar{z}}{2}\\)', '\\(\\dfrac{z - \\bar{z}}{2}\\)', '\\(z + \\bar{z}\\)'],
    correctIndex: 0,
    explain: 'On retrouve la partie réelle en additionnant \\(z\\) et son conjugué (les parties imaginaires s’annulent), puis en divisant par 2.',
  },
  {
    id: 'ex15', section: 'conjugaison',
    statement: 'Un nombre complexe \\(z\\) est réel si et seulement si :',
    options: ['\\(z = \\bar{z}\\)', '\\(z = -\\bar{z}\\)', '\\(\\bar{z} = 0\\)'],
    correctIndex: 0,
    explain: 'Si \\(z\\) est réel, sa partie imaginaire est nulle donc conjuguer ne change rien ; réciproquement, \\(z=\\bar z\\) force \\(\\text{Im}(z)=0\\).',
  },
  {
    id: 'ex16', section: 'conjugaison',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), le conjugué de \\(z + z\'\\) est égal à :',
    options: ['\\(\\bar{z} + \\bar{z\'}\\)', '\\(\\overline{z} \\times \\overline{z\'}\\)', '\\(-\\bar{z} - \\bar{z\'}\\)'],
    correctIndex: 0,
    explain: 'La conjugaison est linéaire pour l’addition : le conjugué d’une somme est la somme des conjugués (et \\(\\overline{-z}=-\\bar z\\)).',
  },
  {
    id: 'ex17', section: 'conjugaison',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), le conjugué de \\(zz\'\\) est égal à :',
    options: ['\\(\\bar{z}\\,\\bar{z\'}\\)', '\\(\\bar{z} + \\bar{z\'}\\)', '\\(\\overline{z^{z\'}}\\)'],
    correctIndex: 0,
    explain: 'La conjugaison se comporte bien aussi avec le produit (et donc avec le quotient et les puissances \\(z^k\\)) : conjugué d’un produit = produit des conjugués.',
  },
  {
    id: 'ex18', section: 'conjugaison',
    statement: 'Pour \\(z \\in \\mathbb{C}\\), le conjugué du conjugué de \\(z\\), noté \\(\\overline{\\bar{z}}\\), est égal à :',
    options: ['\\(z\\)', '\\(-z\\)', '\\(\\bar{z}\\)'],
    correctIndex: 0,
    explain: 'La conjugaison est « involutive » : l’appliquer deux fois de suite redonne le nombre de départ.',
  },

  // ---------- §4 — Module ----------
  {
    id: 'ex19', section: 'module',
    statement: 'Si \\(z = 3 - 4i\\), alors \\(|z|\\) vaut :',
    options: ['\\(5\\)', '\\(7\\)', '\\(1\\)'],
    correctIndex: 0,
    explain: '\\(|z| = \\sqrt{\\text{Re}(z)^2+\\text{Im}(z)^2} = \\sqrt{3^2+4^2} = \\sqrt{25} = 5\\).',
  },
  {
    id: 'ex20', section: 'module',
    statement: 'Pour \\(z \\in \\mathbb{C}\\), \\(|z|^2\\) est égal à :',
    options: ['\\(z\\bar{z}\\)', '\\(z + \\bar{z}\\)', '\\(2\\,\\text{Re}(z)\\)'],
    correctIndex: 0,
    explain: 'C’est la définition intrinsèque du module (qui ne suppose pas d’écrire \\(z=a+ib\\)) : \\(|z| = \\sqrt{z\\bar z}\\).',
  },
  {
    id: 'ex21', section: 'module',
    statement: 'Pour \\(z \\in \\mathbb{C}\\), \\(z = 0\\) équivaut à :',
    options: ['\\(|z| = 0\\)', '\\(\\text{Re}(z) = 0\\)', '\\(\\arg(z) = 0\\)'],
    correctIndex: 0,
    explain: 'Le module ne s’annule que pour le nombre complexe nul lui-même — c’est ce qui en fait une vraie notion de « taille » de \\(z\\).',
  },
  {
    id: 'ex22', section: 'module',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), \\(|zz\'|\\) est égal à :',
    options: ['\\(|z| \\times |z\'|\\)', '\\(|z| + |z\'|\\)', '\\(|z| - |z\'|\\)'],
    correctIndex: 0,
    explain: 'Le module est multiplicatif : \\(|zz\'|^2 = (zz\')\\overline{(zz\')} = (z\\bar z)(z\'\\overline{z\'}) = |z|^2|z\'|^2\\).',
  },
  {
    id: 'ex23', section: 'module',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), l’inégalité triangulaire s’écrit :',
    options: ['\\(|z+z\'| \\leq |z|+|z\'|\\)', '\\(|z+z\'| = |z|+|z\'|\\)', '\\(|z+z\'| \\geq |z|+|z\'|\\)'],
    correctIndex: 0,
    explain: 'Le module de la somme ne dépasse jamais la somme des modules — c’est toujours une inégalité LARGE, l’égalité n’a lieu que dans des cas particuliers.',
  },
  {
    id: 'ex24', section: 'module',
    statement: 'Pour écrire \\(\\dfrac{1+2i}{2-3i}\\) sous forme algébrique, on multiplie numérateur et dénominateur par :',
    options: ['La quantité conjuguée du dénominateur, \\(2+3i\\)', 'La quantité conjuguée du numérateur, \\(1-2i\\)', 'Le module du dénominateur'],
    correctIndex: 0,
    explain: 'Multiplier par le conjugué du dénominateur transforme celui-ci en \\(|2-3i|^2 = 2^2+3^2\\), un réel — le dénominateur devient réel, on peut alors séparer partie réelle et imaginaire.',
  },
  {
    id: 'ex25', section: 'module',
    statement: 'L’ensemble \\(U\\) des nombres complexes de module 1 vérifie, pour \\(z \\in U\\) non nul :',
    options: ['\\(z^{-1} = \\bar{z}\\)', '\\(z^{-1} = -z\\)', '\\(z^{-1} = 0\\)'],
    correctIndex: 0,
    explain: 'C’est une caractérisation utile de \\(U\\) : puisque \\(z\\bar z = |z|^2 = 1\\), l’inverse de \\(z\\) est exactement son conjugué.',
  },

  // ---------- §5 — Forme trigonométrique, exponentielle, linéarisation ----------
  {
    id: 'ex26', section: 'trigo',
    statement: 'La forme exponentielle de \\(i\\) est :',
    options: ['\\(e^{i\\pi/2}\\)', '\\(e^{i\\pi}\\)', '\\(e^{2i\\pi}\\)'],
    correctIndex: 0,
    explain: '\\(i\\) est de module 1 et d’argument \\(\\pi/2\\) : sur le cercle trigonométrique, c’est l’angle droit.',
  },
  {
    id: 'ex27', section: 'trigo',
    statement: 'Un nombre complexe \\(z\\) vérifie \\(|z|=1\\) si et seulement si :',
    options: ['Il existe \\(t \\in \\mathbb{R}\\) tel que \\(z = e^{it}\\)', 'Sa partie réelle vaut 1', 'Son argument vaut 1'],
    correctIndex: 0,
    explain: 'Les nombres de module 1 sont exactement ceux qui s’écrivent \\(e^{it}\\) pour un certain réel \\(t\\) — c’est l’ensemble \\(U\\) du cercle trigonométrique.',
  },
  {
    id: 'ex28', section: 'trigo',
    statement: 'Pour \\(t \\in \\mathbb{R}\\), le conjugué de \\(e^{it}\\) est égal à :',
    options: ['\\(e^{-it}\\)', '\\(-e^{it}\\)', '\\(e^{it}\\)'],
    correctIndex: 0,
    explain: 'Conjuguer revient à changer le signe de l’argument : \\(\\overline{e^{it}} = \\cos t - i\\sin t = \\cos(-t)+i\\sin(-t) = e^{-it}\\).',
  },
  {
    id: 'ex29', section: 'trigo',
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
    id: 'ex30', section: 'trigo',
    statement: 'Pour \\(t \\in \\mathbb{R}\\), \\(e^{it} = 1\\) équivaut à :',
    options: ['\\(t \\equiv 0 \\; [2\\pi]\\)', '\\(t = 0\\) uniquement', '\\(t \\equiv \\pi \\; [2\\pi]\\)'],
    correctIndex: 0,
    explain: '\\(e^{it}=1\\) exactement quand \\(t\\) est un multiple entier de \\(2\\pi\\) — ne pas oublier le « modulo », il y a une infinité de solutions.',
  },
  {
    id: 'ex31', section: 'trigo',
    statement: 'La formule de Moivre s’écrit \\((e^{it})^n =\\)',
    options: [
      '\\(e^{int}\\)',
      '\\(ne^{it}\\)',
      '\\(e^{i t^n}\\)',
    ],
    correctIndex: 0,
    explain: 'Moivre multiplie l’angle par \\(n\\) — elle n’élève ni la base ni \\(t\\) directement à la puissance \\(n\\).',
  },
  {
    id: 'ex32', section: 'trigo',
    statement: 'Pour linéariser une expression contenant \\(\\cos^p x\\) ou \\(\\sin^p x\\), la première étape consiste à :',
    options: [
      'Remplacer \\(\\cos x\\) et \\(\\sin x\\) par leurs expressions en \\(e^{ix}\\) et \\(e^{-ix}\\) (formules d’Euler)',
      'Développer directement avec la formule de Moivre',
      'Remplacer \\(x\\) par une valeur numérique',
    ],
    correctIndex: 0,
    explain: 'La méthode de linéarisation part des formules d’Euler pour tout réécrire en exponentielles, développe avec le binôme, puis repasse en cosinus/sinus à la fin — dans cet ordre précis.',
  },

  // ---------- §6 — Racines carrées, équation du 2nd degré, racines n-ièmes ----------
  {
    id: 'ex33', section: 'equations',
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
    id: 'ex34', section: 'equations',
    statement: 'Pour trouver algébriquement une racine carrée \\(Z=x+iy\\) d’un complexe \\(z=a+ib\\) donné, après avoir identifié parties réelle et imaginaire, on ajoute au système une équation supplémentaire :',
    options: [
      '\\(x^2+y^2 = |z|\\)',
      '\\(x = y\\)',
      '\\(x^2 - y^2 = 0\\)',
    ],
    correctIndex: 0,
    explain: 'Cette équation, obtenue en prenant le module de \\(Z^2=z\\) (donc \\(|Z|^2=|z|\\)), complète le système et permet de trancher entre les solutions grâce au signe de \\(xy\\).',
  },
  {
    id: 'ex35', section: 'equations',
    statement: 'Dans \\(\\mathbb{C}\\), l’équation \\(az^2 + bz + c = 0\\) (avec \\(a \\neq 0\\)) admet toujours :',
    options: ['Au moins une solution', 'Zéro ou deux solutions', 'Exactement une solution'],
    correctIndex: 0,
    explain: 'Contrairement à \\(\\mathbb{R}\\), tout nombre complexe (même un \\(\\Delta\\) « négatif ») admet une racine carrée dans \\(\\mathbb{C}\\) : il y a donc toujours au moins une solution.',
  },
  {
    id: 'ex36', section: 'equations',
    statement: 'Pour \\(z \\in \\mathbb{C}^*\\) donné et \\(n \\in \\mathbb{N}^*\\), l’équation \\(Z^n = z\\) admet exactement :',
    options: ['\\(n\\) solutions distinctes', 'Une seule solution', '2 solutions, quel que soit \\(n\\)'],
    correctIndex: 0,
    explain: 'En écrivant \\(z=\\varrho e^{i\\theta}\\), les \\(n\\) solutions sont \\(Z_k = \\sqrt[n]{\\varrho}\\, e^{i(\\theta+2k\\pi)/n}\\) pour \\(k=0,\\ldots,n-1\\).',
  },
  {
    id: 'ex37', section: 'equations',
    statement: 'L’ensemble \\(U_n\\) des racines \\(n\\)-ièmes complexes de l’unité (solutions de \\(Z^n=1\\)) est formé des nombres :',
    options: [
      '\\(z_k = e^{2ik\\pi/n}\\) pour \\(k=0,\\ldots,n-1\\)',
      '\\(z_k = k\\) pour \\(k=0,\\ldots,n-1\\)',
      '\\(z_k = e^{ik\\pi}\\) pour \\(k=0,\\ldots,n-1\\)',
    ],
    correctIndex: 0,
    explain: 'Cas particulier de la question précédente avec \\(z=1=e^{i0}\\) : \\(\\varrho=1\\) et \\(\\theta=0\\).',
  },
  {
    id: 'ex38', section: 'equations',
    statement: 'Les images des \\(n\\) racines \\(n\\)-ièmes de l’unité forment, dans le plan complexe :',
    options: [
      'Un polygone régulier à \\(n\\) côtés, inscrit dans le cercle trigonométrique',
      'Une droite passant par l’origine',
      'Un cercle de rayon \\(n\\)',
    ],
    correctIndex: 0,
    explain: 'Elles sont toutes de module 1, régulièrement espacées d’un angle \\(2\\pi/n\\) : leurs images dessinent un polygone régulier dont un sommet est toujours le point \\((1,0)\\).',
  },
];

const SECTIONS = [
  {
    id: 'general', title: '§1 — FORMULES GÉNÉRALES DANS ℂ',
    cours: '\\(i^2=-1\\) ; pour \\(r\\geq0\\) réel, \\(-r=(i\\sqrt{r})^2\\) (tout négatif devient un carré complexe)<br>Somme géométrique, <span class="math">binôme de Newton</span> \\((a+b)^n=\\sum\\binom{n}{k}a^kb^{n-k}\\), \\(a^n-b^n=(a-b)(\\cdots)\\) : mêmes formules que dans \\(\\mathbb{R}\\)<br>Nouveau dans \\(\\mathbb{C}\\) : \\(a^2+b^2=(a+ib)(a-ib)\\)',
  },
  {
    id: 'forme_algebrique', title: '§2 — FORME ALGÉBRIQUE',
    cours: '\\(z=a+ib\\) (\\(a,b\\in\\mathbb{R}\\)) : écriture <span class="math">unique</span>, \\(\\text{Re}(z)=a\\), \\(\\text{Im}(z)=b\\)<br><span class="math">Identification</span> : \\(a+ib=c+id \\Leftrightarrow a=c\\) et \\(b=d\\) ; \\(z\\in\\mathbb{R}\\Leftrightarrow\\text{Im}(z)=0\\)<br>Linéarité de Re/Im pour la somme ; \\(\\text{Re}(kz)=k\\,\\text{Re}(z)\\) SEULEMENT si \\(k\\) est réel',
  },
  {
    id: 'conjugaison', title: '§3 — CONJUGAISON',
    cours: '\\(\\overline{a+ib}=a-ib\\) ; <span class="math">formules d’Euler</span> \\(\\text{Re}(z)=\\dfrac{z+\\bar z}{2}\\), \\(\\text{Im}(z)=\\dfrac{z-\\bar z}{2i}\\)<br>\\(z\\in\\mathbb{R}\\Leftrightarrow z=\\bar z\\) ; linéaire pour \\(+\\), \\(\\times\\), quotient et puissances : \\(\\overline{z+z\'}=\\bar z+\\bar{z\'}\\), \\(\\overline{zz\'}=\\bar z\\,\\bar{z\'}\\)<br><span class="math">Involutive</span> : \\(\\overline{\\bar z}=z\\)',
  },
  {
    id: 'module', title: '§4 — MODULE',
    cours: '\\(|z|=\\sqrt{a^2+b^2}=\\sqrt{z\\bar z}\\) ; \\(|z|^2=z\\bar z\\) ; \\(z=0\\Leftrightarrow|z|=0\\)<br>\\(|zz\'|=|z||z\'|\\) ; <span class="math">inégalité triangulaire</span> \\(|z+z\'|\\leq|z|+|z\'|\\)<br>Quotient sous forme algébrique : multiplier par le conjugué du dénominateur<br>\\(U=\\{|z|=1\\}\\) : \\(z^{-1}=\\bar z\\) pour \\(z\\in U\\)',
  },
  {
    id: 'trigo', title: '§5 — FORME TRIGONOMÉTRIQUE, EXPONENTIELLE, LINÉARISATION',
    cours: '\\(z \\neq 0\\) : \\(z = \\varrho e^{i\\theta}\\), \\(\\varrho = |z|\\), \\(\\theta = \\arg(z)\\) ; \\(|z|=1 \\Leftrightarrow z=e^{it}\\) pour un \\(t\\in\\mathbb{R}\\)<br>\\(\\overline{e^{it}}=e^{-it}\\) ; \\(e^{it}=1 \\Leftrightarrow t\\equiv0\\,[2\\pi]\\)<br><span class="math">Euler</span> : \\(\\cos t = \\dfrac{e^{it}+e^{-it}}{2}\\) ; <span class="math">Moivre</span> : \\((e^{it})^n = e^{int}\\)<br><span class="math">Linéarisation</span> : Euler → développer (binôme) → repasser en cos/sin<br>Par cœur : \\(i = e^{i\\pi/2}\\), \\(-1 = e^{i\\pi}\\)',
  },
  {
    id: 'equations', title: '§6 — RACINES CARRÉES, ÉQUATION DU 2ND DEGRÉ, RACINES nes',
    cours: '\\(z \\neq 0\\) \\(\\Rightarrow\\) 2 <span class="math">racines carrées</span> opposées ; méthode algébrique : poser \\(Z=x+iy\\), identifier, ajouter \\(x^2+y^2=|z|\\)<br>\\(az^2+bz+c=0\\) : \\(\\Delta = b^2-4ac\\) \\(\\Rightarrow\\) \\(z = \\dfrac{-b \\pm \\delta}{2a}\\) où \\(\\delta^2=\\Delta\\) — toujours au moins une solution dans \\(\\mathbb{C}\\)<br>\\(Z^n = z\\) (\\(z\\neq0\\)) \\(\\Rightarrow\\) exactement \\(n\\) solutions ; racines \\(n\\)-ièmes de l’unité \\(U_n\\) : \\(z_k=e^{2ik\\pi/n}\\), polygone régulier',
  },
];

initFiche({ STATE_KEY: CHAPTER_STATE_KEYS.algebre, CHAPTER_ID: 'algebre', EXERCISES, SECTIONS });
