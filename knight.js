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

function renderKnight(){
  const zone = document.getElementById('knightZone');
  const figure = document.getElementById('knightFigure');
  if(!zone || !figure) return;
  if(window.ensureWeekCurrent) window.ensureWeekCurrent();

  zone.classList.add('has-pieces');
  const sorted = KNIGHT_PIECES.slice().sort((a, b) => a.z - b.z);
  const baseHTML = `<div class="knight-piece-wrap" style="z-index:-1">${KNIGHT_BASE_SVG}</div>`;
  const piecesHTML = sorted.map(p => {
    const fraction = window.weeklyChapterFraction ? window.weeklyChapterFraction(p.chapterId) : 0;
    const clip = knightPieceClipStyle(fraction, p.yMin, p.yMax);
    return `<div class="knight-piece-wrap" style="z-index:${p.z};${clip}">${p.svg()}</div>`;
  }).join('');
  figure.innerHTML = baseHTML + piecesHTML;
}
window.renderKnight = renderKnight;

document.addEventListener('DOMContentLoaded', renderKnight);
