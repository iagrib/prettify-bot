const {js_beautify: prettify} = require("js-beautify");

module.exports = {
	aliases: ["javascript", "js"],
	prettify: c => [true, prettify(c)],
	extension: ".js"
}