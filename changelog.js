/* ============================================================
   L1 MATHS — SYNTHÈSE — changelog.js
   Historique des versions du site (page changelog.html).
   Liste manuelle, à compléter à chaque nouvelle valeur de
   SITE_VERSION dans menu.js. Dates au format JJ/MM/AAAA.
   ============================================================ */

const VERSIONS = [
  { v: 43, date: "03/08/2026", desc: "Grand nettoyage : le moteur des fiches (rendu, QCM, progression) devient un seul fichier partagé au lieu d'être dupliqué dans les 8 chapitres. La barre sous le titre de chaque chapitre devient une grille de carrés cliquables (un par exercice, noir/vert/rouge). Corrige 4 formules de PROBABILITÉS qui ne passaient pas par KaTeX. Retire du code mort (CSS orpheline, fonction dupliquée)." },
  { v: 42, date: "03/08/2026", desc: "Supprime le sous-titre sous le titre de l'accueil." },
  { v: 41, date: "03/08/2026", desc: "Le titre de l'accueil passe de « SYNTHÈSE » à « L1 MATHS »." },
  { v: 40, date: "03/08/2026", desc: "Corrige les symboles mathématiques mal rendus (≤, ≥, ⊆…) : les formules gardent la police KaTeX d'origine, seul le texte autour reste en police pixel." },
  { v: 39, date: "03/08/2026", desc: "Corrige un pixel manquant en haut à droite du grand crâne ; ajoute les dates à cet historique ; retire les références nominatives aux enseignants du code et des contenus." },
  { v: 38, date: "03/08/2026", desc: "La phrase « FIN DE FICHE » devient une question ouverte, encourageante, tirée au hasard sans répétition." },
  { v: 37, date: "03/08/2026", desc: "Le numéro de version devient un lien vers cette page d'historique." },
  { v: 36, date: "03/08/2026", desc: "Les sections listes, boucle while et fonctions de PYTHON s'appuient désormais sur le vrai texte du cours, plus sur de la syntaxe générique." },
  { v: 35, date: "03/08/2026", desc: "Corrige le haut du grand crâne du menu (dôme connecté, plus de trou)." },
  { v: 34, date: "03/08/2026", desc: "Remplace le diamant qui tournait en haut à droite par un cœur pixel-art qui bat." },
  { v: 33, date: "03/08/2026", desc: "Remplace la tête de mort du bouton de réinitialisation de chapitre par le design copié du modèle de référence." },
  { v: 32, date: "03/08/2026", desc: "Le bandeau du bas ne change plus qu'à la navigation entre pages (plus par minuterie) ; ne garde que les blagues." },
  { v: 31, date: "03/08/2026", desc: "Étoffe les blagues du bandeau du bas (13 → 100+), tirage aléatoire sans répétition dans une session." },
  { v: 30, date: "03/08/2026", desc: "Cartes de chapitre : barre de progression et score sur une seule ligne ; les barres s'arrêtent toujours sur un carré entier." },
  { v: 29, date: "03/08/2026", desc: "Aligne le compteur de la barre de progression globale à droite, sur la même ligne que la barre." },
  { v: 28, date: "03/08/2026", desc: "Supprime le badge « X exos » et le statut DISPONIBLE / À VENIR des cartes de chapitre." },
  { v: 27, date: "03/08/2026", desc: "Ajoute le compteur X/Y sur la barre de progression globale." },
  { v: 26, date: "03/08/2026", desc: "Termine PYTHON (22 → 43 QCM) et ajoute JAVA (27 QCM) : les 8 chapitres du site sont désormais tous disponibles." },
  { v: 25, date: "03/08/2026", desc: "Remplace le séparateur sous le titre de l'accueil par une barre de progression globale du site." },
  { v: 24, date: "03/08/2026", desc: "Reconstruit la fiche LOGIQUE : 10 → 34 QCM, répartis sur 6 sous-chapitres complets." },
  { v: 23, date: "03/08/2026", desc: "Ajoute les fiches PROBABILITÉS (23 QCM) et STATISTIQUES (17 QCM)." },
  { v: 22, date: "03/08/2026", desc: "Ajoute la fiche PYTHON (1ʳᵉ partie : variables, Matplotlib, conditions, boucle for)." },
  { v: 21, date: "03/08/2026", desc: "Le point central des boutons radio passe de blanc à noir." },
  { v: 20, date: "03/08/2026", desc: "Repositionne la tête de mort : au-dessus du texte dans le menu du site, en dessous sur les boutons de chapitre." },
  { v: 19, date: "03/08/2026", desc: "Badge de version qui reste ancré en haut (ne flotte plus au défilement) ; score en vert quand un chapitre est terminé ; tête de mort en pixel art.", note: "Pas de v18 distincte : un correctif mineur a été embarqué dans le même lot que la v19, sans changement visible à part." },
  { v: 17, date: "03/08/2026", desc: "Ajuste le texte, la couleur et la position des boutons de réinitialisation." },
  { v: 16, date: "03/08/2026", desc: "Ajoute les explications sur les réponses incorrectes, et les boutons de réinitialisation par chapitre." },
  { v: 15, date: "03/08/2026", desc: "Ajoute des blagues absurdes dans le bandeau du bas et une police LaTeX pixelisée pour les formules." },
  { v: 14, date: "03/08/2026", desc: "Construit la fiche ANALYSE (Analyse 2)." },
  { v: 13, date: "03/08/2026", desc: "Complète la fiche CALCULUS : factorisation, primitives, systèmes d'équations." },
  { v: 12, date: "03/08/2026", desc: "Construit la fiche CALCULUS (pratique du calcul mathématique)." },
  { v: 11, date: "03/08/2026", desc: "Corrige un bug de cache navigateur et ajoute le numéro de version affiché sur le site." },
  { v: 10, date: "03/08/2026", desc: "Menu coulissant des chapitres, cours détaillé, page d'accueil épurée." },
  { v: 9,  date: "03/08/2026", desc: "Construit la fiche ALGÈBRE : chapitre nombres complexes." },
  { v: 8,  date: "03/08/2026", desc: "Ajoute la salle du trésor, passe les QCM à 3 réponses, corrige un bug d'affichage des gemmes, prépare Java/Python." },
  { v: 7,  date: "02/08/2026", desc: "Remplace l'icône radar du menu par un cristal rubis animé en rotation 3D." },
  { v: 6,  date: "02/08/2026", desc: "Répartit les polices par rôle : Micro 5 (titres), Silkscreen (sous-titres), Jersey 10 (texte)." },
  { v: 5,  date: "02/08/2026", desc: "Les QCM sont validés instantanément dès qu'une réponse est sélectionnée." },
  { v: 4,  date: "02/08/2026", desc: "Choix de l'icône animée du menu (radar) et de la police pixel Micro 5." },
  { v: 3,  date: "02/08/2026", desc: "Refonte visuelle noir et blanc ; les exercices passent en QCM avec rendu LaTeX." },
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
