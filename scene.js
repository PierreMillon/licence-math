/* ============================================================
   L1 MATHS — SYNTHÈSE — scene.js
   Habillage de la scène de combat de la page d'accueil.

   Refonte du 18/08/2026 (demande explicite, chantier de
   simplification) : plus de château/grotte/lune en arrière-plan —
   une seule bande compacte (#battleStrip) avec un sol, le dragon de
   la semaine à gauche qui s'approche jour par jour, et le chevalier
   à droite qui s'équipe au fil de la semaine (système d'armure,
   knight.js, inchangé). Hauteur de la bande calée sur celle d'une
   carte de chapitre (alignBattleStripHeight, mesurée — pas une valeur
   fixe, voir CLAUDE.md sur la fragilité des tailles codées en dur).
   L'oiseau (creature.js) n'est plus dans cette scène du tout : il est
   désormais isolé tout en bas de la page, entièrement indépendant.
   ============================================================ */

/* ---------- chevalier (personnage complet) ---------- */
function renderKnightGirl(){
  const el = document.getElementById('knightGirl');
  if(!el || typeof KNIGHT_GIRL_SVG === 'undefined') return;
  el.innerHTML = KNIGHT_GIRL_SVG;
}

/* ---------- hauteur de la bande de combat, calée sur une carte de
   chapitre (demande explicite : "aussi haut qu'une carte de chapitre
   entière") ---------- */
/* Doit s'exécuter APRÈS que app.js ait construit la grille de
   chapitres (#chapterGrid) pour pouvoir mesurer une vraie carte —
   d'où le réordonnancement des balises <script> dans index.html
   (app.js chargé avant scene.js, inhabituel sur ce site où scene.js
   passait avant : nécessaire ici puisque le dragon/chevalier ont
   maintenant besoin de connaître la hauteur de la bande AVANT de se
   dessiner). Mesurée plutôt que codée en dur : une carte de chapitre
   n'a pas de hauteur fixe (dépend de la police chargée, de la largeur
   d'écran qui peut faire passer le titre à la ligne, etc.). */
function alignBattleStripHeight(){
  const strip = document.getElementById('battleStrip');
  const card = document.querySelector('.chapter-card');
  if(!strip || !card) return;
  const h = card.getBoundingClientRect().height;
  if(h > 0) strip.style.height = Math.round(h) + 'px';
}
window.alignBattleStripHeight = alignBattleStripHeight;

/* ---------- dragon de la semaine : s'approche jour après jour ---------- */
/* Système remis à plat le 18/08/2026 (voir CLAUDE.md) : plus de
   positions en pixels calées à l'œil sur un écran de 390px (fragile,
   débordait sous ~320px, plusieurs correctifs successifs) — chaque
   palier est maintenant une fraction de la largeur RÉELLE de la bande
   (#battleStrip), mesurée à chaque rendu.
   Taille FIXE (demande explicite du 18/08/2026, "enlève les
   variations de taille, grand tout le temps") : DRAGON_HEIGHT_FRAC
   fixe la hauteur à 100% de la bande pour tous les paliers, seule sa
   position (leftFrac) avance d'un jour à l'autre.
   UN SEUL dessin désormais, DRAGON_VICTORIOUS_SVG, tous les jours y
   compris le lundi (retour du 18/08/2026 — l'ancienne pose "endormie
   roulée en boule", DRAGON_SVG, donnait un gros blob gris à cette
   taille : trop pleine, pas assez de trous internes pour que la
   technique du contour trace quoi que ce soit, quelle que soit
   l'échelle — pas juste un problème de petite taille comme supposé au
   11/08/2026). L'opacité réduite du lundi ("pas encore réveillé")
   retirée aussi juste après (même demande) : le dragon a exactement
   le même rendu tous les jours, seule sa position (leftFrac) avance.
   Regarde vers la gauche par défaut — mirroir horizontal pour qu'il
   regarde vers la droite (vers le chevalier). */
