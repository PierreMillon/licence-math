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

## Format des notes de version (ne jamais redemander)

- Très court, juste le "quoi", jamais le "comment"/"pourquoi" (donné le
  11/08/2026, appliqué rétroactivement aux entrées v117-121 en plus
  des suivantes). Exemple donné par Pierre : « Bulle de l'oiseau
  redessinée façon bande dessinée : fond noir, bord et texte blancs —
  fusionne le marqueur d'absence et la phrase taquine, qui alternent
  au hasard » devient « Bulle de l'oiseau redessinée avec phrase
  taquine ». Une poignée de mots par ligne, pas une phrase complète.
  Les versions plus anciennes que 117 n'ont pas été reprises (pas
  demandé explicitement, risque de perte d'info sans gain réel vu
  qu'elles sont peu consultées) — à refaire sur demande explicite si
  besoin un jour.

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
- Lune en "éclipse à deux cercles" (11/08/2026, demande explicite,
  livrée) : remplace le clip-path (inset) par deux disques identiques
  superposés — `.moon-disc` (blanc, fixe) et `.moon-occluder` (couleur
  du fond, glisse via `translateX`). Décalé à 100% de sa largeur =
  disque entièrement visible (pleine lune) ; décalé à 0% = parfaitement
  superposé = disque entièrement recouvert (nouvelle lune). Donne un
  vrai croissant (intersection de deux cercles), pas un rectangle
  coupé droit. `applyMoonPhase()` (scene.js) pose juste le %.
