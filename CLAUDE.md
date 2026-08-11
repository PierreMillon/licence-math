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
- Deux dragons distincts dans le code, ne pas les confondre :
  1. `creature.js` — mascotte d'ABSENCE (oiseau ↔ dragon selon les
     jours sans exercice répondu). Système en cours de refonte (voir
     discussion du 11/08/2026) : le dragon-absence doit céder la place
     à un dragon-semaine (ci-dessous), l'oiseau restant la mascotte
     permanente qui porte la bulle de taquinerie.
  2. `weekly.js` + scène de victoire/défaite (`index.html`) — combat
     hebdomadaire au seuil de 60%, dragon vivant dans la grotte de la
     scène de fond.
- Semaine calendaire (affichage, countdown "il reste Xj Yh") : lundi →
  dimanche minuit. Ne pas confondre avec une éventuelle semaine de
  score plus courte (lundi → samedi) si elle est mise en place —
  vérifier weekly.js et son historique de commits pour l'état actuel.
