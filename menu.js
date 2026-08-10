/* ============================================================
   L1 MATHS — SYNTHÈSE — menu.js
   Menu coulissant (chapitres) déclenché par le bouton cœur.
   Chargé sur toutes les pages (index + fiches).

   IMPORTANT : à chaque changement de style.css, menu.js, app.js
   ou d'un fichier JS de fiche, incrémenter SITE_VERSION ci-dessous
   ET le paramètre ?v=N sur tous les <link>/<script> locaux dans
   les fichiers HTML (sinon le navigateur sert une version en
   cache — voir bug du 2026-08-03).
   ============================================================ */

const SITE_VERSION = 98;

const SKULL_SVG = '<svg class="skull-icon" viewBox="0 0 23 30" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true"><rect x="8" y="0" width="1" height="1"/><rect x="9" y="0" width="1" height="1"/><rect x="10" y="0" width="1" height="1"/><rect x="11" y="0" width="1" height="1"/><rect x="12" y="0" width="1" height="1"/><rect x="13" y="0" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="7" y="1" width="1" height="1"/><rect x="14" y="1" width="1" height="1"/><rect x="15" y="1" width="1" height="1"/><rect x="16" y="1" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="17" y="2" width="1" height="1"/><rect x="18" y="2" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="19" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="20" y="4" width="1" height="1"/><rect x="1" y="5" width="1" height="1"/><rect x="2" y="5" width="1" height="1"/><rect x="20" y="5" width="1" height="1"/><rect x="21" y="5" width="1" height="1"/><rect x="1" y="6" width="1" height="1"/><rect x="21" y="6" width="1" height="1"/><rect x="0" y="7" width="1" height="1"/><rect x="1" y="7" width="1" height="1"/><rect x="21" y="7" width="1" height="1"/><rect x="22" y="7" width="1" height="1"/><rect x="0" y="8" width="1" height="1"/><rect x="2" y="8" width="1" height="1"/><rect x="20" y="8" width="1" height="1"/><rect x="22" y="8" width="1" height="1"/><rect x="0" y="9" width="1" height="1"/><rect x="2" y="9" width="1" height="1"/><rect x="20" y="9" width="1" height="1"/><rect x="22" y="9" width="1" height="1"/><rect x="0" y="10" width="1" height="1"/><rect x="2" y="10" width="1" height="1"/><rect x="20" y="10" width="1" height="1"/><rect x="22" y="10" width="1" height="1"/><rect x="0" y="11" width="1" height="1"/><rect x="1" y="11" width="1" height="1"/><rect x="5" y="11" width="1" height="1"/><rect x="6" y="11" width="1" height="1"/><rect x="7" y="11" width="1" height="1"/><rect x="8" y="11" width="1" height="1"/><rect x="14" y="11" width="1" height="1"/><rect x="15" y="11" width="1" height="1"/><rect x="16" y="11" width="1" height="1"/><rect x="17" y="11" width="1" height="1"/><rect x="21" y="11" width="1" height="1"/><rect x="22" y="11" width="1" height="1"/><rect x="0" y="12" width="1" height="1"/><rect x="1" y="12" width="1" height="1"/><rect x="4" y="12" width="1" height="1"/><rect x="5" y="12" width="1" height="1"/><rect x="6" y="12" width="1" height="1"/><rect x="7" y="12" width="1" height="1"/><rect x="8" y="12" width="1" height="1"/><rect x="9" y="12" width="1" height="1"/><rect x="13" y="12" width="1" height="1"/><rect x="14" y="12" width="1" height="1"/><rect x="15" y="12" width="1" height="1"/><rect x="16" y="12" width="1" height="1"/><rect x="17" y="12" width="1" height="1"/><rect x="18" y="12" width="1" height="1"/><rect x="21" y="12" width="1" height="1"/><rect x="22" y="12" width="1" height="1"/><rect x="0" y="13" width="1" height="1"/><rect x="1" y="13" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="4" y="13" width="1" height="1"/><rect x="5" y="13" width="1" height="1"/><rect x="6" y="13" width="1" height="1"/><rect x="7" y="13" width="1" height="1"/><rect x="8" y="13" width="1" height="1"/><rect x="9" y="13" width="1" height="1"/><rect x="13" y="13" width="1" height="1"/><rect x="14" y="13" width="1" height="1"/><rect x="15" y="13" width="1" height="1"/><rect x="16" y="13" width="1" height="1"/><rect x="17" y="13" width="1" height="1"/><rect x="18" y="13" width="1" height="1"/><rect x="19" y="13" width="1" height="1"/><rect x="21" y="13" width="1" height="1"/><rect x="22" y="13" width="1" height="1"/><rect x="1" y="14" width="1" height="1"/><rect x="3" y="14" width="1" height="1"/><rect x="4" y="14" width="1" height="1"/><rect x="5" y="14" width="1" height="1"/><rect x="6" y="14" width="1" height="1"/><rect x="7" y="14" width="1" height="1"/><rect x="8" y="14" width="1" height="1"/><rect x="9" y="14" width="1" height="1"/><rect x="13" y="14" width="1" height="1"/><rect x="14" y="14" width="1" height="1"/><rect x="15" y="14" width="1" height="1"/><rect x="16" y="14" width="1" height="1"/><rect x="17" y="14" width="1" height="1"/><rect x="18" y="14" width="1" height="1"/><rect x="19" y="14" width="1" height="1"/><rect x="21" y="14" width="1" height="1"/><rect x="1" y="15" width="1" height="1"/><rect x="3" y="15" width="1" height="1"/><rect x="4" y="15" width="1" height="1"/><rect x="5" y="15" width="1" height="1"/><rect x="6" y="15" width="1" height="1"/><rect x="7" y="15" width="1" height="1"/><rect x="8" y="15" width="1" height="1"/><rect x="10" y="15" width="1" height="1"/><rect x="11" y="15" width="1" height="1"/><rect x="12" y="15" width="1" height="1"/><rect x="14" y="15" width="1" height="1"/><rect x="15" y="15" width="1" height="1"/><rect x="16" y="15" width="1" height="1"/><rect x="17" y="15" width="1" height="1"/><rect x="18" y="15" width="1" height="1"/><rect x="19" y="15" width="1" height="1"/><rect x="21" y="15" width="1" height="1"/><rect x="0" y="16" width="1" height="1"/><rect x="4" y="16" width="1" height="1"/><rect x="5" y="16" width="1" height="1"/><rect x="6" y="16" width="1" height="1"/><rect x="7" y="16" width="1" height="1"/><rect x="10" y="16" width="1" height="1"/><rect x="11" y="16" width="1" height="1"/><rect x="12" y="16" width="1" height="1"/><rect x="15" y="16" width="1" height="1"/><rect x="16" y="16" width="1" height="1"/><rect x="17" y="16" width="1" height="1"/><rect x="18" y="16" width="1" height="1"/><rect x="22" y="16" width="1" height="1"/><rect x="0" y="17" width="1" height="1"/><rect x="9" y="17" width="1" height="1"/><rect x="10" y="17" width="1" height="1"/><rect x="11" y="17" width="1" height="1"/><rect x="12" y="17" width="1" height="1"/><rect x="13" y="17" width="1" height="1"/><rect x="22" y="17" width="1" height="1"/><rect x="0" y="18" width="1" height="1"/><rect x="1" y="18" width="1" height="1"/><rect x="9" y="18" width="1" height="1"/><rect x="10" y="18" width="1" height="1"/><rect x="11" y="18" width="1" height="1"/><rect x="12" y="18" width="1" height="1"/><rect x="13" y="18" width="1" height="1"/><rect x="21" y="18" width="1" height="1"/><rect x="22" y="18" width="1" height="1"/><rect x="1" y="19" width="1" height="1"/><rect x="2" y="19" width="1" height="1"/><rect x="3" y="19" width="1" height="1"/><rect x="4" y="19" width="1" height="1"/><rect x="9" y="19" width="1" height="1"/><rect x="10" y="19" width="1" height="1"/><rect x="11" y="19" width="1" height="1"/><rect x="12" y="19" width="1" height="1"/><rect x="13" y="19" width="1" height="1"/><rect x="18" y="19" width="1" height="1"/><rect x="19" y="19" width="1" height="1"/><rect x="20" y="19" width="1" height="1"/><rect x="21" y="19" width="1" height="1"/><rect x="2" y="20" width="1" height="1"/><rect x="3" y="20" width="1" height="1"/><rect x="5" y="20" width="1" height="1"/><rect x="17" y="20" width="1" height="1"/><rect x="19" y="20" width="1" height="1"/><rect x="20" y="20" width="1" height="1"/><rect x="2" y="21" width="1" height="1"/><rect x="5" y="21" width="1" height="1"/><rect x="17" y="21" width="1" height="1"/><rect x="20" y="21" width="1" height="1"/><rect x="2" y="22" width="1" height="1"/><rect x="5" y="22" width="1" height="1"/><rect x="7" y="22" width="1" height="1"/><rect x="9" y="22" width="1" height="1"/><rect x="11" y="22" width="1" height="1"/><rect x="13" y="22" width="1" height="1"/><rect x="15" y="22" width="1" height="1"/><rect x="17" y="22" width="1" height="1"/><rect x="20" y="22" width="1" height="1"/><rect x="3" y="23" width="1" height="1"/><rect x="5" y="23" width="1" height="1"/><rect x="6" y="23" width="1" height="1"/><rect x="7" y="23" width="1" height="1"/><rect x="8" y="23" width="1" height="1"/><rect x="9" y="23" width="1" height="1"/><rect x="10" y="23" width="1" height="1"/><rect x="11" y="23" width="1" height="1"/><rect x="12" y="23" width="1" height="1"/><rect x="13" y="23" width="1" height="1"/><rect x="14" y="23" width="1" height="1"/><rect x="15" y="23" width="1" height="1"/><rect x="16" y="23" width="1" height="1"/><rect x="17" y="23" width="1" height="1"/><rect x="19" y="23" width="1" height="1"/><rect x="3" y="24" width="1" height="1"/><rect x="6" y="24" width="1" height="1"/><rect x="7" y="24" width="1" height="1"/><rect x="9" y="24" width="1" height="1"/><rect x="11" y="24" width="1" height="1"/><rect x="13" y="24" width="1" height="1"/><rect x="15" y="24" width="1" height="1"/><rect x="16" y="24" width="1" height="1"/><rect x="19" y="24" width="1" height="1"/><rect x="3" y="25" width="1" height="1"/><rect x="7" y="25" width="1" height="1"/><rect x="9" y="25" width="1" height="1"/><rect x="11" y="25" width="1" height="1"/><rect x="13" y="25" width="1" height="1"/><rect x="15" y="25" width="1" height="1"/><rect x="19" y="25" width="1" height="1"/><rect x="4" y="26" width="1" height="1"/><rect x="18" y="26" width="1" height="1"/><rect x="5" y="27" width="1" height="1"/><rect x="17" y="27" width="1" height="1"/><rect x="6" y="28" width="1" height="1"/><rect x="16" y="28" width="1" height="1"/><rect x="7" y="29" width="1" height="1"/><rect x="8" y="29" width="1" height="1"/><rect x="9" y="29" width="1" height="1"/><rect x="10" y="29" width="1" height="1"/><rect x="11" y="29" width="1" height="1"/><rect x="12" y="29" width="1" height="1"/><rect x="13" y="29" width="1" height="1"/><rect x="14" y="29" width="1" height="1"/><rect x="15" y="29" width="1" height="1"/></svg>';

