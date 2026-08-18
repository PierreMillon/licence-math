/* ============================================================
   L1 MATHS — SYNTHÈSE — progression-page.js
   Rendu de la page progression.html (radar, grille détaillée, UI de
   transfert par phrase) — la logique/les données vivent dans
   progression.js (partagé avec revision.js), ce fichier ne fait que
   le DOM de cette page précise.
   ============================================================ */

function renderProgressionPage(){
  const radarContainer = document.getElementById('radarContainer');
  const overallEl = document.getElementById('overallMastery');
  const gridEl = document.getElementById('progressionGrid');
  if(!radarContainer || !gridEl) return;

  const axes = MENU_CHAPTERS.map(ch => {
    const chapterId = ch.file.replace('.html', '');
    return { label: ch.name, value: chapterMasteryPercent(chapterId), chapterId };
  });

  radarContainer.innerHTML = buildRadarSVG(axes);
  if(overallEl) overallEl.textContent = Math.round(overallMasteryPercent()) + '% DE MAÎTRISE GLOBALE';

  gridEl.innerHTML = axes.map(ax => {
    const full = ax.value >= 100;
    return `
      <a class="progression-cell${full ? ' is-full' : ''}" href="fiches/${ax.chapterId}.html">
        <span class="progression-cell__pct">${ax.value}%</span>
        <span class="progression-cell__label">${ax.label}</span>
      </a>
    `;
  }).join('');
}

function setupTransferUI(){
  const genBtn = document.getElementById('transferGenBtn');
  const reveal = document.getElementById('transferReveal');
  const importBtn = document.getElementById('transferImportBtn');
  const input = document.getElementById('transferInput');
  const message = document.getElementById('transferMessage');
  if(!genBtn) return;

  genBtn.addEventListener('click', () => {
    const phrase = exportProgressPhrase();
    reveal.innerHTML = `
      <div class="transfer-phrase">${phrase}</div>
      <div class="transfer-actions">
        <button type="button" class="transfer-btn" id="transferCopyBtn">COPIER LA PHRASE</button>
      </div>
    `;
    const copyBtn = document.getElementById('transferCopyBtn');
    copyBtn.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(phrase);
        copyBtn.textContent = 'COPIÉ !';
        setTimeout(() => { copyBtn.textContent = 'COPIER LA PHRASE'; }, 1500);
      }catch(e){
        message.textContent = 'Impossible de copier automatiquement — sélectionne le texte à la main.';
      }
    });
  });

  importBtn.addEventListener('click', () => {
    const phrase = input.value.trim();
    if(!phrase) return;
    if(!window.confirm('Importer cette phrase va écraser la progression actuelle sur cet appareil, chapitre par chapitre. Continuer ?')) return;
    const result = importProgressPhrase(phrase);
    if(!result){
      message.textContent = 'Phrase invalide — vérifie qu\'elle est copiée en entier, sans mot manquant.';
      return;
    }
    message.textContent = result.mismatch
      ? `Import fait (${result.applied} chapitres), mais le nombre de chapitres a changé depuis l'export : le résultat peut être décalé.`
      : `Import réussi : ${result.applied} chapitres mis à jour.`;
    renderProgressionPage();
  });
}

function setupResetWeekUI(){
  const btn = document.getElementById('resetWeekBtn');
  const message = document.getElementById('resetWeekMessage');
  if(!btn) return;
  btn.addEventListener('click', () => {
    if(!window.confirm('Remettre à zéro uniquement l\'armure du chevalier et la barre hebdomadaire sur cet appareil ? Le reste (progression permanente, erreurs fréquentes...) n\'est pas touché.')) return;
    if(window.resetWeekOnly) window.resetWeekOnly();
    if(message) message.textContent = 'Semaine réinitialisée.';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProgressionPage();
  setupTransferUI();
  setupResetWeekUI();
});
