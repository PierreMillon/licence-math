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
   ici, seuls les théorèmes propres aux suites/séries sont repris. */

const EXERCISES = [
  {
    id: 'ex1', section: 'limites',
    statement: 'Si \\(f(x) \\geq 0\\) près de \\(a\\) et \\(\\lim_{x \\to a} f(x) = l\\) existe, alors :',
    options: ['\\(l \\geq 0\\)', '\\(l > 0\\)', '\\(l = 0\\)'],
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
    statement: 'D’après le théorème des valeurs intermédiaires, si \\(f\\) est continue sur \\([a,b]\\) et \\(f(a)f(b) < 0\\), alors :',
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
    options: ['\\(|\\rho| < 1\\) ou \\(\\rho = 1\\)', '\\(\\rho > 0\\)', '\\(|\\rho| \\leq 1\\)'],
    correctIndex: 0,
    explain: 'Attention au cas \\(\\rho=-1\\) (module 1 mais pas convergent) : il faut \\(|\\rho|<1\\) STRICT, sauf le cas particulier \\(\\rho=1\\) (suite constante).',
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
    explain: 'Quel que soit \\(k>0\\), \\(e^n/n^k \\to +\\infty\\) et \\(n^k/\\ln n \\to +\\infty\\) : l’exponentielle l’emporte toujours sur la puissance, qui l’emporte toujours sur le logarithme.',
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
    options: ['\\(|\\rho| < 1\\)', '\\(|\\rho| \\leq 1\\)', '\\(\\rho > 0\\)'],
    correctIndex: 0,
    explain: 'Contrairement à la SUITE géométrique (où \\(\\rho=1\\) « convergeait » aussi, vers une constante), pour la SÉRIE \\(\\rho=1\\) donne \\(\\sum 1 = +\\infty\\) : elle diverge. Quand elle converge, la somme vaut \\(\\dfrac{1}{1-\\rho}\\).',
  },
  {
    id: 'ex36', section: 'series',
    statement: 'La série de Riemann \\(\\sum \\dfrac{1}{n^\\alpha}\\) converge si et seulement si :',
    options: ['\\(\\alpha > 1\\)', '\\(\\alpha \\geq 0\\)', '\\(\\alpha < 1\\)'],
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
    statement: 'D’après la règle de d’Alembert, si \\(\\lim_{n \\to +\\infty} \\left|\\dfrac{u_{n+1}}{u_n}\\right| = L\\) avec \\(L<1\\), alors la série \\(\\sum u_n\\) :',
    options: ['Converge', 'Diverge grossièrement', 'Ne permet aucune conclusion'],
    correctIndex: 0,
    explain: 'Et si \\(L>1\\), la série diverge grossièrement (le terme général ne tend même pas vers 0).',
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
    statement: 'D’après le critère de Cauchy, s’il existe \\(r<1\\) tel que \\(\\sqrt[n]{u_n} < r\\) à partir d’un certain rang, alors \\(\\sum u_n\\) :',
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
    id: 'limites', title: '§1 — LIMITES',
    cours: '\\(\\lim_{x \\to a} f(x) = l\\) : \\(\\forall \\varepsilon>0, \\exists \\alpha>0, |x-a|<\\alpha \\Rightarrow |f(x)-l|<\\varepsilon\\)<br>Limite finie en \\(a\\) \\(\\Rightarrow\\) \\(f\\) localement bornée<br><span class="math">Théorème des gendarmes</span> (encadrement)<br>\\(f \\mathop{\\sim}\\limits_{a} g \\Leftrightarrow \\lim_{x \\to a} f/g = 1\\), et alors mêmes limites',
  },
  {
    id: 'continuite', title: '§2 — CONTINUITÉ',
    cours: '\\(f\\) continue en \\(a\\) \\(\\Leftrightarrow\\) \\(\\lim_{x \\to a} f(x) = f(a)\\)<br><span class="math">Théorème des valeurs intermédiaires</span> : \\(f\\) continue sur \\([a,b]\\), \\(y\\) entre \\(f(a)\\) et \\(f(b)\\) \\(\\Rightarrow\\) \\(\\exists c, f(c)=y\\)<br>\\(f\\) continue sur \\([a,b]\\) \\(\\Rightarrow\\) \\(f\\) bornée et atteint ses bornes',
  },
  {
    id: 'derivation', title: '§3 — DÉRIVATION',
    cours: '\\(f\\) dérivable en \\(a\\) \\(\\Leftrightarrow\\) \\(\\lim_{x \\to a} \\dfrac{f(x)-f(a)}{x-a}\\) existe\\(= f\'(a)\\)<br>Dérivable \\(\\Rightarrow\\) continue (réciproque fausse : \\(|x|\\) en 0)<br><span class="math">Théorème de Rolle</span> : \\(f(a)=f(b)\\) \\(\\Rightarrow\\) \\(\\exists c \\in ]a,b[, f\'(c)=0\\)<br><span class="math">TAF</span> : \\(f(b)-f(a) = (b-a)f\'(c)\\)',
  },
  {
    id: 'usuelles', title: '§4 — FONCTIONS USUELLES (ARCCOS, ARCSIN, ARCTAN)',
    cours: '\\(\\arccos : [-1,1] \\to [0,\\pi]\\), \\(\\arcsin : [-1,1] \\to [-\\pi/2,\\pi/2]\\), \\(\\arctan : \\mathbb{R} \\to \\ ]-\\pi/2,\\pi/2[\\)<br>\\(\\arccos x + \\arcsin x = \\pi/2\\)<br>\\((\\arctan)\'(x) = \\dfrac{1}{1+x^2}\\)',
  },
  {
    id: 'dl', title: '§5 — DÉVELOPPEMENTS LIMITÉS',
    cours: '<span class="math">Taylor-Young</span> : \\(f(t) = \\displaystyle\\sum_{k=0}^{n} \\dfrac{f^{(k)}(a)}{k!}(t-a)^k + o((t-a)^n)\\)<br>DL usuels en 0 : \\(e^x = 1+x+\\dfrac{x^2}{2}+\\cdots\\), \\(\\sin x = x - \\dfrac{x^3}{6}+\\cdots\\), \\(\\cos x = 1 - \\dfrac{x^2}{2}+\\cdots\\)<br>DL \\(\\to\\) équivalent : premier terme non nul du DL',
  },
  {
    id: 'integration', title: '§6 — INTÉGRATION SUR UN SEGMENT',
    cours: '\\(f\\) continue sur \\([a,b]\\) \\(\\Rightarrow\\) \\(F(x)=\\int_a^x f(t)\\,dt\\) est \\(C^1\\) et \\(F\'=f\\)<br>\\(\\int_a^b f(t)\\,dt = \\Phi(b)-\\Phi(a)\\) où \\(\\Phi\\) est une primitive de \\(f\\)<br><span class="math">Relation de Chasles</span> : \\(\\int_u^v f = \\int_u^w f + \\int_w^v f\\)',
  },
  {
    id: 'primitives', title: '§7 — PRIMITIVES',
    cours: 'Primitive de \\(x^\\alpha\\) (\\(\\alpha \\neq -1\\)) : \\(\\dfrac{x^{\\alpha+1}}{\\alpha+1}\\) ; primitive de \\(1/x\\) : \\(\\ln|x|\\)<br><span class="math">Changement de variable</span> : \\(x=\\varphi(t)\\), \\(dx = \\varphi\'(t)\\,dt\\)<br>Deux primitives d’une même fonction diffèrent d’une constante',
  },
  {
    id: 'suites', title: '§8 — SUITES',
    cours: '<span class="math">Suite monotone bornée</span> \\(\\Rightarrow\\) converge ; monotone non bornée \\(\\Rightarrow\\) diverge<br>Géométrique de raison \\(\\rho\\) : converge \\(\\Leftrightarrow |\\rho|<1\\) ou \\(\\rho=1\\)<br>Sous-suites de limites différentes \\(\\Rightarrow\\) divergence ; \\((u_{2n})\\) et \\((u_{2n+1})\\) vers la même limite \\(\\Rightarrow\\) convergence<br><span class="math">Gendarmes</span> : \\(v_n\\leq u_n\\leq w_n\\), \\(v_n,w_n\\to l\\) \\(\\Rightarrow\\) \\(u_n\\to l\\)<br><span class="math">Suites adjacentes</span> : \\(u_n\\) croissante, \\(v_n\\) décroissante, \\(v_n-u_n\\to0\\) \\(\\Rightarrow\\) même limite<br>\\(u_n=o(v_n)\\Leftrightarrow u_n/v_n\\to0\\) ; \\(u_n\\sim v_n\\Leftrightarrow u_n/v_n\\to1\\) (même nature)<br>Croissances comparées : exponentielle \\(\\gg\\) puissance \\(\\gg\\) logarithme',
  },
  {
    id: 'series', title: '§9 — SÉRIES NUMÉRIQUES',
    cours: 'Divergence grossière : \\(u_n\\not\\to0 \\Rightarrow \\sum u_n\\) diverge (condition nécessaire, PAS suffisante)<br><span class="math">Série géométrique</span> \\(\\sum\\rho^n\\) : converge \\(\\Leftrightarrow|\\rho|<1\\), somme \\(=\\dfrac{1}{1-\\rho}\\)<br><span class="math">Série de Riemann</span> \\(\\sum1/n^\\alpha\\) : converge \\(\\Leftrightarrow\\alpha>1\\)<br><span class="math">Séries alternées</span> : \\(u_n\\to0\\) ET \\((u_n)\\) décroissante \\(\\Rightarrow\\) convergence<br>Convergence absolue (\\(\\sum|u_n|\\) CV) \\(\\Rightarrow\\) convergence simple<br><span class="math">d\'Alembert</span> : \\(|u_{n+1}/u_n|\\to L\\) — \\(L<1\\) CV, \\(L>1\\) DV, \\(L=1\\) indéterminé<br><span class="math">Cauchy</span> : \\(\\sqrt[n]{u_n}\\to L\\), même conclusion selon \\(L\\)<br>Comparaison (termes positifs) : \\(0\\leq u_n\\leq v_n\\), \\(\\sum v_n\\) CV \\(\\Rightarrow\\) \\(\\sum u_n\\) CV',
  },
];

initFiche({ STATE_KEY: CHAPTER_STATE_KEYS.analyse, CHAPTER_ID: 'analyse', EXERCISES, SECTIONS });
