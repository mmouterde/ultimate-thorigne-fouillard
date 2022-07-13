const htmlmin = require("html-minifier");
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginTailwindCSS, {
		dest: "docs",
		keepFolderStructure: false,
		minify: true
	});
	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("src/*.png");
	eleventyConfig.addPassthroughCopy("src/*.txt");
	eleventyConfig.addPassthroughCopy("src/*.svg");
	eleventyConfig.addPassthroughCopy("src/*.webmanifest");
	eleventyConfig.addPassthroughCopy("src/*.ico");
	eleventyConfig.addPassthroughCopy("src/*.xml");
	eleventyConfig.addPassthroughCopy("src/documents/*");
	eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
		if (outputPath && outputPath.endsWith(".html")) {
			return htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});
		}
		return content;
	});
	return {pathPrefix: '/'}
};
