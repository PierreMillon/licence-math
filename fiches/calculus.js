/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/calculus.js
   Fiche CALCULUS (Pratique du calcul mathématique).
   Source : TD de Séance 1 (fractions, coeff. binomiaux,
   puissances, radicaux), Séance 2 (trinôme), Séance 3 (exp/ln),
   Séance 4 (dérivation), Séance 5 (développement/factorisation),
   Séance 6 (primitives), Séance 7 (trigonométrie), Séance 8
   (sommes, systèmes linéaires), M. Leroux / M. Pascaud, INU
   Champollion. QCM à 3 réponses, formules LaTeX (KaTeX).

   §1 (algebrique) réécrite le 08/09/2026 à partir de la vraie feuille
   de TD de Séance 1 (« Fractions, coefficients binomiaux, puissances
   et radicaux ») et de son corrigé — récupérés sur le Drive partagé,
   dossier TD1. Le PDF de la feuille ne donne que des TITRES de règles
   ("— Partie conjuguée.", "— Règle sur les puissances") sans jamais
   écrire la règle elle-même : le texte de cours ci-dessous (SECTIONS.
   algebrique.cours) et les questions ont été rédigés à partir de ces
   titres, pas recopiés du PDF. Une question de cours par règle
   (cas général), plus une question de cas particulier pour les
   points les plus piégeux du TD (quantité conjuguée, puissance
   fractionnaire, piège du signe sur \\(A^2\\) — TD Exercice 14). Les
   16 exercices du TD ne sont pas repris un par un (ce sont des
   calculs longs, pas des QCM), seulement les règles qu'ils
   mobilisent.

   §2 (trinome) étoffée le 15/09/2026 (fichiers envoyés directement par
   Pierre : « TD_02_Trinôme.pdf » énoncé + « TD_02_corr - trinôme.pdf »
   corrigé, Séance 2, mêmes auteurs) — passée de 3 à 11 questions.
   Cette feuille, contrairement à celle de Séance 1, donne ses
   « Éléments de cours » sous forme de règles complètes (pas seulement
   des titres) : 3 étaient déjà couvertes (discriminant, somme/produit,
   forme factorisée), les 6 autres ont été ajoutées telles quelles
   (carré de réel toujours positif, \\(x^2=y^2\\Leftrightarrow x=\\pm y\\),
   factoriser/racine évidente AVANT de calculer \\(\\Delta\\), forme
   canonique, définition d'une racine). Deux questions de cas
   particulier ajoutées à partir des techniques du corrigé : le piège
   \\(A^4=B^2 \\Rightarrow A^2=\\pm B\\) (TD Exercice 7) et la
   reconnaissance de \\(A^2-B^2\\) dans le calcul d'un discriminant
   (TD Exercice 11).

   wrongExplain (21/09/2026, demande explicite « expliquer pourquoi
   les réponses fausses sont fausses si on les choisit ») : chaque
   exercice porte maintenant un objet wrongExplain, indexé par la
   position de l'option dans le tableau `options` d'ORIGINE (même
   index que correctIndex, PAS l'ordre d'affichage mélangé à chaque
   rendu par fiche-engine.js) — une explication courte et SPÉCIFIQUE
   à ce choix précis (l'erreur/la confusion qu'il représente), à ne
   pas confondre avec `explain` (qui justifie la bonne réponse en
   général). Voir fiche-engine.js/applyFeedback : si l'option choisie
   n'a pas d'entrée dans wrongExplain, on retombe sur `explain` comme
   avant (comportement inchangé pour tout contenu pas encore
   retrofit). Les 3 exercices à variante u/v (dérivation) ont un
   wrongExplainUv séparé (repris par applyNotationPreference comme
   explainUv), le texte étant identique au fond mais formulé avec
   u/v au lieu de f/g. */

const EXERCISES = [
  {
    id: 'ex1', section: 'algebrique',
    statement: 'Pour additionner deux fractions \\(\\dfrac{a}{b} + \\dfrac{c}{d}\\), la première étape est de :',
    options: ['Les mettre au même dénominateur', 'Additionner les numérateurs et les dénominateurs séparément', 'Multiplier les deux fractions entre elles'],
    correctIndex: 0,
    explain: 'On ne peut additionner des fractions que si elles ont le même dénominateur — on cherche le plus petit dénominateur commun, pas n’importe quel dénominateur commun, pour garder des calculs simples.',
    wrongExplain: {
      1: 'On ne peut pas additionner numérateurs et dénominateurs séparément — cette « addition terme à terme » ne correspond à aucune opération mathématique valide sur les fractions.',
      2: 'Multiplier les fractions donnerait \\(\\dfrac{ac}{bd}\\), qui n’a rien à voir avec une somme — c’est la règle de la multiplication, pas de l’addition.',
    },
  },
  {
    id: 'ex2', section: 'algebrique',
    statement: '\\(\\dfrac{a}{b} = \\dfrac{c}{d}\\) (avec \\(b,d \\neq 0\\)) équivaut à :',
    options: ['\\(ad = bc\\)', '\\(a+d = b+c\\)', '\\(a = c\\) et \\(b = d\\)'],
    correctIndex: 0,
    explain: 'C’est le produit en croix : le produit des extrêmes (\\(a\\) et \\(d\\)) égale le produit des moyens (\\(b\\) et \\(c\\)).',
    wrongExplain: {
      1: 'Une addition entre numérateurs et dénominateurs de fractions différentes n’a pas de sens — la seule opération valide ici est le produit en croix.',
      2: '\\(1/2\\) et \\(2/4\\) sont égales sans avoir le même numérateur ni le même dénominateur : cette condition est bien trop restrictive.',
    },
  },
  {
    id: 'ex3', section: 'algebrique',
    statement: '\\(\\dfrac{a/b}{c/d}\\) est égal à :',
    options: ['\\(\\dfrac{a \\times d}{b \\times c}\\)', '\\(\\dfrac{a \\times c}{b \\times d}\\)', '\\(\\dfrac{a+d}{b+c}\\)'],
    correctIndex: 0,
    explain: 'Diviser par une fraction revient à multiplier par son inverse : on obtient le produit des plus éloignés (\\(a\\) et \\(d\\)) sur le produit des plus rapprochés (\\(b\\) et \\(c\\)).',
    wrongExplain: {
      1: 'C’est la formule du PRODUIT de deux fractions \\(\\frac{a}{b}\\times\\frac{c}{d}\\), pas de leur quotient — ici on divise, donc on multiplie par l’inverse de la seconde fraction.',
      2: 'Additionner numérateurs et dénominateurs de fractions différentes n’a pas de sens mathématique.',
    },
  },
  {
    id: 'ex4', section: 'algebrique',
    statement: 'Pour \\(0 \\leq p \\leq n\\), le coefficient binomial \\(\\binom{n}{p}\\) vaut :',
    options: ['\\(\\dfrac{n!}{p!(n-p)!}\\)', '\\(\\dfrac{n!}{p!}\\)', '\\(n! - p!\\)'],
    correctIndex: 0,
    explain: 'C’est la définition du coefficient binomial : la factorielle de \\(n\\), divisée par le produit des factorielles de \\(p\\) et de \\(n-p\\).',
    wrongExplain: {
      1: 'Il manque le facteur \\((n-p)!\\) au dénominateur : cette expression compte les arrangements, pas les combinaisons.',
      2: 'Le coefficient binomial est un quotient de factorielles, pas une différence — cette expression n’a pas de lien avec la définition.',
    },
  },
  {
    id: 'ex5', section: 'algebrique',
    statement: 'Le coefficient binomial \\(\\binom{n}{p}\\) pour \\(p > n\\) vaut :',
    options: ['\\(0\\)', '\\(1\\)', '\\(n!\\)'],
    correctIndex: 0,
    explain: 'On ne peut pas choisir plus d’éléments \\(p\\) qu’il n’y en a \\(n\\) dans l’ensemble : par convention, le coefficient vaut \\(0\\).',
    wrongExplain: {
      1: 'On confond peut-être avec \\(\\binom{n}{0}=1\\) (choisir 0 élément) — mais ici \\(p>n\\), il est impossible de choisir plus d’éléments qu’il n’y en a, le résultat est \\(0\\), pas \\(1\\).',
      2: '\\(n!\\) correspondrait plutôt à \\(\\binom{n}{n}\\) ou à un dénombrement complet, pas à un choix impossible.',
    },
  },
  {
    id: 'ex6', section: 'algebrique',
    statement: '\\(a^m \\times a^n\\) est égal à :',
    options: ['\\(a^{m+n}\\)', '\\(a^{m \\times n}\\)', '\\(a^{m-n}\\)'],
    correctIndex: 0,
    explain: 'Multiplier deux puissances de même base revient à additionner leurs exposants.',
    wrongExplain: {
      1: 'C’est la règle de \\((a^m)^n\\) (puissance d’une puissance, on multiplie les exposants), pas celle du produit \\(a^m\\times a^n\\) (on les additionne).',
      2: 'C’est la règle du QUOTIENT \\(a^m/a^n\\) (on soustrait les exposants) — ici c’est un produit, donc une addition.',
    },
  },
  {
    id: 'ex7', section: 'algebrique',
    statement: '\\((a^m)^n\\) est égal à :',
    options: ['\\(a^{m \\times n}\\)', '\\(a^{m+n}\\)', '\\(a^{m^n}\\)'],
    correctIndex: 0,
    explain: 'Élever une puissance à une nouvelle puissance revient à multiplier les exposants entre eux.',
    wrongExplain: {
      1: 'C’est la règle du PRODUIT \\(a^m\\times a^n\\) (on additionne les exposants), pas celle de la puissance d’une puissance (on les multiplie).',
      2: '\\(a^{m^n}\\) correspondrait à une tour de puissances, une opération différente de \\((a^m)^n\\).',
    },
  },
  {
    id: 'ex8', section: 'algebrique',
    statement: 'Pour \\(b \\neq 0\\), \\(\\left(\\dfrac{a}{b}\\right)^n\\) est égal à :',
    options: ['\\(\\dfrac{a^n}{b^n}\\)', '\\(\\dfrac{a}{b^n}\\)', '\\(\\dfrac{a^n}{b}\\)'],
    correctIndex: 0,
    explain: 'La puissance d’un quotient est le quotient des puissances : chaque terme (numérateur et dénominateur) est élevé à la puissance \\(n\\) séparément.',
    wrongExplain: {
      1: 'Le numérateur \\(a\\) doit aussi être élevé à la puissance \\(n\\) — ici seul le dénominateur l’est.',
      2: 'Le dénominateur \\(b\\) doit aussi être élevé à la puissance \\(n\\) — ici seul le numérateur l’est.',
    },
  },
  {
    id: 'ex9', section: 'algebrique',
    statement: 'Pour \\(a \\neq 0\\), \\(a^{-n}\\) est égal à :',
    options: ['\\(\\dfrac{1}{a^n}\\)', '\\(-a^n\\)', '\\(\\dfrac{1}{-a^n}\\)'],
    correctIndex: 0,
    explain: 'Un exposant négatif signifie « inverse » : \\(a^{-n} = 1/a^n\\), ce n’est pas un nombre négatif — parfois plus pratique de garder des puissances négatives que de repasser en fractions.',
    wrongExplain: {
      1: 'Un exposant négatif indique un INVERSE, pas un signe négatif devant le nombre : \\(a^{-n}\\) reste positif si \\(a\\) l’est.',
      2: 'Le signe négatif ne doit pas apparaître : \\(a^{-n}\\) est simplement l’inverse \\(1/a^n\\), sans signe moins.',
    },
  },
  {
    id: 'ex10', section: 'algebrique',
    statement: 'Pour \\(a \\neq 0\\), \\(a^0\\) vaut :',
    options: ['\\(1\\)', '\\(0\\)', '\\(a\\)'],
    correctIndex: 0,
    explain: 'Par convention (cohérente avec \\(a^{n-n}=a^n/a^n=1\\)), tout nombre non nul à la puissance 0 vaut 1.',
    wrongExplain: {
      1: '\\(a^0\\) ne vaut jamais \\(0\\) (pour \\(a\\neq0\\)) — c’est \\(0^n\\) (avec \\(n>0\\)) qui vaut \\(0\\), pas l’inverse.',
      2: 'C’est \\(a^1\\) qui vaut \\(a\\) — l’exposant \\(0\\) « annule » toute la puissance, il ne la laisse pas inchangée.',
    },
  },
  {
    id: 'ex11', section: 'algebrique',
    statement: 'Pour \\(x \\geq 0\\), la racine carrée \\(\\sqrt{x}\\) désigne, par définition :',
    options: ['L’unique nombre positif ou nul dont le carré vaut \\(x\\)', 'N’importe quel nombre dont le carré vaut \\(x\\)', 'Un nombre de même signe que \\(x\\)'],
    correctIndex: 0,
    explain: 'Même quand un nombre négatif a aussi un carré égal à \\(x\\) (ex : \\((-3)^2=9\\)), le symbole \\(\\sqrt{\\ }\\) désigne toujours la racine positive.',
    wrongExplain: {
      1: 'Même si \\(-\\sqrt{x}\\) a aussi pour carré \\(x\\), le symbole \\(\\sqrt{\\ }\\) désigne PAR CONVENTION uniquement la racine positive — pas « n’importe quel » nombre qui convient.',
      2: 'Ici \\(x\\geq0\\) : cette affirmation n’apporte aucune information puisque \\(\\sqrt{x}\\) est de toute façon toujours positif ou nul.',
    },
  },
  {
    id: 'ex12', section: 'algebrique',
    statement: '\\(\\sqrt{x^2}\\) est égal à :',
    options: ['\\(|x|\\)', '\\(x\\)', '\\(x^2\\)'],
    correctIndex: 0,
    explain: 'La racine carrée est toujours positive ; si \\(x<0\\), \\(\\sqrt{x^2}=-x=|x|\\), pas \\(x\\) — cas particulier de la règle précédente.',
    wrongExplain: {
      1: 'Faux si \\(x<0\\) : par exemple \\(\\sqrt{(-3)^2}=\\sqrt{9}=3\\), pas \\(-3\\) — la racine carrée ne peut jamais rendre un résultat négatif.',
      2: 'Cela reviendrait à ne pas appliquer la racine carrée du tout : \\(\\sqrt{x^2}\\) n’est pas \\(x^2\\), sauf cas particulier.',
    },
  },
  {
    id: 'ex13', section: 'algebrique',
    statement: 'Pour \\(a, b \\geq 0\\), \\(\\sqrt{ab}\\) est égal à :',
    options: ['\\(\\sqrt{a} \\times \\sqrt{b}\\)', '\\(\\sqrt{a} + \\sqrt{b}\\)', '\\(\\sqrt{a+b}\\)'],
    correctIndex: 0,
    explain: 'La racine d’un produit est le produit des racines — attention, ce n’est PAS vrai pour une somme : \\(\\sqrt{a+b} \\neq \\sqrt{a}+\\sqrt{b}\\) en général.',
    wrongExplain: {
      1: 'C’est l’erreur classique : la racine d’un PRODUIT se distribue, mais la racine d’une SOMME ne se distribue pas de cette façon — \\(\\sqrt{a}+\\sqrt{b}\\neq\\sqrt{ab}\\) en général.',
      2: '\\(\\sqrt{a+b}\\) est la racine d’une somme, une expression différente de \\(\\sqrt{ab}\\) (racine d’un produit) — les deux ne coïncident pas en général.',
    },
  },
  {
    id: 'ex14', section: 'algebrique',
    statement: 'Pour rendre rationnel un dénominateur de la forme \\(\\sqrt{a} + \\sqrt{b}\\), on multiplie numérateur et dénominateur par :',
    options: ['Sa quantité conjuguée \\(\\sqrt{a} - \\sqrt{b}\\)', '\\(\\sqrt{a} + \\sqrt{b}\\) lui-même', '\\(\\sqrt{a \\times b}\\)'],
    correctIndex: 0,
    explain: 'En multipliant par la quantité conjuguée, on utilise l’identité \\((x+y)(x-y)=x^2-y^2\\) : les racines disparaissent du dénominateur, qui devient \\(a-b\\).',
    wrongExplain: {
      1: 'Multiplier par lui-même donne \\((\\sqrt a+\\sqrt b)^2=a+b+2\\sqrt{ab}\\) : la racine ne disparaît pas, elle reste sous un terme croisé.',
      2: '\\(\\sqrt{ab}\\) ne fait pas intervenir l’identité \\((x+y)(x-y)=x^2-y^2\\) qui élimine les racines — ce produit ne rationalise rien.',
    },
  },
  {
    id: 'ex15', section: 'algebrique',
    statement: 'Pour rationaliser \\(\\dfrac{1}{\\sqrt{5}+\\sqrt{3}}\\), on multiplie par sa quantité conjuguée. Le nouveau dénominateur, sans racine, est alors :',
    options: ['\\(5 - 3 = 2\\)', '\\(\\sqrt{5} - \\sqrt{3}\\)', '\\(5 + 3 = 8\\)'],
    correctIndex: 0,
    explain: '\\((\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3}) = (\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2\\) — cas particulier de la règle précédente, avec \\(a=5\\) et \\(b=3\\).',
    wrongExplain: {
      1: 'C’est la quantité conjuguée elle-même (encore avec des racines), pas le résultat du produit — après multiplication, les racines doivent disparaître.',
      2: 'Erreur de signe : \\((\\sqrt5+\\sqrt3)(\\sqrt5-\\sqrt3)=(\\sqrt5)^2-(\\sqrt3)^2\\), c’est une SOUSTRACTION (\\(5-3\\)), pas une addition.',
    },
  },
  {
    id: 'ex16', section: 'algebrique',
    statement: 'Si on calcule \\(A^2\\) et qu’on trouve un résultat positif, peut-on en déduire que \\(A\\) est positif ?',
    options: ['Non, il faut déterminer le signe de \\(A\\) séparément', 'Oui, toujours', 'Oui, seulement si \\(A\\) contient une racine carrée'],
    correctIndex: 0,
    explain: '\\(A^2\\) est positif que \\(A\\) le soit ou non (ex : \\((-3)^2=9\\)) — pour retrouver \\(A\\) à partir de \\(A^2\\), il faut d’abord déterminer son signe autrement, puis écrire \\(A=\\sqrt{A^2}\\) ou \\(A=-\\sqrt{A^2}\\) selon le cas. Piège classique (TD Exercice 14 : « Attention, piège ! »).',
    wrongExplain: {
      1: 'C’est le piège classique (TD Exercice 14) : \\((-3)^2=9\\) est positif alors que \\(-3\\) est négatif — un carré positif ne dit rien sur le signe du nombre de départ.',
      2: 'Le problème de signe existe pour N’IMPORTE QUEL \\(A\\) (avec ou sans racine) : dès qu’on élève au carré, l’information de signe est perdue.',
    },
  },
  {
    id: 'ex17', section: 'algebrique',
    statement: 'Pour \\(x \\geq 0\\) et \\(n\\) entier naturel non nul, \\(x^{1/n}\\) désigne :',
    options: ['La racine \\(n\\)-ième de \\(x\\)', '\\(x\\) divisé par \\(n\\)', '\\(x\\) multiplié par \\(1/n\\)'],
    correctIndex: 0,
    explain: 'L’exposant fractionnaire \\(1/n\\) est une autre écriture de la racine \\(n\\)-ième : \\(x^{1/n} = \\sqrt[n]{x}\\). En particulier \\(x^{1/2} = \\sqrt{x}\\).',
    wrongExplain: {
      1: 'On confond ici l’exposant \\(1/n\\) avec une DIVISION de \\(x\\) par \\(n\\) — l’exposant fractionnaire n’est pas une opération sur \\(x\\), c’est une écriture de la racine \\(n\\)-ième.',
      2: 'Même erreur que l’option précédente : \\(1/n\\) en exposant n’est pas un facteur multiplicatif appliqué à \\(x\\), mais une notation pour la racine \\(n\\)-ième.',
    },
  },
  {
    id: 'ex18', section: 'algebrique',
    statement: '\\(8^{1/3}\\) est égal à :',
    options: ['\\(2\\)', '\\(8/3\\)', '\\(\\dfrac{1}{8^3}\\)'],
    correctIndex: 0,
    explain: '\\(8^{1/3}\\) est la racine cubique de 8, le nombre dont le cube vaut 8 : \\(2^3=8\\), donc \\(8^{1/3}=2\\) — cas particulier de la règle précédente.',
    wrongExplain: {
      1: 'Confusion entre l’exposant \\(1/3\\) et une division de 8 par 3 : \\(8^{1/3}\\) est la racine cubique de 8, pas \\(8\\) divisé par \\(3\\).',
      2: 'C’est la formule d’un exposant NÉGATIF (\\(8^{-3}=1/8^3\\)), pas d’un exposant fractionnaire positif comme \\(1/3\\).',
    },
  },
  {
    id: 'ex19', section: 'algebrique',
    statement: 'Les règles habituelles sur les puissances (produit, quotient, puissance d’une puissance) s’appliquent-elles aux exposants fractionnaires ?',
    options: ['Oui, exactement les mêmes règles', 'Non, elles ne marchent que pour les exposants entiers', 'Seulement pour les exposants négatifs'],
    correctIndex: 0,
    explain: '\\(x^{p/n}\\) se manipule avec les mêmes règles que les puissances entières (\\(x^a x^b = x^{a+b}\\), \\((x^a)^b=x^{ab}\\), etc.) — c’est justement l’intérêt de cette écriture plutôt que celle avec des racines, notamment pour simplifier des racines \\(n\\)-ièmes en factorisant en nombres premiers.',
    wrongExplain: {
      1: 'C’est justement l’intérêt de l’écriture en exposant : les mêmes règles (produit, quotient, puissance d’une puissance) restent valables pour un exposant fractionnaire — pas besoin de règles différentes.',
      2: 'Rien ne restreint ces règles aux exposants négatifs : elles s’appliquent à tout exposant, entier, négatif OU fractionnaire.',
    },
  },
  {
    id: 'ex20', section: 'trinome',
    statement: 'Si \\(\\Delta < 0\\), l’équation \\(ax^2+bx+c=0\\) admet, dans \\(\\mathbb{R}\\) :',
    options: ['Aucune solution', 'Une solution', 'Deux solutions'],
    correctIndex: 0,
    explain: 'La forme canonique fait apparaître \\(\\left(x+\\frac{b}{2a}\\right)^2 = \\frac{\\Delta}{4a^2}\\) ; si \\(\\Delta<0\\), le membre de droite est négatif, impossible pour un carré réel.',
    wrongExplain: {
      1: 'Une solution unique correspond à \\(\\Delta=0\\) (racine double), pas à \\(\\Delta<0\\).',
      2: 'Deux solutions correspondent à \\(\\Delta>0\\), pas à \\(\\Delta<0\\) — ici le carré du membre de droite serait négatif, ce qui est impossible.',
    },
  },
  {
    id: 'ex21', section: 'trinome',
    statement: '\\(x\\) et \\(y\\) ont pour somme \\(S\\) et produit \\(P\\) si et seulement s’ils sont racines de :',
    options: ['\\(X^2 - SX + P = 0\\)', '\\(X^2 + SX - P = 0\\)', '\\(X^2 - PX + S = 0\\)'],
    correctIndex: 0,
    explain: '\\((X-x)(X-y) = X^2-(x+y)X+xy = X^2-SX+P\\).',
    wrongExplain: {
      1: 'Erreur de signe des deux côtés : en développant \\((X-x)(X-y)\\), on obtient \\(-SX\\) (pas \\(+SX\\)) et \\(+P\\) (pas \\(-P\\)).',
      2: 'La somme \\(S\\) et le produit \\(P\\) sont inversés : c’est \\(-SX\\) (la somme) et \\(+P\\) (le produit), pas l’inverse.',
    },
  },
  {
    id: 'ex44', section: 'trinome',
    statement: 'Si \\(z\\) est un nombre RÉEL, alors \\(z^2\\) est toujours :',
    options: ['Positif ou nul', 'Négatif ou nul', 'Non nul'],
    correctIndex: 0,
    explain: 'Vrai pour un réel — mais FAUX pour un nombre complexe, où un carré peut être négatif (ex. \\(i^2=-1\\)).',
    wrongExplain: {
      1: 'C’est l’inverse : le carré d’un réel est toujours POSITIF ou nul, jamais négatif (sauf en dehors de \\(\\mathbb{R}\\), pour les nombres complexes).',
      2: '\\(z^2\\) PEUT être nul, quand \\(z=0\\) — cette option exclut à tort ce cas.',
    },
  },
  {
    id: 'ex45', section: 'trinome',
    statement: 'Pour \\(x, y \\in \\mathbb{R}\\), l’équation \\(x^2 = y^2\\) équivaut à :',
    options: ['\\(x=y\\) ou \\(x=-y\\)', '\\(x=y\\) uniquement', '\\(x=|y|\\)'],
    correctIndex: 0,
    explain: 'Piège classique : \\(x^2=y^2\\) ne signifie PAS \\(x=y\\) — il ne faut jamais oublier la solution opposée.',
    wrongExplain: {
      1: 'C’est le piège classique de cet exercice : oublier la solution opposée. Par exemple \\(x=-3\\) et \\(y=3\\) vérifient bien \\(x^2=y^2\\) sans que \\(x=y\\).',
      2: 'Cette écriture impose à tort que \\(x\\) soit positif ou nul — alors que \\(x\\) peut très bien être négatif (ex. \\(x=-y\\)) tout en vérifiant \\(x^2=y^2\\).',
    },
  },
  {
    id: 'ex46', section: 'trinome',
    statement: 'Pour résoudre \\((x-1)^4=(x^2-4x+1)^2\\), la première étape consiste à utiliser :',
    options: [
      '\\(A^2=B^2 \\Leftrightarrow A=B\\) ou \\(A=-B\\)',
      'Le développement direct des deux puissances 4',
      'Une division des deux membres par \\((x-1)^2\\)',
    ],
    correctIndex: 0,
    explain: 'En posant \\(A=(x-1)^2\\) et \\(B=x^2-4x+1\\), l’équation \\(A^2=B^2\\) se ramène à deux équations plus simples, \\(A=B\\) et \\(A=-B\\), sans jamais développer la puissance 4.',
    wrongExplain: {
      1: 'Développer directement des puissances 4 mène à un calcul très long et source d’erreurs — reconnaître la forme \\(A^2=B^2\\) permet de l’éviter complètement.',
      2: 'Diviser par \\((x-1)^2\\) est risqué : si \\((x-1)^2=0\\) est justement une solution, la division l’élimine à tort de l’ensemble des solutions.',
    },
  },
  {
    id: 'ex47', section: 'trinome',
    statement: 'Avant de calculer le discriminant d’une équation comme \\(2x^2+5x=0\\) (terme constant nul), il vaut mieux :',
    options: ['Factoriser par \\(x\\) directement', 'Calculer \\(\\Delta\\) normalement', 'Diviser les deux membres par \\(x\\)'],
    correctIndex: 0,
    explain: 'Diviser par \\(x\\) est dangereux (on perd la solution \\(x=0\\)) ; factoriser par \\(x\\) donne immédiatement \\(x(2x+5)=0\\), donc \\(x=0\\) ou \\(x=-5/2\\), sans discriminant.',
    wrongExplain: {
      1: 'Ce n’est pas faux en soi, mais c’est un détour inutile : factoriser par \\(x\\) donne directement les solutions, sans avoir besoin de calculer \\(\\Delta\\) du tout.',
      2: 'Piège classique : diviser par \\(x\\) suppose implicitement que \\(x\\neq0\\), et fait donc disparaître la solution \\(x=0\\) — il ne faut jamais diviser par une expression qui peut s’annuler.',
    },
  },
  {
    id: 'ex48', section: 'trinome',
    statement: 'Pour un polynôme à coefficients entiers, il est utile de toujours tester en premier si :',
    options: ['\\(1\\) ou \\(-1\\) sont racines', '\\(0\\) est racine', 'Le polynôme est pair'],
    correctIndex: 0,
    explain: 'Remplacer \\(x\\) par \\(1\\) ou \\(-1\\) est le calcul le plus rapide possible — souvent une racine évidente qui permet de factoriser le polynôme et de baisser son degré.',
    wrongExplain: {
      1: 'Tester \\(0\\) ne renseigne que sur le terme constant (racine évidente seulement si ce terme est nul) — \\(1\\) et \\(-1\\) sont des tests plus généralement utiles.',
      2: 'La parité du polynôme ne donne aucune information directe sur ses racines — ce n’est pas un test de racine évidente.',
    },
  },
  {
    id: 'ex49', section: 'trinome',
    statement: 'Un nombre \\(x_1\\) est racine d’un polynôme \\(P\\) si et seulement si :',
    options: ['\\(P(x_1) = 0\\)', '\\(P\'(x_1) = 0\\)', '\\(P(x_1) = x_1\\)'],
    correctIndex: 0,
    explain: 'C’est la définition même d’une racine : le polynôme s’annule en ce point.',
    wrongExplain: {
      1: 'C’est la condition pour un POINT CRITIQUE (extremum) de \\(P\\), pas pour une racine — une racine annule \\(P\\), pas sa dérivée.',
      2: 'C’est la condition pour un POINT FIXE de \\(P\\) (où la courbe croise la droite \\(y=x\\)), pas pour une racine.',
    },
  },
  {
    id: 'ex50', section: 'trinome',
    statement: 'Mettre un trinôme \\(ax^2+bx+c\\) sous forme CANONIQUE consiste à l’écrire sous la forme :',
    options: ['\\(a(x-\\alpha)^2 + \\beta\\)', '\\(a(x-x_1)(x-x_2)\\)', '\\(ax^2+bx+c\\)'],
    correctIndex: 0,
    explain: 'À ne pas confondre avec la forme FACTORISÉE (\\(a(x-x_1)(x-x_2)\\), qui suppose des racines réelles) : la forme canonique fait apparaître un carré parfait, elle existe toujours et permet de lire directement le sommet de la parabole.',
    wrongExplain: {
      1: 'C’est la forme FACTORISÉE (qui suppose des racines réelles), pas la forme canonique — la forme canonique fait apparaître un carré parfait \\((x-\\alpha)^2\\), pas un produit de deux facteurs.',
      2: 'C’est la forme développée de départ, celle qu’on cherche justement à transformer — la forme canonique fait apparaître un carré parfait \\((x-\\alpha)^2+\\beta\\).',
    },
  },
  {
    id: 'ex51', section: 'trinome',
    statement: 'Pour calculer \\(\\Delta=(2(3m+1))^2-4(m+3)^2\\), reconnaître l’identité \\(A^2-B^2=(A-B)(A+B)\\) permet de :',
    options: [
      'Factoriser \\(\\Delta\\) directement sans le développer',
      'Résoudre l’équation sans jamais calculer \\(\\Delta\\)',
      'Éviter tout calcul de discriminant',
    ],
    correctIndex: 0,
    explain: 'Ici \\(A=2(3m+1)\\) et \\(B=2(m+3)\\) : reconnaître cette forme évite un développement long et donne directement \\(\\Delta\\) factorisé, pratique pour trouver quand il s’annule (ex. TD Exercice 11, racine double).',
    wrongExplain: {
      1: 'On calcule quand même \\(\\Delta\\), juste sous une forme déjà factorisée — l’identité ne permet pas de s’en passer complètement, seulement d’éviter un développement long.',
      2: 'Le discriminant est toujours calculé — reconnaître \\(A^2-B^2\\) évite seulement un développement fastidieux, ça ne supprime pas le calcul de \\(\\Delta\\) lui-même.',
    },
  },
  {
    id: 'ex22', section: 'trinome',
    statement: 'La forme factorisée d’un trinôme ayant deux racines réelles \\(x_1, x_2\\) est :',
    options: ['\\(a(x-x_1)(x-x_2)\\)', '\\(a(x+x_1)(x+x_2)\\)', '\\((x-x_1)(x-x_2)\\)'],
    correctIndex: 0,
    explain: 'Le coefficient dominant \\(a\\) doit rester devant le produit des deux facteurs, sinon le développement ne redonne pas le bon trinôme.',
    wrongExplain: {
      1: 'Erreur de signe : ce sont \\(-x_1\\) et \\(-x_2\\) qu’il faut, pas \\(+x_1\\) et \\(+x_2\\) — cette version donnerait, en développant, les racines opposées.',
      2: 'Il manque le coefficient dominant \\(a\\) devant le produit : sans lui, le développement ne redonne pas le bon trinôme (sauf si \\(a=1\\)).',
    },
  },
  {
    id: 'ex23', section: 'explog',
    statement: '\\(\\ln x\\) est défini :',
    options: ['Seulement pour \\(x > 0\\)', 'Pour tout \\(x \\in \\mathbb{R}\\)', 'Seulement pour \\(x \\geq 0\\)'],
    correctIndex: 0,
    explain: 'Le logarithme est la fonction réciproque de l’exponentielle, qui ne prend que des valeurs strictement positives.',
    wrongExplain: {
      1: 'Le logarithme n’est pas défini pour \\(x\\leq0\\) : l’exponentielle (sa fonction réciproque) ne prend jamais de valeurs négatives ou nulles.',
      2: '\\(\\ln 0\\) n’existe pas (tend vers \\(-\\infty\\)) : le domaine de définition est \\(x>0\\), strictement, \\(0\\) exclu.',
    },
  },
  {
    id: 'ex24', section: 'explog',
    statement: '\\(\\ln(ab)\\) est égal à :',
    options: ['\\(\\ln a + \\ln b\\)', '\\(\\ln a \\times \\ln b\\)', '\\(\\ln(a+b)\\)'],
    correctIndex: 0,
    explain: 'Le logarithme transforme les produits en sommes — c’est sa propriété caractéristique.',
    wrongExplain: {
      1: 'Le logarithme transforme un produit en SOMME, pas en produit de logarithmes — cette option confond l’opération d’arrivée.',
      2: '\\(\\ln(a+b)\\) est le logarithme d’une SOMME, une expression différente de \\(\\ln(ab)\\) (logarithme d’un produit).',
    },
  },
  {
    id: 'ex25', section: 'explog',
    statement: '\\(e^{x+y}\\) est égal à :',
    options: ['\\(e^x \\times e^y\\)', '\\(e^x + e^y\\)', '\\(e^{xy}\\)'],
    correctIndex: 0,
    explain: 'L’exponentielle transforme les sommes en produits — propriété inverse de celle du logarithme.',
    wrongExplain: {
      1: 'L’exponentielle transforme une somme en PRODUIT, pas en somme d’exponentielles.',
      2: '\\(e^{xy}\\) correspondrait à \\((e^x)^y\\), pas à \\(e^{x+y}\\) — ce sont deux opérations différentes sur les exposants.',
    },
  },
  {
    id: 'ex26', section: 'derivation',
    statement: 'La dérivée de \\(fg\\) est :',
    options: ['\\(f\'g + fg\'\\)', '\\(f\'g\'\\)', '\\(f\' + g\'\\)'],
    correctIndex: 0,
    explain: 'Règle du produit : chaque facteur est dérivé à tour de rôle, l’autre restant inchangé.',
    wrongExplain: {
      1: 'Erreur très fréquente : la dérivée d’un produit n’est PAS le produit des dérivées — il faut dériver chaque facteur à tour de rôle en gardant l’autre inchangé.',
      2: 'C’est la règle de la dérivée d’une SOMME (\\(f+g\\)), pas d’un produit — les deux règles sont différentes.',
    },
    // Variante u/v (préférence de notation, voir menu → NOTATION) : même
    // règle, mêmes positions de réponses, juste f→u et g→v.
    statementUv: 'La dérivée de \\(uv\\) est :',
    optionsUv: ['\\(u\'v + uv\'\\)', '\\(u\'v\'\\)', '\\(u\' + v\'\\)'],
    explainUv: 'Règle du produit : chaque facteur est dérivé à tour de rôle, l’autre restant inchangé.',
    wrongExplainUv: {
      1: 'Erreur très fréquente : la dérivée d’un produit n’est PAS le produit des dérivées — il faut dériver chaque facteur à tour de rôle en gardant l’autre inchangé.',
      2: 'C’est la règle de la dérivée d’une SOMME (\\(u+v\\)), pas d’un produit — les deux règles sont différentes.',
    },
  },
  {
    id: 'ex27', section: 'derivation',
    statement: 'La dérivée de \\(\\dfrac{f}{g}\\) est :',
    options: ['\\(\\dfrac{f\'g - fg\'}{g^2}\\)', '\\(\\dfrac{f\'g + fg\'}{g^2}\\)', '\\(\\dfrac{f\'}{g\'}\\)'],
    correctIndex: 0,
    explain: 'Règle du quotient : numérateur dérivé fois \\(g\\), moins \\(f\\) fois dénominateur dérivé, le tout sur \\(g^2\\).',
    wrongExplain: {
      1: 'Erreur de signe : c’est un MOINS entre les deux termes du numérateur, pas un plus (à ne pas confondre avec la règle du produit).',
      2: 'La dérivée d’un quotient n’est pas le quotient des dérivées — il faut la formule complète, avec le \\(g^2\\) au dénominateur.',
    },
    statementUv: 'La dérivée de \\(\\dfrac{u}{v}\\) est :',
    optionsUv: ['\\(\\dfrac{u\'v - uv\'}{v^2}\\)', '\\(\\dfrac{u\'v + uv\'}{v^2}\\)', '\\(\\dfrac{u\'}{v\'}\\)'],
    explainUv: 'Règle du quotient : numérateur dérivé fois \\(v\\), moins \\(u\\) fois dénominateur dérivé, le tout sur \\(v^2\\).',
    wrongExplainUv: {
      1: 'Erreur de signe : c’est un MOINS entre les deux termes du numérateur, pas un plus (à ne pas confondre avec la règle du produit).',
      2: 'La dérivée d’un quotient n’est pas le quotient des dérivées — il faut la formule complète, avec le \\(v^2\\) au dénominateur.',
    },
  },
  {
    id: 'ex28', section: 'derivation',
    statement: 'La dérivée de \\((f \\circ g)(x)\\) est :',
    options: ['\\(g\'(x) \\times f\'[g(x)]\\)', '\\(f\'(x) \\times g\'(x)\\)', '\\(f\'[g(x)]\\)'],
    correctIndex: 0,
    explain: 'On dérive de l’intérieur vers l’extérieur : d’abord \\(g\\), puis \\(f\\) évaluée en \\(g(x)\\).',
    wrongExplain: {
      1: 'Cette formule confond composition et produit : il ne faut pas dériver \\(f\\) et \\(g\\) séparément en \\(x\\), mais évaluer \\(f\'\\) au point \\(g(x)\\).',
      2: 'Il manque le facteur \\(g\'(x)\\) : on oublie de dériver la fonction « intérieure » — c’est l’erreur la plus fréquente sur la dérivation composée.',
    },
    statementUv: 'La dérivée de \\((u \\circ v)(x)\\) est :',
    optionsUv: ['\\(v\'(x) \\times u\'[v(x)]\\)', '\\(u\'(x) \\times v\'(x)\\)', '\\(u\'[v(x)]\\)'],
    explainUv: 'On dérive de l’intérieur vers l’extérieur : d’abord \\(v\\), puis \\(u\\) évaluée en \\(v(x)\\).',
    wrongExplainUv: {
      1: 'Cette formule confond composition et produit : il ne faut pas dériver \\(u\\) et \\(v\\) séparément en \\(x\\), mais évaluer \\(u\'\\) au point \\(v(x)\\).',
      2: 'Il manque le facteur \\(v\'(x)\\) : on oublie de dériver la fonction « intérieure » — c’est l’erreur la plus fréquente sur la dérivation composée.',
    },
  },
  {
    id: 'ex29', section: 'trigo',
    statement: '\\(\\cos^2 x + \\sin^2 x\\) est toujours égal à :',
    options: ['\\(1\\)', '\\(0\\)', '\\(2\\)'],
    correctIndex: 0,
    explain: 'C’est le théorème de Pythagore appliqué au cercle trigonométrique de rayon 1.',
    wrongExplain: {
      1: 'Cette identité vaut \\(1\\), pas \\(0\\) — c’est le théorème de Pythagore sur le cercle trigonométrique de rayon 1, pas une différence qui s’annule.',
      2: 'La somme ne dépasse jamais \\(1\\) : sur le cercle trigonométrique de rayon 1, \\(\\cos^2x+\\sin^2x\\) vaut exactement \\(1\\), pas \\(2\\).',
    },
  },
  {
    id: 'ex30', section: 'trigo',
    statement: 'La fonction cosinus est :',
    options: ['Paire', 'Impaire', 'Ni paire ni impaire'],
    correctIndex: 0,
    explain: '\\(\\cos(-x) = \\cos(x)\\) : la courbe est symétrique par rapport à l’axe des ordonnées.',
    wrongExplain: {
      1: 'C’est \\(\\sin\\) (et \\(\\tan\\)) qui est impaire — \\(\\cos(-x)=\\cos(x)\\) montre au contraire que le cosinus est paire.',
      2: 'Le cosinus appartient bien à l’une des deux catégories : \\(\\cos(-x)=\\cos(x)\\) prouve qu’il est paire.',
    },
  },
  {
    id: 'ex31', section: 'trigo',
    statement: 'La fonction tangente est périodique, de période :',
    options: ['\\(\\pi\\)', '\\(2\\pi\\)', '\\(\\pi/2\\)'],
    correctIndex: 0,
    explain: '\\(\\tan(x+\\pi) = \\dfrac{-\\sin x}{-\\cos x} = \\tan x\\) : les deux signes s’annulent, la période est deux fois plus courte que celle de \\(\\sin\\)/\\(\\cos\\).',
    wrongExplain: {
      1: 'C’est la période de \\(\\sin\\) et \\(\\cos\\) — celle de \\(\\tan\\) est deux fois plus courte, car les changements de signe de \\(\\sin\\) et \\(\\cos\\) s’annulent entre eux.',
      2: 'Il n’y a pas de raison que la période soit divisée par 4 par rapport à \\(2\\pi\\) — la bonne valeur, obtenue en vérifiant \\(\\tan(x+\\pi)=\\tan(x)\\), est \\(\\pi\\).',
    },
  },
  {
    id: 'ex32', section: 'sommes',
    statement: '\\(\\displaystyle\\sum_{k=1}^{n} k\\) est égal à :',
    options: ['\\(\\dfrac{n(n+1)}{2}\\)', '\\(\\dfrac{n(n-1)}{2}\\)', '\\(n^2\\)'],
    correctIndex: 0,
    explain: 'C’est la somme des \\(n\\) premiers entiers (formule de Gauss) : on additionne les termes deux par deux (premier+dernier, etc.).',
    wrongExplain: {
      1: 'Cette formule correspond à la somme des \\(n-1\\) premiers entiers, pas des \\(n\\) premiers — attention au \\(+1\\) au numérateur.',
      2: '\\(n^2\\) grandit trop vite : pour \\(n=3\\), la vraie somme \\(1+2+3=6\\) ne vaut pas \\(9=3^2\\).',
    },
  },
  {
    id: 'ex33', section: 'sommes',
    statement: '\\(\\displaystyle\\sum_{k=1}^{n} k^2\\) est égal à :',
    options: ['\\(\\dfrac{n(n+1)(2n+1)}{6}\\)', '\\(\\dfrac{n^2(n+1)}{2}\\)', '\\(\\dfrac{n(n+1)}{2}\\)'],
    correctIndex: 0,
    explain: 'Formule à connaître par cœur, différente de celle de \\(\\sum k\\) (attention à ne pas les confondre).',
    wrongExplain: {
      1: 'Cette formule ne correspond à aucune somme usuelle connue — à ne pas confondre avec celle de \\(\\sum k^3\\), qui vaut \\(\\left(\\frac{n(n+1)}{2}\\right)^2\\), une formule différente.',
      2: 'C’est la formule de \\(\\sum k\\) (les entiers eux-mêmes), pas de \\(\\sum k^2\\) (leurs carrés) — les deux formules sont différentes, à ne pas confondre.',
    },
  },
  {
    id: 'ex34', section: 'sommes',
    statement: 'D’après la formule du binôme, \\((a+b)^n\\) se développe en :',
    options: [
      '\\(\\displaystyle\\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}\\)',
      '\\(\\displaystyle\\sum_{k=0}^{n} a^k + b^{n-k}\\)',
      '\\(n \\cdot a^b\\)',
    ],
    correctIndex: 0,
    explain: 'Chaque terme combine une puissance de \\(a\\), une puissance de \\(b\\) (dont les exposants totalisent \\(n\\)), pondérée par le coefficient binomial.',
    wrongExplain: {
      1: 'Chaque terme de la somme est un PRODUIT \\(a^k b^{n-k}\\) (pondéré par un coefficient binomial), pas une somme \\(a^k+b^{n-k}\\).',
      2: 'Cette expression n’a pas de lien avec le développement du binôme — elle ne fait même pas apparaître de somme sur \\(k\\).',
    },
  },
  {
    id: 'ex35', section: 'factorisation',
    statement: '\\(a^3 - b^3\\) se factorise en :',
    options: ['\\((a-b)(a^2+ab+b^2)\\)', '\\((a-b)(a^2-ab+b^2)\\)', '\\((a+b)(a^2-ab+b^2)\\)'],
    correctIndex: 0,
    explain: 'Attention au signe central : c’est \\(+ab\\) (pas \\(-ab\\)) dans le second facteur pour \\(a^3-b^3\\).',
    wrongExplain: {
      1: 'C’est le signe central de \\(a^3+b^3\\) (avec un \\(-ab\\)) qui est utilisé ici par erreur — pour \\(a^3-b^3\\), c’est \\(+ab\\) au milieu.',
      2: 'C’est la factorisation de \\(a^3+b^3\\) (avec \\((a+b)\\) en facteur), pas de \\(a^3-b^3\\) — les deux identités ont des facteurs différents.',
    },
  },
  {
    id: 'ex36', section: 'factorisation',
    statement: '\\((a+b)^3\\) développé donne :',
    options: ['\\(a^3+3a^2b+3ab^2+b^3\\)', '\\(a^3+b^3\\)', '\\(a^3+3ab^2+b^3\\)'],
    correctIndex: 0,
    explain: 'Les coefficients \\(1,3,3,1\\) correspondent à la ligne \\(n=3\\) du triangle de Pascal.',
    wrongExplain: {
      1: 'Il manque tous les termes croisés (\\(3a^2b\\) et \\(3ab^2\\)) — développer \\((a+b)^3\\) ne se limite pas à élever chaque terme au cube séparément.',
      2: 'Il manque le terme \\(3a^2b\\) : les coefficients \\(1,3,3,1\\) du triangle de Pascal doivent s’appliquer symétriquement aux quatre termes.',
    },
  },
  {
    id: 'ex37', section: 'factorisation',
    statement: '\\(a^n - b^n\\) admet toujours pour facteur :',
    options: ['\\((a-b)\\)', '\\((a+b)\\)', '\\((a^2-b^2)\\)'],
    correctIndex: 0,
    explain: '\\((a-b)\\) divise toujours \\(a^n-b^n\\), quel que soit \\(n\\) — c’est l’identité remarquable générale.',
    wrongExplain: {
      1: '\\((a+b)\\) ne divise \\(a^n-b^n\\) que pour certaines valeurs particulières de \\(n\\) — \\((a-b)\\), lui, divise TOUJOURS \\(a^n-b^n\\), quel que soit \\(n\\).',
      2: '\\((a^2-b^2)\\) n’est un facteur que dans des cas particuliers — la propriété générale, valable pour tout \\(n\\), porte sur \\((a-b)\\) seul.',
    },
  },
  {
    id: 'ex38', section: 'primitives',
    statement: 'La formule d’intégration par parties s’écrit :',
    options: [
      '\\(\\int u\'v = uv - \\int uv\'\\)',
      '\\(\\int u\'v = \\int uv\'\\)',
      '\\(\\int u\'v = uv + \\int uv\'\\)',
    ],
    correctIndex: 0,
    explain: 'On intègre \\(u\'\\) en \\(u\\), et il reste à soustraire l’intégrale de \\(u\\) fois la dérivée de \\(v\\).',
    wrongExplain: {
      1: 'Il manque le terme \\(uv\\) : l’intégration par parties fait toujours apparaître ce terme « tout intégré », en plus de l’intégrale restante.',
      2: 'Erreur de signe : c’est un MOINS entre \\(uv\\) et l’intégrale restante, pas un plus.',
    },
  },
  {
    id: 'ex39', section: 'primitives',
    statement: 'Une primitive de \\(e^x\\) est :',
    options: ['\\(e^x\\)', '\\(xe^x\\)', '\\(e^x/x\\)'],
    correctIndex: 0,
    explain: 'La fonction exponentielle est sa propre dérivée, donc aussi sa propre primitive.',
    wrongExplain: {
      1: 'La dérivée de \\(xe^x\\) est \\(e^x+xe^x\\) (règle du produit), pas \\(e^x\\) — ce n’est donc pas la bonne primitive.',
      2: 'La dérivée de \\(e^x/x\\) fait intervenir la règle du quotient et ne redonne pas \\(e^x\\) — ce n’est pas une primitive de \\(e^x\\).',
    },
  },
  {
    id: 'ex40', section: 'primitives',
    statement: 'Une primitive de \\(\\dfrac{1}{x}\\) sur \\(]0, +\\infty[\\) est :',
    options: ['\\(\\ln x\\)', '\\(\\dfrac{1}{x^2}\\)', '\\(-\\dfrac{1}{x^2}\\)'],
    correctIndex: 0,
    explain: 'Par définition, la dérivée de \\(\\ln x\\) est \\(1/x\\) sur \\(]0,+\\infty[\\) : c’est la primitive de référence.',
    wrongExplain: {
      1: 'La dérivée de \\(1/x^2\\) n’est pas \\(1/x\\) — cette expression n’est pas une primitive correcte de \\(1/x\\).',
      2: 'Ça ressemble plutôt à la dérivée de \\(1/x\\) (à un signe près) — une primitive doit, une fois dérivée, redonner \\(1/x\\), ce qui n’est pas le cas ici.',
    },
  },
  {
    id: 'ex41', section: 'systemes',
    statement: 'Un système linéaire peut avoir :',
    options: [
      'Une solution unique, aucune, ou une infinité',
      'Toujours exactement une solution',
      'Toujours une infinité de solutions',
    ],
    correctIndex: 0,
    explain: 'Selon son rang, un système peut être déterminé (une solution), incompatible (aucune), ou indéterminé (infinité de solutions).',
    wrongExplain: {
      1: 'Un système peut très bien n’avoir AUCUNE solution (équations incompatibles) ou une INFINITÉ (équations redondantes) — ce n’est pas toujours une solution unique.',
      2: 'Un système bien déterminé (rang plein) a une solution UNIQUE, pas une infinité — l’infinité de solutions n’arrive que dans certains cas particuliers.',
    },
  },
  {
    id: 'ex42', section: 'systemes',
    statement: 'Pour résoudre un système linéaire, une méthode standard consiste à :',
    options: [
      'Combiner les équations pour éliminer des inconnues (pivot de Gauss)',
      'Dériver chaque équation terme à terme',
      'Calculer le discriminant du système',
    ],
    correctIndex: 0,
    explain: 'On combine linéairement les équations entre elles pour éliminer une inconnue à la fois, jusqu’à isoler chaque variable.',
    wrongExplain: {
      1: 'Dériver n’a aucun sens pour un système d’équations linéaires (pas de fonction à dériver) — la méthode standard combine les équations entre elles.',
      2: 'La notion de discriminant s’applique aux équations du second degré, pas aux systèmes linéaires — ce n’est pas l’outil adapté ici.',
    },
  },
  {
    id: 'ex43', section: 'systemes',
    statement: 'Quand un système dépend d’un paramètre \\(m\\), on :',
    options: [
      'Discute suivant les valeurs de \\(m\\)',
      'Remplace \\(m\\) par \\(0\\) systématiquement',
      'Ignore \\(m\\)',
    ],
    correctIndex: 0,
    explain: 'Un paramètre libre peut changer la nature du système (unique / aucune / infinité de solutions) selon sa valeur : il faut distinguer les cas.',
    wrongExplain: {
      1: 'Remplacer systématiquement \\(m\\) par \\(0\\) reviendrait à n’étudier qu’un seul cas particulier, en ignorant les autres comportements possibles du système.',
      2: 'Un paramètre ne peut pas être ignoré : sa valeur peut changer complètement la nature du système — il faut au contraire l’étudier avec soin.',
    },
  },
];

const SECTIONS = [
  {
    id: 'algebrique', title: '§1 — FRACTIONS, COEFF. BINOMIAUX, PUISSANCES, RADICAUX',
    cours: 'Fraction : jamais diviser par 0. Somme : mettre au même dénominateur (le plus petit commun). Égalité \\(\\dfrac{a}{b}=\\dfrac{c}{d} \\Leftrightarrow ad=bc\\) (produit en croix). Quotient de deux fractions : \\(\\dfrac{a/b}{c/d} = \\dfrac{ad}{bc}\\)<br>Coefficient binomial : \\(\\binom{n}{p} = \\dfrac{n!}{p!(n-p)!}\\) si \\(0 \\leq p \\leq n\\), \\(=0\\) si \\(p>n\\)<br>Puissances entières : \\(a^m a^n=a^{m+n}\\), \\((a^m)^n=a^{mn}\\), \\((a/b)^n=a^n/b^n\\), \\(a^{-n}=1/a^n\\), \\(a^0=1\\) (\\(a\\neq0\\))<br>Racine carrée : toujours \\(\\geq 0\\), \\(\\sqrt{x^2}=|x|\\), \\(\\sqrt{ab}=\\sqrt{a}\\sqrt{b}\\) (\\(a,b\\geq0\\)). <span class="math">Quantité conjuguée</span> de \\(\\sqrt{a}+\\sqrt{b}\\) : \\(\\sqrt{a}-\\sqrt{b}\\) (leur produit vaut \\(a-b\\), sans racine) — sert à rendre rationnel un dénominateur<br>Puissances fractionnaires : \\(x^{1/n}=\\sqrt[n]{x}\\) (racine \\(n\\)-ième) ; les mêmes règles de puissances s’appliquent avec des exposants fractionnaires',
  },
  {
    id: 'trinome', title: '§2 — TRINÔME DU SECOND DEGRÉ',
    cours: 'Un carré de réel est toujours \\(\\geq 0\\) (faux pour \\(\\mathbb{C}\\)) ; \\(x^2=y^2 \\Leftrightarrow x=\\pm y\\)<br>Avant de calculer \\(\\Delta\\) : chercher une factorisation évidente (par \\(x\\)...) ou une racine évidente (\\(\\pm1\\))<br><span class="math">Discriminant</span> \\(\\Delta\\) : \\(\\Delta>0 \\to\\) 2 solutions, \\(\\Delta=0 \\to\\) 1 solution, \\(\\Delta<0 \\to\\) aucune (dans \\(\\mathbb{R}\\))<br>Forme canonique : \\(a(x-\\alpha)^2+\\beta\\) ; forme factorisée (racines réelles) : \\(a(x-x_1)(x-x_2)\\)<br>\\(x, y\\) racines de \\(X^2-SX+P=0 \\Leftrightarrow x+y=S\\) et \\(xy=P\\)<br>\\(x_1\\) racine de \\(P\\) \\(\\Leftrightarrow\\) \\(P(x_1)=0\\)',
  },
  {
    id: 'explog', title: '§3 — EXPONENTIELLE ET LOGARITHME',
    cours: '\\(\\ln x\\) défini seulement pour \\(x>0\\), \\(\\ln 1 = 0\\), \\(\\ln e = 1\\)<br>\\(\\ln(ab)=\\ln a+\\ln b\\), \\(\\ln(a/b)=\\ln a-\\ln b\\), \\(\\ln(a^r)=r\\ln a\\)<br>\\(e^{x+y}=e^x e^y\\), et \\(a = \\ln b \\Leftrightarrow e^a = b\\)',
  },
  {
    id: 'derivation', title: '§4 — DÉRIVATION',
    cours: '\\((fg)\' = f\'g + fg\'\\)<br>\\(\\left(\\dfrac{f}{g}\\right)\' = \\dfrac{f\'g - fg\'}{g^2}\\)<br>\\((f \\circ g)\'(x) = g\'(x) \\times f\'[g(x)]\\)',
  },
  {
    id: 'trigo', title: '§5 — TRIGONOMÉTRIE',
    cours: '\\(\\cos^2 x + \\sin^2 x = 1\\)<br>\\(\\cos\\) paire, \\(\\sin\\) impaire, \\(\\tan\\) impaire<br>\\(\\cos\\), \\(\\sin\\) : \\(2\\pi\\)-périodiques ; \\(\\tan\\) : \\(\\pi\\)-périodique',
  },
  {
    id: 'sommes', title: '§6 — SOMMES',
    cours: '\\(\\displaystyle\\sum_{k=1}^{n} k = \\dfrac{n(n+1)}{2}\\)<br>\\(\\displaystyle\\sum_{k=1}^{n} k^2 = \\dfrac{n(n+1)(2n+1)}{6}\\)<br>\\((a+b)^n = \\displaystyle\\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}\\)',
  },
  {
    id: 'factorisation', title: '§7 — DÉVELOPPEMENT ET FACTORISATION',
    cours: '\\((a+b)^3 = a^3+3a^2b+3ab^2+b^3\\)<br>\\(a^3+b^3=(a+b)(a^2-ab+b^2)\\), \\(a^3-b^3=(a-b)(a^2+ab+b^2)\\)<br>\\(a^n-b^n=(a-b)(a^{n-1}+a^{n-2}b+\\cdots+b^{n-1})\\)',
  },
  {
    id: 'primitives', title: '§8 — PRIMITIVES',
    cours: '<span class="math">Intégration par parties</span> : \\(\\int u\'v = uv - \\int uv\'\\)<br>Pas de primitive « classique » pour \\(u^n\\), \\(e^u\\), \\(\\sin u\\) si \\(u\\) est une fonction composée<br>Primitive de \\(e^x\\) : \\(e^x\\) ; primitive de \\(1/x\\) : \\(\\ln|x|\\)',
  },
  {
    id: 'systemes', title: '§9 — SYSTÈMES LINÉAIRES',
    cours: 'Résolution par substitution ou combinaison (<span class="math">pivot de Gauss</span>)<br>Un système peut avoir : une solution unique, aucune, ou une infinité<br>Paramètre \\(m\\) \\(\\to\\) discuter suivant sa valeur',
  },
];

initFiche({ STATE_KEY: CHAPTER_STATE_KEYS.calculus, CHAPTER_ID: 'calculus', EXERCISES, SECTIONS });
