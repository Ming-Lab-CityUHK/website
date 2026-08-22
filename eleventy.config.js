import { HtmlBasePlugin } from "@11ty/eleventy";

/* ---------- APA 7 citation helpers ---------- */

// "Gregory P." -> "G. P.", "KM" -> "K. M.", "Jean-Luc" -> "J.-L."
function toInitials(given) {
  if (!given) return "";
  return given
    .trim()
    .split(/\s+/)
    // A run of capitals with no periods ("KM", "YCE") is already initials.
    .flatMap((part) => (/^[A-Z]{2,}$/.test(part) ? part.split("") : [part]))
    .map((part) =>
      part
        .split("-")
        .filter(Boolean)
        .map((seg) => seg[0].toUpperCase() + ".")
        .join("-")
    )
    .join(" ");
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]
  );
}

function formatAuthor(author) {
  // `literal` covers group/consortium authors, which take no initials.
  const name = author.literal
    ? author.literal
    : [author.family, toInitials(author.given)].filter(Boolean).join(", ");
  const safe = escapeHtml(name);
  // The marker sits outside the bold so it stays the same weight as the text.
  const styled = author.lab
    ? `<strong class="pub-lab-author">${safe}</strong>`
    : safe;
  return author.corresponding
    ? `${styled}<sup class="pub-corresponding">#</sup>`
    : styled;
}

// Every author is named. APA 7 would abbreviate lists of 21+ to the first
// 19, an ellipsis, then the last author, but that hides lab members on
// large collaborations, so the rule is deliberately not applied.
function apaAuthors(authors = []) {
  const names = authors.map(formatAuthor);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]}, &amp; ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, &amp; ${names[names.length - 1]}`;
}

// Newest year first. Within a year, papers keep the order they appear in
// publications.json.
function byYear(papers = []) {
  const groups = new Map();
  for (const paper of papers) {
    const year =
      paper.year ?? (paper.date ? Number(String(paper.date).slice(0, 4)) : 0);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(paper);
  }
  return [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }));
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("apaAuthors", apaAuthors);
  eleventyConfig.addFilter("byYear", byYear);

  // Rewrites root-relative URLs to honor --pathprefix, so the same
  // templates work at /repo-name/ (project page) and / (custom domain).
  eleventyConfig.addPlugin(HtmlBasePlugin);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
