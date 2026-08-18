/* ============================================================
   L1 MATHS — SYNTHÈSE — weekly.js
   Combat hebdomadaire chevalier / dragon : une couche de
   progression séparée de la progression permanente, qui se
   remet à zéro chaque lundi. Si >=WEEKLY_THRESHOLD des exercices du
   site sont corrects au moment du reset, le joueur gagne une pièce d'or ;
   sinon le dragon gagne un crâne. Score cumulé, jamais remis à
   zéro. Chargé sur toutes les pages, avant fiche-engine.js.

   Difficulté adaptative (11/08/2026, demande explicite, voir
   CLAUDE.md) : WEEKLY_THRESHOLD n'est plus une constante fixe, elle
   varie de ±10 points selon les résultats — une défaite (crâne, que
   ce soit une vraie défaite hebdo OU une réinitialisation complète du
   site, les deux comptent pareil par choix explicite) fait baisser
   l'objectif de la semaine suivante, une victoire le fait monter.
   Bornée entre WEEKLY_THRESHOLD_MIN et WEEKLY_THRESHOLD_MAX pour que
   le combat ne devienne jamais ni trivial ni impossible. */
const CHAPTER_TOTALS = {
  logique: 34, calculus: 27, algebre: 12, analyse: 21,
  probabilites: 23, statistiques: 17, java: 52, python: 43,
};
const WEEKLY_THRESHOLD_BASE = 0.6;
const WEEKLY_THRESHOLD_STEP = 0.10;
const WEEKLY_THRESHOLD_MIN = 0.30;
const WEEKLY_THRESHOLD_MAX = 0.90;
const WEEKLY_THRESHOLD_KEY = 'l1maths_weekly_threshold';

function loadWeeklyThreshold(){
  const n = parseFloat(localStorage.getItem(WEEKLY_THRESHOLD_KEY));
  if(!Number.isFinite(n)) return WEEKLY_THRESHOLD_BASE;
  return Math.max(WEEKLY_THRESHOLD_MIN, Math.min(WEEKLY_THRESHOLD_MAX, n));
}

/* Variable "live" lue par tout le reste du code (victory.js,
   progression.js, ce fichier) comme avant — c'était une const, elle
   reste une valeur simple à lire, seule sa mutation change. */
let WEEKLY_THRESHOLD = loadWeeklyThreshold();

/* +delta après une victoire, -delta après une défaite (delta déjà
   signé par l'appelant). Persiste et met à jour la variable live. */
function adjustWeeklyThreshold(delta){
  const next = Math.max(WEEKLY_THRESHOLD_MIN, Math.min(WEEKLY_THRESHOLD_MAX, loadWeeklyThreshold() + delta));
  localStorage.setItem(WEEKLY_THRESHOLD_KEY, String(next));
  WEEKLY_THRESHOLD = next;
  return next;
}
window.adjustWeeklyThreshold = adjustWeeklyThreshold;

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

/* Texte "il reste Xj Yh" avant la remise à zéro du lundi 00h00 (retour
   utilisateur : le % affiché seul ne disait pas où on en était dans la
   semaine). Basé sur mondayOf() + 7 jours, donc toujours cohérent avec le
   lundi effectif qui déclenchera resolveAndResetWeek() dans ensureWeekCurrent. */