- Bulle de l'oiseau redessinée façon BD (11/08/2026, demande
  explicite, livrée) : fond noir opaque + bord blanc + texte blanc
  (avant : texte rouge sur fond transparent). Fusionne ce qui étaient
  DEUX blocs séparés (le marqueur d'absence `bubbleText` — "?"/"!"/
  "×N" — et la phrase taquine `BIRD_TEASE_PHRASES`) en une seule bulle
  `#creatureBubble`, qui alterne au hasard (50/50, une fois par
  rendu) entre les deux. `#creatureTease` retiré (n'existe plus).
  Piège CSS rencontré : `width:max-content` + `max-width` sur la bulle
  ne suffit pas à faire wrapper le contenu correctement (le texte
  débordait de son propre cadre) — retiré `width:max-content`, gardé
  seulement `max-width` (avec un plafond `calc(100vw - 24px)` en plus,
  leçon de la fragilité des positions absolues ci-dessus).
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
- Même technique appliquée à `#scenePlan2` (11/08/2026) :
  `alignScenePlan2()` centre la bande verticalement entre le bas
  mesuré du château et le bas mesuré des pieds du chevalier, plutôt
  qu'un `top` fixe. Largeur aussi passée de fixe (280px) à 100% du
  conteneur (`.battle-scene`, déjà dans la marge standard du site via
  le padding de `.crt` — pas besoin d'un décalage propre à plan2).
  Signalé une nouvelle fois "trop bas" par Pierre après coup (pas
  reproduit malgré vérification mathématique exacte via
  getBoundingClientRect) — implémentation laissée telle quelle
  (vérifiée correcte), à reconfirmer sur son appareil réel.
- **Nouvelle classe de bug trouvée le 11/08/2026 : `min-width:auto`
  par défaut sur les enfants directs d'un flex container.** `.crt`
  est `display:flex; flex-direction:column` — n'importe quel
  descendant contenant un texte non cassable (ex. une longue chaîne
  jointe par des `/` sans espaces, comme "Asimov/Shakespeare/...")
  peut floorer la largeur de TOUTE la page, même à travers plusieurs
  niveaux d'ancêtres, même avec `overflow:hidden` posé sur l'élément
  fautif lui-même (ça ne suffit pas : il faut `min-width:0` sur
  l'ITEM FLEX réel, qui peut être plusieurs niveaux au-dessus).
  Corrigé par une règle générale `.crt > *{ min-width:0; }` plutôt
  que du cas par cas. Un `max-width + margin:auto` sans `width:100%`
  explicite a le même symptôme (shrink-to-fit au lieu de stretch) —
  corrigé sur `.changelog`, `.demo-wrap`, `.mistakes-page`,
  `.notation-page`, `.progression-page`, `.revision-page`. Et pour le
  contenu : toujours mettre un espace autour des `/` dans une liste
  jointe (ex. "Asimov / Shakespeare"), sinon c'est un seul "mot"
  incassable pour le navigateur — `overflow-wrap:anywhere` posé sur
  `.changelog__desc` en filet de sécurité pour la suite.

## PWA (icône écran d'accueil + pull-to-refresh)

- Icône d'écran d'accueil (11/08/2026) : générée à partir de
  `BIRD_SVG` (creature-svgs.js), pas dessinée à part — carré noir +
  silhouette de l'oiseau (contour blanc aux grandes tailles 180/192/
  512px, silhouette pleine blanche aux petites tailles 16/32px où le
  contour fin devient illisible). Fichiers dans `icons/`, référencés
  par `manifest.json` (racine) et par un bloc de balises `<head>`
  identique sur toutes les pages (`apple-touch-icon`, favicons,
  `apple-mobile-web-app-capable`, `theme-color`). Si l'oiseau change
  de dessin un jour, les icônes ne se régénèrent pas toutes seules —
  il faudra relancer le script de rendu (voir session du 11/08/2026).
- Pull-to-refresh (11/08/2026) : `pwa.js`, nouveau fichier, chargé sur
  toutes les pages juste après menu.js. Ne s'active QUE si le site
  tourne en mode « ajouté à l'écran d'accueil » (`navigator.standalone`
  ou `display-mode:standalone`) — sur un onglet de navigateur classique
  le spinner natif suffit déjà, pas de doublon. Geste suivi au doigt
  (touchstart/touchmove/touchend), seuil 70px avant que le relâchement
  déclenche `location.reload()`. La pièce n'anime (spin CSS accéléré)
  qu'à partir de 35% du seuil de tir (`SPIN_START_FRACTION`), pas dès
  le premier pixel de glissement — sinon ça tournait au rythme du
  doigt au lieu de tourner "toute seule" comme une toupie. Ignore le
  geste si une sélection de texte est en cours (`hasActiveSelection`)
  ou si le toucher démarre sur une zone qui a déjà son propre geste
  tactile (`PULL_REFRESH_IGNORE_SELECTOR` : barre de progression,
  zones `data-tooltip`) — sinon les deux gestes se déclenchent en même
  temps.

## Boutons fixes tout en bas d'écran inertes au tactile réel (11/08/2026)

- Signalé : appui sur l'épée (`.scroll-top-btn`, bas-droite) sans aucune
  réaction visuelle, uniquement sur iPhone réel, jamais reproduit en
  simulation (clic programmatique Playwright fonctionnait très bien,
  y compris coordonnée brute + `elementsFromPoint`). "Aucune réaction
  du tout" (pas même le flash au toucher) pointe vers un toucher qui
  n'atteint jamais la page plutôt qu'un bug de handler JS.
- Hypothèse retenue (pas confirmée à 100%, mais corrigée par prudence
  car sans coût) : `.scroll-top-btn` et `.version-badge` étaient à
  `bottom:14px`, hauteur 42px — leur bord bas ne finit qu'à ~56px du
  bord réel de l'écran. Sur un iPhone à indicateur d'accueil (sans
  bouton physique), iOS réserve ~34px tout en bas pour le geste
  "glisser pour revenir à l'accueil" — un appui qui atterrit dedans
  peut être intercepté par le système avant même d'arriver à la page.
- Corrigé avec `bottom:calc(14px + env(safe-area-inset-bottom))` sur
  ces deux boutons (0 sur navigateur classique, la vraie hauteur de la
  zone réservée en PWA plein écran sur iPhone à encoche/indicateur).
  Nécessite `viewport-fit=cover` dans le `<meta viewport>` de TOUTES
  les pages, sinon `env(safe-area-inset-bottom)` vaut toujours 0 et le
  correctif ne fait rien — ajouté aux 15 pages en même temps.
  `.wander-monster` (décoratif, non cliquable) avait été laissé tel
  quel à l'époque, pas concerné puisqu'il n'y avait rien à taper
  dessus — fonctionnalité retirée depuis (voir plus bas), la remarque
  ne s'applique donc plus qu'à titre historique.

## `preventDefault()` sur `touchstart` bloque les clics des enfants (11/08/2026)

- Trouvé sur `#exoProgressBar` (tooltips.js) : un `touchstart` qui
  appelle `e.preventDefault()` pour ouvrir une infobulle tactile
  supprime aussi l'événement `click` synthétique que le navigateur
  aurait généré ensuite — donc TOUT bouton/lien à l'intérieur de cette
  zone devient injoignable au tactile, même si rien dans le code ne
  cible ce bouton explicitement. `tooltips.js` ignore maintenant
  `preventDefault()` (et le déclenchement de l'infobulle) dès que la
  cible du toucher est/contient `button, a, input, select, textarea`
  — règle générale, pas un correctif au cas par cas. Par prudence et
  parce que c'était redondant avec le texte déjà affiché en dessous,
  l'infobulle d'`#exoProgressBar` a aussi été retirée complètement.
  Après ce nettoyage il ne reste qu'UNE seule zone `data-tooltip` sur
  le site : le dragon de la semaine (`#sceneDragon`) — choix explicite
  de Pierre après une liste de toutes les infobulles créées cette
  session (réponse : tout retirer sauf celle-là).
- Encore une instance de `min-width:auto` (voir plus haut) : la boîte
  de formule scrollable (`.math-scroll`) était en `inline-flex`/
  `inline-block` sans `min-width:0`, donc débordait de son cadre au
  lieu de scroller dedans. Passée en `display:block; width:100%;
  min-width:0`. Au passage, l'icône "↔" qui indiquait "ça scrolle" a
  été retirée (demande explicite, deux captures annotées à l'appui) :
  le cadre en pointillés déborde maintenant jusqu'au bord du cadre de
  page, ce débordement visuel suffit à suggérer qu'on peut glisser
  dedans — pas besoin d'une icône séparée.

## Zoom (pincement/double-tap) désactivé (11/08/2026, décision inversée)

- Une décision précédente (10/08/2026) avait explicitement gardé le
  zoom actif. Pierre est revenu dessus après un exemple concret sur
  iPhone (le re-zoom retombe au mauvais endroit, gênant) : zoom
  désormais désactivé partout (`maximum-scale=1.0,
  user-scalable=no` dans le `<meta viewport>` des 15 pages, et
  `pinch-zoom` retiré des valeurs `touch-action`). Si Pierre redemande
  un jour à le réactiver, c'est un aller-retour déjà fait une fois,
  pas une nouveauté à re-designer.
- Question ouverte non résolue côté accessibilité : le réglage iOS
  système « Taille du texte » (Dynamic Type) ne s'applique pas au
  contenu web classique comme il s'applique aux apps natives — ce
  n'est pas un bug corrigible par du CSS/JS côté site, c'est une
  limite de la plateforme. Expliqué à Pierre le 11/08/2026.

## État hebdo vs état "vie entière" — piège pour tout ce qui touche à la progression

- Le site a DEUX couches de state par chapitre : le state "vie
  entière" (`CHAPTER_STATE_KEYS`/`l1maths_progress`, menu.js/
  progression.js) et le state "hebdo" (`weeklyStateKey(chapterId)`/
  `WEEKLY_PROGRESS_KEY`, weekly.js) dont dépendent les pièces
  d'armure et le score du combat de la semaine. Écrire dans l'une
  sans l'autre les désynchronise silencieusement. Trouvé sur l'import
  de code de progression (`progression.js`/`applyChapterLevel`) qui
  ne mettait à jour QUE le state vie entière — l'armure ne se
  reconstituait jamais après un import. Corrigé en écrivant les deux
  systématiquement à cet endroit. Réflexe à avoir pour toute future
  fonctionnalité qui touche la progression par chapitre : vérifier
  si elle doit aussi toucher la couche hebdo.
- L'export/import (mot de passe-phrase) inclut maintenant aussi les
  préférences de réglages (`l1maths_notation` — dérivation u/v vs
  f/g, confirmation de réponse, mode page/continu, musique), packées
  dans un 9e "code" ajouté après les 8 codes de chapitres. Rétro-
  compatible : une ancienne phrase n'a simplement pas ce 9e code
  (`decoded.codes[8] === undefined`), donc rien n'essaie de
  l'appliquer.
- Même mécanisme étendu à un 10e code (11/08/2026) : la pile de
  crânes vie entière (`l1maths_skull_pile`, réinitialisations
  complètes du site) est maintenant exportée elle aussi, plafonnée à
  15 (une seule pile visible reste lisible au-delà, perdre le compte
  exact n'a pas d'impact pratique). Choix explicite : seule la pile
  vie entière est exportée, PAS les pertes/victoires hebdomadaires
  (`creatureLosses`/`knightCoins`, weekly.js) — elles se
  réinitialisent de toute façon chaque lundi, les exporter n'aurait
  aucun sens. Lu/écrit directement en localStorage dans
  `progression.js` plutôt que via `window.loadSkullPile()`
  (creature.js) : `progression.js` tourne aussi sur des pages qui ne
  chargent pas creature.js (`progression.html`), pas de dépendance de
  chargement de script à gérer.

## Mesure de largeur AVANT que les polices custom soient chargées (11/08/2026)

- Bug réel trouvé (signalé par Pierre, capture à l'appui) : une
  formule KaTeX dans une option de QCM débordait complètement de
  l'écran (texte coupé net au bord), et le geste pour la faire
  glisser déplaçait TOUTE LA PAGE horizontalement au lieu de rester
  contenu dans le petit cadre prévu — l'écran restait ensuite décalé,
  plus moyen de scroller normalement.
- Cause : `wrapOverflowingMath()` (menu.js) décide d'envelopper une
  formule dans `.math-scroll` en comparant sa largeur mesurée à celle
  de son conteneur — mais si cette mesure a lieu AVANT que Jersey 10
  (police custom, plus large que la police de secours) soit
  effectivement chargée (`font-display: optional` dans le lien
  Google Fonts), la formule "tient" au moment du calcul avec la
  police de secours étroite, puis déborde une fois Jersey 10 en place
  — sans jamais se faire rattraper, puisque `wrapOverflowingMath` ne
  revient jamais sur ce qu'il a déjà jugé correct.
- Corrigé en rejouant `wrapOverflowingMath` une seconde fois une fois
  `document.fonts.ready` résolu (dans `typesetMath`, menu.js) — la
  fonction ignore déjà ce qui est correctement enveloppé, donc ce
  second passage ne fait rien sur ce qui était déjà bon, et rattrape
  ce qui a été mal jugé au premier passage.
- Pas confirmé à 100 % comme LA cause exacte (comportement de
  `font-display:optional` notoirement variable entre moteurs/versions
  iOS), mais correction sans risque et qui couvre exactement cette
  classe de problème — à garder si le symptôme réapparaît.

## Point orphelin après une formule dans les textes d'explication (11/08/2026)

- Trouvé (signalé par Pierre, capture à l'appui) : certaines phrases
  `explain` se terminaient par `\)."`  — un point juste après le
  délimiteur de fermeture LaTeX, donc EN DEHORS de la formule, en
  texte normal. Invisible tant que la formule tient sur une ligne
  (le point suit juste derrière) ; mais dès que la formule est assez
  large pour être enveloppée dans `.math-scroll` (devient un bloc),
  ce point se retrouve seul sur la ligne suivante, orphelin.
  29 occurrences trouvées (`probabilites.js`, `statistiques.js`,
  uniquement ces deux fichiers) — point supprimé partout par recherche
  globale (`\).` en fin de chaîne → `\)`), aucune n'avait de texte
  après le point donc aucun risque de casser une phrase plus longue.
  Réflexe pour du contenu futur : ne jamais mettre de ponctuation
  juste après un `\)` fermant si la formule peut potentiellement
  déborder — soit la mettre DANS la formule, soit la retirer.

## Rythme du cœur du menu (11/08/2026, demande explicite)

- Idée initiale de Pierre (capteur de bruit ambiant ou capteur de
  vibrations du téléphone pour capter le vrai rythme cardiaque) —
  expliqué que la vraie technique pour ça sur téléphone est
  caméra+flash (PPG), pas l'accéléromètre, et que dans tous les cas
  ça demande une permission caméra/micro pour un simple détail
  décoratif — jugé disproportionné, pas implémenté.
- Version retenue à la place (bien plus simple, pas de capteur) : le
  rythme varie selon le taux de bonnes réponses réel du site
  (correct/répondu, toutes fiches confondues — PAS la complétion/
  progression, juste la précision). 0% ou pas encore de données =
  rythme "pas sportif" (88 BPM) ; 100% = rythme "sportif au repos"
  (50 BPM). `computeAccuracyPercent()`/`applyHeartRate()` dans
  menu.js (chargé partout, contrairement à weekly.js/CHAPTER_TOTALS
  absents de changelog/mistakes/notation.html) — lit directement
  `l1maths_progress`, ne dépend d'aucun total par chapitre donc
  fonctionne identiquement sur toutes les pages sans dégradation à
  gérer. `animation-duration` posé en `style.` inline par-dessus le
  raccourci CSS `animation:` existant (même technique déjà utilisée
  pour la pièce du pull-to-refresh).

## Espaces vides dans la scène + pied de page recouvert par les boutons du bas (11/08/2026)

- Signalé (captures annotées à l'appui) : deux grands espaces vides
  dans la scène de combat (au-dessus du château, et entre le texte du
  combat hebdo et le pied de page), plus le texte de fin de page qui
  passait sous les boutons fixes du bas sur iPhone en scroll normal
  (le contournement manuel de Pierre : tirer un peu la page vers le
  bas avec le doigt pour "lever" artificiellement le contenu au-delà
  du rebond élastique iOS — pas praticable au quotidien).
- Cause de l'espace au-dessus du château : `.scene-castle{top:90px}`
  (poussé vers le bas le 10/08/2026 pour rapprocher château+lune des
  personnages) alors que `.battle-scene{padding-top:152px}` réservait
  toujours autant de place qu'avant ce décalage — un vide de 90px
  entre le haut de la scène et le château. Corrigé en réduisant les
  deux du même écart (90px→20px et 152px→82px) pour garder EXACTEMENT
  le même chevauchement château/personnages qu'avant (calculé :
  toujours 59,4px), juste sans le vide au-dessus. Leçon : quand deux
  valeurs sont liées (un offset + une réserve d'espace dimensionnée
  pour cet offset), les retoucher séparément au fil des sessions finit
  par les désynchroniser silencieusement.
- Cause du pied de page recouvert : `.crt` (le conteneur flex qui
  encadre toute la page) n'avait que 48px de padding-bottom — pas
  assez pour dégager `.scroll-top-btn`/`.version-badge` (42px de haut,
  `bottom:14px + env(safe-area-inset-bottom)`, cf. leçon plus haut sur
  ces mêmes boutons). Corrigé en portant le padding-bottom de `.crt` à
  `calc(84px + env(safe-area-inset-bottom))` — dégage largement les
  boutons quel que soit l'appareil, pas seulement les iPhone à
  indicateur d'accueil.

## Petit monstre errant retiré + dragon caché derrière la barrière (11/08/2026)

- Retiré sur demande explicite : le petit monstre qui traversait
  l'écran après 3 minutes d'inactivité (`.wander-monster`,
  `initWanderMonster()`/`scene.js`, `MONSTER_WALK_SVG`/
  `creature-svgs.js`, page de démo `demo-monstre.html` — supprimée,
  n'était liée depuis aucune autre page). Fonctionnalité entièrement
  retirée, pas juste masquée — plus aucune trace dans le HTML/JS/CSS.
  Curseur clignotant retiré aussi des phrases de sagesse en bas de
  fiche (`#ficheEndPhrase`) sur les 8 pages, demande explicite.
- Signalé au passage : le dragon de la semaine (`#sceneDragon`)
  s'affichait DERRIÈRE la barrière de campagne (`#scenePlan2`) au lieu
  de devant. Cause : les deux étaient à `z-index:0` — à égalité de
  z-index, l'ordre de peinture retombe sur l'ordre du DOM, et
  `.scene-plan2` est déclaré après `.scene-dragon` dans index.html,
  donc peint par-dessus. Corrigé en passant `.scene-dragon` à
  `z-index:1`. Réflexe à garder pour tout futur élément du système de
  plans de la scène (voir les autres notes sur château/lune/plan2
  plus haut) : un `z-index` explicite et distinct par plan évite ce
  genre de piège lié à l'ordre de déclaration dans le HTML, qui peut
  changer sans rapport avec l'intention visuelle.

## Taille du dragon du samedi + oiseau caché derrière le chevalier (11/08/2026)

- Signalé : le dragon du samedi (palier final, `WEEK_DRAGON_TIERS[5]`)
  paraissait "tout petit" — demande explicite : sa poitrine doit
  arriver à la hauteur de la tête du chevalier. Repère anatomique
  trouvé en affichant DRAGON_VICTORIOUS_SVG seul avec une grille de
  repère (viewBox 100×95) : le bas du cou / haut de la poitrine tombe
  vers y≈34, soit ~36% de la hauteur totale du dessin. Palier samedi
  recalé pour que ce point tombe exactement sur le haut de tête mesuré
  du chevalier (`#knightGirl svg`, `getBoundingClientRect`), vérifié
  par capture d'écran plutôt que par le calcul seul — le calcul pur
  (poitrine à hauteur de tête, PIEDS gardés au niveau d'avant) aurait
  fait dépasser le dragon très largement au-dessus de la scène
  (~70px), recouvrant la grille de chapitres au-dessus. Palier samedi
  final : pieds remontés par rapport au palier vendredi (228px contre
  280px) plutôt que gardés fixes — lu comme le dragon qui se dresse de
  toute sa hauteur, pas un recul. Paliers mardi-vendredi remis à
  l'échelle par le même facteur (240/175 ≈ 1,37) que l'ancien palier
  samedi, pour une progression cohérente sur toute la semaine.
- Piège retrouvé une fois de plus (voir "toujours tester sous 320px"
  plus haut) : les largeurs/positions de `WEEK_DRAGON_TIERS` sont
  calibrées à l'œil sur un écran de 390px — le palier samedi agrandi
  (left:85 + width:240 = 325px) déborde horizontalement dès que la
  scène mesure moins de ~330px de large, débordement réel confirmé par
  test automatisé à 310/320px (pas juste théorique). Corrigé dans
  `renderWeekDragon()` (scene.js) par un filet générique : après avoir
  posé `left`/`width` du palier, mesure la largeur réelle de
  `#battleScene` et rétrécit `width` si `left + width` dépasse le bord
  — ne touche jamais `left`, cohérent avec les correctifs déjà
  appliqués à `.scene-plan2`/`.scene-castle` pour le même genre de
  débordement.
- Nouvelle fonctionnalité liée (même demande) : à partir du palier où
  le dragon "a passé la barrière" (choisi comme vendredi-samedi,
  index 4-5 de `WEEK_DRAGON_TIERS` — les deux paliers où sa largeur
  fait un vrai bond et où il domine visuellement la scène ; un seuil
  basé sur la position du dragon par rapport à `#scenePlan2` ne
  marchait pas, la barrière est déjà dépassée en pixels dès mardi),
  l'oiseau se cache derrière le chevalier et regarde vers le dragon.
  Implémenté avec un second élément (`#birdPeek`, dans `#knightZone`)
  plutôt qu'en déplaçant `#creatureFigure` : la pile de crânes et les
  défaites hebdo restent à leur place habituelle (à gauche), seul
  l'oiseau lui-même change de position — `updateBirdHiding()`
  (scene.js) bascule une classe `.bird-hiding` sur `#battleZone` qui
  passe `#creatureFigure` à `opacity:0` et affiche `#birdPeek`. Pas de
  miroir nécessaire : `BIRD_SVG` regarde déjà vers la gauche par
  défaut, donc vers le dragon une fois posé sur le flanc gauche du
  chevalier. z-index négatif sur `.bird-peek` pour se dessiner
  derrière `.knight-girl` (non positionné) — attention : ce négatif
  s'échappe du `.knight-zone` qui l'entoure (position:relative SEUL ne
  crée pas de contexte d'empilement, il faut aussi un z-index non-auto)
  et remonte jusqu'au contexte de `.battle-zone` (qui, lui, a bien
  z-index:1 explicite) ; ça n'a pas posé de problème ici car rien
  d'autre à ce niveau ne se trouve sur le passage du petit oiseau, mais
  à garder en tête pour la prochaine fois qu'un z-index négatif est
  posé sur un descendant profond.

## Dragon en couleurs inversées + épaisseur de contour proportionnelle (11/08/2026, demande explicite)

- Demande : "tout ce qui est blanc devient noir, tout ce qui est noir
  devient blanc" sur le dragon, pour qu'il ait des contours blancs et
  paraisse "plus impressionnant". Techniquement : `.scene-dragon`
  passe de `color:var(--fg)` (rempli en blanc) à `color:var(--bg)`
  (rempli en noir, donc invisible sur le fond noir de la scène) + un
  filtre `drop-shadow` (8 copies cardinales/diagonales, même technique
  que `.knight-piece-wrap svg`) en blanc sur `.scene-dragon svg`, qui
  trace TOUT le contour (extérieur + chaque trou interne, le filtre
  suit le canal alpha exact) — donne exactement l'effet inverse :
  silhouette noire, le détail qui était en creux ressort en traits
  blancs.
- Épaisseur du contour rendue PROPORTIONNELLE (demande explicite
  séparée, "aussi fin que le contour de l'oiseau, proportionnellement")
  : un `drop-shadow` à 1px fixe en CSS aurait donné un contour trop
  épais sur le grand dragon du samedi (240px) et trop fin sur le petit
  dragon du mardi (69px) relativement à leur propre détail. Corrigé en
  postant l'épaisseur via une variable CSS `--dragon-outline`, calculée
  en JS (`renderWeekDragon`, scene.js) à CHAQUE rendu : largeur affichée
  du dragon ÷ largeur de son viewBox source × 1 unité cible — donne un
  contour toujours "1 pixel du dessin" quelle que soit la taille
  affichée, au lieu d'un 1px écran fixe. Cible de 1 unité choisie par
  approximation du halo blanc de l'oiseau (BIRD_SVG, dessiné en dur
  dans sa grille, pas mesuré au pixel exact — c'est un halo à la main,
  pas uniforme partout).
- Piège trouvé en cours de route : la pose "endormi roulé en boule"
  (DRAGON_SVG, palier lundi) est trop pleine (peu de trous internes)
  pour que la technique du contour fonctionne — à sa taille minuscule
  (~30px pour un viewBox 60, donc ~0,5px/unité), les 8 copies décalées
  du filtre se recouvrent presque entièrement et remplissent toute la
  silhouette au lieu de tracer un contour creux, donnant un gros blob
  blanc plein (signalé par Pierre, capture à l'appui : "ça fait une
  grosse masse blanche"). Pas de vrai contour creux possible pour cette
  pose à cette échelle sans reconstruire un système différent — corrigé
  pragmatiquement en baissant l'opacité de `#sceneDragon` à 0.4
  UNIQUEMENT pour ce palier (`tier.svg === 'sleeping'`), ce qui
  assourdit le blob en un gris discret plutôt qu'un blanc éclatant —
  cohérent avec l'intention d'origine ("à peine visible dans le noir
  de la porte de la grotte"), qui s'était perdue en passant du
  remplissage blanc plein d'avant à l'inversion noir+contour. Les
  autres paliers (dessin détaillé, DRAGON_VICTORIOUS_SVG) restent à
  pleine opacité, le contour y trace correctement le détail.

## Clignement de l'oiseau à durée variable (11/08/2026, demande explicite)

- Le clignement rapide (140ms, `BIRD_SVG_BLINK`) reste le comportement
  par défaut, mais devient parfois un clignement long (`LONG_BLINK_MS`
  = 1000ms, œil gardé fermé une seconde entière) — réutilise le MÊME
  sprite `BIRD_SVG_BLINK` (pas de nouveau dessin), seule la durée
  pendant laquelle il reste affiché change. Fréquence du clignement
  long PAS fixe : retirée au hasard entre 10% et 50%
  (`LONG_BLINK_CHANCE_MIN`/`MAX`) À CHAQUE clignement plutôt qu'un seul
  taux constant pour toute la session — collait à la formulation de
  Pierre ("varie... entre une fois sur deux et une fois sur dix au
  hasard") prise au pied de la lettre plutôt qu'interprétée comme un
  taux moyen unique.

## Historique des versions : retrait du badge « ACTUELLE » + simplification rétroactive (11/08/2026, demande explicite)

- Le cadre de la dernière version avait un bord plus clair
  (`.changelog__entry.current{border-color:var(--fg)}`, vs
  `var(--fg-dim)` pour les autres) et un badge « ACTUELLE » — perçu par
  Pierre comme un cadre "légèrement plus épais" (optiquement vrai même
  si l'épaisseur en px était identique, un bord blanc plein paraissant
  plus présent qu'un bord gris terne). Retiré : classe `.current` et
  badge supprimés de `changelog.js`, règle CSS et `.changelog__tag`
  (devenue inutile) supprimées de `changelog.html` — toutes les cartes
  ont maintenant exactement le même style.
- Reprise du ménage "notes de version courtes" (voir plus haut, format
  du 11/08/2026) au-delà du cutoff v117 posé la première fois — cette
  fois sur demande EXPLICITE ("refais un tour des commentaires de
  version les plus longs"), donc plus de raison de s'arrêter à v117.
  Repassé sur ~50 entrées (v55 à v116), converties en phrases courtes
  sans "comment/pourquoi", ou en listes à puces terses quand plusieurs
  faits distincts. Remarques de remerciement (« Merci XXX ! ») gardées
  telles quelles — c'est une fonctionnalité à part (créditer les
  contributeurs), pas de la prose à raccourcir. Entrées déjà courtes
  (v1-v54 pour l'essentiel, une ligne factuelle) laissées telles
  quelles, pas de gain à les retoucher. Mentions de fonctionnalités
  depuis retirées (ex. le petit monstre, v74/v77) volontairement
  gardées : le changelog est un historique, pas une description de
  l'état actuel — le réécrire pour effacer ce qui a existé serait
  malhonnête.

## Scène de combat simplifiée : plus de château/grotte/lune (18/08/2026, demande explicite)

- Chantier de simplification évoqué en exploration le 12/08/2026
  (exemple jamais mis en prod à l'époque), demandé pour de vrai cette
  fois : retire entièrement château (`CASTLE_SVG`), grotte (`CAVE_SVG`)
  et lune (`MOON_SVG`, sa phase réelle, sa rotation) — plus aucune
  trace dans le HTML/CSS/JS ni dans `creature-svgs.js`. Remplacés par
  une seule bande compacte (`.battle-strip`/`#battleStrip`) : un sol
  (`.battle-ground`, simple ligne), le dragon de la semaine à gauche
  qui avance jour après jour, le chevalier à droite qui se dresse là
  où il était déjà (système d'armure knight.js inchangé — 100%
  compatible, positions en % relatives à sa propre grille).
- Hauteur de la bande = hauteur d'une carte de chapitre (demande
  explicite, précisée par question : "une carte entière", pas les
  11px de la mini-barre de progression d'une carte). MESURÉE
  (`alignBattleStripHeight`, scene.js) sur une vraie `.chapter-card`
  plutôt que codée en dur — implique que `app.js` (qui construit la
  grille) doit s'exécuter AVANT `scene.js` : réordonnancement des
  balises `<script>` dans index.html (app.js juste avant scene.js,
  après tout le reste), inhabituel sur ce site où scene.js passait
  systématiquement avant app.js jusqu'ici.
- `WEEK_DRAGON_TIERS` entièrement repensé : positions/tailles en
  FRACTION de la largeur/hauteur réelle de la bande (`heightFrac`/
  `leftFrac`), plus en pixels calibrés à l'œil sur un écran de 390px.
  Corrige par construction toute la classe de bugs de débordement sous
  ~320px rencontrée plusieurs fois avec l'ancien système (voir plus
  haut, "toujours tester sous 320px") — vérifié à 310px et 320px après
  coup, aucun débordement, plus besoin du filet de sécurité ad hoc
  que ça demandait avant.
- Technique du contour du dragon (copies DOM, 12/08/2026) reprise à
  l'identique, juste réalimentée par les nouvelles dimensions
  mesurées — aucune régression attendue, confirmée par test.
- Mécanique "l'oiseau se cache derrière le chevalier" (11-12/08/2026,
  `#birdPeek`/`updateBirdHiding`/`BIRD_HIDE_FROM_TIER`) retirée
  entièrement : n'a plus de sens une fois l'oiseau isolé (voir plus
  bas), il n'est plus jamais à proximité du chevalier.
- L'oiseau (`creature.js`, `#creatureZone`) déplacé tel quel (aucun
  changement de code dans creature.js — juste son emplacement dans le
  HTML) tout en bas de la page, après la scène de combat, avant le
  pied de page. Totalement indépendant de la scène de combat
  maintenant. La pile de crânes vie entière (`#skullPile`) part avec
  lui (conceptuellement liée à l'oiseau/à l'historique de réinitial-
  isation du site, pas au combat hebdo) ; les victoires/défaites de la
  semaine (`#knightCoins`/`#creatureLosses`, weekly.js) restent avec
  la scène de combat, regroupées sous la bande (`.battle-meta`) —
  distinction faite sur la base de ce que chaque compteur représente
  réellement (vie entière vs hebdomadaire), pas sur leur emplacement
  visuel d'avant.

## Scène remontée sous les barres + dragon à taille fixe (18/08/2026, demande explicite, juste après la refonte ci-dessus)

- Trois retouches rapides sur la refonte du jour, dans la foulée :
  1. `.battle-scene` déplacée dans le HTML pour se retrouver juste
     sous les deux barres du header (barre totale + barre hebdo),
     AVANT `<main>`/la grille de chapitres — elle avait été placée
     après la grille par erreur lors de la première implémentation,
     alors que la demande d'origine (12/08/2026) disait bien "avant
     les trucs de chapitre". Aucun impact sur `alignBattleStripHeight`
     (scene.js) : la mesure de `.chapter-card` se fait par
     `getBoundingClientRect`, indépendant de la position de l'élément
     dans le DOM — seul l'ORDRE D'EXÉCUTION des scripts compte (déjà
     bon, app.js avant scene.js), pas l'ordre de déclaration HTML.
  2. Variation de taille du dragon supprimée ("grand tout le temps") :
     `DRAGON_HEIGHT_FRAC` devient une constante unique (1.0) au lieu
     d'un champ par palier dans `WEEK_DRAGON_TIERS` — seule la position
     (`leftFrac`, l'approche) varie encore d'un jour à l'autre.
  3. Conséquence trouvée en testant la taille max sur le palier lundi
     (endormi, `DRAGON_SVG`) : gros blob gris plutôt qu'un contour net
     (capture envoyée à Pierre). Confirme que le problème identifié le
     11/08/2026 ("pas assez de trous internes pour la technique du
     contour") n'était PAS qu'une question de petite échelle comme
     supposé alors — cette pose ne fonctionnera JAMAIS avec la
     technique du contour, quelle que soit sa taille affichée. Question
     posée à Pierre plutôt que de deviner : réponse = même pose dressée
     (DRAGON_VICTORIOUS_SVG) tous les jours y compris le lundi, plus de
     dessin "endormi roulé en boule" du tout. `DRAGON_SVG` retiré
     entièrement de `creature-svgs.js` (plus aucun usage). L'opacité
     réduite du lundi (assourdir pour dire "pas encore réveillé"),
     ajoutée dans la foulée puis retirée par une demande explicite
     suivante ("oublie assombri aussi") : le dragon a maintenant EXACTE-
     MENT le même rendu tous les jours, seule sa position le distingue.

## Bulle de l'oiseau redirigée sous lui + bouton reset semaine (18/08/2026, signalé capture à l'appui)

- Depuis que l'oiseau est isolé tout en bas de page (refonte du
  18/08/2026 ci-dessus), sa bulle BD (position:absolute, grandit vers
  le haut, voir plus haut) se retrouvait à recouvrir la carte du
  dernier chapitre (PYTHON) — au-dessus de l'oiseau il y a maintenant
  la grille de chapitres, plus le décor de la scène de combat comme
  avant. Basculée sous l'oiseau (`top:100%` au lieu de `bottom:100%`,
  pointe retournée) : en dessous il n'y a que la pile de crânes et le
  pied de page, un endroit sûr pour du texte de longueur variable.
- Signalé au même moment : "gardé le score hebdo" après une opération
  d'import de phrase. Cause réelle, pas un bug — `applyChapterLevel`
  (progression.js) écrit délibérément la même fraction dans la couche
  vie entière ET la couche hebdo à l'import (corrigé le 11/08/2026,
  voir plus haut : sans ça l'armure ne se reconstituait jamais après
  import). Donc réimporter une phrase "reforge" l'armure d'un coup —
  comportement voulu dans le cas général, mais gênant si on veut
  restaurer sa progression permanente SANS repartir avec l'armure
  complète. Pas de solution via la phrase elle-même (les codes
  n'encodent qu'un niveau par chapitre, pas une couche hebdo séparée)
  — ajouté à la place un bouton dédié sur progression.html,
  « RÉINITIALISER MA SEMAINE » (`resetWeekOnly()`, weekly.js) : vide
  uniquement l'état hebdo par chapitre + `WEEKLY_PROGRESS_KEY`, sans
  toucher au score cumulé (wins/losses, jamais remis à zéro par
  design), au seuil adaptatif, ni à `WEEKLY_META_KEY` (le vrai lundi
  suivant continue de se déclencher normalement). À utiliser après un
  import si on veut repartir sur une semaine vierge.

## Bulle de l'oiseau remise au-dessus + oiseau qui ne disparaît plus au tap (18/08/2026, demande explicite, juste après)

- Retour de Pierre sur le choix "bulle sous l'oiseau" du même jour :
  "plus logique" de la garder au-dessus, plutôt lever l'oiseau. Bulle
  remise en `bottom:100%` (pointe vers le bas, comme à l'origine du
  11/08/2026) — mais pour ne plus jamais recouvrir la carte du dernier
  chapitre au-dessus (raison du changement précédent), `#creatureZone`
  reçoit maintenant un `margin-top` calculé en JS
  (`applyCreatureZoneSpacing`, creature.js) : mesure la hauteur RÉELLE
  de la bulle dès qu'elle devient visible et pousse toute la colonne
  (oiseau + pile de crânes) vers le bas d'autant, plutôt qu'une marge
  fixe (le texte est de longueur variable — voir la note plus haut sur
  la fragilité des positions codées en dur). Appelée depuis les trois
  helpers de contenu de la bulle (`showBubblePhrase`/`showBubbleGlyph`/
  `hideBubble`), donc à jour quel que soit l'appelant (rendu
  automatique au chargement, ou appui sur l'oiseau).
- Signalé au même moment : appuyer sur l'oiseau le fait "disparaître,
  devenir noir" — comportement en fait volontaire depuis le
  11/08/2026 (`.creature-figure.peeking{opacity:0}`, l'oiseau
  s'effaçait pour laisser toute la place à sa bulle), mais jugé
  "chelou" maintenant que la bulle est repositionnée. Retiré
  entièrement (classe `.peeking` et sa règle CSS supprimées) :
  l'oiseau reste visible en permanence, tap ou pas — la bulle
  apparaît simplement au-dessus de lui comme une vraie bulle de BD.

## Libellés des deux barres du haut (18/08/2026, demande explicite)

- Nommage demandé pour distinguer clairement les deux nouvelles barres
  (v132/v133) sans avoir à ouvrir un tooltip : « PROGRESSION TOTALE »
  au-dessus de la barre vie entière (`.bar-label`, index.html), «
  PROGRESSION HEBDOMADAIRE » au-dessus de la barre qui se remet à zéro
  chaque lundi — demande explicite "vraiment hyper claire" pour cette
  dernière, donc un libellé littéral plutôt qu'un nom thématique
  (chevalier/dragon).
- Nuance demandée pour la barre totale, glissée dans son tooltip
  existant (`gradeTooltip`, app.js/renderGlobalProgress) plutôt que
  dans le libellé lui-même : elle ne se remet JAMAIS à zéro d'elle-
  même, seule une réinitialisation complète du site (pile de crânes,
  creature.js) y touche — contrairement à la barre hebdomadaire,
  remise à zéro chaque lundi par design.

## `calc(var(--x))` dans un `drop-shadow` invisible sur Safari réel (12/08/2026)

- Signalé par Pierre sur iPhone réel (capture à l'appui) : le dragon
  inversé (voir plus haut) restait presque entièrement noir — contour
  blanc quasi invisible. Jamais reproduit en simulation Chromium/
  Playwright malgré plusieurs vérifications avant le ship (même bug de
  classe que celui déjà noté une fois sur ce projet : un souci visible
  seulement sur Safari réel, invisible en simulation). Cause suspectée
  (pas confirmée à 100%, corrigée par prudence) : le filtre utilisait
  `drop-shadow(var(--dragon-outline, 1px) ... )` et
  `drop-shadow(calc(var(--dragon-outline, 1px) * -1) ...)` — support
  fragile sur WebKit de `var()`/`calc()` utilisés comme valeur de
  DÉCALAGE (pas de couleur) à l'intérieur d'un `drop-shadow`.
- Corrigé en sortant tout le calcul en JS (`renderWeekDragon`,
  scene.js) : la valeur `outlinePx` est calculée normalement, puis
  formatée en chaîne de caractères AVEC l'unité déjà résolue
  (`${off}px`), et le filtre complet est posé directement en
  `dragonSvgEl.style.filter = ...` — plus aucun `var()`/`calc()` dans
  le filtre pour les décalages, seule la COULEUR reste en `var(--fg)`
  (usage standard et sans risque, `var()` pour une couleur est très
  répandu et ne pose pas ce genre de problème). Le fallback CSS
  statique (`.scene-dragon svg{filter:...}`, 1px fixe) ne sert plus
  qu'avant le tout premier rendu JS.
- Réflexe à garder : pour tout futur filtre CSS (`drop-shadow`,
  `blur`, etc.) dont un paramètre NUMÉRIQUE doit varier dynamiquement,
  préférer calculer la valeur complète en JS et l'injecter déjà
  résolue plutôt que de faire porter le calcul par `calc()`/`var()`
  directement dans la propriété `filter` — pas de garantie de test
  réel sur Safari dans ce projet (pas d'accès à un vrai appareil Apple
  depuis l'environnement de dev), donc mieux vaut éviter par
  construction les coins connus pour être fragiles sur ce moteur.

## Phrase de sagesse + ligne de séparation révélées en tirant tout en bas (12/08/2026, demande explicite)

- Demande : la phrase de sagesse/étiquette de pied de page et la ligne
  `.pixel-rule` juste au-dessus ne doivent plus apparaître dans l'usage
  normal de la page — seulement en "forçant le déplacement" au-delà du
  vrai bas de la page (le rebond natif iOS/Android quand on continue de
  glisser le doigt alors qu'il n'y a plus rien à faire défiler).
  Explicitement PAS un tiré-pour-rafraîchir (`initPullToRefresh`,
  pwa.js) : pas de rechargement de page déclenché, geste totalement
  indépendant. Confirmé par Pierre : marche partout (onglet classique
  ET mode PWA), contrairement au pull-to-refresh du haut de page qui
  lui reste réservé au mode plein écran (voir plus haut, pwa.js).
- Implémenté avec un nouveau wrapper `.footer-reveal` (CSS :
  `max-height:0; overflow:hidden;` par défaut) posé autour de
  `.pixel-rule` + la phrase/étiquette SEULEMENT — pas le reste du pied
  de page quand il y en a plus (boutons chapitre précédent/suivant et
  reset sur les fiches, lien CODE SOURCE sur changelog.html, laissés
  hors du wrapper, toujours visibles). `max-height:0` plutôt que
  `display:none`/`opacity:0` : ne réserve AUCUN espace en usage normal
  — sinon le vrai bas de page se retrouverait toujours "avant" ce bloc
  et un simple scroll suffirait à le révéler, sans avoir besoin de
  forcer le geste au-delà.
- Nouvelle fonction `initFooterReveal()` (pwa.js, à côté de
  `initPullToRefresh` mais SANS la garde `isStandaloneWebApp()`) :
  au `touchstart`, arme le geste seulement si on est déjà au vrai bas
  mesuré de la page (`scrollHeight` vs `scrollY + innerHeight`) ; au
  `touchmove`, calcule `dy = startY - clientY` (positif si le doigt
  continue de "pousser" vers le bas malgré l'absence de contenu
  restant) et pose `max-height` proportionnellement, plafonné à
  `wrap.scrollHeight` (hauteur réelle du contenu, texte variable donc
  pas de valeur fixe possible) ; au relâchement, remonte TOUJOURS à 0
  avec une transition — aucune action n'est jamais déclenchée, quelle
  que soit la distance tirée, contrairement au pull-to-refresh qui
  déclenche un reload au-delà d'un seuil. Reprend la même garde
  `hasActiveSelection()` que le pull-to-refresh (sélection de texte en
  cours) pour la même raison.
- Appliqué sur les 14 pages du site (accueil, 8 fiches, mes erreurs,
  progression, révision ciblée, historique, réglages) — sur les fiches
  le wrapper n'entoure que `.pixel-rule` + `#ficheEndPhrase`, PAS
  `.chapter-nav`/`.reset-btn` qui suivent juste après dans le pied de
  page ; sur changelog.html il n'entoure pas le lien "CODE SOURCE ↗".

## Barrière de campagne retirée + contour du dragon reconstruit sans filtre (12/08/2026, demande explicite)

- Barrière de campagne (plan 2, `.scene-plan2`/`#scenePlan2`,
  `PLAN2_SVG`) retirée entièrement — jugée "vraiment moche" par Pierre.
  Fonctionnalité entièrement retirée, pas juste masquée : HTML
  (index.html), CSS (`.scene-plan2`), JS (`renderScenePlan2()`/
  `alignScenePlan2()`, scene.js) et l'asset (`PLAN2_SVG`,
  creature-svgs.js) supprimés, plus aucune trace dans le code actif.
- Le correctif du contour blanc du dragon posé en v129 (filtre
  `drop-shadow` avec valeurs déjà résolues en JS, pour éviter
  `var()`/`calc()` dans le filtre) n'a PAS marché — Pierre a signalé
  le dragon toujours presque tout noir sur son iPhone réel, capture à
  l'appui, juste après le ship. Deux correctifs différents ont donc
  échoué sur ce même bug (`var()`/`calc()` dans le filtre d'abord,
  valeurs pré-résolues ensuite) sans jamais être reproductibles en
  simulation Chromium — signe que le problème n'est pas dans la façon
  de fournir les valeurs au filtre, mais dans `drop-shadow` lui-même
  chaîné 8 fois sur ce moteur, quelle que soit sa configuration.
- Plutôt que tenter un 3e correctif sur la même technique, changement
  d'approche complet : la technique du contour est reconstruite en
  VRAIES COPIES DOM plutôt qu'en filtre CSS. `renderWeekDragon()`
  (scene.js) construit maintenant 9 `<div>` superposés dans
  `#sceneDragon` — 8 copies blanches (`.dragon-copy--outline`)
  légèrement décalées via `transform:translate()` (une par direction
  cardinale/diagonale), et 1 copie noire sans décalage
  (`.dragon-copy--main`) par-dessus. Les bords des copies blanches qui
  dépassent, sur le pourtour extérieur et dans chaque trou du dessin,
  forment le contour — même effet visuel que le filtre, sans lui.
  `transform:translate()` est une des propriétés CSS les plus
  élémentaires et les mieux supportées, sans le passif de fragilité de
  `drop-shadow` chaîné plusieurs fois observé ici. Pas de garantie à
  100% que ce soit LA cause exacte du bug (toujours pas d'accès à un
  vrai appareil Apple pour vérifier), mais le changement de technique
  élimine par construction toute la classe de risque identifiée.
- Réflexe à renforcer : après un 2e échec consécutif d'un même
  correctif sur un bug non reproductible en simulation, arrêter
  d'itérer sur la même technique (chaque itération coûte un cycle
  complet de ship + attente de retour utilisateur sur un vrai
  appareil) et changer d'approche structurellement plutôt que de
  continuer à ajuster les paramètres de la technique suspecte.

## Dragon confirmé corrigé sur iPhone réel + 3 ajustements mineurs (12/08/2026, demande explicite)

- Pierre a confirmé sur son iPhone réel que le contour en copies DOM
  (v130) fonctionne parfaitement — clôt le feuilleton du contour
  invisible (3 tentatives : `var()`/`calc()` dans le filtre, valeurs
  pré-résolues dans le filtre, puis abandon du filtre pour de vraies
  copies DOM).
- Seuil de `BIRD_HIDE_FROM_TIER` abaissé de vendredi à mercredi (index
  4 → 2) : Pierre a jugé, capture à l'appui un mercredi, que l'oiseau
  devait déjà être caché derrière le chevalier à ce stade ("le dragon
  s'approche et ça fait peur"). Pas de nouvelle logique, juste la
  constante changée.
- Lune : légère rotation (`transform:rotate(-25deg)` sur `.scene-moon`,
  donc sur le disque ET le cache ensemble comme un seul bloc rigide,
  pour ne pas désaligner leur décalage horizontal relatif) — demande
  explicite avec croquis fourni (angle approximatif, "juste une
  rotation légère"). La technique à deux cercles (voir plus haut) ne
  peut naturellement produire qu'un croissant aux pointes verticales ;
  une rotation d'ensemble était le seul moyen simple de l'incliner
  sans toucher au calcul de phase.
- Phrase de sagesse : le geste de révélation en tirant tout en bas
  (v129, voir plus haut) recharge maintenant une NOUVELLE phrase à
  chaque relâchement (au lieu de rester figée jusqu'au rechargement de
  page) — demande explicite, effet "loterie" assumé ("à chaque fois on
  a envie de tirer"). `reloadFooterPhrase()` (pwa.js) appelle
  `window.renderEndPhrase`/`window.renderFooterCycle`, celle qui
  existe sur la page courante (l'autre est simplement absente de
  `window` — pas de branchement par page à maintenir). Seuil
  `PHRASE_RELOAD_MIN_DRAG` (20px) avant de déclencher : un tremblement
  de doigt qui arme puis relâche tout de suite ne doit pas gâcher une
  phrase pour rien. Posée AVANT le repli du bloc (pas après), pour que
  le changement soit visible un instant pendant que ça se referme —
  retour visuel immédiat que le geste a "fait quelque chose".
