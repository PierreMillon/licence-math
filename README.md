# L1 Maths — Synthétique

Site de révision pour la Licence 1 (mathématiques + logique/programmation), présenté sous forme de terminal pixelisé noir & blanc (pixel-art dessiné à la main, polices Micro 5 / Silkscreen / Jersey 10).

## Stack technique

HTML, CSS et JavaScript vanilla — aucun framework, aucune étape de build, aucun `package.json`. Le rendu des formules mathématiques utilise [KaTeX](https://katex.org), hébergé directement dans le dépôt (`vendor/katex/`) plutôt que chargé depuis un CDN, pour ne dépendre d'aucun service externe au runtime. Les seules ressources externes chargées par le site sont les polices Google Fonts.

## Contenu

- `index.html` / `app.js` — page d'accueil : grille des 8 chapitres, progression globale, scène de combat hebdomadaire chevalier / dragon.
- `style.css` — thème terminal pixelisé (noir & blanc).
- `fiches/*.html` + `fiches/*.js` — une fiche de cours par chapitre (Logique, Algèbre, Analyse, Calculus, Probabilités, Statistiques, Java, Python), chacune avec ses exercices interactifs (QCM).
- `fiches/fiche-engine.js` — moteur commun à toutes les fiches (rendu, progression, réinitialisation).
- `weekly.js` — combat hebdomadaire chevalier / dragon : couche de progression séparée de la progression permanente, remise à zéro chaque lundi.
- `knight.js`, `knight-svgs.js` — système de pièces d'équipement du chevalier, gagnées progressivement par chapitre.
- `creature.js`, `creature-svgs.js`, `scene.js` — mascotte de progression (oiseau qui grossit en dragon si le site n'est pas visité), scène de combat (dragon, oiseau, chevalier), petit monstre qui traverse l'écran après une pause.
- `victory.js` — scènes de résolution du combat hebdomadaire (victoire / défaite).
- `changelog.html` / `changelog.js` — historique des versions du site.
- `notation.html` / `notation.js` — préférences de notation (ex. u/v vs f/g pour la dérivation), lues par `fiches/fiche-engine.js`.
- `mistakes.html` / `mistakes.js` — liste des exercices ratés (toutes fiches confondues), alimentée par `fiches/fiche-engine.js` à chaque réponse.
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

- **Lore du décor château/donjon/dragon** : le château doit être centré
  au-dessus des deux personnages (pas à gauche), avec en dessous une
  grotte/donjon qui abrite le dragon — le chevalier descend du château
  pour l'affronter. Métaphore : on ne se bat pas contre quelqu'un
  d'autre, on va chercher en soi-même (le donjon, sous ses propres
  fondations) un trésor qu'il faut mériter par la rigueur — d'où le
  passage du chevalier en couleur (vivant, aujourd'hui) à un
  équipement noir & blanc (tradition, quelque chose de plus ancien
  que soi) au fil de la progression. Le dragon reste à gauche, le
  chevalier à droite, comme actuellement.
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