function weeklyTimeRemainingText(){
  const nextMonday = mondayOf(new Date());
  nextMonday.setDate(nextMonday.getDate() + 7);
  const msLeft = nextMonday.getTime() - Date.now();
  if(msLeft <= 0) return 'il reste moins d\'1h';
  const hoursTotal = Math.floor(msLeft / (60 * 60 * 1000));
  const days = Math.floor(hoursTotal / 24);
  const hours = hoursTotal % 24;
  if(hoursTotal < 1) return 'il reste moins d\'1h';
  if(days <= 0) return `il reste ${hours}h`;
  return `il reste ${days}j ${hours}h`;
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
    adjustWeeklyThreshold(won ? WEEKLY_THRESHOLD_STEP : -WEEKLY_THRESHOLD_STEP);
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

/* Calcule et pose le verdict du combat dès qu'on arrive dimanche, au
   lieu d'attendre la remise à zéro du lundi (resolveAndResetWeek, plus
   bas dans ce fichier) — réutilise le même drapeau (LAST_RESULT_KEY)
   donc tout l'affichage existant de victory.js marche sans y toucher.
   Comme recordWeeklyAnswer ne touche plus rien le dimanche (voir
   isWeeklyRestDay ci-dessus), ce verdict reste identique toute la
   journée même si on le recalcule à chaque chargement — idempotent :
   si le drapeau est déjà posé (première fois cette semaine, ou déjà
   vu/fermé et qu'on revient), on ne le repose pas une deuxième fois. */
function ensureSundayOutcomeShown(){
  if(!isWeeklyRestDay()) return;
  ensureWeekCurrent();
  if(localStorage.getItem(LAST_RESULT_KEY)) return;
  const { total, correct } = weeklyTotals();
  if(correct <= 0) return; // rien fait cette semaine, pas de verdict à montrer
  const ratio = total > 0 ? correct / total : 0;
  const won = ratio >= WEEKLY_THRESHOLD;
  localStorage.setItem(LAST_RESULT_KEY, won ? 'victory' : 'defeat');
}
window.ensureSundayOutcomeShown = ensureSundayOutcomeShown;

/* Dimanche est un jour de repos pour le combat (demande du 11/08/2026,
   voir CLAUDE.md) : plus aucune réponse ne touche la couche hebdo à
   partir de samedi minuit — ni le score du combat, ni le remplissage
   de l'armure du chevalier (weeklyChapterFraction lit la même donnée).
   Le score reste donc exactement celui de samedi minuit jusqu'à la
   vraie remise à zéro du lundi (resolveAndResetWeek, inchangée). La
   progression PERMANENTE (compteur global, PROGRESS_KEY dans
   fiche-engine.js) n'est pas concernée : elle continue de bouger
   normalement le dimanche, seul recordWeeklyAnswer est court-circuité
   ici. */
function isWeeklyRestDay(){
  return new Date().getDay() === 0; // 0 = dimanche
}

function recordWeeklyAnswer(chapterId, exId, isCorrect){
  ensureWeekCurrent();
  if(isWeeklyRestDay()) return;
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
  const barEl = document.getElementById('weeklyBar');
  const fillEl = document.getElementById('weeklyBarFill');
  const tickEl = document.getElementById('weeklyBarTick');
  const scoreEl = document.getElementById('weeklyBarScore');
  const coinsEl = document.getElementById('knightCoins');
  const lossesEl = document.getElementById('creatureLosses');
  ensureWeekCurrent();
  const score = loadWeeklyScore();
  const { total, correct } = weeklyTotals();
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const ICON_CAP = 5;

  const objectifPct = Math.round(WEEKLY_THRESHOLD * 100);
  if(fillEl) fillEl.style.width = pct + '%';
  if(tickEl) tickEl.style.left = objectifPct + '%';
  if(scoreEl) scoreEl.textContent = pct + '%';
  /* Objectif exact + compte à rebours déplacés dans le tooltip
     (12/08/2026, demande explicite) : plus de texte "objectif X% —
     il reste Xj Yh" affiché en permanence sous la barre, juste le
     repère visuel (.weekly-bar__tick ci-dessus) — le détail chiffré
     reste consultable au clic/appui, réattribué à chaque rendu car
     WEEKLY_THRESHOLD et le compte à rebours changent. */
  if(barEl) barEl.setAttribute('data-tooltip', `Chaque lundi à minuit, cette barre repart à zéro, ainsi que tous les chapitres et toutes les questions de la semaine. Objectif actuel : ${objectifPct}% — ${weeklyTimeRemainingText()}.`);
  if(coinsEl) coinsEl.innerHTML = iconRow(score.wins, COIN_SMALL_SVG, ICON_CAP);
  if(lossesEl) lossesEl.innerHTML = iconRow(score.losses, SKULL_SMALL_SVG, ICON_CAP);
}

document.addEventListener('DOMContentLoaded', () => {
  ensureWeekCurrent();
  ensureSundayOutcomeShown(); // avant victory.js (chargé après, même événement)
  renderWeeklyScore();
});
