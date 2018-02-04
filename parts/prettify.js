const fs = require("fs");
const detect = require("language-classifier");

const langs = {};

fs.readdir("./parts/langs", (e, dir) => {
	if(e) throw e;

	for(const file of dir) {
		const lang = require(`./langs/${file}`);
		for(const alias of lang.aliases) langs[alias] = lang;
	}
});

module.exports = (code, lang = detect(code)) => [lang, langs[lang] && langs[lang].run(code)];