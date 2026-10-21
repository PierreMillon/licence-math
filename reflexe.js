/* ============================================================
   L1 MATHS — SYNTHÈSE — reflexe.js
   Page RÉFLEXE (reflexe.html) : session chronométrée sur le pool
   REFLEX_EXERCISES (reflexe-data.js, voir ce fichier pour la
   sélection de contenu). Demande explicite de Pierre (21/10/2026) :
   il remplit déjà bien ses contrôles sur le fond, mais trop lentement
   — objectif ici est la VITESSE d'exécution d'un réflexe déjà connu,
   pas d'apprendre une notion nouvelle (ça, c'est le rôle des fiches).

   Modelé sur revision.js (même principe de carte unique rejouée
   l'une après l'autre, même écriture du résultat via
   writeExerciseResult/recordMistake/improveMistake pour rester
   cohérent avec la fiche d'origine) — différences : le pool vient
   de reflexe-data.js (pas de l1maths_mistakes), et un chronomètre
   tourne pendant toute la session. */

const REFLEX_SESSION_SIZE = 12;
const REFLEX_BEST_KEY = 'l1maths_reflex_best';

let reflexFilter = 'all';
let reflexQueue = [];
let reflexIndex = 0;
let reflexCorrectCount = 0;
let reflexStartTs = null;
let reflexElapsedMs = 0;
let reflexTimerId = null;

/* Même convention que wrongAnswerExplainLine (fiches/fiche-engine.js,
   21/09/2026) — copiée ici en 3 lignes plutôt que de charger tout
   fiche-engine.js (560 lignes, initFiche/applyNotationPreference
   inutiles sur cette page) pour une seule petite fonction pure. */
function reflexWrongExplainLine(ex, selectedIndex){
  const specific = ex.wrongExplain && typeof selectedIndex === 'number' ? ex.wrongExplain[String(selectedIndex)] : null;
  const text = specific || ex.explain;
  return text ? `<br>→ ${text}` : '';
}

function chapterNameReflex(chapterId){
  const ch = CHAPTERS.find(c => c.id === chapterId);
  return ch ? ch.name : chapterId;
}

/* Chapitres à proposer dans le sélecteur : seulement ceux qui ont au
   moins une question réflexe ET qui sont encore actifs (défensif —
   un chapitre pourrait redevenir masqué après coup sans que ce
   fichier soit retouché). */
function reflexAvailableChapters(){
  const present = new Set(REFLEX_EXERCISES.map(e => e.chapterId));
  return CHAPTERS.filter(c => c.active && present.has(c.id));
}

function reflexPoolForFilter(filter){
  const activeIds = new Set(CHAPTERS.filter(c => c.active).map(c => c.id));
  return REFLEX_EXERCISES.filter(e => activeIds.has(e.chapterId) && (filter === 'all' || e.chapterId === filter));
}

function reflexSessionSizeFor(filter){
  return Math.min(REFLEX_SESSION_SIZE, reflexPoolForFilter(filter).length);
}

function buildReflexQueue(filter){
  const pool = reflexPoolForFilter(filter);
  const size = reflexSessionSizeFor(filter);
  return shuffledIndices(pool.length).slice(0, size).map(i => pool[i]);
}

function formatReflexTime(ms){
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return m + ':' + String(s).padStart(2, '0');
}

function reflexBestKeyFor(filter, size){
  return filter + ':' + size;
}

function loadReflexBest(){
  try{ return JSON.parse(localStorage.getItem(REFLEX_BEST_KEY)) || {}; }
  catch(e){ return {}; }
}

function saveReflexBest(best){
  localStorage.setItem(REFLEX_BEST_KEY, JSON.stringify(best));
}

/* ---------- écran de départ ---------- */

