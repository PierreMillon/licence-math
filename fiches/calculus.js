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

   §2 complétée une seconde fois le 15/09/2026 (6 questions de plus,
   ids ex52-ex57, section à 17 questions) à partir des mêmes deux
   PDF : le changement de variable (poser \\(X=x^3\\), \\(X=\\sqrt x\\),
   \\(X=x^2\\)) et surtout sa contrainte de signe — un \\(X\\) négatif
   est à rejeter quand \\(X=\\sqrt x\\) ou \\(X=x^2\\), et une racine
   positive en \\(X\\) redonne DEUX valeurs de \\(x\\) ; la condition
   de racine double (\\(\\Delta=0\\)) ; l'usage de somme/produit sur une
   expression symétrique (\\(1/\\alpha+1/\\beta = S/P\\)) sans calculer
   les racines ; et la réduction de puissance via l'équation vérifiée
   par une racine (\\(\\alpha^2=\\alpha+3\\)). Ces questions viennent en
   AJOUT du lot précédent, aucun id existant n'a été renuméroté (même
   réflexe que ci-dessus : CALCULUS est actif, la progression de
   Pierre est déjà stockée en localStorage sous ces ids). */

const EXERCISES = [
  {
    id: 'ex1', section: 'algebrique',
    statement: 'Pour additionner deux fractions \\(\\dfrac{a}{b} + \\dfrac{c}{d}\\), la première étape est de :',
    options: ['Les mettre au même dénominateur', 'Additionner les numérateurs et les dénominateurs séparément', 'Multiplier les deux fractions entre elles'],
    correctIndex: 0,
    explain: 'On ne peut additionner des fractions que si elles ont le même dénominateur — on cherche le plus petit dénominateur commun, pas n’importe quel dénominateur commun, pour garder des calculs simples.',
  },
  {
    id: 'ex2', section: 'algebrique',
    statement: '\\(\\dfrac{a}{b} = \\dfrac{c}{d}\\) (avec \\(b,d \\neq 0\\)) équivaut à :',
    options: ['\\(ad = bc\\)', '\\(a+d = b+c\\)', '\\(a = c\\) et \\(b = d\\)'],
    correctIndex: 0,
    explain: 'C’est le produit en croix : le produit des extrêmes (\\(a\\) et \\(d\\)) égale le produit des moyens (\\(b\\) et \\(c\\)).',
  },
  {
    id: 'ex3', section: 'algebrique',
    statement: '\\(\\dfrac{a/b}{c/d}\\) est égal à :',
    options: ['\\(\\dfrac{a \\times d}{b \\times c}\\)', '\\(\\dfrac{a \\times c}{b \\times d}\\)', '\\(\\dfrac{a+d}{b+c}\\)'],
    correctIndex: 0,
    explain: 'Diviser par une fraction revient à multiplier par son inverse : on obtient le produit des plus éloignés (\\(a\\) et \\(d\\)) sur le produit des plus rapprochés (\\(b\\) et \\(c\\)).',
  },
  {
    id: 'ex4', section: 'algebrique',
    statement: 'Pour \\(0 \\leq p \\leq n\\), le coefficient binomial \\(\\binom{n}{p}\\) vaut :',
    options: ['\\(\\dfrac{n!}{p!(n-p)!}\\)', '\\(\\dfrac{n!}{p!}\\)', '\\(n! - p!\\)'],
    correctIndex: 0,
    explain: 'C’est la définition du coefficient binomial : la factorielle de \\(n\\), divisée par le produit des factorielles de \\(p\\) et de \\(n-p\\).',
  },
  {
    id: 'ex5', section: 'algebrique',
    statement: 'Le coefficient binomial \\(\\binom{n}{p}\\) pour \\(p > n\\) vaut :',
    options: ['\\(0\\)', '\\(1\\)', '\\(n!\\)'],
    correctIndex: 0,
    explain: 'On ne peut pas choisir plus d’éléments \\(p\\) qu’il n’y en a \\(n\\) dans l’ensemble : par convention, le coefficient vaut \\(0\\).',
  },
  {
    id: 'ex6', section: 'algebrique',
    statement: '\\(a^m \\times a^n\\) est égal à :',
    options: ['\\(a^{m+n}\\)', '\\(a^{m \\times n}\\)', '\\(a^{m-n}\\)'],
    correctIndex: 0,
    explain: 'Multiplier deux puissances de même base revient à additionner leurs exposants.',
  },
  {
    id: 'ex7', section: 'algebrique',
    statement: '\\((a^m)^n\\) est égal à :',
    options: ['\\(a^{m \\times n}\\)', '\\(a^{m+n}\\)', '\\(a^{m^n}\\)'],
    correctIndex: 0,
    explain: 'Élever une puissance à une nouvelle puissance revient à multiplier les exposants entre eux.',
  },
  {
    id: 'ex8', section: 'algebrique',
    statement: 'Pour \\(b \\neq 0\\), \\(\\left(\\dfrac{a}{b}\\right)^n\\) est égal à :',
    options: ['\\(\\dfrac{a^n}{b^n}\\)', '\\(\\dfrac{a}{b^n}\\)', '\\(\\dfrac{a^n}{b}\\)'],
    correctIndex: 0,
    explain: 'La puissance d’un quotient est le quotient des puissances : chaque terme (numérateur et dénominateur) est élevé à la puissance \\(n\\) séparément.',
  },
  {
    id: 'ex9', section: 'algebrique',
    statement: 'Pour \\(a \\neq 0\\), \\(a^{-n}\\) est égal à :',
    options: ['\\(\\dfrac{1}{a^n}\\)', '\\(-a^n\\)', '\\(\\dfrac{1}{-a^n}\\)'],
    correctIndex: 0,
    explain: 'Un exposant négatif signifie « inverse » : \\(a^{-n} = 1/a^n\\), ce n’est pas un nombre négatif — parfois plus pratique de garder des puissances négatives que de repasser en fractions.',
  },
  {
    id: 'ex10', section: 'algebrique',
    statement: 'Pour \\(a \\neq 0\\), \\(a^0\\) vaut :',
    options: ['\\(1\\)', '\\(0\\)', '\\(a\\)'],
    correctIndex: 0,
    explain: 'Par convention (cohérente avec \\(a^{n-n}=a^n/a^n=1\\)), tout nombre non nul à la puissance 0 vaut 1.',
  },
  {
    id: 'ex11', section: 'algebrique',
    statement: 'Pour \\(x \\geq 0\\), la racine carrée \\(\\sqrt{x}\\) désigne, par définition :',
    options: ['L’unique nombre positif ou nul dont le carré vaut \\(x\\)', 'N’importe quel nombre dont le carré vaut \\(x\\)', 'Un nombre de même signe que \\(x\\)'],
    correctIndex: 0,
    explain: 'Même quand un nombre négatif a aussi un carré égal à \\(x\\) (ex : \\((-3)^2=9\\)), le symbole \\(\\sqrt{\\ }\\) désigne toujours la racine positive.',
  },
  {
    id: 'ex12', section: 'algebrique',
    statement: '\\(\\sqrt{x^2}\\) est égal à :',
    options: ['\\(|x|\\)', '\\(x\\)', '\\(x^2\\)'],
    correctIndex: 0,
    explain: 'La racine carrée est toujours positive ; si \\(x<0\\), \\(\\sqrt{x^2}=-x=|x|\\), pas \\(x\\) — cas particulier de la règle précédente.',
  },
  {
    id: 'ex13', section: 'algebrique',
    statement: 'Pour \\(a, b \\geq 0\\), \\(\\sqrt{ab}\\) est égal à :',
    options: ['\\(\\sqrt{a} \\times \\sqrt{b}\\)', '\\(\\sqrt{a} + \\sqrt{b}\\)', '\\(\\sqrt{a+b}\\)'],
    correctIndex: 0,
    explain: 'La racine d’un produit est le produit des racines — attention, ce n’est PAS vrai pour une somme : \\(\\sqrt{a+b} \\neq \\sqrt{a}+\\sqrt{b}\\) en général.',
  },
  {
    id: 'ex14', section: 'algebrique',
    statement: 'Pour rendre rationnel un dénominateur de la forme \\(\\sqrt{a} + \\sqrt{b}\\), on multiplie numérateur et dénominateur par :',
    options: ['Sa quantité conjuguée \\(\\sqrt{a} - \\sqrt{b}\\)', '\\(\\sqrt{a} + \\sqrt{b}\\) lui-même', '\\(\\sqrt{a \\times b}\\)'],
    correctIndex: 0,
    explain: 'En multipliant par la quantité conjuguée, on utilise l’identité \\((x+y)(x-y)=x^2-y^2\\) : les racines disparaissent du dénominateur, qui devient \\(a-b\\).',
  },
  {
    id: 'ex15', section: 'algebrique',
    statement: 'Pour rationaliser \\(\\dfrac{1}{\\sqrt{5}+\\sqrt{3}}\\), on multiplie par sa quantité conjuguée. Le nouveau dénominateur, sans racine, est alors :',
    options: ['\\(5 - 3 = 2\\)', '\\(\\sqrt{5} - \\sqrt{3}\\)', '\\(5 + 3 = 8\\)'],
    correctIndex: 0,
    explain: '\\((\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3}) = (\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2\\) — cas particulier de la règle précédente, avec \\(a=5\\) et \\(b=3\\).',
  },
  {
    id: 'ex16', section: 'algebrique',
    statement: 'Si on calcule \\(A^2\\) et qu’on trouve un résultat positif, peut-on en déduire que \\(A\\) est positif ?',
    options: ['Non, il faut déterminer le signe de \\(A\\) séparément', 'Oui, toujours', 'Oui, seulement si \\(A\\) contient une racine carrée'],
    correctIndex: 0,
    explain: '\\(A^2\\) est positif que \\(A\\) le soit ou non (ex : \\((-3)^2=9\\)) — pour retrouver \\(A\\) à partir de \\(A^2\\), il faut d’abord déterminer son signe autrement, puis écrire \\(A=\\sqrt{A^2}\\) ou \\(A=-\\sqrt{A^2}\\) selon le cas. Piège classique (TD Exercice 14 : « Attention, piège ! »).',
  },
  {
    id: 'ex17', section: 'algebrique',
    statement: 'Pour \\(x \\geq 0\\) et \\(n\\) entier naturel non nul, \\(x^{1/n}\\) désigne :',
    options: ['La racine \\(n\\)-ième de \\(x\\)', '\\(x\\) divisé par \\(n\\)', '\\(x\\) multiplié par \\(1/n\\)'],
    correctIndex: 0,
    explain: 'L’exposant fractionnaire \\(1/n\\) est une autre écriture de la racine \\(n\\)-ième : \\(x^{1/n} = \\sqrt[n]{x}\\). En particulier \\(x^{1/2} = \\sqrt{x}\\).',
  },
  {
    id: 'ex18', section: 'algebrique',
    statement: '\\(8^{1/3}\\) est égal à :',
    options: ['\\(2\\)', '\\(8/3\\)', '\\(\\dfrac{1}{8^3}\\)'],
    correctIndex: 0,
    explain: '\\(8^{1/3}\\) est la racine cubique de 8, le nombre dont le cube vaut 8 : \\(2^3=8\\), donc \\(8^{1/3}=2\\) — cas particulier de la règle précédente.',
  },
  {
    id: 'ex19', section: 'algebrique',
    statement: 'Les règles habituelles sur les puissances (produit, quotient, puissance d’une puissance) s’appliquent-elles aux exposants fractionnaires ?',
    options: ['Oui, exactement les mêmes règles', 'Non, elles ne marchent que pour les exposants entiers', 'Seulement pour les exposants négatifs'],
    correctIndex: 0,
    explain: '\\(x^{p/n}\\) se manipule avec les mêmes règles que les puissances entières (\\(x^a x^b = x^{a+b}\\), \\((x^a)^b=x^{ab}\\), etc.) — c’est justement l’intérêt de cette écriture plutôt que celle avec des racines, notamment pour simplifier des racines \\(n\\)-ièmes en factorisant en nombres premiers.',
  },
  {
    id: 'ex20', section: 'trinome',
    statement: 'Si \\(\\Delta < 0\\), l’équation \\(ax^2+bx+c=0\\) admet, dans \\(\\mathbb{R}\\) :',
    options: ['Aucune solution', 'Une solution', 'Deux solutions'],
    correctIndex: 0,
    explain: 'La forme canonique fait apparaître \\(\\left(x+\\frac{b}{2a}\\right)^2 = \\frac{\\Delta}{4a^2}\\) ; si \\(\\Delta<0\\), le membre de droite est négatif, impossible pour un carré réel.',
  },
  {
    id: 'ex21', section: 'trinome',
    statement: '\\(x\\) et \\(y\\) ont pour somme \\(S\\) et produit \\(P\\) si et seulement s’ils sont racines de :',
    options: ['\\(X^2 - SX + P = 0\\)', '\\(X^2 + SX - P = 0\\)', '\\(X^2 - PX + S = 0\\)'],
    correctIndex: 0,
    explain: '\\((X-x)(X-y) = X^2-(x+y)X+xy = X^2-SX+P\\).',
  },
  {
    id: 'ex44', section: 'trinome',
    statement: 'Si \\(z\\) est un nombre RÉEL, alors \\(z^2\\) est toujours :',
    options: ['Positif ou nul', 'Négatif ou nul', 'Non nul'],
    correctIndex: 0,
    explain: 'Vrai pour un réel — mais FAUX pour un nombre complexe, où un carré peut être négatif (ex. \\(i^2=-1\\)).',
  },
  {
    id: 'ex45', section: 'trinome',
    statement: 'Pour \\(x, y \\in \\mathbb{R}\\), l’équation \\(x^2 = y^2\\) équivaut à :',
    options: ['\\(x=y\\) ou \\(x=-y\\)', '\\(x=y\\) uniquement', '\\(x=|y|\\)'],
    correctIndex: 0,
    explain: 'Piège classique : \\(x^2=y^2\\) ne signifie PAS \\(x=y\\) — il ne faut jamais oublier la solution opposée.',
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
  },
  {
    id: 'ex47', section: 'trinome',
    statement: 'Avant de calculer le discriminant d’une équation comme \\(2x^2+5x=0\\) (terme constant nul), il vaut mieux :',
    options: ['Factoriser par \\(x\\) directement', 'Calculer \\(\\Delta\\) normalement', 'Diviser les deux membres par \\(x\\)'],
    correctIndex: 0,
    explain: 'Diviser par \\(x\\) est dangereux (on perd la solution \\(x=0\\)) ; factoriser par \\(x\\) donne immédiatement \\(x(2x+5)=0\\), donc \\(x=0\\) ou \\(x=-5/2\\), sans discriminant.',
  },
  {
    id: 'ex48', section: 'trinome',
    statement: 'Pour un polynôme à coefficients entiers, il est utile de toujours tester en premier si :',
    options: ['\\(1\\) ou \\(-1\\) sont racines', '\\(0\\) est racine', 'Le polynôme est pair'],
    correctIndex: 0,
    explain: 'Remplacer \\(x\\) par \\(1\\) ou \\(-1\\) est le calcul le plus rapide possible — souvent une racine évidente qui permet de factoriser le polynôme et de baisser son degré.',
  },
  {
    id: 'ex49', section: 'trinome',
    statement: 'Un nombre \\(x_1\\) est racine d’un polynôme \\(P\\) si et seulement si :',
    options: ['\\(P(x_1) = 0\\)', '\\(P\'(x_1) = 0\\)', '\\(P(x_1) = x_1\\)'],
    correctIndex: 0,
    explain: 'C’est la définition même d’une racine : le polynôme s’annule en ce point.',
  },
  {
    id: 'ex50', section: 'trinome',
    statement: 'Mettre un trinôme \\(ax^2+bx+c\\) sous forme CANONIQUE consiste à l’écrire sous la forme :',
    options: ['\\(a(x-\\alpha)^2 + \\beta\\)', '\\(a(x-x_1)(x-x_2)\\)', '\\(ax^2+bx+c\\)'],
    correctIndex: 0,
    explain: 'À ne pas confondre avec la forme FACTORISÉE (\\(a(x-x_1)(x-x_2)\\), qui suppose des racines réelles) : la forme canonique fait apparaître un carré parfait, elle existe toujours et permet de lire directement le sommet de la parabole.',
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
  },
  {
    id: 'ex52', section: 'trinome',
    statement: 'Pour résoudre \\(x^6-25x^3+24=0\\), on pose :',
    options: ['\\(X=x^3\\)', '\\(X=x^2\\)', '\\(X=x^6\\)'],
    correctIndex: 0,
    explain: 'On veut se ramener à un trinôme en \\(X\\) : avec \\(X=x^3\\), \\(x^6=(x^3)^2=X^2\\) et l’équation devient \\(X^2-25X+24=0\\). Le bon changement de variable est toujours celui qui rend l’exposant du milieu égal à 1.',
  },
  {
    id: 'ex53', section: 'trinome',
    statement: 'Dans \\(x-7\\sqrt x-8=0\\), on pose \\(X=\\sqrt x\\) et on trouve \\(X^2-7X-8=0\\), de racines \\(8\\) et \\(-1\\). Combien de solutions en \\(x\\) ?',
    options: [
      'Une seule, \\(x=64\\)',
      'Deux, \\(x=64\\) et \\(x=1\\)',
      'Aucune',
    ],
    correctIndex: 0,
    explain: '<b>Piège du changement de variable</b> : \\(X=\\sqrt x\\) est nécessairement \\(\\ge0\\), donc \\(X=-1\\) est à rejeter. Seul \\(X=8\\) donne \\(x=8^2=64\\). Toujours vérifier que la valeur trouvée pour \\(X\\) est compatible avec sa définition.',
  },
  {
    id: 'ex54', section: 'trinome',
    statement: 'Dans \\(x^4-2x^2-2=0\\), on pose \\(X=x^2\\) et on trouve \\(X=1\\pm\\sqrt3\\). Combien de solutions réelles en \\(x\\) ?',
    options: [
      'Deux : \\(x=\\pm\\sqrt{1+\\sqrt3}\\)',
      'Quatre',
      'Aucune',
    ],
    correctIndex: 0,
    explain: 'Même piège que la racine carrée : \\(X=x^2\\ge0\\), or \\(1-\\sqrt3<0\\) est à rejeter. Seul \\(X=1+\\sqrt3\\) survit, et il donne DEUX valeurs de \\(x\\) (\\(\\pm\\sqrt X\\)). Chaque racine positive en \\(X\\) donne deux \\(x\\), une racine nulle en donne une, une racine négative aucune.',
  },
  {
    id: 'ex55', section: 'trinome',
    statement: 'L’équation \\(ax^2+bx+c=0\\) (avec \\(a\\ne0\\)) admet une racine double si et seulement si :',
    options: ['\\(\\Delta=0\\)', '\\(\\Delta>0\\)', '\\(b=0\\)'],
    correctIndex: 0,
    explain: 'La racine double vaut alors \\(-\\dfrac{b}{2a}\\). C’est la condition à poser quand un énoncé demande « pour quelle(s) valeur(s) du paramètre l’équation a-t-elle une racine double ? ».',
  },
  {
    id: 'ex56', section: 'trinome',
    statement: '\\(\\alpha\\) et \\(\\beta\\) sont les racines de \\(x^2-5x+1=0\\). Que vaut \\(\\dfrac1\\alpha+\\dfrac1\\beta\\) ?',
    options: ['\\(5\\)', '\\(\\dfrac15\\)', '\\(-5\\)'],
    correctIndex: 0,
    explain: 'Sans calculer les racines : \\(\\dfrac1\\alpha+\\dfrac1\\beta=\\dfrac{\\alpha+\\beta}{\\alpha\\beta}=\\dfrac SP\\), avec \\(S=5\\) et \\(P=1\\). Tout ce qui est symétrique en \\(\\alpha,\\beta\\) s’exprime avec \\(S\\) et \\(P\\) — bien plus rapide que de passer par \\(\\sqrt\\Delta\\).',
  },
  {
    id: 'ex57', section: 'trinome',
    statement: '\\(\\alpha\\) vérifie \\(\\alpha^2=\\alpha+3\\). Pour calculer \\(\\alpha^4\\), le plus rapide est :',
    options: [
      'Élever \\(\\alpha^2=\\alpha+3\\) au carré, puis réinjecter \\(\\alpha^2=\\alpha+3\\)',
      'Calculer la valeur décimale de \\(\\alpha\\) puis sa puissance 4',
      'Développer \\((\\alpha+3)^4\\)',
    ],
    correctIndex: 0,
    explain: '\\(\\alpha^4=(\\alpha^2)^2=(\\alpha+3)^2=\\alpha^2+6\\alpha+9=(\\alpha+3)+6\\alpha+9=7\\alpha+12\\). L’équation vérifiée par \\(\\alpha\\) sert de règle de réécriture : toute puissance se ramène à une expression de degré 1.',
  },
  {
    id: 'ex22', section: 'trinome',
    statement: 'La forme factorisée d’un trinôme ayant deux racines réelles \\(x_1, x_2\\) est :',
    options: ['\\(a(x-x_1)(x-x_2)\\)', '\\(a(x+x_1)(x+x_2)\\)', '\\((x-x_1)(x-x_2)\\)'],
    correctIndex: 0,
    explain: 'Le coefficient dominant \\(a\\) doit rester devant le produit des deux facteurs, sinon le développement ne redonne pas le bon trinôme.',
  },
  {
    id: 'ex23', section: 'explog',
    statement: '\\(\\ln x\\) est défini :',
    options: ['Seulement pour \\(x > 0\\)', 'Pour tout \\(x \\in \\mathbb{R}\\)', 'Seulement pour \\(x \\geq 0\\)'],
    correctIndex: 0,
    explain: 'Le logarithme est la fonction réciproque de l’exponentielle, qui ne prend que des valeurs strictement positives.',
  },
  {
    id: 'ex24', section: 'explog',
    statement: '\\(\\ln(ab)\\) est égal à :',
    options: ['\\(\\ln a + \\ln b\\)', '\\(\\ln a \\times \\ln b\\)', '\\(\\ln(a+b)\\)'],
    correctIndex: 0,
    explain: 'Le logarithme transforme les produits en sommes — c’est sa propriété caractéristique.',
  },
  {
    id: 'ex25', section: 'explog',
    statement: '\\(e^{x+y}\\) est égal à :',
    options: ['\\(e^x \\times e^y\\)', '\\(e^x + e^y\\)', '\\(e^{xy}\\)'],
    correctIndex: 0,
    explain: 'L’exponentielle transforme les sommes en produits — propriété inverse de celle du logarithme.',
  },
  {
    id: 'ex26', section: 'derivation',
    statement: 'La dérivée de \\(fg\\) est :',
    options: ['\\(f\'g + fg\'\\)', '\\(f\'g\'\\)', '\\(f\' + g\'\\)'],
    correctIndex: 0,
    explain: 'Règle du produit : chaque facteur est dérivé à tour de rôle, l’autre restant inchangé.',
    // Variante u/v (préférence de notation, voir menu → NOTATION) : même
    // règle, mêmes positions de réponses, juste f→u et g→v.
    statementUv: 'La dérivée de \\(uv\\) est :',
    optionsUv: ['\\(u\'v + uv\'\\)', '\\(u\'v\'\\)', '\\(u\' + v\'\\)'],
    explainUv: 'Règle du produit : chaque facteur est dérivé à tour de rôle, l’autre restant inchangé.',
  },
  {
    id: 'ex27', section: 'derivation',
    statement: 'La dérivée de \\(\\dfrac{f}{g}\\) est :',
    options: ['\\(\\dfrac{f\'g - fg\'}{g^2}\\)', '\\(\\dfrac{f\'g + fg\'}{g^2}\\)', '\\(\\dfrac{f\'}{g\'}\\)'],
    correctIndex: 0,
    explain: 'Règle du quotient : numérateur dérivé fois \\(g\\), moins \\(f\\) fois dénominateur dérivé, le tout sur \\(g^2\\).',
    statementUv: 'La dérivée de \\(\\dfrac{u}{v}\\) est :',
    optionsUv: ['\\(\\dfrac{u\'v - uv\'}{v^2}\\)', '\\(\\dfrac{u\'v + uv\'}{v^2}\\)', '\\(\\dfrac{u\'}{v\'}\\)'],
    explainUv: 'Règle du quotient : numérateur dérivé fois \\(v\\), moins \\(u\\) fois dénominateur dérivé, le tout sur \\(v^2\\).',
  },
  {
    id: 'ex28', section: 'derivation',
    statement: 'La dérivée de \\((f \\circ g)(x)\\) est :',
    options: ['\\(g\'(x) \\times f\'[g(x)]\\)', '\\(f\'(x) \\times g\'(x)\\)', '\\(f\'[g(x)]\\)'],
    correctIndex: 0,
    explain: 'On dérive de l’intérieur vers l’extérieur : d’abord \\(g\\), puis \\(f\\) évaluée en \\(g(x)\\).',
    statementUv: 'La dérivée de \\((u \\circ v)(x)\\) est :',
    optionsUv: ['\\(v\'(x) \\times u\'[v(x)]\\)', '\\(u\'(x) \\times v\'(x)\\)', '\\(u\'[v(x)]\\)'],
    explainUv: 'On dérive de l’intérieur vers l’extérieur : d’abord \\(v\\), puis \\(u\\) évaluée en \\(v(x)\\).',
  },
  {
    id: 'ex29', section: 'trigo',
    statement: '\\(\\cos^2 x + \\sin^2 x\\) est toujours égal à :',
    options: ['\\(1\\)', '\\(0\\)', '\\(2\\)'],
    correctIndex: 0,
    explain: 'C’est le théorème de Pythagore appliqué au cercle trigonométrique de rayon 1.',
  },
  {
    id: 'ex30', section: 'trigo',
    statement: 'La fonction cosinus est :',
    options: ['Paire', 'Impaire', 'Ni paire ni impaire'],
    correctIndex: 0,
    explain: '\\(\\cos(-x) = \\cos(x)\\) : la courbe est symétrique par rapport à l’axe des ordonnées.',
  },
  {
    id: 'ex31', section: 'trigo',
    statement: 'La fonction tangente est périodique, de période :',
    options: ['\\(\\pi\\)', '\\(2\\pi\\)', '\\(\\pi/2\\)'],
    correctIndex: 0,
    explain: '\\(\\tan(x+\\pi) = \\dfrac{-\\sin x}{-\\cos x} = \\tan x\\) : les deux signes s’annulent, la période est deux fois plus courte que celle de \\(\\sin\\)/\\(\\cos\\).',
  },
  {
    id: 'ex32', section: 'sommes',
    statement: '\\(\\displaystyle\\sum_{k=1}^{n} k\\) est égal à :',
    options: ['\\(\\dfrac{n(n+1)}{2}\\)', '\\(\\dfrac{n(n-1)}{2}\\)', '\\(n^2\\)'],
    correctIndex: 0,
    explain: 'C’est la somme des \\(n\\) premiers entiers (formule de Gauss) : on additionne les termes deux par deux (premier+dernier, etc.).',
  },
  {
    id: 'ex33', section: 'sommes',
    statement: '\\(\\displaystyle\\sum_{k=1}^{n} k^2\\) est égal à :',
    options: ['\\(\\dfrac{n(n+1)(2n+1)}{6}\\)', '\\(\\dfrac{n^2(n+1)}{2}\\)', '\\(\\dfrac{n(n+1)}{2}\\)'],
    correctIndex: 0,
    explain: 'Formule à connaître par cœur, différente de celle de \\(\\sum k\\) (attention à ne pas les confondre).',
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
  },
  {
    id: 'ex35', section: 'factorisation',
    statement: '\\(a^3 - b^3\\) se factorise en :',
    options: ['\\((a-b)(a^2+ab+b^2)\\)', '\\((a-b)(a^2-ab+b^2)\\)', '\\((a+b)(a^2-ab+b^2)\\)'],
    correctIndex: 0,
    explain: 'Attention au signe central : c’est \\(+ab\\) (pas \\(-ab\\)) dans le second facteur pour \\(a^3-b^3\\).',
  },
  {
    id: 'ex36', section: 'factorisation',
    statement: '\\((a+b)^3\\) développé donne :',
    options: ['\\(a^3+3a^2b+3ab^2+b^3\\)', '\\(a^3+b^3\\)', '\\(a^3+3ab^2+b^3\\)'],
    correctIndex: 0,
    explain: 'Les coefficients \\(1,3,3,1\\) correspondent à la ligne \\(n=3\\) du triangle de Pascal.',
  },
  {
    id: 'ex37', section: 'factorisation',
    statement: '\\(a^n - b^n\\) admet toujours pour facteur :',
    options: ['\\((a-b)\\)', '\\((a+b)\\)', '\\((a^2-b^2)\\)'],
    correctIndex: 0,
    explain: '\\((a-b)\\) divise toujours \\(a^n-b^n\\), quel que soit \\(n\\) — c’est l’identité remarquable générale.',
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
  },
  {
    id: 'ex39', section: 'primitives',
    statement: 'Une primitive de \\(e^x\\) est :',
    options: ['\\(e^x\\)', '\\(xe^x\\)', '\\(e^x/x\\)'],
    correctIndex: 0,
    explain: 'La fonction exponentielle est sa propre dérivée, donc aussi sa propre primitive.',
  },
  {
    id: 'ex40', section: 'primitives',
    statement: 'Une primitive de \\(\\dfrac{1}{x}\\) sur \\(]0, +\\infty[\\) est :',
    options: ['\\(\\ln x\\)', '\\(\\dfrac{1}{x^2}\\)', '\\(-\\dfrac{1}{x^2}\\)'],
    correctIndex: 0,
    explain: 'Par définition, la dérivée de \\(\\ln x\\) est \\(1/x\\) sur \\(]0,+\\infty[\\) : c’est la primitive de référence.',
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
  },
];

