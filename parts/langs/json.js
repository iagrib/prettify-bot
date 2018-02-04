module.exports = {
	aliases: ["json"],
	run: c => {
		try {
			return JSON.stringify(JSON.parse(c), null, "\t");
		} catch(e) {
			return `// prettify-bot couldn't prettify this json!\n// this is most likely because it's invalid\n\n${c}`;
		}
	}
}