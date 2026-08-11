/* ============================================================
   L1 MATHS — SYNTHÈSE — tooltips.js
   Système générique d'infobulles : appui long (mobile) ou clic
   (ordinateur) sur une zone marquée data-tooltip affiche son
   explication en une phrase.

   Reprend le geste déjà utilisé par #gradeTooltip (voir
   initGradeTooltip, app.js) — généralisé ici à toutes les autres
   zones de la scène de combat (pile de crânes, pièces d'or, dragon,
   etc.) via UNE SEULE bulle partagée (#infoTooltip, créée ici en JS,
   pas besoin de la poser dans chaque page HTML) plutôt qu'une par
   zone. #gradeTooltip n'est pas repris dans ce système : son contenu
   (la note théorique) est calculé dynamiquement par app.js, pas une
   simple phrase fixe — pas de raison de toucher à ce qui marche déjà.

   Chargé sur toutes les pages ; ne fait rien si la page ne contient
   aucune zone data-tooltip (ex. changelog, notation). */

function initInfoTooltips(){
  const zones = document.querySelectorAll('[data-tooltip]');
  if(zones.length === 0) return;

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

  zones.forEach(zone => {
    zone.addEventListener('click', (e) => {
      e.stopPropagation();
      if(activeZone === zone && tooltip.classList.contains('visible')) reset();
      else show(zone);
    });
    zone.addEventListener('touchstart', (e) => {
      // Ne PAS preventDefault() si le doigt touche un élément interactif
      // à l'intérieur de la zone (bouton, lien...) : sur mobile, ça
      // supprime le click synthétique qui suivrait normalement le tap,
      // rendant l'élément intouchable. Bug trouvé le 11/08/2026 sur
      // #exoProgressBar (carrés d'exercice cliquables) — corrigé aussi
      // à la racine ici pour toute future zone du même genre.
      if(e.target.closest && e.target.closest('button, a, input, select, textarea')) return;
      e.preventDefault();
      const t = e.touches[0];
      positionAt(t.clientX, t.clientY);
      show(zone);
    }, { passive: false });
    zone.addEventListener('touchmove', (e) => {
      if(activeZone !== zone) return;
      e.preventDefault();
      const t = e.touches[0];
      positionAt(t.clientX, t.clientY);
    }, { passive: false });
    zone.addEventListener('touchend', () => { if(activeZone === zone) hideKeepingPosition(); });
    zone.addEventListener('touchcancel', () => { if(activeZone === zone) hideKeepingPosition(); });
  });

  document.addEventListener('click', (e) => {
    if(!activeZone) return;
    if(e.target !== activeZone && !activeZone.contains(e.target) && !tooltip.contains(e.target)) reset();
  });
}

document.addEventListener('DOMContentLoaded', initInfoTooltips);
