// For 'xml', the same beautifier module/settings are used as for html
// But because of a different file extension ('.xml'), it's in a separate file

const prettify = require("html-beautify");

module.exports = {
	aliases: ["xml"],
	prettify: c => [true, prettify(c)],
	extension: ".xml",
	comment: "<!-- Uploaded with ❤ by prettify-bot -->"
}