function renderReflexBestInfo(){
  const el = document.getElementById('reflexBestInfo');
  const startBtn = document.getElementById('reflexStartBtn');
  if(!el) return;
  const size = reflexSessionSizeFor(reflexFilter);
  if(startBtn) startBtn.disabled = size === 0;
  if(size === 0){
    el.textContent = 'Pas encore de question réflexe pour ce chapitre.';
    return;
  }
  const best = loadReflexBest()[reflexBestKeyFor(reflexFilter, size)];
  el.textContent = best
    ? `Record (sans erreur) sur cette sélection : ${formatReflexTime(best.ms)}, le ${best.date}.`
    : `${size} questions tirées au hasard parmi ${reflexPoolForFilter(reflexFilter).length}. Pas encore de record sur cette sélection.`;
}

function renderReflexStart(){
  const container = document.getElementById('reflexApp');
  if(!container) return;
  if(reflexTimerId){ clearInterval(reflexTimerId); reflexTimerId = null; }

  const chapters = reflexAvailableChapters();
  const optionsHTML = ['<option value="all">TOUS LES CHAPITRES</option>']
    .concat(chapters.map(c => `<option value="${c.id}">${c.name}</option>`))
    .join('');

  container.innerHTML = `
    <div class="reflex-start">
      <label for="reflexFilterSelect">CHAPITRE</label>
      <select id="reflexFilterSelect">${optionsHTML}</select>
      <button type="button" class="fiche-pager__btn" id="reflexStartBtn">COMMENCER →</button>
      <div class="reflex-best" id="reflexBestInfo"></div>
    </div>
  `;

  const select = document.getElementById('reflexFilterSelect');
  select.value = reflexFilter;
  select.addEventListener('change', () => {
    reflexFilter = select.value;
    renderReflexBestInfo();
  });
  document.getElementById('reflexStartBtn').addEventListener('click', startReflexSession);
  renderReflexBestInfo();
}

/* ---------- session chronométrée ---------- */

function startReflexSession(){
  reflexQueue = buildReflexQueue(reflexFilter);
  reflexIndex = 0;
  reflexCorrectCount = 0;
  if(reflexQueue.length === 0) return;
  reflexStartTs = Date.now();
  reflexElapsedMs = 0;
  reflexTimerId = setInterval(updateReflexTimerDisplay, 500);
  renderReflexCard();
}

function updateReflexTimerDisplay(){
  if(reflexStartTs === null) return;
  reflexElapsedMs = Date.now() - reflexStartTs;
  const timerEl = document.getElementById('reflexTimer');
  if(timerEl) timerEl.textContent = formatReflexTime(reflexElapsedMs);
}

function renderReflexProgress(){
  const el = document.getElementById('reflexProgress');
  if(!el || !reflexQueue.length) return;
  el.innerHTML = `Question ${reflexIndex + 1}/${reflexQueue.length} <span id="reflexTimer" class="reflex-timer">${formatReflexTime(reflexElapsedMs)}</span>`;
}

function renderReflexCard(){
  const container = document.getElementById('reflexApp');
  if(!container) return;

  if(reflexIndex >= reflexQueue.length){
    finishReflexSession();
    return;
  }

  const ex = reflexQueue[reflexIndex];
  const order = shuffledIndices(ex.options.length);
  const optsHTML = order.map(i => `
    <label><input type="radio" name="reflex-opt" value="${i}"> <span>${ex.options[i]}</span></label>
  `).join('');
  const confirmBtn = confirmModeEnabled()
    ? `<button type="button" class="exo-confirm-btn" id="reflexConfirmBtn" disabled>VALIDER</button>`
    : '';

  container.innerHTML = `
    <div id="reflexProgress" class="reflex-progress-line"></div>
    <div class="exo" id="reflexExo">
      <div class="exo__head"><span>${chapterNameReflex(ex.chapterId)}</span></div>
      <div class="exo__statement">${ex.statement}</div>
      <div class="qcm-options">${optsHTML}</div>
      ${confirmBtn}
      <div class="exo__feedback" id="reflexFeedback"></div>
    </div>
  `;
  typesetMath(container);
  renderReflexProgress();
  bindReflexCard(ex);
}

