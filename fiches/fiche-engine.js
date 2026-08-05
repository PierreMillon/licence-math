/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/fiche-engine.js
   Moteur commun à toutes les fiches de chapitre (rendu des
   sections, QCM, progression, barre de progression par carrés,
   réinitialisation). Chaque fiche ne fournit plus que ses
   données (EXERCISES, SECTIONS) et appelle initFiche(...).
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';

function typesetMath(el){
  if(window.renderMathInElement && el){
    window.renderMathInElement(el, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
      throwOnError: false,
    });
  }
}

/* Applique la préférence de notation (u/v vs f/g, voir menu → NOTATION)
   aux exercices qui proposent une variante (statementUv/optionsUv/
   explainUv — pour l'instant seulement les 3 QCM de dérivation du
   produit/quotient/composée, dans calculus.js). Ne modifie jamais les
   objets d'origine (nouvelle copie), et ne touche pas les items sans
   variante. correctIndex reste valable dans les deux cas : la variante
   uv garde exactement le même ordre de réponses que la variante fg. */
function applyNotationPreference(exercises){
  if(typeof window.getNotationPreference !== 'function') return exercises;
  if(window.getNotationPreference('derivation') !== 'uv') return exercises;
  return exercises.map(ex => {
    if(!ex.statementUv) return ex;
    return Object.assign({}, ex, {
      statement: ex.statementUv,
      options: ex.optionsUv || ex.options,
      explain: ex.explainUv || ex.explain,
    });
  });
}

