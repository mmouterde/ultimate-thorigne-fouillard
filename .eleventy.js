const { promisify } = require("node:util");
const execFile = promisify(require("node:child_process").execFile);
const { minify } = require('html-minifier-terser');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("src/*.png");
	eleventyConfig.addPassthroughCopy("src/*.txt");
	eleventyConfig.addPassthroughCopy("src/*.svg");
	eleventyConfig.addPassthroughCopy("src/*.webmanifest");
	eleventyConfig.addPassthroughCopy("src/*.ico");
	eleventyConfig.addPassthroughCopy("src/*.xml");
	eleventyConfig.addPassthroughCopy("src/documents/*");
	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addExtension(
		"css",
		{
			outputFileExtension: "css",
			compile: async function(inputContent, inputPath) {
				const { stdout } = await execFile("tailwindcss", ["--input", inputPath], {timeout: 3000});
				return async () => stdout
			},
		}
	);
	eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
		if (outputPath && outputPath.endsWith(".html")) {
			return minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
		}
		return content;
	});
	return {pathPrefix: '/'}
};
