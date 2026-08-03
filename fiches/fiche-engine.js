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

function initFiche({ STATE_KEY, CHAPTER_ID, EXERCISES, SECTIONS }){

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
  function exoControlsHTML(ex){
    const opts = ex.options.map((opt, i) => `
      <label><input type="radio" name="${ex.id}" value="${i}"> <span>${opt}</span></label>
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
      feedbackEl.textContent = '✓ CORRECT';
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
          feedbackEl.textContent = '✓ CORRECT (déjà validé)';
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

  function resetChapter(){
    if(!confirm('Réinitialiser ce chapitre ? Toutes tes réponses seront effacées.')) return;
    localStorage.removeItem(STATE_KEY);
    let progress = {};
    try{ progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch(e){ progress = {}; }
    delete progress[CHAPTER_ID];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    if(window.incrementSkullPile) window.incrementSkullPile();
    window.location.reload();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSections();
    const state = loadState();
    renderExoProgressBar(state);
    EXERCISES.forEach(ex => bindExercise(ex, state));
    restoreState(state);
    syncProgress(state);
    const resetBtn = document.getElementById('resetChapterBtn');
    if(resetBtn) resetBtn.addEventListener('click', resetChapter);
  });
}
