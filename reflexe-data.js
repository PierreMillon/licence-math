/* ============================================================
   L1 MATHS — SYNTHÈSE — reflexe-data.js
   Pool d'exercices pour la page RÉFLEXE (reflexe.html), session de
   questions chronométrée centrée sur la VITESSE (demande explicite
   de Pierre, 21/10/2026, après son retour sur sa copie de contrôle
   d'ALGÈBRE : bonne compréhension mais trop lent — « remplir un
   contrôle comme on remplit son nom et prénom »).

   Contenu : une COPIE autonome d'exercices déjà présents dans les
   fiches de chapitre, PAS une référence live — même principe déjà
   établi par l1maths_mistakes/revision.js (voir menu.js/progression.js,
   commentaires sur EXERCISES) : chaque fiches/*.js déclare son propre
   `const EXERCISES` en haut de fichier, donc deux fiches ne peuvent
   JAMAIS être chargées sur la même page (collision de nom) — une page
   transverse comme celle-ci doit forcément travailler sur un
   instantané séparé plutôt que sur les données vivantes de plusieurs
   chapitres à la fois.

   Sélection : PAS tous les exercices actifs du site (ça existe déjà,
   c'est la fiche normale) — seulement les sections qui sont des
   MÉTHODES/RÉFLEXES d'application rapide, sourcées d'un vrai TD/
   corrigé/exercice de tableau (pas une question « connaître une
   définition du cours »), demande de Pierre prise au pied de la
   lettre (« qui viennent des TD ») :
   - CALCULUS §1 algébrique (TD1 Séance 1, 19 questions)
   - CALCULUS §2 trinome (TD_02 Séance 2, 11 questions)
   - ANALYSE §4 methodes-inequations (TD1/TD2/CC1, 8 questions)
   - ANALYSE §5 synthese-prelim (compilation combinée, 6 questions)
   - ALGÈBRE §7 polynomes (exercices de tableau en classe, 12 questions)
   - LOGIQUE §I.6 arithmetique (Euclide/Bézout/Gauss, 8 questions)
   Total : 64 questions. Les autres sections (cours/mémento/théorèmes
   à connaître, pas une méthode à appliquer vite) restent UNIQUEMENT
   sur leur fiche d'origine — ce n'est pas le même usage.

   Ce fichier est une COPIE : une correction de contenu faite sur
   l'exercice d'origine (fiches/*.js) ne se répercute pas ici
   automatiquement — à relire manuellement si un exercice source de
   cette liste est corrigé, même limite déjà acceptée pour
   l1maths_mistakes (voir menu.js).

   Chaque entrée garde son id/section d'origine (chapterId ajouté) —
   recordMistake/writeExerciseResult (menu.js/progression.js) s'en
   servent pour écrire le résultat dans la MÊME couche de state que si
   on avait répondu directement sur la fiche d'origine, donc une
   bonne réponse en mode réflexe compte aussi pour la fiche normale
   (cohérent avec revision.js, déjà établi). */
