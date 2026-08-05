/* ============================================================
   L1 MATHS — SYNTHÈSE — knight.js
   Le chevalier du combat hebdomadaire : la silhouette de base est
   toujours présente (chevalier sans armure). Chaque pièce
   d'équipement correspond à un chapitre et se révèle
   progressivement du bas vers le haut PROPRE À LA PIÈCE (pas au
   cadre entier), au fil des bonnes réponses de la semaine dans ce
   chapitre (couche HEBDOMADAIRE, weekly.js — pas la progression
   permanente) : rien à 0%, entièrement visible à 100%. Chargé sur
   la page d'accueil et sur les fiches (pièce miniature en bas de
   page). Le viewBox partagé des pièces fait 38x62.
   ============================================================ */

const KNIGHT_VIEWBOX_HEIGHT = 62;
const KNIGHT_VIEWBOX_WIDTH = 38;

const KNIGHT_PIECES = [
  { chapterId: 'logique',      svg: () => KNIGHT_BOTTES_SVG,     z: 2, yMin: 49, yMax: 54 },
  { chapterId: 'algebre',      svg: () => KNIGHT_JAMBIERES_SVG,  z: 1, yMin: 34, yMax: 48 },
  { chapterId: 'calculus',     svg: () => KNIGHT_GANTELETS_SVG,  z: 6, yMin: 25, yMax: 32 },
  { chapterId: 'analyse',      svg: () => KNIGHT_PLASTRON_SVG,   z: 5, yMin: 16, yMax: 34 },
  { chapterId: 'probabilites', svg: () => KNIGHT_BOUCLIER_SVG,   z: 3, yMin: 20, yMax: 34 },
  { chapterId: 'statistiques', svg: () => KNIGHT_CAPE_SVG,       z: 0, yMin: 15, yMax: 35 },
  { chapterId: 'java',         svg: () => KNIGHT_CASQUE_SVG,     z: 7, yMin: 1,  yMax: 13 },
  { chapterId: 'python',       svg: () => KNIGHT_EPEE_SVG,       z: 4, yMin: 9,  yMax: 35 },
];
window.KNIGHT_PIECES = KNIGHT_PIECES;

function knightPieceClipStyle(fraction, yMin, yMax){
  const f = Math.max(0, Math.min(1, fraction));
  const clipTop = yMax - f * (yMax - yMin);
  const hiddenPct = Math.round((clipTop / KNIGHT_VIEWBOX_HEIGHT) * 1000) / 10;
  return `clip-path:inset(${hiddenPct}% 0 0 0);-webkit-clip-path:inset(${hiddenPct}% 0 0 0);`;
}
window.knightPieceClipStyle = knightPieceClipStyle;

/* Bornes propres à chaque pièce (hors cadre partagé du chevalier), pour les
   badges miniatures (cartes chapitre, bas de fiche) : on recadre le viewBox
   sur la pièce elle-même pour qu'elle remplisse le badge au lieu d'être
   perdue dans le cadre 38x62 entier. */
const KNIGHT_PIECE_BOUNDS = {
  logique:      { xMin: 13, xMax: 28, yMin: 49, yMax: 55 },
  algebre:      { xMin: 15, xMax: 25, yMin: 34, yMax: 49 },
  calculus:     { xMin: 9,  xMax: 29, yMin: 25, yMax: 33 },
  analyse:      { xMin: 14, xMax: 24, yMin: 16, yMax: 35 },
  probabilites: { xMin: 5,  xMax: 14, yMin: 20, yMax: 35 },
  statistiques: { xMin: 9,  xMax: 29, yMin: 15, yMax: 36 },
  java:         { xMin: 11, xMax: 27, yMin: 1,  yMax: 14 },
  python:       { xMin: 28, xMax: 33, yMin: 9,  yMax: 36 },
};

function knightPieceMiniSVG(chapterId, svgString){
  const b = KNIGHT_PIECE_BOUNDS[chapterId];
  if(!b) return svgString;
  const pad = 1;
  const x = Math.max(0, b.xMin - pad);
  const y = Math.max(0, b.yMin - pad);
  const w = (b.xMax - b.xMin) + pad * 2;
  const h = (b.yMax - b.yMin) + pad * 2;
  return svgString.replace(/viewBox="[^"]*"/, `viewBox="${x} ${y} ${w} ${h}"`);
}
window.knightPieceMiniSVG = knightPieceMiniSVG;

function miniPieceClipStyle(fraction){
  const f = Math.max(0, Math.min(1, fraction));
  const hiddenPct = Math.round((1 - f) * 1000) / 10;
  return `clip-path:inset(${hiddenPct}% 0 0 0);-webkit-clip-path:inset(${hiddenPct}% 0 0 0);`;
}
window.miniPieceClipStyle = miniPieceClipStyle;

/* Le chevalier de base n'est plus une silhouette fantôme séparée : c'est
   directement le chevalier en couleur (KNIGHT_GIRL_SVG, scene.js). Chaque
   pièce d'équipement est recadrée sur ses propres bornes (KNIGHT_PIECE_
   BOUNDS, comme pour les badges miniatures) puis posée en surimpression
   à un emplacement choisi À LA MAIN pour cette silhouette précise (pas
   un simple report en % de l'ancien cadre 38x62, trop différent en
   proportions) — repéré à partir des zones de couleur du dessin du
   chevalier lui-même (tête/cheveux, chemise, jean, pieds). On ne touche
   jamais au dessin des pièces : seuls leur taille et leur emplacement
   sont ajustés ici. */
const KNIGHT_GIRL_OVERLAY = {
  //               left    top     width   height   (% du cadre du chevalier)
  java:         { left: 14, top: 0,   width: 66, height: 23 }, // casque   → tête
  statistiques: { left: 4,  top: 18,  width: 90, height: 34 }, // cape     → derrière le buste
  analyse:      { left: 14, top: 25,  width: 68, height: 25 }, // plastron → chemise
  probabilites: { left: 0,  top: 33,  width: 34, height: 24 }, // bouclier → bras gauche
  python:       { left: 68, top: 8,   width: 30, height: 55 }, // épée     → le long du bras droit
  calculus:     { left: 2,  top: 54,  width: 96, height: 12 }, // gantelets→ mains
  algebre:      { left: 16, top: 51,  width: 66, height: 30 }, // jambières→ haut du jean
  logique:      { left: 20, top: 84,  width: 58, height: 13 }, // bottes   → pieds
};

function renderKnight(){
  const zone = document.getElementById('knightZone');
  const figure = document.getElementById('knightFigure');
  if(!zone || !figure) return;
  if(window.ensureWeekCurrent) window.ensureWeekCurrent();

  const sorted = KNIGHT_PIECES.slice().sort((a, b) => a.z - b.z);
  const piecesHTML = sorted.map(p => {
    const spot = KNIGHT_GIRL_OVERLAY[p.chapterId];
    if(!spot) return '';
    const fraction = window.weeklyChapterFraction ? window.weeklyChapterFraction(p.chapterId) : 0;
    const miniSvg = knightPieceMiniSVG(p.chapterId, p.svg());
    const clip = miniPieceClipStyle(fraction);
    const pos = `position:absolute;left:${spot.left}%;top:${spot.top}%;width:${spot.width}%;height:${spot.height}%;z-index:${p.z};`;
    return `<div class="knight-piece-wrap" style="${pos}${clip}">${miniSvg}</div>`;
  }).join('');
  figure.innerHTML = piecesHTML;
}
window.renderKnight = renderKnight;

document.addEventListener('DOMContentLoaded', renderKnight);
