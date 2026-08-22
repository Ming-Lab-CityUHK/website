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

**New paper** → append an object to `src/_data/publications.json`. Each entry
renders as a title linking to its DOI, with an APA 7 citation beneath it,
grouped under the right year automatically. Years run newest first; within a
year, papers appear in the order they are listed in the file.

| Field | Notes |
| --- | --- |
| `authors` | `[{ "family": "Chan", "given": "KM", "lab": true, "corresponding": true }]`. Initials may be written `KM` or `K. M.` — both render `K. M.` `lab` bolds a lab member; `corresponding` adds a superscript `#`. Use `literal` instead of `family`/`given` for group authors. |
| `journal` | Spelled out in full, as APA 7 expects. |
| `doi` | Builds the title link. |
| `url` | Overrides the DOI link on the title. |
| `thumbnail` | Path under `/assets/`; blank shows a placeholder. |
| `date`, `volume`, `issue`, `pages` | Recorded but not currently displayed. |

All authors are always listed. APA 7 would shorten lists of 21+ to the first
19 plus the last author, which would hide lab members on large
collaborations, so that rule is deliberately not applied.

**New member** → append an object to `src/_data/members.json`. Note the Members
page does not read this file yet; the schema is a stub for a later pass.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with the
correct base path for a project page (`/repo-name/`) or a custom domain (`/`) —
the prefix comes from GitHub's `configure-pages` action, so no code changes are
needed if a custom domain is added later. In the repo settings, set
**Pages → Source → GitHub Actions**.
