---
name: Sport Space Pro
description: A single-hue navy instrument panel for independent sports research — white paper, hairline rules, and one blue that carries every emphasis.
colors:
  paper-white: "#ffffff"
  mist-navy: "#f0f4fa"
  hairline-navy: "#dbe5f1"
  edge-navy: "#b8cae3"
  haze-navy: "#8aa6cd"
  signal-navy: "#1e3a8a"
  deep-navy: "#172554"
  midnight-navy: "#0b1736"
  ink: "#0f172a"
  muted-slate: "#64748b"
  neutral-border: "#e5e7eb"
  focus-ring: "hsl(224 71% 33%)"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.625rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.04em"
    fontFeature: "\"ss01\", \"cv11\""
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-compact:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.90625rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  micro:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.75rem"
  2xl: "1rem"
  full: "9999px"
spacing:
  hairline: "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "1.75rem"
  xl: "3rem"
  section: "5rem"
  section-lg: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-navy}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.paper-white}"
  button-primary-active:
    backgroundColor: "{colors.midnight-navy}"
    textColor: "{colors.paper-white}"
  button-outline:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.md}"
    padding: "0 1.25rem"
    height: "2.75rem"
    typography: "{typography.label}"
  button-outline-hover:
    textColor: "{colors.signal-navy}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signal-navy}"
    rounded: "{rounded.md}"
    padding: "0 0.875rem"
    height: "2.75rem"
  button-ghost-hover:
    backgroundColor: "{colors.mist-navy}"
  badge-soft:
    backgroundColor: "{colors.mist-navy}"
    textColor: "{colors.signal-navy}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  badge-solid:
    backgroundColor: "{colors.signal-navy}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.625rem"
  card-surface:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.midnight-navy}"
    rounded: "{rounded.xl}"
    padding: "1.75rem"
  card-inverted:
    backgroundColor: "{colors.deep-navy}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.xl}"
    padding: "1.75rem"
  input-inverted:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
    typography: "{typography.body}"
---

# Design System: Sport Space Pro

## Overview

**Creative North Star: "The Instrument Panel on White Paper"**

The shipped site reads like a measurement instrument printed on a clean sheet. Everything is white paper and hairline rules; the only saturated ink on the page is one navy, and that navy is reserved for the things that carry a decision — the headline's emphasised phrase, the primary button, a filled meter, a data value. Nothing decorates. Where the page wants texture it uses a faint 56px graph-paper grid and a blurred navy bloom rather than colour or imagery, so the surface stays a page you read rather than a poster you look at. The hero's dashboard mockup is the thesis in one component: the product is data, so the first viewport shows an instrument, not a promise.

Density is generous but not airy. Sections breathe on a fixed 80/112px vertical rhythm; inside a card, content is tight — 12–16px gaps, 14.5px body, hairline dividers rather than whitespace to separate a claim from its evidence list. Headings are set in one weight (600) and pulled tight (-0.04em at hero scale), which is what carries authority here in the absence of a second typeface or a second colour. The tone is auditor, not agency: restrained, legible, quantitative.

The system's inversion is its one dramatic move. A dark navy surface — gradient navy-900 → navy-950, white grid overlay at 6–7% opacity, translucent white controls — appears exactly where the page asks for commitment (the contact block, the lead service card). Light surface is the default state of the product; dark surface means "act now". This is a baseline record of a shipped site, not a charter: the navy palette and Inter are what the code does today, and the project owner has explicitly left both open to challenge.

**Key Characteristics:**
- One hue (navy) plus white and slate greys; no second brand colour exists in the token layer
- One typeface (Inter, `ss01`/`cv11`) at one heading weight (600)
- White cards with `#dbe5f1` hairline borders on white sections — separation by edge, not by fill
- Long-throw, negative-spread shadows that appear on hover, not at rest
- Dark navy inversion reserved for conversion surfaces
- Faint graph-paper grid and blurred radial bloom as the only decorative texture

## Colors

A single navy ramp doing every job — brand, emphasis, border, background tint and data fill — over white paper and slate-grey secondary text.

