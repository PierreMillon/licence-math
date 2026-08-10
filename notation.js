/* ============================================================
   L1 MATHS — SYNTHÈSE — notation.js
   Page RÉGLAGES (menu) : un petit slider pixel art par préférence
   (dérivation u/v vs f/g, validation des réponses, affichage des
   fiches). Persisté via getNotationPreference/setNotationPreference
   (menu.js, même table pour toutes les préférences), lu par
   fiche-engine.js au chargement de chaque fiche.
   ============================================================ */

function initNotationSlider(container){
  const topic = container.dataset.topic;
  const fallback = container.dataset.default || 'fg';
  const slider = container.querySelector('.notation-slider');
  if(!slider) return;
  const options = Array.from(slider.querySelectorAll('.notation-slider__option'));
  const values = options.map(opt => opt.dataset.value);

  function render(){
    const value = window.getNotationPreference ? window.getNotationPreference(topic, fallback) : fallback;
    const activeIndex = Math.max(0, values.indexOf(value));
    slider.dataset.active = value;
    options.forEach((opt, i) => opt.classList.toggle('is-active', i === activeIndex));
    const thumb = slider.querySelector('.notation-slider__thumb');
    if(thumb) thumb.style.transform = activeIndex === 0 ? 'translateX(0)' : 'translateX(100%)';
  }

  slider.addEventListener('click', e => {
    const opt = e.target.closest('.notation-slider__option');
    const current = slider.dataset.active;
    const currentIndex = values.indexOf(current);
    const next = opt ? opt.dataset.value : values[currentIndex === 0 ? 1 : 0];
    if(next === current) return;
    if(window.setNotationPreference) window.setNotationPreference(topic, next);
    render();
  });

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.notation-pref').forEach(initNotationSlider);
});
