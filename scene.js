/* ============================================================
   L1 MATHS — SYNTHÈSE — scene.js
   Habillage de la scène de combat de la page d'accueil :
   - le chevalier (personnage complet, en couleur) posé dans la
     zone chevalier, à côté du système de pièces d'équipement
     existant (inchangé) ;
   - le dragon de la semaine (voir renderWeekDragon), qui sort de la
     grotte et s'en approche un palier par jour, du lundi au samedi —
     refonte du 11/08/2026, voir CLAUDE.md ;
   - un petit monstre qui traverse le bas de l'écran après 3
     minutes sans la moindre activité (souris, clavier, tactile,
     scroll), avec un bruitage synthétisé. Se réarme à chaque
     traversée pour recommencer après une nouvelle pause de 3 min.
   Chargé uniquement sur la page d'accueil, après creature-svgs.js
   et menu.js (pour les fonctions audio partagées).
   ============================================================ */

/* ---------- chevalier (personnage complet) ---------- */
function renderKnightGirl(){
  const el = document.getElementById('knightGirl');
  if(!el || typeof KNIGHT_GIRL_SVG === 'undefined') return;
  el.innerHTML = KNIGHT_GIRL_SVG;
}

/* ---------- lune, dans le ciel au-dessus du château ---------- */
/* Deux disques identiques superposés (voir applyMoonPhase plus bas et
   le commentaire CSS .scene-moon) : .moon-disc (blanc, fixe) et
   .moon-occluder (couleur du fond, glisse par-dessus). */
function renderSceneMoon(){
  const el = document.getElementById('sceneMoon');
  if(!el || typeof MOON_SVG === 'undefined') return;
  el.innerHTML = `<div class="moon-disc">${MOON_SVG}</div><div class="moon-occluder">${MOON_SVG}</div>`;
  applyMoonPhase(el);
}

/* Position (top) de la lune calée sur celle du château, MESURÉE
   plutôt que codée en dur deux fois (11/08/2026, voir CLAUDE.md —
   "point 5" de la discussion sur la fragilité des positions
   absolues) : avant, le top du château et celui de la lune étaient
   deux nombres indépendants dans le CSS, qui auraient pu dériver l'un
   sans l'autre. La vraie cause du "hors champ" trouvée entre-temps :
   .scene-plan2 débordait horizontalement sous ~312px de large (voir
   sa règle, corrigée) — right:0 reste donc la bonne position
   horizontale pour la lune, inchangée, seul le top est recalculé ici.
   Alignée pile sur le haut du château (11/08/2026, demande explicite
   — était 80px au-dessus). */
function alignSceneMoon(){
  const moon = document.getElementById('sceneMoon');
  const castle = document.getElementById('sceneCastle');
  const battleScene = document.getElementById('battleScene');
  if(!moon || !castle || !battleScene) return;
  const castleRect = castle.getBoundingClientRect();
  const sceneRect = battleScene.getBoundingClientRect();
  if(castleRect.height === 0 || sceneRect.height === 0) return; // pas encore rendu
  const castleTopInScene = castleRect.top - sceneRect.top;
  moon.style.top = Math.max(0, castleTopInScene) + 'px';
}

/* Phase réelle de la lune, calculée localement (aucune API/réseau —
   cohérent avec le reste du site, ex. transfert de progression par
   phrase). Approximation classique (précision ~1 jour) : fraction de
   cycle lunaire écoulée depuis une nouvelle lune de référence connue,
   puis fraction éclairée déduite par la formule standard
   (1-cos(2π·phase))/2 (0 à la nouvelle lune, 1 à la pleine lune).
   Représentée en couvrant la partie NON éclairée du dessin (clip-path,
   pas un nouveau dessin par phase) : un croissant qui grandit/
   rétrécit avec la vraie date du jour, jusqu'au disque plein complet
   à la pleine lune. Fonctionne sur tout le cycle depuis que MOON_SVG
   est un disque plein (redessiné le 10/08/2026 — un croissant fixe
   ne pouvait pas représenter une vraie pleine lune, seule la partie
   déjà visible du croissant restait affichée quel que soit le clip). */
