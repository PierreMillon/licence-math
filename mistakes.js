/* ============================================================
   L1 MATHS — SYNTHÈSE — mistakes.js
   Page « mes erreurs fréquentes » : liste les exercices ratés au
   moins une fois (toutes fiches confondues), du plus raté au moins
   raté. Les données viennent de recordMistake/clearMistake/
   loadMistakes (menu.js), écrites par fiches/fiche-engine.js à
   chaque réponse.
   ============================================================ */

function typesetMistakes(el){
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

function renderMistakesList(){
  const container = document.getElementById('mistakesList');
  if(!container || !window.loadMistakes) return;

  const mistakes = Object.values(window.loadMistakes());
  mistakes.sort((a, b) => b.count - a.count);

  if(mistakes.length === 0){
    container.innerHTML = '<div class="mistakes-empty">Rien à signaler pour l’instant — continue comme ça.</div>';
    return;
  }

  container.innerHTML = mistakes.map(m => {
    const chapter = MENU_CHAPTERS.find(ch => ch.file === m.chapterId + '.html');
    const chapterName = chapter ? chapter.name : m.chapterId;
    const href = `fiches/${m.chapterId}.html#exo-${m.exerciseId}`;
    const countLabel = m.count === 1 ? '1 fois' : `${m.count} fois`;
    return `
      <a class="mistake-card" href="${href}">
        <div class="mistake-card__head">
          <span class="mistake-card__chapter">${chapterName}</span>
          <span class="mistake-card__count">raté ${countLabel}</span>
        </div>
        <div class="mistake-card__statement">${m.statement}</div>
      </a>
    `;
  }).join('');

  typesetMistakes(container);
}

document.addEventListener('DOMContentLoaded', renderMistakesList);
