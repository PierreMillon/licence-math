/* ============================================================
   L1 MATHS — SYNTHÈSE — revision.js
   Session de révision ciblée : porté de fiche-de-math-gael
   (src/routes/revision.tsx), sans le système de pyramide. Prend les
   pires exercices de l1maths_mistakes (déjà uniquement ceux à score
   négatif — voir menu.js, une entrée disparaît dès que son score
   revient à 0), les rejoue un par un, et écrit le résultat à la fois
   dans les erreurs fréquentes (improveMistake/recordMistake) et dans
   la fiche d'origine elle-même (writeExerciseResult, progression.js)
   pour que tout reste cohérent au prochain passage sur cette fiche.
   ============================================================ */

const REVISION_QUEUE_SIZE = 10;
let revisionQueue = [];
let revisionIndex = 0;

/* typesetMath / confirmModeEnabled : voir menu.js (partagé). */

function buildRevisionQueue(){
  const mistakes = Object.values(window.loadMistakes());
  mistakes.sort((a, b) => a.score - b.score); // le pire en premier
  const worst = mistakes.slice(0, REVISION_QUEUE_SIZE);
  return shuffledIndices(worst.length).map(i => worst[i]);
}

function chapterName(chapterId){
  const ch = MENU_CHAPTERS.find(c => c.file === chapterId + '.html');
  return ch ? ch.name : chapterId;
}

function renderProgressHeader(){
  const el = document.getElementById('revisionProgress');
  if(!el) return;
  const current = revisionQueue[revisionIndex];
  if(revisionQueue.length === 0 || !current){
    el.textContent = '';
    return;
  }
  el.textContent = `Exercice ${revisionIndex + 1}/${revisionQueue.length} — ${chapterName(current.chapterId)}`;
}

function renderRevisionCard(){
  const container = document.getElementById('revisionCard');
  const emptyEl = document.getElementById('revisionEmpty');
  const doneEl = document.getElementById('revisionDone');
  if(!container) return;

  if(revisionQueue.length === 0){
    container.innerHTML = '';
    if(emptyEl) emptyEl.style.display = '';
    if(doneEl) doneEl.style.display = 'none';
    renderProgressHeader();
    return;
  }
  if(emptyEl) emptyEl.style.display = 'none';

  if(revisionIndex >= revisionQueue.length){
    container.innerHTML = '';
    if(doneEl) doneEl.style.display = '';
    renderProgressHeader();
    return;
  }
  if(doneEl) doneEl.style.display = 'none';

  const m = revisionQueue[revisionIndex];
  const hasOptions = Array.isArray(m.options) && m.options.length > 0;

  if(!hasOptions){
    // Instantané pré-v97 (statement seul, sans options/correctIndex) —
    // pas rejouable ici, on renvoie directement vers la fiche d'origine.
    container.innerHTML = `
      <div class="exo">
        <div class="exo__statement">${m.statement}</div>
        <p class="revision-note">Cet exercice a été raté avant que le mode révision existe — pas assez d'informations pour le rejouer ici. <a href="fiches/${m.chapterId}.html#exo-${m.exerciseId}">Ouvrir sur sa fiche →</a></p>
        <button type="button" class="fiche-pager__btn" id="revisionSkipBtn">EXERCICE SUIVANT →</button>
      </div>
    `;
    typesetMath(container);
    document.getElementById('revisionSkipBtn').addEventListener('click', () => {
      revisionIndex++;
      renderRevisionCard();
    });
    renderProgressHeader();
    return;
  }

  const order = shuffledIndices(m.options.length);
  const optsHTML = order.map(i => `
    <label><input type="radio" name="revision-opt" value="${i}"> <span>${m.options[i]}</span></label>
  `).join('');
  const confirmBtn = confirmModeEnabled()
    ? `<button type="button" class="exo-confirm-btn" id="revisionConfirmBtn" disabled>VALIDER</button>`
    : '';

  container.innerHTML = `
    <div class="exo" id="revisionExo">
      <div class="exo__head"><span>${chapterName(m.chapterId)}</span></div>
      <div class="exo__statement">${m.statement}</div>
      <div class="qcm-options">${optsHTML}</div>
      ${confirmBtn}
      <div class="exo__feedback" id="revisionFeedback"></div>
    </div>
  `;
  typesetMath(container);
  renderProgressHeader();
  bindRevisionCard(m);
}

function applyRevisionAnswer(m, selectedIndex){
  const isCorrect = selectedIndex === m.correctIndex;
  const exoEl = document.getElementById('revisionExo');
  const feedbackEl = document.getElementById('revisionFeedback');
  exoEl.classList.add('answered', isCorrect ? 'ok' : 'ko');
  feedbackEl.classList.add(isCorrect ? 'ok' : 'ko');

  if(isCorrect){
    feedbackEl.textContent = '✓ BRAVO !';
    if(window.improveMistake) window.improveMistake(m.chapterId, m.exerciseId);
  }else{
    const explainLine = m.explain ? `<br>→ ${m.explain}` : '';
    feedbackEl.innerHTML = `✗ INCORRECT — réponse attendue : ${m.options[m.correctIndex]}${explainLine}`;
    typesetMath(feedbackEl);
    if(window.recordMistake) window.recordMistake(m.chapterId, m);
  }
  if(window.writeExerciseResult) window.writeExerciseResult(m.chapterId, m.exerciseId, isCorrect, selectedIndex);
  if(window.notifyMusicAnswer) window.notifyMusicAnswer(isCorrect);

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'fiche-pager__btn revision-next-btn';
  nextBtn.textContent = revisionIndex + 1 >= revisionQueue.length ? 'TERMINER' : 'EXERCICE SUIVANT →';
  nextBtn.addEventListener('click', () => {
    revisionIndex++;
    renderRevisionCard();
  });
  exoEl.appendChild(nextBtn);
}

function bindRevisionCard(m){
  const exoEl = document.getElementById('revisionExo');
  const radios = exoEl.querySelectorAll('input[name="revision-opt"]');
  const confirmBtn = document.getElementById('revisionConfirmBtn');

  if(confirmBtn){
    radios.forEach(radio => {
      radio.addEventListener('change', () => { confirmBtn.disabled = false; });
    });
    confirmBtn.addEventListener('click', () => {
      const checked = exoEl.querySelector('input[name="revision-opt"]:checked');
      if(!checked) return;
      confirmBtn.disabled = true;
      applyRevisionAnswer(m, Number(checked.value));
    });
  }else{
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        applyRevisionAnswer(m, Number(radio.value));
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  revisionQueue = buildRevisionQueue();
  revisionIndex = 0;
  renderRevisionCard();
});
