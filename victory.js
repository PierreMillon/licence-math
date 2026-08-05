/* ============================================================
   L1 MATHS — SYNTHÈSE — victory.js
   Illustrations de résolution du combat hebdomadaire : quand la
   semaine (weekly.js) se résout en victoire, remplace la scène de
   combat habituelle par le chevalier en armure complète, épée
   plantée sur le dragon vaincu. En cas de défaite, affiche le
   dragon debout et le chevalier au sol. Se referme au clic et
   efface le drapeau de résultat (weekly.js le repose au prochain
   lundi). Chargé uniquement sur la page d'accueil, après knight.js.
   ============================================================ */

const LAST_BATTLE_RESULT_KEY = 'l1maths_last_battle_result';

function renderVictoryScene(){
  const scene = document.getElementById('victoryScene');
  if(!scene) return;
  const won = localStorage.getItem(LAST_BATTLE_RESULT_KEY) === 'victory';
  scene.hidden = !won;
  if(!won) return;

  const dragonZone = document.getElementById('victoryDragon');
  const knightZone = document.getElementById('victoryKnight');
  const swordZone = document.getElementById('victorySword');

  if(dragonZone) dragonZone.innerHTML = DRAGON_FALLEN_SVG;
  if(knightZone && typeof KNIGHT_GIRL_SVG !== 'undefined') knightZone.innerHTML = KNIGHT_GIRL_SVG;
  if(swordZone) swordZone.innerHTML = SWORD_SVG;
}

function renderDefeatScene(){
  const scene = document.getElementById('defeatScene');
  if(!scene) return;
  const lost = localStorage.getItem(LAST_BATTLE_RESULT_KEY) === 'defeat';
  scene.hidden = !lost;
  if(!lost) return;

  const dragonZone = document.getElementById('defeatDragon');
  const knightZone = document.getElementById('defeatKnight');

  /* Contrairement à la victoire (dragon vaincu, sur le dos), en cas
     de défaite le dragon triomphe : silhouette dressée distincte,
     tracée depuis la référence dédiée envoyée pour cette scène (pas le
     petit monstre rond, ni le dragon endormi de la scène en cours). */
  if(dragonZone && typeof DRAGON_VICTORIOUS_SVG !== 'undefined') dragonZone.innerHTML = DRAGON_VICTORIOUS_SVG;
  if(knightZone && typeof KNIGHT_GIRL_SVG !== 'undefined') knightZone.innerHTML = KNIGHT_GIRL_SVG;
}

function syncBattleOutcome(){
  const battle = document.getElementById('battleScene');
  renderVictoryScene();
  renderDefeatScene();
  const result = localStorage.getItem(LAST_BATTLE_RESULT_KEY);
  if(battle) battle.hidden = (result === 'victory' || result === 'defeat');
}

function dismissBattleOutcome(){
  localStorage.removeItem(LAST_BATTLE_RESULT_KEY);
  syncBattleOutcome();
  if(window.renderKnight) window.renderKnight();
  if(window.renderCreature) window.renderCreature();
}
window.dismissVictory = dismissBattleOutcome;
window.dismissDefeat = dismissBattleOutcome;

document.addEventListener('DOMContentLoaded', () => {
  syncBattleOutcome();
  const victoryBtn = document.getElementById('victoryDismiss');
  if(victoryBtn) victoryBtn.addEventListener('click', dismissBattleOutcome);
  const defeatBtn = document.getElementById('defeatDismiss');
  if(defeatBtn) defeatBtn.addEventListener('click', dismissBattleOutcome);
});
