/* ============================================================
   L1 MATHS — SYNTHÈSE — victory.js
   Illustrations de résolution du combat hebdomadaire : quand la
   semaine (weekly.js) se résout en victoire, remplace la scène de
   combat habituelle par le chevalier en armure complète, épée tenue
   dans la main droite face au dragon vaincu. En cas de défaite,
   affiche le dragon debout et le chevalier au sol. Se referme au
   clic et efface le drapeau de résultat (weekly.js le repose au
   prochain lundi). Chargé uniquement sur la page d'accueil, après
   knight.js.

   Équipement + épée-trophée (21/09/2026, bug signalé capture à
   l'appui : "les équipements sont pas visibles sur le chevalier" +
   "l'épée doit être dans la main droite") : avant ce correctif,
   `#victoryKnight`/`#defeatKnight` recevaient juste la silhouette nue
   (KNIGHT_GIRL_SVG) en innerHTML — jamais l'équipement, et l'épée de
   victoire était plantée sur le dragon (élément séparé, `#victorySword`,
   retiré) plutôt que tenue par le chevalier. Utilise maintenant la
   même structure imbriquée .knight-girl/.knight-figure que la scène
   de combat habituelle (knight.js/renderKnight) — voir index.html. */

const LAST_BATTLE_RESULT_KEY = 'l1maths_last_battle_result';

function renderVictoryScene(){
  const scene = document.getElementById('victoryScene');
  if(!scene) return;
  const won = localStorage.getItem(LAST_BATTLE_RESULT_KEY) === 'victory';
  scene.hidden = !won;
  if(!won) return;

  const dragonZone = document.getElementById('victoryDragon');
  const knightGirlZone = document.getElementById('victoryKnightGirl');
  const knightFigureZone = document.getElementById('victoryKnightFigure');

  if(dragonZone) dragonZone.innerHTML = DRAGON_FALLEN_SVG;
  if(knightGirlZone && typeof KNIGHT_GIRL_SVG !== 'undefined') knightGirlZone.innerHTML = KNIGHT_GIRL_SVG;
  if(knightFigureZone){
    const pieces = window.knightPiecesOverlayHTML ? window.knightPiecesOverlayHTML() : '';
    const sword = window.knightTrophySwordHTML ? window.knightTrophySwordHTML() : '';
    knightFigureZone.innerHTML = pieces + sword;
  }

  const captionEl = scene.querySelector('.victory-caption');
  if(captionEl && typeof WEEKLY_THRESHOLD !== 'undefined'){
    captionEl.textContent = `Le chevalier a terrassé le dragon cette semaine : ${Math.round(WEEKLY_THRESHOLD * 100)}% des exercices ont été refaits avant le reset.`;
  }
}

function renderDefeatScene(){
  const scene = document.getElementById('defeatScene');
  if(!scene) return;
  const lost = localStorage.getItem(LAST_BATTLE_RESULT_KEY) === 'defeat';
  scene.hidden = !lost;
  if(!lost) return;

  const dragonZone = document.getElementById('defeatDragon');
  const knightGirlZone = document.getElementById('defeatKnightGirl');
  const knightFigureZone = document.getElementById('defeatKnightFigure');

  /* Contrairement à la victoire (dragon vaincu, sur le dos), en cas
     de défaite le dragon triomphe : silhouette dressée distincte,
     tracée depuis la référence dédiée envoyée pour cette scène (pas le
     petit monstre rond, ni le dragon endormi de la scène en cours). */
  if(dragonZone && typeof DRAGON_VICTORIOUS_SVG !== 'undefined') dragonZone.innerHTML = DRAGON_VICTORIOUS_SVG;
  if(knightGirlZone && typeof KNIGHT_GIRL_SVG !== 'undefined') knightGirlZone.innerHTML = KNIGHT_GIRL_SVG;
  // Équipement affiché même vaincu (pas l'épée-trophée, réservée à la
  // victoire) : la progression déjà acquise ne disparaît pas en cas
  // de défaite hebdomadaire.
  if(knightFigureZone) knightFigureZone.innerHTML = window.knightPiecesOverlayHTML ? window.knightPiecesOverlayHTML() : '';

  const captionEl = scene.querySelector('.defeat-caption');
  if(captionEl && typeof WEEKLY_THRESHOLD !== 'undefined'){
    captionEl.textContent = `Le dragon l'a emporté cette semaine : moins de ${Math.round(WEEKLY_THRESHOLD * 100)}% des exercices ont été refaits avant le reset.`;
  }
}

function syncBattleOutcome(){
  const battle = document.getElementById('battleScene');
  renderVictoryScene();
  renderDefeatScene();
  const result = localStorage.getItem(LAST_BATTLE_RESULT_KEY);
  if(battle) battle.hidden = (result === 'victory' || result === 'defeat');
}
window.syncBattleOutcome = syncBattleOutcome;

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
