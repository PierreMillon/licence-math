/* ============================================================
   L1 MATHS — SYNTHÈSE — knight.js
   Le chevalier du combat hebdomadaire : chaque pièce d'équipement
   correspond à un chapitre et se révèle progressivement du bas vers
   le haut, au fil des bonnes réponses de la semaine dans ce chapitre
   (couche HEBDOMADAIRE, weekly.js — pas la progression permanente) :
   rien à 0%, entièrement visible à 100%. Chargé sur la page d'accueil
   (surimpression sur le chevalier en couleur, voir KNIGHT_GIRL_OVERLAY
   plus bas) et sur les fiches (pièce miniature en bas de page).
   ============================================================ */

/* Ordre z (10/08/2026, corrigé) : le bouclier et l'épée sont tenus
   devant le corps, à bout de bras — ils doivent donc passer AU-DESSUS
   du plastron et des gantelets, sinon ces deux pièces (larges et
   quasi pleines depuis leurs propres retouches) les recouvrent
   entièrement et les rendent invisibles. Casque toujours au sommet
   (la tête dépasse de tout le reste). */
const KNIGHT_PIECES = [
  { chapterId: 'logique',      svg: () => KNIGHT_BOTTES_SVG,     z: 2 },
  { chapterId: 'algebre',      svg: () => KNIGHT_JAMBIERES_SVG,  z: 1 },
  { chapterId: 'calculus',     svg: () => KNIGHT_GANTELETS_SVG,  z: 4 },
  { chapterId: 'analyse',      svg: () => KNIGHT_PLASTRON_SVG,   z: 3 },
  { chapterId: 'probabilites', svg: () => KNIGHT_BOUCLIER_SVG,   z: 5 },
  { chapterId: 'statistiques', svg: () => KNIGHT_CAPE_SVG,       z: 0 },
  { chapterId: 'java',         svg: () => KNIGHT_CASQUE_SVG,     z: 7 },
  { chapterId: 'python',       svg: () => KNIGHT_EPEE_SVG,       z: 6 },
];
window.KNIGHT_PIECES = KNIGHT_PIECES;

/* Bornes propres à chaque pièce (dans le viewBox 38x62 partagé par le
   dessin des pièces), utilisées pour recadrer chaque pièce sur elle-même
   au lieu de la laisser perdue dans le cadre 38x62 entier — aussi bien
   pour les badges miniatures (cartes chapitre, bas de fiche) que pour la
   surimpression sur le chevalier en couleur (renderKnight ci-dessous). */
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
  // Repéré au pixel près sur un rendu réel de KNIGHT_GIRL_SVG (capture
  // #knightZone, figure = 64x181px) : tête x22-44/y18-48, main gauche
  // x9-19/y74-113, main droite x49-61/y72-117, chemise x14-61/y47-92,
  // jean x16-59/y93-161, pied gauche x3-31 et pied droit x41-59 en
  // y162-178. Les pièces sont étirées avec preserveAspectRatio="none"
  // (voir renderKnight) donc ces zones sont remplies exactement, sans
  // recadrage centré qui les décalerait.
  // java (casque) corrigé le 10/08/2026 : la zone "tête" ci-dessus ne
  // mesurait que la peau du visage, pas les cheveux — un casque plein
  // stretché sur cette zone-là laissait les cheveux (bien plus larges
  // ET plus hauts, x6-30/y1-30 sur le viewBox 33x94 du chevalier)
  // dépasser sur les côtés. Remesuré directement sur le groupe cyan
  // (cheveux) de KNIGHT_GIRL_SVG : left=18%, top=1%, width=73%,
  // height=31%, avec une petite marge de sécurité.
  java:         { left: 17, top: 0,  width: 75, height: 33 }, // casque   → tête + cheveux
  statistiques: { left: 8,  top: 23, width: 92, height: 34 }, // cape     → derrière le buste/épaules
  analyse:      { left: 22, top: 26, width: 73, height: 25 }, // plastron → chemise
  // bouclier/épée retaillés le 10/08/2026 (2e retour, "on voit pas
  // l'épée et le bouclier") : les cadres précédents étaient bien plus
  // grands que la silhouette réelle de l'objet une fois ses propres
  // proportions conservées (voir KNIGHT_HELD_OBJECTS) — l'objet ne
  // remplissait qu'une petite portion du cadre, flottant, à peine
  // visible. Recalés sur l'aspect ratio réel de chaque pièce (11:17
  // pour le bouclier, 7:29 pour l'épée) pour que l'objet remplisse
  // tout son cadre, puis pivotés (KNIGHT_HELD_ROTATION).
  probabilites: { left: 3,  top: 27, width: 29, height: 16 }, // bouclier → bras gauche
  python:       { left: 72, top: 11, width: 25, height: 36 }, // épée     → tenue dans la main droite
  calculus:     { left: 14, top: 39, width: 82, height: 26 }, // gantelets→ les deux mains
  algebre:      { left: 25, top: 51, width: 67, height: 38 }, // jambières→ le jean
  logique:      { left: 5,  top: 89, width: 87, height: 10 }, // bottes   → les deux pieds
};

