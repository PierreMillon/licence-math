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