const REFLEX_EXERCISES = [
  {
    "id": "ex1",
    "section": "algebrique",
    "statement": "Pour additionner deux fractions \\(\\dfrac{a}{b} + \\dfrac{c}{d}\\), la première étape est de :",
    "options": [
      "Les mettre au même dénominateur",
      "Additionner les numérateurs et les dénominateurs séparément",
      "Multiplier les deux fractions entre elles"
    ],
    "correctIndex": 0,
    "explain": "On ne peut additionner des fractions que si elles ont le même dénominateur — on cherche le plus petit dénominateur commun, pas n’importe quel dénominateur commun, pour garder des calculs simples.",
    "wrongExplain": {
      "1": "On ne peut pas additionner numérateurs et dénominateurs séparément — cette « addition terme à terme » ne correspond à aucune opération mathématique valide sur les fractions.",
      "2": "Multiplier les fractions donnerait \\(\\dfrac{ac}{bd}\\), qui n’a rien à voir avec une somme — c’est la règle de la multiplication, pas de l’addition."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex2",
    "section": "algebrique",
    "statement": "\\(\\dfrac{a}{b} = \\dfrac{c}{d}\\) (avec \\(b,d \\neq 0\\)) équivaut à :",
    "options": [
      "\\(ad = bc\\)",
      "\\(a+d = b+c\\)",
      "\\(a = c\\) et \\(b = d\\)"
    ],
    "correctIndex": 0,
    "explain": "C’est le produit en croix : le produit des extrêmes (\\(a\\) et \\(d\\)) égale le produit des moyens (\\(b\\) et \\(c\\)).",
    "wrongExplain": {
      "1": "Une addition entre numérateurs et dénominateurs de fractions différentes n’a pas de sens — la seule opération valide ici est le produit en croix.",
      "2": "\\(1/2\\) et \\(2/4\\) sont égales sans avoir le même numérateur ni le même dénominateur : cette condition est bien trop restrictive."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex3",
    "section": "algebrique",
    "statement": "\\(\\dfrac{a/b}{c/d}\\) est égal à :",
    "options": [
      "\\(\\dfrac{a \\times d}{b \\times c}\\)",
      "\\(\\dfrac{a \\times c}{b \\times d}\\)",
      "\\(\\dfrac{a+d}{b+c}\\)"
    ],
    "correctIndex": 0,
    "explain": "Diviser par une fraction revient à multiplier par son inverse : on obtient le produit des plus éloignés (\\(a\\) et \\(d\\)) sur le produit des plus rapprochés (\\(b\\) et \\(c\\)).",
    "wrongExplain": {
      "1": "C’est la formule du PRODUIT de deux fractions \\(\\frac{a}{b}\\times\\frac{c}{d}\\), pas de leur quotient — ici on divise, donc on multiplie par l’inverse de la seconde fraction.",
      "2": "Additionner numérateurs et dénominateurs de fractions différentes n’a pas de sens mathématique."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex4",
    "section": "algebrique",
    "statement": "Pour \\(0 \\leq p \\leq n\\), le coefficient binomial \\(\\binom{n}{p}\\) vaut :",
    "options": [
      "\\(\\dfrac{n!}{p!(n-p)!}\\)",
      "\\(\\dfrac{n!}{p!}\\)",
      "\\(n! - p!\\)"
    ],
    "correctIndex": 0,
    "explain": "C’est la définition du coefficient binomial : la factorielle de \\(n\\), divisée par le produit des factorielles de \\(p\\) et de \\(n-p\\).",
    "wrongExplain": {
      "1": "Il manque le facteur \\((n-p)!\\) au dénominateur : cette expression compte les arrangements, pas les combinaisons.",
      "2": "Le coefficient binomial est un quotient de factorielles, pas une différence — cette expression n’a pas de lien avec la définition."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex5",
    "section": "algebrique",
    "statement": "Le coefficient binomial \\(\\binom{n}{p}\\) pour \\(p &gt; n\\) vaut :",
    "options": [
      "\\(0\\)",
      "\\(1\\)",
      "\\(n!\\)"
    ],
    "correctIndex": 0,
    "explain": "On ne peut pas choisir plus d’éléments \\(p\\) qu’il n’y en a \\(n\\) dans l’ensemble : par convention, le coefficient vaut \\(0\\).",
    "wrongExplain": {
      "1": "On confond peut-être avec \\(\\binom{n}{0}=1\\) (choisir 0 élément) — mais ici \\(p&gt;n\\), il est impossible de choisir plus d’éléments qu’il n’y en a, le résultat est \\(0\\), pas \\(1\\).",
      "2": "\\(n!\\) correspondrait plutôt à \\(\\binom{n}{n}\\) ou à un dénombrement complet, pas à un choix impossible."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex6",
    "section": "algebrique",
    "statement": "\\(a^m \\times a^n\\) est égal à :",
    "options": [
      "\\(a^{m+n}\\)",
      "\\(a^{m \\times n}\\)",
      "\\(a^{m-n}\\)"
    ],
    "correctIndex": 0,
    "explain": "Multiplier deux puissances de même base revient à additionner leurs exposants.",
    "wrongExplain": {
      "1": "C’est la règle de \\((a^m)^n\\) (puissance d’une puissance, on multiplie les exposants), pas celle du produit \\(a^m\\times a^n\\) (on les additionne).",
      "2": "C’est la règle du QUOTIENT \\(a^m/a^n\\) (on soustrait les exposants) — ici c’est un produit, donc une addition."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex7",
    "section": "algebrique",
    "statement": "\\((a^m)^n\\) est égal à :",
    "options": [
      "\\(a^{m \\times n}\\)",
      "\\(a^{m+n}\\)",
      "\\(a^{m^n}\\)"
    ],
    "correctIndex": 0,
    "explain": "Élever une puissance à une nouvelle puissance revient à multiplier les exposants entre eux.",
    "wrongExplain": {
      "1": "C’est la règle du PRODUIT \\(a^m\\times a^n\\) (on additionne les exposants), pas celle de la puissance d’une puissance (on les multiplie).",
      "2": "\\(a^{m^n}\\) correspondrait à une tour de puissances, une opération différente de \\((a^m)^n\\)."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex8",
    "section": "algebrique",
    "statement": "Pour \\(b \\neq 0\\), \\(\\left(\\dfrac{a}{b}\\right)^n\\) est égal à :",
    "options": [
      "\\(\\dfrac{a^n}{b^n}\\)",
      "\\(\\dfrac{a}{b^n}\\)",
      "\\(\\dfrac{a^n}{b}\\)"
    ],
    "correctIndex": 0,
    "explain": "La puissance d’un quotient est le quotient des puissances : chaque terme (numérateur et dénominateur) est élevé à la puissance \\(n\\) séparément.",
    "wrongExplain": {
      "1": "Le numérateur \\(a\\) doit aussi être élevé à la puissance \\(n\\) — ici seul le dénominateur l’est.",
      "2": "Le dénominateur \\(b\\) doit aussi être élevé à la puissance \\(n\\) — ici seul le numérateur l’est."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex9",
    "section": "algebrique",
    "statement": "Pour \\(a \\neq 0\\), \\(a^{-n}\\) est égal à :",
    "options": [
      "\\(\\dfrac{1}{a^n}\\)",
      "\\(-a^n\\)",
      "\\(\\dfrac{1}{-a^n}\\)"
    ],
    "correctIndex": 0,
    "explain": "Un exposant négatif signifie « inverse » : \\(a^{-n} = 1/a^n\\), ce n’est pas un nombre négatif — parfois plus pratique de garder des puissances négatives que de repasser en fractions.",
    "wrongExplain": {
      "1": "Un exposant négatif indique un INVERSE, pas un signe négatif devant le nombre : \\(a^{-n}\\) reste positif si \\(a\\) l’est.",
      "2": "Le signe négatif ne doit pas apparaître : \\(a^{-n}\\) est simplement l’inverse \\(1/a^n\\), sans signe moins."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex10",
    "section": "algebrique",
    "statement": "Pour \\(a \\neq 0\\), \\(a^0\\) vaut :",
    "options": [
      "\\(1\\)",
      "\\(0\\)",
      "\\(a\\)"
    ],
    "correctIndex": 0,
    "explain": "Par convention (cohérente avec \\(a^{n-n}=a^n/a^n=1\\)), tout nombre non nul à la puissance 0 vaut 1.",
    "wrongExplain": {
      "1": "\\(a^0\\) ne vaut jamais \\(0\\) (pour \\(a\\neq0\\)) — c’est \\(0^n\\) (avec \\(n&gt;0\\)) qui vaut \\(0\\), pas l’inverse.",
      "2": "C’est \\(a^1\\) qui vaut \\(a\\) — l’exposant \\(0\\) « annule » toute la puissance, il ne la laisse pas inchangée."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex11",
    "section": "algebrique",
    "statement": "Pour \\(x \\geq 0\\), la racine carrée \\(\\sqrt{x}\\) désigne, par définition :",
    "options": [
      "L’unique nombre positif ou nul dont le carré vaut \\(x\\)",
      "N’importe quel nombre dont le carré vaut \\(x\\)",
      "Un nombre de même signe que \\(x\\)"
    ],
    "correctIndex": 0,
    "explain": "Même quand un nombre négatif a aussi un carré égal à \\(x\\) (ex : \\((-3)^2=9\\)), le symbole \\(\\sqrt{\\ }\\) désigne toujours la racine positive.",
    "wrongExplain": {
      "1": "Même si \\(-\\sqrt{x}\\) a aussi pour carré \\(x\\), le symbole \\(\\sqrt{\\ }\\) désigne PAR CONVENTION uniquement la racine positive — pas « n’importe quel » nombre qui convient.",
      "2": "Ici \\(x\\geq0\\) : cette affirmation n’apporte aucune information puisque \\(\\sqrt{x}\\) est de toute façon toujours positif ou nul."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex12",
    "section": "algebrique",
    "statement": "\\(\\sqrt{x^2}\\) est égal à :",
    "options": [
      "\\(|x|\\)",
      "\\(x\\)",
      "\\(x^2\\)"
    ],
    "correctIndex": 0,
    "explain": "La racine carrée est toujours positive ; si \\(x&lt;0\\), \\(\\sqrt{x^2}=-x=|x|\\), pas \\(x\\) — cas particulier de la règle précédente.",
    "wrongExplain": {
      "1": "Faux si \\(x&lt;0\\) : par exemple \\(\\sqrt{(-3)^2}=\\sqrt{9}=3\\), pas \\(-3\\) — la racine carrée ne peut jamais rendre un résultat négatif.",
      "2": "Cela reviendrait à ne pas appliquer la racine carrée du tout : \\(\\sqrt{x^2}\\) n’est pas \\(x^2\\), sauf cas particulier."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex13",
    "section": "algebrique",
    "statement": "Pour \\(a, b \\geq 0\\), \\(\\sqrt{ab}\\) est égal à :",
    "options": [
      "\\(\\sqrt{a} \\times \\sqrt{b}\\)",
      "\\(\\sqrt{a} + \\sqrt{b}\\)",
      "\\(\\sqrt{a+b}\\)"
    ],
    "correctIndex": 0,
    "explain": "La racine d’un produit est le produit des racines — attention, ce n’est PAS vrai pour une somme : \\(\\sqrt{a+b} \\neq \\sqrt{a}+\\sqrt{b}\\) en général.",
    "wrongExplain": {
      "1": "C’est l’erreur classique : la racine d’un PRODUIT se distribue, mais la racine d’une SOMME ne se distribue pas de cette façon — \\(\\sqrt{a}+\\sqrt{b}\\neq\\sqrt{ab}\\) en général.",
      "2": "\\(\\sqrt{a+b}\\) est la racine d’une somme, une expression différente de \\(\\sqrt{ab}\\) (racine d’un produit) — les deux ne coïncident pas en général."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex14",
    "section": "algebrique",
    "statement": "Pour rendre rationnel un dénominateur de la forme \\(\\sqrt{a} + \\sqrt{b}\\), on multiplie numérateur et dénominateur par :",
    "options": [
      "Sa quantité conjuguée \\(\\sqrt{a} - \\sqrt{b}\\)",
      "\\(\\sqrt{a} + \\sqrt{b}\\) lui-même",
      "\\(\\sqrt{a \\times b}\\)"
    ],
    "correctIndex": 0,
    "explain": "En multipliant par la quantité conjuguée, on utilise l’identité \\((x+y)(x-y)=x^2-y^2\\) : les racines disparaissent du dénominateur, qui devient \\(a-b\\).",
    "wrongExplain": {
      "1": "Multiplier par lui-même donne \\((\\sqrt a+\\sqrt b)^2=a+b+2\\sqrt{ab}\\) : la racine ne disparaît pas, elle reste sous un terme croisé.",
      "2": "\\(\\sqrt{ab}\\) ne fait pas intervenir l’identité \\((x+y)(x-y)=x^2-y^2\\) qui élimine les racines — ce produit ne rationalise rien."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex15",
    "section": "algebrique",
    "statement": "Pour rationaliser \\(\\dfrac{1}{\\sqrt{5}+\\sqrt{3}}\\), on multiplie par sa quantité conjuguée. Le nouveau dénominateur, sans racine, est alors :",
    "options": [
      "\\(5 - 3 = 2\\)",
      "\\(\\sqrt{5} - \\sqrt{3}\\)",
      "\\(5 + 3 = 8\\)"
    ],
    "correctIndex": 0,
    "explain": "\\((\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3}) = (\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2\\) — cas particulier de la règle précédente, avec \\(a=5\\) et \\(b=3\\).",
    "wrongExplain": {
      "1": "C’est la quantité conjuguée elle-même (encore avec des racines), pas le résultat du produit — après multiplication, les racines doivent disparaître.",
      "2": "Erreur de signe : \\((\\sqrt5+\\sqrt3)(\\sqrt5-\\sqrt3)=(\\sqrt5)^2-(\\sqrt3)^2\\), c’est une SOUSTRACTION (\\(5-3\\)), pas une addition."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex16",
    "section": "algebrique",
    "statement": "Si on calcule \\(A^2\\) et qu’on trouve un résultat positif, peut-on en déduire que \\(A\\) est positif ?",
    "options": [
      "Non, il faut déterminer le signe de \\(A\\) séparément",
      "Oui, toujours",
      "Oui, seulement si \\(A\\) contient une racine carrée"
    ],
    "correctIndex": 0,
    "explain": "\\(A^2\\) est positif que \\(A\\) le soit ou non (ex : \\((-3)^2=9\\)) — pour retrouver \\(A\\) à partir de \\(A^2\\), il faut d’abord déterminer son signe autrement, puis écrire \\(A=\\sqrt{A^2}\\) ou \\(A=-\\sqrt{A^2}\\) selon le cas. Piège classique (TD Exercice 14 : « Attention, piège ! »).",
    "wrongExplain": {
      "1": "C’est le piège classique (TD Exercice 14) : \\((-3)^2=9\\) est positif alors que \\(-3\\) est négatif — un carré positif ne dit rien sur le signe du nombre de départ.",
      "2": "Le problème de signe existe pour N’IMPORTE QUEL \\(A\\) (avec ou sans racine) : dès qu’on élève au carré, l’information de signe est perdue."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex17",
    "section": "algebrique",
    "statement": "Pour \\(x \\geq 0\\) et \\(n\\) entier naturel non nul, \\(x^{1/n}\\) désigne :",
    "options": [
      "La racine \\(n\\)-ième de \\(x\\)",
      "\\(x\\) divisé par \\(n\\)",
      "\\(x\\) multiplié par \\(1/n\\)"
    ],
    "correctIndex": 0,
    "explain": "L’exposant fractionnaire \\(1/n\\) est une autre écriture de la racine \\(n\\)-ième : \\(x^{1/n} = \\sqrt[n]{x}\\). En particulier \\(x^{1/2} = \\sqrt{x}\\).",
    "wrongExplain": {
      "1": "On confond ici l’exposant \\(1/n\\) avec une DIVISION de \\(x\\) par \\(n\\) — l’exposant fractionnaire n’est pas une opération sur \\(x\\), c’est une écriture de la racine \\(n\\)-ième.",
      "2": "Même erreur que l’option précédente : \\(1/n\\) en exposant n’est pas un facteur multiplicatif appliqué à \\(x\\), mais une notation pour la racine \\(n\\)-ième."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex18",
    "section": "algebrique",
    "statement": "\\(8^{1/3}\\) est égal à :",
    "options": [
      "\\(2\\)",
      "\\(8/3\\)",
      "\\(\\dfrac{1}{8^3}\\)"
    ],
    "correctIndex": 0,
    "explain": "\\(8^{1/3}\\) est la racine cubique de 8, le nombre dont le cube vaut 8 : \\(2^3=8\\), donc \\(8^{1/3}=2\\) — cas particulier de la règle précédente.",
    "wrongExplain": {
      "1": "Confusion entre l’exposant \\(1/3\\) et une division de 8 par 3 : \\(8^{1/3}\\) est la racine cubique de 8, pas \\(8\\) divisé par \\(3\\).",
      "2": "C’est la formule d’un exposant NÉGATIF (\\(8^{-3}=1/8^3\\)), pas d’un exposant fractionnaire positif comme \\(1/3\\)."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex19",
    "section": "algebrique",
    "statement": "Les règles habituelles sur les puissances (produit, quotient, puissance d’une puissance) s’appliquent-elles aux exposants fractionnaires ?",
    "options": [
      "Oui, exactement les mêmes règles",
      "Non, elles ne marchent que pour les exposants entiers",
      "Seulement pour les exposants négatifs"
    ],
    "correctIndex": 0,
    "explain": "\\(x^{p/n}\\) se manipule avec les mêmes règles que les puissances entières (\\(x^a x^b = x^{a+b}\\), \\((x^a)^b=x^{ab}\\), etc.) — c’est justement l’intérêt de cette écriture plutôt que celle avec des racines, notamment pour simplifier des racines \\(n\\)-ièmes en factorisant en nombres premiers.",
    "wrongExplain": {
      "1": "C’est justement l’intérêt de l’écriture en exposant : les mêmes règles (produit, quotient, puissance d’une puissance) restent valables pour un exposant fractionnaire — pas besoin de règles différentes.",
      "2": "Rien ne restreint ces règles aux exposants négatifs : elles s’appliquent à tout exposant, entier, négatif OU fractionnaire."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex20",
    "section": "trinome",
    "statement": "Si \\(\\Delta &lt; 0\\), l’équation \\(ax^2+bx+c=0\\) admet, dans \\(\\mathbb{R}\\) :",
    "options": [
      "Aucune solution",
      "Une solution",
      "Deux solutions"
    ],
    "correctIndex": 0,
    "explain": "La forme canonique fait apparaître \\(\\left(x+\\frac{b}{2a}\\right)^2 = \\frac{\\Delta}{4a^2}\\) ; si \\(\\Delta&lt;0\\), le membre de droite est négatif, impossible pour un carré réel.",
    "wrongExplain": {
      "1": "Une solution unique correspond à \\(\\Delta=0\\) (racine double), pas à \\(\\Delta&lt;0\\).",
      "2": "Deux solutions correspondent à \\(\\Delta&gt;0\\), pas à \\(\\Delta&lt;0\\) — ici le carré du membre de droite serait négatif, ce qui est impossible."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex21",
    "section": "trinome",
    "statement": "\\(x\\) et \\(y\\) ont pour somme \\(S\\) et produit \\(P\\) si et seulement s’ils sont racines de :",
    "options": [
      "\\(X^2 - SX + P = 0\\)",
      "\\(X^2 + SX - P = 0\\)",
      "\\(X^2 - PX + S = 0\\)"
    ],
    "correctIndex": 0,
    "explain": "\\((X-x)(X-y) = X^2-(x+y)X+xy = X^2-SX+P\\).",
    "wrongExplain": {
      "1": "Erreur de signe des deux côtés : en développant \\((X-x)(X-y)\\), on obtient \\(-SX\\) (pas \\(+SX\\)) et \\(+P\\) (pas \\(-P\\)).",
      "2": "La somme \\(S\\) et le produit \\(P\\) sont inversés : c’est \\(-SX\\) (la somme) et \\(+P\\) (le produit), pas l’inverse."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex44",
    "section": "trinome",
    "statement": "Si \\(z\\) est un nombre RÉEL, alors \\(z^2\\) est toujours :",
    "options": [
      "Positif ou nul",
      "Négatif ou nul",
      "Non nul"
    ],
    "correctIndex": 0,
    "explain": "Vrai pour un réel — mais FAUX pour un nombre complexe, où un carré peut être négatif (ex. \\(i^2=-1\\)).",
    "wrongExplain": {
      "1": "C’est l’inverse : le carré d’un réel est toujours POSITIF ou nul, jamais négatif (sauf en dehors de \\(\\mathbb{R}\\), pour les nombres complexes).",
      "2": "\\(z^2\\) PEUT être nul, quand \\(z=0\\) — cette option exclut à tort ce cas."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex45",
    "section": "trinome",
    "statement": "Pour \\(x, y \\in \\mathbb{R}\\), l’équation \\(x^2 = y^2\\) équivaut à :",
    "options": [
      "\\(x=y\\) ou \\(x=-y\\)",
      "\\(x=y\\) uniquement",
      "\\(x=|y|\\)"
    ],
    "correctIndex": 0,
    "explain": "Piège classique : \\(x^2=y^2\\) ne signifie PAS \\(x=y\\) — il ne faut jamais oublier la solution opposée.",
    "wrongExplain": {
      "1": "C’est le piège classique de cet exercice : oublier la solution opposée. Par exemple \\(x=-3\\) et \\(y=3\\) vérifient bien \\(x^2=y^2\\) sans que \\(x=y\\).",
      "2": "Cette écriture impose à tort que \\(x\\) soit positif ou nul — alors que \\(x\\) peut très bien être négatif (ex. \\(x=-y\\)) tout en vérifiant \\(x^2=y^2\\)."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex46",
    "section": "trinome",
    "statement": "Pour résoudre \\((x-1)^4=(x^2-4x+1)^2\\), la première étape consiste à utiliser :",
    "options": [
      "\\(A^2=B^2 \\Leftrightarrow A=B\\) ou \\(A=-B\\)",
      "Le développement direct des deux puissances 4",
      "Une division des deux membres par \\((x-1)^2\\)"
    ],
    "correctIndex": 0,
    "explain": "En posant \\(A=(x-1)^2\\) et \\(B=x^2-4x+1\\), l’équation \\(A^2=B^2\\) se ramène à deux équations plus simples, \\(A=B\\) et \\(A=-B\\), sans jamais développer la puissance 4.",
    "wrongExplain": {
      "1": "Développer directement des puissances 4 mène à un calcul très long et source d’erreurs — reconnaître la forme \\(A^2=B^2\\) permet de l’éviter complètement.",
      "2": "Diviser par \\((x-1)^2\\) est risqué : si \\((x-1)^2=0\\) est justement une solution, la division l’élimine à tort de l’ensemble des solutions."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex47",
    "section": "trinome",
    "statement": "Avant de calculer le discriminant d’une équation comme \\(2x^2+5x=0\\) (terme constant nul), il vaut mieux :",
    "options": [
      "Factoriser par \\(x\\) directement",
      "Calculer \\(\\Delta\\) normalement",
      "Diviser les deux membres par \\(x\\)"
    ],
    "correctIndex": 0,
    "explain": "Diviser par \\(x\\) est dangereux (on perd la solution \\(x=0\\)) ; factoriser par \\(x\\) donne immédiatement \\(x(2x+5)=0\\), donc \\(x=0\\) ou \\(x=-5/2\\), sans discriminant.",
    "wrongExplain": {
      "1": "Ce n’est pas faux en soi, mais c’est un détour inutile : factoriser par \\(x\\) donne directement les solutions, sans avoir besoin de calculer \\(\\Delta\\) du tout.",
      "2": "Piège classique : diviser par \\(x\\) suppose implicitement que \\(x\\neq0\\), et fait donc disparaître la solution \\(x=0\\) — il ne faut jamais diviser par une expression qui peut s’annuler."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex48",
    "section": "trinome",
    "statement": "Pour un polynôme à coefficients entiers, il est utile de toujours tester en premier si :",
    "options": [
      "\\(1\\) ou \\(-1\\) sont racines",
      "\\(0\\) est racine",
      "Le polynôme est pair"
    ],
    "correctIndex": 0,
    "explain": "Remplacer \\(x\\) par \\(1\\) ou \\(-1\\) est le calcul le plus rapide possible — souvent une racine évidente qui permet de factoriser le polynôme et de baisser son degré.",
    "wrongExplain": {
      "1": "Tester \\(0\\) ne renseigne que sur le terme constant (racine évidente seulement si ce terme est nul) — \\(1\\) et \\(-1\\) sont des tests plus généralement utiles.",
      "2": "La parité du polynôme ne donne aucune information directe sur ses racines — ce n’est pas un test de racine évidente."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex49",
    "section": "trinome",
    "statement": "Un nombre \\(x_1\\) est racine d’un polynôme \\(P\\) si et seulement si :",
    "options": [
      "\\(P(x_1) = 0\\)",
      "\\(P'(x_1) = 0\\)",
      "\\(P(x_1) = x_1\\)"
    ],
    "correctIndex": 0,
    "explain": "C’est la définition même d’une racine : le polynôme s’annule en ce point.",
    "wrongExplain": {
      "1": "C’est la condition pour un POINT CRITIQUE (extremum) de \\(P\\), pas pour une racine — une racine annule \\(P\\), pas sa dérivée.",
      "2": "C’est la condition pour un POINT FIXE de \\(P\\) (où la courbe croise la droite \\(y=x\\)), pas pour une racine."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex50",
    "section": "trinome",
    "statement": "Mettre un trinôme \\(ax^2+bx+c\\) sous forme CANONIQUE consiste à l’écrire sous la forme :",
    "options": [
      "\\(a(x-\\alpha)^2 + \\beta\\)",
      "\\(a(x-x_1)(x-x_2)\\)",
      "\\(ax^2+bx+c\\)"
    ],
    "correctIndex": 0,
    "explain": "À ne pas confondre avec la forme FACTORISÉE (\\(a(x-x_1)(x-x_2)\\), qui suppose des racines réelles) : la forme canonique fait apparaître un carré parfait, elle existe toujours et permet de lire directement le sommet de la parabole.",
    "wrongExplain": {
      "1": "C’est la forme FACTORISÉE (qui suppose des racines réelles), pas la forme canonique — la forme canonique fait apparaître un carré parfait \\((x-\\alpha)^2\\), pas un produit de deux facteurs.",
      "2": "C’est la forme développée de départ, celle qu’on cherche justement à transformer — la forme canonique fait apparaître un carré parfait \\((x-\\alpha)^2+\\beta\\)."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex51",
    "section": "trinome",
    "statement": "Pour calculer \\(\\Delta=(2(3m+1))^2-4(m+3)^2\\), reconnaître l’identité \\(A^2-B^2=(A-B)(A+B)\\) permet de :",
    "options": [
      "Factoriser \\(\\Delta\\) directement sans le développer",
      "Résoudre l’équation sans jamais calculer \\(\\Delta\\)",
      "Éviter tout calcul de discriminant"
    ],
    "correctIndex": 0,
    "explain": "Ici \\(A=2(3m+1)\\) et \\(B=2(m+3)\\) : reconnaître cette forme évite un développement long et donne directement \\(\\Delta\\) factorisé, pratique pour trouver quand il s’annule (ex. TD Exercice 11, racine double).",
    "wrongExplain": {
      "1": "On calcule quand même \\(\\Delta\\), juste sous une forme déjà factorisée — l’identité ne permet pas de s’en passer complètement, seulement d’éviter un développement long.",
      "2": "Le discriminant est toujours calculé — reconnaître \\(A^2-B^2\\) évite seulement un développement fastidieux, ça ne supprime pas le calcul de \\(\\Delta\\) lui-même."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex22",
    "section": "trinome",
    "statement": "La forme factorisée d’un trinôme ayant deux racines réelles \\(x_1, x_2\\) est :",
    "options": [
      "\\(a(x-x_1)(x-x_2)\\)",
      "\\(a(x+x_1)(x+x_2)\\)",
      "\\((x-x_1)(x-x_2)\\)"
    ],
    "correctIndex": 0,
    "explain": "Le coefficient dominant \\(a\\) doit rester devant le produit des deux facteurs, sinon le développement ne redonne pas le bon trinôme.",
    "wrongExplain": {
      "1": "Erreur de signe : ce sont \\(-x_1\\) et \\(-x_2\\) qu’il faut, pas \\(+x_1\\) et \\(+x_2\\) — cette version donnerait, en développant, les racines opposées.",
      "2": "Il manque le coefficient dominant \\(a\\) devant le produit : sans lui, le développement ne redonne pas le bon trinôme (sauf si \\(a=1\\))."
    },
    "chapterId": "calculus"
  },
  {
    "id": "ex71",
    "section": "methodes-inequations",
    "statement": "Pour résoudre \\(x^2-3x+1\\geq0\\), la méthode standard (TD) consiste à :",
    "options": [
      "Calculer \\(\\Delta\\), trouver les racines, puis étudier le signe du trinôme via le signe de \\(a\\) à l’extérieur/l’intérieur des racines",
      "Isoler \\(x\\) d’un côté de l’inégalité comme pour une équation affine",
      "Remplacer \\(x\\) par \\(0\\) pour deviner le signe général"
    ],
    "correctIndex": 0,
    "explain": "Un trinôme du second degré se signe grâce à ses racines (quand \\(\\Delta&gt;0\\)) : signe de \\(a\\) à l’extérieur des racines, signe opposé entre les racines.",
    "wrongExplain": {
      "1": "« Isoler \\(x\\) » ne fonctionne que pour des inégalités AFFINES (degré 1) — dès qu’il y a un \\(x^2\\), cette méthode ne s’applique plus directement.",
      "2": "Remplacer par une seule valeur ne donne le signe qu’EN CE POINT, pas sur tout \\(\\mathbb{R}\\) — un trinôme change de signe aux racines."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex72",
    "section": "methodes-inequations",
    "statement": "Pour résoudre \\(\\dfrac{2}{x^2-4x+3}&gt;1\\) (TD), la bonne méthode est de :",
    "options": [
      "Tout ramener d’un côté et étudier le signe de \\(\\dfrac{2-(x^2-4x+3)}{x^2-4x+3}\\)",
      "Multiplier directement les deux membres par \\(x^2-4x+3\\)",
      "Multiplier en croix comme pour une égalité de fractions"
    ],
    "correctIndex": 0,
    "explain": "Le dénominateur \\(x^2-4x+3\\) change de signe selon \\(x\\) : il faut ramener l’inégalité à une comparaison avec 0 et faire un tableau de signes, jamais multiplier par une expression de signe inconnu.",
    "wrongExplain": {
      "1": "Multiplier par une expression dont le signe est INCONNU (ici \\(x^2-4x+3\\), qui change de signe) peut inverser l’inégalité sans qu’on le sache — c’est une erreur classique à éviter.",
      "2": "Le produit en croix n’est valable que pour une ÉGALITÉ de fractions, ou une inégalité avec des dénominateurs de signe connu et positif — pas ici."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex73",
    "section": "methodes-inequations",
    "statement": "Pour résoudre \\(\\sqrt{x^2-1}&lt;2-x\\) (TD), avant d’élever au carré, il faut d’abord vérifier que :",
    "options": [
      "Le membre de droite \\(2-x\\) est positif (sinon l’inégalité n’a aucune solution, une racine carrée étant toujours \\(\\geq0\\))",
      "Le membre de gauche est positif",
      "\\(x\\) est un entier"
    ],
    "correctIndex": 0,
    "explain": "Une racine carrée est toujours \\(\\geq0\\) : si \\(2-x&lt;0\\), l’inégalité \\(\\sqrt{\\cdots}&lt;2-x\\) est automatiquement fausse. Ce n’est qu’après avoir vérifié \\(2-x&gt;0\\) qu’on peut élever au carré en toute sécurité (les deux membres étant alors positifs).",
    "wrongExplain": {
      "1": "Le membre de gauche \\(\\sqrt{x^2-1}\\) est TOUJOURS positif ou nul par définition de la racine carrée — ce n’est pas lui qu’il faut vérifier, c’est le membre de droite.",
      "2": "Rien n’impose que \\(x\\) soit entier dans cette inéquation — la condition à vérifier porte sur le SIGNE du second membre, pas sur la nature de \\(x\\)."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex74",
    "section": "methodes-inequations",
    "statement": "Pour l’inéquation \\((E)\\) : \\(|x^2-4|-|3x|&lt;0\\), pourquoi peut-on affirmer que \\(x\\) est solution si et seulement si \\(-x\\) l’est aussi ?",
    "options": [
      "Parce que \\(|(-x)^2-4|=|x^2-4|\\) et \\(|3(-x)|=|3x|\\) : l’expression ne change pas en remplaçant \\(x\\) par \\(-x\\)",
      "Parce que toute inéquation a une solution symétrique par définition",
      "Parce que \\(x^2-4\\) et \\(3x\\) sont tous deux positifs"
    ],
    "correctIndex": 0,
    "explain": "\\((-x)^2=x^2\\) et \\(|-3x|=|3x|\\) : les deux termes de l’inéquation sont des fonctions PAIRES de \\(x\\), donc toute l’expression l’est aussi — son ensemble de solutions est symétrique par rapport à 0.",
    "wrongExplain": {
      "1": "Ce n’est pas une propriété générale de toutes les inéquations — ici, la symétrie vient spécifiquement de la parité des deux termes en valeur absolue, pas d’un principe universel.",
      "2": "\\(3x\\) change de signe selon le signe de \\(x\\) (ce n’est pas toujours positif) — c’est justement la valeur absolue \\(|3x|\\) qui est toujours positive, pas \\(3x\\) lui-même."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex75",
    "section": "methodes-inequations",
    "statement": "Si \\(-3\\leq x\\leq4\\) et \\(-5\\leq y\\leq2\\), pour encadrer \\(x^2-y^2\\) il faut d’abord encadrer \\(-y^2\\), ce qui demande de :",
    "options": [
      "Encadrer \\(y^2\\) d’abord (ici \\(0\\leq y^2\\leq25\\)), PUIS inverser les bornes en changeant de signe pour \\(-y^2\\)",
      "Changer juste le signe de l’encadrement de \\(y\\) directement",
      "Ignorer le signe, \\(-y^2\\) a le même encadrement que \\(y^2\\)"
    ],
    "correctIndex": 0,
    "explain": "Passer à l’opposé INVERSE l’ordre des bornes (le signe « retourne » l’inégalité) : de \\(0\\leq y^2\\leq25\\) on déduit \\(-25\\leq-y^2\\leq0\\), pas l’inverse — un piège si on va trop vite.",
    "wrongExplain": {
      "1": "On ne peut pas passer directement de l’encadrement de \\(y\\) à celui de \\(-y^2\\) sans passer par \\(y^2\\) d’abord — l’opération \\(y\\mapsto-y^2\\) n’est pas monotone sur \\([-5,2]\\) tout entier (il faut élever au carré séparément).",
      "2": "Prendre l’opposé change bien le signe ET inverse l’ordre des bornes — \\(-y^2\\) n’a pas le même encadrement que \\(y^2\\), ce serait ignorer l’effet du signe moins."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex76",
    "section": "methodes-inequations",
    "statement": "Pour encadrer \\(\\dfrac{2x+3y}{x+y}\\) avec \\(x,y&gt;0\\) (TD), la technique consiste à réécrire l’expression sous la forme :",
    "options": [
      "\\(2+\\dfrac{y}{x+y}\\), où le second terme est toujours strictement entre 0 et 1",
      "\\(\\dfrac{2x}{x+y}+\\dfrac{3y}{x+y}\\) sans aller plus loin",
      "Une constante unique, l’expression ne dépend pas de \\(x,y\\)"
    ],
    "correctIndex": 0,
    "explain": "Réécrire en « constante + reste compris entre 0 et 1 » est une technique puissante : ici \\(\\frac{2x+3y}{x+y}=\\frac{2(x+y)+y}{x+y}=2+\\frac{y}{x+y}\\), et \\(0&lt;\\frac{y}{x+y}&lt;1\\) car \\(0&lt;y&lt;x+y\\) (\\(x,y&gt;0\\)).",
    "wrongExplain": {
      "1": "Cette décomposition est correcte mais inachevée : il faut continuer à simplifier (regrouper) pour obtenir une forme « constante + terme borné entre 0 et 1 » exploitable, sinon l’encadrement n’est pas direct.",
      "2": "L’expression dépend bien de \\(x\\) et \\(y\\) (ex. elle vaut \\(2.5\\) si \\(x=y\\), mais tend vers \\(2\\) si \\(y\\ll x\\)) — ce n’est pas une constante fixe."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex77",
    "section": "methodes-inequations",
    "statement": "La fonction \\(t\\mapsto 1/t\\) est strictement décroissante sur \\(\\mathbb{R}_-^*\\) et sur \\(\\mathbb{R}_+^*\\) séparément. Peut-on en déduire qu’elle est décroissante sur \\(\\mathbb{R}^*\\) tout entier ?",
    "options": [
      "Non : on peut avoir \\(a&lt;0&lt;b\\) avec \\(1/a&lt;0&lt;1/b\\), ce qui n’a rien de décroissant globalement",
      "Oui, la décroissance sur chaque morceau implique la décroissance globale",
      "Oui, car \\(\\mathbb{R}^*\\) est un intervalle"
    ],
    "correctIndex": 0,
    "explain": "Exemple du TD : \\(a=-1,b=1\\) donnent \\(a&lt;b\\) mais \\(1/a=-1&lt;1=1/b\\) (pas \\(1/a&gt;1/b\\)) — la monotonie « par morceaux » ne se recolle pas quand l’ensemble de départ n’est pas un intervalle.",
    "wrongExplain": {
      "1": "La décroissance sur CHAQUE intervalle séparé ne garantit rien sur le comportement GLOBAL quand on compare un élément de chaque morceau — c’est exactement le piège illustré par le contre-exemple \\(a&lt;0&lt;b\\).",
      "2": "\\(\\mathbb{R}^*=\\mathbb{R}\\setminus\\{0\\}\\) n’est PAS un intervalle (il « saute » 0) — c’est précisément pour cette raison que la règle de composition par une fonction monotone ne s’applique pas directement dessus."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex78",
    "section": "methodes-inequations",
    "statement": "Pour calculer \\(\\lim_{x\\to+\\infty} x\\cdot5^{1-x}\\) (en écrivant \\(5^{1-x}=e^{(1-x)\\ln5}\\)), le changement de variable \\(X=x\\ln5\\) permet de :",
    "options": [
      "Se ramener à une forme connue de croissance comparée (puissance de \\(X\\) fois exponentielle décroissante en \\(X\\)), déjà traitée dans le cours",
      "Transformer l’exponentielle en polynôme",
      "Éviter tout calcul de limite"
    ],
    "correctIndex": 0,
    "explain": "Après le changement de variable, l’expression se réécrit avec une exponentielle décroissante multipliée par une puissance de \\(X\\) — exactement la forme \\(X^ne^{-X}\\to0\\) du théorème de croissance comparée, déjà connue.",
    "wrongExplain": {
      "1": "Un changement de variable ne transforme jamais une exponentielle en polynôme — ce sont des natures de fonctions fondamentalement différentes, aucune substitution ne change cela.",
      "2": "Le changement de variable sert justement à calculer la limite en la ramenant à un résultat connu — il ne permet pas d’éviter le calcul, il le simplifie."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex79",
    "section": "synthese-prelim",
    "statement": "Soit \\(x&gt;0\\). En utilisant \\(x-1&lt;E(x)\\leq x\\), que vaut \\(\\lim_{x\\to+\\infty}\\dfrac{E(x)}{x}\\) ?",
    "options": [
      "\\(1\\)",
      "\\(0\\)",
      "\\(+\\infty\\)"
    ],
    "correctIndex": 0,
    "explain": "Diviser l’encadrement par \\(x&gt;0\\) donne \\(1-\\frac{1}{x}&lt;\\frac{E(x)}{x}\\leq1\\) ; les deux bornes tendent vers \\(1\\), donc par le théorème des gendarmes \\(E(x)/x\\to1\\) — la partie entière « colle » à \\(x\\) de plus en plus précisément en proportion.",
    "wrongExplain": {
      "1": "La partie entière reste très proche de \\(x\\) lui-même (à moins de 1 d’écart), donc leur RAPPORT tend vers 1, pas vers 0 — ce serait le cas si l’écart grandissait proportionnellement à \\(x\\), ce qui n’est pas le cas ici.",
      "2": "Le rapport \\(E(x)/x\\) est toujours encadré entre deux quantités qui tendent vers 1, donc il ne peut pas diverger vers l’infini — l’encadrement l’en empêche."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex80",
    "section": "synthese-prelim",
    "statement": "Soit \\(x\\in\\mathbb{R}\\) vérifiant à la fois \\(E(x)=3\\) et \\(|x-1|\\leq5\\). Quel est l’ensemble des solutions ?",
    "options": [
      "\\([3,4[\\)",
      "\\([-4,6]\\)",
      "\\(\\{3\\}\\)"
    ],
    "correctIndex": 0,
    "explain": "\\(E(x)=3 \\Leftrightarrow x\\in[3,4[\\) ; \\(|x-1|\\leq5 \\Leftrightarrow -4\\leq x\\leq6\\). Comme \\([3,4[\\subset[-4,6]\\), l’intersection des deux conditions est simplement \\([3,4[\\) — la seconde condition est automatiquement vérifiée sur ce domaine, donc sans effet ici.",
    "wrongExplain": {
      "1": "C’est l’ensemble donné par la DEUXIÈME condition seule — il faut prendre l’INTERSECTION des deux conditions, pas la plus large des deux.",
      "2": "\\(\\{3\\}\\) ne contient qu’un seul point alors que \\(E(x)=3\\) est vérifié par tout un intervalle \\([3,4[\\), pas par \\(x=3\\) seulement."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex81",
    "section": "synthese-prelim",
    "statement": "Sachant que \\(xe^{-x}\\to0\\) en \\(+\\infty\\) et que \\(\\ln(xe^{-x})=\\ln x - x\\), que vaut \\(\\lim_{x\\to+\\infty}(\\ln x - x)\\) ?",
    "options": [
      "\\(-\\infty\\)",
      "\\(0\\)",
      "\\(+\\infty\\)"
    ],
    "correctIndex": 0,
    "explain": "\\(\\ln x\\) est négligeable devant \\(x\\) en \\(+\\infty\\) (croissance comparée) : c’est donc le terme \\(-x\\) qui impose le comportement, et \\(\\ln x - x\\to-\\infty\\) — cohérent avec \\(\\ln(xe^{-x})\\to\\ln(0^+)=-\\infty\\) puisque \\(xe^{-x}\\to0^+\\).",
    "wrongExplain": {
      "1": "\\(\\ln x\\to+\\infty\\) mais BEAUCOUP plus lentement que \\(x\\) — le terme \\(-x\\) l’emporte largement, la différence ne tend donc pas vers 0.",
      "2": "C’est \\(-x\\) qui domine la somme \\(\\ln x - x\\), pas \\(\\ln x\\) — la limite est \\(-\\infty\\), pas \\(+\\infty\\)."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex82",
    "section": "synthese-prelim",
    "statement": "Pourquoi l’équivalence \\(x&lt;y \\Leftrightarrow x^2&lt;y^2\\) est-elle FAUSSE si \\(x\\) et \\(y\\) peuvent être négatifs ?",
    "options": [
      "Parce que \\(x\\mapsto x^2\\) n’est monotone que sur \\(\\mathbb{R}_+\\) (ou sur \\(\\mathbb{R}_-\\)) séparément, pas sur \\(\\mathbb{R}\\) entier — contre-exemple \\(x=-3&lt;y=1\\) mais \\(x^2=9&gt;1=y^2\\)",
      "Parce que le carré d’un réel négatif n’existe pas",
      "Parce que cette équivalence est en fait toujours vraie"
    ],
    "correctIndex": 0,
    "explain": "La fonction carré décroît sur \\(\\mathbb{R}_-\\) et croît sur \\(\\mathbb{R}_+\\) : elle n’est pas monotone sur \\(\\mathbb{R}\\) tout entier, donc composer une inégalité par elle n’est valide que si \\(x\\) et \\(y\\) sont de même signe.",
    "wrongExplain": {
      "1": "Le carré d’un réel négatif existe parfaitement (ex. \\((-3)^2=9\\)) — ce n’est pas un problème d’existence, mais de MONOTONIE de la fonction carré sur \\(\\mathbb{R}\\) tout entier.",
      "2": "Le contre-exemple \\(x=-3,y=1\\) suffit à montrer que l’équivalence est bien fausse en général — elle n’est valable que sous l’hypothèse supplémentaire \\(x,y\\geq0\\) (ou tous deux \\(\\leq0\\))."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex83",
    "section": "synthese-prelim",
    "statement": "Si \\(|x-a|\\leq\\varepsilon\\) et \\(|y-b|\\leq\\eta\\), que peut-on dire de \\(|(x+y)-(a+b)|\\) ?",
    "options": [
      "\\(|(x+y)-(a+b)|\\leq\\varepsilon+\\eta\\) (par l’inégalité triangulaire)",
      "\\(|(x+y)-(a+b)|\\leq\\varepsilon\\times\\eta\\)",
      "On ne peut rien dire sans plus d’information"
    ],
    "correctIndex": 0,
    "explain": "\\((x+y)-(a+b)=(x-a)+(y-b)\\), donc par l’inégalité triangulaire \\(|(x+y)-(a+b)|\\leq|x-a|+|y-b|\\leq\\varepsilon+\\eta\\) — les erreurs d’approximation s’additionnent (au pire).",
    "wrongExplain": {
      "1": "Les erreurs d’approximation s’ADDITIONNENT (comme pour toute somme bornée), elles ne se multiplient pas — ce serait une borne beaucoup trop optimiste en général.",
      "2": "L’inégalité triangulaire donne directement une borne explicite et exploitable : \\(\\varepsilon+\\eta\\), pas une impossibilité de conclure."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex84",
    "section": "synthese-prelim",
    "statement": "Pour \\(\\alpha&gt;0\\) fixé, sachant que \\(E(x)/x\\to1\\) en \\(+\\infty\\) et que \\(t\\mapsto t^\\alpha\\) est continue en \\(1\\), que vaut \\(\\lim_{x\\to+\\infty}\\left(\\dfrac{E(x)}{x}\\right)^\\alpha\\) ?",
    "options": [
      "\\(1\\)",
      "\\(0\\)",
      "\\(\\alpha\\)"
    ],
    "correctIndex": 0,
    "explain": "Composer une limite (ici \\(E(x)/x\\to1\\)) par une fonction continue au point limite (ici \\(t\\mapsto t^\\alpha\\) continue en \\(1\\)) donne la limite de la fonction composée : \\(1^\\alpha=1\\).",
    "wrongExplain": {
      "1": "\\(E(x)/x\\) tend vers \\(1\\), pas vers \\(0\\) — élever une quantité qui tend vers \\(1\\) à une puissance \\(\\alpha\\) donne \\(1^\\alpha=1\\), pas \\(0\\).",
      "2": "\\(\\alpha\\) est l’EXPOSANT fixé dans l’énoncé, pas le résultat de la limite — ici la base \\((E(x)/x)\\) tend vers 1, donc toute la limite vaut \\(1^\\alpha=1\\), quel que soit \\(\\alpha\\)."
    },
    "chapterId": "analyse"
  },
  {
    "id": "ex39",
    "section": "polynomes",
    "statement": "Si un polynôme \\(Q\\in\\mathbb{R}[X]\\) (ou \\(\\mathbb{C}[X]\\)) admet une INFINITÉ de racines, alors :",
    "options": [
      "\\(Q=0\\) (le polynôme nul)",
      "\\(Q\\) est de degré infini",
      "\\(Q\\) a nécessairement un degré pair"
    ],
    "correctIndex": 0,
    "explain": "Un polynôme non nul de degré \\(n\\) a AU PLUS \\(n\\) racines — en avoir une infinité est donc impossible sauf si \\(Q\\) est le polynôme nul. C’est l’argument clé pour montrer qu’une fonction comme cos n’est pas polynomiale, ou qu’un facteur \\(Q\\) dans une équation fonctionnelle est constant.",
    "wrongExplain": {
      "1": "Un polynôme a toujours un degré FINI par définition — « degré infini » n’a pas de sens pour un polynôme.",
      "2": "Rien n’impose une parité particulière — la seule conclusion valable est que \\(Q\\) est le polynôme NUL."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex40",
    "section": "polynomes",
    "statement": "Pour résoudre \\((X+3)P(X)=XP(X+1)\\), en remplaçant \\(X\\) par \\(0\\), \\(-1\\) puis \\(-2\\) dans l’équation, on montre que :",
    "options": [
      "\\(-2,-1,0\\) sont tous racines de \\(P\\)",
      "\\(P\\) est de degré 3 exactement",
      "\\(P\\) n’a aucune racine réelle"
    ],
    "correctIndex": 0,
    "explain": "Évaluer l’équation fonctionnelle en des points bien choisis (ici 0, -1, -2, qui annulent un des deux membres) révèle directement des racines de \\(P\\) sans connaître son expression.",
    "wrongExplain": {
      "1": "Le degré exact de \\(P\\) n’est pas encore connu à ce stade — il dépend aussi du facteur \\(Q\\) restant, qui pourrait être de degré 0 ou plus.",
      "2": "C’est l’inverse : on vient justement de MONTRER que \\(P\\) a (au moins) trois racines réelles, \\(-2,-1,0\\)."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex41",
    "section": "polynomes",
    "statement": "Après avoir factorisé \\(P(X)=X(X+1)(X+2)Q(X)\\) et substitué dans l’équation, on obtient \\(Q(X)=Q(X+1)\\) pour tout \\(X\\). Pourquoi cela force-t-il \\(Q\\) à être constant ?",
    "options": [
      "Si \\(Q\\) avait une racine \\(\\alpha\\), alors \\(\\alpha,\\alpha+1,\\alpha+2,\\ldots\\) seraient TOUTES racines de \\(Q\\) (infinité de racines, donc \\(Q=0\\)) — contradiction avec \\(Q\\neq0\\), donc \\(Q\\) non constant est impossible",
      "Parce que toute égalité de polynômes impose automatiquement une constante",
      "Parce que \\(Q(X)=Q(X+1)\\) signifie que \\(Q\\) est un polynôme de degré 1"
    ],
    "correctIndex": 0,
    "explain": "Raisonnement par l’absurde : si \\(Q\\) a une racine \\(\\alpha\\), l’égalité \\(Q(X)=Q(X+1)\\) propage cette racine à \\(\\alpha+1,\\alpha+2,\\ldots\\) à l’infini — impossible pour un polynôme non nul.",
    "wrongExplain": {
      "1": "Cette affirmation est beaucoup trop générale et fausse — ce n’est pas l’égalité en elle-même qui impose une constante, c’est l’argument spécifique des racines qui s’accumulent à l’infini.",
      "2": "\\(Q(X)=Q(X+1)\\) pour tout \\(X\\) est en fait incompatible avec un polynôme de degré 1 non constant (ex. \\(Q(X)=X\\) donnerait \\(X\\neq X+1\\)) — cette équation force au contraire la constance."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex42",
    "section": "polynomes",
    "statement": "Pour \\(P=X^3-\\sigma_1X^2+\\sigma_2X-\\sigma_3\\) ayant pour racines \\(a,b,c\\), les relations de Viète donnent :",
    "options": [
      "\\(\\sigma_1=a+b+c\\), \\(\\sigma_2=ab+bc+ca\\), \\(\\sigma_3=abc\\)",
      "\\(\\sigma_1=abc\\), \\(\\sigma_2=a+b+c\\), \\(\\sigma_3=ab+bc+ca\\)",
      "\\(\\sigma_1=a+b+c\\), \\(\\sigma_2=abc\\), \\(\\sigma_3=ab+bc+ca\\)"
    ],
    "correctIndex": 0,
    "explain": "Obtenu en développant \\((X-a)(X-b)(X-c)\\) et en identifiant les coefficients : la somme des racines, la somme des produits deux à deux, puis le produit des trois.",
    "wrongExplain": {
      "1": "Les trois quantités sont permutées par rapport à la bonne correspondance — \\(\\sigma_1\\) est la somme (pas le produit), \\(\\sigma_3\\) est le produit (pas la somme des produits deux à deux).",
      "2": "\\(\\sigma_2\\) et \\(\\sigma_3\\) sont échangés : \\(\\sigma_2\\) est la somme des produits DEUX À DEUX, \\(\\sigma_3\\) est le produit des TROIS."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex43",
    "section": "polynomes",
    "statement": "Pour \\(P=X^3-X+1\\) (racines \\(a,b,c\\)), en identifiant terme à terme avec \\(X^3-\\sigma_1X^2+\\sigma_2X-\\sigma_3\\), on trouve :",
    "options": [
      "\\(\\sigma_1=a+b+c=0\\) et \\(\\sigma_2=ab+bc+ca=-1\\)",
      "\\(\\sigma_1=1\\) et \\(\\sigma_2=-1\\)",
      "\\(\\sigma_1=0\\) et \\(\\sigma_2=1\\)"
    ],
    "correctIndex": 0,
    "explain": "Le coefficient en \\(X^2\\) de \\(P\\) est \\(0\\), donc \\(-\\sigma_1=0\\Rightarrow\\sigma_1=0\\) ; le coefficient en \\(X\\) est \\(-1\\), donc \\(\\sigma_2=-1\\) directement (pas de signe à changer, contrairement à \\(\\sigma_1\\) et \\(\\sigma_3\\)).",
    "wrongExplain": {
      "1": "\\(\\sigma_1\\) est l’opposé du coefficient en \\(X^2\\), qui vaut \\(0\\) ici — pas \\(1\\) — et \\(\\sigma_2\\) EST le coefficient en \\(X\\) directement.",
      "2": "\\(\\sigma_1\\) est bien \\(0\\), mais \\(\\sigma_2\\) est le coefficient en \\(X\\) lui-même (\\(-1\\)), pas son opposé — il ne faut changer de signe que pour \\(\\sigma_1\\) et \\(\\sigma_3\\), pas pour \\(\\sigma_2\\)."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex44",
    "section": "polynomes",
    "statement": "Avec \\(\\sigma_1=a+b+c=0\\), la formule \\((a+b+c)^3=a^3+b^3+c^3+3(ab+bc+ca)(a+b+c)-3abc\\) permet de calculer \\(a^3+b^3+c^3\\) en :",
    "options": [
      "Remarquant que \\(\\sigma_1^3=0\\) annule le terme croisé (qui contient \\(\\sigma_1\\) en facteur), ne laissant que \\(a^3+b^3+c^3-3\\sigma_3=0\\)",
      "Calculant directement \\(a^3,b^3,c^3\\) séparément sans utiliser Viète",
      "Divisant toute l’équation par \\(\\sigma_1\\)"
    ],
    "correctIndex": 0,
    "explain": "Puisque \\(\\sigma_1=0\\), le terme \\(3\\sigma_2\\sigma_1\\) s’annule automatiquement — il ne reste que \\(0=a^3+b^3+c^3-3\\sigma_3\\), d’où \\(a^3+b^3+c^3=3\\sigma_3=3abc\\).",
    "wrongExplain": {
      "1": "Sans les racines explicites de \\(P=X^3-X+1\\) (qui ne sont pas simples à calculer), impossible de calculer \\(a^3,b^3,c^3\\) séparément — c’est justement l’intérêt de la méthode par les sommes symétriques.",
      "2": "Diviser par \\(\\sigma_1=0\\) est une opération interdite (division par zéro) — ce n’est pas la bonne manipulation."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex45",
    "section": "polynomes",
    "statement": "Deuxième méthode (plus directe) : puisque \\(a\\) est racine de \\(P=X^3-X+1\\), on a \\(a^3-a+1=0\\), donc :",
    "options": [
      "\\(a^3=a-1\\), et de même \\(b^3=b-1\\), \\(c^3=c-1\\)",
      "\\(a^3=1-a\\) seulement pour la racine \\(a\\), pas pour \\(b,c\\)",
      "\\(a=1\\) nécessairement"
    ],
    "correctIndex": 0,
    "explain": "Toute racine \\(r\\) de \\(P\\) vérifie \\(P(r)=0\\), donc \\(r^3-r+1=0\\Rightarrow r^3=r-1\\) — cette relation est vraie pour CHAQUE racine (a, b, et c), ce qui donne directement \\(a^3+b^3+c^3=(a+b+c)-3=-3\\) sans passer par Viète.",
    "wrongExplain": {
      "1": "\\(a,b,c\\) sont TOUTES des racines du MÊME polynôme \\(P\\), donc elles vérifient TOUTES la même relation \\(r^3=r-1\\) — ce n’est pas spécifique à \\(a\\).",
      "2": "Rien n’impose \\(a=1\\) : \\(P(1)=1-1+1=1\\neq0\\), donc \\(1\\) n’est même pas racine de \\(P\\) !"
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex46",
    "section": "polynomes",
    "statement": "Si \\(A=BQ+R\\) (division euclidienne) et que \\(\\alpha\\) est une racine de \\(B\\), alors :",
    "options": [
      "\\(A(\\alpha)=R(\\alpha)\\) (le terme \\(B(\\alpha)Q(\\alpha)\\) s’annule)",
      "\\(A(\\alpha)=Q(\\alpha)\\)",
      "\\(A(\\alpha)=0\\) nécessairement"
    ],
    "correctIndex": 0,
    "explain": "En évaluant l’identité \\(A=BQ+R\\) en \\(X=\\alpha\\) avec \\(B(\\alpha)=0\\), le terme \\(B(\\alpha)Q(\\alpha)\\) s’annule : il ne reste que \\(A(\\alpha)=R(\\alpha)\\) — un raccourci qui évite de calculer \\(A(\\alpha)\\) directement si \\(\\alpha\\) est compliqué (ex. irrationnel).",
    "wrongExplain": {
      "1": "\\(Q(\\alpha)\\) n’intervient plus du tout une fois que \\(B(\\alpha)=0\\) a annulé le terme qui le contenait — ce n’est pas lui qui reste.",
      "2": "Rien n’impose que \\(A(\\alpha)=0\\) : \\(\\alpha\\) est racine de \\(B\\), pas forcément de \\(A\\) — \\(A(\\alpha)\\) vaut \\(R(\\alpha)\\), qui peut être non nul."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex47",
    "section": "polynomes",
    "statement": "Pour construire un polynôme \\(A\\) qui s’annule exactement sur les entiers \\(1,2,\\ldots,100\\), on pose :",
    "options": [
      "\\(A(X)=\\displaystyle\\prod_{k=1}^{100}(X-k)\\)",
      "\\(A(X)=\\displaystyle\\sum_{k=1}^{100}(X-k)\\)",
      "\\(A(X)=(X-1)+(X-100)\\)"
    ],
    "correctIndex": 0,
    "explain": "Un PRODUIT de facteurs \\((X-k)\\) s’annule dès que \\(X\\) égale l’une des racines \\(k\\) — c’est la clé de la construction : chaque facteur « verrouille » un zéro supplémentaire.",
    "wrongExplain": {
      "1": "Une SOMME ne s’annule pas pour chaque \\(k\\) individuellement — il faudrait que TOUS les termes s’annulent simultanément, ce qui n’arrive qu’en un seul point au mieux, pas en 100.",
      "2": "Cette expression ne s’annule qu’en deux points au plus — elle ne capture pas les 98 autres racines requises."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex48",
    "section": "polynomes",
    "statement": "Pourquoi poser \\(P=42+A(X)^2\\) (plutôt que \\(42+A(X)\\)) permet-il d’obtenir un polynôme de degré 200 tout en gardant la valeur 42 aux mêmes 100 points ?",
    "options": [
      "\\(A^2\\) a pour racines EXACTEMENT les mêmes que \\(A\\) (chaque facteur est juste mis au carré) mais un degré doublé (\\(100\\to200\\))",
      "Élever au carré change les racines de \\(A\\)",
      "\\(A^2\\) et \\(A\\) ont le même degré"
    ],
    "correctIndex": 0,
    "explain": "\\(A^2=\\prod(X-k)^2\\) s’annule exactement aux mêmes 100 entiers que \\(A\\) (chaque racine est juste « doublée » en multiplicité, mais reste une racine), tandis que son degré double : \\(100\\to200\\) — exactement ce qu’il fallait pour atteindre le degré visé.",
    "wrongExplain": {
      "1": "Les racines de \\(A^2\\) sont EXACTEMENT celles de \\(A\\) (un facteur \\((X-k)^2\\) s’annule encore en \\(X=k\\)) — élever au carré ne change pas l’ENSEMBLE des racines, seulement leur multiplicité.",
      "2": "Le degré d’un produit de facteurs au carré est le DOUBLE de celui du produit simple — \\(\\deg(A^2)=2\\deg(A)=200\\neq100=\\deg(A)\\)."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex49",
    "section": "polynomes",
    "statement": "Pour montrer que la fonction cosinus n’est pas (la restriction à \\(\\mathbb{R}\\) d’)un polynôme, l’argument clé est que :",
    "options": [
      "\\(\\cos\\) s’annule en une INFINITÉ de points (\\(\\pi/2+k\\pi\\), \\(k\\in\\mathbb{Z}\\)), ce qui est impossible pour un polynôme non nul",
      "\\(\\cos\\) n’est jamais nul",
      "\\(\\cos\\) n’est pas continue"
    ],
    "correctIndex": 0,
    "explain": "Même argument que pour l’équation fonctionnelle : un polynôme non nul n’a qu’un nombre FINI de racines (au plus son degré) — \\(\\cos\\) en a une infinité, donc aucun polynôme ne peut coïncider avec \\(\\cos\\) sur \\(\\mathbb{R}\\) tout entier.",
    "wrongExplain": {
      "1": "\\(\\cos\\) s’annule bel et bien, et même une infinité de fois (\\(\\pi/2,3\\pi/2,\\ldots\\)) — c’est justement CE fait qui est exploité dans la preuve.",
      "2": "\\(\\cos\\) est au contraire une fonction parfaitement continue (et même \\(C^\\infty\\)) — la continuité n’est pas en cause dans cet argument."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex50",
    "section": "polynomes",
    "statement": "Si un polynôme \\(R\\) vérifie \\(R(n)=R(n+1)\\) seulement pour \\(n\\in\\{0,1,\\ldots,50\\}\\) (un nombre FINI de valeurs), peut-on conclure que \\(R\\) est constant sur \\(\\mathbb{R}\\) comme dans l’exercice du cours ?",
    "options": [
      "Non : l’argument des racines infinies exige une INFINITÉ de valeurs de \\(n\\), pas seulement 51 — avec un nombre fini, \\(R\\) non constant reste possible",
      "Oui, le même raisonnement s’applique à l’identique",
      "Oui, car 51 valeurs suffisent toujours pour un polynôme"
    ],
    "correctIndex": 0,
    "explain": "Le raisonnement du cours fonctionne parce que l’équation fonctionnelle vaut pour une vraie infinité de valeurs, engendrant une infinité de racines pour le polynôme \\(Q(X)-Q(X+1)\\). Avec seulement 51 égalités, ce polynôme a au plus 51 racines, ce qui est parfaitement compatible avec un polynôme non nul de degré \\(\\geq51\\) — aucune contradiction, donc aucune conclusion de constance.",
    "wrongExplain": {
      "1": "La distinction FINI/INFINI est exactement ce qui change tout : avec une infinité d’égalités le raisonnement par l’absurde fonctionne, avec un nombre fini il s’effondre — ce n’est pas la même situation.",
      "2": "Le nombre de valeurs nécessaires dépend du degré du polynôme en jeu, qui n’est pas borné a priori — 51 n’est pas un seuil magique garantissant quoi que ce soit."
    },
    "chapterId": "algebre"
  },
  {
    "id": "ex35",
    "section": "arithmetique",
    "statement": "Pour deux entiers \\(a,b\\), le produit \\(\\text{pgcd}(a,b)\\times\\text{ppcm}(a,b)\\) est égal à :",
    "options": [
      "\\(a\\times b\\)",
      "\\(a+b\\)",
      "\\(\\max(a,b)\\)"
    ],
    "correctIndex": 0,
    "explain": "Identité fondamentale reliant les deux notions : le produit du plus grand diviseur commun et du plus petit multiple commun redonne toujours le produit des deux nombres de départ.",
    "wrongExplain": {
      "1": "Cette identité relie un PRODUIT (pgcd×ppcm) à un produit (a×b), pas à une somme — ce n'est pas la bonne opération.",
      "2": "\\(\\max(a,b)\\) ne fait intervenir qu'un des deux nombres, jamais leur relation de divisibilité mutuelle — ce n'est pas lié au pgcd ou au ppcm."
    },
    "chapterId": "logique"
  },
  {
    "id": "ex36",
    "section": "arithmetique",
    "statement": "Le \\(\\text{pgcd}(a,b)\\) (plus grand commun diviseur) est, par définition :",
    "options": [
      "Le plus grand entier qui divise à la fois \\(a\\) et \\(b\\)",
      "Le plus petit entier qui divise à la fois \\(a\\) et \\(b\\)",
      "Le plus grand entier parmi \\(a\\) et \\(b\\)"
    ],
    "correctIndex": 0,
    "explain": "C'est la définition même : parmi tous les diviseurs COMMUNS à \\(a\\) et \\(b\\), on prend le plus grand.",
    "wrongExplain": {
      "1": "Le plus PETIT diviseur commun à deux entiers est toujours 1 — ce n'est pas une notion utile, contrairement au plus GRAND.",
      "2": "Cette option confond « le plus grand des deux nombres » avec « le plus grand DIVISEUR COMMUN » — ce sont deux notions totalement différentes."
    },
    "chapterId": "logique"
  },
  {
    "id": "ex37",
    "section": "arithmetique",
    "statement": "Le \\(\\text{ppcm}(a,b)\\) (plus petit commun multiple) est, par définition :",
    "options": [
      "Le plus petit entier qui est multiple à la fois de \\(a\\) et de \\(b\\)",
      "Le plus grand entier qui est multiple à la fois de \\(a\\) et de \\(b\\)",
      "Le produit \\(a\\times b\\) toujours"
    ],
    "correctIndex": 0,
    "explain": "Parmi tous les multiples COMMUNS à \\(a\\) et \\(b\\) (il y en a une infinité), on prend le plus PETIT strictement positif.",
    "wrongExplain": {
      "1": "Il n'existe pas de plus GRAND multiple commun : les multiples communs sont en nombre infini (on peut toujours en trouver un plus grand) — seul le plus PETIT a un sens.",
      "2": "\\(a\\times b\\) n'est le ppcm que lorsque \\(a\\) et \\(b\\) sont premiers entre eux (pgcd=1) — en général \\(\\text{ppcm}(a,b)=\\dfrac{a\\times b}{\\text{pgcd}(a,b)}\\), pas simplement \\(a\\times b\\)."
    },
    "chapterId": "logique"
  },
  {
    "id": "ex38",
    "section": "arithmetique",
    "statement": "Pour rendre une fraction \\(\\dfrac{a}{b}\\) irréductible, on divise le numérateur et le dénominateur par :",
    "options": [
      "Leur pgcd",
      "Leur ppcm",
      "Un nombre premier quelconque"
    ],
    "correctIndex": 0,
    "explain": "Diviser par le pgcd élimine TOUS les facteurs communs d'un coup — le résultat n'a alors plus aucun diviseur commun avec le dénominateur, c'est la définition d'une fraction irréductible.",
    "wrongExplain": {
      "1": "Le ppcm est généralement bien plus grand que \\(a\\) et \\(b\\) eux-mêmes — diviser par le ppcm donnerait des résultats non entiers dans la plupart des cas.",
      "2": "Un nombre premier quelconque pourrait ne diviser ni \\(a\\) ni \\(b\\) — il faut spécifiquement LEUR plus grand diviseur commun, pas un nombre choisi au hasard."
    },
    "chapterId": "logique"
  },
  {
    "id": "ex39",
    "section": "arithmetique",
    "statement": "L'algorithme d'Euclide pour calculer \\(\\text{pgcd}(a,b)\\) repose sur l'identité : si \\(a=bq+r\\), alors :",
    "options": [
      "\\(\\text{pgcd}(a,b)=\\text{pgcd}(b,r)\\)",
      "\\(\\text{pgcd}(a,b)=\\text{pgcd}(a,r)\\)",
      "\\(\\text{pgcd}(a,b)=q\\)"
    ],
    "correctIndex": 0,
    "explain": "On remplace la paire \\((a,b)\\) par la paire \\((b,r)\\) (plus petite), qui a le MÊME pgcd — en répétant, le reste finit par s'annuler, et le pgcd est le dernier reste non nul.",
    "wrongExplain": {
      "1": "C'est \\(b\\) (pas \\(a\\)) qui doit rester dans la nouvelle paire avec \\(r\\) — garder \\(a\\) ne fait pas progresser l'algorithme vers des nombres plus petits.",
      "2": "Le quotient \\(q\\) n'a aucune raison d'être le pgcd — c'est le RESTE \\(r\\) de la division, pas le quotient, qui intervient dans la relation de récurrence."
    },
    "chapterId": "logique"
  },
  {
    "id": "ex40",
    "section": "arithmetique",
    "statement": "D'après le théorème de Bézout, pour deux entiers \\(a,b\\), il existe toujours des entiers \\(u,v\\) tels que :",
    "options": [
      "\\(au+bv=\\text{pgcd}(a,b)\\)",
      "\\(au+bv=0\\)",
      "\\(au+bv=\\text{ppcm}(a,b)\\)"
    ],
    "correctIndex": 0,
    "explain": "Le théorème de Bézout garantit qu'une combinaison linéaire entière de \\(a\\) et \\(b\\) peut toujours atteindre exactement leur pgcd.",
    "wrongExplain": {
      "1": "\\(au+bv=0\\) a toujours une solution triviale (\\(u=v=0\\)), mais ce n'est pas ce qu'affirme Bézout — Bézout garantit d'atteindre le PGCD, pas zéro.",
      "2": "Le ppcm est plus grand que le pgcd (sauf cas particulier) et n'est pas la quantité garantie par Bézout — c'est bien le pgcd qui est atteint."
    },
    "chapterId": "logique"
  },
  {
    "id": "ex41",
    "section": "arithmetique",
    "statement": "Le théorème de Gauss énonce : si \\(a\\) divise \\(b\\times c\\) et que \\(\\text{pgcd}(a,b)=1\\), alors :",
    "options": [
      "\\(a\\) divise \\(c\\)",
      "\\(a\\) divise \\(b\\)",
      "\\(a=1\\) nécessairement"
    ],
    "correctIndex": 0,
    "explain": "Puisque \\(a\\) n'a aucun facteur commun avec \\(b\\) (ils sont premiers entre eux), tout ce que \\(a\\) « apporte » dans le produit \\(b\\times c\\) doit venir de \\(c\\) — donc \\(a\\) divise \\(c\\).",
    "wrongExplain": {
      "1": "C'est précisément l'hypothèse \\(\\text{pgcd}(a,b)=1\\) qui EXCLUT que \\(a\\) divise \\(b\\) (sauf trivialement) — la conclusion porte sur \\(c\\), pas sur \\(b\\).",
      "2": "Rien n'impose \\(a=1\\) : par exemple \\(a=5,b=3,c=10\\) vérifient les hypothèses (\\(5\\mid30\\), \\(\\text{pgcd}(5,3)=1\\)) avec \\(a=5\\neq1\\), et bien \\(5\\mid10\\)."
    },
    "chapterId": "logique"
  },
  {
    "id": "ex42",
    "section": "arithmetique",
    "statement": "Deux entiers \\(a,b\\) sont dits « premiers entre eux » si et seulement si :",
    "options": [
      "\\(\\text{pgcd}(a,b)=1\\)",
      "\\(a\\) et \\(b\\) sont tous deux des nombres premiers",
      "\\(\\text{ppcm}(a,b)=a\\times b\\) seulement"
    ],
    "correctIndex": 0,
    "explain": "« Premiers entre eux » signifie qu'ils n'ont AUCUN diviseur commun autre que 1 — \\(a\\) et \\(b\\) eux-mêmes n'ont pas besoin d'être des nombres premiers (ex. 8 et 9 sont premiers entre eux, mais ni 8 ni 9 n'est premier).",
    "wrongExplain": {
      "1": "« Premiers ENTRE EUX » ne signifie pas que chacun est individuellement un nombre premier — ex. 8 et 9 sont premiers entre eux (pgcd=1) sans que 8 ou 9 soit un nombre premier.",
      "2": "Cette égalité \\(\\text{ppcm}(a,b)=a\\times b\\) est en fait une CONSÉQUENCE de \\(\\text{pgcd}(a,b)=1\\), pas une définition indépendante — c'est circulaire de la poser comme condition seule."
    },
    "chapterId": "logique"
  }
];
