/* ============================================================
   L1 MATHS — SYNTHÉTIQUE — app.js
   Rendu de la page d'accueil : cartes chapitres + progression
   localStorage.
   ============================================================ */

const STORAGE_KEY = 'l1maths_progress';

const CHAPTERS = [
  { id: 'logique',       name: 'LOGIQUE',       file: 'fiches/logique.html',       total: 34 },
  { id: 'calculus',      name: 'CALCULUS',      file: 'fiches/calculus.html',      total: 27 },
  { id: 'algebre',       name: 'ALGÈBRE',       file: 'fiches/algebre.html',       total: 12 },
  { id: 'analyse',       name: 'ANALYSE',       file: 'fiches/analyse.html',       total: 21 },
  { id: 'probabilites',  name: 'PROBABILITÉS',  file: 'fiches/probabilites.html',  total: 23 },
  { id: 'statistiques',  name: 'STATISTIQUES',  file: 'fiches/statistiques.html',  total: 17 },
  { id: 'java',          name: 'JAVA',           file: 'fiches/java.html',          total: 40 },
  { id: 'python',        name: 'PYTHON',         file: 'fiches/python.html',        total: 43 },
];

function loadProgress(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  }catch(e){
    return {};
  }
}

const PROGRESS_SEGMENTS = 20;

function progressSegmentsHTML(pct){
  const filled = Math.round((pct / 100) * PROGRESS_SEGMENTS);
  let segs = '';
  for(let i = 0; i < PROGRESS_SEGMENTS; i++){
    segs += `<div class="progress-bar__seg${i < filled ? ' filled' : ''}"></div>`;
  }
  return segs;
}

function progressBarHTML(pct){
  return `<div class="progress-bar" aria-hidden="true">${progressSegmentsHTML(pct)}</div>`;
}

