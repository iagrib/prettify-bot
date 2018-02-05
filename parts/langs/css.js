const css = require("css");

module.exports = {
	aliases: ["css"],
	prettify: c => {
		try {
			return [true, css.stringify(css.parse(c), {inputSourcemaps: false, indent: "\t"})];
		} catch(e) {
			return [false, `/* prettify-bot failed to prettify this stylesheet!\nthis is most likely because it's invalid */\n\n${c}`];
		}
	},
	extension: ".css",
	comment: "/* Uploaded with ❤ by prettify-bot */"
}