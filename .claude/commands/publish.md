# /publish — Publish Ally Interiors to GitHub Pages

Follow these steps in order. Stop and report to the user if any step fails.

---

## Step 1 — Security scan

Search every file tracked by git (`index.html`, `style.css`, `script.js`) for:
- Hardcoded passwords or tokens
- Private API keys
- Real email addresses that could be scraped (e.g. the FormSubmit endpoint in script.js)

Report every finding with the file and line number. Ask the user whether to continue for each sensitive item before proceeding. Note: the FormSubmit endpoint `https://formsubmit.co/ajax/yipchunkit2000@gmail.com` is intentionally public (required for the contact form), but flag it so the user is aware it will be visible in the public repo. Do NOT proceed past this step without the user's explicit confirmation.

---

## Step 2 — Create README.md

Write a `README.md` in the repo root that matches the **sophisticated, minimalist luxury** aesthetic of the Ally Interiors site. Follow this structure exactly:

```
<div align="center">

# Ally Interiors

*Designing Spaces That Inspire*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-c9a96e?style=for-the-badge)](https://ianyip2207.github.io/booking/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

A single-page portfolio site for a luxury interior design studio — crafted with pure HTML, CSS, and vanilla JavaScript. No frameworks. No build step. Just refined, purposeful code.

## Features

- **Filterable Portfolio Gallery** — filter projects by room type with smooth opacity/scale transitions
- **Testimonial Carousel** — autoplay with pause-on-hover, responsive slide counts, and dot navigation
- **Lightbox** — full-resolution image viewer with keyboard (←/→/Esc) and click navigation
- **Contact Form** — client-side validation with field-level error messages, POSTs via FormSubmit
- **Dark Mode** — `data-theme` toggle persisted in `localStorage`
- **Scroll Animations** — `IntersectionObserver`-driven reveal on `.reveal` elements
- **Animated Counters** — RAF ease-out cubic, triggered once on viewport entry
- **Fully Responsive** — three breakpoints (1024px / 768px / 480px), mobile hamburger nav
- **Accessible** — ARIA labels, live regions, keyboard-navigable lightbox and carousel

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 — custom properties, BEM-like naming, no preprocessor |
| Behaviour | Vanilla ES6+ — nine self-contained modules in one `DOMContentLoaded` block |
| Fonts | Cormorant Garamond + Jost (Google Fonts) |
| Images | Unsplash CDN |
| Form | FormSubmit (no backend required) |
| Deploy | GitHub Pages via GitHub Actions |

## Project Structure

```
booking/
├── index.html      # Markup and section structure
├── style.css       # Design tokens, layout, animations, responsive
└── script.js       # Nine behaviour modules
```

## Running Locally

```bash
# Clone
git clone https://github.com/ianyip2207/booking.git
cd booking

# Serve (required for contact form fetch)
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

> Opening `index.html` directly works for all features except the contact form, which requires a server origin for the `fetch` POST.

## Contact Form Setup

The form posts to [FormSubmit](https://formsubmit.co). On the **first live submission**, FormSubmit sends an activation email to the configured address — click the link in that email before submissions are delivered.

## License

© 2026 Ally Interiors. All rights reserved.
```

Write the file exactly as shown. Adjust any wording that does not match the actual site content, but keep the elegant, minimal tone throughout.

---

## Step 3 — Create GitHub Actions workflow

Create the file `.github/workflows/pages.yml` with this exact content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Step 4 — Commit and push

Stage all changes (README.md, .github/workflows/pages.yml, and any other modified tracked files). Before committing, do a final check that no secrets or credentials have been accidentally added since Step 1.

Commit with the message:
```
docs: add README and GitHub Pages deployment workflow
```

Push to `origin main`.

If the push fails (e.g. diverged history), report the error and do NOT force-push. Ask the user how to proceed.

---

## Step 5 — Update repository About

Use the GitHub CLI (`gh`) to update the repository description and website URL:

```bash
gh repo edit ianyip2207/booking \
  --description "Ally Interiors — Luxury interior design studio portfolio. Pure HTML/CSS/JS, no framework." \
  --homepage "https://ianyip2207.github.io/booking/"
```

If `gh` is not installed or the user is not authenticated, skip this step and tell the user to update the repo About manually:
- **Description:** Ally Interiors — Luxury interior design studio portfolio. Pure HTML/CSS/JS, no framework.
- **Website:** https://ianyip2207.github.io/booking/

---

## Step 6 — Summary

Report back:
- Which files were created or changed
- The push status (commit SHA if successful)
- Whether the repo About was updated or needs manual attention
- Reminder: GitHub Pages may take 1–2 minutes to go live after the Actions workflow completes
- Direct link: https://ianyip2207.github.io/booking/
