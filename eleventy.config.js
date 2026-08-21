import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

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
