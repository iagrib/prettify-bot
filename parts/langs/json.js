module.exports = {
	aliases: ["json"],
	prettify: c => {
		try {
			return JSON.stringify(JSON.parse(c), null, "\t");
		} catch(e) {
			return `// prettify-bot failed to properly prettify this json!\n// this is most likely because it's invalid\n\n${c}`;
		}
	},
	extension: ".json"
}