function renderChapters(){
  const grid = document.getElementById('chapterGrid');
  if(!grid) return;
  const progress = loadProgress();

  grid.innerHTML = CHAPTERS.map(ch => {
    const p = progress[ch.id] || { completed: 0, correct: 0 };
    const total = ch.total;
    const pct = total > 0 ? Math.round((p.completed / total) * 100) : 0;
    const scoreLabel = total > 0
      ? `${p.correct}/${total}`
      : '--/--';
    const done = p.completed >= total && total > 0;
    const doneClass = done ? ' done' : '';

    return `
      <div class="chapter-card${doneClass}" data-file="${ch.file}" tabindex="0" role="button" aria-label="Ouvrir ${ch.name}">
        <div class="chapter-card__title">
          <span>${ch.name}</span>
        </div>
        <div class="progress-row">
          ${progressBarHTML(pct)}
          <span class="chapter-card__score">${scoreLabel}</span>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.chapter-card').forEach(card => {
    const open = () => { window.location.href = card.dataset.file; };
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        open();
      }
    });
  });
}

function renderGlobalProgress(){
  const bar = document.getElementById('globalProgressBar');
  const scoreEl = document.getElementById('globalProgressScore');
  if(!bar) return;
  const progress = loadProgress();

  let totalExercises = 0;
  let totalCorrect = 0;
  CHAPTERS.forEach(ch => {
    if(ch.total <= 0) return;
    totalExercises += ch.total;
    const p = progress[ch.id] || { completed: 0, correct: 0 };
    totalCorrect += p.correct;
  });

  const pct = totalExercises > 0 ? Math.round((totalCorrect / totalExercises) * 100) : 0;
  bar.innerHTML = progressSegmentsHTML(pct);
  if(scoreEl) scoreEl.textContent = `${totalCorrect}/${totalExercises}`;

  const gradeEl = document.getElementById('gradeEstimate');
  const tooltipEl = document.getElementById('gradeTooltip');
  if(gradeEl){
    const grade = totalExercises > 0 ? Math.round((totalCorrect / totalExercises) * 20 * 10) / 10 : 0;
    gradeEl.textContent = `≈ ${grade}/20`;
  }
  if(tooltipEl){
    tooltipEl.textContent = "note théorique si l'examen ne testait que ce que tu maîtrises déjà";
  }
}

function initGradeTooltip(){
  const brace = document.getElementById('gradeBrace');
  const tooltip = document.getElementById('gradeTooltip');
  if(!brace || !tooltip) return;

  function show(){ tooltip.classList.add('visible'); }
  function reset(){
    tooltip.classList.remove('visible');
    tooltip.style.position = '';
    tooltip.style.left = '';
    tooltip.style.top = '';
    tooltip.style.transform = '';
  }
  function positionAt(x, y){
    tooltip.style.position = 'fixed';
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 14) + 'px';
    tooltip.style.transform = 'translate(-50%, -100%)';
  }

  brace.addEventListener('click', (e) => {
    e.stopPropagation();
    if(tooltip.classList.contains('visible')) reset();
    else show();
  });
  document.addEventListener('click', (e) => {
    if(e.target !== brace && !brace.contains(e.target) && !tooltip.contains(e.target)) reset();
  });

  brace.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const t = e.touches[0];
    positionAt(t.clientX, t.clientY);
    show();
  }, { passive: false });
  brace.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const t = e.touches[0];
    positionAt(t.clientX, t.clientY);
  }, { passive: false });
  brace.addEventListener('touchend', reset);
  brace.addEventListener('touchcancel', reset);
}

const FOOTER_MESSAGES = [
  "L'infini existe, paraît-il. C'est déjà plus que ce qu'on espérait pour ce semestre.",
  "Un mathématicien est quelqu'un qui préfère un problème qu'il ne résoudra jamais à une vie qu'il pourrait vivre.",
  "Je ne crains pas l'échec au partiel. Je crains juste d'être présent quand il arrivera.",
  "Deux droites parallèles ne se rencontrent jamais, ce qui est déjà plus que ce qu'on peut dire de moi et de mes révisions.",
  "L'éternité c'est long, surtout vers la fin du chapitre sur les intégrales.",
  "Je ne crois pas à la vie après le cc, mais j'apporte quand même mes fiches au cas où.",
  "0,999... = 1, à condition d'y croire très fort et de ne jamais y repenser.",
  "Ce diamant en haut à droite ne mène nulle part d'important. Comme presque tout le reste.",
  "La différence entre un optimiste et un pessimiste en maths, c'est que le pessimiste a déjà vérifié.",
  "Certains cherchent le sens de la vie. Moi je cherche juste où j'ai perdu mon epsilon.",
  "Un théorème n'est jamais vraiment terminé, il est juste abandonné par son démonstrateur.",
  "La barre de progression avance. Contrairement à moi face à ce chapitre.",
  "Je ne suis pas contre le travail, c'est juste qu'il arrive toujours pendant que je fais autre chose.",
  "Je ne crains pas la mort, je crains juste qu'elle tombe le jour du contrôle de calcul.",
  "Mon psy dit que réviser les intégrales est une forme d'évitement. Il n'a pas tort.",
  "J'ai demandé à l'univers un signe. Il m'a envoyé un exercice sur les matrices.",
  "Je ne suis pas anxieux à propos de l'examen. Je suis anxieux à propos de tout, l'examen n'est qu'un détail.",
  "La relation entre moi et les probabilités est compliquée, comme toutes mes relations.",
  "Si Dieu existe, j'espère qu'il n'est pas examinateur en algèbre linéaire.",
  "J'ai fait une thérapie de couple avec les mathématiques. Ça n'a rien réglé, mais on communique mieux.",
  "Vivre, c'est déjà difficile. Vivre en devant connaître les développements limités, c'est absurde.",
  "Je ne cherche pas le bonheur, je cherche juste à comprendre pourquoi n! grandit si vite.",
  "Mon rapport à l'échec est mûr et posé, ce qui explique pourquoi j'échoue si souvent avec calme.",
  "On me demande si je crois en quelque chose de plus grand que moi. Oui : ce chapitre sur les séries.",
  "Je ne suis pas du genre à fuir mes problèmes. Mes problèmes sont juste plus rapides que moi.",
  "L'éternité c'est long, surtout vers la fin. Woody n'avait pas ce chapitre sur les intégrales.",
  "J'ai arrêté de compter mes échecs. Maintenant je les intègre, ce qui revient à peu près au même.",
  "Ma mère voulait que je devienne médecin. Me voilà à 2h du matin avec un exercice sur les ensembles.",
  "Je n'ai pas peur du vide. J'ai juste peur qu'il soit à l'examen.",
  "L'angoisse existentielle, c'est gratuit. Les fiches de révision, un peu moins de mon temps.",
  "Je doute de tout, sauf du fait que je vais encore procrastiner ce chapitre.",
  "Il était une fois, par une nuit sombre et pluvieuse, un étudiant qui n'avait toujours pas ouvert son chapitre sur les suites.",
  "J'entends encore, dans le silence de la nuit, le battement sourd de ce théorème que je n'ai jamais vraiment compris.",
  "Le corbeau se posa sur mon bureau et dit : « jamais tu ne finiras ce chapitre ». J'ai répondu que si. Il a ri.",
  "Sous les lattes de mon bureau bat encore, obstiné, le cœur non résolu de cet exercice.",
  "La chute de la fiche de révision fut lente, inexorable, comme celle de la maison Usher.",
  "Il y a des ombres dans cette page que même les développements limités ne dissipent pas.",
  "Je me suis penché sur l'abîme des mathématiques, et l'abîme m'a renvoyé un devoir noté sur vingt.",
  "Le tic-tac de l'horloge se confond avec celui, plus terrible encore, du compte à rebours avant l'examen.",
  "Dans les catacombes de mes révisions repose, muré vivant, un chapitre entier sur les probabilités.",
  "J'ai crié la solution dans le silence de la nuit. Rien ne m'a répondu, pas même le corrigé.",
  "Une mélancolie sans nom plane sur ce chapitre, comme un linceul sur une maison déjà vide.",
  "Le pendule oscille, se rapproche, et ce n'est toujours pas moi qui ai révisé ce chapitre.",
  "Quelque chose gratte derrière le mur de mes certitudes. C'est probablement une hypothèse mal posée.",
  "J'ai vu la vérité dans les yeux vitreux de cette démonstration, et elle ne m'a pas reconnu.",
  "Le corbeau a dit « jamais plus ». Moi je dis juste « plus tard », ce qui est presque aussi définitif.",
  "Les cloches sonnent, sonnent, sonnent le glas de ce chapitre que j'ai toujours repoussé.",
  "Il n'y a pas de paix pour l'étudiant dont le chapitre sur les intégrales reste inachevé.",
  "Je descends, marche après marche, dans la crypte silencieuse de mes révisions non commencées.",
  "Certaines vérités mathématiques ne devraient jamais être révélées à l'esprit humain, et pourtant les voilà à l'examen.",
  "Au-delà des étoiles, dans le vide indifférent, personne ne se soucie que tu aies compris les matrices ou non.",
  "L'univers est vaste, froid, et parfaitement indifférent à ton chapitre sur les probabilités.",
  "J'ai regardé trop longtemps dans l'abîme des ensembles infinis. L'abîme m'a donné un exercice supplémentaire.",
  "Il existe des géométries que l'esprit humain ne peut concevoir sans sombrer dans la folie, et ce cours en a fait un chapitre.",
  "Quelque chose d'ancien et d'innommable sommeille dans ce chapitre sur les séries. Je préfère ne pas le réveiller.",
  "Les anciens dieux savaient peut-être calculer une primitive. Nous, mortels, on galère.",
  "Ce théorème existait avant l'humanité et existera après elle, indifférent à mes révisions.",
  "J'ai vu, dans les profondeurs insondables de l'algèbre linéaire, une vérité que je n'étais pas prêt à affronter.",
  "Le silence cosmique ne répond jamais à mes questions. Ni d'ailleurs à mes exercices non résolus.",
  "Des entités plus anciennes que le temps observent, impassibles, mon retard sur ce chapitre.",
  "La folie guette celui qui fixe trop longtemps une intégrale sans borne.",
  "Quelque part, dans un espace non-euclidien, existe la version de moi qui a fini ce chapitre à l'heure.",
  "Il y a des vérités indicibles au fond de ce chapitre, et je préfère ne pas les déranger avant l'examen.",
  "L'infini ne me terrifie pas. Ce qui me terrifie, c'est de devoir le manipuler proprement à l'écrit.",
  "Les étoiles s'alignent, indifférentes, pendant que ce chapitre sur les ensembles reste ouvert depuis trois semaines.",
  "Face à l'immensité incompréhensible du cosmos, mon chapitre sur les suites paraît presque raisonnable. Presque.",
  "Personne ne devrait contempler seul, la nuit, la beauté terrifiante d'une démonstration par récurrence.",
  "Selon la psychohistoire, il était statistiquement prévisible que je révise ce chapitre à la dernière minute.",
  "Un robot ne peut, par inaction, laisser un étudiant échouer à un exercice — sauf si l'exercice est sur les matrices.",
  "Hari Seldon avait tout prévu, sauf peut-être ce chapitre sur les probabilités conditionnelles.",
  "La Fondation avait un plan sur mille ans. Moi j'ai un plan sur les trois heures avant l'examen.",
  "Trois lois régissent les robots. Aucune ne m'oblige à réviser, ce qui explique beaucoup de choses.",
  "Le futur est déterminé par des équations que je ne maîtrise pas encore, ce qui est rassurant sur le plan philosophique.",
  "Quelque part dans la galaxie, une intelligence artificielle a déjà résolu cet exercice. Ici, on fait ce qu'on peut.",
  "Le calcul des probabilités appliqué à mon assiduité donne un résultat que je préfère ne pas connaître.",
  "Une machine pourrait calculer ceci en microsecondes. Moi il me faut un café et deux heures de déni.",
  "L'Empire Galactique est tombé pour des raisons plus prévisibles que ma capacité à finir ce chapitre à temps.",
  "Selon toute logique robotique, réviser maintenant serait optimal. Je choisis quand même d'attendre demain.",
  "Le Mulet n'avait pas prévu la psychohistoire. Moi je n'avais pas prévu ce chapitre sur les intégrales.",
  "Une civilisation avancée aurait automatisé cet exercice depuis longtemps. Nous, on le fait à la main, avec espoir.",
  "Les robots rêvent-ils de développements limités ? Probablement pas, ils ont juste à les calculer correctement.",
  "Le plan Seldon prévoyait des siècles de crises. Il n'avait pas prévu ce partiel de probabilités-statistiques.",
  "Quelque part, une IA bienveillante regarde mes révisions et se demande si intervenir serait éthique.",
  "La loi zéro protège l'humanité. Aucune loi ne me protège de ce chapitre sur les fonctions.",
  "Dans mille ans, une encyclopédie galactique résumera ce chapitre en une phrase. J'aimerais bien l'avoir maintenant.",
  "J'ai proposé le mariage à la logique. Elle a répondu par contraposée.",
  "Un ensemble vide, c'est un peu comme mon planning de révisions avant ce soir.",
  "Je ne suis pas perfectionniste, je suis juste en désaccord permanent avec mes propres démonstrations.",
  "La probabilité que je révise ce soir tend vers zéro, mais reste, techniquement, non nulle.",
  "J'ai demandé à un ami sincère de me dire la vérité sur mes chances à l'examen. Il n'a plus jamais répondu.",
  "Certains cherchent l'amour. Moi je cherche juste une primitive qui existe sous forme close.",
  "On me dit que le travail paie. Mon compte en banque et mes notes ne semblent pas d'accord.",
  "Je révise avec la régularité d'une fonction discontinue : de façon imprévisible et rarement au bon endroit.",
  "Mon rapport au temps est purement théorique, un peu comme ma maîtrise des séries entières.",
  "Je ne fuis pas mes responsabilités, je les reporte à une date ultérieure indéterminée, presque comme une intégrale impropre.",
  "L'algèbre linéaire ne me veut aucun mal. C'est réciproque, en théorie.",
  "Je me suis réconcilié avec l'échec. On se voit toutes les semaines, généralement le jour du rendu.",
  "Un jour je comprendrai vraiment les probabilités. Ce jour n'est statistiquement pas aujourd'hui.",
  "Je n'ai pas raté ce chapitre. Je l'ai simplement laissé mûrir indéfiniment, comme un bon vin ou un mauvais compromis.",
  "La vie est courte, les développements limités aussi, en théorie.",
  "J'ai vérifié : l'univers ne me doit rien. Ce chapitre non plus, apparemment.",
  "Le doute méthodique de Descartes ne portait pas sur les intégrales. Le mien, si, malheureusement.",
  "Je crois profondément en moi-même, sauf les soirs de révision, où je m'en méfie beaucoup.",
];

const FOOTER_BAG_KEY = 'l1maths_footer_bag';
const FOOTER_LAST_KEY = 'l1maths_footer_last';

/* shuffledIndices() est définie dans menu.js, chargé avant app.js sur
   cette page — réutilisée ici pour éviter une deuxième copie. */

function nextFooterIndex(){
  let bag = [];
  try{ bag = JSON.parse(sessionStorage.getItem(FOOTER_BAG_KEY)) || []; }
  catch(e){ bag = []; }

  if(!Array.isArray(bag) || bag.length === 0){
    const previousLast = Number(sessionStorage.getItem(FOOTER_LAST_KEY));
    bag = shuffledIndices(FOOTER_MESSAGES.length);
    if(FOOTER_MESSAGES.length > 1){
      while(bag[0] === previousLast) bag = shuffledIndices(FOOTER_MESSAGES.length);
    }
  }

  const idx = bag.shift();
  sessionStorage.setItem(FOOTER_BAG_KEY, JSON.stringify(bag));
  sessionStorage.setItem(FOOTER_LAST_KEY, String(idx));
  return idx;
}

function renderFooterCycle(){
  const el = document.getElementById('footerHint');
  if(!el) return;
  el.firstChild.textContent = FOOTER_MESSAGES[nextFooterIndex()] + ' ';
}

document.addEventListener('DOMContentLoaded', () => {
  renderChapters();
  renderGlobalProgress();
  renderFooterCycle();
  initGradeTooltip();
});
