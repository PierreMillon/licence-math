/* ============================================================
   L1 MATHS — SYNTHÈSE — music.js
   Musique de fond adaptative (8-bit héroïque), désactivée par défaut
   (réglage RÉGLAGES -> MUSIQUE DE FOND). Une fois activée : une
   basse joue en boucle dès la première interaction, puis 3 couches
   d'instruments s'ajoutent progressivement — mélodie, harmonie,
   percussion — jamais au milieu d'une mesure, toujours pile au début
   de la suivante (horloge Web Audio, pas un setTimeout approximatif).

   Deux façons de débloquer une couche, on prend le plus haut des
   deux (un visiteur qui avance sur le combat hebdo OU qui enchaîne
   les bonnes réponses profite de la musique plus riche) :
   - % du combat hebdo (25/50/75%) — mécanique déjà connue du site
   - série de bonnes réponses d'affilée dans la session en cours
     (remise à zéro à la première erreur, jamais sauvegardée — un
     nouvel onglet repart de zéro, comme les bruitages existants)

   Limite assumée : site multi-pages statique, pas une SPA — la
   musique s'arrête à chaque changement de page et repart de la
   couche courante (recalculée) sur la page suivante, comme n'importe
   quel son de ce site (aucun son ne survit à une navigation).
   Chargé après menu.js (getAudioCtx/playTone) et weekly.js
   (weeklyTotals), sur les 14 pages du site (19/08/2026 : ajouté aux 4
   pages qui ne l'avaient pas encore — changelog/mistakes/notation/
   progression — demande explicite, "si activée doit jouer partout,
   spécialement dans les réglages" : on ne pouvait pas vérifier que le
   réglage marchait sans quitter la page où on venait de l'activer).
   ============================================================ */

const MUSIC_BPM = 132;
const MUSIC_BEAT_DUR = 60 / MUSIC_BPM;
const MUSIC_BAR_DUR = 4 * MUSIC_BEAT_DUR;
const MUSIC_MAX_LEVEL = 3;
const MUSIC_STREAK_PER_LEVEL = 5; // 5 bonnes réponses d'affilée = +1 niveau

const MUSIC_NOTES = {
  C3: 130.81, E3: 164.81, G3: 196.00,
  C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00, A4: 440.00,
  C5: 523.25, E5: 659.25, G5: 783.99,
};

/* Une couche = un motif rejoué à l'identique à chaque mesure.
   beat : position dans la mesure (0 à 4, les fractions sont permises
   pour les notes entre deux temps). Couche 0 (basse) toujours active
   dès que la musique est activée ; couches 1-3 débloquées par niveau. */
const MUSIC_LAYERS = [
  [ // 0 — basse
    { beat: 0, freq: MUSIC_NOTES.C3, dur: 0.3, shape: 'square', vol: 0.12 },
    { beat: 2, freq: MUSIC_NOTES.G3, dur: 0.3, shape: 'square', vol: 0.12 },
  ],
  [ // 1 — mélodie (niveau >= 1)
    { beat: 0, freq: MUSIC_NOTES.C4, dur: 0.35, shape: 'triangle', vol: 0.09 },
    { beat: 1, freq: MUSIC_NOTES.E4, dur: 0.35, shape: 'triangle', vol: 0.09 },
    { beat: 2, freq: MUSIC_NOTES.G4, dur: 0.35, shape: 'triangle', vol: 0.09 },
    { beat: 3, freq: MUSIC_NOTES.E4, dur: 0.35, shape: 'triangle', vol: 0.09 },
  ],
  [ // 2 — harmonie (niveau >= 2)
    { beat: 0.5, freq: MUSIC_NOTES.E4, dur: 0.2, shape: 'sine', vol: 0.06 },
    { beat: 1.5, freq: MUSIC_NOTES.G4, dur: 0.2, shape: 'sine', vol: 0.06 },
    { beat: 2.5, freq: MUSIC_NOTES.C5, dur: 0.2, shape: 'sine', vol: 0.06 },
    { beat: 3.5, freq: MUSIC_NOTES.G4, dur: 0.2, shape: 'sine', vol: 0.06 },
  ],
  [ // 3 — percussion (niveau >= 3)
    { beat: 0, freq: 90, dur: 0.12, shape: 'square', vol: 0.14 },
    { beat: 1, freq: 1200, dur: 0.04, shape: 'square', vol: 0.05 },
    { beat: 2, freq: 90, dur: 0.12, shape: 'square', vol: 0.12 },
    { beat: 3, freq: 1200, dur: 0.04, shape: 'square', vol: 0.05 },
  ],
];

