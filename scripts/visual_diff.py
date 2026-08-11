#!/usr/bin/env python3
"""
L1 MATHS — SYNTHÈSE — scripts/visual_diff.py
Compare une capture "check" à sa référence "baseline" pixel par pixel
(voir visual_capture.js / visual_regression.sh). Affiche le
pourcentage de pixels différents et écrit une image de différence
pour inspection visuelle. Sort avec un code non-nul si le
pourcentage dépasse le seuil (--threshold, 0.5% par défaut) — assez
sensible pour attraper un décalage de quelques pixels (comme celui
de la bulle de l'oiseau qui a chevauché le château) sans se
déclencher sur du bruit d'anti-aliasing insignifiant.
"""
import sys
import argparse
from pathlib import Path

try:
    from PIL import Image, ImageChops
except ImportError:
    print("Pillow n'est pas installé (pip install Pillow)", file=sys.stderr)
    sys.exit(2)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("baseline")
    parser.add_argument("check")
    parser.add_argument("--threshold", type=float, default=0.5, help="pourcentage de pixels différents toléré")
    parser.add_argument("--diff-out", default=None, help="chemin où écrire l'image de différence")
    args = parser.parse_args()

    baseline_path = Path(args.baseline)
    check_path = Path(args.check)

    if not baseline_path.exists():
        print(f"Pas de référence trouvée à {baseline_path} — lance d'abord "
              f"'node scripts/visual_capture.js baseline' pour en créer une.")
        sys.exit(0)  # pas un échec : juste rien à comparer encore

    if not check_path.exists():
        print(f"Capture à comparer introuvable : {check_path}", file=sys.stderr)
        sys.exit(2)

    base = Image.open(baseline_path).convert("RGB")
    check = Image.open(check_path).convert("RGB")

    if base.size != check.size:
        print(f"DIFFÉRENT : tailles différentes (référence {base.size} vs actuel {check.size})")
        sys.exit(1)

    diff = ImageChops.difference(base, check)
    bbox = diff.getbbox()
    if bbox is None:
        print("IDENTIQUE — aucune différence de pixel.")
        sys.exit(0)

    # Compte les pixels dont au moins un canal diffère de plus de 10
    # (tolère le bruit d'anti-aliasing/compression, pas un vrai décalage).
    pixels = diff.load()
    w, h = diff.size
    changed = 0
    for y in range(h):
        for x in range(w):
            r, g, b = pixels[x, y]
            if r > 10 or g > 10 or b > 10:
                changed += 1
    pct = 100 * changed / (w * h)

    if args.diff_out:
        diff.save(args.diff_out)

    if pct > args.threshold:
        print(f"DIFFÉRENT : {pct:.2f}% des pixels ont changé (seuil {args.threshold}%) — "
              f"boîte englobante des changements : {bbox}")
        sys.exit(1)
    else:
        print(f"OK — {pct:.2f}% des pixels ont changé, sous le seuil de {args.threshold}%.")
        sys.exit(0)


if __name__ == "__main__":
    main()
