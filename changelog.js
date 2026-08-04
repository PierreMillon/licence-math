/* ============================================================
   L1 MATHS — SYNTHÈSE — changelog.js
   Historique des versions du site (page changelog.html).
   Liste manuelle, à compléter à chaque nouvelle valeur de
   SITE_VERSION dans menu.js. Dates au format JJ/MM/AAAA.
   ============================================================ */

const VERSIONS = [
  { v: 58, date: "04/08/2026", desc: "Ajoute l'illustration de défaite du combat hebdomadaire (symétrique de la victoire) : quand moins de 80% des exercices sont refaits avant le reset, le dragon debout et le chevalier au sol remplacent la scène de combat habituelle." },
  { v: 57, date: "04/08/2026", desc: "Le combat de la semaine affiche des pièces d'or (victoires) et des crânes rouges (défaites) en pixel art à la place des nombres en texte, avec bascule sur un compteur ×N au-delà de 5." },
  { v: 56, date: "04/08/2026", desc: "<ul><li>Le dragon/oiseau passe à gauche de la scène de combat, le chevalier à droite</li><li>Le chevalier a maintenant une silhouette de base toujours visible (sans armure) ; seules les pièces d'équipement gagnées viennent s'ajouter par dessus</li><li>Pile de crânes plus compacte au-delà de 5 : bascule sur un compteur ×N</li></ul>" },
  { v: 55, date: "04/08/2026", desc: "<ul><li>JAVA complété avec 2 sections tirées du cours (exceptions, AWT/événementiel) : 40 → 52 QCM</li><li>La note/20 ne s'affiche plus en permanence : elle apparaît avec son explication dans une bulle en appuyant directement sur la barre de progression globale</li><li>Corrige un flash grisé au relâchement du doigt sur la bulle</li><li>Le bouton « haut de page » devient un raccourci accueil quand on est déjà tout en haut : l'épée pivote vers la gauche pour l'indiquer</li></ul>" },
  { v: 54, date: "04/08/2026", desc: "<ul><li>Accolade sous la barre de progression globale : plus fine, alignée pile sur le début/fin de la barre</li><li>Note/20 déplacée en dessous de l'accolade, sans « ≈ » ; c'est elle (et non l'accolade) qui ouvre l'explication au clic/appui</li><li>Le combat de la semaine passe sous l'image du château/chevalier au lieu d'être en haut</li><li>Les boutons fixes (menu, haut de page) ne restent plus bloqués en blanc après un appui sur mobile — juste un bref flash</li></ul>" },
  { v: 53, date: "04/08/2026", desc: "<ul><li>Note théorique/20 raccourcie, avec une accolade pixel art : cliquer dessus (ou rester appuyé sur mobile, la bulle suit le doigt) affiche l'explication complète</li><li>Badge, boutons et cartes de contenu alignés au pixel près sur les bords gauche/droite</li><li>Épée du bouton « haut de page » : lame fine sans le triangle à la base, pointe vers le haut</li><li>Icône du bouton « haut de page » qui devenait invisible au survol/appui → corrigé</li><li>Boutons fixes qui tremblaient légèrement au défilement → stabilisés</li></ul>" },
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
