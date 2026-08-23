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
├── _data/            # site content — edit these, not the templates
│   ├── site.json         # lab name, nav, repo link
│   ├── publications.json # one object per paper
│   ├── members.json      # member groups
│   └── research.json     # research directions
├── _includes/layouts/base.njk   # shared shell: head, nav, hero, footer
├── css/style.css     # design tokens, @font-face, all styles
├── js/nav.js         # mobile nav toggle
├── assets/           # images, logos, self-hosted fonts
└── *.njk             # one file per page
```

## Adding content

### Publications

Append an object to `src/_data/publications.json`. Entries render as a title
linking to its DOI with an APA 7 citation beneath, grouped by year — newest year
first, and within a year in the order listed in the file.

| Field | Notes |
| --- | --- |
| `authors` | `[{ "family": "Chan", "given": "KM", "lab": true, "corresponding": true }]`. Initials may be written `KM` or `K. M.` — both render `K. M.` `lab` bolds a lab member; `corresponding` adds a superscript `#`. Use `literal` instead of `family`/`given` for group authors. All authors are listed, however many. |
| `journal` | Spelled out in full. |
| `doi` | Builds the title link. |
| `url` | Overrides the DOI link on the title. |
| `date`, `volume`, `issue`, `pages` | Recorded but not displayed. |

### Members

Append to a group's `people` array in `src/_data/members.json`, or add a group
object for a new section. Each group takes one of three shapes:

- **Default** — full entries: portrait with a `Joined <year>` caption, name,
  social icons and biography.
- **`"layout": "grid"`** — compact cards four to a row, for former members.
- **Empty `people` array** — reserves blank space under the heading.

Every field but `name` is optional and is skipped when absent, including the
whole social icon row. Icons support `github`, `scholar`, `linkedin` and `email`.

### Research

Append to `topics` in `src/_data/research.json`. Each object needs a `title`, a
`paragraphs` array (one entry per paragraph), and optionally `image` and `alt`.

## Notes

**Fonts** are self-hosted in `src/assets/fonts/` so no third-party request
blocks first paint. Paths in `style.css` are relative to the stylesheet —
Eleventy's base plugin rewrites URLs in HTML but not CSS, so absolute paths
would break under a project page's `/repo-name/` prefix.

**Page transitions** use the cross-document View Transitions API. Browsers
without support navigate normally.

## License

The source code is MIT licensed — see [LICENSE](LICENSE). Images, photographs,
logos, figures and font files are **excluded** from that grant and remain the
property of their respective owners; reusing this codebase means substituting
your own. IBM Plex is under the SIL Open Font License, included at
[src/assets/fonts/LICENSE.txt](src/assets/fonts/LICENSE.txt).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with the
correct base path for a project page (`/repo-name/`) or a custom domain (`/`) —
the prefix comes from GitHub's `configure-pages` action, so no code changes are
needed if a custom domain is added later. In the repo settings, set
**Pages → Source → GitHub Actions**.