/* Bouclier et épée ne sont pas de l'armure portée à même le corps :
   ce sont des objets tenus, bien plus fins/étroits que la zone qui
   leur est réservée. Les étirer en preserveAspectRatio="none" comme
   les autres pièces les déformait en gros pavé de la même couleur
   gris/or que le plastron et les gantelets juste à côté — résultat :
   invisibles à l'œil, noyés dans le reste de l'armure (retour du
   10/08/2026 : "on voit pas l'épée et le bouclier"). Pour ces deux-là
   seulement on garde leurs proportions d'origine (comportement par
   défaut "meet"), pour qu'ils gardent une silhouette reconnaissable
   (bouclier en écusson, épée fine avec pommeau) au lieu de se fondre. */
const KNIGHT_HELD_OBJECTS = new Set(['probabilites', 'python']);

/* Rotation appliquée à ces deux objets tenus (retour du 10/08/2026 :
   "oriente-les, tu fais des rotations") — épée pivotée autour de la
   garde/main (bas de la pièce) pour que la pointe (haut de la pièce)
   parte vers l'extérieur du corps (le chevalier est tourné vers la
   gauche, l'épée est tenue côté droit) ; bouclier pivoté autour de
   son centre pour un angle de garde naturel. */
const KNIGHT_HELD_ROTATION = {
  python:       { deg: 38,  origin: '50% 100%' }, // épée     → pivote sur la garde, pointe vers l'extérieur
  probabilites: { deg: -14, origin: '50% 50%'  }, // bouclier → léger angle de garde
};

/* Refonte "pièce forgée" du 11/08/2026 (demande explicite, voir
   CLAUDE.md) : la révélation progressive (bas vers haut) reste sur la
   petite icône de la carte de chapitre (app.js, inchangée — elle
   utilisait déjà exactement ce mécanisme), mais sur le grand
   chevalier une pièce n'apparaît plus qu'une fois son chapitre à
   100% — rien avant, entière d'un coup à 100%, jamais de version
   partielle sur le corps. Résout à la racine le problème des cheveux
   qui dépassaient du casque pendant sa révélation progressive (plus
   de révélation du tout à gérer ici, juste un oui/non). */
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
    if(fraction < 1) return ''; // pas encore forgée : rien sur le chevalier
    // preserveAspectRatio="none" : sur le badge (aspect carré) on veut
    // garder les proportions d'origine de la pièce, mais ici la pièce
    // doit remplir EXACTEMENT la zone du corps choisie (KNIGHT_GIRL_
    // OVERLAY), sinon le comportement par défaut ("meet") la recadre au
    // centre et elle ne touche plus la main/le pied visé. Exception :
    // bouclier/épée (KNIGHT_HELD_OBJECTS, voir plus haut) gardent leurs
    // proportions.
    const aspectAttr = KNIGHT_HELD_OBJECTS.has(p.chapterId) ? '' : 'preserveAspectRatio="none" ';
    const miniSvg = knightPieceMiniSVG(p.chapterId, p.svg())
      .replace('<svg ', `<svg ${aspectAttr}`);
    const rot = KNIGHT_HELD_ROTATION[p.chapterId];
    const rotStyle = rot ? `transform:rotate(${rot.deg}deg);transform-origin:${rot.origin};` : '';
    const pos = `position:absolute;left:${spot.left}%;top:${spot.top}%;width:${spot.width}%;height:${spot.height}%;z-index:${p.z};${rotStyle}`;
    return `<div class="knight-piece-wrap" style="${pos}">${miniSvg}</div>`;
  }).join('');
  figure.innerHTML = piecesHTML;
}
window.renderKnight = renderKnight;

document.addEventListener('DOMContentLoaded', renderKnight);