const SECTIONS = [
  {
    id: 'algebrique', title: '§1 — FRACTIONS, COEFF. BINOMIAUX, PUISSANCES, RADICAUX',
    cours: 'Fraction : jamais diviser par 0. Somme : mettre au même dénominateur (le plus petit commun). Égalité \\(\\dfrac{a}{b}=\\dfrac{c}{d} \\Leftrightarrow ad=bc\\) (produit en croix). Quotient de deux fractions : \\(\\dfrac{a/b}{c/d} = \\dfrac{ad}{bc}\\)<br>Coefficient binomial : \\(\\binom{n}{p} = \\dfrac{n!}{p!(n-p)!}\\) si \\(0 \\leq p \\leq n\\), \\(=0\\) si \\(p>n\\)<br>Puissances entières : \\(a^m a^n=a^{m+n}\\), \\((a^m)^n=a^{mn}\\), \\((a/b)^n=a^n/b^n\\), \\(a^{-n}=1/a^n\\), \\(a^0=1\\) (\\(a\\neq0\\))<br>Racine carrée : toujours \\(\\geq 0\\), \\(\\sqrt{x^2}=|x|\\), \\(\\sqrt{ab}=\\sqrt{a}\\sqrt{b}\\) (\\(a,b\\geq0\\)). <span class="math">Quantité conjuguée</span> de \\(\\sqrt{a}+\\sqrt{b}\\) : \\(\\sqrt{a}-\\sqrt{b}\\) (leur produit vaut \\(a-b\\), sans racine) — sert à rendre rationnel un dénominateur<br>Puissances fractionnaires : \\(x^{1/n}=\\sqrt[n]{x}\\) (racine \\(n\\)-ième) ; les mêmes règles de puissances s’appliquent avec des exposants fractionnaires',
  },
  {
    id: 'trinome', title: '§2 — TRINÔME DU SECOND DEGRÉ',
    cours: 'Un carré de réel est toujours \\(\\geq 0\\) (faux pour \\(\\mathbb{C}\\)) ; \\(x^2=y^2 \\Leftrightarrow x=\\pm y\\)<br>Avant de calculer \\(\\Delta\\) : chercher une factorisation évidente (par \\(x\\)...) ou une racine évidente (\\(\\pm1\\))<br><span class="math">Discriminant</span> \\(\\Delta\\) : \\(\\Delta>0 \\to\\) 2 solutions, \\(\\Delta=0 \\to\\) 1 solution, \\(\\Delta<0 \\to\\) aucune (dans \\(\\mathbb{R}\\))<br>Forme canonique : \\(a(x-\\alpha)^2+\\beta\\) ; forme factorisée (racines réelles) : \\(a(x-x_1)(x-x_2)\\)<br>\\(x, y\\) racines de \\(X^2-SX+P=0 \\Leftrightarrow x+y=S\\) et \\(xy=P\\)<br>\\(x_1\\) racine de \\(P\\) \\(\\Leftrightarrow\\) \\(P(x_1)=0\\)<br><span class="math">Changement de variable</span> : poser \\(X=x^n\\) ou \\(X=\\sqrt x\\) ramène à un trinôme en \\(X\\) — vérifier que chaque \\(X\\) trouvé respecte sa contrainte de signe avant de revenir à \\(x\\)',
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
