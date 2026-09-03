/* ============================================================
   L1 MATHS — SYNTHÈSE — mistakes.js
   Page « mes erreurs fréquentes » : liste les exercices ratés au
   moins une fois (toutes fiches confondues), du plus raté au moins
   raté. Les données viennent de recordMistake/clearMistake/
   loadMistakes (menu.js), écrites par fiches/fiche-engine.js à
   chaque réponse.
   ============================================================ */

/* typesetMath : voir menu.js (partagé). */

function renderMistakesList(){
  const container = document.getElementById('mistakesList');
  if(!container || !window.loadMistakes) return;

  // N'affiche que les erreurs des chapitres actifs (chapters.js) : un
  // chapitre pas encore donné cette année reste invisible même ici.
  const mistakes = Object.values(window.loadMistakes()).filter(m => {
    const chapter = MENU_CHAPTERS.find(ch => ch.file === m.chapterId + '.html');
    return chapter && chapter.active;
  });
  mistakes.sort((a, b) => a.score - b.score); // le plus négatif (pire) en premier

  if(mistakes.length === 0){
    container.innerHTML = '<div class="mistakes-empty">Rien à signaler pour l’instant — continue comme ça.</div>';
    return;
  }

  container.innerHTML = mistakes.map(m => {
    const chapter = MENU_CHAPTERS.find(ch => ch.file === m.chapterId + '.html');
    const chapterName = chapter ? chapter.name : m.chapterId;
    const href = `fiches/${m.chapterId}.html#exo-${m.exerciseId}`;
    return `
      <a class="mistake-card" href="${href}">
        <div class="mistake-card__head">
          <span class="mistake-card__chapter">${chapterName}</span>
          <span class="mistake-card__count">${m.score}</span>
        </div>
        <div class="mistake-card__statement">${m.statement}</div>
      </a>
    `;
  }).join('');

  typesetMath(container);
}

document.addEventListener('DOMContentLoaded', renderMistakesList);

/* Rafraîchit sans avoir besoin de recharger la page à la main :
   - pageshow : couvre le retour arrière du navigateur, qui restaure
     souvent la page depuis un cache (bfcache) SANS ré-exécuter
     DOMContentLoaded — sans ça, revenir en arrière après avoir
     répondu à des exercices affiche une liste figée sur son état
     d'avant ;
   - visibilitychange : couvre le cas où l'onglet reste ouvert en
     arrière-plan pendant qu'on répond ailleurs (autre onglet), puis
     revient au premier plan ;
   - storage : couvre deux onglets ouverts en même temps sur des
     pages différentes du site (répond dans l'un, la liste se
     met à jour dans l'autre sans même avoir besoin de le rafraîchir). */
window.addEventListener('pageshow', renderMistakesList);
document.addEventListener('visibilitychange', () => {
  if(!document.hidden) renderMistakesList();
});
window.addEventListener('storage', e => {
  if(e.key === 'l1maths_mistakes') renderMistakesList();
});
