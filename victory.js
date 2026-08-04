/* ============================================================
   L1 MATHS — SYNTHÈSE — victory.js
   Illustration de victoire hebdomadaire : quand le combat de la
   semaine (weekly.js) se résout en victoire, remplace la scène
   de combat habituelle par le chevalier en armure complète,
   épée plantée sur le dragon vaincu. Se referme au clic et
   efface le drapeau de résultat (weekly.js le repose au prochain
   lundi si le joueur regagne). Chargé uniquement sur la page
   d'accueil, après knight.js.
   ============================================================ */

const LAST_BATTLE_RESULT_KEY = 'l1maths_last_battle_result';

function renderVictoryScene(){
  const scene = document.getElementById('victoryScene');
  const battle = document.getElementById('battleScene');
  if(!scene) return;

  const won = localStorage.getItem(LAST_BATTLE_RESULT_KEY) === 'victory';
  scene.hidden = !won;
  if(battle) battle.hidden = won;
  if(!won) return;

  const dragonZone = document.getElementById('victoryDragon');
  const knightZone = document.getElementById('victoryKnight');
  const swordZone = document.getElementById('victorySword');

  if(dragonZone) dragonZone.innerHTML = DRAGON_SVG;
  if(knightZone && typeof KNIGHT_PIECES !== 'undefined'){
    const sorted = KNIGHT_PIECES.slice().sort((a, b) => a.z - b.z);
    const baseHTML = typeof KNIGHT_BASE_SVG !== 'undefined' ? `<div class="knight-piece-wrap">${KNIGHT_BASE_SVG}</div>` : '';
    knightZone.innerHTML = baseHTML + sorted.map(p => `<div class="knight-piece-wrap">${p.svg()}</div>`).join('');
  }
  if(swordZone) swordZone.innerHTML = SWORD_SVG;
}

function dismissVictory(){
  localStorage.removeItem(LAST_BATTLE_RESULT_KEY);
  renderVictoryScene();
  if(window.renderKnight) window.renderKnight();
  if(window.renderCreature) window.renderCreature();
}
window.dismissVictory = dismissVictory;

document.addEventListener('DOMContentLoaded', () => {
  renderVictoryScene();
  const btn = document.getElementById('victoryDismiss');
  if(btn) btn.addEventListener('click', dismissVictory);
});
