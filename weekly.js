/* ============================================================
   L1 MATHS — SYNTHÈSE — weekly.js
   Combat hebdomadaire chevalier / dragon : une couche de
   progression séparée de la progression permanente, qui se
   remet à zéro chaque lundi. Si >=WEEKLY_THRESHOLD des exercices du
   site sont corrects au moment du reset, le joueur gagne une pièce d'or ;
   sinon le dragon gagne un crâne. Score cumulé, jamais remis à
   zéro. Chargé sur toutes les pages, avant fiche-engine.js.
   ============================================================ */

const CHAPTER_TOTALS = {
  logique: 34, calculus: 27, algebre: 12, analyse: 21,
  probabilites: 23, statistiques: 17, java: 52, python: 43,
};
const WEEKLY_THRESHOLD = 0.6;

const WEEKLY_META_KEY = 'l1maths_weekly_meta';
const WEEKLY_PROGRESS_KEY = 'l1maths_weekly_progress';
const WEEKLY_SCORE_KEY = 'l1maths_weekly_score';
const LAST_RESULT_KEY = 'l1maths_last_battle_result';

function weeklyStateKey(chapterId){
  return 'l1maths_weekly_' + chapterId + '_state';
}
window.weeklyStateKey = weeklyStateKey;
window.WEEKLY_PROGRESS_KEY = WEEKLY_PROGRESS_KEY;

function mondayOf(date){
  const d = new Date(date);
  const day = d.getDay(); // 0=dimanche .. 6=samedi
  const diff = (day === 0 ? -6 : 1 - day); // recule jusqu'au lundi
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateStr(d){
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function currentWeekStartStr(){
  return dateStr(mondayOf(new Date()));
}

function loadWeeklyMeta(){
  let m;
  try{ m = JSON.parse(localStorage.getItem(WEEKLY_META_KEY)); }
  catch(e){ m = null; }
  if(!m || !m.weekStart) m = { weekStart: currentWeekStartStr() };
  return m;
}

function loadWeeklyProgress(){
  try{ return JSON.parse(localStorage.getItem(WEEKLY_PROGRESS_KEY)) || {}; }
  catch(e){ return {}; }
}

function loadWeeklyScore(){
  let s;
  try{ s = JSON.parse(localStorage.getItem(WEEKLY_SCORE_KEY)); }
  catch(e){ s = null; }
  if(!s || typeof s.wins !== 'number' || typeof s.losses !== 'number') s = { wins: 0, losses: 0 };
  return s;
}

function weeklyTotals(){
  const progress = loadWeeklyProgress();
  let total = 0, correct = 0;
  Object.keys(CHAPTER_TOTALS).forEach(id => {
    total += CHAPTER_TOTALS[id];
    correct += (progress[id] && progress[id].correct) || 0;
  });
  return { total, correct };
}

function isChapterWeeklyComplete(chapterId){
  const progress = loadWeeklyProgress();
  const total = CHAPTER_TOTALS[chapterId] || 0;
  const correct = (progress[chapterId] && progress[chapterId].correct) || 0;
  return total > 0 && correct >= total;
}
window.isChapterWeeklyComplete = isChapterWeeklyComplete;

function weeklyChapterFraction(chapterId){
  const progress = loadWeeklyProgress();
  const total = CHAPTER_TOTALS[chapterId] || 0;
  if(total <= 0) return 0;
  const correct = (progress[chapterId] && progress[chapterId].correct) || 0;
  return Math.min(1, correct / total);
}
window.weeklyChapterFraction = weeklyChapterFraction;

function resolveAndResetWeek(newWeekStart){
  const { total, correct } = weeklyTotals();
  const ratio = total > 0 ? correct / total : 0;
  const hasAnyActivity = correct > 0;

  if(hasAnyActivity){
    const score = loadWeeklyScore();
    const won = ratio >= WEEKLY_THRESHOLD;
    if(won) score.wins += 1;
    else score.losses += 1;
    localStorage.setItem(WEEKLY_SCORE_KEY, JSON.stringify(score));
    localStorage.setItem(LAST_RESULT_KEY, won ? 'victory' : 'defeat');
  }

  Object.keys(CHAPTER_TOTALS).forEach(id => {
    localStorage.removeItem(weeklyStateKey(id));
  });
  localStorage.removeItem(WEEKLY_PROGRESS_KEY);
  localStorage.setItem(WEEKLY_META_KEY, JSON.stringify({ weekStart: newWeekStart }));
}

function ensureWeekCurrent(){
  const meta = loadWeeklyMeta();
  const nowStart = currentWeekStartStr();
  if(meta.weekStart !== nowStart){
    resolveAndResetWeek(nowStart);
  }
}

function recordWeeklyAnswer(chapterId, exId, isCorrect){
  ensureWeekCurrent();
  const key = weeklyStateKey(chapterId);
  let state = {};
  try{ state = JSON.parse(localStorage.getItem(key)) || {}; }
  catch(e){ state = {}; }

  state[exId] = { answered: true, correct: isCorrect };
  localStorage.setItem(key, JSON.stringify(state));

  const entries = Object.values(state);
  const completed = entries.filter(e => e.answered).length;
  const correct = entries.filter(e => e.correct).length;

  const progress = loadWeeklyProgress();
  progress[chapterId] = { completed, correct };
  localStorage.setItem(WEEKLY_PROGRESS_KEY, JSON.stringify(progress));
}
window.recordWeeklyAnswer = recordWeeklyAnswer;

function iconRow(n, iconSvg, cap){
  if(n === 0) return '';
  if(n <= cap) return Array.from({ length: n }, () => iconSvg).join('');
  return iconSvg + `<span class="weekly-score-more">×${n}</span>`;
}

function renderWeeklyScore(){
  const el = document.getElementById('weeklyScore');
  const coinsEl = document.getElementById('knightCoins');
  const lossesEl = document.getElementById('creatureLosses');
  ensureWeekCurrent();
  const score = loadWeeklyScore();
  const { total, correct } = weeklyTotals();
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const ICON_CAP = 5;

  const objectifPct = Math.round(WEEKLY_THRESHOLD * 100);
  if(el) el.innerHTML = `<div class="weekly-score-text">COMBAT DE LA SEMAINE : ${pct}% (objectif ${objectifPct}%)</div>`;
  if(coinsEl) coinsEl.innerHTML = iconRow(score.wins, COIN_SMALL_SVG, ICON_CAP);
  if(lossesEl) lossesEl.innerHTML = iconRow(score.losses, SKULL_SMALL_SVG, ICON_CAP);
}

document.addEventListener('DOMContentLoaded', () => {
  ensureWeekCurrent();
  renderWeeklyScore();
});
