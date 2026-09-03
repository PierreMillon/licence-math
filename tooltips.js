/* ============================================================
   L1 MATHS — SYNTHÈSE — tooltips.js
   Système générique d'infobulles : appui long (mobile) ou clic
   (ordinateur) sur une zone marquée data-tooltip affiche son
   explication en une phrase.

   Couvre toutes les zones de la scène de combat (pile de crânes,
   pièces d'or, dragon, barre hebdomadaire, etc.) via UNE SEULE bulle
   partagée (#infoTooltip, créée ici en JS, pas besoin de la poser
   dans chaque page HTML) plutôt qu'une par zone.

   Délégué sur `document` (19/08/2026, corrigé à la racine) plutôt que
   des écouteurs posés zone par zone au chargement : une fiche est
   paginée (fiche-engine.js/renderPage) et reconstruit son contenu à
   chaque changement de page — une zone data-tooltip ajoutée APRÈS le
   DOMContentLoaded initial (ex. les marqueurs "comment ça se lit à
   voix haute", voir plus bas) ne recevait alors jamais ses écouteurs.
   La délégation lit `[data-tooltip]` au moment du clic/toucher, donc
   fonctionne sur n'importe quelle zone présente à cet instant, même
   ajoutée bien après le chargement de la page.

   Chargé sur toutes les pages ; ne crée l'élément bulle qu'une fois,
   mais reste actif même sur une page sans aucune zone data-tooltip
   au chargement (coût négligeable, et certaines pages en gagnent
   après coup — voir ci-dessus). */

function initInfoTooltips(){
  const tooltip = document.createElement('div');
  tooltip.id = 'infoTooltip';
  tooltip.setAttribute('role', 'tooltip');
  document.body.appendChild(tooltip);

  let activeZone = null;

  function show(zone){
    activeZone = zone;
    tooltip.textContent = zone.getAttribute('data-tooltip');
    tooltip.classList.add('visible');
  }
  function clearPosition(){
    tooltip.style.position = '';
    tooltip.style.left = '';
    tooltip.style.top = '';
    tooltip.style.transform = '';
  }
  function reset(){
    tooltip.classList.remove('visible');
    activeZone = null;
    clearPosition();
  }
  function hideKeepingPosition(){
    tooltip.classList.remove('visible');
    setTimeout(clearPosition, 200);
  }
  function positionAt(x, y){
    tooltip.style.position = 'fixed';
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 14) + 'px';
    tooltip.style.transform = 'translate(-50%, -100%)';
  }

  document.addEventListener('click', (e) => {
    const zone = e.target.closest && e.target.closest('[data-tooltip]');
    if(zone){
      e.stopPropagation();
      if(activeZone === zone && tooltip.classList.contains('visible')) reset();
      else show(zone);
      return;
    }
    if(activeZone && e.target !== activeZone && !activeZone.contains(e.target) && !tooltip.contains(e.target)) reset();
  });

  document.addEventListener('touchstart', (e) => {
    const zone = e.target.closest && e.target.closest('[data-tooltip]');
    if(!zone) return;
    // Ne PAS preventDefault() si le doigt touche un élément interactif
    // à l'intérieur de la zone (bouton, lien...) : sur mobile, ça
    // supprime le click synthétique qui suivrait normalement le tap,
    // rendant l'élément intouchable. Bug trouvé le 11/08/2026 sur
    // #exoProgressBar (carrés d'exercice cliquables) — corrigé aussi
    // à la racine ici pour toute future zone du même genre.
    if(e.target.closest('button, a, input, select, textarea')) return;
    e.preventDefault();
    const t = e.touches[0];
    positionAt(t.clientX, t.clientY);
    show(zone);
  }, { passive: false });

  document.addEventListener('touchmove', (e) => {
    if(!activeZone) return;
    e.preventDefault();
    const t = e.touches[0];
    positionAt(t.clientX, t.clientY);
  }, { passive: false });

  document.addEventListener('touchend', () => { if(activeZone) hideKeepingPosition(); });
  document.addEventListener('touchcancel', () => { if(activeZone) hideKeepingPosition(); });
}

document.addEventListener('DOMContentLoaded', initInfoTooltips);
