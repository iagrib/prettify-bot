const css = require("css");

module.exports = {
	aliases: ["css"],
	run: c => {
		try {
			return css.stringify(css.parse(c), {inputSourcemaps: false, indent: "\t"});
		} catch(e) {
			return `/* prettify-bot failed to properly prettify this stylesheet!\nthis is most likely because it's invalid */\n\n${c}`;
		}
	}
}