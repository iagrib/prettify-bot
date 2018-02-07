const prettify = require("html-beautify");

module.exports = {
	aliases: ["html"],
	prettify: c => [true, prettify(c)],
	extension: ".html",
	comment: "<!-- Uploaded with ❤ by prettify-bot -->"
}