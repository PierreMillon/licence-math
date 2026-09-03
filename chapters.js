/* ============================================================
   L1 MATHS — SYNTHÈSE — chapters.js
   Source UNIQUE de la liste des chapitres. Avant ce fichier (jusqu'à
   la v143), la même information existait en TROIS exemplaires à
   resynchroniser à la main : `CHAPTERS` (app.js, grille d'accueil),
   `MENU_CHAPTERS` (menu.js, tiroir + nav précédent/suivant) et
   `CHAPTER_TOTALS` (weekly.js, calcul du % hebdomadaire) — risque de
   les laisser diverger. Chargé en TOUT PREMIER, avant même le CSS,
   sur les 14 pages du site.

   `active` (19/08/2026, demande explicite) : Pierre redouble sa L1 et
   veut débloquer les chapitres un par un au fil de l'année, dans
   l'ordre où les profs les donnent réellement, plutôt que tout avoir
   d'un coup. `active:false` = chapitre invisible PARTOUT (grille de
   l'accueil, tiroir de menu, navigation précédent/suivant en bas de
   fiche, total compté dans la barre hebdomadaire/combat) ET sa fiche
   bloquée en accès direct par URL (garde ci-dessous) — Pierre a été
   explicite : "vraiment invisible, peu importe qu'on ait le lien ou
   pas". Rien n'est jamais supprimé : la progression déjà faite sur un
   chapitre reste intacte en localStorage et réapparaît telle quelle
   dès que `active` repasse à true — aucune autre donnée à toucher.

   Pour débloquer un chapitre : juste passer son `active` à true ici,
   rien d'autre à changer nulle part (c'est tout l'intérêt d'avoir une
   seule liste). */
const CHAPTERS = [
  { id: 'logique',      name: 'LOGIQUE',       file: 'logique.html',      total: 34, active: false },
  { id: 'calculus',     name: 'CALCULUS',      file: 'calculus.html',     total: 27, active: false },
  { id: 'algebre',      name: 'ALGÈBRE',       file: 'algebre.html',      total: 12, active: false },
  { id: 'analyse',      name: 'ANALYSE',       file: 'analyse.html',      total: 21, active: false },
  { id: 'probabilites', name: 'PROBABILITÉS',  file: 'probabilites.html', total: 23, active: false },
  { id: 'statistiques', name: 'STATISTIQUES',  file: 'statistiques.html', total: 17, active: false },
  { id: 'java',         name: 'JAVA',          file: 'java.html',         total: 52, active: false },
  { id: 'python',       name: 'PYTHON',        file: 'python.html',       total: 43, active: true },
];

/* Garde d'accès direct : si la page courante est la fiche d'un
   chapitre inactif (visite par lien direct, favori, historique...),
   redirige immédiatement vers l'accueil — avant que quoi que ce soit
   ait pu s'afficher, puisque ce fichier est chargé en premier dans
   <head>, avant le CSS et tout le reste du contenu de la page. Ne
   fait rien sur les pages qui ne sont pas une fiche de chapitre
   (accueil, menu, progression...) : currentFile ne correspond alors
   à aucune entrée de CHAPTERS. */
(function guardInactiveChapter(){
  const currentFile = window.location.pathname.split('/').pop();
  const chapter = CHAPTERS.find(c => c.file === currentFile);
  if(chapter && !chapter.active){
    window.location.replace('../index.html');
  }
})();