const DRAGON_HEIGHT_FRAC = 1.0;
const DRAGON_VICTORIOUS_ASPECT = 100 / 95;
const WEEK_DRAGON_TIERS = [
  // leftFrac : position du bord gauche du dragon, en fraction de la largeur de la bande.
  { leftFrac: 0.02 }, // lundi
  { leftFrac: 0.04 }, // mardi
  { leftFrac: 0.10 }, // mercredi
  { leftFrac: 0.18 }, // jeudi
  { leftFrac: 0.28 }, // vendredi
  { leftFrac: 0.42 }, // samedi : tout près du chevalier
];

/* Lundi=palier 0 ... samedi=palier 5 ; dimanche (combat déjà joué)
   reste sur le palier d'arrivée. */
function weekDragonTier(date){
  const day = date.getDay(); // 0=dimanche .. 6=samedi
  if(day === 0) return 5;
  return day - 1;
}

/* Épaisseur cible du contour blanc du dragon, en unités de sa propre
   grille source (pas en px écran) — voir renderWeekDragon, calcul de
   outlinePx. Technique en copies DOM (12/08/2026, voir CLAUDE.md) :
   confirmée fonctionnelle sur iPhone réel, conservée telle quelle. */
const DRAGON_OUTLINE_UNIT_THICKNESS = 1;

function renderWeekDragon(){
  const el = document.getElementById('sceneDragon');
  const strip = document.getElementById('battleStrip');
  if(!el || !strip || typeof DRAGON_VICTORIOUS_SVG === 'undefined') return;
  const stripRect = strip.getBoundingClientRect();
  if(stripRect.height === 0 || stripRect.width === 0) return; // pas encore mis en page

  const tier = WEEK_DRAGON_TIERS[weekDragonTier(new Date())];

  const heightPx = DRAGON_HEIGHT_FRAC * stripRect.height;
  const widthPx = heightPx * DRAGON_VICTORIOUS_ASPECT;
  el.style.height = heightPx + 'px';
  el.style.width = widthPx + 'px';
  el.style.left = (tier.leftFrac * stripRect.width) + 'px';
  el.style.transform = 'scaleX(-1)'; // regarde vers la droite, vers le chevalier

  /* Épaisseur du contour blanc — cible ~1 unité de la grille source du
     dragon (voir CLAUDE.md, refonte du 12/08/2026) : 8 copies DOM
     blanches légèrement décalées (transform:translate) derrière une
     copie noire sans décalage, plutôt qu'un filtre drop-shadow
     (invisible sur Safari réel à deux reprises malgré deux correctifs
     différents — abandonné pour cette technique, confirmée fiable
     depuis sur iPhone réel). */
  const outlinePx = (widthPx / 100) * DRAGON_OUTLINE_UNIT_THICKNESS;
  const offsets = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
  let html = '';
  for(const [dx, dy] of offsets){
    const tx = (dx * outlinePx).toFixed(2);
    const ty = (dy * outlinePx).toFixed(2);
    html += `<div class="dragon-copy dragon-copy--outline" style="transform:translate(${tx}px, ${ty}px)">${DRAGON_VICTORIOUS_SVG}</div>`;
  }
  html += `<div class="dragon-copy dragon-copy--main">${DRAGON_VICTORIOUS_SVG}</div>`;
  el.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  renderKnightGirl();
  // Ordre important : la hauteur de la bande doit être connue avant
  // de positionner le dragon (renderWeekDragon en dépend).
  alignBattleStripHeight();
  renderWeekDragon();
  window.addEventListener('load', () => {
    alignBattleStripHeight();
    renderWeekDragon();
  });
  let sceneResizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(sceneResizeTimer);
    sceneResizeTimer = setTimeout(() => {
      alignBattleStripHeight();
      renderWeekDragon();
    }, 150);
  });
});