### Primary
- **Signal Navy** (`#1e3a8a`, navy-800): the load-bearing colour. Primary button fill, emphasised words inside headings, link text, meter fills, icon glyphs, bullet dots, "Czytaj"-style inline actions. It is the only saturated colour a light section is allowed to carry.
- **Deep Navy** (`#172554`, navy-900): hover state for the primary button, the dark feature-card surface, and the lighter stop of the inverted gradient.
- **Midnight Navy** (`#0b1736`, navy-950): the darkest text colour — headings, card titles, stat values — and the active state of the primary button. Body headings sit here, not on pure black.

### Neutral
- **Paper White** (`#ffffff`): the default section background and the default card fill. Nearly every section is white on white, separated only by a bottom hairline.
- **Mist Navy** (`#f0f4fa`, navy-50): the softest tint. Soft-badge fill, icon-tile fill, meter track, ghost-button hover, and the lower stop of the card's white→tint gradient.
- **Hairline Navy** (`#dbe5f1`, navy-100): the house border. Card borders, section dividers, list separators, sticky-header underline. If a line exists on a light surface, it is almost certainly this one.
- **Edge Navy** (`#b8cae3`, navy-200): the stronger border — outline buttons and badges at rest, card border on hover, and the mockup's window dots.
- **Haze Navy** (`#8aa6cd`, navy-300): non-emphasised data fill in the dashboard meters and hover border on cards.
- **Ink** (`#0f172a`): base document foreground; also the tint of every shadow (`rgba(15,23,42,α)`) and of the decorative grid lines.
- **Muted Slate** (`#64748b`): all secondary prose — section intros, card descriptions, timestamps, captions, chart labels.
- **Neutral Border** (`#e5e7eb`): the global `*` border colour from the shadcn layer; in practice it is overridden by Hairline Navy almost everywhere.

### Named Rules

**The Single-Hue Rule.** On marketing surfaces there is exactly one hue: navy. Every landing section ships navy plus white plus slate grey and nothing else. A new section that introduces a brand colour is off-system.

**The Empty Accent Slot Rule.** `--accent` is set to the same value as `--primary` (`224 71% 33%`). There is no accent colour in this system — the slot exists and is filled with the primary. Do not build a component that relies on `accent` reading differently from `primary`, and do not invent a value for it without an explicit palette decision.

**The Status-Only Colour Rule.** Emerald, amber, red/rose and violet appear only as raw Tailwind defaults in four files — the self-assessment scoring bands, the article-card category chips, the error boundary, and the contact form's success/error states. They are status signals, not palette members, and they are not tokenised. Keep them out of persuasive surfaces; if a status colour is needed on a new surface, it is being borrowed, not inherited.

## Typography

**Display Font:** Inter (with system-ui, sans-serif)
**Body Font:** Inter (with system-ui, sans-serif)

**Character:** One typeface, no pairing. Inter is loaded once via `next/font` (latin + latin-ext) and exposed twice — `font-sans` and `font-display` resolve to the identical stack, so `font-display` is an alias, not a second voice. Body text runs with `font-feature-settings: "ss01", "cv11"`, which gives the single-storey `a`-alternates and the straight-legged `l` — a small, deliberate move toward a technical, dashboard-adjacent tone. Hierarchy is carried entirely by size, weight (400 vs 500/600) and negative tracking.

### Hierarchy
- **Display** (600, 36px → 58px, line-height 1.06, `-0.04em`): the hero H1 only. Steps 36 / 48 / 52 / 58 across sm / lg / xl. The one place the tightest tracking token is used.
- **Headline** (600, 30px → 40px, line-height ~1.15, `-0.025em`): section H2. Set on Midnight Navy on light surfaces, white on inverted ones, usually `text-balance` and capped near 2xl width.
- **Title** (600, 20px, `-0.025em`): card headings. Article-card titles drop to 16px with `leading-snug` in the denser grid.
- **Body** (400, 16–17px, `leading-relaxed`): section intros and hero subcopy, on Muted Slate, capped at `max-w-xl`/`max-w-md` rather than a ch measure.
- **Body Compact** (400, 13.5–14.5px, `leading-relaxed`): copy inside cards and evidence lists — the site's most common text size.
- **Label** (500, 14–15px): navigation items and button text.
- **Micro** (600, 10–12px, `0.16em`–`0.18em`, uppercase): step markers, mockup stat labels, category chips.

