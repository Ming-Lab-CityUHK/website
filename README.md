# Ming Lab Website

Static site for the Ming Lab, built with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages via GitHub Actions.

## Local development

```
npm install
npm start        # dev server at http://localhost:8080
npm run build    # one-off build into _site/
```

## Structure

```
src/
├── _data/            # structured content — edit these, not the templates
│   ├── site.json         # lab name, university, nav
│   ├── publications.json # one object per paper (grouped by year at render)
│   └── members.json      # PI + lab members
├── _includes/layouts/base.njk   # shared shell: head, nav, footer
├── css/style.css     # design tokens + styles
├── js/nav.js         # mobile nav toggle
├── assets/           # images, figures, logos
└── *.njk             # one file per page (Home, Research, Publications, Members, Contact)
```

## Adding content

- **New paper** → append an object to `src/_data/publications.json`.
- **New member** → append an object to `src/_data/members.json`.
- Templates render these automatically; no HTML edits needed.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with the
correct base path for a project page (`/repo-name/`) or a custom domain (`/`) —
the prefix comes from GitHub's `configure-pages` action, so no code changes are
needed if a custom domain is added later. In the repo settings, set
**Pages → Source → GitHub Actions**.
