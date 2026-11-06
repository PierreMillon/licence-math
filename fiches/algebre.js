/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/algebre.js
   Fiche ALGÈBRE — Nombres complexes (chapitre I) + Polynômes
   (chapitre II, §7).
   Source chapitre I : « Algèbre linéaire 1 », L1 mathématiques, INU
   Champollion, Pascal Ortiz — section 5 « Résultats à connaître,
   mémento des formules » (fichier algebre_lineaire1.pdf, dossier Math
   du Drive de Pierre). QCM à 3 réponses, LaTeX (KaTeX).

   Réécrite le 08/09/2026 (demande explicite : au moins une question
   de cours par paragraphe du mémento) à partir du mémento lui-même
   plutôt que de l'exposé détaillé du chapitre — le mémento EST déjà
   le condensé que le cours fournit, section par section, exactement
   ce qu'il faut pour construire les QCM. Sections organisées comme le
   mémento (formules générales / forme algébrique / conjugaison /
   module / forme trigo-expo / racines & équations), pas comme le
   sommaire du chapitre (qui mélange définition et forme algébrique
   en une seule section 1).

   §7 POLYNÔMES ajoutée le 21/10/2026 (demande explicite — chapitre II
   du même document, resté non traité jusque-là, voir CLAUDE.md). Pas
   de PDF de cours cette fois : source = 9 photos de tableau prises par
   Pierre en TD/CM le 21/10/2026 (transcrites intégralement), couvrant
   une équation fonctionnelle sur un polynôme ((X+3)P(X)=XP(X+1),
   raisonnement par l'absurde sur une infinité de racines), les
   relations de Viète (degré 3, calcul de \\(a^3+b^3+c^3\\) par deux
   méthodes), une division euclidienne évaluée en une racine
   irrationnelle, la construction d'un polynôme de degré imposé
   s'annulant sur 100 entiers donnés (produit de \\(X-k\\), élevé au
   carré pour doubler le degré sans changer les racines), et la preuve
   que cos n'est pas un polynôme (même argument des racines infinies).
   Même technique de fond répétée partout : un polynôme non nul a un
   nombre de racines borné par son degré — en avoir une infinité est
   la contradiction qui fait marcher tous ces raisonnements par
   l'absurde. Chapitre III (Espaces vectoriels) du même document
   algebre_lineaire1.pdf : toujours pas traité, à faire sur demande
   explicite (voir CLAUDE.md).

   wrongExplain (21/09/2026, voir calculus.js pour la convention
   complète) : ex12 mérite une note — pour \\(k\\) réel, \\(\\text{Re}(k)=k\\),
   donc l'option "fausse" \\(\\text{Re}(k)\\times\\text{Re}(z)\\) coïncide
   NUMÉRIQUEMENT avec la bonne réponse dans ce cas précis. Son
   wrongExplain ne prétend donc pas qu'elle est fausse en valeur, mais
   qu'elle suggère à tort une règle générale (valable même pour \\(k\\)
   complexe) qui, elle, est fausse — nuance gardée pour ne jamais
   affirmer une contre-vérité mathématique dans le message affiché. */