function moonPhaseFraction(date){
  const LUNAR_CYCLE_S = 2551443; // 29,53059 jours
  const KNOWN_NEW_MOON_S = Date.UTC(1970, 0, 7, 20, 35, 0) / 1000;
  const elapsed = (date.getTime() / 1000) - KNOWN_NEW_MOON_S;
  return (((elapsed % LUNAR_CYCLE_S) + LUNAR_CYCLE_S) % LUNAR_CYCLE_S) / LUNAR_CYCLE_S;
}

/* Vraie cause du "la lune est invisible" enfin trouvée le 11/08/2026,
   après plusieurs correctifs qui n'y étaient pour rien (débordement
   de plan2, position recalée sur le château...) : ce n'était pas un
   bug. La vraie phase lunaire du moment était à ~96% cachée (quelques
   jours avant la nouvelle lune) — confirmé en forçant artificiellement
   le disque plein à l'écran, qui s'affiche parfaitement. Un disque de
   26px caché à 96% ne laisse qu'un filet de ~1px, invisible sur un
   téléphone. Exact scientifiquement, mais se lit comme "cassé" plutôt
   que "nouvelle lune" pour qui regarde sans le savoir — MOON_MIN_
   ILLUMINATED garde toujours une petite portion visible, même à la
   nouvelle lune exacte, pour ne plus jamais avoir l'air d'un bug. */
const MOON_MIN_ILLUMINATED = 0.18;

/* Rendu en "éclipse à deux cercles" (11/08/2026, demande explicite —
   voir le commentaire CSS .scene-moon) plutôt qu'un clip-path : un
   disque occulteur (.moon-occluder), couleur du fond, glisse par-
   dessus le disque plein (.moon-disc) — décalé de 100% de sa largeur
   (complètement à côté, aucun recouvrement) à illuminated=1 (pleine
   lune, disque blanc entièrement visible), et de 0% (parfaitement
   superposé, recouvrement total) à illuminated=0 (nouvelle lune).
   La zone visible restante entre les deux est un vrai croissant
   (intersection de deux cercles), pas un rectangle coupé au clip-path. */
function applyMoonPhase(el){
  const phase = moonPhaseFraction(new Date());
  const illuminated = Math.max(MOON_MIN_ILLUMINATED, (1 - Math.cos(2 * Math.PI * phase)) / 2); // 0..1
  const occluder = el.querySelector('.moon-occluder');
  if(!occluder) return;
  let offsetPct = Math.round(illuminated * 100);
  // Sécurité (héritée de l'ancienne version clip-path, gardée par
  // prudence) : une valeur invalide ou hors 0-100 dans translateX
  // pourrait faire disparaître ou déborder le disque selon le moteur.
  if(!Number.isFinite(offsetPct)) offsetPct = 0;
  offsetPct = Math.max(0, Math.min(100, offsetPct));
  occluder.style.transform = `translateX(${offsetPct}%)`;
}

/* ---------- château + grotte, en arrière-plan au-dessus des personnages ---------- */
/* Le chevalier descend du château pour affronter le dragon, qui vit
   dans la grotte juste sous ses fondations — métaphore assumée : on ne
   se bat pas contre quelqu'un d'autre, on va chercher en soi-même
   (sous ses propres fondations) quelque chose qu'il faut mériter. */
function renderSceneCastle(){
  const castleEl = document.getElementById('sceneCastle');
  if(castleEl && typeof CASTLE_SVG !== 'undefined') castleEl.innerHTML = CASTLE_SVG;

  const caveEl = document.getElementById('sceneCave');
  if(caveEl && typeof CAVE_SVG !== 'undefined') caveEl.innerHTML = CAVE_SVG;
}

/* ---------- plan 2 (bâtiments/campagne), entre le château et les personnages ---------- */
function renderScenePlan2(){
  const el = document.getElementById('scenePlan2');
  if(!el || typeof PLAN2_SVG === 'undefined') return;
  el.innerHTML = PLAN2_SVG;
}

/* Centre verticalement la bande plan2 dans l'espace entre le bas du
   château et le bas des pieds du chevalier (demande explicite du
   11/08/2026 — "pile poil" entre les deux), mesuré plutôt que codé en
   dur : voir alignSceneMoon() ci-dessous pour la même logique. Appelée
   après le rendu du château, du plan2 et du chevalier, car elle a
   besoin des trois pour mesurer. */
