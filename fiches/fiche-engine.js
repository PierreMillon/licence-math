/* ============================================================
   L1 MATHS — SYNTHÈSE — fiches/fiche-engine.js
   Moteur commun à toutes les fiches de chapitre (rendu des
   sections, QCM, progression, barre de progression par carrés,
   réinitialisation). Chaque fiche ne fournit plus que ses
   données (EXERCISES, SECTIONS) et appelle initFiche(...).
   ============================================================ */

const PROGRESS_KEY = 'l1maths_progress';

/* typesetMath : voir menu.js (partagé, chargé avant ce fichier sur
   toute fiche). */

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
    const nameEl = document.getElementById('fichePieceName');
    if(!badge || typeof KNIGHT_PIECES === 'undefined') return;
    const piece = KNIGHT_PIECES.find(p => p.chapterId === CHAPTER_ID);
    if(!piece || !window.weeklyChapterFraction || !window.miniPieceClipStyle || !window.knightPieceMiniSVG) return;
    const fraction = window.weeklyChapterFraction(CHAPTER_ID);
    const clip = window.miniPieceClipStyle(fraction);
    const miniSvg = window.knightPieceMiniSVG(CHAPTER_ID, piece.svg());
    /* width/height:100% explicites sur ce wrapper : sans ça, comme il n'a
       pas de hauteur propre (juste le style de clip-path), le svg.100%.
       à l'intérieur retombe sur une hauteur "auto" basée sur son propre
       viewBox au lieu de remplir le badge carré de 46px — débordement
       visible sur les pièces au format haut/étroit (ex. le plastron
       d'Analyse), qui touche le texte de la légende en dessous. */
    badge.innerHTML = `<div style="width:100%;height:100%;${clip}">${miniSvg}</div>`;
    // Nom façon jeu vidéo (11/08/2026, demande explicite), toujours
    // affiché (même à 0% de révélation) — c'est l'objet à obtenir
    // cette semaine, pas seulement celui déjà obtenu.
    if(nameEl && piece.name) nameEl.textContent = piece.name;
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
      <button type="button" class="exo-progress-bar__sq${exoProgressSquareState(state, ex)}" data-exid="${ex.id}" title="Exercice ${i + 1}/${EXERCISES.length}" aria-label="Aller à l'exercice ${i + 1}"></button>
    `).join('');
    bar.querySelectorAll('.exo-progress-bar__sq').forEach(sq => {
      sq.addEventListener('click', () => {
        const exId = sq.dataset.exid;
        goToPage(findPageForExercise(exId), 'exo-' + exId);
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
     fiche, et à chaque changement de page puisqu'on re-rend) pour
     qu'on ne puisse pas répondre juste en retenant une position fixe.
     Les questions elles-mêmes ne bougent jamais. Le mélange ne touche
     que l'ordre d'affichage : la valeur de chaque radio reste l'index
     d'origine dans ex.options, donc correctIndex / selectedIndex /
     l'état sauvegardé restent inchangés. */
  function shuffledIndices(n){
    const order = Array.from({ length: n }, (_, i) => i);
    for(let i = order.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }

  /* confirmModeEnabled : voir menu.js (partagé). */

  function exoControlsHTML(ex){
    const order = shuffledIndices(ex.options.length);
    const opts = order.map(i => `
      <label><input type="radio" name="${ex.id}" value="${i}"> <span>${ex.options[i]}</span></label>
    `).join('');
    const confirmBtn = confirmModeEnabled()
      ? `<button type="button" class="exo-confirm-btn" data-exid="${ex.id}" disabled>VALIDER</button>`
      : '';
    return `<div class="qcm-options">${opts}</div>${confirmBtn}`;
  }

  /* ---------- pagination (5-6 exercices par page) ---------- */
  /* Une fiche entière en un seul défilement était jugée trop longue
     (retour d'un relecteur externe) : on la découpe en pages internes
     de PAGE_SIZE exercices, par lots simples (une section peut donc
     être coupée entre deux pages) plutôt qu'une page par section
     (sections de taille très inégale). Reste sur UNE SEULE URL/page
     HTML : le score, la progression, les liens directs vers un
     exercice (#exo-xxx, utilisés par mistakes.js) et le bouton reset
     continuent de porter sur tout le chapitre, inchangés. */
  const PAGE_SIZE = 6;
  let PAGES = [];
  let currentPageIndex = 0;

  /* Réglage optionnel « AFFICHAGE DES FICHES » (notation.html) : paged
     (défaut) = pagination par lots de PAGE_SIZE ci-dessus. continuous =
     retour à l'ancien défilement continu (une seule page, une section
     par bloc, jamais coupée) — retour de Charles Boyer, qui préfère
     dérouler d'une traite sur ordinateur. */
  function pagedModeEnabled(){
    return !window.getNotationPreference || window.getNotationPreference('pageMode', 'paged') !== 'continuous';
  }

  function buildPages(){
    if(!pagedModeEnabled()){
      return [ SECTIONS.map(sec => ({
        section: sec,
        exercises: EXERCISES.filter(e => e.section === sec.id),
        continuation: false,
      })) ];
    }

    const pages = [];
    let page = [];
    let pageCount = 0;

    SECTIONS.forEach(sec => {
      const exos = EXERCISES.filter(e => e.section === sec.id);
      let idx = 0;
      let firstBlockOfSection = true;
      do{
        if(pageCount >= PAGE_SIZE){
          pages.push(page);
          page = [];
          pageCount = 0;
        }
        const room = PAGE_SIZE - pageCount;
        const chunk = exos.slice(idx, idx + room);
        page.push({ section: sec, exercises: chunk, continuation: !firstBlockOfSection });
        idx += chunk.length;
        pageCount += chunk.length;
        firstBlockOfSection = false;
      }while(idx < exos.length);
    });
    if(page.length) pages.push(page);
    return pages;
  }

  function findPageForExercise(exId){
    for(let i = 0; i < PAGES.length; i++){
      if(PAGES[i].some(block => block.exercises.some(e => e.id === exId))) return i;
    }
    return 0;
  }

  function renderPager(){
    const el = document.getElementById('fichePager');
    if(!el) return;
    if(PAGES.length <= 1){ el.innerHTML = ''; return; }

    el.innerHTML = `
      <button type="button" class="fiche-pager__btn" id="pagerPrev"${currentPageIndex === 0 ? ' disabled' : ''}>← PAGE PRÉCÉDENTE</button>
      <span class="fiche-pager__label">PAGE ${currentPageIndex + 1}/${PAGES.length}</span>
      <button type="button" class="fiche-pager__btn" id="pagerNext"${currentPageIndex === PAGES.length - 1 ? ' disabled' : ''}>PAGE SUIVANTE →</button>
    `;
    const prevBtn = document.getElementById('pagerPrev');
    const nextBtn = document.getElementById('pagerNext');
    if(prevBtn) prevBtn.addEventListener('click', () => { if(currentPageIndex > 0) goToPage(currentPageIndex - 1); });
    if(nextBtn) nextBtn.addEventListener('click', () => { if(currentPageIndex < PAGES.length - 1) goToPage(currentPageIndex + 1); });
  }

  function renderPage(pageIndex){
    const container = document.getElementById('sectionsContainer');
    if(!container) return;
    currentPageIndex = Math.max(0, Math.min(pageIndex, PAGES.length - 1));
    const page = PAGES[currentPageIndex] || [];
    const state = loadState();

    container.innerHTML = page.map(block => {
      const exosHTML = block.exercises.map(ex => `
        <div class="exo" id="exo-${ex.id}" data-id="${ex.id}">
          <div class="exo__head">
            <span>EXERCICE ${EXERCISES.indexOf(ex) + 1}/${EXERCISES.length}</span>
          </div>
          <div class="exo__statement">${ex.statement}</div>
          ${exoControlsHTML(ex)}
          <div class="exo__feedback" id="feedback-${ex.id}"></div>
        </div>
      `).join('');

      const titleHTML = block.continuation
        ? `<div class="section__title">${block.section.title} <span class="section__continued">(suite)</span></div>`
        : `<div class="section__title">${block.section.title}</div><p class="cours">${block.section.cours}</p>`;

      return `<section class="section" id="section-${block.section.id}">${titleHTML}${exosHTML}</section>`;
    }).join('');

    typesetMath(container);
    renderPager();

    page.forEach(block => block.exercises.forEach(ex => bindExercise(ex, state)));
    restoreState(state, page);
  }

  function goToPage(pageIndex, scrollTargetId){
    renderPage(pageIndex);
    requestAnimationFrame(() => {
      if(scrollTargetId){
        const target = document.getElementById(scrollTargetId);
        if(target){ target.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      }
      const container = document.getElementById('sectionsContainer');
      if(container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
    if(window.notifyMusicAnswer) window.notifyMusicAnswer(isCorrect);
    if(isCorrect){
      if(window.improveMistake) window.improveMistake(CHAPTER_ID, ex.id);
    }else{
      if(window.recordMistake) window.recordMistake(CHAPTER_ID, ex);
    }
    renderFichePieceBadge();
  }

  function bindExercise(ex, state){
    const exoEl = document.getElementById(`exo-${ex.id}`);
    if(!exoEl) return; // pas sur la page actuellement affichée
    const radios = exoEl.querySelectorAll(`input[name="${ex.id}"]`);
    const confirmBtn = exoEl.querySelector('.exo-confirm-btn');

    if(confirmBtn){
      radios.forEach(radio => {
        radio.addEventListener('change', () => { confirmBtn.disabled = false; });
      });
      confirmBtn.addEventListener('click', () => {
        const checked = exoEl.querySelector(`input[name="${ex.id}"]:checked`);
        if(!checked) return;
        applyFeedback(ex, Number(checked.value), state);
        confirmBtn.disabled = true;
      });
    }else{
      radios.forEach(radio => {
        radio.addEventListener('change', () => {
          applyFeedback(ex, Number(radio.value), state);
        });
      });
    }
  }

  /* page : le tableau de blocs de la page en cours (renderPage) — ne
     restaure que les exercices réellement rendus, les autres n'ont pas
     d'élément dans le DOM tant qu'on n'a pas tourné la page. */
  function restoreState(state, page){
    const exosOnPage = page ? page.flatMap(block => block.exercises) : EXERCISES;
    exosOnPage.forEach(ex => {
      const s = state[ex.id];
      if(s && s.answered){
        const exoEl = document.getElementById(`exo-${ex.id}`);
        const feedbackEl = document.getElementById(`feedback-${ex.id}`);
        if(!exoEl || !feedbackEl) return;
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
    PAGES = buildPages();

    /* Lien direct vers un exercice précis (ex. depuis mistakes.html,
       #exo-ex10) : ouvre directement la page qui le contient au lieu
       de la page 1, puis saute dessus (pas de smooth-scroll au tout
       premier rendu, comme un ancrage classique). */
    const hashExId = window.location.hash.replace('#exo-', '');
    const initialPage = hashExId ? findPageForExercise(hashExId) : 0;
    renderPage(initialPage);
    if(hashExId){
      const target = document.getElementById('exo-' + hashExId);
      if(target) target.scrollIntoView({ block: 'center' });
    }

    const state = loadState();
    renderExoProgressBar(state);
    syncProgress(state);
    renderFichePieceBadge();
    setupResetButton();
  });
}