function initFiche({ STATE_KEY, CHAPTER_ID, EXERCISES, SECTIONS }){
  EXERCISES = applyNotationPreference(EXERCISES);

  function loadState(){
    try{ return JSON.parse(localStorage.getItem(STATE_KEY)) || {}; }
    catch(e){ return {}; }
  }

  function saveState(state){
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    syncProgress(state);
  }

  function syncProgress(state){
    const entries = Object.values(state);
    const completed = entries.filter(e => e.answered).length;
    const correct = entries.filter(e => e.correct).length;

    let progress = {};
    try{ progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch(e){ progress = {}; }

    progress[CHAPTER_ID] = { completed, correct };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    updateScoreHeader(completed, correct);
  }

  function updateScoreHeader(completed, correct){
    const el = document.getElementById('ficheScore');
    if(el){
      el.textContent = `SCORE : ${correct}/${EXERCISES.length}   —   COMPLÉTÉS : ${completed}/${EXERCISES.length}`;
    }
  }

  function renderFichePieceBadge(){
    const badge = document.getElementById('fichePieceBadge');
    if(!badge || typeof KNIGHT_PIECES === 'undefined') return;
    const piece = KNIGHT_PIECES.find(p => p.chapterId === CHAPTER_ID);
    if(!piece || !window.weeklyChapterFraction || !window.miniPieceClipStyle || !window.knightPieceMiniSVG) return;
    const fraction = window.weeklyChapterFraction(CHAPTER_ID);
    const clip = window.miniPieceClipStyle(fraction);
    const miniSvg = window.knightPieceMiniSVG(CHAPTER_ID, piece.svg());
    badge.innerHTML = `<div style="${clip}">${miniSvg}</div>`;
  }

  /* ---------- barre de progression par carrés (un carré = un exercice) ---------- */
  function exoProgressSquareState(state, ex){
    const s = state[ex.id];
    if(!s || !s.answered) return '';
    return s.correct ? ' correct' : ' incorrect';
  }

  function renderExoProgressBar(state){
    const bar = document.getElementById('exoProgressBar');
    if(!bar) return;
    bar.innerHTML = EXERCISES.map((ex, i) => `
      <button type="button" class="exo-progress-bar__sq${exoProgressSquareState(state, ex)}" data-target="exo-${ex.id}" title="Exercice ${i + 1}/${EXERCISES.length}" aria-label="Aller à l'exercice ${i + 1}"></button>
    `).join('');
    bar.querySelectorAll('.exo-progress-bar__sq').forEach(sq => {
      sq.addEventListener('click', () => {
        const target = document.getElementById(sq.dataset.target);
        if(target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  function updateExoProgressSquare(state, ex){
    const bar = document.getElementById('exoProgressBar');
    if(!bar) return;
    const idx = EXERCISES.indexOf(ex);
    const sq = bar.children[idx];
    if(!sq) return;
    sq.className = `exo-progress-bar__sq${exoProgressSquareState(state, ex)}`;
  }

  /* ---------- rendu ---------- */
  /* Ordre des réponses mélangé à chaque rendu (chaque visite de la
     fiche) pour qu'on ne puisse pas répondre juste en retenant une
     position fixe. Les questions elles-mêmes ne bougent jamais.
     Le mélange ne touche que l'ordre d'affichage : la valeur de
     chaque radio reste l'index d'origine dans ex.options, donc
     correctIndex / selectedIndex / l'état sauvegardé restent inchangés. */
  function shuffledIndices(n){
    const order = Array.from({ length: n }, (_, i) => i);
    for(let i = order.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }

  function exoControlsHTML(ex){
    const order = shuffledIndices(ex.options.length);
    const opts = order.map(i => `
      <label><input type="radio" name="${ex.id}" value="${i}"> <span>${ex.options[i]}</span></label>
    `).join('');
    return `<div class="qcm-options">${opts}</div>`;
  }

  function renderSections(){
    const container = document.getElementById('sectionsContainer');
    if(!container) return;

    container.innerHTML = SECTIONS.map(sec => {
      const exos = EXERCISES.filter(e => e.section === sec.id);
      const exosHTML = exos.map(ex => `
        <div class="exo" id="exo-${ex.id}" data-id="${ex.id}">
          <div class="exo__head">
            <span>EXERCICE ${EXERCISES.indexOf(ex) + 1}/${EXERCISES.length}</span>
          </div>
          <div class="exo__statement">${ex.statement}</div>
          ${exoControlsHTML(ex)}
          <div class="exo__feedback" id="feedback-${ex.id}"></div>
        </div>
      `).join('');

      return `
        <section class="section" id="section-${sec.id}">
          <div class="section__title">${sec.title}</div>
          <p class="cours">${sec.cours}</p>
          ${exosHTML}
        </section>
      `;
    }).join('');

    typesetMath(container);
  }

  /* ---------- vérification ---------- */
  function applyFeedback(ex, selectedIndex, state){
    const isCorrect = selectedIndex === ex.correctIndex;
    const exoEl = document.getElementById(`exo-${ex.id}`);
    const feedbackEl = document.getElementById(`feedback-${ex.id}`);

    exoEl.classList.remove('answered', 'ok', 'ko');
    exoEl.classList.add('answered', isCorrect ? 'ok' : 'ko');
    feedbackEl.classList.remove('ok', 'ko');
    feedbackEl.classList.add(isCorrect ? 'ok' : 'ko');

    if(isCorrect){
      feedbackEl.textContent = '✓ BRAVO !';
    }else{
      const explainLine = ex.explain ? `<br>→ ${ex.explain}` : '';
      feedbackEl.innerHTML = `✗ INCORRECT — réponse attendue : ${ex.options[ex.correctIndex]}${explainLine}`;
      typesetMath(feedbackEl);
    }

    const isFirstAnswer = !(state[ex.id] && state[ex.id].answered);
    state[ex.id] = { answered: true, correct: isCorrect, selectedIndex };
    saveState(state);
    updateExoProgressSquare(state, ex);
    if(isFirstAnswer && window.decrementLateness) window.decrementLateness();
    if(window.recordWeeklyAnswer) window.recordWeeklyAnswer(CHAPTER_ID, ex.id, isCorrect);
    renderFichePieceBadge();
  }

  function bindExercise(ex, state){
    const exoEl = document.getElementById(`exo-${ex.id}`);
    const radios = exoEl.querySelectorAll(`input[name="${ex.id}"]`);

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        applyFeedback(ex, Number(radio.value), state);
      });
    });
  }

  function restoreState(state){
    EXERCISES.forEach(ex => {
      const s = state[ex.id];
      if(s && s.answered){
        const exoEl = document.getElementById(`exo-${ex.id}`);
        const feedbackEl = document.getElementById(`feedback-${ex.id}`);
        exoEl.classList.add('answered', s.correct ? 'ok' : 'ko');
        feedbackEl.classList.add(s.correct ? 'ok' : 'ko');
        if(s.correct){
          feedbackEl.textContent = '✓ BRAVO ! (déjà validé)';
        }else{
          const explainLine = ex.explain ? `<br>→ ${ex.explain}` : '';
          feedbackEl.innerHTML = `✗ INCORRECT (déjà tenté — vous pouvez réessayer)${explainLine}`;
          typesetMath(feedbackEl);
        }
        if(typeof s.selectedIndex === 'number'){
          const radio = exoEl.querySelector(`input[name="${ex.id}"][value="${s.selectedIndex}"]`);
          if(radio) radio.checked = true;
        }
      }
    });
  }

  /* ---------- réinitialisation avec fenêtre de regret (60s, sans popup système) ---------- */
  const UNDO_WINDOW_MS = 60000;
  const UNDO_KEY = 'l1maths_undo_chapter_' + CHAPTER_ID;

  function pendingUndo(){
    let undo;
    try{ undo = JSON.parse(localStorage.getItem(UNDO_KEY)); }
    catch(e){ undo = null; }
    if(!undo || typeof undo.expiresAt !== 'number') return null;
    if(Date.now() >= undo.expiresAt){
      localStorage.removeItem(UNDO_KEY);
      return null;
    }
    return undo;
  }

  function performReset(){
    const stateRaw = localStorage.getItem(STATE_KEY);
    let progress = {};
    try{ progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch(e){ progress = {}; }

    /* Progression permanente ET progression hebdomadaire (celle qui
       pilote l'affichage de la pièce d'équipement gagnée) doivent
       toutes les deux être remises à zéro, sinon l'équipement du
       chapitre reste affiché malgré la réinitialisation. */
    const weeklyKey = window.weeklyStateKey ? window.weeklyStateKey(CHAPTER_ID) : null;
    const weeklyStateRaw = weeklyKey ? localStorage.getItem(weeklyKey) : null;
    let weeklyProgress = {};
    try{ weeklyProgress = JSON.parse(localStorage.getItem(window.WEEKLY_PROGRESS_KEY)) || {}; }
    catch(e){ weeklyProgress = {}; }

    const undo = {
      expiresAt: Date.now() + UNDO_WINDOW_MS,
      stateRaw: stateRaw,
      progressEntry: progress[CHAPTER_ID] || null,
      weeklyStateRaw: weeklyStateRaw,
      weeklyProgressEntry: weeklyProgress[CHAPTER_ID] || null,
    };
    localStorage.setItem(UNDO_KEY, JSON.stringify(undo));

    localStorage.removeItem(STATE_KEY);
    delete progress[CHAPTER_ID];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

    if(weeklyKey) localStorage.removeItem(weeklyKey);
    if(window.WEEKLY_PROGRESS_KEY){
      delete weeklyProgress[CHAPTER_ID];
      localStorage.setItem(window.WEEKLY_PROGRESS_KEY, JSON.stringify(weeklyProgress));
    }
    window.location.reload();
  }

  function undoReset(){
    const undo = pendingUndo();
    if(!undo) return;
    if(undo.stateRaw != null) localStorage.setItem(STATE_KEY, undo.stateRaw);
    let progress = {};
    try{ progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch(e){ progress = {}; }
    if(undo.progressEntry) progress[CHAPTER_ID] = undo.progressEntry;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

    const weeklyKey = window.weeklyStateKey ? window.weeklyStateKey(CHAPTER_ID) : null;
    if(weeklyKey && undo.weeklyStateRaw != null) localStorage.setItem(weeklyKey, undo.weeklyStateRaw);
    if(window.WEEKLY_PROGRESS_KEY){
      let weeklyProgress = {};
      try{ weeklyProgress = JSON.parse(localStorage.getItem(window.WEEKLY_PROGRESS_KEY)) || {}; }
      catch(e){ weeklyProgress = {}; }
      if(undo.weeklyProgressEntry) weeklyProgress[CHAPTER_ID] = undo.weeklyProgressEntry;
      localStorage.setItem(window.WEEKLY_PROGRESS_KEY, JSON.stringify(weeklyProgress));
    }

    localStorage.removeItem(UNDO_KEY);
    window.location.reload();
  }

  function setupResetButton(){
    const btn = document.getElementById('resetChapterBtn');
    if(!btn) return;
    const originalHTML = btn.innerHTML;
    let timer = null;

    function showNormal(){
      clearInterval(timer);
      btn.classList.remove('undo-mode');
      btn.innerHTML = originalHTML;
      btn.onclick = performReset;
    }

    function showUndo(undo){
      btn.classList.add('undo-mode');
      const tick = () => {
        const remaining = Math.max(0, Math.ceil((undo.expiresAt - Date.now()) / 1000));
        btn.textContent = `REGRETS ? (${remaining}s)`;
        if(remaining <= 0) showNormal();
      };
      tick();
      timer = setInterval(tick, 250);
      btn.onclick = undoReset;
    }

    const pending = pendingUndo();
    if(pending) showUndo(pending);
    else showNormal();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSections();
    const state = loadState();
    renderExoProgressBar(state);
    EXERCISES.forEach(ex => bindExercise(ex, state));
    restoreState(state);
    syncProgress(state);
    renderFichePieceBadge();
    setupResetButton();
  });
}
