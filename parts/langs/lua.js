const {formatText: prettify} = require("lua-fmt");

module.exports = {
	aliases: ["lua"],
	prettify: c => {
		try {
			return prettify(c);
		} catch(e) {
			return `--[[ prettify-bot failed to properly prettify your code!\nthis is most likely because it's invalid  ]]\n\n${c}`;
		}
	},
	extension: ".lua",
	comment: "-- Uploaded with ❤ by prettify-bot"
}