export default function (eleventyConfig) {
  // 1) Passthrough static assets (your current CSS/JS/images)
  eleventyConfig.addPassthroughCopy({ "src/assets": "/" });
  // That maps: src/assets/** → /** in _site
  // e.g. /CSS/global.css stays /CSS/global.css

  // 2) Enable the built-in Bundle plugin for minimal CSS/JS bundling
  eleventyConfig.addBundle("css"); // {% css %} … {% endcss %}
  eleventyConfig.addBundle("js"); // {% js %} … {% endjs %}

  // 3) Set input/output dirs
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "_site",
    },
  };
}