function alignScenePlan2(){
  const el = document.getElementById('scenePlan2');
  const castleEl = document.getElementById('sceneCastle');
  const knightGirl = document.getElementById('knightGirl');
  const battleScene = document.getElementById('battleScene');
  if(!el || !castleEl || !knightGirl || !battleScene) return;
  const knightSvg = knightGirl.querySelector('svg');
  if(!knightSvg) return;

  const castleRect = castleEl.getBoundingClientRect();
  const knightRect = knightSvg.getBoundingClientRect();
  const sceneRect = battleScene.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  if(castleRect.height === 0 || knightRect.height === 0 || elRect.height === 0) return; // pas encore rendu

  const castleBottom = castleRect.bottom - sceneRect.top;
  const knightBottom = knightRect.bottom - sceneRect.top;
  const gapMid = (castleBottom + knightBottom) / 2;
  // Le BAS de la bande (pas son centre) au milieu de l'écart château/
  // pieds (11/08/2026, demande explicite — précédemment centrée, ce
  // qui la faisait paraître trop basse) : toute la bande se retrouve
  // au-dessus du point milieu, sa base posée exactement dessus.
  el.style.top = Math.max(0, gapMid - elRect.height) + 'px';
}

/* ---------- dragon de la semaine : sort de la grotte et s'approche ---------- */
/* Refonte du 11/08/2026 (voir CLAUDE.md) : remplace l'ancien oiseau
   décoratif (qui n'apparaissait qu'une fois la mascotte d'absence
   transformée en dragon, jamais vu par un élève assidu — le défaut
   corrigé par cette refonte). Il s'approche d'un palier par jour, du
   lundi au samedi, jusqu'à arriver au premier plan juste avant le
   combat (déclenché à minuit, voir weekly.js/isWeeklyRestDay). Le
   dimanche affiche le résultat (victory.js) à la place de toute la
   scène, donc ce dragon n'est de toute façon plus visible ce jour-là
   — sauf si rien n'a été fait cette semaine, auquel cas il reste
   sagement à son palier d'arrivée faute de combat déclenché.
   Deux dessins différents, PAS un seul redimensionné du début à la
   fin (retour du 11/08/2026) : DRAGON_SVG (endormi, roulé en boule)
   UNIQUEMENT le lundi ; à partir de mardi il est réveillé et debout —
   silhouette dressée DRAGON_VICTORIOUS_SVG, déjà dessinée pour la
   scène de défaite (victory.js), réutilisée telle quelle ici. */