const SCROLL_TOP_SVG = '<svg class="scroll-top-icon" viewBox="0 0 20 44" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true"><rect x="9" y="43" width="1" height="1"/><rect x="10" y="43" width="1" height="1"/><rect x="8" y="42" width="1" height="1"/><rect x="9" y="42" width="1" height="1"/><rect x="10" y="42" width="1" height="1"/><rect x="11" y="42" width="1" height="1"/><rect x="9" y="41" width="1" height="1"/><rect x="10" y="41" width="1" height="1"/><rect x="9" y="40" width="1" height="1"/><rect x="10" y="40" width="1" height="1"/><rect x="9" y="39" width="1" height="1"/><rect x="10" y="39" width="1" height="1"/><rect x="9" y="38" width="1" height="1"/><rect x="10" y="38" width="1" height="1"/><rect x="9" y="37" width="1" height="1"/><rect x="10" y="37" width="1" height="1"/><rect x="9" y="36" width="1" height="1"/><rect x="10" y="36" width="1" height="1"/><rect x="9" y="35" width="1" height="1"/><rect x="10" y="35" width="1" height="1"/><rect x="9" y="34" width="1" height="1"/><rect x="10" y="34" width="1" height="1"/><rect x="3" y="33" width="1" height="1"/><rect x="4" y="33" width="1" height="1"/><rect x="5" y="33" width="1" height="1"/><rect x="6" y="33" width="1" height="1"/><rect x="7" y="33" width="1" height="1"/><rect x="8" y="33" width="1" height="1"/><rect x="9" y="33" width="1" height="1"/><rect x="10" y="33" width="1" height="1"/><rect x="11" y="33" width="1" height="1"/><rect x="12" y="33" width="1" height="1"/><rect x="13" y="33" width="1" height="1"/><rect x="14" y="33" width="1" height="1"/><rect x="15" y="33" width="1" height="1"/><rect x="16" y="33" width="1" height="1"/><rect x="3" y="32" width="1" height="1"/><rect x="4" y="32" width="1" height="1"/><rect x="5" y="32" width="1" height="1"/><rect x="6" y="32" width="1" height="1"/><rect x="7" y="32" width="1" height="1"/><rect x="8" y="32" width="1" height="1"/><rect x="9" y="32" width="1" height="1"/><rect x="10" y="32" width="1" height="1"/><rect x="11" y="32" width="1" height="1"/><rect x="12" y="32" width="1" height="1"/><rect x="13" y="32" width="1" height="1"/><rect x="14" y="32" width="1" height="1"/><rect x="15" y="32" width="1" height="1"/><rect x="16" y="32" width="1" height="1"/><rect x="5" y="31" width="1" height="1"/><rect x="6" y="31" width="1" height="1"/><rect x="7" y="31" width="1" height="1"/><rect x="8" y="31" width="1" height="1"/><rect x="9" y="31" width="1" height="1"/><rect x="10" y="31" width="1" height="1"/><rect x="11" y="31" width="1" height="1"/><rect x="12" y="31" width="1" height="1"/><rect x="13" y="31" width="1" height="1"/><rect x="14" y="31" width="1" height="1"/><rect x="9" y="30" width="1" height="1"/><rect x="10" y="30" width="1" height="1"/><rect x="9" y="29" width="1" height="1"/><rect x="10" y="29" width="1" height="1"/><rect x="9" y="28" width="1" height="1"/><rect x="10" y="28" width="1" height="1"/><rect x="9" y="27" width="1" height="1"/><rect x="10" y="27" width="1" height="1"/><rect x="9" y="26" width="1" height="1"/><rect x="10" y="26" width="1" height="1"/><rect x="9" y="25" width="1" height="1"/><rect x="10" y="25" width="1" height="1"/><rect x="9" y="24" width="1" height="1"/><rect x="10" y="24" width="1" height="1"/><rect x="9" y="23" width="1" height="1"/><rect x="10" y="23" width="1" height="1"/><rect x="9" y="22" width="1" height="1"/><rect x="10" y="22" width="1" height="1"/><rect x="9" y="21" width="1" height="1"/><rect x="10" y="21" width="1" height="1"/><rect x="9" y="20" width="1" height="1"/><rect x="10" y="20" width="1" height="1"/><rect x="9" y="19" width="1" height="1"/><rect x="10" y="19" width="1" height="1"/><rect x="9" y="18" width="1" height="1"/><rect x="10" y="18" width="1" height="1"/><rect x="9" y="17" width="1" height="1"/><rect x="10" y="17" width="1" height="1"/><rect x="9" y="16" width="1" height="1"/><rect x="10" y="16" width="1" height="1"/><rect x="9" y="15" width="1" height="1"/><rect x="10" y="15" width="1" height="1"/><rect x="9" y="14" width="1" height="1"/><rect x="10" y="14" width="1" height="1"/><rect x="9" y="13" width="1" height="1"/><rect x="10" y="13" width="1" height="1"/><rect x="9" y="12" width="1" height="1"/><rect x="10" y="12" width="1" height="1"/><rect x="9" y="11" width="1" height="1"/><rect x="10" y="11" width="1" height="1"/><rect x="9" y="10" width="1" height="1"/><rect x="10" y="10" width="1" height="1"/><rect x="9" y="9" width="1" height="1"/><rect x="10" y="9" width="1" height="1"/><rect x="9" y="8" width="1" height="1"/><rect x="10" y="8" width="1" height="1"/><rect x="9" y="7" width="1" height="1"/><rect x="10" y="7" width="1" height="1"/><rect x="9" y="6" width="1" height="1"/><rect x="10" y="6" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="10" y="5" width="1" height="1"/><rect x="9" y="4" width="1" height="1"/><rect x="10" y="4" width="1" height="1"/><rect x="9" y="3" width="1" height="1"/><rect x="10" y="3" width="1" height="1"/><rect x="9" y="2" width="1" height="1"/><rect x="10" y="2" width="1" height="1"/><rect x="9" y="1" width="1" height="1"/><rect x="10" y="1" width="1" height="1"/><rect x="9" y="0" width="1" height="1"/></svg>';

