/* ============================================================
   L1 MATHS — SYNTHÈSE — notation.js
   Page NOTATION (menu) : un petit slider pixel art par préférence,
   pour l'instant une seule (dérivation, u/v vs f/g). Persisté via
   getNotationPreference/setNotationPreference (menu.js), lu par
   fiche-engine.js au chargement de chaque fiche.
   ============================================================ */

function initNotationSlider(container){
  const topic = container.dataset.topic;
  const slider = container.querySelector('.notation-slider');
  if(!slider) return;

  function render(){
    const value = window.getNotationPreference ? window.getNotationPreference(topic) : 'fg';
    slider.dataset.active = value;
    slider.querySelectorAll('.notation-slider__option').forEach(opt => {
      opt.classList.toggle('is-active', opt.dataset.value === value);
    });
  }

  slider.addEventListener('click', e => {
    const opt = e.target.closest('.notation-slider__option');
    const current = slider.dataset.active;
    const next = opt ? opt.dataset.value : (current === 'uv' ? 'fg' : 'uv');
    if(next === current) return;
    if(window.setNotationPreference) window.setNotationPreference(topic, next);
    render();
  });

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.notation-pref').forEach(initNotationSlider);
});