### Named Rules

**The One Typeface Rule.** Inter is the whole type system. `font-display` is an alias of `font-sans`; treating it as a display face is a no-op. Any pairing would be a new decision, not an application of this one.

**The Tighten-As-You-Grow Rule.** Tracking tightens as type scales: normal at body, `-0.025em` at headline and title, `-0.04em` at the hero. Large type is never set at default tracking.

**The Single Heading Weight Rule.** All headings are 600. There is no 700 and no light heading anywhere in the build; contrast between levels comes from size, not weight.

## Layout

A centred single container with generous gutters. `container` is centred with padding stepping 20px → 24px (sm) → 32px (lg) → 40px (xl), and a hard ceiling of 1440px at the 2xl breakpoint; breakpoints are 640 / 768 / 1024 / 1200 / 1440. Long-form and conversion blocks narrow further inside it (`max-w-6xl` for the CTA panel, `max-w-2xl` for section intros, `max-w-xl` for hero copy).

Vertical rhythm is fixed and repeated by almost every section: 80px of padding, rising to 112px from `md` (the hero is the exception at 80 → 96 → 112). Section boundaries are drawn by a 1px Hairline Navy bottom border rather than by a change of background, so the page reads as one continuous sheet.

Content grids are shallow: two columns for hero and CTA (`lg:grid-cols-2` / `md:grid-cols-2`), three for service and feature cards, with 12–20px gaps inside a card cluster and 40–64px between the two halves of a split. Everything collapses to a single stacked column below `md`; no layout reflows more than once. Inside cards the spacing ladder is 8 / 10 / 12 / 20 / 28px, and a hairline divider plus 20px of top padding is the standard way to separate a card's claim from its bullet evidence.

The sticky header is 64px tall, `z-50`, white at 70–80% opacity with `backdrop-blur-md`.

### Named Rules

**The 80/112 Rhythm Rule.** Sections are `py-20 md:py-28`. A new section that invents its own vertical padding breaks the page's only consistent measure.

**The Hairline Seam Rule.** Sections are separated by a 1px `#dbe5f1` border, not by alternating background fills. White-on-white with a seam is the default; a tinted or dark section is an event.

## Elevation & Depth

The system is flat at rest and lifts on interaction. Cards sit on the page with a near-invisible contact shadow (`0 1px 2px rgba(15,23,42,0.04)`) or none at all — depth at rest is communicated by the hairline border, not by shading. On hover, interactive cards translate up 2px and receive a long-throw, negative-spread shadow tinted with the ink slate (`rgba(15,23,42,·)`) rather than black, which keeps the shadow reading as cool paper shade rather than grey smudge. The hero's dashboard mockup is the one element elevated at rest, and it is elevated hard (64px blur) to sit it visibly above the sheet.

Atmospheric depth is handled separately from shadow: a `56px` graph-paper grid (`.grid-bg`, ink at 4% opacity) masked to fade out at the bottom 40%, a 300–500px blurred navy bloom bleeding off the hero's top-right corner, and — on dark surfaces — a white grid overlay at 6–7% with a white bloom at 5%. These are texture, not elevation, and they are always `aria-hidden` and `pointer-events-none`.

### Shadow Vocabulary
- **Contact** (`box-shadow: 0 1px 2px rgba(15,23,42,0.04)`): the resting card. Barely visible; keeps a white card from dissolving into a white section.
- **Ambient** (`box-shadow: 0 8px 24px -16px rgba(15,23,42,0.12)`): the most-used shadow in the build. Quiet lift for panels and tiles that are not hover targets.
- **Lift** (`box-shadow: 0 20px 40px -20px rgba(15,23,42,0.18)`): the standard hover shadow for cards and article tiles, paired with `translateY(-2px)`.
- **Lift Inverted** (`box-shadow: 0 24px 48px -20px rgba(15,23,42,0.40)`): hover for dark-surface cards; heavier opacity so the shadow survives against navy.
- **Instrument** (`box-shadow: 0 24px 64px -20px rgba(15,23,42,0.18)`): reserved for the hero dashboard mockup — the only element lifted at rest.