const GRAIL_SVG = '<svg class="grail-icon" viewBox="0 0 15 14" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true"><rect x="2" y="0" width="1" height="1"/><rect x="3" y="0" width="1" height="1"/><rect x="4" y="0" width="1" height="1"/><rect x="5" y="0" width="1" height="1"/><rect x="6" y="0" width="1" height="1"/><rect x="7" y="0" width="1" height="1"/><rect x="8" y="0" width="1" height="1"/><rect x="9" y="0" width="1" height="1"/><rect x="10" y="0" width="1" height="1"/><rect x="11" y="0" width="1" height="1"/><rect x="12" y="0" width="1" height="1"/><rect x="1" y="1" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/><rect x="4" y="1" width="1" height="1"/><rect x="5" y="1" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="7" y="1" width="1" height="1"/><rect x="8" y="1" width="1" height="1"/><rect x="9" y="1" width="1" height="1"/><rect x="10" y="1" width="1" height="1"/><rect x="11" y="1" width="1" height="1"/><rect x="12" y="1" width="1" height="1"/><rect x="13" y="1" width="1" height="1"/><rect x="1" y="2" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="3" y="2" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="7" y="2" width="1" height="1"/><rect x="8" y="2" width="1" height="1"/><rect x="9" y="2" width="1" height="1"/><rect x="10" y="2" width="1" height="1"/><rect x="11" y="2" width="1" height="1"/><rect x="12" y="2" width="1" height="1"/><rect x="13" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="4" y="3" width="1" height="1"/><rect x="5" y="3" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="8" y="3" width="1" height="1"/><rect x="9" y="3" width="1" height="1"/><rect x="10" y="3" width="1" height="1"/><rect x="11" y="3" width="1" height="1"/><rect x="12" y="3" width="1" height="1"/><rect x="3" y="4" width="1" height="1"/><rect x="4" y="4" width="1" height="1"/><rect x="5" y="4" width="1" height="1"/><rect x="6" y="4" width="1" height="1"/><rect x="7" y="4" width="1" height="1"/><rect x="8" y="4" width="1" height="1"/><rect x="9" y="4" width="1" height="1"/><rect x="10" y="4" width="1" height="1"/><rect x="11" y="4" width="1" height="1"/><rect x="4" y="5" width="1" height="1"/><rect x="5" y="5" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="7" y="5" width="1" height="1"/><rect x="8" y="5" width="1" height="1"/><rect x="9" y="5" width="1" height="1"/><rect x="10" y="5" width="1" height="1"/><rect x="5" y="6" width="1" height="1"/><rect x="6" y="6" width="1" height="1"/><rect x="7" y="6" width="1" height="1"/><rect x="8" y="6" width="1" height="1"/><rect x="9" y="6" width="1" height="1"/><rect x="6" y="7" width="1" height="1"/><rect x="7" y="7" width="1" height="1"/><rect x="8" y="7" width="1" height="1"/><rect x="6" y="8" width="1" height="1"/><rect x="7" y="8" width="1" height="1"/><rect x="8" y="8" width="1" height="1"/><rect x="6" y="9" width="1" height="1"/><rect x="7" y="9" width="1" height="1"/><rect x="8" y="9" width="1" height="1"/><rect x="6" y="10" width="1" height="1"/><rect x="7" y="10" width="1" height="1"/><rect x="8" y="10" width="1" height="1"/><rect x="5" y="11" width="1" height="1"/><rect x="6" y="11" width="1" height="1"/><rect x="7" y="11" width="1" height="1"/><rect x="8" y="11" width="1" height="1"/><rect x="9" y="11" width="1" height="1"/><rect x="3" y="12" width="1" height="1"/><rect x="4" y="12" width="1" height="1"/><rect x="5" y="12" width="1" height="1"/><rect x="6" y="12" width="1" height="1"/><rect x="7" y="12" width="1" height="1"/><rect x="8" y="12" width="1" height="1"/><rect x="9" y="12" width="1" height="1"/><rect x="10" y="12" width="1" height="1"/><rect x="11" y="12" width="1" height="1"/><rect x="2" y="13" width="1" height="1"/><rect x="3" y="13" width="1" height="1"/><rect x="4" y="13" width="1" height="1"/><rect x="5" y="13" width="1" height="1"/><rect x="6" y="13" width="1" height="1"/><rect x="7" y="13" width="1" height="1"/><rect x="8" y="13" width="1" height="1"/><rect x="9" y="13" width="1" height="1"/><rect x="10" y="13" width="1" height="1"/><rect x="11" y="13" width="1" height="1"/><rect x="12" y="13" width="1" height="1"/></svg>';

