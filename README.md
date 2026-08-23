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
├── _data/            # site content
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

Append an object to `src/_data/publications.json`. Entries are grouped by year.

| Field | Notes |
| --- | --- |
| `authors` | `[{ "family": "Chan", "given": "KM", "lab": true, "corresponding": true }]`. Initials may be written `KM` or `K. M.` both render `K. M.` `lab` bolds a lab member; `corresponding` adds a superscript `#`. Use `literal` instead of `family`/`given` for group authors. All authors are listed. |
| `journal` | Spelled out in full. |
| `doi` | Builds the title link. |
| `url` | Overrides the DOI link on the title. |
| `date`, `volume`, `issue`, `pages` | Recorded but not displayed. |

### Members

Append to a group's `people` array in `src/_data/members.json`, or add a group
object for a new section. Each group takes one of three shapes:

- **Default**: portrait with a `Joined <year>` caption, name,
  social icons and biography.
- **`"layout": "grid"`**: compact cards four to a row, for former members.
- **Empty `people` array**: reserves blank space under the heading.

### Research

Append to `topics` in `src/_data/research.json`. Each object needs a `title`, a
`paragraphs` array, and optionally `image` and `alt`.

## License

The source code falls under the MIT license — see [LICENSE](LICENSE). Images, photographs,
logos, figures and font files are **excluded** from that grant and remain the
property of their respective owners. IBM Plex is under the SIL Open Font License, included at
[src/assets/fonts/LICENSE.txt](src/assets/fonts/LICENSE.txt).