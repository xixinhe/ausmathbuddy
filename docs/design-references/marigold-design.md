## Overview

Source: a warm, illustrated kids-education landing page (user-supplied reference image, `dribbble_kids_education.webp`). This audit extracts its visual language into reusable tokens under the internal codename **Marigold** — chosen for the saturated marigold-yellow canvas that carries the whole page. Where the source used a specific product name and tagline, this write-up substitutes generic placeholders; only the visual system (color, type, shape, layout) is transcribed.

The page reads as warm and hand-friendly rather than corporate: a single saturated yellow canvas, a deep olive-brown for ink and dark card fills, one confident orange for numbers and emphasis, and a rounded, extra-bold display face set in tight-tracked capitals. Cards are large, flat, and unbordered — color-blocking does the separating, not lines or shadows. Small white "sticker" badges (rounded squares with a colorful icon) float over the hero photo with a soft warm shadow, the one place elevation appears at all.

**Key Characteristics:**
- A single saturated yellow canvas (`{colors.canvas}`) with a paler yellow wash (`{colors.canvas-soft}`) used behind photography.
- Deep olive-brown ink (`{colors.ink}`) doubles as both text color and a solid dark card fill — the same hue carries type and surface.
- One orange accent (`{colors.accent-orange}`) is reserved for numbers and the one text-link CTA; it never appears as a filled button.
- Display type is a rounded, heavy-weight geometric face set in tight all-caps — the opposite of the thin, tracked-out mono labels a "tech" system would use.
- Cards are flat color blocks with large radii and no borders or shadows; the only shadow in the system lifts small sticker badges off the hero photo.
- Primary CTA is an underlined text link, not a button — restraint is the signature, the same way the pill button was xAI's.

## Colors

### Brand & Accent
- **Marigold** (`{colors.canvas}` — `#F4C43A`): the page's only background — saturated, warm, and covers the full hero.
- **Marigold Soft** (`{colors.canvas-soft}` — `#F8DA7B`): a paler wash used behind photography and secondary panels.
- **Accent Orange** (`{colors.accent-orange}` — `#E8720C`): stat numbers, the CTA link, and one solid decorative shape. The system's single confident accent.
- **Accent Coral** (`{colors.accent-coral}` — `#DD4B3E`): secondary accent inside sticker-badge icons.
- **Accent Mint** (`{colors.accent-mint}` — `#7FD8B8`): tertiary accent, used sparingly inside icons and small decorative details.

### Surface & Ink
- **Ink** (`{colors.ink}` — `#3B3116`): headline color, and — reused verbatim — the fill for dark stat cards. One hue serves both roles.
- **Ink Soft** (`{colors.ink-soft}` — `#6B5A33`): secondary/body text set on the yellow canvas.
- **Body on Dark** (`{colors.body-on-dark}` — `#EDE6D2`): warm off-white text set on ink-brown card fills.
- **Surface** (`{colors.surface}` — `#FFFFFF`): white cards and sticker badges — the only cool-neutral in the system.

### Semantic
No distinct semantic palette is visible on the source page; the system doesn't appear to need one.

## Typography

