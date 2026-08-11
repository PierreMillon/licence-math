/* ============================================================
   L1 MATHS — SYNTHÈSE — progression.js
   Porté du système de « fiche-de-math-gael » (radar de compétences +
   révision ciblée + transfert de progression par phrase), à l'exclusion
   du système de pyramide à paliers propre à cet autre site — voir
   discussion du 10/08/2026. Utilisé par progression.html (radar +
   transfert) et revision.js (session ciblée). Chargé après menu.js
   ET weekly.js (utilise MENU_CHAPTERS et CHAPTER_TOTALS directement,
   sans window., comme victory.js le fait déjà pour WEEKLY_THRESHOLD :
   les <script> classiques d'une même page partagent un seul scope
   top-niveau).
   ============================================================ */

/* CHAPTER_STATE_KEYS : voir menu.js (partagé, chargé avant ce
   fichier sur toute page qui utilise progression.js). */

/* ---------- maîtrise par chapitre (radar) ---------- */
function chapterMasteryPercent(chapterId){
  const total = (typeof CHAPTER_TOTALS !== 'undefined' && CHAPTER_TOTALS[chapterId]) || 0;
  if(total <= 0) return 0;
  let progress = {};
  try{ progress = JSON.parse(localStorage.getItem('l1maths_progress')) || {}; }
  catch(e){ progress = {}; }
  const correct = (progress[chapterId] && progress[chapterId].correct) || 0;
  return Math.min(100, Math.round((correct / total) * 100));
}
window.chapterMasteryPercent = chapterMasteryPercent;

function overallMasteryPercent(){
  const ids = Object.keys(CHAPTER_STATE_KEYS);
  if(ids.length === 0) return 0;
  return ids.reduce((sum, id) => sum + chapterMasteryPercent(id), 0) / ids.length;
}
window.overallMasteryPercent = overallMasteryPercent;

/* Écrit le résultat d'un exercice répondu HORS de sa fiche d'origine
   (session de révision ciblée, voir revision.js) exactement comme le
   ferait fiche-engine.js sur la fiche elle-même : même clé de state,
   même forme d'entrée, et recalcule l1maths_progress au passage — pour
   que la fiche d'origine (barre de progression, badge d'équipement,
   case verte/rouge) reflète la réponse au prochain chargement, sans
   dépendre d'un accès direct aux EXERCISES de ce chapitre (impossible
   ici : chaque fiches/*.js déclare EXERCISES en const top-niveau, donc
   deux fiches ne peuvent pas être chargées sur la même page). */
function writeExerciseResult(chapterId, exerciseId, isCorrect, selectedIndex){
  const stateKey = CHAPTER_STATE_KEYS[chapterId];
  if(!stateKey) return;
  let state = {};
  try{ state = JSON.parse(localStorage.getItem(stateKey)) || {}; }
  catch(e){ state = {}; }
  state[exerciseId] = { answered: true, correct: isCorrect, selectedIndex };
  localStorage.setItem(stateKey, JSON.stringify(state));

  const entries = Object.values(state);
  const completed = entries.filter(e => e.answered).length;
  const correct = entries.filter(e => e.correct).length;
  let progress = {};
  try{ progress = JSON.parse(localStorage.getItem('l1maths_progress')) || {}; }
  catch(e){ progress = {}; }
  progress[chapterId] = { completed, correct };
  localStorage.setItem('l1maths_progress', JSON.stringify(progress));
}
window.writeExerciseResult = writeExerciseResult;

/* ---------- radar SVG (huit axes = huit chapitres) ---------- */
/* Porté directement de src/lib/radarChart.tsx (fiche-de-math-gael) :
   même géométrie (axes répartis en cercle depuis midi, valeurs 0-100
   mappées sur le rayon, anneaux de repère), juste réécrit en chaîne
   SVG plutôt qu'en composant React, et recoloré sur les tons du site
   (blanc/gris) au lieu du turquoise d'origine. */
