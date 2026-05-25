# CLAUDE.md

Static one-page landing site for **Ally Interiors**. No build step, no framework — open `index.html` in a browser or run `python -m http.server 8080` (required for contact form fetch).

## Files

| File | Responsibility |
|---|---|
| `index.html` | Markup and section structure |
| `style.css` | Styles — CSS custom properties, layout, animations, responsive |
| `script.js` | Behaviour — nine modules inside one `DOMContentLoaded` block |

## CSS

- `:root` defines all design tokens (colors, font sizes, spacing, transitions)
- `[data-theme="dark"]` overrides color tokens only
- Breakpoints: `max-width` 1024px / 768px / 480px
- BEM-like naming; use existing CSS variables, no hardcoded values
- Sections numbered `/* 1. ... */` through `/* 20. ... */`

## JS Modules

1. **Navbar** — `.navbar--scrolled` on scroll; hamburger → `navbar__links--open`
2. **Scroll Reveal** — `IntersectionObserver` adds `.visible` to `.reveal` elements
3. **Portfolio Filter** — filter buttons + `data-filter`; opacity/scale → `display:none`
4. **Carousel** — `translateX` track; 1/2/3 slides responsive; autoplay, pause-on-hover
5. **Contact Form** — `fetch POST` to FormSubmit; field-level `validators` object
6. **Lightbox** — click delegation on `#portfolioGrid`; `w=600→1200` swap; ←/→/Esc nav
7. **Dark Mode** — `data-theme` on `<html>`; persisted as `Ally-theme` in localStorage
8. **Counter** — RAF ease-out cubic; triggered once by `IntersectionObserver`
9. **Back to Top / Smooth Scroll** — scroll offset accounts for `navbar.offsetHeight`

## Images

Unsplash URLs: `https://images.unsplash.com/photo-{ID}?w={width}&q=80&auto=format&fit=crop`. Grid uses `w=600`; lightbox swaps to `w=1200`. Hero is a CSS `background-image` with `<link rel="preload">`.

## Contact Form

POSTs JSON to `https://formsubmit.co/ajax/yipchunkit2000@gmail.com`. First live submission triggers a one-time activation email — recipient must click it before submissions are delivered.
