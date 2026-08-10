# L1 Maths — Synthétique

Site de révision pour la Licence 1 (mathématiques + logique/programmation), présenté sous forme de terminal pixelisé noir & blanc (pixel-art dessiné à la main, polices Micro 5 / Silkscreen / Jersey 10).

## Stack technique

HTML, CSS et JavaScript vanilla — aucun framework, aucune étape de build, aucun `package.json`. Le rendu des formules mathématiques utilise [KaTeX](https://katex.org), hébergé directement dans le dépôt (`vendor/katex/`) plutôt que chargé depuis un CDN, pour ne dépendre d'aucun service externe au runtime. Les seules ressources externes chargées par le site sont les polices Google Fonts.

## Contenu

- `index.html` / `app.js` — page d'accueil : grille des 8 chapitres, progression globale, scène de combat hebdomadaire chevalier / dragon.
- `style.css` — thème terminal pixelisé (noir & blanc).
- `menu.js` — chargé sur **toutes** les pages : menu tiroir (chapitres triés dynamiquement du moins avancé au plus avancé, avec leur % de complétion), rendu KaTeX partagé (`typesetMath`), préférences de notation, réglage de validation des réponses (`confirmModeEnabled`), clés de state par chapitre (`CHAPTER_STATE_KEYS`), suivi des erreurs fréquentes (`recordMistake`/`loadMistakes`), réinitialisation globale du site.
- `fiches/*.html` + `fiches/*.js` — une fiche de cours par chapitre (Logique, Algèbre, Analyse, Calculus, Probabilités, Statistiques, Java, Python), chacune avec ses exercices interactifs (QCM).
- `fiches/fiche-engine.js` — moteur commun à toutes les fiches (rendu, progression, pagination, réinitialisation).
- `weekly.js` — combat hebdomadaire chevalier / dragon : couche de progression séparée de la progression permanente, remise à zéro chaque lundi (avec compte à rebours avant la remise à zéro).
- `knight.js`, `knight-svgs.js` — système de pièces d'équipement du chevalier, gagnées progressivement par chapitre.
- `creature.js`, `creature-svgs.js`, `scene.js` — mascotte de progression (oiseau qui grossit en dragon si le site n'est pas visité), scène de combat à 4 plans de profondeur par densité de pixels croissante (chevalier/oiseau, campagne/cottage, château/grotte, lune à phase réelle), petit monstre qui traverse l'écran après une pause.
- `victory.js` — scènes de résolution du combat hebdomadaire (victoire / défaite).
- `music.js` — musique de fond adaptative (8-bit héroïque), réglage opt-in (RÉGLAGES, désactivée par défaut) : couches d'instruments débloquées par le combat hebdomadaire ou les séries de bonnes réponses, ordonnancées sur l'horloge Web Audio (jamais au milieu d'une mesure).
- `changelog.html` / `changelog.js` — historique des versions du site.
- `notation.html` / `notation.js` — page RÉGLAGES : 4 préférences par curseur — notation de dérivation (u/v vs f/g), validation des réponses (immédiate ou bouton VALIDER), affichage des fiches (pages découpées ou défilement continu), musique de fond (silence par défaut) — lues par `fiches/fiche-engine.js`, `revision.js` et `music.js`.
- `mistakes.html` / `mistakes.js` — liste des exercices ratés (toutes fiches confondues, triés du plus raté au moins raté), alimentée par `fiches/fiche-engine.js`/`revision.js` à chaque réponse ; point d'entrée vers la révision ciblée.
- `progression.html` / `progression.js` / `progression-page.js` — page MA PROGRESSION : radar de maîtrise par chapitre, détail par chapitre, transfert de progression entre appareils sans compte (phrase à copier-coller, encodage local, rien envoyé à un serveur) — porté du site de Gaël, sans son système de pyramide à paliers.
- `revision.html` / `revision.js` — page RÉVISION CIBLÉE : rejoue les 10 pires exercices de `mistakes.html` tous chapitres confondus, dans un ordre mélangé ; répondre là-bas met à jour la fiche d'origine comme si on y répondait sur place (`writeExerciseResult`, dans `progression.js`).
- `vendor/katex/` — KaTeX auto-hébergé (voir `vendor/katex/LICENSE`, MIT).

## Utilisation

Ouvrir `index.html` dans un navigateur, ou servir le dossier avec n'importe quel serveur statique (`python3 -m http.server`, par exemple). Aucune installation ni build nécessaire. La progression est sauvegardée localement dans le navigateur (`localStorage`) ; aucune donnée n'est envoyée à un serveur.

## Versionnement

Le site utilise un paramètre `?v=N` sur tous les `<link>`/`<script>` locaux pour éviter les problèmes de cache navigateur. `N` correspond à `SITE_VERSION` dans `menu.js` et doit être incrémenté à chaque changement de fichier JS/CSS, en cohérence dans **tous** les fichiers HTML. Le script `scripts/check-versions.sh` (exécuté en CI sur chaque pull request) vérifie cette cohérence.

## CI

`.github/workflows/ci.yml` vérifie, sur chaque pull request vers `main` :
- la syntaxe de tous les fichiers JavaScript (`node -c`) ;
- la synchronisation des `?v=N` avec `SITE_VERSION`.

## Pistes futures (non implémentées)

Notes pour ne pas perdre des idées discutées mais pas encore construites :

- **Cycle de marche du petit monstre qui traverse l'écran** : si
  plusieurs sprites sont fournis (2 à 4 images d'un cycle de pas),
  remplacer l'unique image qui glisse par une vraie animation en
  alternant les sprites à intervalle régulier pendant la traversée.
- **Bruitages enregistrés par l'utilisateur** : remplacer les sons
  synthétisés (Web Audio, générés en direct) par un vrai fichier audio
  (MP3/WAV, quelques secondes) déposé sur le Drive comme les images —
  contrairement aux images, un son de quelques secondes est
  généralement hors de la plage de taille à risque pour le transfert.

## Licence

MIT — voir [LICENSE](LICENSE).