const WEEK_DRAGON_TIERS = [
  // top/left/width en px (repère de .battle-scene), + quel dessin.
  // Réglés à l'œil par capture d'écran, pas par calcul de densité pur
  // — un dragon qui s'approche est une pose artistique. Palier 0 calé
  // sur le centre réel de la porte noire de la grotte (CAVE_SVG :
  // ouverture x24-40/y12-28 sur son viewBox 64×28, donc x15-25/
  // y224,5-234,5 une fois la grotte affichée à top:217/width:40) ;
  // paliers 1-5 en DRAGON_VICTORIOUS_SVG (aspect ~1:1, bien plus haut
  // que large que le dessin endormi 60×39) donc tailles/hauteurs
  // recalées en conséquence, pieds posés progressivement plus bas (du
  // niveau de la grotte vers celui des pieds du chevalier).
  //
  // Largeurs des paliers 0-2 relevées le 11/08/2026 (demande explicite
  // : densité de pixels adaptée à chaque plan, comme le reste du décor
  // — château/grotte ~1,52 (plan 3), lune 2,0 (plan 4), chevalier/
  // oiseau 0,5 (plan 1), voir système de profondeur du 10/08/2026).
  // Densité = largeur-source-viewBox / largeur-affichée : les tailles
  // d'origine (10/22/45px, avec des grilles source 60 et 100) donnaient
  // des densités de 6,0/4,55/2,22 — bien plus grossier que 2,0, la
  // référence la plus grossière du site (la lune, plan 4). Résultat :
  // le dragon lointain (lundi-mercredi) apparaissait flou/écrasé au
  // lieu d'un petit dessin net. Largeurs relevées pour rester dans
  // l'intervalle 0,5-2,0 (jamais plus grossier que la lune) ; paliers
  // 3-5 déjà dans cet intervalle, INCHANGÉS (déjà réglés à l'œil).
  { svg: 'sleeping',   top: 226, left: 15,  width: 30 },  // lundi    : endormi, dans le noir de la porte — densité 2,0 (plan 4)
  { svg: 'victorious', top: 170, left: 10,  width: 69 },  // mardi    : réveillé, sort au seuil — densité 2,0 (plan 4)
  { svg: 'victorious', top: 152, left: 25,  width: 90 },  // mercredi — densité 1,52 (plan 3)
  { svg: 'victorious', top: 146, left: 55,  width: 110 }, // jeudi
  { svg: 'victorious', top: 117, left: 90,  width: 171 }, // vendredi
  { svg: 'victorious', top: 0,   left: 85,  width: 240 }, // samedi   : arrivé, dressé derrière les personnages
];
/* Paliers mardi-samedi redimensionnés le 11/08/2026 (demande explicite :
   "trop petit", le dragon du samedi doit avoir sa poitrine à la hauteur
   de la tête du chevalier). Mesuré à l'écran plutôt qu'à l'œil : sur
   DRAGON_VICTORIOUS_SVG (viewBox 100×95), le bas du cou / haut de la
   poitrine tombe vers y≈34 (~36% de la hauteur totale, repéré en
   affichant le SVG seul avec une grille de repère). Palier samedi
   calé pour que ce point tombe exactement sur le haut de tête mesuré
   du chevalier (#knightGirl svg, getBoundingClientRect) — vérifié par
   capture d'écran (largeur 390px), pas de recouvrement horizontal
   (dragon large de 240px dans une scène de 358px de large). Paliers
   mardi-vendredi remis à l'échelle par le même facteur (240/175 ≈
   1,37) que l'ancien palier samedi, pieds (bas de l'élément) gardés au
   même niveau qu'avant pour ne pas casser la trajectoire d'approche —
   SAUF le palier samedi, où grandir "pieds fixes" aurait fait dépasser
   le dragon largement au-dessus de la scène (donc recouvert la grille
   de chapitres) : son bas remonte un peu par rapport à vendredi
   (228px contre 280px), lecture assumée comme le dragon qui se dresse
   de toute sa hauteur plutôt qu'un recul. */

/* Lundi=palier 0 ... samedi=palier 5 ; dimanche (combat déjà joué)
   reste sur le palier d'arrivée. */
function weekDragonTier(date){
  const day = date.getDay(); // 0=dimanche .. 6=samedi
  if(day === 0) return 5;
  return day - 1;
}

/* Aspect largeur:hauteur du dragon endormi (DRAGON_SVG, viewBox
   60×39) — sert à convertir une largeur en hauteur pour caler son bas
   (voir renderWeekDragon, palier "lundi"). */
const DRAGON_SLEEPING_ASPECT = 39 / 60;

/* Épaisseur cible du contour blanc du dragon, en unités de sa propre
   grille source (pas en px écran) — voir renderWeekDragon, calcul de
   --dragon-outline. */
const DRAGON_OUTLINE_UNIT_THICKNESS = 1;

