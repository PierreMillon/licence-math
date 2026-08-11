/* ============================================================
   L1 MATHS — SYNTHÈSE — changelog.js
   Historique des versions du site (page changelog.html).
   Liste manuelle, à compléter à chaque nouvelle valeur de
   SITE_VERSION dans menu.js. Dates au format JJ/MM/AAAA.
   ============================================================ */

const VERSIONS = [
  { v: 120, date: "11/08/2026", desc: "<ul><li>La barrière de campagne (2ᵉ plan de la scène de combat) prend maintenant toute la largeur de l'écran, dans la même marge que le reste du site, et se centre pile entre le bas du château et le bas des pieds du chevalier</li><li>Icône personnalisée (l'oiseau) pour l'écran d'accueil de l'iPhone, à la place de la lettre par défaut</li><li>Petit spinner « tirer pour rafraîchir » ajouté quand le site est utilisé en application plein écran (ajouté à l'écran d'accueil), où le spinner natif du navigateur ne s'affiche plus</li></ul>" },
  { v: 119, date: "11/08/2026", desc: "<ul><li>Grotte du dragon invisible (l'emplacement reste, juste le graphisme retiré)</li><li>Dragon endormi du lundi calé pile au bas de la falaise du château</li><li>La lune ne peut plus devenir totalement invisible en phase de nouvelle lune (minimum d'éclairement ajouté)</li></ul>" },
  { v: 118, date: "11/08/2026", desc: "Ajout d'une mesure d'audience anonyme et agrégée (GoatCounter) — pas de cookie, pas d'IP conservée, juste un compteur de visites pour savoir si le site sert à quelqu'un." },
  { v: 117, date: "11/08/2026", desc: "<ul><li>Corrigé un débordement horizontal (largeur fixe de la bande château/campagne) — cause probable de la lune invisible sur mobile</li><li>Armure du chevalier « forgée » : une pièce n'apparaît plus qu'entière, à 100% de progression hebdo dans son chapitre</li><li>Objectif hebdomadaire adaptatif : ±10 points selon victoire/défaite, entre 30% et 90%</li></ul>" },
  { v: 116, date: "11/08/2026", desc: "<ul><li>Nouvelles phrases pour l'oiseau — plus courtes, plus sobres, sans référence reconnaissable aux auteurs qui les inspirent</li><li>Sécurité ajoutée sur le calcul de la phase de la lune, pour éviter qu'une valeur inattendue ne la rende invisible</li></ul>" },
  { v: 115, date: "11/08/2026", desc: "Un fin contour a été ajouté à chaque pièce d'équipement du chevalier — sans lui, des pièces voisines de la même couleur se fondaient entre elles et devenaient difficiles à distinguer." },
  { v: 114, date: "11/08/2026", desc: "<ul><li>L'oiseau devient la mascotte permanente (ne se transforme plus en dragon) — gagne une phrase taquine signée « Le Scribe aux Six Voix » (Asimov/Shakespeare/Poe/Lovecraft/Woody Allen/Monty Python)</li><li>Le dragon vit la semaine : sort de la grotte et s'approche chaque jour, combat samedi minuit</li><li>Dimanche : résultat affiché en pause avant le reset du lundi</li><li>Deux phrases ajoutées en fin de fiche</li></ul>" },
  { v: 113, date: "11/08/2026", desc: "Deux nouvelles phrases dans la liste de fin de fiche." },
  { v: 112, date: "11/08/2026", desc: "<ul><li>Bouclier et épée (étaient invisibles, recouverts par le reste de l'armure) passent devant</li><li>Gardent leurs propres proportions au lieu d'être étirés</li><li>Légèrement pivotés pour un port plus naturel</li></ul>" },
  { v: 111, date: "10/08/2026", desc: "<ul><li>Casque : visière inversée à gauche, cheveux ne dépassent plus</li><li>Plastron : chemisier ne transparaît plus</li><li>Jambières : jean ne transparaît plus à l'entrejambe</li><li>Bottes : de nouveau deux bottes séparées</li></ul>" },
  { v: 110, date: "10/08/2026", desc: "<ul><li>Les 8 pièces d'équipement du chevalier redessinées, liseré doré, d'après une planche de référence</li><li>Couleur des pièces en gris/argent (étaient invisibles sur le chemisier blanc)</li><li>Casque légèrement asymétrique, cohérent avec la tête tournée du chevalier</li></ul>" },
  { v: 109, date: "10/08/2026", desc: "Nouveau plan 2 (bâtiments/campagne) dans la scène de combat : une bande de campagne (cottage, clôture, arbres), inspirée de références, dans le même style monochrome que le reste du site — posée entre le château et les personnages, densité 1,0." },
  { v: 108, date: "10/08/2026", desc: "La lune est maintenant un vrai disque plein (cercle plein, généré au pixel près) au lieu d'un croissant fixe — les phases lunaires réelles (v104) s'affichent enfin correctement sur tout le cycle, pleine lune comprise." },
  { v: 107, date: "10/08/2026", desc: "<ul><li>Nouvelle musique de fond adaptative (8-bit), activable dans RÉGLAGES (désactivée par défaut) — s'enrichit selon le combat de la semaine et les séries de bonnes réponses</li><li>RÉVISION CIBLÉE compte aussi dans les séries de bonnes réponses</li></ul>" },
  { v: 106, date: "10/08/2026", desc: "Corrige un bug important : le blocage du glissement horizontal (v96) désactivait par erreur le pincement de zoom partout sur le site (sur la plupart des navigateurs mobiles). Le zoom pour agrandir un détail reste maintenant possible n'importe où ; seul le dézoom en dessous de l'affichage normal reste bloqué. Corrigé aussi sur alice-et-sophie, fiche-de-math-gael et exercices-l1-math." },
  { v: 105, date: "10/08/2026", desc: "Densité de la grotte (scène de combat) recalée sur celle du château, par grille source doublée (même technique que la lune) — aucun changement d'apparence, juste plus fidèle au système de profondeur." },
  { v: 104, date: "10/08/2026", desc: "La lune de la scène de combat reflète maintenant la vraie phase lunaire du jour (calcul local, sans API externe) — visible surtout en dehors de la pleine lune, où le dessin actuel (un croissant, pas un disque) ne peut pas encore la représenter parfaitement ; à affiner quand la lune sera redessinée en disque plein." },
  { v: 103, date: "10/08/2026", desc: "<ul><li>Début d'un système de profondeur à 4 plans pour la scène de combat (densité de pixels croissante avec l'éloignement) : chevalier calé pile sur la densité de référence de son plan, oiseau et lune recalés chacun sur la densité du leur</li><li>La lune reste en haut à droite (une tentative précédente l'avait fait descendre par erreur au niveau du château, corrigé)</li></ul>" },
  { v: 102, date: "10/08/2026", desc: "Château et lune, dans la scène de combat, redescendus vers les personnages (au lieu de flotter tout en haut de la scène) et alignés entre eux sur un même niveau — les personnages restent devant." },
  { v: 101, date: "10/08/2026", desc: "Correction de contenu (fiche Logique) : « polynôme du second degré » au lieu de « trinôme du second degré », pour rester cohérent avec « polynomiale » utilisé juste avant dans la même liste. (Merci Mgika3 pour la relecture !)" },
  { v: 100, date: "10/08/2026", desc: "<ul><li>Refactoring interne : 3 fonctions dupliquées centralisées (aucun changement visible)</li><li>Château et lune alignés sur les bords du cadre au lieu d'être centrés</li><li>Mascotte réduite de moitié sous sa forme oiseau</li></ul>" },
  { v: 99, date: "10/08/2026", desc: "Les chapitres du menu sont maintenant triés dynamiquement du moins avancé au plus avancé (les 100% tout en bas), pour pointer directement vers ce qu'il reste à faire — les boutons chapitre précédent/suivant en bas de fiche gardent eux l'ordre fixe habituel." },
  { v: 98, date: "10/08/2026", desc: "<ul><li>Nouvelle page « MA PROGRESSION » : radar de maîtrise par chapitre + transfert de progression entre appareils sans compte (phrase à copier-coller)</li><li>Nouvelle page « RÉVISION CIBLÉE » : rejoue les 10 pires exercices tous chapitres confondus</li><li>Blocage du dézoom/effet élastique étendu à alice-et-sophie, fiche-de-math-gael et exercices-l1-math</li></ul>" },
  { v: 97, date: "10/08/2026", desc: "<ul><li>Le menu affiche le % de questions répondues à droite de chaque chapitre</li><li>56 nouvelles phrases en fin de fiche (question ouverte, ton encourageant)</li><li>20 nouvelles phrases dans le bandeau de l'accueil</li></ul>" },
  { v: 96, date: "10/08/2026", desc: "<ul><li>Nouveaux visiteurs : validation par bouton VALIDER par défaut au lieu d'immédiate</li><li>Dézoom en dessous de l'affichage normal bloqué (zoom pour agrandir toujours possible)</li><li>Plus d'effet élastique en glissant horizontalement sur la page</li><li>Astuce ajoutée sous la barre de progression par carrés des fiches</li></ul>" },
  { v: 95, date: "10/08/2026", desc: "<ul><li>Les formules ne se coupent plus n'importe où : toujours d'un bloc, glissable si trop large</li><li>Le combat de la semaine affiche le temps restant avant le reset du lundi</li></ul>" },
  { v: 94, date: "10/08/2026", desc: "<ul><li>Formules trop larges : zone glissable signalée (bordure pointillée + icône ↔) au lieu de déborder</li><li>Nouveau réglage « VALIDATION DES RÉPONSES » : bouton VALIDER optionnel</li><li>Nouveau réglage « AFFICHAGE DES FICHES » : défilement continu en option</li><li>Icône menu à gauche, badge de version en bas à gauche (lien vers le code source)</li></ul> (Merci Charles Boyer pour les retours !)" },
  { v: 93, date: "10/08/2026", desc: "Les pièces d'équipement sur le chevalier en couleur sont enfin posées à leur position exacte (casque sur la tête, épée dans la main, bottes sur les pieds, etc.) — repéré au pixel près sur un rendu réel du chevalier, corrige aussi un bug d'affichage qui recadrait les pièces au centre de leur zone au lieu de la remplir entièrement (la botte n'atteignait jamais le pied droit, le bouclier flottait loin du bras)." },
  { v: 92, date: "05/08/2026", desc: "Corrige un débordement du badge d'équipement sur les pièces au format haut/étroit (touchait le texte en dessous sur la fiche Analyse, entre autres) — sur la fiche et sur les cartes de chapitre de l'accueil." },
  { v: 91, date: "05/08/2026", desc: "Nouveau lien « FICHE » dans le menu, vers l'autre site de révision (fiche-de-math-gael) — les deux sites se renvoient maintenant l'un vers l'autre." },
  { v: 90, date: "05/08/2026", desc: "Nouveau lien « EXERCICES TYPE » dans le menu, vers le site séparé d'exercices type examen (exercices-l1-math) : algèbre linéaire, analyse, probabilités et un peu de Python appliqué." },
  { v: 89, date: "05/08/2026", desc: "Les fiches se lisent maintenant par pages de 5-6 questions au lieu d'un long défilement (retour de Mgika3). « Mes erreurs fréquentes » se met aussi à jour toute seule (retour arrière, changement d'onglet), au lieu de rester figée tant qu'on ne recharge pas la page." },
  { v: 88, date: "05/08/2026", desc: "Le château garde maintenant la falaise de la référence d'origine sur toute sa hauteur (elle avait été coupée), et la grotte est repositionnée sous le bas de la falaise avec un léger espace, au lieu de toucher directement les tours." },
  { v: 87, date: "05/08/2026", desc: "Le château est de retour au-dessus de la scène de combat, centré, avec une grotte juste en dessous où vit le dragon — le chevalier descend l'affronter chez lui." },
  { v: 86, date: "05/08/2026", desc: "« Mes erreurs fréquentes » fonctionne maintenant par score (-1 par échec, +1 par réussite) au lieu de disparaître dès la première bonne réponse. Corrections de contenu : composition de fonctions en LaTeX au lieu du caractère plein texte (fiche Logique), « théorème » de changement de variable renommé en « méthode » (fiche Analyse, ce n'en est pas un). (Merci Mgika3 pour la relecture !)" },
  { v: 85, date: "05/08/2026", desc: "Boutons chapitre précédent/suivant en bas de fiche, nouvelle page « MES ERREURS FRÉQUENTES » (menu) pour cibler les révisions, et objectif du combat hebdomadaire abaissé à 60%." },
  { v: 84, date: "05/08/2026", desc: "Le dragon victorieux de la scène de défaite fait maintenant face au chevalier (miroir horizontal), et un peu de sang apparaît sur la lame de l'épée plantée dans le dragon vaincu de la scène de victoire." },
  { v: 83, date: "05/08/2026", desc: "Le dragon victorieux (scène de défaite) utilise enfin le sprite dédié envoyé en référence, à la place du petit monstre rond qui servait de remplacement temporaire." },
  { v: 82, date: "05/08/2026", desc: "Ménage technique (aucun changement visible) : suppression d'environ 23 Ko de code mort — l'ancienne silhouette blanche du chevalier, plus utilisée depuis que le chevalier en couleur l'a remplacée, ainsi que quelques fonctions et constantes devenues inutiles avec elle." },
  { v: 81, date: "05/08/2026", desc: "Nouvelle page NOTATION (menu) : un slider permet de choisir u/v ou f/g pour les règles de dérivation (produit, quotient, composée), selon la notation apprise en cours. (Merci Yassin Hajji pour la suggestion !)" },
  { v: 80, date: "05/08/2026", desc: "Corrige la barre de progression globale qui pouvait paraître totalement vide sur mobile (le trait séparateur mangeait le remplissage), aligne aussi les pieds de la mascotte (oiseau/dragon) sur ceux du chevalier, repositionne les pièces d'équipement à la main sur le chevalier en couleur, et renomme le bouton « diamant » en « cœur » dans les textes internes." },
  { v: 79, date: "05/08/2026", desc: "Oiseau décoratif réduit de moitié et aligné pile sur les pieds du chevalier, séparateurs sur la barre de progression globale, équipement de nouveau visible sur le chevalier en couleur." },
  { v: 78, date: "05/08/2026", desc: "Barre de progression globale resserrée dans son cadre d'origine, chevalier en couleur dans les scènes de victoire/défaite, notation d'équivalence resserrée sous le tilde." },
  { v: 77, date: "05/08/2026", desc: "Chevalier en couleur à la place de l'ancien bonhomme, château retiré du fond, oiseau affiné, texte du combat repositionné, nouveau dragon pour la défaite, progression globale en un carré par exercice, page de démo pour le petit monstre." },
  { v: 76, date: "05/08/2026", desc: "Retrait du doublon d'oiseau dans la scène de combat : tant que le dragon n'est pas encore sorti (peu de retard), seul l'oiseau de la mascotte de progression s'affiche — l'oiseau décoratif entre le dragon et le chevalier n'apparaît qu'une fois le dragon présent." },
  { v: 75, date: "05/08/2026", desc: "Une lune (tracée depuis la référence château) posée dans le ciel de la scène de combat, au-dessus du château." },
  { v: 74, date: "05/08/2026", desc: "Nouvelle scène de combat (accueil) : dragon endormi, oiseau qui cligne des yeux, chevalier en couleur (exception au noir & blanc du site). Petit monstre qui traverse le bas de l'écran après 3 min d'inactivité. Scène de victoire : dragon vaincu sur le dos." },
  { v: 73, date: "05/08/2026", desc: "La barre de progression globale (en haut de la page d'accueil) reprend le même style de petits carrés que la barre de progression par exercice des fiches, au lieu de segments fins accolés." },
  { v: 72, date: "04/08/2026", desc: "Le message affiché sur une bonne réponse passe de « CORRECT » à « BRAVO ! »." },
  { v: 71, date: "04/08/2026", desc: "<ul><li>Réinitialiser un chapitre (ou tout le site) fait bien disparaître l'équipement gagné cette semaine</li><li>Moteur de rendu des formules hébergé directement sur le site (corrige un affichage en double sur certains réseaux)</li></ul>" },
  { v: 70, date: "04/08/2026", desc: "Correction importante : la bonne réponse était presque toujours en première position sur les QCM (repérable sans lire les questions). L'ordre d'affichage des réponses est maintenant mélangé à chaque visite d'une fiche — l'ordre des questions, lui, ne change jamais. (Merci Magaly pour le signalement !)" },
  { v: 69, date: "04/08/2026", desc: "Nouveaux dessins pour la mascotte : un corbeau remplace l'oiseau, un monstre rond remplace le dragon — tracés au pixel près à partir des références envoyées, adaptés en silhouette pleine pour rester dans le style du site." },
  { v: 68, date: "04/08/2026", desc: "Le score du combat hebdomadaire, en bas du château, passe sur une seule ligne avec un fond sombre pour rester lisible même par-dessus le chevalier ou le dragon." },
  { v: 67, date: "04/08/2026", desc: "<ul><li>Épée du bouton haut de page : 3 orientations selon le contexte (fiches/historique/accueil)</li><li>Scène chevalier/dragon/château déplacée en bas de l'accueil, sous les chapitres</li><li>Badge d'équipement des fiches remonté sous le titre</li><li>Nettoyage du menu des chapitres</li></ul>" },
  { v: 66, date: "04/08/2026", desc: "<ul><li>Réinitialisation (chapitre ou site) : suppression directe, avec 60s pour annuler via « REGRETS ? »</li><li>Épée du bouton haut de page pointe toujours à droite au repos</li></ul>" },
  { v: 65, date: "04/08/2026", desc: "Sur l'historique des versions (atteint via le numéro de version), l'épée du bouton pointe vers la droite pour indiquer le retour, au lieu de la gauche comme partout ailleurs." },
  { v: 64, date: "04/08/2026", desc: "Corrige le Graal du bouton haut de page qui devenait invisible au survol à la souris (sur ordinateur) — fond et icône passaient blancs en même temps." },
  { v: 63, date: "04/08/2026", desc: "Ajoute des bruitages synthétisés (aucun fichier audio, générés en direct) au Graal du bouton haut de page : un petit arpège féerique quand il apparaît, un blip discret à chaque clic pendant qu'il rétrécit, un « womp womp » comique quand il disparaît complètement." },
  { v: 62, date: "04/08/2026", desc: "<ul><li>Pantalon d'algèbre élargi (était invisible, identique au chevalier sans armure)</li><li>Bouton « haut de page » : Graal seulement au 3ᵉ appui, disparaît progressivement</li><li>Lien « RETOUR » redondant supprimé des fiches/historique</li></ul>" },
  { v: 61, date: "04/08/2026", desc: "Bouton « haut de page » : une fois de retour à l'accueil tout en haut, l'épée se transforme en petit Graal — il n'y a plus rien à remonter. Appuyer 3 fois de suite dessus le fait disparaître (avec humour) ; un appui de plus le fait revenir." },
  { v: 60, date: "04/08/2026", desc: "<ul><li>Badge d'équipement miniature en bas de chaque fiche, rempli selon la progression de la semaine</li><li>L'oiseau/dragon regarde vers le chevalier</li><li>Scène de victoire : épée plantée dans le dragon plutôt que dans la main du chevalier</li><li>Bouton « haut de page » : bug d'appuis rapides corrigé</li></ul>" },
  { v: 59, date: "04/08/2026", desc: "<ul><li>Pièces d'or et crânes du combat de la semaine séparés : pièces sous le chevalier (droite), crânes sous le dragon (gauche), en blanc comme le reste du pixel art</li><li>Chaque carte de chapitre affiche désormais un badge miniature de la pièce d'équipement correspondante, qui se remplit du bas vers le haut selon la progression de la semaine</li></ul>" },
  { v: 58, date: "04/08/2026", desc: "Ajoute l'illustration de défaite du combat hebdomadaire (symétrique de la victoire) : quand moins de 80% des exercices sont refaits avant le reset, le dragon debout et le chevalier au sol remplacent la scène de combat habituelle." },
  { v: 57, date: "04/08/2026", desc: "Le combat de la semaine affiche des pièces d'or (victoires) et des crânes rouges (défaites) en pixel art à la place des nombres en texte, avec bascule sur un compteur ×N au-delà de 5." },
  { v: 56, date: "04/08/2026", desc: "<ul><li>Le dragon/oiseau passe à gauche de la scène de combat, le chevalier à droite</li><li>Le chevalier a maintenant une silhouette de base toujours visible (sans armure) ; seules les pièces d'équipement gagnées viennent s'ajouter par dessus</li><li>Pile de crânes plus compacte au-delà de 5 : bascule sur un compteur ×N</li></ul>" },
  { v: 55, date: "04/08/2026", desc: "<ul><li>JAVA complété avec 2 sections tirées du cours (exceptions, AWT/événementiel) : 40 → 52 QCM</li><li>La note/20 ne s'affiche plus en permanence : elle apparaît avec son explication dans une bulle en appuyant directement sur la barre de progression globale</li><li>Corrige un flash grisé au relâchement du doigt sur la bulle</li><li>Le bouton « haut de page » devient un raccourci accueil quand on est déjà tout en haut : l'épée pivote vers la gauche pour l'indiquer</li></ul>" },
  { v: 54, date: "04/08/2026", desc: "<ul><li>Accolade sous la barre de progression globale affinée et réalignée</li><li>Note/20 déplacée sous l'accolade, ouvre l'explication au clic</li><li>Combat de la semaine déplacé sous le château/chevalier</li><li>Boutons fixes ne restent plus bloqués en blanc sur mobile</li></ul>" },
  { v: 53, date: "04/08/2026", desc: "<ul><li>Note théorique/20 raccourcie avec accolade pixel art cliquable (explication complète)</li><li>Badge, boutons et cartes alignés au pixel près</li><li>Épée du bouton « haut de page » affinée</li><li>Icône invisible au survol → corrigée ; boutons fixes stabilisés au défilement</li></ul>" },
  { v: 52, date: "04/08/2026", desc: "<ul><li>Bouton retour en haut de page (épée pixel art, bas droite)</li><li>Badge version + titre + bouton menu alignés sur une ligne</li><li>Œil de l'oiseau : un seul pixel au lieu d'un bloc de deux</li></ul>" },
  { v: 51, date: "04/08/2026", desc: "<ul><li>Badge de version qui chevauchait le bouton RETOUR → corrigé</li><li>Formule de LOGIQUE (quantificateurs) non rendue en KaTeX → corrigée</li><li>Pile de crânes farmable par resets répétés sans progrès → corrigée</li></ul>" },
  { v: 50, date: "03/08/2026", desc: "80% des exercices avant le reset = illustration de victoire : chevalier en armure, épée plantée sur le dragon vaincu." },
  { v: 49, date: "03/08/2026", desc: "Décor château + vallée en pixel art derrière la scène chevalier/dragon." },
  { v: 48, date: "03/08/2026", desc: "Chevalier hebdomadaire : chaque chapitre complété cette semaine ajoute une pièce d'équipement (bottes → épée)." },
  { v: 47, date: "03/08/2026", desc: "Combat hebdomadaire chevalier/dragon : couche à part, reset chaque lundi, victoire si 80% des exercices refaits dans la semaine." },
  { v: 46, date: "03/08/2026", desc: "JAVA refondu à partir du vrai cours : 27 → 40 QCM, 6 → 10 sections." },
  { v: 45, date: "03/08/2026", desc: "<ul><li>Mascotte oiseau/dragon qui grandit selon les jours d'inactivité</li><li>Pile de crânes + note théorique/20</li><li>Retrait de la salle au trésor et des gemmes</li></ul>" },
  { v: 44, date: "03/08/2026", desc: "Retire le système « chapitre pas encore sorti » : les 8 chapitres sont tous disponibles." },
  { v: 43, date: "03/08/2026", desc: "<ul><li>Moteur des fiches unifié en un seul fichier partagé</li><li>Barre sous le titre = grille de carrés cliquables, un par exercice</li><li>4 formules de PROBABILITÉS corrigées (KaTeX)</li><li>Nettoyage du code mort</li></ul>" },
  { v: 42, date: "03/08/2026", desc: "Supprime le sous-titre sous le titre de l'accueil." },
  { v: 41, date: "03/08/2026", desc: "Titre de l'accueil : « SYNTHÈSE » → « L1 MATHS »." },
  { v: 40, date: "03/08/2026", desc: "Symboles mal rendus (≤, ≥, ⊆…) corrigés : formules en police KaTeX, texte autour en police pixel." },
  { v: 39, date: "03/08/2026", desc: "<ul><li>Pixel manquant du grand crâne corrigé</li><li>Dates ajoutées à cet historique</li><li>Références aux enseignants retirées du code et des contenus</li></ul>" },
  { v: 38, date: "03/08/2026", desc: "« FIN DE FICHE » devient une question ouverte encourageante, tirée au hasard." },
  { v: 37, date: "03/08/2026", desc: "Numéro de version = lien vers cet historique." },
  { v: 36, date: "03/08/2026", desc: "Sections listes / boucle while / fonctions de PYTHON alignées sur le vrai cours." },
  { v: 35, date: "03/08/2026", desc: "Corrige le haut du grand crâne du menu (dôme connecté, plus de trou)." },
  { v: 34, date: "03/08/2026", desc: "Diamant tournant en haut à droite → cœur pixel-art qui bat." },
  { v: 33, date: "03/08/2026", desc: "Tête de mort du bouton reset alignée sur le modèle de référence." },
  { v: 32, date: "03/08/2026", desc: "Bandeau du bas : change à la navigation (plus par minuterie), ne garde que les blagues." },
  { v: 31, date: "03/08/2026", desc: "Blagues du bandeau du bas : 13 → 100+, tirage aléatoire sans répétition." },
  { v: 30, date: "03/08/2026", desc: "Cartes de chapitre : barre + score sur une ligne, arrêt toujours sur un carré entier." },
  { v: 29, date: "03/08/2026", desc: "Compteur de la barre globale aligné à droite, sur la ligne de la barre." },
  { v: 28, date: "03/08/2026", desc: "Supprime le badge « X exos » et le statut DISPONIBLE / À VENIR des cartes de chapitre." },
  { v: 27, date: "03/08/2026", desc: "Ajoute le compteur X/Y sur la barre de progression globale." },
  { v: 26, date: "03/08/2026", desc: "PYTHON terminé (22 → 43 QCM), JAVA ajouté (27 QCM) : les 8 chapitres sont tous disponibles." },
  { v: 25, date: "03/08/2026", desc: "Séparateur sous le titre de l'accueil → barre de progression globale." },
  { v: 24, date: "03/08/2026", desc: "LOGIQUE reconstruite : 10 → 34 QCM sur 6 sous-chapitres." },
  { v: 23, date: "03/08/2026", desc: "Ajoute les fiches PROBABILITÉS (23 QCM) et STATISTIQUES (17 QCM)." },
  { v: 22, date: "03/08/2026", desc: "Ajoute la fiche PYTHON (1re partie : variables, Matplotlib, conditions, boucle for)." },
  { v: 21, date: "03/08/2026", desc: "Le point central des boutons radio passe de blanc à noir." },
  { v: 20, date: "03/08/2026", desc: "Tête de mort repositionnée : au-dessus du texte dans le menu, en dessous sur les boutons de chapitre." },
  { v: 19, date: "03/08/2026", desc: "<ul><li>Badge de version ancré en haut</li><li>Score en vert quand un chapitre est terminé</li><li>Tête de mort en pixel art</li></ul>", note: "Pas de v18 distincte : correctif mineur embarqué avec la v19, sans changement visible." },
  { v: 17, date: "03/08/2026", desc: "Ajuste le texte, la couleur et la position des boutons de réinitialisation." },
  { v: 16, date: "03/08/2026", desc: "Explications sur les réponses incorrectes + boutons de reset par chapitre." },
  { v: 15, date: "03/08/2026", desc: "Blagues absurdes dans le bandeau du bas + police LaTeX pixelisée pour les formules." },
  { v: 14, date: "03/08/2026", desc: "Construit la fiche ANALYSE (Analyse 2)." },
  { v: 13, date: "03/08/2026", desc: "Complète la fiche CALCULUS : factorisation, primitives, systèmes d'équations." },
  { v: 12, date: "03/08/2026", desc: "Construit la fiche CALCULUS (pratique du calcul mathématique)." },
  { v: 11, date: "03/08/2026", desc: "Bug de cache navigateur corrigé + numéro de version affiché sur le site." },
  { v: 10, date: "03/08/2026", desc: "Menu coulissant des chapitres, cours détaillé, page d'accueil épurée." },
  { v: 9,  date: "03/08/2026", desc: "Construit la fiche ALGÈBRE : chapitre nombres complexes." },
  { v: 8,  date: "03/08/2026", desc: "<ul><li>Salle du trésor ajoutée</li><li>QCM passés à 3 réponses</li><li>Bug d'affichage des gemmes corrigé</li><li>Java/Python préparés</li></ul>" },
  { v: 7,  date: "02/08/2026", desc: "Remplace l'icône radar du menu par un cristal rubis animé en rotation 3D." },
  { v: 6,  date: "02/08/2026", desc: "Polices par rôle : Micro 5 (titres), Silkscreen (sous-titres), Jersey 10 (texte)." },
  { v: 5,  date: "02/08/2026", desc: "Réponse choisie = QCM validé direct." },
  { v: 4,  date: "02/08/2026", desc: "Choix de l'icône animée du menu (radar) et de la police pixel Micro 5." },
  { v: 3,  date: "02/08/2026", desc: "Refonte noir et blanc ; exercices en QCM avec rendu LaTeX." },
  { v: 2,  date: "02/08/2026", desc: "Premier lancement du site de révision L1 Maths, esthétique terminal pixelisé." },
  { v: 1,  date: "02/08/2026", desc: "Amorce du dépôt du site." },
];

function renderChangelog(){
  const container = document.getElementById('changelogContainer');
  if(!container) return;

  const currentVersion = Math.max(...VERSIONS.map(e => e.v));

  container.innerHTML = VERSIONS.map(entry => {
    const noteHTML = entry.note ? `<div class="changelog__note">${entry.note}</div>` : '';
    return `
      <div class="changelog__entry${entry.v === currentVersion ? ' current' : ''}">
        <div class="changelog__head">
          <span class="changelog__v">v${entry.v}</span>
          <span class="changelog__date">${entry.date}</span>
          ${entry.v === currentVersion ? '<span class="changelog__tag">ACTUELLE</span>' : ''}
        </div>
        <div class="changelog__desc">${entry.desc}</div>
        ${noteHTML}
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', renderChangelog);
