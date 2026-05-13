# Sport Pro Space — Landing Page

Production-ready landing page dla platformy diagnozy i rozwoju doświadczenia w sporcie (akademie, kluby profesjonalne).

## Stack

- **Next.js 14** (App Router, TypeScript, RSC)
- **TailwindCSS 3** + CSS variables (light theme)
- **shadcn/ui** primitives (Button, Card, Badge) — styl `new-york`
- **lucide-react** — ikony biznesowe / konsultingowe
- **Inter** (next/font) — typografia editorial

## Design system

- Background: white (`#FFFFFF`)
- Akcent: dark navy blue `#1E3A8A` (`navy-800`) i `#0B1736` (`navy-950`)
- Surface secondary: `navy-50` (`#F0F4FA`)
- Border: `navy-100`
- Radius: `0.625rem`
- Styl: SaaS / B2B intelligence platform (Stripe / Notion / Qualtrics light)

## Struktura katalogów

```
app/
  layout.tsx        # Root layout + font + metadata
  page.tsx          # Kompozycja sekcji landing page
  globals.css       # Tailwind + CSS variables (shadcn)
components/
  Navbar.tsx        # Sticky nav + mobile menu
  Footer.tsx
  ui/               # shadcn primitives
    button.tsx
    card.tsx
    badge.tsx
  sections/
    Hero.tsx
    ProblemSection.tsx
    HowWeHelp.tsx
    HowItWorks.tsx
    Certification.tsx
    SportTypes.tsx
    CTASection.tsx
lib/
  utils.ts          # cn() helper (clsx + tailwind-merge)
tailwind.config.ts
components.json     # shadcn/ui config
```

## Sekcje strony (kolejność)

1. **Hero** — headline, podtytuł, dwa CTA, mockup raportu (NES, retencja, segmenty)
2. **Problem** — 3 problemy + 3 statystyki
3. **How We Help** — 3 karty usług (Self Assessment, Experience Research, Brand & Experience Development)
4. **How It Works** — 4-stopniowy proces z connector line
5. **Certification** — premium badge / certyfikat 12 mies.
6. **Sport Types** — grid dyscyplin (5 kart)
7. **CTA Section** — dark navy block z CTA

## Uruchomienie

```bash
npm install
npm run dev
```

Strona: [http://localhost:3000](http://localhost:3000)

Build produkcyjny:

```bash
npm run build
npm start
```

## Konwencje

- Komponenty są server-side domyślnie; `Navbar` jest `"use client"` (state mobilnego menu).
- Brak backendu — landing statyczny. CTA podpięte pod `mailto:` i kotwice `#contact`.
- Copy: konkretne, B2B, bez marketingowego bełkotu.
- Ikony: `lucide-react`, jednolity rozmiar `size-5` w kartach.
