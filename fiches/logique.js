/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/logique.js
   Rendu + vérification des exercices de la fiche LOGIQUE.
   Tous les exercices sont des QCM à 3 réponses.
   Reconstruit intégralement à partir de « Raisonnement et ensembles »
   (L1 INU Champollion) : 6 chapitres (raisonnement,
   ensembles, fonctions/applications, injections/surjections/
   bijections, image directe/réciproque, relations d'équivalence).
   ============================================================ */

const EXERCISES = [
  {
    id: "ex1", section: "assertions",
    statement: "Selon le cours, que signifie « b divise a » (noté \\(b \\mid a\\)) ?",
    options: ["Il existe un entier q tel que a = bq", "Il existe un entier q tel que b = aq", "a et b ont le même reste dans la division par un entier fixé"],
    correctIndex: 0,
    explain: "Par définition du cours, b|a signifie qu'il existe un entier q tel que a = bq (b est un diviseur de a).",
  },
  {
    id: "ex2", section: "connecteurs",
    statement: "D'après la table de vérité du cours, quand l'implication \\(s\\Rightarrow S\\) est-elle fausse ?",
    options: ["Uniquement quand s est vraie et S est fausse", "Quand s et S sont toutes les deux fausses", "Quand s est fausse, quelle que soit la valeur de S"],
    correctIndex: 0,
    explain: "Par définition, s⇒S est fausse exactement dans le seul cas où s est vraie et S est fausse ; dans tous les autres cas (y compris s fausse) elle est vraie.",
  },
  {
    id: "ex3", section: "connecteurs",
    statement: "Quelle est la négation de l'implication \\(s\\Rightarrow S\\) ?",
    options: ["s et ¬S", "¬s et S", "¬s ⇒ ¬S"],
    correctIndex: 0,
    explain: "Le cours établit que la négation de s⇒S est « s et ¬S » (s vraie, S fausse).",
  },
  {
    id: "ex4", section: "quantificateurs",
    statement: "Quelle est la négation de \\(\\forall x \\in E, s(x)\\) ?",
    options: ["∃x ∈ E, ¬s(x)", "∀x ∈ E, ¬s(x)", "∃x ∈ E, s(x)"],
    correctIndex: 0,
    explain: "La négation d'un ∀ est un ∃ portant sur la négation de l'assertion : ¬(∀x, s(x)) = ∃x, ¬s(x).",
  },
  {
    id: "ex5", section: "quantificateurs",
    statement: "D'après le cours, les assertions « \\(\\forall m \\in \\mathbb{R}, \\exists x \\in \\mathbb{R}, m = 2x+1\\) » et « \\(\\exists x \\in \\mathbb{R}, \\forall m \\in \\mathbb{R}, m = 2x+1\\) » sont-elles équivalentes ?",
    options: ["Non : la première est vraie (x dépend de m) mais la seconde est fausse (il faudrait un x fixe convenant à tout m)", "Oui, l'ordre des quantificateurs ∀ et ∃ ne change jamais le sens d'une assertion", "Non, c'est l'inverse : la première est fausse et la seconde est vraie"],
    correctIndex: 0,
    explain: "Le cours souligne que changer l'ordre des quantificateurs ∀∃ peut changer complètement le sens : ici seule la première assertion (où x peut dépendre de m) est vraie.",
  },
  {
    id: "ex6", section: "types-raisonnement",
    statement: "Pour démontrer une implication \\(s\\Rightarrow S\\) par contraposition, que doit-on démontrer ?",
    options: ["¬S ⇒ ¬s", "¬s ⇒ ¬S", "S ⇒ s"],
    correctIndex: 0,
    explain: "La contraposée de s⇒S est ¬S⇒¬s, et le cours montre qu'une implication est toujours équivalente à sa contraposée.",
  },
  {
    id: "ex7", section: "types-raisonnement",
    statement: "Dans la preuve de l'irrationalité de √2 donnée dans le cours, quel type de raisonnement est utilisé ?",
    options: ["Un raisonnement par l'absurde, en supposant √2 = a/b puis en aboutissant à une contradiction sur la parité de a et b", "Une récurrence forte sur les entiers a et b", "Une disjonction de cas sur le signe de a et de b"],
    correctIndex: 0,
    explain: "Le cours suppose √2 rationnel (a/b avec a,b non tous deux pairs), puis montre que a et b sont tous deux pairs, contredisant l'hypothèse — c'est un raisonnement par l'absurde.",
  },
  {
    id: "ex8", section: "recurrence",
    statement: "Dans une récurrence à deux pas pour montrer ∀n≥0, P(n), que doit-on vérifier à l'initialisation ?",
    options: ["P(0) ET P(1)", "Seulement P(0)", "P(0), P(1) et P(2)"],
    correctIndex: 0,
    explain: "Le cours précise que la récurrence à deux pas nécessite d'initialiser sur les deux premières valeurs P(0) et P(1), sinon l'hérédité ne s'amorce pas correctement (exemple des suites un+2=un+1+un).",
  },
  {
    id: "ex9", section: "egalite-definir",
    statement: "Pour prouver que deux ensembles A et B sont égaux, quelle méthode le cours recommande-t-il en pratique ?",
    options: ["Prouver les deux inclusions A⊆B et B⊆A séparément", "Montrer qu'ils ont le même cardinal", "Vérifier qu'ils sont tous deux non vides"],
    correctIndex: 0,
    explain: "Le cours définit l'égalité de deux ensembles comme une double inclusion et recommande de prouver séparément A⊆B puis B⊆A.",
  },
  {
    id: "ex10", section: "egalite-definir",
    statement: "L'ensemble D des entiers impairs entre 0 et 9 s'écrit en compréhension dans le cours comme :",
    options: ["{d ∈ ℝ ; ∃k ∈ ℤ, d = 2k+1 et 0 ≤ d ≤ 9}", "{d ∈ ℝ ; ∀k ∈ ℤ, d = 2k+1}", "{2k+1 ; ∀k ∈ ℤ}"],
    correctIndex: 0,
    explain: "Le cours donne exactement cette écriture en compréhension, avec un quantificateur existentiel après le séparateur point-virgule (jamais avant).",
  },
  {
    id: "ex11", section: "inclusion",
    statement: "Si E = ∅, que vaut l'ensemble des parties P(E) selon le cours ?",
    options: ["{∅}, un ensemble à un élément (non vide)", "∅, l'ensemble vide lui-même", "Il n'est pas défini car E est vide"],
    correctIndex: 0,
    explain: "Le cours insiste : P(∅) = {∅}, qui contient exactement un élément (l'ensemble vide) et n'est donc pas vide.",
  },
  {
    id: "ex12", section: "operations-ensembles",
    statement: "D'après les lois de De Morgan du cours, \\(\\overline{A \\cap B}\\) est égal à :",
    options: ["\\(\\overline{A} \\cup \\overline{B}\\)", "\\(\\overline{A} \\cap \\overline{B}\\)", "\\(A \\cup B\\)"],
    correctIndex: 0,
    explain: "Le cours énonce : \\(\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}\\) — le complémentaire d'une intersection est la réunion des complémentaires.",
  },
  {
    id: "ex13", section: "operations-ensembles",
    statement: "Le cours démontre par double inclusion que :",
    options: ["A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)", "A ∩ (B ∪ C) = (A ∪ B) ∩ (A ∪ C)", "A ∩ (B ∪ C) = A ∩ B ∩ C"],
    correctIndex: 0,
    explain: "Le cours détaille cette preuve précise de distributivité de l'intersection sur la réunion, par double inclusion.",
  },
  {
    id: "ex14", section: "cardinal-produit",
    statement: "Selon le lemme des bergers, si E1,...,En sont des ensembles finis deux à deux disjoints de réunion E, alors :",
    options: ["|E| = |E1| + |E2| + ... + |En|", "|E| = |E1| × |E2| × ... × |En|", "|E| = max(|E1|,...,|En|)"],
    correctIndex: 0,
    explain: "Le lemme des bergers énonce que le cardinal d'une réunion d'ensembles finis deux à deux disjoints est la somme de leurs cardinaux.",
  },
  {
    id: "ex15", section: "cardinal-produit",
    statement: "Si E est un ensemble fini, quel est le cardinal de P(E) selon le cours ?",
    options: ["2 puissance |E|", "|E| au carré", "|E| factorielle"],
    correctIndex: 0,
    explain: "Le cours donne la formule |P(E)| = 2^|E|.",
  },
  {
    id: "ex16", section: "fonctions-def",
    statement: "Quelle est, selon le cours, la différence entre une fonction et une application de E vers F ?",
    options: ["Une application associe exactement une image à chaque élément de E, une fonction au plus une", "Une fonction est toujours injective, contrairement à une application", "Il n'y a aucune différence, ce sont des synonymes stricts"],
    correctIndex: 0,
    explain: "Le cours définit une fonction comme associant au plus une image, et une application comme en associant exactement une (une application est donc toujours une fonction, pas l'inverse).",
  },
  {
    id: "ex17", section: "fonctions-def",
    statement: "Pour la fonction f: ℝ → ℝ, x ↦ x², combien d'antécédents admet f(2)=4 ?",
    options: ["Deux : 2 et -2", "Un seul : 2", "Aucun"],
    correctIndex: 0,
    explain: "Le cours donne cet exemple précis : f(2)=4 admet deux antécédents, 2 et -2, ce qui montre qu'un élément peut avoir plusieurs antécédents même si f est une application.",
  },
  {
    id: "ex18", section: "fonctions-remarquables",
    statement: "Une fonction f: ℝ→ℝ est dite paire si :",
    options: ["∀x∈ℝ, f(-x) = f(x)", "∀x∈ℝ, f(-x) = -f(x)", "∃x∈ℝ, f(-x) = f(x)"],
    correctIndex: 0,
    explain: "Définition du cours : f est paire si f(-x)=f(x) pour tout x (son graphe est symétrique par rapport à l'axe des ordonnées).",
  },
  {
    id: "ex19", section: "composition",
    statement: "Si f(x) = x+1 et g(x) = 2x, que vaut \\((g \\circ f)(0)\\) selon le calcul du cours ?",
    options: ["2", "1", "0"],
    correctIndex: 0,
    explain: "Le cours calcule \\((g \\circ f)(x) = 2(x+1) = 2x+2\\), donc \\((g \\circ f)(0) = 2\\), différent de \\((f \\circ g)(0) = 1\\) (ce qui prouve \\(g \\circ f \\neq f \\circ g\\)).",
  },
  {
    id: "ex20", section: "restriction-prolongement",
    statement: "Si v: ℝ→ℝ, x↦|x|, quelle est sa restriction w = v restreinte à ℝ+ ?",
    options: ["w: ℝ+ → ℝ, x ↦ x", "w: ℝ+ → ℝ, x ↦ -x", "w n'est pas définie car ℝ+ n'est pas inclus dans ℝ"],
    correctIndex: 0,
    explain: "Le cours donne cet exemple exact : sur ℝ+, |x| = x, donc w: ℝ+→ℝ, x↦x.",
  },
  {
    id: "ex21", section: "injectivite",
    statement: "L'application f: [-2,+∞[ → ℝ, x↦x² est-elle injective selon le cours ?",
    options: ["Non, car f(-1) = f(1) alors que -1 ≠ 1", "Oui, car tout élément de l'arrivée admet un antécédent", "Oui, car f est strictement croissante sur tout son domaine"],
    correctIndex: 0,
    explain: "Le cours montre explicitement que f n'est pas injective : -1 et 1 sont distincts dans [-2,+∞[ et ont la même image 1.",
  },
  {
    id: "ex22", section: "injectivite",
    statement: "Pour prouver qu'une application f est injective, la bonne méthode selon le cours consiste à :",
    options: ["Se donner a,b∈E quelconques vérifiant f(a)=f(b), puis montrer a=b", "Se donner a=b et montrer que f(a)=f(b)", "Montrer que f est surjective"],
    correctIndex: 0,
    explain: "Le cours met en garde : partir de a=b pour montrer f(a)=f(b) ne prouve rien (c'est toujours vrai) ; il faut partir de f(a)=f(b) et en déduire a=b.",
  },
  {
    id: "ex23", section: "surjectivite",
    statement: "L'application g: [-2,+∞[ → [0,+∞[, x↦x² est-elle surjective selon le cours ?",
    options: ["Oui, car tout élément de [0,+∞[ admet au moins un antécédent dans [-2,+∞[", "Non, car -5 n'a pas d'antécédent", "Non, car certains éléments ont deux antécédents"],
    correctIndex: 0,
    explain: "Le cours confirme que g est surjective : contrairement à f:[-2,+∞[→ℝ (où -5 n'a pas d'antécédent), restreindre l'arrivée à [0,+∞[ rend l'application surjective.",
  },
  {
    id: "ex24", section: "bijections",
    statement: "Si f: E→F et g: F→G sont deux bijections, alors \\((g \\circ f)^{-1}\\) vaut :",
    options: ["\\(f^{-1} \\circ g^{-1}\\)", "\\(g^{-1} \\circ f^{-1}\\)", "\\((f \\circ g)^{-1}\\)"],
    correctIndex: 0,
    explain: "Le théorème du cours énonce \\((g \\circ f)^{-1} = f^{-1} \\circ g^{-1}\\) : on inverse chaque application ET on échange l'ordre de composition.",
  },
  {
    id: "ex25", section: "bijections",
    statement: "D'après le cours, une application f:E→F est bijective si et seulement si :",
    options: ["il existe g:F→E telle que \\(f \\circ g = \\mathrm{Id}_F\\) et \\(g \\circ f = \\mathrm{Id}_E\\)", "f est seulement injective", "f est seulement surjective"],
    correctIndex: 0,
    explain: "Le théorème du cours caractérise la bijectivité par l'existence d'une application g vérifiant ces deux égalités simultanément (et alors \\(g = f^{-1}\\)).",
  },
  {
    id: "ex26", section: "image-reciproque",
    statement: "Pour f: [-2,4] → ℝ+, x↦x², et B=[0,9], que vaut f⁻¹(B) selon l'exemple du cours ?",
    options: ["[-2,3]", "[0,3]", "[-3,3]"],
    correctIndex: 0,
    explain: "Le cours calcule f⁻¹([0,9]) = [-2,3] (les antécédents dans [-2,4] dont le carré est dans [0,9]).",
  },
  {
    id: "ex27", section: "image-reciproque",
    statement: "Que signifie l'écriture f⁻¹({m}) selon le cours ?",
    options: ["L'ensemble de tous les antécédents de m par f", "L'unique antécédent de m, ce qui suppose f bijective", "L'image de m par f"],
    correctIndex: 0,
    explain: "Le cours précise que f⁻¹({m}) désigne tous les antécédents de m ; il ne faut pas le confondre avec f⁻¹(m) qui suppose f bijective.",
  },
  {
    id: "ex28", section: "image-directe",
    statement: "Pour f: [-2,+∞[ → ℝ+, x↦x², et A=[-2,1], que vaut l'image directe f(A) selon le cours ?",
    options: ["[0,4]", "[-2,1]", "[0,1]"],
    correctIndex: 0,
    explain: "Le cours calcule f([-2,1]) = [0,4], l'ensemble des images des éléments de [-2,1].",
  },
  {
    id: "ex29", section: "image-directe",
    statement: "Que signifie Im f = f(E) selon le cours ?",
    options: ["L'ensemble des éléments de F qui admettent au moins un antécédent ; Im f = F ⇔ f surjective", "L'ensemble de départ E tout entier", "L'ensemble des points fixes de f"],
    correctIndex: 0,
    explain: "Le cours définit Im f comme l'image directe de E tout entier, et précise que Im f = F caractérise la surjectivité.",
  },
  {
    id: "ex30", section: "relations-equivalence",
    statement: "La relation R sur ℕ définie par xRy ⇔ y=x+1 ou y=x-1 (« être consécutifs ») est-elle une relation d'équivalence selon le cours ?",
    options: ["Non, elle n'est ni réflexive ni transitive", "Oui, elle vérifie les trois propriétés", "Oui, mais seulement parce qu'elle est symétrique"],
    correctIndex: 0,
    explain: "Le cours montre que cette relation n'est pas réflexive (42 n'est pas consécutif à lui-même) et pas transitive (2R3 et 3R4 mais pas 2R4), donc ce n'est pas une relation d'équivalence.",
  },
  {
    id: "ex31", section: "relations-equivalence",
    statement: "Une relation R définie par aRb ⇔ f(a)=f(b), pour une application f:E→F donnée, est :",
    options: ["Toujours une relation d'équivalence sur E", "Une relation d'équivalence seulement si f est bijective", "Jamais une relation d'équivalence"],
    correctIndex: 0,
    explain: "Le cours affirme que cette construction donne toujours une relation d'équivalence sur E, quelle que soit l'application f.",
  },
  {
    id: "ex32", section: "classes-equivalence",
    statement: "Pour la relation xRy ⇔ xy&gt;0 sur ℝ*, quelle est la classe d'équivalence de 2028 ?",
    options: ["ℝ*+ (tous les réels strictement positifs)", "ℝ*- (tous les réels strictement négatifs)", "{2028} seulement"],
    correctIndex: 0,
    explain: "Le cours calcule que la classe de 2028 est formée de tous les y tels que 2028y&gt;0, c'est-à-dire tous les y&gt;0, donc ℝ*+.",
  },
  {
    id: "ex33", section: "classes-equivalence",
    statement: "D'après le théorème du cours, l'ensemble des classes d'équivalence d'une relation d'équivalence sur E forme toujours :",
    options: ["Une partition de E", "Un sous-ensemble strict de E", "Une relation d'ordre sur E"],
    correctIndex: 0,
    explain: "Le théorème énoncé dans le cours établit que les classes d'équivalence forment toujours une partition de E (parties non vides, deux à deux disjointes, de réunion E).",
  },
  {
    id: "ex34", section: "classes-equivalence",
    statement: "Selon le cours, que signifie aRb en termes de classes d'équivalence ?",
    options: ["aRb ⇔ ā=b̄ (les classes de a et de b sont identiques)", "aRb ⇔ ā∩b̄=∅ (les classes de a et de b sont disjointes)", "aRb ⇔ ā⊊b̄ (la classe de a est strictement incluse dans celle de b)"],
    correctIndex: 0,
    explain: "Le cours démontre la chaîne d'équivalences aRb ⇔ a∈b̄ ⇔ b∈ā ⇔ ā=b̄ (en notant ā la classe de a).",
  },
];

const SECTIONS = [
  {
    id: "assertions", title: "§I.1 — ASSERTIONS, ENSEMBLES",
    cours: "<span class=\"math\">Assertion</span> = proposition (logique) = énoncé qui a un sens et qui est vraie ou fausse (jamais les deux).<br>\\(b \\mid a\\) (« b divise a ») \\(\\Leftrightarrow \\exists q, a = bq\\) ; cas particulier : \\(n\\) pair \\(\\Leftrightarrow n=2q\\), \\(n\\) impair \\(\\Leftrightarrow n=2k+1\\).<br><span class=\"math\">Négation</span> d'une assertion \\(s\\) (notée \\(\\neg s\\)) inverse sa valeur de vérité et \\(\\neg\\neg s = s\\) ; cas des inégalités : \\(=\\to\\neq\\), \\(&lt;\\to\\geq\\), \\(&gt;\\to\\leq\\), \\(\\leq\\to&gt;\\), \\(\\geq\\to&lt;\\).<br><span class=\"math\">Ensemble</span> : \\(a\\in E\\) (négation \\(a\\notin E\\)) ; \\(\\emptyset\\) = unique ensemble sans élément, \\(\\forall x, x\\notin\\emptyset\\).<br>Ensembles usuels emboîtés : \\(\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}\\subset\\mathbb{C}\\).",
  },
  {
    id: "connecteurs", title: "§I.2 — CONNECTEURS LOGIQUES",
    cours: "<span class=\"math\">Conjonction</span> \\(s \\text{ et } S\\) vraie ssi \\(s\\) et \\(S\\) vraies toutes les deux ; disjonction \\(s \\text{ ou } S\\) vraie ssi au moins une est vraie (ou inclusif).<br>Négation : \\(\\neg(s \\text{ ou } S) = \\neg s \\text{ et } \\neg S\\) ; \\(\\neg(s \\text{ et } S) = \\neg s \\text{ ou } \\neg S\\).<br><span class=\"math\">Implication</span> \\(s\\Rightarrow S\\) : fausse seulement si \\(s\\) vraie et \\(S\\) fausse ; si \\(S\\) est vraie, \\(s\\Rightarrow S\\) est automatiquement vraie (« du faux on déduit n'importe quoi »).<br>Négation de \\(s\\Rightarrow S\\) : \\(s \\text{ et } \\neg S\\). Réciproque de \\(s\\Rightarrow S\\) : \\(S\\Rightarrow s\\) (généralement pas équivalente à l'implication de départ).<br><span class=\"math\">Équivalence</span> \\(s\\Leftrightarrow S\\) vraie ssi \\(s\\Rightarrow S\\) et \\(S\\Rightarrow s\\) vraies toutes les deux ; se prouve aussi par une chaîne \\(s\\Leftrightarrow s_1\\Leftrightarrow\\cdots\\Leftrightarrow S\\).<br><span class=\"cours-crosslink\">↔ En code : ET/OU/NON se retrouvent tels quels en Python (<code>and</code>/<code>or</code>/<code>not</code>), voir <a href=\"python.html\">le chapitre Python, §3 — Conditions</a>.</span>",
  },
  {
    id: "quantificateurs", title: "§I.3 — QUANTIFICATEURS",
    cours: "<span class=\"math\">Quantificateur universel</span> \\(\\forall x\\in E, s(x)\\) vraie ssi \\(s(a)\\) vraie pour tout \\(a\\in E\\) (se lit « quel que soit »).<br><span class=\"math\">Quantificateur existentiel</span> \\(\\exists x\\in E, s(x)\\) vraie ssi au moins un \\(a\\in E\\) vérifie \\(s(a)\\) ; \\(\\exists! x\\) = existence et unicité.<br>Négation : \\(\\neg(\\forall x, s(x)) = \\exists x, \\neg s(x)\\) ; \\(\\neg(\\exists x, s(x)) = \\forall x, \\neg s(x)\\) (on échange les quantificateurs et on nie l'assertion finale).<br>La variable quantifiée est muette (renommable). L'ordre des quantificateurs compte : \\(\\forall m\\,\\exists x\\) n'est pas équivalent à \\(\\exists x\\,\\forall m\\) en général (le \\(x\\) peut dépendre de \\(m\\) dans le premier cas seulement).",
  },
  {
    id: "types-raisonnement", title: "§I.4 — TYPES DE RAISONNEMENT",
    cours: "<span class=\"math\">Raisonnement par l'absurde</span> : pour montrer \\(s\\), on suppose \\(\\neg s\\) vraie et on aboutit à une contradiction (une assertion \\(C\\) et \\(\\neg C\\) vraies simultanément) ; exemple classique : irrationalité de \\(\\sqrt{2}\\).<br><span class=\"math\">Raisonnement par contraposée</span> : pour montrer \\(s\\Rightarrow S\\), on montre l'assertion équivalente \\(\\neg S\\Rightarrow \\neg s\\) (utile quand la négation de la conclusion est plus maniable).<br>Disjonction de cas : on découpe l'hypothèse en plusieurs cas exhaustifs et on prouve la conclusion dans chacun. Contre-exemple : pour réfuter \\(\\forall x, s(x)\\), il suffit d'exhiber un \\(a\\) tel que \\(\\neg s(a)\\).<br>\\(S\\) est condition nécessaire pour \\(s\\) si \\(s\\Rightarrow S\\) ; condition suffisante si \\(S\\Rightarrow s\\) ; condition nécessaire et suffisante (CNS, « il faut et il suffit ») si \\(s\\Leftrightarrow S\\).<br><span class=\"math\">Analyse-synthèse</span> : pour montrer l'existence (et l'unicité) d'un objet, on suppose d'abord qu'il existe et on en déduit des contraintes (analyse), puis on vérifie que l'objet trouvé convient bien (synthèse).",
  },
  {
    id: "recurrence", title: "§I.5 — LA RÉCURRENCE",
    cours: "<span class=\"math\">Récurrence simple</span> pour montrer \\(\\forall n\\geq n_0, \\mathcal{P}(n)\\) : initialisation \\(\\mathcal{P}(n_0)\\) vraie ; hérédité \\(\\mathcal{P}(n)\\Rightarrow\\mathcal{P}(n+1)\\) pour \\(n\\geq n_0\\) quelconque.<br><span class=\"math\">Récurrence à deux pas</span> : initialisation sur \\(\\mathcal{P}(n_0)\\) ET \\(\\mathcal{P}(n_0+1)\\) ; hérédité \\(\\mathcal{P}(n)\\text{ et }\\mathcal{P}(n+1)\\Rightarrow\\mathcal{P}(n+2)\\) (utile pour les suites du type \\(u_{n+2}=u_{n+1}+u_n\\)).<br><span class=\"math\">Récurrence forte</span> : l'hérédité utilise TOUTES les valeurs \\(\\mathcal{P}(0),\\ldots,\\mathcal{P}(n)\\) pour prouver \\(\\mathcal{P}(n+1)\\), pas seulement le rang précédent.<br>Récurrence limitée : même principe restreint à une plage finie \\(n_0,\\ldots,N\\).<br>Erreur classique (paradoxe des crayons de couleur) : oublier de vérifier que l'hérédité est valable aussi pour les tout premiers rangs, pas seulement à partir d'un certain rang.<br><span class=\"cours-crosslink\">↔ En code : une récurrence qui construit \\(\\mathcal{P}(n+1)\\) à partir de \\(\\mathcal{P}(n)\\), c'est une boucle qui met à jour un accumulateur à chaque tour, voir <a href=\"python.html\">le chapitre Python, §4 — Boucle for</a>.</span>",
  },
  {
    id: "egalite-definir", title: "§II.1 — ÉGALITÉ ET DÉFINITION D'UN ENSEMBLE",
    cours: "<span class=\"math\">Égalité de deux ensembles</span> \\(A=B\\) \\(\\Leftrightarrow\\) double inclusion : tout élément de \\(A\\) est dans \\(B\\) ET tout élément de \\(B\\) est dans \\(A\\).<br>Pour prouver \\(A=B\\) : soit on montre les deux inclusions séparément (élément quelconque de \\(A\\) puis de \\(B\\)), soit on enchaîne une chaîne d'égalités \\(A=E_1=\\cdots=E_n=B\\).<br>Trois écritures d'un ensemble : en extension (liste, ex. \\(\\{1,3,5,7,9\\}\\)), en <span class=\"math\">compréhension</span> (\\(\\{x\\in E \\, ; \\, \\mathcal{P}(x)\\}\\), jamais de quantificateur avant le séparateur), par <span class=\"math\">paramètre</span> (\\(\\{\\varphi(t) \\, ; \\, t\\in E\\}\\)).<br>Équivalence fondamentale de la compréhension : \\(\\forall x\\in E, (x\\in F \\Leftrightarrow \\mathcal{P}(x))\\).",
  },
  {
    id: "inclusion", title: "§II.2 — INCLUSION ET ENSEMBLE DES PARTIES",
    cours: "<span class=\"math\">Inclusion</span> \\(A\\subseteq B\\) \\(\\Leftrightarrow\\) \\(\\forall x\\in A, x\\in B\\) ; négation \\(A\\not\\subseteq B \\Leftrightarrow \\exists x\\in A, x\\notin B\\). Inclusion stricte notée \\(A\\subsetneq B\\).<br>Propriétés : \\(\\emptyset\\subseteq E\\), \\(E\\subseteq E\\), transitivité (\\(E\\subseteq F\\) et \\(F\\subseteq G \\Rightarrow E\\subseteq G\\)) ; double inclusion \\(E\\subseteq F\\subseteq E \\Leftrightarrow E=F\\).<br>Si \\(A=\\{x\\in E;s(x)\\}\\) et \\(B=\\{x\\in E;S(x)\\}\\) alors \\(A\\subseteq B \\Leftrightarrow \\forall x\\in E, s(x)\\Rightarrow S(x)\\) (une inclusion se ramène à une implication).<br><span class=\"math\">Ensemble des parties</span> \\(\\mathcal{P}(E)\\) : \\(F\\subseteq E \\Leftrightarrow F\\in\\mathcal{P}(E)\\) ; toujours \\(\\emptyset, E\\in\\mathcal{P}(E)\\) ; si \\(E=\\emptyset\\) alors \\(\\mathcal{P}(E)=\\{\\emptyset\\}\\) (non vide !).",
  },
  {
    id: "operations-ensembles", title: "§II.3 — INTERSECTION, RÉUNION, DIFFÉRENCE",
    cours: "<span class=\"math\">Intersection</span> \\(A\\cap B=\\{x \\, ; \\, x\\in A \\text{ et } x\\in B\\}\\) (disjoints si \\(A\\cap B=\\emptyset\\)) ; réunion \\(A\\cup B=\\{x \\, ; \\, x\\in A \\text{ ou } x\\in B\\}\\).<br>Distributivités : \\(A\\cap(B\\cup C)=(A\\cap B)\\cup(A\\cap C)\\) et \\(A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)\\), démontrées par double inclusion.<br><span class=\"math\">Différence</span> \\(A\\setminus B=\\{x \\, ; \\, x\\in A \\text{ et } x\\notin B\\}\\) ; complémentaire de \\(A\\) dans \\(E\\) : \\(\\overline{A}=E\\setminus A\\), avec \\(A\\cap\\overline{A}=\\emptyset\\), \\(A\\cup\\overline{A}=E\\), \\(\\overline{\\overline{A}}=A\\).<br><span class=\"math\">Lois de De Morgan</span> : \\(\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}\\) ; \\(\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}\\).",
  },
  {
    id: "cardinal-produit", title: "§II.4 — PRODUIT CARTÉSIEN, CARDINAL",
    cours: "<span class=\"math\">Produit cartésien</span> \\(A\\times B=\\{(a,b) \\, ; \\, a\\in A, b\\in B\\}\\) ; couples égaux ssi coordonnées égales une à une ; en général \\(A\\times B\\neq B\\times A\\).<br><span class=\"math\">Cardinal</span> \\(|E|\\) = nombre d'éléments (\\(|\\emptyset|=0\\)) ; si \\(A\\subseteq E\\) fini et \\(|A|=|E|\\) alors \\(A=E\\).<br><span class=\"math\">Lemme des bergers</span> : si \\(E_1,\\ldots,E_n\\) sont finis deux à deux disjoints de réunion \\(E\\), alors \\(|E|=\\sum |E_i|\\).<br>Formules : \\(|A\\cup B|=|A|+|B|-|A\\cap B|\\) ; \\(|\\overline{A}|=|E|-|A|\\) ; \\(|E\\times F|=|E|\\times|F|\\) ; \\(|\\mathcal{P}(E)|=2^{|E|}\\).",
  },
  {
    id: "fonctions-def", title: "§III.1 — DÉFINITIONS, VOCABULAIRE",
    cours: "<span class=\"math\">Fonction</span> \\(f:E\\to F\\) : à chaque \\(a\\in E\\) on associe au plus un \\(b\\in F\\), noté \\(b=f(a)\\), l'image de \\(a\\) ; \\(a\\) est un antécédent de \\(b\\).<br><span class=\"math\">Application</span> = fonction où chaque \\(a\\in E\\) admet exactement une image (toute application est une fonction, pas l'inverse).<br><span class=\"math\">Ensemble de définition</span> \\(D_f=\\{x\\in E \\, ; \\, f(x) \\text{ existe}\\}\\) ; \\(f\\) est une application ssi \\(D_f=E\\).<br>Deux applications \\(f,g:E\\to F\\) sont égales ssi \\(\\forall a\\in E, f(a)=g(a)\\) ; ne pas confondre \\(f\\) (la fonction) et \\(f(x)\\) (un élément de \\(F\\)).",
  },
  {
    id: "fonctions-remarquables", title: "§III.2 — FONCTIONS REMARQUABLES",
    cours: "<span class=\"math\">Identité</span> \\(\\mathrm{Id}_E:E\\to E, x\\mapsto x\\) ; application constante : \\(\\exists C, \\forall x, f(x)=C\\) ; application nulle si \\(\\forall x, f(x)=0\\).<br>Fonctions usuelles : affine \\(f(x)=ax+b\\), polynomiale \\(f(x)=a_0+a_1x+\\cdots+a_nx^n\\), homographique \\(f(x)=\\frac{ax+b}{cx+d}\\), polynôme du second degré \\(ax^2+bx+c\\) (\\(a\\neq0\\)).<br><span class=\"math\">Paire</span> : \\(\\forall x, f(-x)=f(x)\\) (graphe symétrique par rapport à l'axe des ordonnées) ; <span class=\"math\">impaire</span> : \\(f(-x)=-f(x)\\) (graphe symétrique par rapport à l'origine).<br>Croissante : \\(a&lt;b\\Rightarrow f(a)\\leq f(b)\\) ; strictement croissante : \\(a&lt;b\\Rightarrow f(a)&lt;f(b)\\) ; monotone = croissante ou décroissante.",
  },
  {
    id: "composition", title: "§III.3 — COMPOSITION DES FONCTIONS",
    cours: "<span class=\"math\">Composée</span> \\(g\\circ f\\) : si \\(f:E\\to F\\), \\(g:G\\to H\\) avec \\(F\\subseteq G\\), alors \\((g\\circ f)(x)=g[f(x)]\\) ; \\(f\\) agit d'abord, puis \\(g\\) (ordre inverse de l'écriture).<br>En général \\(g\\circ f\\neq f\\circ g\\) (pas commutative) ; mais elle est <span class=\"math\">associative</span> : \\((h\\circ g)\\circ f = h\\circ(g\\circ f)\\), noté \\(h\\circ g\\circ f\\).<br>\\(f\\circ \\mathrm{Id}_E = \\mathrm{Id}_F\\circ f = f\\).<br><span class=\"math\">Composition itérée</span> \\(f^n = f\\circ\\cdots\\circ f\\) (n fois), \\(f^0=\\mathrm{Id}_E\\) ; \\(f^{n+p}=f^n\\circ f^p\\).",
  },
  {
    id: "restriction-prolongement", title: "§III.4 — RESTRICTION ET PROLONGEMENT",
    cours: "<span class=\"math\">Restriction au départ</span> \\(f|_A\\) : pour \\(A\\subseteq E\\), \\(g:A\\to F\\) définie par \\(g(x)=f(x)\\) sur \\(A\\) seulement ; \\(f\\) et \\(g\\) sont des applications distinctes (sauf \\(A=E\\)) et n'ont pas forcément les mêmes propriétés.<br><span class=\"math\">Restriction à l'arrivée</span> : si \\(\\forall x\\in E, f(x)\\in B\\), on peut restreindre l'arrivée à \\(B\\subseteq F\\).<br><span class=\"math\">Prolongement</span> \\(g\\) de \\(f:A\\to F\\) à \\(B\\supseteq A\\) : \\(g:B\\to G\\) telle que \\(\\forall a\\in A, g(a)=f(a)\\) (ex. le module ℂ→ℝ prolonge la valeur absolue ℝ→ℝ).",
  },
  {
    id: "injectivite", title: "§IV.1 — INJECTIVITÉ",
    cours: "<span class=\"math\">Injective</span> : \\(f:E\\to F\\) telle que \\(\\forall s,t\\in E, s\\neq t \\Rightarrow f(s)\\neq f(t)\\), soit, forme plus utile, \\(f(s)=f(t)\\Rightarrow s=t\\) : chaque élément de \\(F\\) admet au plus un antécédent.<br>Pour prouver l'injectivité : se donner \\(a,b\\in E\\) quelconques vérifiant \\(f(a)=f(b)\\), puis en déduire \\(a=b\\) (ne jamais partir de \\(a=b\\) pour montrer \\(f(a)=f(b)\\), c'est toujours vrai).<br>Pour réfuter l'injectivité : exhiber \\(a\\neq b\\) avec \\(f(a)=f(b)\\).<br>Interprétation graphique (fonctions réelles) : \\(f\\) injective ssi toute droite horizontale \\(y=m\\) coupe le graphe en au plus un point. Une fonction strictement monotone est toujours injective.",
  },
  {
    id: "surjectivite", title: "§IV.2 — SURJECTIVITÉ",
    cours: "<span class=\"math\">Surjective</span> : \\(f:E\\to F\\) telle que \\(\\forall m\\in F, \\exists s\\in E, f(s)=m\\) : chaque élément de l'arrivée admet au moins un antécédent.<br>Équivaut à : pour tout \\(m\\in F\\), l'équation \\(f(x)=m\\) admet au moins une solution \\(x\\in E\\).<br>Interprétation graphique : \\(f\\) surjective ssi toute droite horizontale \\(y=m\\) (\\(m\\in F\\)) coupe le graphe en au moins un point.<br>On parle d'une surjection DE E SUR F (pas « vers »).",
  },
  {
    id: "bijections", title: "§IV.3 — APPLICATIONS BIJECTIVES",
    cours: "<span class=\"math\">Bijective</span> : \\(f:E\\to F\\) injective ET surjective \\(\\Leftrightarrow\\) tout élément de \\(F\\) admet exactement un antécédent \\(\\Leftrightarrow\\) \\(\\forall m\\in F\\), \\(f(x)=m\\) a une unique solution.<br><span class=\"math\">Application réciproque</span> \\(f^{-1}:F\\to E\\) (si \\(f\\) bijective) : \\(f(x)=m \\Leftrightarrow f^{-1}(m)=x\\) ; le graphe de \\(f^{-1}\\) est le symétrique du graphe de \\(f\\) par rapport à la droite \\(y=x\\).<br>Propriétés : \\(f\\circ f^{-1}=\\mathrm{Id}_F\\), \\(f^{-1}\\circ f=\\mathrm{Id}_E\\), \\((f^{-1})^{-1}=f\\) ; \\(f\\) bijective \\(\\Leftrightarrow \\exists g, f\\circ g=\\mathrm{Id}_F \\text{ et } g\\circ f=\\mathrm{Id}_E\\) (alors \\(g=f^{-1}\\)).<br>Si \\(f:E\\to F\\) et \\(g:F\\to G\\) sont bijectives alors \\(g\\circ f\\) est bijective et \\((g\\circ f)^{-1}=f^{-1}\\circ g^{-1}\\) (on inverse ET on échange l'ordre).",
  },
  {
    id: "image-reciproque", title: "§V.1 — IMAGE RÉCIPROQUE",
    cours: "<span class=\"math\">Image réciproque</span> de \\(B\\subseteq F\\) par \\(f:E\\to F\\) (pas forcément bijective) : \\(f^{-1}(B)=\\{x\\in E \\, ; \\, f(x)\\in B\\}\\), l'ensemble de tous les antécédents des éléments de \\(B\\).<br>Équivalence clé : \\(a\\in f^{-1}(B) \\Leftrightarrow f(a)\\in B\\). On a toujours \\(f^{-1}(F)=E\\).<br>Attention : \\(f^{-1}(\\{m\\})\\) = tous les antécédents de \\(m\\) ; ne pas écrire \\(f^{-1}(m)\\) sauf si \\(f\\) est bijective.<br>Visualisation (fonction réelle) : \\(f^{-1}(B)\\) = abscisses des points du graphe dont l'ordonnée est dans \\(B\\).",
  },
  {
    id: "image-directe", title: "§V.2 — IMAGE DIRECTE",
    cours: "<span class=\"math\">Image directe</span> de \\(A\\subseteq E\\) par \\(f:E\\to F\\) : \\(f(A)=\\{f(a)\\in F \\, ; \\, a\\in A\\}\\), l'ensemble des images des éléments de \\(A\\).<br>Équivalence clé : \\(b\\in f(A) \\Leftrightarrow \\exists a\\in A, f(a)=b\\).<br>Cas particulier \\(A=E\\) : \\(f(E)=\\mathrm{Im}\\,f\\) ; \\(\\mathrm{Im}\\,f=F \\Leftrightarrow f\\) surjective.<br>Si \\(f\\) bijective, l'image directe de \\(B\\) par \\(f^{-1}\\) coïncide avec l'image réciproque de \\(B\\) par \\(f\\) (même notation \\(f^{-1}(B)\\), non ambiguë).",
  },
  {
    id: "relations-equivalence", title: "§VI.1 — RELATIONS D'ÉQUIVALENCE",
    cours: "<span class=\"math\">Relation binaire</span> R sur E : partie de E×E, notée xRy. Réflexive : ∀x, xRx ; symétrique : xRy⇒yRx ; transitive : xRy et yRz ⇒ xRz.<br><span class=\"math\">Relation d'équivalence</span> = réflexive + symétrique + transitive.<br>Exemples : l'égalité, xy&gt;0 sur ℝ* (même signe), la congruence modulo n ; la relation « définie par une application » aRb ⇔ f(a)=f(b) est toujours une relation d'équivalence sur E, quelle que soit f.<br>Contre-exemple classique : « être consécutifs » sur ℕ n'est ni réflexive ni transitive, donc pas une relation d'équivalence.",
  },
  {
    id: "classes-equivalence", title: "§VI.2 — CLASSES D'ÉQUIVALENCE, PARTITION",
    cours: "<span class=\"math\">Classe d'équivalence</span> de a modulo R : ā = {x∈E ; xRa}, jamais vide (a∈ā).<br>Équivalences fondamentales : aRb ⇔ a∈b̄ ⇔ b∈ā ⇔ ā=b̄ ; tout élément appartient à une unique classe.<br><span class=\"math\">Ensemble-quotient</span> E/R = ensemble de toutes les classes d'équivalence (un ensemble d'ensembles).<br><span class=\"math\">Partition</span> : parties non vides, deux à deux disjointes, de réunion E. Théorème : les classes d'équivalence d'une relation d'équivalence sur E forment toujours une partition de E.",
  },
];

initFiche({ STATE_KEY: CHAPTER_STATE_KEYS.logique, CHAPTER_ID: 'logique', EXERCISES, SECTIONS });
