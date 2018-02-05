const {formatText: prettify} = require("lua-fmt");

module.exports = {
	aliases: ["lua"],
	prettify: c => {
		try {
			return [true, prettify(c)];
		} catch(e) {
			return [false, `--[[ prettify-bot failed to prettify your code!\nthis is most likely because it's invalid  ]]\n\n${c}`];
		}
	},
	extension: ".lua",
	comment: "-- Uploaded with ❤ by prettify-bot"
}