const MENU_CHAPTERS = [
  { name: 'LOGIQUE',       file: 'logique.html' },
  { name: 'CALCULUS',      file: 'calculus.html' },
  { name: 'ALGÈBRE',       file: 'algebre.html' },
  { name: 'ANALYSE',       file: 'analyse.html' },
  { name: 'PROBABILITÉS',  file: 'probabilites.html' },
  { name: 'STATISTIQUES',  file: 'statistiques.html' },
  { name: 'JAVA',          file: 'java.html' },
  { name: 'PYTHON',        file: 'python.html' },
];

function inFichesFolder(){
  return window.location.pathname.includes('/fiches/');
}

function chapterHref(file){
  return inFichesFolder() ? file : 'fiches/' + file;
}

function homeHref(){
  return inFichesFolder() ? '../index.html' : 'index.html';
}

function isHomePage(){
  return /\/index\.html$/.test(window.location.pathname) || /\/$/.test(window.location.pathname);
}

function changelogHref(){
  return inFichesFolder() ? '../changelog.html' : 'changelog.html';
}

function notationHref(){
  return inFichesFolder() ? '../notation.html' : 'notation.html';
}

function exercicesHref(){
  // Site séparé (dépôt PierreMillon/exercices-l1-math), pas un dossier local.
  return 'https://pierremillon.github.io/exercices-l1-math/';
}

/* ---------- préférence de notation (u/v vs f/g pour la dérivation) ---------- */
/* Certains ont appris les règles de dérivation avec u et v, d'autres
   avec f et g : préférence par sujet (un seul sujet pour l'instant,
   'derivation', mais la structure permet d'en ajouter d'autres plus
   tard), lue par fiche-engine.js pour choisir la bonne variante des
   QCM concernés (voir statementUv/optionsUv/explainUv dans calculus.js). */
const NOTATION_KEY = 'l1maths_notation';

function loadNotationPrefs(){
  try{ return JSON.parse(localStorage.getItem(NOTATION_KEY)) || {}; }
  catch(e){ return {}; }
}

function getNotationPreference(topic, fallback){
  const prefs = loadNotationPrefs();
  return prefs[topic] || fallback || 'fg';
}
window.getNotationPreference = getNotationPreference;

function setNotationPreference(topic, value){
  const prefs = loadNotationPrefs();
  prefs[topic] = value;
  localStorage.setItem(NOTATION_KEY, JSON.stringify(prefs));
}
window.setNotationPreference = setNotationPreference;

/* ---------- formules qui débordent (glissement horizontal) ---------- */
/* Une formule trop large pour l'écran (retour de Charles Boyer) ne doit
   pas déborder hors de l'écran ni forcer un retour à la ligne moche :
   on la place dans une zone visuellement distincte qu'on peut faire
   glisser latéralement pour voir la suite. Appelé après renderMathInElement
   par fiche-engine.js (typesetMath) et mistakes.js (typesetMistakes). Les
   formules en mode "display" (\\[...\\]) ont déjà le style voulu via la
   classe .katex-display en CSS ; ici on ne traite que les formules en
   ligne (\\(...\\)) qui débordent effectivement de leur conteneur, pour
   ne pas envelopper inutilement les petites formules qui tiennent déjà. */
function wrapOverflowingMath(el){
  if(!el) return;
  el.querySelectorAll('.katex:not(.katex-display .katex)').forEach(node => {
    if(node.closest('.math-scroll')) return; // déjà enveloppée
    /* Une formule inline sans contrainte de largeur a naturellement
       scrollWidth === clientWidth (rien ne la borne, elle déborde juste
       hors de son parent) : ce n'est donc jamais elle-même qui déborde,
       c'est son conteneur bloc qu'il faut comparer à sa propre largeur. */
    const container = node.closest('.exo__statement, .exo__feedback, label, p') || node.parentElement;
    if(!container) return;
    const containerWidth = container.getBoundingClientRect().width;
    const nodeWidth = node.getBoundingClientRect().width;
    if(nodeWidth <= containerWidth + 1) return; // tient dans l'écran

    const outer = document.createElement('span');
    outer.className = 'math-scroll-wrap';
    const wrap = document.createElement('span');
    wrap.className = 'math-scroll';
    const hint = document.createElement('span');
    hint.className = 'math-scroll-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = '↔';

    node.parentNode.insertBefore(outer, node);
    wrap.appendChild(node);
    outer.appendChild(wrap);
    outer.appendChild(hint);
  });
}
window.wrapOverflowingMath = wrapOverflowingMath;

/* ---------- erreurs fréquentes (page mistakes.html) ---------- */
/* Suivi global (toutes fiches confondues) des exercices ratés, pour
   cibler les révisions : chaque exercice a un score qui descend d'un
   cran à chaque mauvaise réponse (0, -1, -2… -10 après 10 échecs) et
   remonte d'un cran à chaque bonne réponse (-10 -> -9), au lieu de
   disparaître dès la première réussite — il faut autant de bonnes
   réponses que de mauvaises pour effacer une entrée (score revenu à
   0). Indépendant de la remise à zéro du chapitre, qui ne touche pas
   cette couche. Le libellé (énoncé) est recopié à l'écriture pour que
   la page de synthèse puisse l'afficher sans recharger les données de
   chaque chapitre. */
