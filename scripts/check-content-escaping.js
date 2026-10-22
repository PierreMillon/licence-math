#!/usr/bin/env node
/* ============================================================
   L1 MATHS — SYNTHÈSE — scripts/check-content-escaping.js
   Vérifie deux classes de bug trouvées le 22/10/2026 (signalées par
   Pierre, captures à l'appui — formules affichées en texte brut
   LaTeX au lieu d'être rendues) :

   1. `<`/`>` littéraux (comparaisons mathématiques, ex. "a<b") dans
      le texte d'un exercice/section cassent le parseur HTML avant
      même que KaTeX ne voie la formule — un `<` suivi d'une lettre
      est pris pour le début d'une balise, ce qui peut avaler tout le
      texte jusqu'au prochain `>` (y compris un `<br>` ou une balise
      `<span>` plus loin), rendant silencieusement illisible tout un
      bloc de texte. Convention : toujours écrire `&lt;`/`&gt;` (ou,
      en dernier recours dans une formule, `\lt`/`\gt`) plutôt qu'un
      `<`/`>` brut — jamais de cas par cas, cette vérification
      s'applique à TOUT exercice de TOUT chapitre, actif ou non.
   2. KaTeX (katex.min.css/js + auto-render.min.js) doit être chargé
      sur CHAQUE page de fiche qui contient au moins une formule
      \(...\)/\[...\] — pas seulement les chapitres "à forte teneur
      en maths". Trouvé sur python.html/java.html : ces deux pages
      n'avaient jamais chargé KaTeX (chapitres historiquement sans
      aucune formule), ce qui est resté invisible jusqu'à l'ajout
      d'un premier renvoi `.cours-crosslink` avec une vraie formule
      dans PYTHON — restée en texte brut, silencieusement, le temps
      que Pierre tombe dessus.

   Lancé manuellement (ou à ajouter au même réflexe que
   check-versions.sh avant un ship) : `node scripts/check-content-escaping.js`
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const FICHES_DIR = path.join(ROOT, 'fiches');

const JS_FILES = fs.readdirSync(FICHES_DIR)
  .filter(f => f.endsWith('.js') && f !== 'fiche-engine.js');

// Tags HTML réellement utilisés dans le contenu des fiches (voir
// fiche-engine.js pour le moteur, qui en a d'autres mais jamais dans
// les CHAÎNES de contenu elles-mêmes).
const TAG_RE = /<\/?(?:br|span(?:\s+[^<>]*)?|code|a(?:\s+[^<>]*)?)\s*\/?>/g;

let fail = false;

// ---------- Check 1 : <'/'> bruts non échappés ----------
for (const jsFile of JS_FILES) {
  const full = path.join(FICHES_DIR, jsFile);
  const src = fs.readFileSync(full, 'utf8');
  const startIdx = src.indexOf('const EXERCISES');
  if (startIdx === -1) continue;
  const body = src.slice(startIdx).replace(TAG_RE, '');
  const lt = (body.match(/</g) || []).length;
  const gt = (body.match(/>/g) || []).length;
  if (lt > 0 || gt > 0) {
    fail = true;
    console.error(`::error file=fiches/${jsFile}::${lt + gt} caractère(s) '<'/'>' brut(s) trouvé(s) hors balise connue — remplacer par &lt;/&gt; (voir scripts/check-content-escaping.js)`);
  }
}

// ---------- Check 2 : KaTeX chargé si la fiche contient une formule ----------
for (const jsFile of JS_FILES) {
  const chapterId = jsFile.replace('.js', '');
  const htmlFile = path.join(FICHES_DIR, chapterId + '.html');
  if (!fs.existsSync(htmlFile)) continue;
  const jsSrc = fs.readFileSync(path.join(FICHES_DIR, jsFile), 'utf8');
  const hasMath = /\\\(|\\\[/.test(jsSrc);
  if (!hasMath) continue;
  const htmlSrc = fs.readFileSync(htmlFile, 'utf8');
  const hasKatex = /katex\.min\.(css|js)/.test(htmlSrc);
  if (!hasKatex) {
    fail = true;
    console.error(`::error file=fiches/${chapterId}.html::contient des formules (\\\\( / \\\\[ dans fiches/${jsFile}) mais ne charge pas KaTeX`);
  }
}

if (fail) {
  console.error('\nDes problèmes de rendu ont été trouvés — voir ci-dessus.');
  process.exit(1);
}
console.log('OK — aucun <, > brut hors balise connue, KaTeX chargé partout où nécessaire.');