function renderWeekDragon(){
  const el = document.getElementById('sceneDragon');
  const castleEl = document.getElementById('sceneCastle');
  const battleScene = document.getElementById('battleScene');
  if(!el || typeof DRAGON_SVG === 'undefined' || typeof DRAGON_VICTORIOUS_SVG === 'undefined') return;
  const tier = WEEK_DRAGON_TIERS[weekDragonTier(new Date())];
  el.innerHTML = tier.svg === 'sleeping' ? DRAGON_SVG : DRAGON_VICTORIOUS_SVG;
  el.style.left = tier.left + 'px';
  el.style.width = tier.width + 'px';
  /* Opacité réduite UNIQUEMENT pour le palier endormi (11/08/2026,
     demande explicite après capture) : la pose roulée en boule
     (DRAGON_SVG) est trop pleine (peu de trous internes) pour que la
     technique du contour (8 drop-shadow, voir style.css) trace un
     vrai contour creux comme sur DRAGON_VICTORIOUS_SVG — à cette
     échelle (~30px), les 8 copies décalées se recouvrent et
     remplissent presque toute la silhouette, donnant un gros blob
     blanc plein plutôt qu'un contour. Plutôt que de reconstruire un
     système de contour différent pour ce seul palier, on assume le
     blob et on l'assourdit : cohérent avec l'intention d'origine
     ("à peine visible dans le noir de la porte de la grotte"), qui
     s'est perdue en passant du remplissage blanc plein d'avant à
     l'inversion noir+contour. Les autres paliers (dragon éveillé,
     dessin détaillé) restent à pleine opacité, le contour y trace
     correctement le détail. */
  el.style.opacity = tier.svg === 'sleeping' ? '0.4' : '1';
  /* Palier "lundi" (endormi) : le bas du dragon calé sur le bas réel
     de la falaise du château, mesuré plutôt que codé en dur (11/08/2026,
     demande explicite — la grotte devenue invisible, ci-dessus, ne sert
     plus de repère). Les autres paliers gardent leur top réglé à l'œil,
     inchangé. */
  if(tier.svg === 'sleeping' && castleEl && battleScene){
    const castleRect = castleEl.getBoundingClientRect();
    const sceneRect = battleScene.getBoundingClientRect();
    if(castleRect.height > 0 && sceneRect.height > 0){
      const castleBottomInScene = castleRect.bottom - sceneRect.top;
      const dragonHeight = tier.width * DRAGON_SLEEPING_ASPECT;
      el.style.top = Math.max(0, castleBottomInScene - dragonHeight) + 'px';
    }else{
      el.style.top = tier.top + 'px'; // pas encore mis en page, valeur de secours
    }
  }else{
    el.style.top = tier.top + 'px';
  }
  /* DRAGON_VICTORIOUS_SVG regarde vers la gauche par défaut (dessiné
     pour la scène de défaite, où le sens n'a pas d'importance) — miroir
     horizontal pour qu'il regarde vers la droite, donc vers le
     chevalier qu'il approche (retour du 11/08/2026). */
  el.style.transform = tier.svg === 'sleeping' ? '' : 'scaleX(-1)';
  /* Largeurs des paliers 1-5 calibrées à l'œil sur un écran de 390px
     (11/08/2026, resize pour la poitrine du dragon du samedi) —
     jamais revérifiées sous ~340px de large. Sans ce filet, le palier
     samedi (left:85 + width:240 = 325px) déborde dès que la scène
     mesure moins de ~330px (trouvé par test automatisé à 310/320px,
     débordement horizontal réel, pas juste théorique — voir CLAUDE.md,
     leçon "toujours tester sous 320px"). Rétrécit SEULEMENT si
     nécessaire, ne touche jamais `left` : plus simple, et cohérent
     avec le correctif déjà appliqué à .scene-plan2/.scene-castle. */
  if(battleScene){
    const sceneRect = battleScene.getBoundingClientRect();
    if(sceneRect.width > 0){
      const maxRight = sceneRect.width - 4;
      const currentLeft = parseFloat(el.style.left);
      const currentWidth = parseFloat(el.style.width);
      if(currentLeft + currentWidth > maxRight){
        el.style.width = Math.max(20, maxRight - currentLeft) + 'px';
      }
    }
  }
  /* Épaisseur du contour blanc (voir .scene-dragon svg, style.css) —
     posée ici plutôt qu'en CSS fixe pour rester proportionnelle à la
     taille RÉELLEMENT affichée (après clamp anti-débordement
     ci-dessus). Cible ~1 unité de la grille source du dragon (mesuré
     après mise à l'échelle), pour donner un contour de la même
     épaisseur "en unités de dessin" que le halo blanc de l'oiseau
     (BIRD_SVG, dessiné en dur dans sa propre grille) — demande
     explicite de Pierre ("aussi fin... proportionnellement"). */
  const dragonViewBoxWidth = tier.svg === 'sleeping' ? 60 : 100;
  const finalWidth = parseFloat(el.style.width);
  const outlinePx = (finalWidth / dragonViewBoxWidth) * DRAGON_OUTLINE_UNIT_THICKNESS;
  el.style.setProperty('--dragon-outline', outlinePx.toFixed(2) + 'px');
  updateBirdHiding(weekDragonTier(new Date()));
}