function applyReflexAnswer(ex, selectedIndex){
  const isCorrect = selectedIndex === ex.correctIndex;
  const exoEl = document.getElementById('reflexExo');
  const feedbackEl = document.getElementById('reflexFeedback');
  exoEl.classList.add('answered', isCorrect ? 'ok' : 'ko');
  feedbackEl.classList.add(isCorrect ? 'ok' : 'ko');

  if(isCorrect){
    reflexCorrectCount++;
    feedbackEl.textContent = '✓ BRAVO !';
    if(window.improveMistake) window.improveMistake(ex.chapterId, ex.id);
  }else{
    const explainLine = reflexWrongExplainLine(ex, selectedIndex);
    feedbackEl.innerHTML = `✗ INCORRECT — réponse attendue : ${ex.options[ex.correctIndex]}${explainLine}`;
    typesetMath(feedbackEl);
    if(window.recordMistake) window.recordMistake(ex.chapterId, ex);
  }
  if(window.writeExerciseResult) window.writeExerciseResult(ex.chapterId, ex.id, isCorrect, selectedIndex);
  if(window.notifyMusicAnswer) window.notifyMusicAnswer(isCorrect);

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'fiche-pager__btn reflex-next-btn';
  nextBtn.textContent = reflexIndex + 1 >= reflexQueue.length ? 'TERMINER' : 'SUIVANT →';
  nextBtn.addEventListener('click', () => {
    reflexIndex++;
    renderReflexCard();
  });
  exoEl.appendChild(nextBtn);
}

function bindReflexCard(ex){
  const exoEl = document.getElementById('reflexExo');
  const radios = exoEl.querySelectorAll('input[name="reflex-opt"]');
  const confirmBtn = document.getElementById('reflexConfirmBtn');

  if(confirmBtn){
    radios.forEach(radio => {
      radio.addEventListener('change', () => { confirmBtn.disabled = false; });
    });
    confirmBtn.addEventListener('click', () => {
      const checked = exoEl.querySelector('input[name="reflex-opt"]:checked');
      if(!checked) return;
      confirmBtn.disabled = true;
      applyReflexAnswer(ex, Number(checked.value));
    });
  }else{
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        applyReflexAnswer(ex, Number(radio.value));
      });
    });
  }
}

function finishReflexSession(){
  if(reflexTimerId){ clearInterval(reflexTimerId); reflexTimerId = null; }
  reflexElapsedMs = Date.now() - reflexStartTs;
  const size = reflexQueue.length;

  // Un temps ne devient un « record » que sur une session sans AUCUNE
  // erreur — sinon on entraînerait juste à répondre vite au hasard,
  // à l'opposé du but (vitesse SUR un réflexe déjà maîtrisé).
  let isNewRecord = false;
  if(reflexCorrectCount === size){
    const key = reflexBestKeyFor(reflexFilter, size);
    const best = loadReflexBest();
    const current = best[key];
    if(!current || reflexElapsedMs < current.ms){
      best[key] = { ms: reflexElapsedMs, date: new Date().toLocaleDateString('fr-FR') };
      saveReflexBest(best);
      isNewRecord = true;
    }
  }

  const avgSec = Math.round(reflexElapsedMs / size / 1000);
  const container = document.getElementById('reflexApp');
  container.innerHTML = `
    <div class="reflex-done">
      <div class="reflex-done__time">${formatReflexTime(reflexElapsedMs)}</div>
      <div class="reflex-done__detail">${reflexCorrectCount}/${size} bonnes réponses — ${avgSec}s en moyenne par question</div>
      ${isNewRecord ? '<div class="reflex-done__record">NOUVEAU RECORD</div>' : ''}
      <button type="button" class="fiche-pager__btn" id="reflexRestartBtn">REFAIRE UNE SESSION</button>
    </div>
  `;
  document.getElementById('reflexRestartBtn').addEventListener('click', renderReflexStart);
}

document.addEventListener('DOMContentLoaded', () => {
  renderReflexStart();
});
