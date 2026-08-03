/* ============================================================
   L1 MATHS — SYNTHÈSE — knight.js
   Le chevalier du combat hebdomadaire : chaque pièce d'équipement
   correspond à un chapitre, et n'apparaît que si ce chapitre est
   à 100% sur la couche HEBDOMADAIRE (weekly.js) — pas la
   progression permanente. Rien n'est dessiné tant qu'aucune pièce
   n'est acquise. Chargé uniquement sur la page d'accueil.
   ============================================================ */

const KNIGHT_PIECES = [
  { chapterId: 'logique',      svg: () => KNIGHT_BOTTES_SVG,     z: 2 },
  { chapterId: 'algebre',      svg: () => KNIGHT_JAMBIERES_SVG,  z: 1 },
  { chapterId: 'calculus',     svg: () => KNIGHT_GANTELETS_SVG,  z: 6 },
  { chapterId: 'analyse',      svg: () => KNIGHT_PLASTRON_SVG,   z: 5 },
  { chapterId: 'probabilites', svg: () => KNIGHT_BOUCLIER_SVG,   z: 3 },
  { chapterId: 'statistiques', svg: () => KNIGHT_CAPE_SVG,       z: 0 },
  { chapterId: 'java',         svg: () => KNIGHT_CASQUE_SVG,     z: 7 },
  { chapterId: 'python',       svg: () => KNIGHT_EPEE_SVG,       z: 4 },
];

function renderKnight(){
  const zone = document.getElementById('knightZone');
  if(!zone) return;
  if(window.ensureWeekCurrent) window.ensureWeekCurrent();

  const acquired = KNIGHT_PIECES.filter(p => window.isChapterWeeklyComplete && window.isChapterWeeklyComplete(p.chapterId));

  if(acquired.length === 0){
    zone.innerHTML = '';
    zone.classList.remove('has-pieces');
    return;
  }

  zone.classList.add('has-pieces');
  const sorted = acquired.slice().sort((a, b) => a.z - b.z);
  zone.innerHTML = sorted.map(p => `<div class="knight-piece-wrap" style="z-index:${p.z}">${p.svg()}</div>`).join('');
}

document.addEventListener('DOMContentLoaded', renderKnight);