function musicEnabled(){
  return window.getNotationPreference && window.getNotationPreference('music', 'off') === 'on';
}

/* ---------- niveau via le combat hebdo (0-100% -> 0-3) ---------- */
function musicWeeklyLevel(){
  if(typeof weeklyTotals !== 'function') return 0;
  const { total, correct } = weeklyTotals();
  if(total <= 0) return 0;
  const pct = (correct / total) * 100;
  if(pct >= 75) return 3;
  if(pct >= 50) return 2;
  if(pct >= 25) return 1;
  return 0;
}

/* ---------- niveau via la série de bonnes réponses (session en cours) ---------- */
const MUSIC_STREAK_KEY = 'l1maths_music_streak';

function getMusicStreak(){
  return Number(sessionStorage.getItem(MUSIC_STREAK_KEY)) || 0;
}

function musicStreakLevel(){
  return Math.min(MUSIC_MAX_LEVEL, Math.floor(getMusicStreak() / MUSIC_STREAK_PER_LEVEL));
}

/* Appelé depuis fiche-engine.js (applyFeedback) et revision.js
   (applyRevisionAnswer) à chaque réponse, que la musique soit activée
   ou non (coût négligeable, évite d'avoir à vérifier musicEnabled()
   à chaque site d'appel). */
function notifyMusicAnswer(isCorrect){
  const streak = isCorrect ? getMusicStreak() + 1 : 0;
  sessionStorage.setItem(MUSIC_STREAK_KEY, String(streak));
}
window.notifyMusicAnswer = notifyMusicAnswer;

function musicCurrentLevel(){
  return Math.max(musicWeeklyLevel(), musicStreakLevel());
}

/* ---------- ordonnanceur (horloge Web Audio, pas de setTimeout approximatif) ---------- */
let musicNextBarTime = null;
let musicSchedulerTimer = null;
const MUSIC_LOOKAHEAD_MS = 100; // vérifie un peu avant chaque mesure, jamais après

function scheduleMusicBar(){
  const ctx = getAudioCtx();
  if(musicNextBarTime === null) musicNextBarTime = ctx.currentTime + 0.05;

  // ne programme la mesure suivante que si son début est proche
  // (fenêtre de lookahead) : évite d'accumuler des mesures en avance
  // si l'onglet reste inactif un moment, et reste précis à l'échantillon
  // près puisque les notes sont programmées via ctx.currentTime, pas
  // via le délai (approximatif) du setTimeout qui déclenche cet appel.
  while(musicNextBarTime < ctx.currentTime + MUSIC_LOOKAHEAD_MS / 1000){
    const level = musicCurrentLevel();
    const barStart = musicNextBarTime;
    for(let i = 0; i <= level; i++){
      MUSIC_LAYERS[i].forEach(note => {
        const startTime = barStart + note.beat * MUSIC_BEAT_DUR;
        playTone(ctx, note.freq, startTime, note.dur, { vol: note.vol, shape: note.shape, attack: 0.005, release: note.dur * 0.4 });
      });
    }
    musicNextBarTime += MUSIC_BAR_DUR;
  }
}

function startMusic(){
  if(musicSchedulerTimer) return; // déjà démarrée
  musicNextBarTime = null;
  scheduleMusicBar();
  musicSchedulerTimer = setInterval(scheduleMusicBar, MUSIC_LOOKAHEAD_MS / 2);
}

function stopMusic(){
  if(musicSchedulerTimer){
    clearInterval(musicSchedulerTimer);
    musicSchedulerTimer = null;
  }
  musicNextBarTime = null;
}

/* Web Audio n'autorise la lecture qu'après un vrai geste utilisateur
   (politique de tous les navigateurs) : on démarre au premier clic/
   toucher de la page plutôt qu'au chargement, comme le reste des
   bruitages du site (getAudioCtx() résume déjà le contexte suspendu
   à la demande, voir menu.js). */
function initMusic(){
  if(!musicEnabled()) return;
  const start = () => {
    startMusic();
    document.removeEventListener('click', start);
    document.removeEventListener('touchstart', start);
  };
  document.addEventListener('click', start);
  document.addEventListener('touchstart', start);
}

document.addEventListener('DOMContentLoaded', initMusic);