/* Palier à partir duquel le dragon est considéré comme ayant "passé la
   barrière" (11/08/2026, demande explicite) : vendredi et samedi (index
   4 et 5) — les deux paliers où sa largeur fait un vrai bond (110→171→
   240px) et où il domine visuellement la scène, plutôt qu'un seuil basé
   sur sa position par rapport à #scenePlan2 (déjà dépassée dès mardi en
   pixels, ça ne collait pas à "quand il approche vraiment"). À partir de
   ce palier, l'oiseau (#creatureFigure, sa place habituelle à gauche)
   s'efface et une version réduite (#birdPeek, dans #knightZone, z-index
   négatif donc dessinée derrière le chevalier) apparaît sur son flanc
   gauche — elle regarde donc vers le dragon sans miroir nécessaire :
   BIRD_SVG regarde déjà vers la gauche par défaut. */
const BIRD_HIDE_FROM_TIER = 4;

function updateBirdHiding(tierIndex){
  const battleZone = document.getElementById('battleZone');
  const birdPeek = document.getElementById('birdPeek');
  if(!battleZone || !birdPeek) return;
  const hiding = tierIndex >= BIRD_HIDE_FROM_TIER;
  battleZone.classList.toggle('bird-hiding', hiding);
  if(hiding && !birdPeek.innerHTML && typeof BIRD_SVG !== 'undefined'){
    birdPeek.innerHTML = BIRD_SVG;
  }
}

/* ---------- aligne le bas de la mascotte (oiseau/dragon) sur le bas du
   chevalier, crânes rejetés sous la ligne commune ---------- */
/* Même problème que pour l'oiseau décoratif, mais pour la mascotte de
   progression (#creatureFigure) : sa colonne (#creatureZone) contient
   aussi la pile de crânes et les défaites de la semaine SOUS elle, donc
   son bord bas (utilisé par align-items:flex-end) n'est pas non plus au
   niveau des pieds de la mascotte. Contrairement à l'oiseau décoratif
   (un seul élément, on ajuste juste sa marge), ici on veut que les
   crânes restent sous la ligne commune une fois la mascotte réalignée :
   on déplace donc toute la colonne #creatureZone d'un bloc avec un
   translateY (pas de marge sur un enfant, qui grandirait la colonne et
   ferait bouger le chevalier via align-items:flex-end) — les crânes,
   déjà sous la mascotte dans le flux normal, suivent avec elle. */
function alignCreatureFoot(){
  const zone = document.getElementById('creatureZone');
  const figure = document.getElementById('creatureFigure');
  const knightGirl = document.getElementById('knightGirl');
  if(!zone || !figure || !knightGirl) return;
  const icon = figure.querySelector('.creature-icon');
  const knightSvg = knightGirl.querySelector('svg');
  if(!icon || !knightSvg) return;

  /* Repart toujours d'une mesure "naturelle" (sans l'ajustement précédent) :
     sinon un deuxième appel (au load, après un premier appel déjà
     correct au DOMContentLoaded) mesure une position DÉJÀ corrigée,
     retrouve un delta de 0, et écrase le transform correct par une
     chaîne vide au lieu de le laisser tel quel. */
  zone.style.transform = '';
  const iconRect = icon.getBoundingClientRect();
  const knightRect = knightSvg.getBoundingClientRect();
  if(iconRect.height === 0 || knightRect.height === 0) return; // pas encore rendu

  const delta = knightRect.bottom - iconRect.bottom;
  if(delta) zone.style.transform = `translateY(${delta}px)`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderKnightGirl();
  renderSceneMoon();
  renderSceneCastle();
  renderScenePlan2();
  renderWeekDragon();
  alignCreatureFoot();
  alignSceneMoon();
  alignScenePlan2();
  // Les polices/webfonts peuvent charger après coup et décaler la mise
  // en page : on réajuste une fois de plus au chargement complet.
  window.addEventListener('load', () => {
    alignCreatureFoot();
    alignSceneMoon();
    alignScenePlan2();
  });
  // Un pinch-zoom (activé exprès cette session, voir style.css
  // touch-action) peut désynchroniser viewport visuel et viewport de
  // mise en page sur certains navigateurs mobiles — réaligner au
  // redimensionnement (déclenché aussi par un changement de zoom sur
  // la plupart des moteurs) limite les dégâts si ça arrive.
  let sceneResizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(sceneResizeTimer);
    sceneResizeTimer = setTimeout(() => {
      alignSceneMoon();
      alignScenePlan2();
    }, 150);
  });
});