const MISTAKES_KEY = 'l1maths_mistakes';

function loadMistakes(){
  let mistakes;
  try{ mistakes = JSON.parse(localStorage.getItem(MISTAKES_KEY)) || {}; }
  catch(e){ mistakes = {}; }
  // migration : les entrées écrites par l'ancienne version (compteur
  // "count" positif, effacé à la première réussite) deviennent un
  // score négatif équivalent.
  Object.keys(mistakes).forEach(key => {
    const m = mistakes[key];
    if(typeof m.score !== 'number' && typeof m.count === 'number'){
      m.score = -m.count;
      delete m.count;
    }
  });
  return mistakes;
}
window.loadMistakes = loadMistakes;

function saveMistakes(mistakes){
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
}

function recordMistake(chapterId, ex){
  const mistakes = loadMistakes();
  const key = chapterId + ':' + ex.id;
  const prev = mistakes[key];
  mistakes[key] = {
    chapterId,
    exerciseId: ex.id,
    statement: ex.statement,
    score: (prev ? prev.score : 0) - 1,
    // options/correctIndex/explain : un instantané de l'exercice au
    // moment de l'échec, pour pouvoir le rejouer depuis la session de
    // révision ciblée (revision.js) sans avoir à charger le fichier JS
    // de sa fiche d'origine — impossible sur une page qui n'est pas
    // cette fiche, chaque fiches/*.js déclare son propre EXERCISES en
    // const top-niveau (collision si deux fiches étaient chargées sur
    // la même page). Peut devenir périmé si l'exercice est modifié
    // après coup et jamais raté à nouveau depuis — accepté, comme le
    // système de pyramide de l'autre site ne garde pas non plus
    // l'historique exact.
    options: ex.options,
    correctIndex: ex.correctIndex,
    explain: ex.explain,
  };
  saveMistakes(mistakes);
}
window.recordMistake = recordMistake;

function improveMistake(chapterId, exerciseId){
  const mistakes = loadMistakes();
  const key = chapterId + ':' + exerciseId;
  const entry = mistakes[key];
  if(!entry) return; // jamais raté : rien à améliorer
  entry.score += 1;
  if(entry.score >= 0){
    delete mistakes[key];
  }
  saveMistakes(mistakes);
}
window.improveMistake = improveMistake;

function mistakesHref(){
  return inFichesFolder() ? '../mistakes.html' : 'mistakes.html';
}

function progressionHref(){
  return inFichesFolder() ? '../progression.html' : 'progression.html';
}

/* Pourcentage de questions RÉPONDUES (pas forcément correctes — même
   sens que "COMPLÉTÉS" sur la fiche elle-même) pour un chapitre, à
   côté de son nom dans le menu — pour voir en un coup d'œil où on en
   est sans ouvrir chaque fiche. null si CHAPTER_TOTALS n'est pas
   chargé sur cette page (weekly.js absent de mistakes.html/notation.
   html/changelog.html) plutôt que de planter tout le menu. */
function chapterCompletedPercent(chapterId){
  const total = (typeof CHAPTER_TOTALS !== 'undefined' && CHAPTER_TOTALS[chapterId]) || 0;
  if(total <= 0) return null;
  let progress = {};
  try{ progress = JSON.parse(localStorage.getItem('l1maths_progress')) || {}; }
  catch(e){ progress = {}; }
  const completed = (progress[chapterId] && progress[chapterId].completed) || 0;
  return Math.round((completed / total) * 100);
}

