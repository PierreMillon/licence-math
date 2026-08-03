/* ============================================================
   L1 MATHS — SYNTHÈSE — changelog.js
   Historique des versions du site (page changelog.html).
   Liste manuelle, à compléter à chaque nouvelle valeur de
   SITE_VERSION dans menu.js.
   ============================================================ */

const VERSIONS = [
  { v: 37, desc: "Le numéro de version devient un lien vers cette page d'historique." },
  { v: 36, desc: "Les sections listes, boucle while et fonctions de PYTHON s'appuient désormais sur le vrai texte du cours (Pascal Ortiz), plus sur de la syntaxe générique." },
  { v: 35, desc: "Corrige le haut du grand crâne du menu (dôme connecté, plus de trou)." },
  { v: 34, desc: "Remplace le diamant qui tournait en haut à droite par un cœur pixel-art qui bat." },
  { v: 33, desc: "Remplace la tête de mort du bouton de réinitialisation de chapitre par le design copié du modèle de référence." },
  { v: 32, desc: "Le bandeau du bas ne change plus qu'à la navigation entre pages (plus par minuterie) ; ne garde que les blagues." },
  { v: 31, desc: "Étoffe les blagues du bandeau du bas (13 → 100+), tirage aléatoire sans répétition dans une session." },
  { v: 30, desc: "Cartes de chapitre : barre de progression et score sur une seule ligne ; les barres s'arrêtent toujours sur un carré entier." },
  { v: 29, desc: "Aligne le compteur de la barre de progression globale à droite, sur la même ligne que la barre." },
  { v: 28, desc: "Supprime le badge « X exos » et le statut DISPONIBLE / À VENIR des cartes de chapitre." },
  { v: 27, desc: "Ajoute le compteur X/Y sur la barre de progression globale." },
  { v: 26, desc: "Termine PYTHON (22 → 43 QCM) et ajoute JAVA (27 QCM) : les 8 chapitres du site sont désormais tous disponibles." },
  { v: 25, desc: "Remplace le séparateur sous le titre de l'accueil par une barre de progression globale du site." },
  { v: 24, desc: "Reconstruit la fiche LOGIQUE : 10 → 34 QCM, répartis sur 6 sous-chapitres complets." },
  { v: 23, desc: "Ajoute les fiches PROBABILITÉS (23 QCM) et STATISTIQUES (17 QCM)." },
  { v: 22, desc: "Ajoute la fiche PYTHON (1ʳᵉ partie : variables, Matplotlib, conditions, boucle for)." },
  { v: 21, desc: "Le point central des boutons radio passe de blanc à noir." },
  { v: 20, desc: "Repositionne la tête de mort : au-dessus du texte dans le menu du site, en dessous sur les boutons de chapitre." },
  { v: 19, desc: "Badge de version qui reste ancré en haut (ne flotte plus au défilement) ; score en vert quand un chapitre est terminé ; tête de mort en pixel art." },
  { v: 17, desc: "Ajuste le texte, la couleur et la position des boutons de réinitialisation." },
  { v: 16, desc: "Ajoute les explications sur les réponses incorrectes, et les boutons de réinitialisation par chapitre." },
  { v: 15, desc: "Ajoute des blagues absurdes dans le bandeau du bas et une police LaTeX pixelisée pour les formules." },
  { v: 14, desc: "Construit la fiche ANALYSE (Analyse 2)." },
  { v: 13, desc: "Complète la fiche CALCULUS : factorisation, primitives, systèmes d'équations." },
  { v: 12, desc: "Construit la fiche CALCULUS (pratique du calcul mathématique)." },
  { v: 11, desc: "Corrige un bug de cache navigateur et ajoute le numéro de version affiché sur le site." },
  { v: 10, desc: "Menu coulissant des chapitres, cours détaillé, page d'accueil épurée." },
  { v: 9,  desc: "Construit la fiche ALGÈBRE : chapitre nombres complexes." },
  { v: 8,  desc: "Ajoute la salle du trésor, passe les QCM à 3 réponses, corrige un bug d'affichage des gemmes, prépare Java/Python." },
  { v: 7,  desc: "Remplace l'icône radar du menu par un cristal rubis animé en rotation 3D." },
  { v: 6,  desc: "Répartit les polices par rôle : Micro 5 (titres), Silkscreen (sous-titres), Jersey 10 (texte)." },
  { v: 5,  desc: "Les QCM sont validés instantanément dès qu'une réponse est sélectionnée." },
  { v: 4,  desc: "Choix de l'icône animée du menu (radar) et de la police pixel Micro 5." },
  { v: 3,  desc: "Refonte visuelle noir et blanc ; les exercices passent en QCM avec rendu LaTeX." },
  { v: 2,  desc: "Premier lancement du site de révision L1 Maths, esthétique terminal pixelisé." },
  { v: 1,  desc: "Amorce du dépôt du site." },
];

function renderChangelog(){
  const container = document.getElementById('changelogContainer');
  if(!container) return;

  const currentVersion = Math.max(...VERSIONS.map(e => e.v));

  container.innerHTML = VERSIONS.map((entry, i) => {
    const prev = VERSIONS[i - 1];
    const gapHTML = (prev && prev.v - entry.v > 1)
      ? `<div class="changelog__gap">···</div>`
      : '';
    return `
      ${gapHTML}
      <div class="changelog__entry${entry.v === currentVersion ? ' current' : ''}">
        <div class="changelog__head">
          <span class="changelog__v">v${entry.v}</span>
          ${entry.v === currentVersion ? '<span class="changelog__tag">ACTUELLE</span>' : ''}
        </div>
        <div class="changelog__desc">${entry.desc}</div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', renderChangelog);