### Named Rules

**The Flat-At-Rest Rule.** Surfaces carry a border, not a shadow, until they are hovered. The exception is the hero instrument, which is elevated by design.

**The Long-Throw Rule.** Shadows are large-blur, negative-spread, low-opacity and slate-tinted (`rgba(15,23,42,α)`). No tight shadow, no black shadow, no offset in x.

## Shapes

Everything is a soft rectangle or a pill. The radius ladder in use is 6px (buttons, small controls) → 8px (`rounded-lg`: icon tiles, inputs, inner panels) → 12px (`rounded-xl`: the default card) → 16px (`rounded-2xl`: the framed hero mockup and the CTA panel), with `9999px` pills for badges, meter tracks, meter fills and the small dot bullets. The shadcn scale derives from `--radius: 0.625rem` (10px), but component code overwhelmingly uses the literal `xl`/`lg` steps rather than the derived ones.

Borders are the primary form device: 1px, `#dbe5f1` on light surfaces, `rgba(255,255,255,0.15–0.20)` on dark ones. Fills are almost always flat white; the two gradients in the system are functional, not decorative — a white → `#f0f4fa`/40% vertical wash inside the hero mockup, and a navy-900 → navy-800 → navy-950 diagonal on the CTA panel.

Recurring silhouettes: the framed instrument (a 8px white padding frame around an inner bordered panel), the 44px rounded-square icon tile, the 6px pill meter, and the 4–6px dot bullet used instead of list markers.

### Named Rules

**The Card Recipe Rule.** The house card is `border-radius: 12px` + `1px solid #dbe5f1` + `background: #fff` + 16px padding rising to 28px at `md`. It repeats in nearly every section, and a new card should be this card before it is anything else.

**The Pill-or-Rectangle Rule.** Corners are either the radius ladder (6/8/12/16px) or fully round. Nothing in between, and nothing square.

## Components

### Buttons
- **Shape:** gently rounded (6px), fixed heights — 44px default and small, 48px large; icon buttons are 44px square. Small does not mean short: the `sm` size only narrows the padding.
- **Primary:** Signal Navy fill, white label, 14px/500, 20px horizontal padding, a `shadow-sm`, and a 16px trailing icon. Hover deepens to Deep Navy, active to Midnight Navy — the emphasis darkens rather than lightens.
- **Outline:** white fill, Edge Navy border, Deep Navy label; on hover the border and label both move to Signal Navy. No fill change.
- **Ghost / Link:** Signal Navy label; ghost takes a Mist Navy wash on hover, link takes an underline at 4px offset. Ghost is the header's secondary action.
- **Secondary:** Mist Navy fill, Midnight Navy label, Hairline Navy on hover — the quietest filled option.
- **Focus:** a 2px ring in the focus colour with a 2px offset, on all variants, via `focus-visible` only.
- **Disabled:** 50% opacity, pointer events off.

### Chips / Badges
- **Style:** full pill, 1px border, 12px/500, 10px horizontal padding. Three variants: solid (Signal Navy on white text), outline (white on Edge Navy border), and soft (Mist Navy fill, Hairline Navy border, Signal Navy text).
- **Use:** soft is the default for the hero's credibility badge and inline qualifiers; solid is used sparingly on dark surfaces with a translucent white override. Category chips on article cards leave the palette (see The Status-Only Colour Rule).

### Cards / Containers
- **Corner Style:** 12px (16px only for the two full-width framed panels).
- **Background:** white; Deep Navy for the inverted variant.
- **Border:** 1px Hairline Navy, moving to Haze Navy on hover.
- **Shadow Strategy:** Contact at rest, Lift on hover with a 2px rise (see Elevation & Depth).
- **Internal Padding:** 16px, rising to 28px at `md`; the shadcn `CardHeader`/`CardContent` slots use a flat 24px.
- **Anatomy:** icon tile or eyebrow row at top → 20px title → compact description → hairline divider → dot-bulleted evidence list → text link with an arrow that nudges on group hover.

