# Sport Space Pro — Brand Assets

Pakiet zawiera: brand manual, logo (warianty), ikony na Instagram i LinkedIn w wymaganych rozmiarach, 5 szablonów Canva oraz projekt certyfikatu (A4 + web badge).

## Szybki start

1. **Brand manual** → otwórz [`MANUAL.html`](MANUAL.html) w przeglądarce (drukowalny do PDF: Ctrl+P → Save as PDF).
2. **Logo** → [`logo/`](logo/) — 7 wariantów SVG (skalowalne, bezstratne).
3. **Social** → [`social/instagram/`](social/instagram/) i [`social/linkedin/`](social/linkedin/) — gotowe ikony i posty w rozmiarach wg specyfikacji platform.
4. **Canva** → [`canva/`](canva/) — 5 szablonów `.svg` + [`canva/README.md`](canva/README.md) z instrukcją importu.
5. **Certyfikat** → [`certificate/`](certificate/) — A4 do druku/PDF + web badge + snippet osadzenia.

## Format plików

Wszystko jako **SVG** — jeden zestaw plików daje pełną skalowalność do dowolnego rozmiaru i formatu (PNG/JPG/PDF). Konwersja:

```bash
# SVG → PNG (Inkscape)
inkscape input.svg --export-type=png --export-width=1080

# SVG → PNG (ImageMagick)
magick -density 300 -background none input.svg -resize 1080x1080 output.png

# SVG → PDF (Inkscape)
inkscape input.svg --export-type=pdf
```

W Canvie: **Uploads → Upload files → wybierz `.svg`** → po wstawieniu na canvas zrób **Ungroup (Ctrl+Shift+G)** by edytować warstwy tekstowe.

## Specyfikacja rozmiarów (źródło: dokumentacja platform, 2026)

| Platforma | Format | Rozmiar | Plik |
| --- | --- | --- | --- |
| Instagram | Profile (min) | 320×320 | `instagram-profile-320.svg` |
| Instagram | Profile (max) | 1080×1080 | `instagram-profile-1080.svg` |
| Instagram | Post 1:1 | 1080×1080 | `instagram-post-1080.svg` |
| Instagram | Story / Reel | 1080×1920 | `instagram-story-1080x1920.svg` |
| LinkedIn | Company logo | 400×400 | `linkedin-company-logo-400.svg` |
| LinkedIn | Banner | 1584×396 | `linkedin-banner-1584x396.svg` |
| LinkedIn | Shared post | 1200×627 | `linkedin-post-1200x627.svg` |
| Print | Certyfikat A4 ldscp | 297×210 mm | `certificate-a4-landscape.svg` |
| Web | Badge | 320×400 | `certificate-web-badge.svg` |

## Struktura

```
brand/
├── MANUAL.html            ← brand manual (kolory, typo, voice, zasady)
├── README.md              ← ten plik
├── logo/                  ← 7× SVG
├── social/
│   ├── instagram/         ← 4× SVG
│   └── linkedin/          ← 3× SVG
├── canva/                 ← 5× SVG + README
└── certificate/           ← A4 + web badge + snippet
```