function buildRadarSVG(axes){
  const n = axes.length;
  if(n < 3) return '';

  const padX = 54, padY = 20, size = 220;
  const width = size + padX * 2;
  const height = size + padY * 2;
  const cx = width / 2, cy = height / 2;
  const maxRadius = size / 2 - 16;
  const rings = [0.25, 0.5, 0.75, 1];

  const angleFor = i => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pointFor = (i, frac) => {
    const a = angleFor(i);
    return { x: cx + maxRadius * frac * Math.cos(a), y: cy + maxRadius * frac * Math.sin(a) };
  };

  const ringsSVG = rings.map(frac => {
    const pts = axes.map((_, i) => pointFor(i, frac)).map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="currentColor" stroke-opacity="0.18" stroke-width="1"/>`;
  }).join('');

  const spokesSVG = axes.map((_, i) => {
    const edge = pointFor(i, 1);
    return `<line x1="${cx}" y1="${cy}" x2="${edge.x.toFixed(1)}" y2="${edge.y.toFixed(1)}" stroke="currentColor" stroke-opacity="0.18" stroke-width="1"/>`;
  }).join('');

  const dataPoints = axes.map((ax, i) => pointFor(i, Math.max(0, Math.min(100, ax.value)) / 100));
  const dataPath = dataPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const dotsSVG = dataPoints.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="#ffb000"/>`).join('');

  const labelsSVG = axes.map((ax, i) => {
    const lp = pointFor(i, 1.26);
    return `<text x="${lp.x.toFixed(1)}" y="${lp.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="currentColor">${ax.label}</text>`;
  }).join('');

  return `<svg viewBox="0 0 ${width} ${height}" class="radar-chart" role="img" aria-label="Radar de progression par chapitre">
    ${ringsSVG}${spokesSVG}
    <polygon points="${dataPath}" fill="#ffb000" fill-opacity="0.22" stroke="#ffb000" stroke-width="2"/>
    ${dotsSVG}
    ${labelsSVG}
  </svg>`;
}
window.buildRadarSVG = buildRadarSVG;

/* ---------- transfert de progression par phrase (sans compte) ---------- */
/* Porté de src/lib/wordCode.ts (fiche-de-math-gael), même liste de 256
   mots (animaux/friandises/objets doux, sans accent, sans doublon —
   fiable même retapée à la main) et même schéma d'encodage général
   (un octet par mot, un octet d'en-tête pour détecter un décalage).
   Adapté au contenu de L1 Maths : au lieu d'un nibble par compétence
   (système de pyramide de l'autre site, explicitement exclu ici), un
   nibble par CHAPITRE (8 chapitres → 4 octets → 4 mots, phrase courte)
   représentant un niveau de maîtrise 0-15 (au lieu de l'état exact
   exercice par exercice — comme la pyramide de l'autre site, ce n'est
   pas une sauvegarde au sens strict, plutôt une "photo" approximative
   à un instant donné, suffisante pour reprendre sur un autre appareil
   sans repartir de zéro). */
const WORDLIST = [
  "chat","chaton","chien","chiot","lapin","lapereau","ourson","panda","koala","renard",
  "renardeau","ecureuil","herisson","loutre","castor","faon","mouton","agneau","chevre","chevreau",
  "vache","veau","cochon","cochonnet","poule","poussin","canard","caneton","oie","oison",
  "cygne","pingouin","manchot","dauphin","baleine","phoque","tortue","grenouille","papillon","coccinelle",
  "abeille","luciole","escargot","girafe","girafon","elephant","elephanteau","zebre","singe","gorille",
  "lionceau","tigron","poisson","poissonrouge","etoiledemer","hippocampe","crabe","pieuvre","meduse","corail",
  "pomme","poire","banane","fraise","cerise","orange","citron","ananas","mangue","peche",
  "abricot","raisin","myrtille","framboise","pasteque","kiwi","gateau","biscuit","bonbon","chocolat",
  "glace","cupcake","macaron","sucre","miel","crepe","gaufre","tarte","guimauve","caramel",
  "praline","nougat","nuage","etoile","lune","soleil","arcenciel","coeur","ballon","cerfvolant",
  "bulle","doudou","oreiller","coussin","couverture","lanterne","bougie","cadeau","ruban","bouton",
  "perle","coquillage","plume","fleur","tulipe","marguerite","tournesol","trefle","feuille","champignon",
  "gland","flocon","licorne","fee","lutin","elfe","sirene","farfadet","gnome","etoilefilante",
  "baguette","potion","cabane","maison","moulin","phare","bateau","train","fusee","planete",
  "robot","montgolfiere","carrosse","chateau","pont","jardin","balancoire","toboggan","manege","parapluie",
  "botte","chapeau","echarpe","gant","chaussette","pyjama","poupee","peluche","toupie","cerceau",
  "marionnette","tambourin","flute","grelot","clochette","sifflet","guitare","piano","violon","harpe",
  "xylophone","berceau","biberon","hochet","tetine","landau","poussette","veilleuse","arrosoir","pelle",
  "seau","chateaudesable","cerf","ecrevisse","canari","perroquet","colombe","moineau","hirondelle","rougegorge",
  "mesange","plumeau","nid","oeuf","coquille","framboisier","cerisier","pommier","fraisier","cascade",
  "ruisseau","colline","vallee","printemps","bourgeon","rosee","brume","comete","meteore","galaxie",
  "astronaute","diamant","emeraude","saphir","rubis","couronne","bague","bracelet","collier","medaillon",
  "coffret","cle","serrure","horloge","montre","boussole","longuevue","carte","souris","souriceau",
  "taupe","blaireau","marmotte","hibou","chouette","biche","faisan","paon","flamant","colibri",
  "libellule","bourdon","ver","chenille","chrysalide","nenuphar","iris","jonquille","jacinthe","muguet",
  "lavande","camomille","bruyere","fougere","mousse","rocher",
];
const WORD_INDEX = new Map(WORDLIST.map((w, i) => [w, i]));

function encodeCodes(codes, unitCount){
  const bytes = [unitCount % 256];
  for(let i = 0; i < codes.length; i += 2){
    const hi = codes[i] & 0x0f;
    const lo = (codes[i + 1] ?? 0) & 0x0f;
    bytes.push((hi << 4) | lo);
  }
  let end = bytes.length;
  while(end > 1 && bytes[end - 1] === 0) end--;
  return bytes.slice(0, end).map(b => WORDLIST[b]).join('-');
}

function decodeCodes(phrase, skipWords){
  const words = phrase.trim().toLowerCase().split(/[\s,-]+/).filter(Boolean).slice(skipWords || 0);
  if(words.length < 1) return null;
  const bytes = [];
  for(const w of words){
    const idx = WORD_INDEX.get(w);
    if(idx === undefined) return null;
    bytes.push(idx);
  }
  const header = bytes[0];
  const rest = bytes.slice(1);
  const codes = [];
  rest.forEach(b => { codes.push((b >> 4) & 0x0f); codes.push(b & 0x0f); });
  return { header, codes };
}

const BADGE_TIERS = [
  ["chaton", "poussin", "lapereau", "faon", "souriceau"],
  ["papillon", "coccinelle", "luciole", "arcenciel", "etoile"],
  ["licorne", "fee", "lutin", "sirene", "farfadet"],
  ["diamant", "emeraude", "saphir", "rubis", "perle"],
  ["couronne", "galaxie", "comete", "astronaute", "etoilefilante"],
];
function badgeWord(overallPercent){
  const pct = Math.min(100, Math.max(0, overallPercent));
  const tierIdx = Math.min(BADGE_TIERS.length - 1, Math.floor(pct / 20));
  const tier = BADGE_TIERS[tierIdx];
  const pctInTier = pct - tierIdx * 20;
  const wordIdx = Math.min(tier.length - 1, Math.floor((pctInTier / 20) * tier.length));
  return tier[wordIdx];
}

/* Préférences des réglages (notation.html) embarquées dans la phrase
   (11/08/2026, demande explicite) : un bit chacune, combinées dans un
   9ᵉ "code" ajouté après les 8 codes de chapitre — le mécanisme
   d'encodage (encodeCodes, nibbles par paire) n'a pas besoin de
   changer, juste un code de plus dans le tableau. Rétrocompatible :
   une phrase déjà exportée AVANT ce changement n'a pas ce 9ᵉ code
   (undefined au décodage), importProgressPhrase l'ignore alors
   simplement au lieu de planter. */
const NOTATION_TOPICS_FOR_EXPORT = [
  { topic: 'derivation',    values: ['fg', 'uv'],             fallback: 'fg' },
  { topic: 'confirmAnswer', values: ['on', 'off'],            fallback: 'on' },
  { topic: 'pageMode',      values: ['paged', 'continuous'],  fallback: 'paged' },
  { topic: 'music',         values: ['off', 'on'],            fallback: 'off' },
];

function encodePrefsNibble(){
  let n = 0;
  NOTATION_TOPICS_FOR_EXPORT.forEach((t, i) => {
    const value = window.getNotationPreference ? window.getNotationPreference(t.topic, t.fallback) : t.fallback;
    if(t.values.indexOf(value) === 1) n |= (1 << i);
  });
  return n;
}

function applyPrefsNibble(n){
  if(typeof window.setNotationPreference !== 'function') return;
  NOTATION_TOPICS_FOR_EXPORT.forEach((t, i) => {
    const bit = (n >> i) & 1;
    window.setNotationPreference(t.topic, t.values[bit]);
  });
}

function exportProgressPhrase(){
  const ids = Object.keys(CHAPTER_STATE_KEYS);
  const codes = ids.map(id => Math.round((chapterMasteryPercent(id) / 100) * 15));
  codes.push(encodePrefsNibble());
  const badge = badgeWord(overallMasteryPercent());
  return `${badge}-${encodeCodes(codes, ids.length)}`;
}
window.exportProgressPhrase = exportProgressPhrase;

/* Reconstitue un state plausible pour un chapitre à partir d'un simple
   niveau 0-15 : marque les K premiers exercices (ex1..exK, l'ordre
   d'affichage réel) comme réussis, K = round(niveau/15 * total) — comme
   la pyramide de l'autre site, ce n'est pas l'historique exact qui
   revient, juste une maîtrise équivalente en pourcentage. Écrase l'état
   local existant pour ce chapitre.
   Écrit aussi dans la couche HEBDOMADAIRE (weeklyStateKey/
   WEEKLY_PROGRESS_KEY, weekly.js) — bug trouvé le 11/08/2026 : sans
   ça, importer un code restaure bien la progression permanente mais
   PAS la progression de la semaine, dont dépendent les pièces
   d'armure (weeklyChapterFraction) — elles ne bougeaient jamais après
   un import. */
function applyChapterLevel(chapterId, level){
  const total = (typeof CHAPTER_TOTALS !== 'undefined' && CHAPTER_TOTALS[chapterId]) || 0;
  if(total <= 0) return;
  const stateKey = CHAPTER_STATE_KEYS[chapterId];
  if(!stateKey) return;
  const correctCount = Math.round((Math.max(0, Math.min(15, level)) / 15) * total);
  const state = {};
  for(let i = 1; i <= correctCount; i++){
    state['ex' + i] = { answered: true, correct: true, selectedIndex: null };
  }
  localStorage.setItem(stateKey, JSON.stringify(state));

  let progress = {};
  try{ progress = JSON.parse(localStorage.getItem('l1maths_progress')) || {}; }
  catch(e){ progress = {}; }
  progress[chapterId] = { completed: correctCount, correct: correctCount };
  localStorage.setItem('l1maths_progress', JSON.stringify(progress));

  if(typeof window.weeklyStateKey === 'function' && typeof window.WEEKLY_PROGRESS_KEY === 'string'){
    localStorage.setItem(window.weeklyStateKey(chapterId), JSON.stringify(state));
    let weeklyProgress = {};
    try{ weeklyProgress = JSON.parse(localStorage.getItem(window.WEEKLY_PROGRESS_KEY)) || {}; }
    catch(e){ weeklyProgress = {}; }
    weeklyProgress[chapterId] = { completed: correctCount, correct: correctCount };
    localStorage.setItem(window.WEEKLY_PROGRESS_KEY, JSON.stringify(weeklyProgress));
  }
}

function importProgressPhrase(phrase){
  const decoded = decodeCodes(phrase, 1); // saute le mot-badge cosmétique
  if(!decoded) return null;
  const ids = Object.keys(CHAPTER_STATE_KEYS);
  const mismatch = decoded.header !== ids.length % 256;
  let applied = 0;
  ids.forEach((id, i) => {
    const code = decoded.codes[i] ?? 0; // position au-delà de la phrase (tronquée) = niveau 0
    applyChapterLevel(id, code);
    applied++;
  });
  // 9ᵉ code = préférences (voir exportProgressPhrase) ; absent sur une
  // phrase exportée avant ce changement, ignoré silencieusement alors.
  const prefsCode = decoded.codes[ids.length];
  if(prefsCode !== undefined) applyPrefsNibble(prefsCode);
  return { applied, mismatch };
}
window.importProgressPhrase = importProgressPhrase;
