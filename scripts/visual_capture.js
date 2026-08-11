#!/usr/bin/env node
/* ============================================================
   L1 MATHS — SYNTHÈSE — scripts/visual_capture.js
   Capture une image de référence de la scène de combat (page
   d'accueil), pour la comparaison de non-régression visuelle (voir
   visual_regression.sh). Sert deux modes :
     node visual_capture.js baseline   → écrit scripts/visual-baselines/
     node visual_capture.js check      → écrit scripts/visual-check/
   Ajouté le 11/08/2026 suite à la bulle de l'oiseau qui a chevauché
   le décor du dessus sans qu'un test automatique ne le détecte (les
   tests existants, full_regression2.js, ne vérifient que l'absence
   d'erreurs JS, jamais l'apparence). Capture volontairement la scène
   à un jour de la semaine FIXE (lundi, via un Date figé) pour que la
   référence ne bouge pas d'elle-même selon le jour réel — sinon
   chaque jour donnerait un "faux positif" de différence.
   ============================================================ */
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const mode = process.argv[2];
if(mode !== 'baseline' && mode !== 'check'){
  console.error('Usage: node visual_capture.js <baseline|check>');
  process.exit(1);
}
const outDir = path.join(__dirname, mode === 'baseline' ? 'visual-baselines' : 'visual-check');
fs.mkdirSync(outDir, { recursive: true });

let chromium;
try{
  ({ chromium } = require('/opt/node22/lib/node_modules/playwright'));
}catch(e){
  ({ chromium } = require('playwright'));
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 2 });
  // Date figée (lundi, palier "dragon endormi") pour une référence stable.
  await page.addInitScript((iso) => {
    const RealDate = Date;
    class FixedDate extends RealDate {
      constructor(...args){ if(args.length === 0) super(iso); else super(...args); }
      static now(){ return new RealDate(iso).getTime(); }
    }
    window.Date = FixedDate;
  }, '2026-08-10T12:00:00');
  await page.goto('file://' + path.join(ROOT, 'index.html'), { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  const scene = await page.$('#battleScene');
  await scene.screenshot({ path: path.join(outDir, 'battle-scene.png') });
  await browser.close();
  console.log(`Capture écrite dans ${outDir}/battle-scene.png`);
})();