const EXERCISES = [
  // ---------- §1 — Formules générales (valables dans ℂ comme dans ℝ) ----------
  {
    id: 'ex1', section: 'general',
    statement: '\\(i^2\\) est égal à :',
    options: ['\\(-1\\)', '\\(1\\)', '\\(i\\)'],
    correctIndex: 0,
    explain: 'Par définition, \\(i\\) est un nombre tel que \\(i^2=-1\\) — c’est la propriété fondatrice de \\(\\mathbb{C}\\).',
    wrongExplain: {
      1: 'C’est \\(1^2\\) qui vaut \\(1\\) — \\(i\\) est justement défini pour que son carré soit NÉGATIF, contrairement à tout nombre réel.',
      2: 'Élever \\(i\\) au carré ne redonne pas \\(i\\) lui-même : \\(i^2=-1\\), un nombre réel, pas un nombre imaginaire.',
    },
  },
  {
    id: 'ex2', section: 'general',
    statement: 'Pour \\(r \\in \\mathbb{R}^+\\), le nombre réel \\(-r\\) (négatif) s’écrit comme un carré dans \\(\\mathbb{C}\\) sous la forme :',
    options: ['\\((i\\sqrt{r})^2\\)', '\\((\\sqrt{r})^2\\)', '\\((-i\\sqrt{r})^2\\) n’existe pas'],
    correctIndex: 0,
    explain: '\\((i\\sqrt{r})^2 = i^2 \\cdot r = -r\\) : tout réel négatif devient un carré complexe, c’est exactement ce que \\(\\mathbb{C}\\) apporte de plus par rapport à \\(\\mathbb{R}\\).',
    wrongExplain: {
      1: '\\((\\sqrt r)^2 = r\\), qui est POSITIF — pour obtenir le réel négatif \\(-r\\), il faut le facteur \\(i\\), qui apporte le signe via \\(i^2=-1\\).',
      2: 'C’est exactement ce que \\(\\mathbb{C}\\) permet : tout réel négatif s’écrit comme un carré complexe — cette écriture existe bel et bien.',
    },
  },
  {
    id: 'ex3', section: 'general',
    statement: 'Pour \\(z \\in \\mathbb{C}\\), \\(z \\neq 1\\), et \\(n \\in \\mathbb{N}^*\\), la somme géométrique \\(1+z+\\cdots+z^{n-1}\\) est égale à :',
    options: ['\\(\\dfrac{1-z^n}{1-z}\\)', '\\(\\dfrac{1-z^n}{n}\\)', '\\(n \\cdot z^{n-1}\\)'],
    correctIndex: 0,
    explain: 'C’est la même formule de somme géométrique que dans \\(\\mathbb{R}\\), toujours valable pour des nombres complexes (si \\(z=1\\), la somme vaut simplement \\(n\\)).',
    wrongExplain: {
      1: 'Le dénominateur doit être \\((1-z)\\), pas \\(n\\) — cette formule ne correspond à aucune somme géométrique connue.',
      2: 'Cette expression ressemble à la dérivée de \\(z^n\\), pas à la somme des termes \\(1+z+\\cdots+z^{n-1}\\).',
    },
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
    wrongExplain: {
      1: 'Les coefficients binomiaux \\(\\binom{n}{k}\\) sont des entiers, ils ne dépendent jamais de \\(i\\) — la formule du binôme reste identique, sans division par \\(i\\).',
      2: 'La formule du binôme ne suppose nulle part que \\(a\\) et \\(b\\) soient réels — elle reste valable pour des nombres complexes quelconques.',
    },
  },
  {
    id: 'ex5', section: 'general',
    statement: 'Pour \\(a, b \\in \\mathbb{C}\\) et \\(n \\in \\mathbb{N}^*\\), \\(a^n - b^n\\) admet toujours pour facteur :',
    options: ['\\((a-b)\\)', '\\((a+b)\\)', '\\((a-ib)\\)'],
    correctIndex: 0,
    explain: '\\(a^n-b^n=(a-b)(a^{n-1}+a^{n-2}b+\\cdots+b^{n-1})\\), identité valable dans \\(\\mathbb{C}\\) comme dans \\(\\mathbb{R}\\).',
    wrongExplain: {
      1: '\\((a+b)\\) ne divise \\(a^n-b^n\\) que dans certains cas particuliers — \\((a-b)\\), lui, divise TOUJOURS cette expression, quel que soit \\(n\\).',
      2: 'Rien ne justifie l’apparition de \\(i\\) ici : l’identité \\(a^n-b^n=(a-b)(\\cdots)\\) est purement algébrique, sans lien avec \\(i\\).',
    },
  },
  {
    id: 'ex6', section: 'general',
    statement: 'Pour \\(a, b \\in \\mathbb{C}\\), \\(a^2 + b^2\\) se factorise en :',
    options: ['\\((a+ib)(a-ib)\\)', '\\((a+b)^2\\)', '\\((a-ib)^2\\)'],
    correctIndex: 0,
    explain: 'En développant \\((a+ib)(a-ib) = a^2 - (ib)^2 = a^2 + b^2\\) car \\(i^2=-1\\) — une factorisation qui n’existe pas dans \\(\\mathbb{R}\\), rendue possible par \\(i\\).',
    wrongExplain: {
      1: '\\((a+b)^2=a^2+2ab+b^2\\), qui contient un terme \\(2ab\\) en trop — ce n’est pas égal à \\(a^2+b^2\\) en général.',
      2: '\\((a-ib)^2=a^2-2iab-b^2\\), qui n’est pas égal à \\(a^2+b^2\\) — il faut le PRODUIT de \\((a+ib)\\) et \\((a-ib)\\), pas le carré d’un seul facteur.',
    },
  },

  // ---------- §2 — Forme algébrique ----------
  {
    id: 'ex7', section: 'forme_algebrique',
    statement: 'L’écriture \\(z = a + ib\\) (avec \\(a, b \\in \\mathbb{R}\\)) d’un nombre complexe \\(z\\) est :',
    options: ['Toujours unique', 'Possible seulement si \\(b = 0\\)', 'Jamais unique'],
    correctIndex: 0,
    explain: 'L’unicité de l’écriture algébrique (parties réelle et imaginaire) est une propriété fondamentale de la construction de \\(\\mathbb{C}\\).',
    wrongExplain: {
      1: 'L’unicité de l’écriture algébrique vaut pour TOUT nombre complexe, pas seulement les réels (\\(b=0\\)) — c’est une propriété générale de \\(\\mathbb{C}\\).',
      2: 'C’est l’inverse : l’écriture \\(a+ib\\) est justement TOUJOURS unique — c’est une propriété fondamentale de la construction de \\(\\mathbb{C}\\).',
    },
  },
  {
    id: 'ex8', section: 'forme_algebrique',
    statement: 'Pour \\(a, b, c, d \\in \\mathbb{R}\\), \\(a + ib = c + id\\) équivaut à :',
    options: ['\\(a = c\\) et \\(b = d\\)', '\\(a + b = c + d\\)', '\\(ac = bd\\)'],
    correctIndex: 0,
    explain: 'C’est « l’identification des parties réelles et imaginaires » — conséquence directe de l’unicité de l’écriture \\(a+ib\\).',
    wrongExplain: {
      1: 'Cette condition est trop faible : \\(a+b=c+d\\) peut être vraie sans que \\(a=c\\) et \\(b=d\\) (ex. \\(a=3,b=1,c=1,d=3\\)) — il faut l’identification terme à terme.',
      2: 'Ce produit croisé n’a aucun rapport avec l’égalité de deux nombres complexes — l’identification porte sur les parties réelle et imaginaire séparément.',
    },
  },
  {
    id: 'ex9', section: 'forme_algebrique',
    statement: 'Pour \\(a, b \\in \\mathbb{R}\\), \\(a + ib = 0\\) équivaut à :',
    options: ['\\(a = 0\\) et \\(b = 0\\)', '\\(a = -b\\)', '\\(a = 0\\) ou \\(b = 0\\)'],
    correctIndex: 0,
    explain: 'Cas particulier de l’identification (avec \\(c=d=0\\)) : les deux parties doivent être nulles simultanément.',
    wrongExplain: {
      1: 'Cette condition n’a pas de lien avec la nullité de \\(a+ib\\) — par exemple \\(a=1,b=-1\\) vérifie \\(a=-b\\) mais \\(1-i\\neq0\\).',
      2: 'Il faut les DEUX conditions à la fois : si seul \\(a=0\\) (avec \\(b\\neq0\\)), il reste \\(ib\\neq0\\) — le complexe n’est pas nul.',
    },
  },
  {
    id: 'ex10', section: 'forme_algebrique',
    statement: 'Un nombre complexe \\(z\\) est réel si et seulement si :',
    options: ['\\(\\text{Im}(z) = 0\\)', '\\(\\text{Re}(z) = 0\\)', '\\(z = 0\\)'],
    correctIndex: 0,
    explain: 'Par définition, \\(\\mathbb{R} \\subset \\mathbb{C}\\) correspond exactement aux nombres complexes de partie imaginaire nulle.',
    wrongExplain: {
      1: '\\(\\text{Re}(z)=0\\) caractérise les nombres PUREMENT IMAGINAIRES, pas les réels — c’est la condition inverse.',
      2: '\\(z=0\\) n’est qu’UN SEUL nombre réel parmi une infinité d’autres (comme \\(z=5\\)) — cette condition est bien trop restrictive.',
    },
  },
  {
    id: 'ex11', section: 'forme_algebrique',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), \\(\\text{Re}(z + z\')\\) est égal à :',
    options: ['\\(\\text{Re}(z) + \\text{Re}(z\')\\)', '\\(\\text{Re}(z) \\times \\text{Re}(z\')\\)', '\\(\\text{Re}(zz\')\\)'],
    correctIndex: 0,
    explain: 'Re et Im se comportent bien vis-à-vis de l’addition (linéarité) : la partie réelle d’une somme est la somme des parties réelles.',
    wrongExplain: {
      1: 'C’est un produit, pas une somme : la linéarité de \\(\\text{Re}\\) porte sur l’ADDITION \\(z+z\'\\), pas sur le produit \\(zz\'\\).',
      2: '\\(\\text{Re}(zz\')\\) concerne le produit \\(zz\'\\), une expression différente de \\(z+z\'\\) — les deux ne coïncident pas en général.',
    },
  },
  {
    id: 'ex12', section: 'forme_algebrique',
    statement: 'Pour \\(k \\in \\mathbb{R}\\) et \\(z \\in \\mathbb{C}\\), \\(\\text{Re}(kz)\\) est égal à :',
    options: ['\\(k\\,\\text{Re}(z)\\)', '\\(k + \\text{Re}(z)\\)', '\\(\\text{Re}(k) \\times \\text{Re}(z)\\)'],
    correctIndex: 0,
    explain: 'Attention, cette propriété (« \\(\\mathbb{R}\\)-linéarité ») exige que \\(k\\) soit RÉEL — pour le produit par un complexe quelconque, Re ne se comporte pas aussi simplement.',
    wrongExplain: {
      1: 'C’est une addition, pas une multiplication : la propriété testée ici est \\(\\text{Re}(kz)=k\\,\\text{Re}(z)\\) (un produit), pas \\(k+\\text{Re}(z)\\).',
      2: 'Cette formulation n’est vraie ici que par coïncidence (puisque \\(k\\) est réel, \\(\\text{Re}(k)=k\\)) : elle suggère à tort une règle générale \\(\\text{Re}(k)\\times\\text{Re}(z)\\) qui serait fausse si \\(k\\) était complexe — la vraie propriété testée est la \\(\\mathbb{R}\\)-linéarité \\(\\text{Re}(kz)=k\\,\\text{Re}(z)\\).',
    },
  },

  // ---------- §3 — Conjugaison ----------
  {
    id: 'ex13', section: 'conjugaison',
    statement: 'Le conjugué de \\(z = a + ib\\) est :',
    options: ['\\(a - ib\\)', '\\(-a + ib\\)', '\\(-a - ib\\)'],
    correctIndex: 0,
    explain: 'Le conjugué garde la partie réelle inchangée et inverse uniquement le signe de la partie imaginaire.',
    wrongExplain: {
      1: 'C’est la partie RÉELLE qui a changé de signe ici, alors que le conjugué garde \\(a\\) inchangé et inverse seulement le signe de la partie imaginaire.',
      2: 'Les DEUX parties ont changé de signe ici (c’est \\(-z\\), l’opposé de \\(z\\)) — le conjugué ne change que le signe de la partie imaginaire.',
    },
  },
  {
    id: 'ex14', section: 'conjugaison',
    statement: 'D’après les formules d’Euler pour la conjugaison, \\(\\text{Re}(z)\\) est égal à :',
    options: ['\\(\\dfrac{z + \\bar{z}}{2}\\)', '\\(\\dfrac{z - \\bar{z}}{2}\\)', '\\(z + \\bar{z}\\)'],
    correctIndex: 0,
    explain: 'On retrouve la partie réelle en additionnant \\(z\\) et son conjugué (les parties imaginaires s’annulent), puis en divisant par 2.',
    wrongExplain: {
      1: 'C’est \\((z-\\bar z)/2i\\) (avec un \\(i\\) au dénominateur) qui donne \\(\\text{Im}(z)\\) — cette formule-ci correspond à la partie imaginaire, pas à la partie réelle.',
      2: 'Il manque la division par \\(2\\) : \\(z+\\bar z\\) vaut \\(2\\,\\text{Re}(z)\\), pas \\(\\text{Re}(z)\\) directement.',
    },
  },
  {
    id: 'ex15', section: 'conjugaison',
    statement: 'Un nombre complexe \\(z\\) est réel si et seulement si :',
    options: ['\\(z = \\bar{z}\\)', '\\(z = -\\bar{z}\\)', '\\(\\bar{z} = 0\\)'],
    correctIndex: 0,
    explain: 'Si \\(z\\) est réel, sa partie imaginaire est nulle donc conjuguer ne change rien ; réciproquement, \\(z=\\bar z\\) force \\(\\text{Im}(z)=0\\).',
    wrongExplain: {
      1: '\\(z=-\\bar z\\) caractérise les nombres PUREMENT IMAGINAIRES, pas les réels — c’est la condition opposée.',
      2: '\\(\\bar z=0\\) équivaut à \\(z=0\\), un seul nombre réel parmi une infinité — cette condition est bien trop restrictive pour caractériser tous les réels.',
    },
  },
  {
    id: 'ex16', section: 'conjugaison',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), le conjugué de \\(z + z\'\\) est égal à :',
    options: ['\\(\\bar{z} + \\bar{z\'}\\)', '\\(\\overline{z} \\times \\overline{z\'}\\)', '\\(-\\bar{z} - \\bar{z\'}\\)'],
    correctIndex: 0,
    explain: 'La conjugaison est linéaire pour l’addition : le conjugué d’une somme est la somme des conjugués (et \\(\\overline{-z}=-\\bar z\\)).',
    wrongExplain: {
      1: 'C’est la règle du PRODUIT (\\(\\overline{zz\'}=\\bar z\\,\\bar{z\'}\\)), pas celle de la somme — les deux règles existent mais ne s’appliquent pas à la même opération.',
      2: 'Rien ne justifie ce signe négatif supplémentaire : conjuguer une somme ne change pas son signe global, seulement le signe de chaque partie imaginaire.',
    },
  },
  {
    id: 'ex17', section: 'conjugaison',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), le conjugué de \\(zz\'\\) est égal à :',
    options: ['\\(\\bar{z}\\,\\bar{z\'}\\)', '\\(\\bar{z} + \\bar{z\'}\\)', '\\(\\overline{z^{z\'}}\\)'],
    correctIndex: 0,
    explain: 'La conjugaison se comporte bien aussi avec le produit (et donc avec le quotient et les puissances \\(z^k\\)) : conjugué d’un produit = produit des conjugués.',
    wrongExplain: {
      1: 'C’est la règle de la SOMME (\\(\\overline{z+z\'}=\\bar z+\\bar{z\'}\\)), pas celle du produit — les deux règles portent sur des opérations différentes.',
      2: '\\(z^{z\'}\\) (une puissance complexe de \\(z\\)) n’a rien à voir avec le produit \\(zz\'\\) — cette expression ne correspond pas à la question posée.',
    },
  },
  {
    id: 'ex18', section: 'conjugaison',
    statement: 'Pour \\(z \\in \\mathbb{C}\\), le conjugué du conjugué de \\(z\\), noté \\(\\overline{\\bar{z}}\\), est égal à :',
    options: ['\\(z\\)', '\\(-z\\)', '\\(\\bar{z}\\)'],
    correctIndex: 0,
    explain: 'La conjugaison est « involutive » : l’appliquer deux fois de suite redonne le nombre de départ.',
    wrongExplain: {
      1: 'Conjuguer deux fois ne change pas le signe de \\(z\\) — la conjugaison est involutive, elle redonne exactement le nombre de départ, pas son opposé.',
      2: 'Si conjuguer deux fois redonnait simplement \\(\\bar z\\), la seconde conjugaison n’aurait aucun effet — ce n’est pas le cas : elle redonne \\(z\\) lui-même.',
    },
  },

  // ---------- §4 — Module ----------
  {
    id: 'ex19', section: 'module',
    statement: 'Si \\(z = 3 - 4i\\), alors \\(|z|\\) vaut :',
    options: ['\\(5\\)', '\\(7\\)', '\\(1\\)'],
    correctIndex: 0,
    explain: '\\(|z| = \\sqrt{\\text{Re}(z)^2+\\text{Im}(z)^2} = \\sqrt{3^2+4^2} = \\sqrt{25} = 5\\).',
    wrongExplain: {
      1: 'On additionne \\(3+4=7\\) au lieu de calculer \\(\\sqrt{3^2+4^2}\\) — le module n’est pas la somme des parties réelle et imaginaire.',
      2: 'Cette valeur ne correspond à aucun calcul correct du module — il faut passer par \\(\\sqrt{\\text{Re}(z)^2+\\text{Im}(z)^2}=\\sqrt{9+16}=\\sqrt{25}=5\\).',
    },
  },
  {
    id: 'ex20', section: 'module',
    statement: 'Pour \\(z \\in \\mathbb{C}\\), \\(|z|^2\\) est égal à :',
    options: ['\\(z\\bar{z}\\)', '\\(z + \\bar{z}\\)', '\\(2\\,\\text{Re}(z)\\)'],
    correctIndex: 0,
    explain: 'C’est la définition intrinsèque du module (qui ne suppose pas d’écrire \\(z=a+ib\\)) : \\(|z| = \\sqrt{z\\bar z}\\).',
    wrongExplain: {
      1: '\\(z+\\bar z=2\\,\\text{Re}(z)\\), une quantité réelle liée à la partie réelle, mais qui n’est PAS égale à \\(|z|^2\\) en général.',
      2: 'C’est la même expression que l’option précédente : elle ne fait intervenir que la partie réelle, alors que \\(|z|^2\\) fait aussi intervenir la partie imaginaire.',
    },
  },
  {
    id: 'ex21', section: 'module',
    statement: 'Pour \\(z \\in \\mathbb{C}\\), \\(z = 0\\) équivaut à :',
    options: ['\\(|z| = 0\\)', '\\(\\text{Re}(z) = 0\\)', '\\(\\arg(z) = 0\\)'],
    correctIndex: 0,
    explain: 'Le module ne s’annule que pour le nombre complexe nul lui-même — c’est ce qui en fait une vraie notion de « taille » de \\(z\\).',
    wrongExplain: {
      1: '\\(\\text{Re}(z)=0\\) signifie seulement que \\(z\\) est PUREMENT IMAGINAIRE (ex. \\(z=2i\\)) — ça n’implique pas que \\(z\\) soit nul.',
      2: 'L’argument n’est même pas défini pour \\(z=0\\) — et \\(\\arg(z)=0\\) pour un \\(z\\neq0\\) signifie juste que \\(z\\) est un réel positif, pas qu’il est nul.',
    },
  },
  {
    id: 'ex22', section: 'module',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), \\(|zz\'|\\) est égal à :',
    options: ['\\(|z| \\times |z\'|\\)', '\\(|z| + |z\'|\\)', '\\(|z| - |z\'|\\)'],
    correctIndex: 0,
    explain: 'Le module est multiplicatif : \\(|zz\'|^2 = (zz\')\\overline{(zz\')} = (z\\bar z)(z\'\\overline{z\'}) = |z|^2|z\'|^2\\).',
    wrongExplain: {
      1: 'Le module est MULTIPLICATIF, pas additif : c’est le produit \\(|z|\\times|z\'|\\), pas leur somme.',
      2: 'Une différence de modules peut être négative, ce qui est impossible pour \\(|zz\'|\\) (toujours positif ou nul) — ce n’est pas la bonne opération.',
    },
  },
  {
    id: 'ex23', section: 'module',
    statement: 'Pour \\(z, z\' \\in \\mathbb{C}\\), l’inégalité triangulaire s’écrit :',
    options: ['\\(|z+z\'| \\leq |z|+|z\'|\\)', '\\(|z+z\'| = |z|+|z\'|\\)', '\\(|z+z\'| \\geq |z|+|z\'|\\)'],
    correctIndex: 0,
    explain: 'Le module de la somme ne dépasse jamais la somme des modules — c’est toujours une inégalité LARGE, l’égalité n’a lieu que dans des cas particuliers.',
    wrongExplain: {
      1: 'L’égalité n’a lieu que dans des cas particuliers (\\(z\\) et \\(z\'\\) de même argument) — en général, c’est une inégalité, pas une égalité systématique.',
      2: 'C’est le sens inverse : le module d’une somme ne peut jamais DÉPASSER la somme des modules, l’inégalité va dans l’autre sens.',
    },
  },
  {
    id: 'ex24', section: 'module',
    statement: 'Pour écrire \\(\\dfrac{1+2i}{2-3i}\\) sous forme algébrique, on multiplie numérateur et dénominateur par :',
    options: ['La quantité conjuguée du dénominateur, \\(2+3i\\)', 'La quantité conjuguée du numérateur, \\(1-2i\\)', 'Le module du dénominateur'],
    correctIndex: 0,
    explain: 'Multiplier par le conjugué du dénominateur transforme celui-ci en \\(|2-3i|^2 = 2^2+3^2\\), un réel — le dénominateur devient réel, on peut alors séparer partie réelle et imaginaire.',
    wrongExplain: {
      1: 'Il faut agir sur le DÉNOMINATEUR (celui qui contient encore \\(i\\) après l’opération) — conjuguer le numérateur ne rend pas le dénominateur réel.',
      2: 'Multiplier par le module (un simple nombre réel) ne change pas la nature complexe du dénominateur, qui reste un multiple de \\(2-3i\\) — seule la quantité CONJUGUÉE élimine le \\(i\\).',
    },
  },
  {
    id: 'ex25', section: 'module',
    statement: 'L’ensemble \\(U\\) des nombres complexes de module 1 vérifie, pour \\(z \\in U\\) non nul :',
    options: ['\\(z^{-1} = \\bar{z}\\)', '\\(z^{-1} = -z\\)', '\\(z^{-1} = 0\\)'],
    correctIndex: 0,
    explain: 'C’est une caractérisation utile de \\(U\\) : puisque \\(z\\bar z = |z|^2 = 1\\), l’inverse de \\(z\\) est exactement son conjugué.',
    wrongExplain: {
      1: 'Rien ne justifie ce signe négatif : c’est le CONJUGUÉ de \\(z\\), pas son opposé, qui joue le rôle d’inverse quand \\(|z|=1\\).',
      2: 'Un nombre non nul a toujours un inverse non nul — \\(z^{-1}=0\\) est impossible, quel que soit \\(z\\neq0\\).',
    },
  },

  // ---------- §5 — Forme trigonométrique, exponentielle, linéarisation ----------
  {
    id: 'ex26', section: 'trigo',
    statement: 'La forme exponentielle de \\(i\\) est :',
    options: ['\\(e^{i\\pi/2}\\)', '\\(e^{i\\pi}\\)', '\\(e^{2i\\pi}\\)'],
    correctIndex: 0,
    explain: '\\(i\\) est de module 1 et d’argument \\(\\pi/2\\) : sur le cercle trigonométrique, c’est l’angle droit.',
    wrongExplain: {
      1: '\\(e^{i\\pi}=-1\\), pas \\(i\\) — c’est l’angle \\(\\pi\\) (demi-tour), pas l’angle droit \\(\\pi/2\\) qui correspond à \\(i\\).',
      2: '\\(e^{2i\\pi}=1\\) (tour complet), pas \\(i\\) — il faut l’angle \\(\\pi/2\\) (quart de tour) pour obtenir \\(i\\).',
    },
  },
  {
    id: 'ex27', section: 'trigo',
    statement: 'Un nombre complexe \\(z\\) vérifie \\(|z|=1\\) si et seulement si :',
    options: ['Il existe \\(t \\in \\mathbb{R}\\) tel que \\(z = e^{it}\\)', 'Sa partie réelle vaut 1', 'Son argument vaut 1'],
    correctIndex: 0,
    explain: 'Les nombres de module 1 sont exactement ceux qui s’écrivent \\(e^{it}\\) pour un certain réel \\(t\\) — c’est l’ensemble \\(U\\) du cercle trigonométrique.',
    wrongExplain: {
      1: '\\(\\text{Re}(z)=1\\) ne concerne qu’un seul point du cercle trigonométrique (\\(z=1\\)) — \\(|z|=1\\) est vérifié par TOUS les points du cercle.',
      2: '\\(\\arg(z)=1\\) fixe un angle précis (1 radian), ce qui ne détermine qu’un seul point du cercle — \\(|z|=1\\) autorise n’importe quel angle.',
    },
  },
  {
    id: 'ex28', section: 'trigo',
    statement: 'Pour \\(t \\in \\mathbb{R}\\), le conjugué de \\(e^{it}\\) est égal à :',
    options: ['\\(e^{-it}\\)', '\\(-e^{it}\\)', '\\(e^{it}\\)'],
    correctIndex: 0,
    explain: 'Conjuguer revient à changer le signe de l’argument : \\(\\overline{e^{it}} = \\cos t - i\\sin t = \\cos(-t)+i\\sin(-t) = e^{-it}\\).',
    wrongExplain: {
      1: 'Rien ne justifie ce signe négatif : conjuguer revient à inverser le signe de l’ANGLE, pas à multiplier le nombre par \\(-1\\).',
      2: 'Conjuguer \\(e^{it}\\) change le signe de l’angle : \\(\\overline{e^{it}}=e^{-it}\\) est en général différent de \\(e^{it}\\) (sauf si \\(t\\) est un multiple de \\(\\pi\\)).',
    },
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
    wrongExplain: {
      1: 'Cette différence (divisée par \\(2i\\), pas par \\(2\\)) donne \\(\\sin t\\), pas \\(\\cos t\\).',
      2: 'Il manque le terme \\(e^{-it}\\) : \\(\\cos t\\) est la MOYENNE de \\(e^{it}\\) et de son conjugué, pas la moitié de \\(e^{it}\\) seul.',
    },
  },
  {
    id: 'ex30', section: 'trigo',
    statement: 'Pour \\(t \\in \\mathbb{R}\\), \\(e^{it} = 1\\) équivaut à :',
    options: ['\\(t \\equiv 0 \\; [2\\pi]\\)', '\\(t = 0\\) uniquement', '\\(t \\equiv \\pi \\; [2\\pi]\\)'],
    correctIndex: 0,
    explain: '\\(e^{it}=1\\) exactement quand \\(t\\) est un multiple entier de \\(2\\pi\\) — ne pas oublier le « modulo », il y a une infinité de solutions.',
    wrongExplain: {
      1: 'Il n’y a pas qu’une seule solution : \\(t=2\\pi\\), \\(t=4\\pi\\), \\(t=-2\\pi\\)... vérifient tous \\(e^{it}=1\\) — ne pas oublier le « modulo \\(2\\pi\\) ».',
      2: '\\(t\\equiv\\pi\\,[2\\pi]\\) correspond à \\(e^{it}=-1\\), pas à \\(e^{it}=1\\).',
    },
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
    wrongExplain: {
      1: 'Moivre ne multiplie pas le NOMBRE \\(e^{it}\\) par \\(n\\), mais l’ANGLE \\(t\\) — c’est l’exposant qui est multiplié par \\(n\\), pas le résultat tout entier.',
      2: 'C’est \\(t\\) qui doit être multiplié par \\(n\\) dans l’exposant (\\(int\\)), pas élevé à la puissance \\(n\\) (\\(t^n\\)).',
    },
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
    wrongExplain: {
      1: 'La formule de Moivre sert à calculer \\((e^{it})^n\\), pas à transformer \\(\\cos^p x\\) ou \\(\\sin^p x\\) en somme de cosinus/sinus — c’est Euler qu’il faut utiliser en premier.',
      2: 'Remplacer \\(x\\) par un nombre particulier ne « linéarise » rien : on perd l’expression générale, ce qui n’est pas le but de la méthode.',
    },
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
    wrongExplain: {
      1: 'Si \\(Z_0\\) est une racine carrée de \\(z\\), alors \\(-Z_0\\) aussi (car \\((-Z_0)^2=Z_0^2=z\\)) — il y en a donc toujours deux, pas une seule.',
      2: 'Une racine carrée fait intervenir un exposant \\(2\\), pas \\(3\\) : il y a exactement deux racines carrées, pas trois.',
    },
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
    wrongExplain: {
      1: 'Rien ne garantit que \\(x=y\\) pour une racine carrée quelconque — cette condition n’est pas déduite du système, contrairement à \\(x^2+y^2=|z|\\) qui vient de \\(|Z|^2=|z|\\).',
      2: 'Cette condition forcerait \\(x=\\pm y\\), ce qui n’est vrai que pour des cas très particuliers de \\(z\\) — l’équation générale, valable pour tout \\(z\\), est \\(x^2+y^2=|z|\\).',
    },
  },
  {
    id: 'ex35', section: 'equations',
    statement: 'Dans \\(\\mathbb{C}\\), l’équation \\(az^2 + bz + c = 0\\) (avec \\(a \\neq 0\\)) admet toujours :',
    options: ['Au moins une solution', 'Zéro ou deux solutions', 'Exactement une solution'],
    correctIndex: 0,
    explain: 'Contrairement à \\(\\mathbb{R}\\), tout nombre complexe (même un \\(\\Delta\\) « négatif ») admet une racine carrée dans \\(\\mathbb{C}\\) : il y a donc toujours au moins une solution.',
    wrongExplain: {
      1: 'Contrairement à \\(\\mathbb{R}\\), il ne peut jamais y avoir zéro solution dans \\(\\mathbb{C}\\) : tout nombre complexe admet une racine carrée, donc l’équation a toujours au moins une solution.',
      2: 'En général, l’équation a deux solutions distinctes (une seule si \\(\\Delta=0\\), racine double) — dire qu’il y en a toujours exactement une est trop restrictif.',
    },
  },
  {
    id: 'ex36', section: 'equations',
    statement: 'Pour \\(z \\in \\mathbb{C}^*\\) donné et \\(n \\in \\mathbb{N}^*\\), l’équation \\(Z^n = z\\) admet exactement :',
    options: ['\\(n\\) solutions distinctes', 'Une seule solution', '2 solutions, quel que soit \\(n\\)'],
    correctIndex: 0,
    explain: 'En écrivant \\(z=\\varrho e^{i\\theta}\\), les \\(n\\) solutions sont \\(Z_k = \\sqrt[n]{\\varrho}\\, e^{i(\\theta+2k\\pi)/n}\\) pour \\(k=0,\\ldots,n-1\\).',
    wrongExplain: {
      1: 'Il y a exactement \\(n\\) solutions distinctes (une pour chaque \\(k=0,\\ldots,n-1\\)), pas une seule.',
      2: 'Le nombre de solutions dépend de \\(n\\) : ce n’est pas toujours \\(2\\), sauf dans le cas particulier \\(n=2\\) (racines carrées).',
    },
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
    wrongExplain: {
      1: 'Ces nombres \\(k=0,1,\\ldots,n-1\\) ne sont même pas de module 1 (sauf \\(k=1\\)) — ils ne peuvent pas être solutions de \\(Z^n=1\\).',
      2: 'Il manque le facteur \\(2\\) et la division par \\(n\\) dans l’angle : sans eux, cette formule ne donne que des angles multiples de \\(\\pi\\), pas les \\(n\\) angles régulièrement espacés attendus.',
    },
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
    wrongExplain: {
      1: 'Les \\(n\\) racines sont réparties tout autour du cercle, pas alignées : une droite ne peut pas représenter \\(n\\) points régulièrement espacés en angle.',
      2: 'Le rayon du cercle vaut \\(1\\) (module de chaque racine), pas \\(n\\) — c’est le NOMBRE de points qui vaut \\(n\\), pas le rayon.',
    },
  },

  // ---------- §7 — Polynômes (chapitre II) ----------
  {
    id: 'ex39', section: 'polynomes',
    statement: 'Si un polynôme \\(Q\\in\\mathbb{R}[X]\\) (ou \\(\\mathbb{C}[X]\\)) admet une INFINITÉ de racines, alors :',
    options: ['\\(Q=0\\) (le polynôme nul)', '\\(Q\\) est de degré infini', '\\(Q\\) a nécessairement un degré pair'],
    correctIndex: 0,
    explain: 'Un polynôme non nul de degré \\(n\\) a AU PLUS \\(n\\) racines — en avoir une infinité est donc impossible sauf si \\(Q\\) est le polynôme nul. C’est l’argument clé pour montrer qu’une fonction comme cos n’est pas polynomiale, ou qu’un facteur \\(Q\\) dans une équation fonctionnelle est constant.',
    wrongExplain: {
      1: 'Un polynôme a toujours un degré FINI par définition — « degré infini » n’a pas de sens pour un polynôme.',
      2: 'Rien n’impose une parité particulière — la seule conclusion valable est que \\(Q\\) est le polynôme NUL.',
    },
  },
  {
    id: 'ex40', section: 'polynomes',
    statement: 'Pour résoudre \\((X+3)P(X)=XP(X+1)\\), en remplaçant \\(X\\) par \\(0\\), \\(-1\\) puis \\(-2\\) dans l’équation, on montre que :',
    options: [
      '\\(-2,-1,0\\) sont tous racines de \\(P\\)',
      '\\(P\\) est de degré 3 exactement',
      '\\(P\\) n’a aucune racine réelle',
    ],
    correctIndex: 0,
    explain: 'Évaluer l’équation fonctionnelle en des points bien choisis (ici 0, -1, -2, qui annulent un des deux membres) révèle directement des racines de \\(P\\) sans connaître son expression.',
    wrongExplain: {
      1: 'Le degré exact de \\(P\\) n’est pas encore connu à ce stade — il dépend aussi du facteur \\(Q\\) restant, qui pourrait être de degré 0 ou plus.',
      2: 'C’est l’inverse : on vient justement de MONTRER que \\(P\\) a (au moins) trois racines réelles, \\(-2,-1,0\\).',
    },
  },
  {
    id: 'ex41', section: 'polynomes',
    statement: 'Après avoir factorisé \\(P(X)=X(X+1)(X+2)Q(X)\\) et substitué dans l’équation, on obtient \\(Q(X)=Q(X+1)\\) pour tout \\(X\\). Pourquoi cela force-t-il \\(Q\\) à être constant ?',
    options: [
      'Si \\(Q\\) avait une racine \\(\\alpha\\), alors \\(\\alpha,\\alpha+1,\\alpha+2,\\ldots\\) seraient TOUTES racines de \\(Q\\) (infinité de racines, donc \\(Q=0\\)) — contradiction avec \\(Q\\neq0\\), donc \\(Q\\) non constant est impossible',
      'Parce que toute égalité de polynômes impose automatiquement une constante',
      'Parce que \\(Q(X)=Q(X+1)\\) signifie que \\(Q\\) est un polynôme de degré 1',
    ],
    correctIndex: 0,
    explain: 'Raisonnement par l’absurde : si \\(Q\\) a une racine \\(\\alpha\\), l’égalité \\(Q(X)=Q(X+1)\\) propage cette racine à \\(\\alpha+1,\\alpha+2,\\ldots\\) à l’infini — impossible pour un polynôme non nul.',
    wrongExplain: {
      1: 'Cette affirmation est beaucoup trop générale et fausse — ce n’est pas l’égalité en elle-même qui impose une constante, c’est l’argument spécifique des racines qui s’accumulent à l’infini.',
      2: '\\(Q(X)=Q(X+1)\\) pour tout \\(X\\) est en fait incompatible avec un polynôme de degré 1 non constant (ex. \\(Q(X)=X\\) donnerait \\(X\\neq X+1\\)) — cette équation force au contraire la constance.',
    },
  },
  {
    id: 'ex42', section: 'polynomes',
    statement: 'Pour \\(P=X^3-\\sigma_1X^2+\\sigma_2X-\\sigma_3\\) ayant pour racines \\(a,b,c\\), les relations de Viète donnent :',
    options: [
      '\\(\\sigma_1=a+b+c\\), \\(\\sigma_2=ab+bc+ca\\), \\(\\sigma_3=abc\\)',
      '\\(\\sigma_1=abc\\), \\(\\sigma_2=a+b+c\\), \\(\\sigma_3=ab+bc+ca\\)',
      '\\(\\sigma_1=a+b+c\\), \\(\\sigma_2=abc\\), \\(\\sigma_3=ab+bc+ca\\)',
    ],
    correctIndex: 0,
    explain: 'Obtenu en développant \\((X-a)(X-b)(X-c)\\) et en identifiant les coefficients : la somme des racines, la somme des produits deux à deux, puis le produit des trois.',
    wrongExplain: {
      1: 'Les trois quantités sont permutées par rapport à la bonne correspondance — \\(\\sigma_1\\) est la somme (pas le produit), \\(\\sigma_3\\) est le produit (pas la somme des produits deux à deux).',
      2: '\\(\\sigma_2\\) et \\(\\sigma_3\\) sont échangés : \\(\\sigma_2\\) est la somme des produits DEUX À DEUX, \\(\\sigma_3\\) est le produit des TROIS.',
    },
  },
  {
    id: 'ex43', section: 'polynomes',
    statement: 'Pour \\(P=X^3-X+1\\) (racines \\(a,b,c\\)), en identifiant terme à terme avec \\(X^3-\\sigma_1X^2+\\sigma_2X-\\sigma_3\\), on trouve :',
    options: [
      '\\(\\sigma_1=a+b+c=0\\) et \\(\\sigma_2=ab+bc+ca=-1\\)',
      '\\(\\sigma_1=1\\) et \\(\\sigma_2=-1\\)',
      '\\(\\sigma_1=0\\) et \\(\\sigma_2=1\\)',
    ],
    correctIndex: 0,
    explain: 'Le coefficient en \\(X^2\\) de \\(P\\) est \\(0\\), donc \\(-\\sigma_1=0\\Rightarrow\\sigma_1=0\\) ; le coefficient en \\(X\\) est \\(-1\\), donc \\(\\sigma_2=-1\\) directement (pas de signe à changer, contrairement à \\(\\sigma_1\\) et \\(\\sigma_3\\)).',
    wrongExplain: {
      1: '\\(\\sigma_1\\) est l’opposé du coefficient en \\(X^2\\), qui vaut \\(0\\) ici — pas \\(1\\) — et \\(\\sigma_2\\) EST le coefficient en \\(X\\) directement.',
      2: '\\(\\sigma_1\\) est bien \\(0\\), mais \\(\\sigma_2\\) est le coefficient en \\(X\\) lui-même (\\(-1\\)), pas son opposé — il ne faut changer de signe que pour \\(\\sigma_1\\) et \\(\\sigma_3\\), pas pour \\(\\sigma_2\\).',
    },
  },
  {
    id: 'ex44', section: 'polynomes',
    statement: 'Avec \\(\\sigma_1=a+b+c=0\\), la formule \\((a+b+c)^3=a^3+b^3+c^3+3(ab+bc+ca)(a+b+c)-3abc\\) permet de calculer \\(a^3+b^3+c^3\\) en :',
    options: [
      'Remarquant que \\(\\sigma_1^3=0\\) annule le terme croisé (qui contient \\(\\sigma_1\\) en facteur), ne laissant que \\(a^3+b^3+c^3-3\\sigma_3=0\\)',
      'Calculant directement \\(a^3,b^3,c^3\\) séparément sans utiliser Viète',
      'Divisant toute l’équation par \\(\\sigma_1\\)',
    ],
    correctIndex: 0,
    explain: 'Puisque \\(\\sigma_1=0\\), le terme \\(3\\sigma_2\\sigma_1\\) s’annule automatiquement — il ne reste que \\(0=a^3+b^3+c^3-3\\sigma_3\\), d’où \\(a^3+b^3+c^3=3\\sigma_3=3abc\\).',
    wrongExplain: {
      1: 'Sans les racines explicites de \\(P=X^3-X+1\\) (qui ne sont pas simples à calculer), impossible de calculer \\(a^3,b^3,c^3\\) séparément — c’est justement l’intérêt de la méthode par les sommes symétriques.',
      2: 'Diviser par \\(\\sigma_1=0\\) est une opération interdite (division par zéro) — ce n’est pas la bonne manipulation.',
    },
  },
  {
    id: 'ex45', section: 'polynomes',
    statement: 'Deuxième méthode (plus directe) : puisque \\(a\\) est racine de \\(P=X^3-X+1\\), on a \\(a^3-a+1=0\\), donc :',
    options: [
      '\\(a^3=a-1\\), et de même \\(b^3=b-1\\), \\(c^3=c-1\\)',
      '\\(a^3=1-a\\) seulement pour la racine \\(a\\), pas pour \\(b,c\\)',
      '\\(a=1\\) nécessairement',
    ],
    correctIndex: 0,
    explain: 'Toute racine \\(r\\) de \\(P\\) vérifie \\(P(r)=0\\), donc \\(r^3-r+1=0\\Rightarrow r^3=r-1\\) — cette relation est vraie pour CHAQUE racine (a, b, et c), ce qui donne directement \\(a^3+b^3+c^3=(a+b+c)-3=-3\\) sans passer par Viète.',
    wrongExplain: {
      1: '\\(a,b,c\\) sont TOUTES des racines du MÊME polynôme \\(P\\), donc elles vérifient TOUTES la même relation \\(r^3=r-1\\) — ce n’est pas spécifique à \\(a\\).',
      2: 'Rien n’impose \\(a=1\\) : \\(P(1)=1-1+1=1\\neq0\\), donc \\(1\\) n’est même pas racine de \\(P\\) !',
    },
  },
  {
    id: 'ex46', section: 'polynomes',
    statement: 'Si \\(A=BQ+R\\) (division euclidienne) et que \\(\\alpha\\) est une racine de \\(B\\), alors :',
    options: ['\\(A(\\alpha)=R(\\alpha)\\) (le terme \\(B(\\alpha)Q(\\alpha)\\) s’annule)', '\\(A(\\alpha)=Q(\\alpha)\\)', '\\(A(\\alpha)=0\\) nécessairement'],
    correctIndex: 0,
    explain: 'En évaluant l’identité \\(A=BQ+R\\) en \\(X=\\alpha\\) avec \\(B(\\alpha)=0\\), le terme \\(B(\\alpha)Q(\\alpha)\\) s’annule : il ne reste que \\(A(\\alpha)=R(\\alpha)\\) — un raccourci qui évite de calculer \\(A(\\alpha)\\) directement si \\(\\alpha\\) est compliqué (ex. irrationnel).',
    wrongExplain: {
      1: '\\(Q(\\alpha)\\) n’intervient plus du tout une fois que \\(B(\\alpha)=0\\) a annulé le terme qui le contenait — ce n’est pas lui qui reste.',
      2: 'Rien n’impose que \\(A(\\alpha)=0\\) : \\(\\alpha\\) est racine de \\(B\\), pas forcément de \\(A\\) — \\(A(\\alpha)\\) vaut \\(R(\\alpha)\\), qui peut être non nul.',
    },
  },
  {
    id: 'ex47', section: 'polynomes',
    statement: 'Pour construire un polynôme \\(A\\) qui s’annule exactement sur les entiers \\(1,2,\\ldots,100\\), on pose :',
    options: [
      '\\(A(X)=\\displaystyle\\prod_{k=1}^{100}(X-k)\\)',
      '\\(A(X)=\\displaystyle\\sum_{k=1}^{100}(X-k)\\)',
      '\\(A(X)=(X-1)+(X-100)\\)',
    ],
    correctIndex: 0,
    explain: 'Un PRODUIT de facteurs \\((X-k)\\) s’annule dès que \\(X\\) égale l’une des racines \\(k\\) — c’est la clé de la construction : chaque facteur « verrouille » un zéro supplémentaire.',
    wrongExplain: {
      1: 'Une SOMME ne s’annule pas pour chaque \\(k\\) individuellement — il faudrait que TOUS les termes s’annulent simultanément, ce qui n’arrive qu’en un seul point au mieux, pas en 100.',
      2: 'Cette expression ne s’annule qu’en deux points au plus — elle ne capture pas les 98 autres racines requises.',
    },
  },
  {
    id: 'ex48', section: 'polynomes',
    statement: 'Pourquoi poser \\(P=42+A(X)^2\\) (plutôt que \\(42+A(X)\\)) permet-il d’obtenir un polynôme de degré 200 tout en gardant la valeur 42 aux mêmes 100 points ?',
    options: [
      '\\(A^2\\) a pour racines EXACTEMENT les mêmes que \\(A\\) (chaque facteur est juste mis au carré) mais un degré doublé (\\(100\\to200\\))',
      'Élever au carré change les racines de \\(A\\)',
      '\\(A^2\\) et \\(A\\) ont le même degré',
    ],
    correctIndex: 0,
    explain: '\\(A^2=\\prod(X-k)^2\\) s’annule exactement aux mêmes 100 entiers que \\(A\\) (chaque racine est juste « doublée » en multiplicité, mais reste une racine), tandis que son degré double : \\(100\\to200\\) — exactement ce qu’il fallait pour atteindre le degré visé.',
    wrongExplain: {
      1: 'Les racines de \\(A^2\\) sont EXACTEMENT celles de \\(A\\) (un facteur \\((X-k)^2\\) s’annule encore en \\(X=k\\)) — élever au carré ne change pas l’ENSEMBLE des racines, seulement leur multiplicité.',
      2: 'Le degré d’un produit de facteurs au carré est le DOUBLE de celui du produit simple — \\(\\deg(A^2)=2\\deg(A)=200\\neq100=\\deg(A)\\).',
    },
  },
  {
    id: 'ex49', section: 'polynomes',
    statement: 'Pour montrer que la fonction cosinus n’est pas (la restriction à \\(\\mathbb{R}\\) d’)un polynôme, l’argument clé est que :',
    options: [
      '\\(\\cos\\) s’annule en une INFINITÉ de points (\\(\\pi/2+k\\pi\\), \\(k\\in\\mathbb{Z}\\)), ce qui est impossible pour un polynôme non nul',
      '\\(\\cos\\) n’est jamais nul',
      '\\(\\cos\\) n’est pas continue',
    ],
    correctIndex: 0,
    explain: 'Même argument que pour l’équation fonctionnelle : un polynôme non nul n’a qu’un nombre FINI de racines (au plus son degré) — \\(\\cos\\) en a une infinité, donc aucun polynôme ne peut coïncider avec \\(\\cos\\) sur \\(\\mathbb{R}\\) tout entier.',
    wrongExplain: {
      1: '\\(\\cos\\) s’annule bel et bien, et même une infinité de fois (\\(\\pi/2,3\\pi/2,\\ldots\\)) — c’est justement CE fait qui est exploité dans la preuve.',
      2: '\\(\\cos\\) est au contraire une fonction parfaitement continue (et même \\(C^\\infty\\)) — la continuité n’est pas en cause dans cet argument.',
    },
  },
  {
    id: 'ex50', section: 'polynomes',
    statement: 'Si un polynôme \\(R\\) vérifie \\(R(n)=R(n+1)\\) seulement pour \\(n\\in\\{0,1,\\ldots,50\\}\\) (un nombre FINI de valeurs), peut-on conclure que \\(R\\) est constant sur \\(\\mathbb{R}\\) comme dans l’exercice du cours ?',
    options: [
      'Non : l’argument des racines infinies exige une INFINITÉ de valeurs de \\(n\\), pas seulement 51 — avec un nombre fini, \\(R\\) non constant reste possible',
      'Oui, le même raisonnement s’applique à l’identique',
      'Oui, car 51 valeurs suffisent toujours pour un polynôme',
    ],
    correctIndex: 0,
    explain: 'Le raisonnement du cours fonctionne parce que l’équation fonctionnelle vaut pour une vraie infinité de valeurs, engendrant une infinité de racines pour le polynôme \\(Q(X)-Q(X+1)\\). Avec seulement 51 égalités, ce polynôme a au plus 51 racines, ce qui est parfaitement compatible avec un polynôme non nul de degré \\(\\geq51\\) — aucune contradiction, donc aucune conclusion de constance.',
    wrongExplain: {
      1: 'La distinction FINI/INFINI est exactement ce qui change tout : avec une infinité d’égalités le raisonnement par l’absurde fonctionne, avec un nombre fini il s’effondre — ce n’est pas la même situation.',
      2: 'Le nombre de valeurs nécessaires dépend du degré du polynôme en jeu, qui n’est pas borné a priori — 51 n’est pas un seuil magique garantissant quoi que ce soit.',
    },
  },

  // ===== §8 — STRUCTURE D'ESPACE VECTORIEL =====
  {
    id: 'ex51', section: 'ev-structure',
    statement: 'Parmi les 10 conditions qui définissent un \\(K\\)-espace vectoriel \\((E,+,.)\\), laquelle porte sur la loi EXTERNE \\(.\\) (et non sur la loi interne \\(+\\)) ?',
    options: [
      '\\(\\forall u\\in E,\\ 1.u=u\\)',
      '\\(\\forall u,v\\in E,\\ u+v=v+u\\)',
      'Il existe un unique \\(0_E\\in E\\) tel que \\(\\forall u\\in E,\\ u+0_E=u\\)',
    ],
    correctIndex: 0,
    explain: 'Les 5 premières conditions (loi interne, commutativité, associativité, neutre, opposé) portent sur \\(+\\) ; les 5 suivantes (loi externe, 2 distributivités, associativité mixte, \\(1.u=u\\)) portent sur \\(.\\) et son interaction avec \\(+\\).',
    wrongExplain: {
      1: 'La commutativité \\(u+v=v+u\\) est une condition sur la loi INTERNE \\(+\\), pas sur la loi externe \\(.\\).',
      2: 'L’existence du vecteur nul \\(0_E\\) est une condition sur la loi INTERNE \\(+\\) (c’est son élément neutre), pas sur \\(.\\).',
    },
  },
  {
    id: 'ex52', section: 'ev-structure',
    statement: 'Dans un espace vectoriel \\(E\\), un élément de \\(K\\) est appelé :',
    options: [
      'un scalaire',
      'un vecteur',
      'un sous-espace vectoriel',
    ],
    correctIndex: 0,
    explain: 'Par opposition : un élément de \\(E\\) est un vecteur, un élément de \\(K\\) (le corps de base) est un scalaire — souvent noté avec une lettre grecque.',
    wrongExplain: {
      1: 'C’est l’inverse : « vecteur » désigne un élément de \\(E\\), pas de \\(K\\).',
      2: 'Un sous-espace vectoriel est une PARTIE de \\(E\\) (un ensemble de vecteurs), pas un simple nombre de \\(K\\).',
    },
  },
  {
    id: 'ex53', section: 'ev-structure',
    statement: 'Pour \\(a\\in K\\) et \\(u\\in E\\), l’égalité \\(au=0_E\\) équivaut à :',
    options: [
      '\\(a=0\\) ou \\(u=0_E\\)',
      '\\(a=0\\) et \\(u=0_E\\) nécessairement',
      '\\(a=1\\) ou \\(u=0_E\\)',
    ],
    correctIndex: 0,
    explain: 'Propriété élémentaire du cours : \\(\\forall a\\in K,\\forall u\\in E,\\ au=0_E \\Leftrightarrow a=0\\) ou \\(u=0_E\\) — un « ou » inclusif, pas un « et ».',
    wrongExplain: {
      1: 'C’est trop fort : il suffit qu’UN SEUL des deux facteurs soit nul, pas forcément les deux à la fois (ex. \\(0.u=0_E\\) pour n’importe quel \\(u\\)).',
      2: '\\(a=1\\) ne joue aucun rôle particulier ici (\\(1.u=u\\), pas \\(0_E\\) sauf si \\(u=0_E\\)) — c’est bien \\(a=0\\) qu’il faut.',
    },
  },
  {
    id: 'ex54', section: 'ev-structure',
    statement: 'Pour tout vecteur \\(u\\) d’un espace vectoriel \\(E\\), l’opposé \\(-u\\) est égal à :',
    options: [
      '\\((-1)u\\)',
      '\\(1-u\\) (qui n’a pas de sens ici)',
      '\\(0_E-u\\) uniquement, sans autre expression possible',
    ],
    correctIndex: 0,
    explain: 'Propriété élémentaire du cours : \\(\\forall u\\in E,\\ -u=(-1)u\\) — l’opposé d’un vecteur est son produit externe par le scalaire \\(-1\\).',
    wrongExplain: {
      1: '\\(1-u\\) mélangerait un scalaire (\\(1\\)) et un vecteur (\\(u\\)) par une soustraction directe, qui n’est définie ni dans \\(K\\) ni dans \\(E\\) — expression dépourvue de sens.',
      2: '\\(0_E-u\\) est bien égal à \\(-u\\) (c’est même la définition \\(48\\) de la différence), mais ce n’est pas la SEULE expression possible : \\((-1)u\\) en est une autre, plus utile en pratique.',
    },
  },
  {
    id: 'ex55', section: 'ev-structure',
    statement: 'Si \\(\\alpha_1,\\ldots,\\alpha_n\\in K\\) et \\(u_1,\\ldots,u_n\\in E\\), le vecteur \\(\\alpha_1u_1+\\cdots+\\alpha_nu_n\\) est appelé :',
    options: [
      'une combinaison linéaire des vecteurs \\(u_1,\\ldots,u_n\\)',
      'une famille génératrice de \\(E\\)',
      'une base de \\(E\\)',
    ],
    correctIndex: 0,
    explain: 'Définition du cours : c’est l’opération fondamentale de toute l’algèbre linéaire, de coefficients \\(\\alpha_1,\\ldots,\\alpha_n\\).',
    wrongExplain: {
      1: 'Une famille génératrice est une notion différente : c’est une famille de vecteurs dont TOUTES les combinaisons linéaires possibles reconstituent un espace donné — une combinaison linéaire isolée n’est qu’UN vecteur, pas une famille.',
      2: 'Une base est une famille libre ET génératrice — une combinaison linéaire isolée n’est qu’un résultat, pas une famille de vecteurs à qualifier de base.',
    },
  },

  // ===== §9 — EXEMPLES D'ESPACES VECTORIELS =====
  {
    id: 'ex56', section: 'ev-exemples',
    statement: 'Pour les lois usuelles sur \\(\\mathbb{R}^2\\), à quoi est égal \\((5,4)+(3,-3)\\) ?',
    options: [
      '\\((8,1)\\)',
      '\\((15,-12)\\)',
      '\\((2,7)\\)',
    ],
    correctIndex: 0,
    explain: 'Les lois usuelles sur \\(\\mathbb{R}^2\\) s’effectuent composante par composante : \\((x,y)+(x\',y\')=(x+x\',y+y\')\\), donc \\((5+3,4-3)=(8,1)\\).',
    wrongExplain: {
      1: '\\((15,-12)\\) serait le résultat d’une multiplication composante par composante, pas d’une addition — ce n’est pas l’opération demandée.',
      2: '\\((2,7)\\) inverse les rôles (soustraction sur la 1ère composante, addition sur la 2e) — il faut additionner les DEUX composantes séparément.',
    },
  },
  {
    id: 'ex57', section: 'ev-exemples',
    statement: 'Quand on parle, sans plus de précision, de « l’espace vectoriel \\(K^n\\) », on désigne en pratique :',
    options: [
      'l’espace vectoriel canonique (lois usuelles composante par composante)',
      'un espace vectoriel différent à chaque exercice, impossible à deviner',
      'toujours \\(\\mathbb{R}^n\\), jamais \\(\\mathbb{C}^n\\) ni \\(\\mathbb{Q}^n\\)',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours : dans l’écrasante majorité des cas rencontrés en pratique, \\(K^n\\) sans précision désigne l’espace vectoriel CANONIQUE (lois usuelles), même si d’autres lois sont en théorie possibles sur le même ensemble.',
    wrongExplain: {
      1: 'Il y a bien une convention implicite par défaut (les lois usuelles/canoniques) — ce n’est pas arbitraire ni imprévisible.',
      2: '\\(K\\) est fixé en début de chapitre à \\(\\mathbb{Q}\\), \\(\\mathbb{R}\\) ou \\(\\mathbb{C}\\) selon le contexte — \\(K^n\\) n’est pas réservé à \\(\\mathbb{R}^n\\).',
    },
  },
  {
    id: 'ex58', section: 'ev-exemples',
    statement: 'Pour que \\(\\mathbb{C}\\) soit un espace vectoriel SUR \\(\\mathbb{R}\\), la multiplication externe utilisée est :',
    options: [
      '\\(\\forall r\\in\\mathbb{R},\\forall z\\in\\mathbb{C},\\ r.z=r\\times z\\) (produit d’un réel et d’un complexe)',
      'le produit de deux nombres complexes quelconques',
      'la partie réelle du produit \\(r\\times z\\)',
    ],
    correctIndex: 0,
    explain: 'Le scalaire \\(r\\) doit rester dans le corps de base \\(\\mathbb{R}\\) (pas dans \\(\\mathbb{C}\\) tout entier) — c’est précisément ce qui distingue le \\(\\mathbb{R}\\)-espace vectoriel \\(\\mathbb{C}\\) du \\(\\mathbb{C}\\)-espace vectoriel \\(\\mathbb{C}\\) (deux structures différentes sur le même ensemble).',
    wrongExplain: {
      1: 'Si le scalaire pouvait être n’importe quel complexe, on obtiendrait le \\(\\mathbb{C}\\)-espace vectoriel \\(\\mathbb{C}\\) (qui existe aussi, cf. §56), pas le \\(\\mathbb{R}\\)-espace vectoriel visé ici.',
      2: 'Garder seulement la partie réelle ferait sortir du résultat de \\(\\mathbb{C}\\) — la multiplication externe doit renvoyer un vecteur de \\(E=\\mathbb{C}\\), pas un réel.',
    },
  },
  {
    id: 'ex59', section: 'ev-exemples',
    statement: 'Sur l’ensemble \\(F(X,E)\\) de toutes les applications de \\(X\\) dans un espace vectoriel \\(E\\), deux applications \\(f\\) et \\(g\\) sont dites égales si et seulement si :',
    options: [
      '\\(\\forall x\\in X,\\ f(x)=g(x)\\)',
      'elles ont la même formule algébrique d’écriture',
      'elles ont le même ensemble de départ \\(X\\), peu importe les images',
    ],
    correctIndex: 0,
    explain: 'Rappel du cours (§57), indispensable en pratique : deux applications sont égales ssi elles coïncident en TOUT point de leur ensemble de départ — c’est la seule caractérisation utilisable, pas une question de « formule ».',
    wrongExplain: {
      1: 'Deux formules différentes peuvent définir la MÊME application (ex. \\(x\\mapsto (x+1)^2\\) et \\(x\\mapsto x^2+2x+1\\)) — ce n’est pas l’écriture qui compte, mais les valeurs prises en chaque point.',
      2: 'Avoir le même ensemble de départ ne dit rien des images — deux fonctions sur le même \\(X\\) peuvent être totalement différentes.',
    },
  },
  {
    id: 'ex60', section: 'ev-exemples',
    statement: 'L’ensemble des suites réelles, muni de l’addition terme à terme, correspond à l’espace \\(F(X,E)\\) du cours avec :',
    options: [
      '\\(X=\\mathbb{N}\\) et \\(E=\\mathbb{R}\\)',
      '\\(X=\\mathbb{R}\\) et \\(E=\\mathbb{N}\\)',
      '\\(X=E=\\mathbb{R}\\)',
    ],
    correctIndex: 0,
    explain: 'Une suite réelle est une application de \\(\\mathbb{N}\\) (les indices \\(n\\)) vers \\(\\mathbb{R}\\) (les valeurs \\(u_n\\)) — c’est exactement le cas particulier \\(X=\\mathbb{N}\\), \\(E=\\mathbb{R}\\) de \\(F(X,E)\\) cité dans le cours.',
    wrongExplain: {
      1: '\\(\\mathbb{N}\\) n’est même pas un espace vectoriel (pas stable par opposé) — il ne peut pas jouer le rôle de \\(E\\), l’espace d’ARRIVÉE.',
      2: '\\(X=\\mathbb{R}\\) donnerait l’espace de TOUTES les fonctions de \\(\\mathbb{R}\\) dans \\(\\mathbb{R}\\) (cas \\(F(\\mathbb{R},\\mathbb{R})\\) du cours), pas spécifiquement les suites, qui sont indexées par \\(\\mathbb{N}\\).',
    },
  },
  {
    id: 'ex61', section: 'ev-exemples',
    statement: 'Dans l’espace vectoriel \\(\\mathbb{R}[X]\\) des polynômes à coefficients réels, le vecteur nul est :',
    options: [
      'le polynôme nul',
      'le polynôme constant égal à \\(1\\)',
      'le polynôme \\(X\\)',
    ],
    correctIndex: 0,
    explain: 'Comme pour tout espace vectoriel, le vecteur nul \\(0_E\\) est l’élément neutre pour l’addition — ici, c’est le polynôme identiquement nul (tous ses coefficients valent \\(0\\)).',
    wrongExplain: {
      1: 'Le polynôme constant \\(1\\) est le neutre pour la MULTIPLICATION des polynômes, pas pour l’addition — ce n’est pas le vecteur nul de cette structure d’espace vectoriel (où seule l’addition compte).',
      2: '\\(X\\) est un vecteur ordinaire de \\(\\mathbb{R}[X]\\), sans aucune propriété de neutralité — rien ne le distingue comme « nul ».',
    },
  },
  {
    id: 'ex62', section: 'ev-exemples',
    statement: 'Si \\(E\\) et \\(F\\) sont deux \\(K\\)-espaces vectoriels, l’espace-produit \\(G=E\\times F\\) est muni de l’addition :',
    options: [
      '\\((a,b)+(c,d)=(a+c,b+d)\\)',
      '\\((a,b)+(c,d)=(a+d,b+c)\\)',
      '\\((a,b)+(c,d)=(ac,bd)\\)',
    ],
    correctIndex: 0,
    explain: 'L’espace-produit additionne les deux composantes SÉPARÉMENT, chacune dans son propre espace (\\(a+c\\) dans \\(E\\), \\(b+d\\) dans \\(F\\)) — exactement comme pour \\(\\mathbb{R}^2=\\mathbb{R}\\times\\mathbb{R}\\).',
    wrongExplain: {
      1: 'Échanger les composantes (\\(a\\) avec \\(d\\), \\(b\\) avec \\(c\\)) n’a aucun sens si \\(E\\neq F\\) : \\(a\\) et \\(d\\) ne vivent pas forcément dans le même espace, l’addition \\(a+d\\) peut même ne pas être définie.',
      2: '\\((ac,bd)\\) serait une multiplication composante par composante, pas une addition — et ce n’est de toute façon pas l’opération qui structure l’espace-produit.',
    },
  },

  // ===== §10 — SOUS-ESPACES VECTORIELS =====
  {
    id: 'ex63', section: 'ev-sev',
    statement: 'Pour qu’une partie \\(F\\) de \\(E\\) soit un sous-espace vectoriel, il FAUT en particulier que :',
    options: [
      '\\(0_E\\in F\\)',
      '\\(F\\) contienne au moins deux vecteurs distincts',
      '\\(F\\) soit un ensemble fini',
    ],
    correctIndex: 0,
    explain: 'Première des 3 conditions de la définition (§63) : \\(0_E\\in F\\). C’est d’ailleurs souvent LE test le plus rapide pour exclure qu’une partie soit un sev (si \\(0_E\\notin F\\), c’est terminé).',
    wrongExplain: {
      1: '\\(\\{0_E\\}\\) à lui seul est un sous-espace vectoriel (le sev trivial) — un seul vecteur suffit, il n’y a aucune exigence de cardinal minimal au-delà de ça.',
      2: 'Un sev peut très bien être infini (c’est même le cas général, ex. une droite ou un plan vectoriel) — rien n’impose la finitude.',
    },
  },
  {
    id: 'ex64', section: 'ev-sev',
    statement: 'Les conditions ii) et iii) de la définition d’un sous-espace vectoriel (\\(\\forall x,y\\in F, x+y\\in F\\) et \\(\\forall x\\in F,\\forall\\alpha\\in K,\\alpha x\\in F\\)) peuvent être remplacées, de façon équivalente, par l’unique condition :',
    options: [
      '\\(\\forall x,y\\in F,\\forall\\alpha\\in K,\\ \\alpha x+y\\in F\\)',
      '\\(\\forall x\\in F,\\ x+x\\in F\\) seulement',
      '\\(\\exists x\\in F,\\forall\\alpha\\in K,\\ \\alpha x\\in F\\)',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§64) : regrouper stabilité par somme et par produit externe en une seule condition \\(\\alpha x+y\\in F\\) (ou, de façon équivalente, \\(\\alpha x+\\beta y\\in F\\)) — c’est le critère pratique le plus utilisé pour démontrer qu’une partie est un sev.',
    wrongExplain: {
      1: '\\(x+x\\in F\\) ne teste que le cas particulier \\(\\alpha=2\\), \\(y=x\\) — ça ne couvre ni la stabilité par somme de deux vecteurs DIFFÉRENTS, ni la stabilité par un scalaire quelconque.',
      2: 'Le quantificateur doit être universel (\\(\\forall x\\in F\\)), pas existentiel — sinon la condition ne porterait que sur UN vecteur particulier de \\(F\\), pas sur tous.',
    },
  },
  {
    id: 'ex65', section: 'ev-sev',
    statement: 'Dans un espace vectoriel \\(E\\), quels sont les sous-espaces vectoriels dits « triviaux » ?',
    options: [
      '\\(\\{0_E\\}\\) et \\(E\\) lui-même',
      'uniquement \\(\\{0_E\\}\\), jamais \\(E\\)',
      'uniquement les droites vectorielles',
    ],
    correctIndex: 0,
    explain: 'Le cours (§65) cite les deux : \\(\\{0_E\\}\\) et \\(E\\) sont toujours des sev de \\(E\\) (même si certaines sources ne considèrent \\(\\{0_E\\}\\) comme trivial) — ce sont les deux cas « sans intérêt » aux extrêmes.',
    wrongExplain: {
      1: '\\(E\\) tout entier est bien aussi un sev trivial de lui-même — la remarque du cours sur « certaines sources » ne retire JAMAIS \\(E\\) de la liste, elle retire éventuellement \\(\\{0_E\\}\\).',
      2: 'Les droites vectorielles ne sont « triviales » dans aucun sens du terme — ce sont des sev non triviaux typiques en dimension \\(\\geq2\\) (cf. §101).',
    },
  },
  {
    id: 'ex66', section: 'ev-sev',
    statement: 'L’ensemble \\(K_n[X]\\) des polynômes de degré au plus \\(n\\) est :',
    options: [
      'un sous-espace vectoriel de \\(K[X]\\)',
      'égal à \\(K[X]\\) tout entier',
      'stable par somme mais pas par produit externe',
    ],
    correctIndex: 0,
    explain: 'Résultat du cours (§66) : \\(K_n[X]=\\{P\\in K[X]\\,;\\,d°(P)\\leq n\\}\\) est un sev de \\(K[X]\\) — la somme de deux polynômes de degré \\(\\leq n\\) reste de degré \\(\\leq n\\), de même pour un multiple scalaire.',
    wrongExplain: {
      1: '\\(K[X]\\) contient des polynômes de TOUS les degrés (ex. \\(X^{n+1}\\notin K_n[X]\\)) — \\(K_n[X]\\) est une partie STRICTE de \\(K[X]\\), pas l’espace entier.',
      2: 'La stabilité est vraie pour les DEUX lois : un multiple scalaire d’un polynôme de degré \\(\\leq n\\) reste de degré \\(\\leq n\\) (le degré ne peut qu’être inférieur ou égal, jamais augmenté par un scalaire).',
    },
  },
  {
    id: 'ex67', section: 'ev-sev',
    statement: 'Pour démontrer qu’un sous-espace vectoriel \\(F\\) de \\(E\\) vérifie \\(F=\\{0_E\\}\\), la méthode pratique du cours consiste à :',
    options: [
      'démontrer seulement l’inclusion \\(F\\subseteq\\{0_E\\}\\) (i.e. \\(v\\in F\\Rightarrow v=0_E\\))',
      'démontrer les deux inclusions \\(F\\subseteq\\{0_E\\}\\) et \\(\\{0_E\\}\\subseteq F\\) séparément et avec le même effort',
      'vérifier que \\(F\\) contient un vecteur non nul, puis conclure par l’absurde',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§68) : l’inclusion \\(\\{0_E\\}\\subseteq F\\) est TOUJOURS automatique (car \\(F\\) est un sev, donc contient \\(0_E\\)) — il ne reste donc qu’une seule inclusion à démontrer réellement, pas une double preuve.',
    wrongExplain: {
      1: 'C’est justement la double preuve qui est évitée : \\(\\{0_E\\}\\subseteq F\\) ne coûte rien à établir (c’est automatique pour tout sev), pas la peine d’y consacrer un effort symétrique.',
      2: 'Trouver un vecteur non nul dans \\(F\\) prouverait au contraire \\(F\\neq\\{0_E\\}\\) — ce n’est pas la méthode pour établir l’égalité, mais celle qui la contredirait.',
    },
  },
  {
    id: 'ex68', section: 'ev-sev',
    statement: 'Les sous-espaces vectoriels NON triviaux de l’espace \\(\\mathbb{R}^3\\) sont, à titre heuristique :',
    options: [
      'des droites ou des plans contenant \\((0,0,0)\\)',
      'n’importe quel sous-ensemble de \\(\\mathbb{R}^3\\)',
      'uniquement des plans, jamais des droites',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§69) : en dimension 3, les sev non triviaux sont géométriquement des droites ou des plans passant par l’origine — jamais une sphère, un cône, ou toute autre partie qui ne contiendrait pas \\((0,0,0)\\) ou ne serait pas « plate ».',
    wrongExplain: {
      1: 'Un sous-ensemble quelconque n’a aucune raison d’être stable par somme/produit externe (ex. une sphère centrée en \\((0,0,0)\\) ne l’est pas) — tous les sous-ensembles ne sont PAS des sev.',
      2: 'Les droites vectorielles (engendrées par un seul vecteur non nul, §101) sont aussi des sev non triviaux de \\(\\mathbb{R}^3\\) — les plans n’ont pas l’exclusivité.',
    },
  },
  {
    id: 'ex69', section: 'ev-sev',
    statement: 'Si \\(F\\) et \\(G\\) sont deux sous-espaces vectoriels de \\(E\\), dire que « \\(F\\) est un sous-espace vectoriel de \\(G\\) » équivaut exactement à :',
    options: [
      '\\(F\\subseteq G\\)',
      '\\(F=G\\)',
      '\\(F\\cap G=\\{0_E\\}\\)',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§71) : « \\(F\\) sev de \\(G\\) » est tout simplement équivalent à l’inclusion ensembliste \\(F\\subseteq G\\) — aucune condition supplémentaire n’est nécessaire (les lois de \\(F\\) sont de toute façon celles induites par \\(E\\), donc aussi par \\(G\\)).',
    wrongExplain: {
      1: 'Exiger l’égalité serait beaucoup trop fort : \\(F\\) peut être un sev STRICT de \\(G\\) (ex. une droite incluse dans un plan) sans lui être égal.',
      2: '\\(F\\cap G=\\{0_E\\}\\) est au contraire la situation où \\(F\\) et \\(G\\) n’ont presque rien en commun — c’est l’opposé d’une relation d’inclusion entre les deux.',
    },
  },
  {
    id: 'ex70', section: 'ev-sev',
    statement: 'L’ensemble \\(F_3=\\{(x,y)\\in\\mathbb{R}^2\\,;\\,5x-3y=1\\}\\) n’est PAS un sous-espace vectoriel de \\(\\mathbb{R}^2\\) car :',
    options: [
      '\\((0,0)\\notin F_3\\)',
      '\\(F_3\\) a une infinité d’éléments',
      '\\(5\\) et \\(3\\) ne sont pas premiers entre eux',
    ],
    correctIndex: 0,
    explain: 'Le test le plus rapide (voir ex70) : \\(5\\times0-3\\times0=0\\neq1\\), donc \\((0,0)\\notin F_3\\) — la toute première condition de la définition d’un sev échoue immédiatement, inutile d’aller plus loin.',
    wrongExplain: {
      1: 'Avoir une infinité d’éléments n’empêche rien : un sev non trivial (une droite par exemple) a lui aussi une infinité d’éléments — ce n’est pas le problème ici.',
      2: 'Le fait que \\(5x-3y=1\\) (membre de droite non nul) plutôt que \\(=0\\) est LA vraie cause — la valeur arithmétique de \\(5\\) et \\(3\\) (premiers entre eux ou non) n’a aucun rapport avec la question.',
    },
  },

  // ===== §11 — SOUS-ESPACE VECTORIEL ENGENDRÉ =====
  {
    id: 'ex71', section: 'ev-engendre',
    statement: 'Pour une partie \\(X\\) de \\(E\\), l’ensemble \\(\\text{vect}(X)\\) est défini comme :',
    options: [
      'l’ensemble de toutes les combinaisons linéaires (finies) de vecteurs de \\(X\\)',
      'l’ensemble \\(X\\) lui-même, sans rien ajouter',
      'le plus GRAND sous-espace vectoriel de \\(E\\) contenu dans \\(X\\)',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§72) : \\(\\text{vect}(X)=\\{\\alpha_1u_1+\\cdots+\\alpha_pu_p\\,;\\,p\\in\\mathbb{N},\\alpha_i\\in K,u_i\\in X\\}\\) — l’ensemble de TOUTES les combinaisons linéaires possibles, de longueur quelconque.',
    wrongExplain: {
      1: '\\(X\\subseteq\\text{vect}(X)\\) (§73) mais l’inclusion est en général STRICTE : \\(\\text{vect}(X)\\) ajoute toutes les combinaisons linéaires, qui ne sont pas forcément déjà dans \\(X\\).',
      2: 'C’est l’inverse : \\(\\text{vect}(X)\\) est le plus PETIT sev contenant \\(X\\) (lemme d’expansion, §76), pas le plus grand sev CONTENU dans \\(X\\) (qui n’aurait d’ailleurs souvent aucun sens si \\(X\\) n’est pas déjà un sev).',
    },
  },
  {
    id: 'ex72', section: 'ev-engendre',
    statement: 'Le « lemme d’expansion » du cours affirme que si \\(F\\) est un sous-espace vectoriel de \\(E\\) tel que \\(X\\subseteq F\\), alors :',
    options: [
      '\\(\\text{vect}(X)\\subseteq F\\)',
      '\\(F\\subseteq\\text{vect}(X)\\)',
      '\\(F=\\text{vect}(X)\\) nécessairement',
    ],
    correctIndex: 0,
    explain: 'Lemme d’expansion (§76) : \\(\\text{vect}(X)\\) est le PLUS PETIT sev contenant \\(X\\) — donc tout autre sev \\(F\\) contenant \\(X\\) doit nécessairement contenir \\(\\text{vect}(X)\\) tout entier.',
    wrongExplain: {
      1: 'C’est le sens inverse : comme \\(\\text{vect}(X)\\) est le PLUS PETIT sev contenant \\(X\\), c’est lui qui est inclus dans \\(F\\), pas \\(F\\) qui serait inclus dans lui.',
      2: 'Rien n’impose l’égalité : \\(F\\) peut être un sev beaucoup plus grand que \\(\\text{vect}(X)\\) tout en contenant \\(X\\) (ex. \\(F=E\\) tout entier convient toujours).',
    },
  },
  {
    id: 'ex73', section: 'ev-engendre',
    statement: 'Si \\(X\\subseteq Y\\) sont deux parties de \\(E\\), alors :',
    options: [
      '\\(\\text{vect}(X)\\subseteq\\text{vect}(Y)\\)',
      '\\(\\text{vect}(Y)\\subseteq\\text{vect}(X)\\)',
      'on ne peut rien dire en général sur l’inclusion entre \\(\\text{vect}(X)\\) et \\(\\text{vect}(Y)\\)',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§77) : \\(X\\subseteq Y\\Rightarrow\\text{vect}(X)\\subseteq\\text{vect}(Y)\\) — engendrer à partir d’une partie plus petite ne peut donner qu’un sev plus petit (ou égal).',
    wrongExplain: {
      1: 'Ce serait l’inverse d’une inclusion croissante : plus \\(X\\) grandit, plus \\(\\text{vect}(X)\\) grandit (ou reste égal), jamais le contraire.',
      2: 'Au contraire, c’est une propriété GARANTIE à chaque fois, pas un cas indéterminé — l’inclusion \\(X\\subseteq Y\\) suffit toujours à la conclure.',
    },
  },
  {
    id: 'ex74', section: 'ev-engendre',
    statement: 'Dire qu’une partie \\(X\\) de \\(E\\) est une « partie génératrice de \\(E\\) » signifie que :',
    options: [
      '\\(\\text{vect}(X)=E\\)',
      '\\(X=E\\)',
      '\\(X\\) est une famille libre',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§81) : \\(X\\) génère \\(E\\) si \\(\\text{vect}(X)=E\\) — en pratique, seule l’inclusion \\(E\\subseteq\\text{vect}(X)\\) est à démontrer, l’autre (\\(\\text{vect}(X)\\subseteq E\\)) étant toujours automatique.',
    wrongExplain: {
      1: '\\(X\\) peut être une partie génératrice BEAUCOUP plus petite que \\(E\\) (ex. 2 vecteurs suffisent à engendrer \\(\\mathbb{R}^2\\), qui a une infinité d’éléments) — pas besoin que \\(X=E\\).',
      2: 'Être génératrice et être libre sont deux notions INDÉPENDANTES (§92-93) — une partie génératrice peut très bien être liée (avoir des vecteurs « en trop »).',
    },
  },
  {
    id: 'ex75', section: 'ev-engendre',
    statement: 'On appelle « droite vectorielle » de \\(E\\) tout sous-espace vectoriel de la forme :',
    options: [
      '\\(\\text{vect}(u)\\) pour un vecteur \\(u\\) NON NUL de \\(E\\)',
      '\\(\\text{vect}(u)\\) pour n’importe quel vecteur \\(u\\), y compris \\(0_E\\)',
      '\\(\\text{vect}(u,v)\\) pour deux vecteurs non colinéaires',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§101) : une droite vectorielle est engendrée par UN SEUL vecteur non nul — \\(D=\\text{vect}(u)=\\{ku\\,;\\,k\\in K\\}\\).',
    wrongExplain: {
      1: 'Si \\(u=0_E\\), alors \\(\\text{vect}(u)=\\{0_E\\}\\), le sev trivial — ce n’est pas une droite, la condition « \\(u\\) non nul » est essentielle.',
      2: 'C’est la définition d’un PLAN vectoriel (§102, deux vecteurs non colinéaires), pas d’une droite, qui n’a besoin que d’UN seul générateur.',
    },
  },
  {
    id: 'ex76', section: 'ev-engendre',
    statement: 'Pour des vecteurs \\(a_1,\\ldots,a_p,b_1,\\ldots,b_q\\) de \\(E\\), la proposition du cours donne :',
    options: [
      '\\(\\text{vect}(a_1,\\ldots,a_p)+\\text{vect}(b_1,\\ldots,b_q)=\\text{vect}(a_1,\\ldots,a_p,b_1,\\ldots,b_q)\\)',
      '\\(\\text{vect}(a_1,\\ldots,a_p)+\\text{vect}(b_1,\\ldots,b_q)=\\text{vect}(a_1,\\ldots,a_p)\\cap\\text{vect}(b_1,\\ldots,b_q)\\)',
      'cette somme n’est en général pas un sous-espace vectoriel',
    ],
    correctIndex: 0,
    explain: 'Proposition du cours (§103) : la somme de deux sev ENGENDRÉS s’obtient très simplement en réunissant tous les générateurs dans un seul \\(\\text{vect}\\) — un moyen très commode en pratique pour calculer une somme.',
    wrongExplain: {
      1: 'La somme \\(F+G\\) et l’intersection \\(F\\cap G\\) sont deux opérations complètement différentes sur les sev (voir §83 et §85) — cette proposition porte sur la SOMME, pas sur l’intersection.',
      2: 'La somme de deux sev est TOUJOURS un sous-espace vectoriel de \\(E\\) (résultat du §85) — rien d’incertain ici.',
    },
  },
  {
    id: 'ex77', section: 'ev-engendre',
    statement: 'Si \\((u_1,\\ldots,u_n)\\) est une famille de \\(E\\) et \\(u\\in\\text{vect}(u_1,\\ldots,u_n)\\), alors « générateur redondant » signifie que :',
    options: [
      '\\(\\text{vect}(u_1,\\ldots,u_n,u)=\\text{vect}(u_1,\\ldots,u_n)\\)',
      'ajouter \\(u\\) agrandit strictement l’espace engendré',
      '\\(u\\) doit être nécessairement égal à l’un des \\(u_i\\)',
    ],
    correctIndex: 0,
    explain: 'Résultat du cours (§104) : ajouter à une famille un vecteur déjà dans son espace engendré ne change RIEN à cet espace engendré — \\(u\\) n’apporte aucun générateur « nouveau ».',
    wrongExplain: {
      1: 'C’est l’inverse de ce que dit le résultat : puisque \\(u\\) est DÉJÀ une combinaison linéaire des \\(u_i\\), l’espace engendré reste EXACTEMENT le même, il ne peut pas s’agrandir.',
      2: '\\(u\\) peut être n’importe quelle combinaison linéaire des \\(u_i\\) (ex. \\(u=u_1+u_2\\)) sans être égal à l’un d’eux précisément — la seule condition est \\(u\\in\\text{vect}(u_1,\\ldots,u_n)\\).',
    },
  },
  {
    id: 'ex78', section: 'ev-engendre',
    statement: 'Dans \\(\\mathbb{R}^2\\), les vecteurs \\(u=(1,0)\\) et \\(v=(2,0)\\) engendrent-ils \\(\\mathbb{R}^2\\) ?',
    options: [
      'Non, car \\(u\\) et \\(v\\) sont colinéaires, donc \\(\\text{vect}(u,v)\\) n’est qu’une droite',
      'Oui, car deux vecteurs suffisent toujours à engendrer \\(\\mathbb{R}^2\\)',
      'Oui, car \\(u\\neq v\\)',
    ],
    correctIndex: 0,
    explain: 'Même type de piège que l’exercice d’entraînement 2(b) du cours : \\(v=2u\\), donc \\(\\text{vect}(u,v)=\\text{vect}(u)\\) (générateur redondant, voir question précédente) — on n’obtient qu’une droite (ex. \\((0,1)\\notin\\text{vect}(u,v)\\)), pas tout \\(\\mathbb{R}^2\\).',
    wrongExplain: {
      1: 'Le NOMBRE de vecteurs ne suffit pas : il faut aussi qu’ils soient « assez indépendants » (non colinéaires ici) — deux vecteurs colinéaires n’engendrent jamais plus qu’une droite.',
      2: '\\(u\\neq v\\) n’empêche absolument pas la colinéarité (\\(v=2u\\) avec \\(u\\neq v\\) puisque \\(2\\neq1\\)) — être distincts et être colinéaires sont deux choses compatibles.',
    },
  },

  // ===== §12 — INTERSECTION, SOMME DE SOUS-ESPACES VECTORIELS =====
  {
    id: 'ex79', section: 'ev-somme',
    statement: 'Si \\(F\\) et \\(G\\) sont deux sous-espaces vectoriels de \\(E\\), alors \\(F\\cap G\\) est :',
    options: [
      'toujours un sous-espace vectoriel de \\(E\\)',
      'un sous-espace vectoriel seulement si \\(F\\subseteq G\\) ou \\(G\\subseteq F\\)',
      'jamais un sous-espace vectoriel (sauf cas particuliers)',
    ],
    correctIndex: 0,
    explain: 'Théorème du cours (§83) : l’intersection de deux (ou plusieurs, §84) sev de \\(E\\) est TOUJOURS un sev de \\(E\\), sans aucune condition supplémentaire.',
    wrongExplain: {
      1: 'Aucune condition d’inclusion n’est nécessaire — le théorème s’applique à \\(F\\) et \\(G\\) QUELCONQUES, même si ni l’un ni l’autre n’est inclus dans l’autre.',
      2: 'C’est l’inverse : c’est un résultat GÉNÉRAL et systématique, pas une exception rare.',
    },
  },
  {
    id: 'ex80', section: 'ev-somme',
    statement: 'Pour deux sous-espaces vectoriels \\(F\\) et \\(G\\) de \\(E\\), on a toujours :',
    options: [
      '\\(F\\subseteq F+G\\) et \\(G\\subseteq F+G\\)',
      '\\(F+G\\subseteq F\\) et \\(F+G\\subseteq G\\)',
      '\\(F+G=F\\cap G\\)',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§86) : il est immédiat que \\(F\\subseteq F+G\\) (prendre \\(y=0_E\\in G\\)) et de même \\(G\\subseteq F+G\\) — la somme ne peut qu’AGRANDIR, jamais rétrécir.',
    wrongExplain: {
      1: 'C’est l’inverse : \\(F\\) et \\(G\\) sont inclus dans leur SOMME \\(F+G\\), pas le contraire — \\(F+G\\) est en général plus grand que \\(F\\) ou \\(G\\) pris séparément.',
      2: 'La somme \\(F+G\\) et l’intersection \\(F\\cap G\\) ne coïncident en général PAS — elles sont égales uniquement dans des cas très particuliers (ex. \\(F=G\\)), pas systématiquement.',
    },
  },
  {
    id: 'ex81', section: 'ev-somme',
    statement: 'Si \\(u\\in F+G\\), peut-on affirmer que la décomposition \\(u=x+y\\) (\\(x\\in F,y\\in G\\)) est UNIQUE ?',
    options: [
      'Non, en général elle ne l’est pas — il peut exister un autre couple \\((x\',y\')\\) qui convient aussi',
      'Oui, toujours, quels que soient \\(F\\) et \\(G\\)',
      'Oui, mais seulement si \\(F\\) et \\(G\\) sont tous les deux des droites vectorielles',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§88) : la non-unicité est le cas général pour une simple SOMME \\(F+G\\) — c’est justement ce qui distingue une somme quelconque d’une somme SUPPLÉMENTAIRE (§89), où l’unicité est, elle, garantie par définition.',
    wrongExplain: {
      1: 'C’est l’inverse de ce qu’énonce le cours : l’unicité n’est PAS automatique pour une somme quelconque — elle ne devient vraie que dans le cas particulier d’une somme supplémentaire.',
      2: 'La nature géométrique précise de \\(F\\) et \\(G\\) (droites ou non) n’est pas le critère — c’est la condition \\(F\\cap G=\\{0_E\\}\\) (caractérisation du §90) qui garantit l’unicité, pas le fait que ce soient des droites.',
    },
  },
  {
    id: 'ex82', section: 'ev-somme',
    statement: 'Dire que \\(F\\) et \\(G\\) sont des sous-espaces SUPPLÉMENTAIRES dans \\(E\\) (noté \\(E=F\\oplus G\\)) signifie que :',
    options: [
      'tout \\(u\\in E\\) s’écrit de façon UNIQUE \\(u=x+y\\) avec \\(x\\in F,y\\in G\\)',
      'tout \\(u\\in E\\) s’écrit d’au moins une façon \\(u=x+y\\), l’unicité important peu',
      '\\(F\\) et \\(G\\) ont la même dimension',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§89) : le mot-clé est l’existence ET l’unicité de la décomposition — c’est précisément ce qui distingue « supplémentaires » d’une simple somme \\(F+G=E\\).',
    wrongExplain: {
      1: 'C’est au contraire l’UNICITÉ qui fait toute la différence avec une simple somme \\(F+G=E\\) (voir question précédente) — sans elle, on parlerait juste de somme, pas de supplémentarité.',
      2: 'Rien dans la définition ne porte sur une égalité de dimension — la supplémentarité est une question de décomposition unique de CHAQUE vecteur, pas de taille comparée des deux sev.',
    },
  },
  {
    id: 'ex83', section: 'ev-somme',
    statement: 'Pour deux sous-espaces vectoriels \\(F\\) et \\(G\\) de \\(E\\), la caractérisation pratique de \\(E=F\\oplus G\\) est :',
    options: [
      '\\(F+G=E\\) ET \\(F\\cap G=\\{0_E\\}\\)',
      '\\(F+G=E\\) seulement, sans autre condition',
      '\\(F\\cap G=\\{0_E\\}\\) seulement, sans autre condition',
    ],
    correctIndex: 0,
    explain: 'Cas particulier du cours pour deux sev (§90) : les DEUX conditions sont nécessaires simultanément — \\(F+G=E\\) seul ne garantit pas l’unicité de la décomposition, et \\(F\\cap G=\\{0_E\\}\\) seul ne garantit pas que la somme couvre tout \\(E\\).',
    wrongExplain: {
      1: '\\(F+G=E\\) seul permet une décomposition, mais sans \\(F\\cap G=\\{0_E\\}\\) cette décomposition n’a aucune raison d’être UNIQUE — il manquerait la condition d’unicité.',
      2: '\\(F\\cap G=\\{0_E\\}\\) seul garantit l’unicité d’une éventuelle décomposition, mais sans \\(F+G=E\\) rien ne dit que TOUT vecteur de \\(E\\) puisse effectivement se décomposer.',
    },
  },
  {
    id: 'ex84', section: 'ev-somme',
    statement: 'Dans \\(\\mathbb{R}^2\\), \\(F=\\text{vect}((1,2))\\) et \\(G=\\text{vect}((1,1))\\). Que peut-on dire de \\(F\\) et \\(G\\) ?',
    options: [
      'Ce sont deux droites vectorielles distinctes, donc \\(F\\cap G=\\{(0,0)\\}\\) et \\(F+G=\\mathbb{R}^2\\) : elles sont supplémentaires',
      'Elles sont forcément égales puisque ce sont deux droites de \\(\\mathbb{R}^2\\)',
      'On ne peut rien conclure sans calculer explicitement \\(F\\cap G\\)',
    ],
    correctIndex: 0,
    explain: 'Deux droites vectorielles DISTINCTES de \\(\\mathbb{R}^2\\) (ici, \\((1,2)\\) et \\((1,1)\\) ne sont pas colinéaires) ne peuvent se couper qu’en \\((0,0)\\), et leur somme, de dimension \\(1+1=2\\), remplit nécessairement tout le plan — exactement l’exercice 8 du cours.',
    wrongExplain: {
      1: 'Deux droites vectorielles DIFFÉRENTES de \\(\\mathbb{R}^2\\) ne sont jamais égales entre elles — « être une droite » ne les rend pas identiques, seule une direction commune (colinéarité) le ferait.',
      2: 'Le simple fait que \\((1,2)\\) et \\((1,1)\\) ne soient pas colinéaires suffit à conclure géométriquement, sans calcul supplémentaire — deux droites vectorielles distinctes de \\(\\mathbb{R}^2\\) ne se coupent toujours qu’en l’origine.',
    },
  },

  // ===== §13 — FAMILLES GÉNÉRATRICES, LIBRES, LIÉES =====
  {
    id: 'ex85', section: 'ev-familles',
    statement: 'Une famille \\(F=(u_1,\\ldots,u_p)\\) de vecteurs de \\(E\\) est dite LIBRE si :',
    options: [
      'toute combinaison linéaire des \\(u_i\\) qui vaut \\(0_E\\) a nécessairement TOUS ses coefficients nuls',
      'il existe une combinaison linéaire nulle à coefficients non tous nuls',
      'les vecteurs \\(u_1,\\ldots,u_p\\) sont deux à deux distincts',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§94) : \\(\\forall\\alpha_1,\\ldots,\\alpha_p\\in K,\\ (\\alpha_1u_1+\\cdots+\\alpha_pu_p=0_E\\Rightarrow\\alpha_1=\\cdots=\\alpha_p=0)\\) — un quantificateur UNIVERSEL sur les coefficients, c’est la seule combinaison nulle possible qui est la triviale.',
    wrongExplain: {
      1: 'C’est exactement la définition d’une famille LIÉE (son contraire) — l’existence d’une combinaison nulle non triviale est ce qui rend une famille liée, pas libre.',
      2: 'Des vecteurs deux à deux distincts peuvent très bien être liés (ex. \\(u\\) et \\(2u\\) sont distincts si \\(u\\neq0_E\\), mais colinéaires donc liés) — la distinction deux à deux n’a rien à voir avec la liberté.',
    },
  },
  {
    id: 'ex86', section: 'ev-familles',
    statement: 'Une famille qui n’est pas libre est dite :',
    options: [
      'liée',
      'génératrice',
      'canonique',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§94, fin) : « libre » et « liée » sont les deux seules possibilités, strictement opposées l’une de l’autre.',
    wrongExplain: {
      1: '« Génératrice » est une notion totalement INDÉPENDANTE de libre/liée (§93) — elle porte sur le fait d’engendrer un sev donné, pas sur l’absence de relation de dépendance.',
      2: '« Canonique » qualifie certaines bases particulières remarquables (§116-118), ce n’est en aucun cas le contraire de « libre ».',
    },
  },
  {
    id: 'ex87', section: 'ev-familles',
    statement: 'Pour \\(x,y\\in E\\setminus\\{0_E\\}\\), la famille \\((x,y)\\) est liée si et seulement si :',
    options: [
      '\\(\\exists\\alpha\\in K,\\ x=\\alpha y\\) ou \\(y=\\alpha x\\)',
      '\\(x=y\\) exactement',
      '\\(x\\) et \\(y\\) appartiennent à des espaces vectoriels différents',
    ],
    correctIndex: 0,
    explain: 'Caractérisation pratique du cours (§95.ii) pour deux vecteurs non nuls : liée ssi l’un est un multiple scalaire de l’autre (colinéarité) — c’est la version la plus utilisée en pratique pour une famille de longueur 2.',
    wrongExplain: {
      1: '\\(x=y\\) est un cas TRÈS particulier de colinéarité (\\(\\alpha=1\\)), mais la liaison est bien plus générale : \\(x=5y\\) suffit aussi, sans que \\(x\\) et \\(y\\) soient égaux.',
      2: 'La notion de famille liée n’a de sens que pour des vecteurs d’un MÊME espace vectoriel \\(E\\) — comparer des vecteurs d’espaces différents n’a pas de sens ici.',
    },
  },
  {
    id: 'ex88', section: 'ev-familles',
    statement: 'Si une famille de vecteurs contient le vecteur nul \\(0_E\\), alors cette famille est :',
    options: [
      'toujours liée',
      'toujours libre',
      'libre ou liée selon les autres vecteurs de la famille',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§95.iii) : une famille contenant \\(0_E\\) est TOUJOURS liée — il suffit de prendre le coefficient \\(1\\) devant \\(0_E\\) et \\(0\\) devant tous les autres pour obtenir une combinaison nulle non triviale.',
    wrongExplain: {
      1: 'C’est l’inverse exact de la remarque du cours — la présence de \\(0_E\\) rend la famille liée à coup sûr, jamais libre.',
      2: 'Aucune dépendance aux « autres vecteurs » : la seule présence de \\(0_E\\) dans la famille suffit systématiquement à la rendre liée, quels que soient les autres vecteurs.',
    },
  },
  {
    id: 'ex89', section: 'ev-familles',
    statement: 'Dire qu’une famille \\(F=(u_1,\\ldots,u_p)\\) est liée équivaut à dire que :',
    options: [
      'il existe une « relation de liaison non triviale » : \\(\\exists\\alpha_1,\\ldots,\\alpha_p\\in K\\) non tous nuls tels que \\(\\alpha_1u_1+\\cdots+\\alpha_pu_p=0_E\\)',
      'tous les vecteurs \\(u_1,\\ldots,u_p\\) sont nuls',
      'aucun des \\(u_i\\) n’est combinaison linéaire des autres',
    ],
    correctIndex: 0,
    explain: 'Caractérisation du cours (§95.vi) : une famille liée équivaut exactement à l’existence d’une relation de liaison NON TRIVIALE — et cela équivaut aussi à dire qu’un des vecteurs est combinaison linéaire des autres.',
    wrongExplain: {
      1: 'Il suffit qu’UN SEUL coefficient soit non nul dans la relation de liaison (pas tous les vecteurs nuls) — ex. \\((u,2u)\\) est liée sans qu’aucun des deux vecteurs ne soit nul.',
      2: 'C’est exactement l’inverse : une famille liée signifie justement qu’il EXISTE un \\(u_i\\) qui EST combinaison linéaire des autres (§95.vi, fin) — pas qu’aucun ne l’est.',
    },
  },
  {
    id: 'ex90', section: 'ev-familles',
    statement: 'Pour \\(u,v\\in E\\), l’assertion \\(\\exists\\alpha,\\beta\\in K,\\ \\alpha u+\\beta v=0_E\\) est :',
    options: [
      'toujours vraie (il suffit de choisir \\(\\alpha=\\beta=0\\)), et ne prouve donc RIEN sur la liberté de \\((u,v)\\)',
      'une preuve que la famille \\((u,v)\\) est liée',
      'fausse en général, sauf si \\(u=v\\)',
    ],
    correctIndex: 0,
    explain: 'Piège explicite du cours (§98) : le quantificateur existentiel sur les coefficients rend cette assertion TOUJOURS vraie (\\(\\alpha=\\beta=0\\) convient toujours) — ce n’est donc jamais un test de liberté/liaison, qui exige un quantificateur UNIVERSEL (§94).',
    wrongExplain: {
      1: 'Confondre \\(\\exists\\) et \\(\\forall\\) est exactement le piège à éviter (§98) : la définition de « liée » exige l’existence de coefficients NON TOUS NULS, pas juste l’existence de N’IMPORTE QUELS coefficients (dont \\(0,0\\) qui marchent toujours).',
      2: 'L’assertion est vraie pour TOUS \\(u,v\\in E\\), peu importe qu’ils soient égaux ou non — le couple \\(\\alpha=\\beta=0\\) fonctionne systématiquement.',
    },
  },
  {
    id: 'ex91', section: 'ev-familles',
    statement: 'Si \\((u_1,\\ldots,u_p)\\) est une famille LIBRE et si \\(u\\notin\\text{vect}(u_1,\\ldots,u_p)\\), alors la famille étendue \\((u_1,\\ldots,u_p,u)\\) est :',
    options: [
      'encore libre',
      'nécessairement liée',
      'libre seulement si \\(u\\) est non nul ET colinéaire à l’un des \\(u_i\\)',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§95.v) : ajouter un vecteur qui n’appartient PAS déjà à l’espace engendré par une famille libre préserve la liberté de la famille étendue — c’est une technique courante pour construire une base pas à pas.',
    wrongExplain: {
      1: 'C’est l’inverse de la remarque du cours : c’est justement la condition \\(u\\notin\\text{vect}(u_1,\\ldots,u_p)\\) qui GARANTIT que la famille reste libre, pas qu’elle devient liée.',
      2: 'Si \\(u\\) était colinéaire à l’un des \\(u_i\\), il serait alors DANS \\(\\text{vect}(u_1,\\ldots,u_p)\\) — ce qui contredit directement l’hypothèse \\(u\\notin\\text{vect}(u_1,\\ldots,u_p)\\) de la question.',
    },
  },
  {
    id: 'ex92', section: 'ev-familles',
    statement: 'Dire qu’une famille \\((u_1,\\ldots,u_p)\\) de vecteurs de \\(F\\) est GÉNÉRATRICE de \\(F\\) signifie que :',
    options: [
      '\\(\\text{vect}(u_1,\\ldots,u_p)=F\\)',
      'la famille est nécessairement libre',
      '\\(p\\) est forcément égal au nombre d’éléments de \\(F\\)',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§93) : une famille est génératrice de \\(F\\) si l’espace qu’elle engendre coïncide exactement avec \\(F\\) — notion totalement indépendante du caractère libre ou non de la famille.',
    wrongExplain: {
      1: 'Être génératrice n’implique PAS d’être libre (§96, voir aussi §93-94) : une famille génératrice peut très bien contenir des vecteurs redondants (donc être liée) tout en engendrant quand même tout \\(F\\).',
      2: '\\(F\\) a en général une infinité d’éléments (sauf \\(F=\\{0_E\\}\\)) — \\(p\\), lui, est un entier fini (la longueur de la famille), les deux notions de « taille » ne sont pas comparables ainsi.',
    },
  },
  {
    id: 'ex93', section: 'ev-familles',
    statement: 'Parler de « famille génératrice » TOUT COURT, sans préciser de quel sous-espace, a-t-il un sens ?',
    options: [
      'Non, en général — il faut toujours préciser DE QUEL sous-espace vectoriel la famille est génératrice',
      'Oui, ça signifie toujours « génératrice de \\(E\\) tout entier »',
      'Oui, ça signifie toujours « génératrice de \\(\\{0_E\\}\\) »',
    ],
    correctIndex: 0,
    explain: 'Remarque explicite du cours (§99) : « génératrice » est une notion relative à un sev précis — la même famille peut être génératrice de \\(\\text{vect}\\) de ses propres vecteurs sans être génératrice de \\(E\\) tout entier.',
    wrongExplain: {
      1: 'C’est un abus fréquent mais inexact selon le cours : sans précision, l’énoncé reste incomplet — il FAUT préciser le sous-espace visé pour que l’affirmation ait un sens rigoureux.',
      2: 'Aucune famille non vide ne peut engendrer \\(\\{0_E\\}\\) sauf si tous ses vecteurs sont nuls — ce n’est certainement pas le sens par défaut de l’expression.',
    },
  },
  {
    id: 'ex94', section: 'ev-familles',
    statement: 'La famille \\(F=(u_1,u_2,u_3)\\) où \\(u_1=(1,-1,2)\\), \\(u_2=(1,1,-1)\\), \\(u_3=(-1,-5,7)\\) de \\(\\mathbb{R}^3\\) vérifie \\(u_3=-3u_1+2u_2\\). Que peut-on en conclure ?',
    options: [
      '\\(F\\) est liée, puisqu’on a exhibé une relation de liaison non triviale entre ses vecteurs',
      'Rien du tout, une seule relation ne suffit jamais à conclure',
      '\\(F\\) est libre, car \\(u_3\\) est une combinaison linéaire « valide » des deux autres',
    ],
    correctIndex: 0,
    explain: 'Exactement l’esprit de l’exercice 11 du cours : \\(u_3=-3u_1+2u_2\\) s’écrit \\(3u_1-2u_2+u_3=0_{\\mathbb{R}^3}\\), une relation de liaison NON TRIVIALE (coefficients \\(3,-2,1\\), non tous nuls) — par la caractérisation du §95.vi, \\(F\\) est donc liée.',
    wrongExplain: {
      1: 'Une seule relation de liaison non triviale suffit amplement : la définition même d’une famille liée (§94) exige seulement l’EXISTENCE d’une telle relation, pas plusieurs.',
      2: 'C’est l’inverse : qu’un vecteur de la famille s’écrive comme combinaison linéaire des autres est exactement la caractéristique d’une famille LIÉE (§95.vi), pas libre.',
    },
  },

  // ===== §14 — BASES, COORDONNÉES =====
  {
    id: 'ex95', section: 'ev-bases',
    statement: 'Une famille \\(B\\) est une base d’un sous-espace vectoriel \\(F\\) si et seulement si :',
    options: [
      '\\(B\\) est à la fois libre ET génératrice de \\(F\\)',
      '\\(B\\) est seulement génératrice de \\(F\\), la liberté n’est pas nécessaire',
      '\\(B\\) est seulement libre, sans devoir engendrer \\(F\\)',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§105) : une base combine les DEUX propriétés simultanément — libre (pas de redondance) et génératrice (couvre tout \\(F\\)).',
    wrongExplain: {
      1: 'Une famille génératrice mais LIÉE a des vecteurs redondants — elle engendre bien \\(F\\), mais chaque vecteur n’a pas de coordonnées UNIQUES, ce n’est pas une base.',
      2: 'Une famille libre mais pas génératrice n’engendre qu’une PARTIE de \\(F\\) — elle est libre, mais ne couvre pas tout \\(F\\), ce n’est pas une base de \\(F\\).',
    },
  },
  {
    id: 'ex96', section: 'ev-bases',
    statement: 'Pour établir que \\(B=(e_1,\\ldots,e_n)\\) est une base de \\(F\\), le critère pratique du cours (§106) consiste à montrer :',
    options: [
      'chaque \\(e_i\\in F\\), ET pour tout \\(x\\in F\\) il existe une UNIQUE famille \\((x_1,\\ldots,x_n)\\in K^n\\) telle que \\(x=x_1e_1+\\cdots+x_ne_n\\)',
      'seulement que chaque \\(e_i\\) appartient à \\(F\\)',
      'seulement qu’il existe AU MOINS une décomposition pour chaque \\(x\\in F\\), sans se soucier de l’unicité',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§106) : c’est une reformulation équivalente de « libre + génératrice » — l’EXISTENCE d’une décomposition traduit le caractère générateur, et son UNICITÉ traduit le caractère libre.',
    wrongExplain: {
      1: 'Ça ne garantit que l’appartenance des \\(e_i\\) à \\(F\\), mais rien sur le fait qu’ils engendrent \\(F\\) ni qu’ils soient libres — très insuffisant pour conclure que \\(B\\) est une base.',
      2: 'Oublier l’UNICITÉ revient à ne vérifier que le caractère générateur, pas le caractère libre — une famille génératrice mais liée satisferait ce critère affaibli sans être une base.',
    },
  },
  {
    id: 'ex97', section: 'ev-bases',
    statement: 'L’ensemble \\(M_{n,1}(K)\\) des vecteurs-colonnes à \\(n\\) lignes, muni de l’addition et de la multiplication externe usuelles, est :',
    options: [
      'un \\(K\\)-espace vectoriel',
      'seulement un ensemble, sans structure d’espace vectoriel possible',
      'un sous-espace vectoriel de \\(K_n[X]\\)',
    ],
    correctIndex: 0,
    explain: 'Proposition du cours (§110) : \\(M_{n,1}(K)\\), muni de l’addition et du produit externe terme à terme, est bien un \\(K\\)-espace vectoriel — essentiellement une autre façon d’écrire \\(K^n\\).',
    wrongExplain: {
      1: 'Le cours démontre explicitement (§110) que ces lois lui donnent une vraie structure de \\(K\\)-espace vectoriel — ce n’est pas qu’un ensemble brut sans structure.',
      2: '\\(M_{n,1}(K)\\) (vecteurs-colonnes de scalaires) et \\(K_n[X]\\) (polynômes de degré \\(\\leq n\\)) sont deux espaces vectoriels totalement DIFFÉRENTS, ni l’un n’est un sev de l’autre.',
    },
  },
  {
    id: 'ex98', section: 'ev-bases',
    statement: 'Si \\(B=(e_1,\\ldots,e_n)\\) est une base de \\(E\\) et \\(x\\in E\\), les coordonnées de \\(x\\) dans \\(B\\) sont :',
    options: [
      'l’UNIQUE \\(n\\)-uplet \\((x_1,\\ldots,x_n)\\in K^n\\) tel que \\(x=x_1e_1+\\cdots+x_ne_n\\)',
      'n’importe quel \\(n\\)-uplet qui vérifie \\(x=x_1e_1+\\cdots+x_ne_n\\), il peut y en avoir plusieurs',
      'les coefficients d’une combinaison linéaire des \\(e_i\\) qui vaudrait \\(0_E\\)',
    ],
    correctIndex: 0,
    explain: 'Définition du cours (§111) : l’UNICITÉ du \\(n\\)-uplet \\((x_1,\\ldots,x_n)\\) est garantie précisément parce que \\(B\\) est une BASE (donc libre) — sans cette liberté, les coordonnées ne seraient pas bien définies.',
    wrongExplain: {
      1: 'L’unicité n’est pas accessoire : c’est exactement le caractère LIBRE de la base \\(B\\) qui la garantit — s’il pouvait y avoir plusieurs \\(n\\)-uplets, la notion même de « coordonnées » n’aurait pas de sens.',
      2: 'Une combinaison linéaire nulle des \\(e_i\\) à coefficients TOUS NULS (puisque \\(B\\) est libre) n’a rien à voir avec les coordonnées d’un vecteur \\(x\\) quelconque — c’est un cas très particulier (\\(x=0_E\\)), pas la définition générale.',
    },
  },
  {
    id: 'ex99', section: 'ev-bases',
    statement: 'Si \\(x,y\\in E\\) et \\(\\alpha\\in K\\), les coordonnées dans une base \\(B\\) vérifient :',
    options: [
      '\\([x+y]_B=[x]_B+[y]_B\\) et \\([\\alpha x]_B=\\alpha[x]_B\\)',
      '\\([x+y]_B=[x]_B\\times[y]_B\\)',
      'il n’existe aucune relation simple entre \\([x]_B\\), \\([y]_B\\) et \\([x+y]_B\\)',
    ],
    correctIndex: 0,
    explain: 'Proposition du cours (§113) : prendre les coordonnées dans une base préserve l’addition et la multiplication externe — c’est ce qui permet de calculer AVEC les coordonnées plutôt qu’avec les vecteurs eux-mêmes.',
    wrongExplain: {
      1: 'Il n’existe pas de produit « terme à terme » naturel entre deux vecteurs-colonnes de coordonnées dans ce contexte — la relation porte sur l’ADDITION, pas sur un produit.',
      2: 'C’est au contraire une propriété TRÈS simple et systématique (§113) — les coordonnées se comportent exactement comme les vecteurs eux-mêmes pour \\(+\\) et \\(.\\).',
    },
  },
  {
    id: 'ex100', section: 'ev-bases',
    statement: 'Un vecteur \\(x\\in E\\) est égal à \\(0_E\\) si et seulement si :',
    options: [
      'ses coordonnées dans N’IMPORTE QUELLE base de \\(E\\) sont toutes nulles',
      'ses coordonnées sont toutes nulles, mais seulement dans LA base canonique',
      'au moins une de ses coordonnées est nulle, dans une base au choix',
    ],
    correctIndex: 0,
    explain: 'Remarque du cours (§114) : cette caractérisation est vraie dans TOUTE base, pas seulement une base particulière — \\(x=0_E\\Leftrightarrow\\) toutes ses coordonnées valent \\(0\\), quelle que soit la base choisie.',
    wrongExplain: {
      1: 'Le résultat ne dépend pas du choix d’une base « privilégiée » comme la canonique — il reste vrai pour N’IMPORTE QUELLE base de \\(E\\) (et un espace général n’a d’ailleurs pas toujours de base canonique, §119).',
      2: 'Une seule coordonnée nulle ne dit rien sur les autres — il faut que TOUTES les coordonnées soient nulles simultanément pour conclure \\(x=0_E\\).',
    },
  },
  {
    id: 'ex101', section: 'ev-bases',
    statement: 'La base canonique de \\(K_n[X]\\) (polynômes de degré \\(\\leq n\\)) est \\((1,X,\\ldots,X^n)\\). Combien de polynômes contient-elle ?',
    options: [
      '\\(n+1\\) polynômes',
      '\\(n\\) polynômes',
      '\\(n-1\\) polynômes',
    ],
    correctIndex: 0,
    explain: 'Piège signalé explicitement dans le cours (§117) : la liste \\(1,X,X^2,\\ldots,X^n\\) contient \\(n+1\\) éléments (de l’exposant \\(0\\) à l’exposant \\(n\\) inclus), PAS \\(n\\) — un décompte naïf oublie souvent le \\(1=X^0\\) du début.',
    wrongExplain: {
      1: 'C’est exactement l’erreur de décompte que le cours signale explicitement : on oublie le terme \\(1=X^0\\), ce qui fait perdre un élément — il y a bien \\(n+1\\) polynômes, pas \\(n\\).',
      2: '\\(n-1\\) sous-estime encore plus largement — même en comptant seulement \\(X,X^2,\\ldots,X^n\\) sans le \\(1\\), on obtiendrait déjà \\(n\\) éléments, pas \\(n-1\\).',
    },
  },
  {
    id: 'ex102', section: 'ev-bases',
    statement: 'La famille \\((1,i)\\) est appelée « base canonique » du \\(\\mathbb{R}\\)-espace vectoriel \\(\\mathbb{C}\\). Si \\(z=a+bi\\) (\\(a,b\\in\\mathbb{R}\\)), ses coordonnées dans cette base sont :',
    options: [
      '\\(a\\) et \\(b\\)',
      '\\(a\\) et \\(bi\\)',
      'uniquement le module \\(|z|\\)',
    ],
    correctIndex: 0,
    explain: 'Résultat du cours (§118) : dans la base \\((1,i)\\), les coordonnées de \\(z=a+bi\\) sont les deux RÉELS \\(a\\) et \\(b\\) (pas \\(bi\\), qui n’est pas un scalaire de \\(\\mathbb{R}\\) multiplié par rien d’autre que lui-même).',
    wrongExplain: {
      1: 'Les coordonnées doivent être des SCALAIRES du corps de base, ici \\(\\mathbb{R}\\) — \\(bi\\) est un nombre complexe (sauf si \\(b=0\\)), pas un réel, donc ce n’est pas une coordonnée valide dans ce \\(\\mathbb{R}\\)-espace vectoriel.',
      2: 'Le module \\(|z|=\\sqrt{a^2+b^2}\\) est un UNIQUE nombre réel — il ne peut à lui seul reconstituer \\(z=a+bi\\) (deux valeurs de \\(a,b\\) différentes peuvent donner le même module), ce n’est pas un couple de coordonnées dans une base à 2 vecteurs.',
    },
  },
  {
    id: 'ex103', section: 'ev-bases',
    statement: 'La notion de « base canonique » (comme celle de \\(K^n\\) ou de \\(\\mathbb{C}\\)) existe-t-elle pour TOUT espace vectoriel ?',
    options: [
      'Non — un espace vectoriel « général » n’a, en général, pas de base canonique privilégiée',
      'Oui, toujours, par un procédé universel applicable à n’importe quel espace',
      'Oui, mais uniquement si l’espace est de dimension 1',
    ],
    correctIndex: 0,
    explain: 'Remarque explicite du cours (§119) : seul un petit nombre d’espaces bien identifiés (\\(K^n\\), \\(\\mathbb{C}\\), \\(K_n[X]\\)...) ont une base dite « canonique » — la notion n’est PAS universelle à tous les espaces vectoriels.',
    wrongExplain: {
      1: 'C’est exactement l’inverse de la remarque du cours : il n’existe aucun procédé universel garantissant une base canonique pour un espace vectoriel quelconque.',
      2: 'La dimension 1 ne change rien à l’affaire — un espace de dimension 1 « abstrait », sans structure particulière reconnue, n’a pas plus de base canonique naturelle qu’un autre.',
    },
  },
  {
    id: 'ex104', section: 'ev-bases',
    statement: 'Si \\(F=(f_1,\\ldots,f_p)\\) est une base de \\(F\\) et \\(G=(g_1,\\ldots,g_q)\\) une base de \\(G\\), le théorème du cours affirme que \\(E=F\\oplus G\\) si et seulement si :',
    options: [
      'la famille réunie \\((f_1,\\ldots,f_p,g_1,\\ldots,g_q)\\) est une base de \\(E\\)',
      '\\(p=q\\) nécessairement',
      'les familles \\(F\\) et \\(G\\) sont identiques',
    ],
    correctIndex: 0,
    explain: 'Théorème du cours (§122, caractérisation de la supplémentarité par des bases) : réunir une base de \\(F\\) et une base de \\(G\\) donne une base de \\(E\\) exactement quand \\(F\\) et \\(G\\) sont supplémentaires — un moyen fréquent de prouver la supplémentarité ou de construire une base de \\(E\\).',
    wrongExplain: {
      1: 'Rien n’impose que \\(F\\) et \\(G\\) aient le même nombre de vecteurs dans leur base — ex. une droite (\\(p=1\\)) et un plan (\\(q=2\\)) peuvent très bien être supplémentaires dans un espace de dimension 3.',
      2: 'Si \\(F\\) et \\(G\\) étaient identiques, elles ne pourraient pas être supplémentaires (sauf cas trivial \\(F=G=\\{0_E\\}\\)) : la supplémentarité exige au contraire \\(F\\cap G=\\{0_E\\}\\), donc des familles très différentes en général.',
    },
  },
];

const SECTIONS = [
  {
    id: 'general', title: '§1 — FORMULES GÉNÉRALES DANS ℂ',
    cours: '\\(i^2=-1\\) ; pour \\(r\\geq0\\) réel, \\(-r=(i\\sqrt{r})^2\\) (tout négatif devient un carré complexe)<br><span class="math">Somme géométrique, binôme de Newton</span> \\((a+b)^n=\\sum\\binom{n}{k}a^kb^{n-k}\\), \\(a^n-b^n=(a-b)(\\cdots)\\) : mêmes formules que dans \\(\\mathbb{R}\\)<br>Nouveau dans \\(\\mathbb{C}\\) : \\(a^2+b^2=(a+ib)(a-ib)\\)',
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
  {
    id: 'polynomes', title: '§7 — POLYNÔMES (CHAPITRE II)',
    cours: '<span class="math">Racines infinies</span> : un polynôme non nul a un nombre de racines borné par son degré — en avoir une infinité impose \\(Q=0\\) (argument clé, réutilisé plusieurs fois)<br>Équation fonctionnelle sur un polynôme : évaluer en des points bien choisis révèle des racines ; factoriser par ces racines connues, puis réappliquer l’argument « racines infinies » au facteur restant<br><span class="math">Relations de Viète</span> (degré 3, racines \\(a,b,c\\)) : \\(P=X^3-\\sigma_1X^2+\\sigma_2X-\\sigma_3\\) avec \\(\\sigma_1=a+b+c\\), \\(\\sigma_2=ab+bc+ca\\), \\(\\sigma_3=abc\\) — identification coefficient par coefficient<br>Si \\(a\\) est racine de \\(P\\), réinjecter directement \\(P(a)=0\\) est souvent plus rapide que Viète<br><span class="math">Division euclidienne</span> \\(A=BQ+R\\) : évaluer en une racine \\(\\alpha\\) de \\(B\\) donne directement \\(A(\\alpha)=R(\\alpha)\\)<br>Construire un polynôme qui s’annule sur des points donnés : un PRODUIT de \\((X-k)\\) ; l’élever au carré double le degré sans changer l’ensemble des racines',
  },

  {
    id: 'ev-structure', title: '§8 — STRUCTURE D\'ESPACE VECTORIEL (CHAPITRE III)',
    cours: '<span class="math">Espace vectoriel</span> \\((E,+,.)\\) sur \\(K\\) : 10 conditions — 5 sur \\(+\\) (loi interne, commutative, associative, vecteur nul \\(0_E\\), opposé \\(-u\\)), 5 sur \\(.\\) (loi externe \\(K\\times E\\to E\\), 2 distributivités mixtes, associativité mixte \\((\\alpha\\beta)u=\\alpha(\\beta u)\\), \\(1.u=u\\))<br>Vocabulaire : élément de \\(E\\) = vecteur, élément de \\(K\\) = scalaire<br>Propriétés élémentaires : \\(au=0_E\\Leftrightarrow a=0\\) ou \\(u=0_E\\) ; \\(-u=(-1)u\\) ; \\((a-b)u=au-bu\\)<br><span class="math">Combinaison linéaire</span> de \\(u_1,\\ldots,u_n\\) : \\(\\alpha_1u_1+\\cdots+\\alpha_nu_n\\) — opération fondamentale de l\'algèbre linéaire',
  },
  {
    id: 'ev-exemples', title: '§9 — EXEMPLES D\'ESPACES VECTORIELS',
    cours: '<span class="math">\\(K^n\\) canonique</span> : lois composante par composante — sans précision, « \\(K^n\\) » désigne toujours cette structure canonique<br><span class="math">\\(\\mathbb{R}\\)-espace \\(\\mathbb{C}\\)</span> : addition usuelle + produit externe \\(r.z=r\\times z\\) pour \\(r\\in\\mathbb{R}\\) SEULEMENT (distinct du \\(\\mathbb{C}\\)-espace \\(\\mathbb{C}\\))<br><span class="math">\\(F(X,E)\\)</span> : applications de \\(X\\) dans \\(E\\), lois définies point par point — théorème : c\'est un espace vectoriel. Suites réelles = cas particulier \\(X=\\mathbb{N}\\)<br><span class="math">\\(\\mathbb{R}[X]\\)</span> : polynômes, addition et produit externe évidents, vecteur nul = polynôme nul<br><span class="math">Espace-produit</span> \\(E\\times F\\) : \\((a,b)+(c,d)=(a+c,b+d)\\), chaque composante dans son propre espace',
  },
  {
    id: 'ev-sev', title: '§10 — SOUS-ESPACES VECTORIELS',
    cours: '<span class="math">Définition</span> \\(F\\subseteq E\\) est un sev si \\(0_E\\in F\\), \\(F\\) stable par \\(+\\), \\(F\\) stable par \\(.\\) — critère allégé : \\(\\forall x,y\\in F,\\forall\\alpha\\in K,\\ \\alpha x+y\\in F\\)<br>Sev triviaux : \\(\\{0_E\\}\\) et \\(E\\) ; \\(K_n[X]\\) (degré \\(\\leq n\\)) est un sev de \\(K[X]\\)<br>Pour prouver \\(F=\\{0_E\\}\\) : seule l\'inclusion \\(F\\subseteq\\{0_E\\}\\) est à démontrer (l\'autre est automatique)<br>Géométriquement en dimension \\(\\leq3\\) : sev non triviaux = droites/plans passant par l\'origine<br>« \\(F\\) sev de \\(G\\) » \\(\\Leftrightarrow\\) \\(F\\subseteq G\\)<br>Piège : \\(F_3=\\{(x,y);5x-3y=1\\}\\) n\'est PAS un sev (\\((0,0)\\notin F_3\\))',
  },
  {
    id: 'ev-engendre', title: '§11 — SOUS-ESPACE VECTORIEL ENGENDRÉ',
    cours: '<span class="math">\\(\\text{vect}(X)\\)</span> : ensemble de toutes les combinaisons linéaires (finies) de vecteurs de \\(X\\) — c\'est un sev de \\(E\\)<br><span class="math">Lemme d\'expansion</span> : \\(\\text{vect}(X)\\) est le PLUS PETIT sev de \\(E\\) contenant \\(X\\) ; \\(X\\subseteq Y\\Rightarrow\\text{vect}(X)\\subseteq\\text{vect}(Y)\\)<br><span class="math">Partie génératrice</span> de \\(E\\) : \\(\\text{vect}(X)=E\\) (seule l\'inclusion \\(E\\subseteq\\text{vect}(X)\\) est à montrer)<br><span class="math">Droite vectorielle</span> \\(\\text{vect}(u)\\) pour \\(u\\neq0_E\\) ; <span class="math">plan vectoriel</span> \\(\\text{vect}(u,v)\\) pour \\((u,v)\\) non colinéaires<br>\\(\\text{vect}(a_1,\\ldots,a_p)+\\text{vect}(b_1,\\ldots,b_q)=\\text{vect}(a_1,\\ldots,a_p,b_1,\\ldots,b_q)\\) : moyen pratique de calculer une somme de sev<br><span class="math">Générateur redondant</span> : si \\(u\\in\\text{vect}(u_1,\\ldots,u_n)\\), ajouter \\(u\\) à la famille ne change pas l\'espace engendré — attention aux vecteurs colinéaires qui n\'engendrent jamais plus qu\'une droite',
  },
  {
    id: 'ev-somme', title: '§12 — INTERSECTION, SOMME DE SOUS-ESPACES VECTORIELS',
    cours: '\\(F\\cap G\\) est TOUJOURS un sev de \\(E\\) (se généralise à plus de deux sev)<br><span class="math">Somme</span> \\(F+G=\\{x+y;x\\in F,y\\in G\\}\\) : sev de \\(E\\), avec \\(F\\subseteq F+G\\) et \\(G\\subseteq F+G\\)<br>Décomposition \\(u=x+y\\) dans \\(F+G\\) : NON unique en général<br><span class="math">Sev supplémentaires</span> \\(E=F\\oplus G\\) : décomposition UNIQUE pour tout \\(u\\in E\\)<br>Caractérisation pratique : \\(E=F\\oplus G\\Leftrightarrow F+G=E\\) ET \\(F\\cap G=\\{0_E\\}\\) (les deux conditions ensemble, aucune ne suffit seule)',
  },
  {
    id: 'ev-familles', title: '§13 — FAMILLES GÉNÉRATRICES, LIBRES, LIÉES',
    cours: '<span class="math">Famille génératrice</span> de \\(F\\) : \\(\\text{vect}(u_1,\\ldots,u_p)=F\\) — notion indépendante de libre/liée, et toujours relative à UN sev précis<br><span class="math">Famille libre</span> : \\(\\forall\\alpha_i\\in K,\\ \\alpha_1u_1+\\cdots+\\alpha_pu_p=0_E\\Rightarrow\\) tous les \\(\\alpha_i=0\\) (quantificateur universel) ; sinon <span class="math">liée</span><br>Deux vecteurs non nuls \\(x,y\\) <span class="math">colinéaires</span> \\(\\Leftrightarrow\\exists\\alpha,\\ x=\\alpha y\\) ou \\(y=\\alpha x\\)<br>Une famille contenant \\(0_E\\) est TOUJOURS liée<br>Liée \\(\\Leftrightarrow\\) relation de liaison non triviale (coefficients non tous nuls) \\(\\Leftrightarrow\\) un vecteur = combinaison linéaire des autres<br>Piège de quantificateur : \\(\\exists\\alpha,\\beta,\\ \\alpha u+\\beta v=0_E\\) est TOUJOURS vraie (\\(\\alpha=\\beta=0\\)) — ne prouve RIEN sur la liberté, il faut le \\(\\forall\\)<br>Si \\((u_1,\\ldots,u_p)\\) libre et \\(u\\notin\\text{vect}(u_1,\\ldots,u_p)\\), la famille étendue \\((u_1,\\ldots,u_p,u)\\) reste libre',
  },
  {
    id: 'ev-bases', title: '§14 — BASES, COORDONNÉES',
    cours: '<span class="math">Base</span> de \\(F\\) : famille LIBRE ET GÉNÉRATRICE de \\(F\\) — ou, de façon équivalente, chaque \\(e_i\\in F\\) et tout \\(x\\in F\\) a une UNIQUE décomposition sur \\(B\\)<br><span class="math">Coordonnées</span> \\([x]_B\\) de \\(x\\) dans \\(B=(e_1,\\ldots,e_n)\\) : l\'unique \\(n\\)-uplet tel que \\(x=x_1e_1+\\cdots+x_ne_n\\) ; \\([x+y]_B=[x]_B+[y]_B\\), \\([\\alpha x]_B=\\alpha[x]_B\\)<br>\\(x=0_E\\Leftrightarrow\\) toutes ses coordonnées sont nulles, dans N\'IMPORTE QUELLE base<br>Toute base d\'un même espace a la MÊME longueur \\(n\\)<br>Bases canoniques (existent seulement pour quelques espaces précis, PAS pour un espace général) : \\(K^n\\) ; \\(K_n[X]=(1,X,\\ldots,X^n)\\), attention \\(n+1\\) polynômes et non \\(n\\) ; \\(\\mathbb{C}=(1,i)\\)<br><span class="math">Caractérisation de la supplémentarité par des bases</span> : si \\(F=(f_1,\\ldots,f_p)\\) base de \\(F\\) et \\(G=(g_1,\\ldots,g_q)\\) base de \\(G\\), alors \\(E=F\\oplus G\\Leftrightarrow(f_1,\\ldots,f_p,g_1,\\ldots,g_q)\\) est une base de \\(E\\)',
  },
];

initFiche({ STATE_KEY: CHAPTER_STATE_KEYS.algebre, CHAPTER_ID: 'algebre', EXERCISES, SECTIONS });
