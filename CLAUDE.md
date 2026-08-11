# Mémo projet — L1 Maths Synthèse (licence-math)

Notes destinées à Claude Code, relues automatiquement en début de
session sur ce repo. Vient compléter les commentaires déjà très
détaillés en tête de chaque fichier JS — sert surtout à garder les
préférences de Pierre qui ne se déduisent pas juste en lisant le code,
et qui se perdent sinon dans les résumés de contexte des sessions trop
longues (ça a déjà été perdu une fois, cf. ci-dessous).

## Préférences durables de Pierre (ne jamais redemander)

- **Auteurs/références pour les phrases de la mascotte (bulle de
  l'oiseau, taquinerie sur l'absence)** : toujours piocher dans CETTE
  liste précise, ne pas en inventer une autre ni la compléter sans
  demander — Isaac Asimov, Shakespeare, Edgar Allan Poe, Woody Allen,
  Lovecraft, Monty Python. (Donnée le 11/08/2026 — perdue une première
  fois dans un résumé de contexte, redonnée une deuxième fois avec la
  demande explicite de ne plus l'oublier.)

## Système chevalier / dragon — contexte narratif (voir aussi scene.js, weekly.js, creature.js)

- Lore : le chevalier descend du château pour affronter le dragon qui
  vit dans la grotte sous ses fondations — métaphore assumée (on ne se
  bat pas contre quelqu'un d'autre, on va chercher en soi-même quelque
  chose qu'il faut mériter).
- Refonte du 11/08/2026 (livrée) : l'oiseau (`creature.js`) est
  maintenant la mascotte PERMANENTE, ne se transforme plus jamais en
  dragon — il porte la bulle d'alerte d'absence (`bubbleText`,
  inchangée) et une phrase taquine (`BIRD_TEASE_PHRASES`, voix fictive
  unique "Le Scribe aux Six Voix" fondant Asimov/Shakespeare/Poe/
  Lovecraft/Woody Allen/Monty Python — PUNCHLINES COURTES qui
  capturent juste l'ambiance de chacun, jamais une citation/tournure
  reconnaissable d'un auteur précis, retour explicite du 11/08/2026
  après une 1re version jugée trop littérale).
- Le dragon de la semaine (`scene.js`/`renderWeekDragon`) sort de la
  grotte et s'approche un palier par jour, lundi → samedi (voir
  `WEEK_DRAGON_TIERS`) : lundi il est ENDORMI (`DRAGON_SVG`, roulé en
  boule, à peine visible dans le noir de la porte de la grotte) ; à
  partir de mardi il est RÉVEILLÉ ET DEBOUT (`DRAGON_VICTORIOUS_SVG`,
  silhouette dressée, tournée vers la droite — vers le chevalier).
  Combat déclenché samedi minuit (`weekly.js`/`isWeeklyRestDay`,
  dimanche = repos, le score ne bouge plus) ; résultat affiché en
  statique toute la journée de dimanche (`ensureSundayOutcomeShown`,
  réutilise le même drapeau/affichage que le reset du lundi,
  `victory.js` inchangé).
- Semaine calendaire (affichage, countdown "il reste Xj Yh") : lundi →
  dimanche minuit, INCHANGÉE. Seule l'évaluation du combat (score,
  victoire/défaite) s'arrête de facto le samedi minuit — la remise à
  zéro réelle des données reste le lundi comme avant.
- Difficulté adaptative (11/08/2026, livrée) : WEEKLY_THRESHOLD
  (weekly.js) n'est plus une constante à 60% mais varie de ±10 points
  selon les résultats — défaite hebdo OU réinitialisation complète du
  site (les deux comptent pareil, choix explicite) baissent l'objectif
  de la semaine suivante ; une victoire le fait monter. Bornée 30%-90%
  (WEEKLY_THRESHOLD_MIN/MAX).
- Pièces d'armure "forgées" (11/08/2026, livrée) : une pièce n'apparaît
  plus jamais partiellement sur le grand chevalier — rien avant 100%
  de progression hebdo dans le chapitre, entière d'un coup une fois
  atteint (knight.js/renderKnight, `if(fraction<1) return ''`). La
  révélation progressive bas→haut reste sur la petite icône de la
  carte de chapitre (app.js) — mécanisme déjà existant, inchangé, pas
  de nouveau système à construire pour ça.

## Fragilité des positions absolues (retenir pour la suite)

- Principe : ne jamais positionner "en dur" (position absolute + un
  nombre de pixels choisi à l'œil) un élément qui partage son espace
  avec du contenu dont la longueur peut varier (texte, phrases). Ça a
  cassé une fois avec la bulle de l'oiseau (chevauchait le décor du
  dessus) — corrigé en sortant l'élément variable du flux figé plutôt
  qu'en ajustant les coordonnées.
- Vraie cause trouvée pour un bug "lune hors champ" signalé plusieurs
  fois sur mobile (jamais reproduit avec les largeurs testées jusque
  là, ≥320px) : `.scene-plan2 svg` avait une largeur FIXE (280px) qui
  déborde horizontalement sous ~312px de large — un écran plus étroit
  que prévu suffit à décaler tout élément calé sur `right:0` ailleurs
  sur la page. Corrigé (`width:min(280px, calc(100vw - 32px))`).
  Leçon : toujours tester des largeurs sous 320px, pas seulement
  320-430px comme fait jusqu'ici.
- `#sceneMoon` a son `top` calculé depuis la position réelle mesurée
  de `#sceneCastle` (scene.js/`alignSceneMoon`) plutôt que deux
  nombres indépendants en CSS, pour ne plus pouvoir dériver l'un sans
  l'autre silencieusement — position horizontale (`right:0`) laissée
  telle quelle, la vraie cause étant le débordement de plan2 ci-dessus.