function buildDrawer(){
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';

  const drawer = document.createElement('nav');
  drawer.className = 'drawer';
  drawer.setAttribute('aria-label', 'Menu des chapitres');

  const itemsHTML = MENU_CHAPTERS.map(ch => {
    const chapterId = ch.file.replace('.html', '');
    const pct = chapterCompletedPercent(chapterId);
    const pctHTML = pct === null ? '' : `<span class="drawer__link-pct">${pct}%</span>`;
    return `<a class="drawer__link drawer__link--chapter" href="${chapterHref(ch.file)}">${ch.name}${pctHTML}</a>`;
  }).join('');

  drawer.innerHTML = `
    <button class="drawer__close" type="button" aria-label="Fermer">✕</button>
    <a class="drawer__link" href="${homeHref()}">ACCUEIL</a>
    ${itemsHTML}
    <a class="drawer__link drawer__link--settings" href="${mistakesHref()}">MES ERREURS FRÉQUENTES</a>
    <a class="drawer__link drawer__link--settings" href="${progressionHref()}">MA PROGRESSION</a>
    <a class="drawer__link drawer__link--settings" href="${notationHref()}">RÉGLAGES</a>
    <a class="drawer__link drawer__link--settings" href="${exercicesHref()}">EXERCICES TYPE</a>
    <a class="drawer__link drawer__link--settings" href="https://pierremillon.github.io/fiche-de-math-gael/">FICHE</a>
    <button class="drawer__reset" id="resetSiteBtn" type="button">${SKULL_SVG}RÉINITIALISER LA PROGRESSION DE TOUT LE SITE</button>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  const open = () => { drawer.classList.add('open'); overlay.classList.add('open'); };
  const close = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); };

  const menuBtn = document.querySelector('.menu-btn');
  if(menuBtn){
    menuBtn.addEventListener('click', e => {
      e.preventDefault();
      flashButton(menuBtn);
      open();
    });
  }
  overlay.addEventListener('click', close);
  drawer.querySelector('.drawer__close').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') close();
  });

  setupResetSiteButton(drawer.querySelector('#resetSiteBtn'));
}

/* ---------- réinitialisation globale avec fenêtre de regret (60s, sans popup système) ---------- */
const SITE_UNDO_WINDOW_MS = 60000;
const SITE_UNDO_KEY = 'l1maths_undo_site';

function siteResetKeys(){
  return MENU_CHAPTERS.map(ch => 'l1maths_' + ch.file.replace('.html', '') + '_state')
    .concat(['l1maths_logique_state_v2']);
}

function pendingSiteUndo(){
  let undo;
  try{ undo = JSON.parse(localStorage.getItem(SITE_UNDO_KEY)); }
  catch(e){ undo = null; }
  if(!undo || typeof undo.expiresAt !== 'number') return null;
  if(Date.now() >= undo.expiresAt){
    localStorage.removeItem(SITE_UNDO_KEY);
    return null;
  }
  return undo;
}

function performSiteReset(){
  let progress = {};
  try{ progress = JSON.parse(localStorage.getItem('l1maths_progress')) || {}; }
  catch(e){ progress = {}; }
  const hadProgress = Object.values(progress).some(p => p && p.completed > 0);

  const states = {};
  siteResetKeys().forEach(key => { states[key] = localStorage.getItem(key); });

  /* La progression hebdomadaire (celle qui pilote l'équipement du
     chevalier) doit elle aussi être remise à zéro par un reset complet
     du site, sinon les pièces gagnées restent affichées malgré la
     réinitialisation. Le score cumulé des combats (victoires/défaites)
     n'est volontairement PAS touché : c'est un trophée permanent. */
  const weeklyStateKeys = window.weeklyStateKey ? MENU_CHAPTERS.map(ch => window.weeklyStateKey(ch.file.replace('.html', ''))) : [];
  const weeklyStates = {};
  weeklyStateKeys.forEach(key => { weeklyStates[key] = localStorage.getItem(key); });
  const weeklyProgressRaw = window.WEEKLY_PROGRESS_KEY ? localStorage.getItem(window.WEEKLY_PROGRESS_KEY) : null;

  const undo = {
    expiresAt: Date.now() + SITE_UNDO_WINDOW_MS,
    progressRaw: localStorage.getItem('l1maths_progress'),
    states: states,
    skullIncremented: hadProgress,
    weeklyStates: weeklyStates,
    weeklyProgressRaw: weeklyProgressRaw,
  };
  localStorage.setItem(SITE_UNDO_KEY, JSON.stringify(undo));

  localStorage.removeItem('l1maths_progress');
  siteResetKeys().forEach(key => localStorage.removeItem(key));
  weeklyStateKeys.forEach(key => localStorage.removeItem(key));
  if(window.WEEKLY_PROGRESS_KEY) localStorage.removeItem(window.WEEKLY_PROGRESS_KEY);
  if(hadProgress && window.incrementSkullPile) window.incrementSkullPile();
  window.location.reload();
}

function undoSiteReset(){
  const undo = pendingSiteUndo();
  if(!undo) return;
  if(undo.progressRaw != null) localStorage.setItem('l1maths_progress', undo.progressRaw);
  Object.keys(undo.states).forEach(key => {
    if(undo.states[key] != null) localStorage.setItem(key, undo.states[key]);
  });
  if(undo.weeklyStates){
    Object.keys(undo.weeklyStates).forEach(key => {
      if(undo.weeklyStates[key] != null) localStorage.setItem(key, undo.weeklyStates[key]);
    });
  }
  if(undo.weeklyProgressRaw != null && window.WEEKLY_PROGRESS_KEY){
    localStorage.setItem(window.WEEKLY_PROGRESS_KEY, undo.weeklyProgressRaw);
  }
  if(undo.skullIncremented && window.decrementSkullPile) window.decrementSkullPile();
  localStorage.removeItem(SITE_UNDO_KEY);
  window.location.reload();
}

function setupResetSiteButton(btn){
  if(!btn) return;
  const originalHTML = btn.innerHTML;
  let timer = null;

  function showNormal(){
    clearInterval(timer);
    btn.classList.remove('undo-mode');
    btn.innerHTML = originalHTML;
    btn.onclick = performSiteReset;
  }

  function showUndo(undo){
    btn.classList.add('undo-mode');
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((undo.expiresAt - Date.now()) / 1000));
      btn.textContent = `REGRETS ? (${remaining}s)`;
      if(remaining <= 0) showNormal();
    };
    tick();
    timer = setInterval(tick, 250);
    btn.onclick = undoSiteReset;
  }

  const pending = pendingSiteUndo();
  if(pending) showUndo(pending);
  else showNormal();
}

function flashButton(el){
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 150);
}

function buildVersionBadge(){
  const badge = document.createElement('a');
  badge.className = 'version-badge';
  badge.href = changelogHref();
  badge.textContent = 'v' + SITE_VERSION;
  document.body.appendChild(badge);
}

/* ---------- bruitages synthétisés (Web Audio, aucun fichier externe) ---------- */
let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if(audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playTone(ctx, freq, startTime, dur, opts){
  const { vol = 0.25, shape = 'sine', attack = 0.005, release = 0.08 } = opts || {};
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = shape;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(vol, startTime + attack);
  gain.gain.setValueAtTime(vol, startTime + Math.max(attack, dur - release));
  gain.gain.linearRampToValueAtTime(0, startTime + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + dur + 0.02);
}

function playSlide(ctx, freqStart, freqEnd, startTime, dur, opts){
  const { vol = 0.3, shape = 'square', attack = 0.01, release = 0.08 } = opts || {};
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = shape;
  osc.frequency.setValueAtTime(freqStart, startTime);
  osc.frequency.linearRampToValueAtTime(freqEnd, startTime + dur);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(vol, startTime + attack);
  gain.gain.setValueAtTime(vol, startTime + Math.max(attack, dur - release));
  gain.gain.linearRampToValueAtTime(0, startTime + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + dur + 0.02);
}

function playGrailAppearSound(){
  const ctx = getAudioCtx();
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  const step = 0.08;
  notes.forEach((f, i) => {
    playTone(ctx, f, now + i * step, step, { vol: 0.18, shape: 'triangle', attack: 0.005, release: 0.05 });
    playTone(ctx, f * 2, now + i * step, step, { vol: 0.06, shape: 'sine', attack: 0.005, release: 0.05 });
  });
  playTone(ctx, 1046.5, now + notes.length * step, 0.18, { vol: 0.12, shape: 'sine', attack: 0.01, release: 0.16 });
}

function playGrailBlipSound(){
  const ctx = getAudioCtx();
  playTone(ctx, 880, ctx.currentTime, 0.09, { vol: 0.22, shape: 'sine', attack: 0.003, release: 0.06 });
}

function playGrailGoneSound(){
  const ctx = getAudioCtx();
  const now = ctx.currentTime;
  playSlide(ctx, 392, 349, now, 0.16, { vol: 0.28, shape: 'square', attack: 0.01, release: 0.06 });
  playSlide(ctx, 330, 246, now + 0.19, 0.32, { vol: 0.28, shape: 'square', attack: 0.01, release: 0.1 });
}

function buildScrollTopButton(){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'scroll-top-btn';
  btn.innerHTML = SCROLL_TOP_SVG + GRAIL_SVG;
  document.body.appendChild(btn);

  const AT_TOP_THRESHOLD = 4;
  const GRAIL_SHRINK_CLICKS = 10;
  let scrolling = false;
  let restClickCount = 0;

  function syncState(){
    if(scrolling) return;
    const atTop = window.scrollY <= AT_TOP_THRESHOLD;
    const atRest = atTop && isHomePage();
    btn.classList.toggle('at-top', atTop);
    btn.classList.toggle('at-rest', atRest);
    if(!atRest){
      btn.classList.remove('grail-shown');
      btn.style.removeProperty('--gscale');
      restClickCount = 0;
    }
    btn.setAttribute('aria-label', atTop ? (atRest ? "Déjà à l'accueil, tout en haut" : "Retour à l'accueil") : 'Remonter en haut de la page');
  }
  syncState();
  window.addEventListener('scroll', syncState, { passive: true });

  function wobble(){
    btn.classList.remove('wobble');
    void btn.offsetWidth;
    btn.classList.add('wobble');
    setTimeout(() => btn.classList.remove('wobble'), 350);
  }

  btn.addEventListener('click', () => {
    if(scrolling) return;
    flashButton(btn);
    if(btn.classList.contains('at-top')){
      if(isHomePage()){
        restClickCount++;
        if(restClickCount < 3){
          wobble();
        }else if(!btn.classList.contains('grail-shown')){
          btn.classList.add('grail-shown');
          btn.style.setProperty('--gscale', 1);
          wobble();
          playGrailAppearSound();
        }else{
          const n = restClickCount - 3;
          const prevScale = Math.max(0, 1 - (n - 1) / GRAIL_SHRINK_CLICKS);
          const scale = Math.max(0, 1 - n / GRAIL_SHRINK_CLICKS);
          btn.style.setProperty('--gscale', scale);
          wobble();
          if(scale <= 0 && prevScale > 0){
            playGrailGoneSound();
          }else if(scale > 0){
            playGrailBlipSound();
          }
        }
      }else{
        window.location.href = homeHref();
      }
    }else{
      scrolling = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const checkSettled = () => {
        if(window.scrollY <= AT_TOP_THRESHOLD){
          scrolling = false;
          syncState();
        }else{
          requestAnimationFrame(checkSettled);
        }
      };
      requestAnimationFrame(checkSettled);
      setTimeout(() => { scrolling = false; syncState(); }, 1200);
    }
  });
}

/* ---------- phrase de fin de fiche (question ouverte, ton encourageant) ---------- */
const END_PHRASES = [
  "ET SI CE CHAPITRE N'ÉTAIT QUE LE DÉBUT DE CE QUE TU PEUX COMPRENDRE ?",
  "JUSQU'OÙ PEUT TE MENER UN CHAPITRE DE PLUS ?",
  "QUI SERAS-TU QUAND TOUT CECI TE SEMBLERA ÉVIDENT ?",
  "ET SI TU ÉTAIS DÉJÀ PLUS PRÊT QUE TU NE LE CROIS ?",
  "QU'EST-CE QUI DEVIENT POSSIBLE MAINTENANT QUE TU SAIS ÇA ?",
  "ET SI COMPRENDRE ÉTAIT DÉJÀ UNE FORME DE VICTOIRE ?",
  "COMBIEN DE CHAPITRES TE SÉPARENT ENCORE DE TOI-MÊME ?",
  "ET SI LA PROCHAINE FICHE ÉTAIT CELLE QUI CHANGE TOUT ?",
  "QU'AS-TU DE PLUS EN TOI MAINTENANT QU'IL Y A UNE HEURE ?",
  "ET SI LE PLUS DUR ÉTAIT DÉJÀ DERRIÈRE TOI ?",
  "JUSQU'OÙ COMPTES-TU ALLER, AU FOND ?",
  "QUI SAIT CE QUE LE CHAPITRE SUIVANT VA T'APPRENDRE SUR TOI-MÊME ?",
  "ET SI CHAQUE EXERCICE TE RAPPROCHAIT D'UNE MEILLEURE VERSION DE TOI ?",
  "ET SI TU ÉTAIS PLUS PROCHE DU BUT QUE TU NE LE PENSES ?",
  "QU'EST-CE QUE TU SAURAS DEMAIN QUE TU IGNORES ENCORE CE SOIR ?",
  "ET SI LA SUITE ÉTAIT PLUS FACILE QUE TU NE LE CROIS ?",
  "JUSQU'OÙ IRA CE QUE TU VIENS D'APPRENDRE ?",
  "ET SI C'ÉTAIT ÇA, LE DÉCLIC ?",
  // Ajoutées le 10/08/2026, inspirées d'un texte personnel sur la
  // patience et l'effort ("Déclic mathématiques") — 6 phrases tirées
  // directement du texte (reformulées en question ouverte, ton laïque)
  // + 50 générées dans le même esprit, mêmes thèmes (effort > vitesse,
  // patience, petits pas, doute, persévérance).
  "ET SI L'EFFORT COMPTAIT PLUS QUE LE RÉSULTAT ?",
  "ET SI RALENTIR ÉTAIT LA VRAIE FAÇON D'ALLER VITE ?",
  "COMBIEN DE TEMPS FAUT-IL À L'EAU POUR FAIRE UNE STALACTITE ?",
  "TA VALEUR EST-ELLE DANS LA RÉPONSE, OU DANS LE FAIT DE T'Y ÊTRE ATTAQUÉ ?",
  "ET SI LA TÂCHE N'AVAIT PAS À ÊTRE ACHEVÉE, JUSTE TENTÉE ?",
  "AS-TU APPRIS À MARCHER EN COMPRENANT LA MÉCANIQUE DE LA MARCHE ?",
  "ET SI CHAQUE ERREUR T'APPRENAIT PLUS QU'UNE BONNE RÉPONSE ?",
  "QU'EST-CE QUE TU COMPRENDS AUJOURD'HUI QUE TU NE COMPRENAIS PAS HIER ?",
  "ET SI LA LENTEUR D'AUJOURD'HUI ÉTAIT LA VITESSE DE DEMAIN ?",
  "COMBIEN DE FOIS FAUT-IL ÉCHOUER AVANT QUE ÇA DEVIENNE FACILE ?",
  "ET SI TU N'AVAIS PAS BESOIN DE TOUT COMPRENDRE D'UN COUP ?",
  "QUI ÉTAIS-TU AVANT LE PREMIER EXERCICE DE CETTE FICHE ?",
  "ET SI LA CONFIANCE VENAIT APRÈS L'EFFORT, PAS AVANT ?",
  "JUSQU'OÙ PEUX-TU ALLER SI TU NE T'ARRÊTES PAS LÀ ?",
  "ET SI CE QUI TE RÉSISTE MAINTENANT ÉTAIT ÉVIDENT DANS UNE SEMAINE ?",
  "QU'EST-CE QUI DEVIENT AUTOMATIQUE QUAND TU LE RÉPÈTES ASSEZ ?",
  "ET SI TU N'ÉTAIS PAS EN RETARD, JUSTE EN CHEMIN ?",
  "AS-TU REMARQUÉ TOUT CE QUE TU SAIS DÉJÀ FAIRE SANS Y PENSER ?",
  "ET SI CHAQUE PETIT PROBLÈME RÉSOLU EN PRÉPARAIT UN PLUS GRAND ?",
  "QUI COMPTE LES HEURES QUE TU PASSES À COMPRENDRE, VRAIMENT ?",
  "ET SI PERSISTER ÉTAIT DÉJÀ UNE FORME D'INTELLIGENCE ?",
  "QU'EST-CE QUI RESTE QUAND TU ENLÈVES LA PEUR DE TE TROMPER ?",
  "ET SI TU ÉTAIS PLUS CAPABLE QUE CE QUE TU RESSENS LÀ, MAINTENANT ?",
  "COMBIEN DE CONCEPTS TE SEMBLAIENT IMPOSSIBLES IL Y A UN MOIS ?",
  "ET SI LE DOUTE ÉTAIT LE SIGNE QUE TU PRENDS ÇA AU SÉRIEUX ?",
  "QU'AS-TU APPRIS EN TE TROMPANT QUE TU N'AURAIS PAS APPRIS AUTREMENT ?",
  "ET SI COMPRENDRE LENTEMENT VALAIT MIEUX QUE MÉMORISER VITE ?",
  "JUSQU'OÙ IRAIT CETTE FICHE SI TU LA REFAISAIS DANS UN MOIS ?",
  "ET SI TU N'AVAIS QU'À TENIR UN PEU PLUS LONGTEMPS ?",
  "QUI DÉCIDE QUE C'EST TROP DIFFICILE, TOI OU LE PROBLÈME ?",
  "ET SI LA DIFFICULTÉ ÉTAIT LA PREUVE QUE TU PROGRESSES ?",
  "ET SI TU AVAIS DÉJÀ TOUT CE QU'IL FAUT POUR CONTINUER ?",
  "COMBIEN DE FOIS AS-TU CRU ÊTRE BLOQUÉ AVANT DE TROUVER ?",
  "ET SI CHAQUE RÉPÉTITION TE RAPPROCHAIT DE L'AUTOMATISME ?",
  "QUI SERAIS-TU SI TU N'ABANDONNAIS JAMAIS AU MILIEU D'UN EXERCICE ?",
  "QU'EST-CE QUI TE SEMBLERA SIMPLE DANS SIX MOIS ?",
  "ET SI RECOMMENCER N'ÉTAIT PAS UN ÉCHEC, MAIS UNE RÉVISION ?",
  "JUSQU'OÙ VA TE MENER LA VERSION DE TOI QUI NE LÂCHE RIEN ?",
  "ET SI TU ÉTAIS DÉJÀ EN TRAIN DE DEVENIR CELUI QUE TU VEUX ÊTRE ?",
  "QUI T'A DIT QUE TU DEVAIS TOUT COMPRENDRE DU PREMIER COUP ?",
  "ET SI TA PATIENCE D'AUJOURD'HUI ÉTAIT TA RAPIDITÉ DE DEMAIN ?",
  "ET SI CE QUE TU CROIS IMPOSSIBLE N'ÉTAIT QUE PAS ENCORE ESSAYÉ ?",
  "QU'EST-CE QUE ÇA CHANGERAIT DE TE FAIRE CONFIANCE DÈS MAINTENANT ?",
  "ET SI TU N'AVAIS PAS À ÊTRE RAPIDE, JUSTE RÉGULIER ?",
  "JUSQU'OÙ PEUX-TU TENIR SI TU ARRÊTES DE TE COMPARER AUX AUTRES ?",
  "ET SI CHAQUE EXERCICE FINI ÉTAIT UNE PREUVE, PAS UN HASARD ?",
  "QUI ES-TU QUAND PERSONNE NE REGARDE SI TU AS COMPRIS ?",
  "ET SI LE TEMPS QUE ÇA TE PREND N'AVAIT AUCUNE IMPORTANCE ?",
  "ET SI TU ÉTAIS LA SEULE PERSONNE QUI DOUTE ENCORE DE TOI ?",
  "COMBIEN DE FOIS FAUT-IL RECOMMENCER AVANT QUE ÇA DEVIENNE UNE FORCE ?",
  "ET SI APPRENDRE LENTEMENT ÉTAIT LA SEULE FAÇON D'APPRENDRE VRAIMENT ?",
  "ET SI, EN CE MOMENT MÊME, TU ÉTAIS EN TRAIN DE CHANGER ?",
  "QU'EST-CE QUE TU FERAIS DE CE CHAPITRE SANS PEUR DE MAL FAIRE ?",
  "ET SI LE PROBLÈME LE PLUS DUR N'ÉTAIT QU'UNE SUITE DE PETITS PROBLÈMES ?",
  "QUI SAIT CE QUE TU COMPRENDRAS DANS DIX MINUTES QUE TU IGNORES LÀ ?",
  "ET SI TU ÉTAIS PLUS PROCHE DE LA MAÎTRISE QUE DE ZÉRO ?",
];

const END_PHRASE_BAG_KEY = 'l1maths_endphrase_bag';
const END_PHRASE_LAST_KEY = 'l1maths_endphrase_last';

function shuffledIndices(length){
  const arr = Array.from({ length }, (_, i) => i);
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function nextEndPhraseIndex(){
  let bag = [];
  try{ bag = JSON.parse(sessionStorage.getItem(END_PHRASE_BAG_KEY)) || []; }
  catch(e){ bag = []; }

  if(!Array.isArray(bag) || bag.length === 0){
    const previousLast = Number(sessionStorage.getItem(END_PHRASE_LAST_KEY));
    bag = shuffledIndices(END_PHRASES.length);
    if(END_PHRASES.length > 1){
      while(bag[0] === previousLast) bag = shuffledIndices(END_PHRASES.length);
    }
  }

  const idx = bag.shift();
  sessionStorage.setItem(END_PHRASE_BAG_KEY, JSON.stringify(bag));
  sessionStorage.setItem(END_PHRASE_LAST_KEY, String(idx));
  return idx;
}

function renderEndPhrase(){
  const el = document.getElementById('ficheEndPhrase');
  if(!el) return;
  el.firstChild.textContent = END_PHRASES[nextEndPhraseIndex()] + ' ';
}

/* ---------- chapitre précédent/suivant (bas de fiche) ---------- */
/* Accès rapide entre fiches sans repasser par le menu : suit l'ordre
   de MENU_CHAPTERS, boucle (dernier -> premier et inversement). Ne
   s'affiche que sur une fiche (le nom de fichier courant doit être
   dans MENU_CHAPTERS) ; sans effet sur l'accueil ou le changelog. */
function renderChapterNav(){
  const el = document.getElementById('chapterNav');
  if(!el || !inFichesFolder()) return;

  const currentFile = window.location.pathname.split('/').pop();
  const idx = MENU_CHAPTERS.findIndex(ch => ch.file === currentFile);
  if(idx === -1) return;

  const prev = MENU_CHAPTERS[(idx - 1 + MENU_CHAPTERS.length) % MENU_CHAPTERS.length];
  const next = MENU_CHAPTERS[(idx + 1) % MENU_CHAPTERS.length];

  el.innerHTML = `
    <a class="chapter-nav__link chapter-nav__link--prev" href="${prev.file}">← ${prev.name}</a>
    <a class="chapter-nav__link chapter-nav__link--next" href="${next.file}">${next.name} →</a>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  buildDrawer();
  renderEndPhrase();
  renderChapterNav();
  buildVersionBadge();
  buildScrollTopButton();
});