### Inputs / Fields
The only form fields in the build live on the dark CTA panel, so the input style is inverted by default: 8px radius, `rgba(255,255,255,0.06)` fill, `rgba(255,255,255,0.15)` border, white 16px text, navy-200 placeholder at 50%. Focus brightens the fill to 10%, the border to 40%, and adds a 2px `rgba(255,255,255,0.20)` ring with no outline. Labels sit above at 12px/500 in navy-100 at 85%. Errors are announced as a `role="alert"` line in rose-200 beneath the fields, not as a border state. The submit button inverts the primary: white fill, Midnight Navy label.

### Navigation
Sticky 64px header, white at 70–80% with `backdrop-blur-md` and a Hairline Navy underline. Wordmark is 17px/600 Midnight Navy with the second word in Signal Navy. Links are 14px/500 in navy-700, moving to Midnight Navy on hover, spaced 32px apart. The right cluster is ghost + primary at `sm` size. Below `md` the links collapse behind a 40px icon toggle into a white panel of full-width 15px rows with a Mist Navy hover wash, closing with a stacked outline + primary pair.

### The Dashboard Instrument (signature)
The hero's right column is a mockup report, and it is the system's signature component. A 16px-radius white frame with 8px padding and the Instrument shadow holds a 12px-radius inner panel bordered in Hairline Navy and washed white → Mist Navy/40%. Inside: a window bar (three 8px Edge Navy dots, a centred 11px report title, a right-aligned respondent count) over a hairline; a three-up row of stat tiles (10px uppercase label, 20px/600 Midnight Navy value, a small navy-700 delta); then two panels of horizontal meters — 6px pill tracks in Mist Navy with fills in Haze Navy for context series and Signal Navy for the emphasised series. It is the one place the system renders data, and its two-tone fill is how the palette encodes emphasis without a second colour. Per PRODUCT.md, the figures it shows are illustrative and must stay legible as such.

## Do's and Don'ts

### Do:
- **Do** build a new surface from navy, white and Muted Slate only. One hue is the system.
- **Do** use the house card recipe first: 12px radius, 1px `#dbe5f1` border, white fill, 16→28px padding.
- **Do** hold the `py-20 md:py-28` section rhythm and separate sections with a 1px `#dbe5f1` bottom border.
- **Do** reserve Signal Navy for the element that carries the decision — one primary button, one emphasised phrase, one filled meter per view.
- **Do** pair every hover lift with the Lift shadow and a 2px rise, and give every interactive element a `focus-visible` ring at 2px offset.
- **Do** keep decorative texture to the established devices: the 56px ink grid at 4%, the masked fade, the blurred navy bloom.
- **Do** invert to the navy gradient panel only where the page asks for commitment.
- **Do** tighten tracking as type grows (`-0.025em` at headline, `-0.04em` at hero) and keep all headings at weight 600.

### Don't:
- **Don't** treat `accent` as a distinct colour — it is a duplicate of `primary` in the current tokens, and any component that assumes a second brand colour will render as if it has none.
- **Don't** reach for `font-display` expecting a second typeface; it resolves to Inter like everything else.
- **Don't** pull emerald, amber, red or violet into persuasive or navigational surfaces. They exist only as untokenised status signals in the assessment result, category chips, error boundary and form feedback.
- **Don't** add new uppercase eyebrow labels above headings. The build carries several; they are not a system rule, and a heading should do its own work.
- **Don't** ship black or tight shadows. Shadows are slate-tinted, large-blur, negative-spread, and appear on hover — not at rest.
- **Don't** separate content with filled bands or alternating background colours where a hairline border and the standard rhythm will do.
- **Don't** introduce a heading weight above 600 or a radius outside the 6/8/12/16px ladder plus full pills.
- **Don't** treat this file as a charter. It records what is shipped as of this scan; the name, palette and typeface are all explicitly open to challenge by a stronger variant.
