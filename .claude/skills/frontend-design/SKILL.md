---
name: frontend-design
description: Apply Oriental Zen interior design aesthetic to the Ally Interiors site — jade green and sky blue palette, wabi-sabi principles, natural typography, and mindful negative space. Use when restyling sections, adding components, or refining the visual language of index.html / style.css.
---

# Frontend Design — Oriental Zen Style

This skill governs all visual design decisions for Ally Interiors. Every UI change must honour the Zen philosophy: restraint, natural harmony, and the beauty of empty space (*ma*).

## Design Philosophy

| Principle | Meaning | Applied as |
|---|---|---|
| **Ma** (間) | Negative space as an element | Generous padding; never crowd content |
| **Wabi-sabi** (侘寂) | Beauty in imperfection, impermanence | Organic shapes, soft gradients, no harsh edges |
| **Kanso** (簡素) | Simplicity and elimination of clutter | One typeface pairing; minimal decoration |
| **Serenity** | Calm, unhurried feeling | Slow transitions (0.5 s+); muted motion |

---

## Color Palette

All values map to the `:root` CSS custom properties in `style.css`. Always use variables — never hardcode hex values.

### Greens (earth, bamboo, jade)
| Token | Hex | Use |
|---|---|---|
| `--color-jade` | `#4A7C59` | Primary accent, CTA buttons, active states |
| `--color-sage` | `#8FAE8B` | Section backgrounds, hover fills |
| `--color-bamboo` | `#B5BD89` | Borders, dividers, subtle highlights |
| `--color-moss` | `#2E5440` | Dark headings, footer background |

### Sky Blues (water, sky, mist)
| Token | Hex | Use |
|---|---|---|
| `--color-sky` | `#87CEEB` | Secondary accent, links, icon fills |
| `--color-cerulean` | `#5B8DB8` | Hover state for sky, active links |
| `--color-mist` | `#C9DDE8` | Light section tints, card backgrounds |
| `--color-deep-water` | `#2A4B6E` | Dark mode sky accent |

### Neutrals (rice paper, stone, ink)
| Token | Hex | Use |
|---|---|---|
| `--color-rice` | `#F7F3EC` | Page background (light mode) |
| `--color-stone` | `#D4C5B0` | Secondary text, placeholder |
| `--color-ink` | `#1C1E1A` | Body text, dark mode background |
| `--color-parchment` | `#EDE8DF` | Card surfaces, form backgrounds |

### Dark Mode overrides
Dark mode (`[data-theme="dark"]`) replaces backgrounds with ink tones and shifts greens to their deeper variants. Blues shift to `--color-deep-water`. Text becomes rice-paper.

---

## Typography

```
Headings : "Cormorant Garamond", "Noto Serif", Georgia, serif
            — weight 300 / 400; wide letter-spacing (0.08 em)
Body      : "DM Sans", "Noto Sans", system-ui, sans-serif
            — weight 300; line-height 1.8
Accent    : "Zen Antique Soft" (Google Fonts, for pull-quotes or section labels)
```

- Import via `<link>` in `index.html` — no build step.
- Headings use `font-weight: 300` to stay light and meditative.
- All-caps labels: `letter-spacing: 0.2em`, `font-size: 0.75rem`.

---

## Layout & Composition

- **Horizontal calm**: prefer wide, low sections over tall stacked ones.
- **Asymmetric balance**: text left + image right (or vice versa) — never perfectly centred on both axes.
- **Ikebana grid**: use CSS Grid with intentional empty cells; a 12-column grid where content occupies 7–8 columns.
- **Border radius**: `4px` maximum — no pill buttons; corners are nearly square like shoji panels.
- **Shadows**: `box-shadow: 0 2px 12px rgba(46, 84, 64, 0.08)` (jade-tinted, very soft).

---

## Motion & Interaction

```css
/* Zen transition — slow, deliberate */
transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover lift — subtle, not bouncy */
transform: translateY(-3px);
```

- No bounce, no spring. Ease-in-out only.
- Scroll reveals: fade + 20 px upward drift (not 40 px — keep motion minimal).
- Autoplay carousel: 5 s interval minimum; pause on hover always.

---

## Decorative Elements

Use sparingly — Zen means restraint:

- **Thin horizontal rules**: `1px solid var(--color-bamboo); opacity: 0.4`
- **Section watermarks**: faint SVG of bamboo, lotus, or brushstroke at 4 % opacity in background.
- **Image treatment**: slight sepia/green-tint CSS filter on portfolio images to unify the palette.

```css
.portfolio__img { filter: sepia(15%) hue-rotate(60deg) saturate(90%); }
.portfolio__img:hover { filter: none; transition: filter 0.5s ease; }
```

---

## How to Apply This Skill

1. **Restyle a section** — read the relevant CSS section (numbered comments in `style.css`), replace color references with the palette tokens above, update fonts.
2. **Add a new component** — follow layout rules (asymmetric, wide, low), use jade as the primary accent, sky blue as secondary.
3. **Dark mode** — always test both `[data-theme="light"]` and `[data-theme="dark"]`; ensure contrast meets WCAG AA (4.5:1 for text).
4. **Images** — use Unsplash photos of bamboo forests, Japanese gardens, stone paths, still water, shoji screens; keep `w=600` for grid, `w=1200` for lightbox.
5. **Copy tone** — short, unhurried sentences. No exclamation marks. Evoke stillness.

---

## Quick Reference — CSS Token Block

Paste this into `:root` in `style.css` to adopt the full palette:

```css
/* Oriental Zen palette */
--color-jade:       #4A7C59;
--color-sage:       #8FAE8B;
--color-bamboo:     #B5BD89;
--color-moss:       #2E5440;
--color-sky:        #87CEEB;
--color-cerulean:   #5B8DB8;
--color-mist:       #C9DDE8;
--color-deep-water: #2A4B6E;
--color-rice:       #F7F3EC;
--color-stone:      #D4C5B0;
--color-ink:        #1C1E1A;
--color-parchment:  #EDE8DF;
```