### Font Family
Two faces, doing very different jobs than a tech-brand pairing:
1. **Fredoka** (open-source stand-in for the source's rounded extra-bold display face) — every headline and stat number. Heavy weight, rounded terminals, set in tight-tracked capitals.
2. **Inter** — body copy, navigation, captions. Plain and legible; it never competes with the display face.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 72px | 700 | 76px | -0.5px | Hero headline (all caps). |
| `{typography.display-lg}` | 48px | 700 | 52px | -0.3px | Section headlines. |
| `{typography.display-md}` | 32px | 600 | 36px | 0 | Card-cluster headings. |
| `{typography.stat}` | 40px | 700 | 40px | 0 | Big stat numbers ("50+"). |
| `{typography.body-lg}` | 18px | 400 | 28px | 0 | Hero subhead. |
| `{typography.body-md}` | 16px | 400 | 24px | 0 | Default body. |
| `{typography.body-sm}` | 14px | 400 | 20px | 0 | Nav links, captions, stat labels. |
| `{typography.label}` | 14px | 600 | 20px | 0 | Card headings, emphasis text. |

### Principles
- **Weight carries hierarchy, not tracking.** Unlike a tracked-mono-label system, this one leans on Fredoka's own heaviness — normal case, not uppercase, almost everywhere.
- **All-caps is reserved for the hero headline only.** Section headers and card titles stay sentence case.
- **Numbers are display type.** Stat figures ("50+", "500+") are set in the display face at near-headline weight, not in body type.

### Note on Font Substitutes
The source's display face is a proprietary/unidentified rounded grotesk. **Fredoka** (700) is the closest open-source match — same rounded terminals, similar heavy weight. **Inter** substitutes for the body face.

## Layout

### Spacing System
- **Base unit**: 4px.
- **Tokens**: `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.2xl}` 32px · `{spacing.3xl}` 48px · `{spacing.4xl}` 64px.
- **Hero padding**: `{spacing.4xl}` 64px on desktop.
- **Card interior padding**: `{spacing.xl}` 24px.

### Grid & Container
- Hero splits into three columns: a stat-card stack, a central photo, a second stat-card stack — roughly 1:2:1.
- Content max-width ~1200px, centered.

### Responsive Strategy
- Below 768px: hero stacks to a single column (headline → photo → stacked cards); display-xl drops toward 40px.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 12px | Inputs, small chips. |
| `{rounded.lg}` | 28px | Cards — the system's signature radius. |
| `{rounded.badge}` | 18px | Small sticker-badge icons. |
| `{rounded.full}` | 9999px | Avatars, the logo mark. |

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No shadow, no border. | Default — every stat card and content card. |
| Level 1 — Float | `0 10px 24px rgba(59,49,22,0.16)` | Sticker badges floating over the hero photo only. |

Nearly everything is flat; the one soft shadow is reserved for elements that are meant to read as physically layered on top of the photo.

## Components

### Buttons & Links

**`link-cta`** — the system's only call-to-action style: an underlined text link in `{colors.accent-orange}` or `{colors.ink}`, `{typography.label}` weight. No button chrome, no fill, no border.

### Cards

**`stat-card-dark`** — ink-brown fill, `{colors.body-on-dark}` text, `{rounded.lg}` radius, no border, no shadow, `{spacing.xl}` padding.

**`stat-card-light`** — white fill, `{colors.ink}` number in `{typography.stat}`, `{colors.ink-soft}` caption, same shape/padding as the dark variant.

### Sticker Badges

**`icon-badge`** — small `{rounded.badge}` white square, centered icon in one accent color, `Level 1 — Float` shadow. Sits directly on top of photography, slightly overlapping its edge.

### Navigation

**`nav-bar`** — transparent over canvas, logo mark + wordmark left, plain-text links center, no button chrome.

### Avatars

**`avatar-stack`** — overlapping circular avatars (`{rounded.full}`), each with a 2px white ring border, used to represent a headcount stat.

## Do's and Don'ts

### Do
- Keep the canvas a single saturated yellow — this system doesn't have a neutral-gray background mode.
- Set the hero headline in the display face at full weight, all caps, tight tracking. Let the weight do the shouting, not the size alone.
- Reuse the same ink-brown for both text and dark card fills — don't introduce a second "near-black" for cards.
- Keep the primary CTA an underlined text link. Adding a filled button competes with the sticker badges for attention.
- Reserve the soft float shadow for elements meant to look physically layered over photography — not for ordinary cards.

### Don't
- Don't add uppercase tracked mono labels — this system's voice is rounded and warm, not technical.
- Don't put a border on cards. Flat color blocking is the separator.
- Don't scale the accent orange down to a muted/desaturated version for "professional" contexts — the confidence of the single bright accent is the point.
- Don't stack more than one shadow level — the system only has "flat" and "float."
- Don't set body copy in the display face. Fredoka is for headlines and stat numbers only.
