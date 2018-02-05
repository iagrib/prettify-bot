module.exports = {
	aliases: ["json"],
	prettify: c => {
		try {
			return [true, JSON.stringify(JSON.parse(c), null, "\t")];
		} catch(e) {
			return [false, `// prettify-bot failed to prettify this json!\n// this is most likely because it's invalid\n\n${c}`];
		}
	},
	extension: ".json"
}