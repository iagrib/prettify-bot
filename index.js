const Discord = require("discord.js");
const bot = new Discord.Client;

const prettify = require("./parts/prettify");
const hastebin = require("./parts/hastebin");
const resolveLang = require("./parts/resolveLang");
const commands = require("./parts/commands");

const {token} = require("./parts/token");

bot.on("ready", () => {
	console.log("Connected.");
	bot.user.setPresence({game: {name: "@mention info"}});
});

bot.on("message", msg => {
	if(!msg.mentions.users.has(bot.user.id) || msg.author.bot) return;

	const promises = [];
	const regex = /```(?:(\S*?)\n)?([^]*?)?```/g;
	for(let match; match = regex.exec(msg.content);) {
		const [lang, prettified] = prettify(match[2], match[1] && match[1].toLowerCase());
		promises.push(hastebin(`${prettified || match[2]}\n\n// Uploaded with ❤ by prettify-bot`).then(link => [!!prettified, `${link}${resolveLang(lang)}`]));
	}

	Promise.all(promises).then(arr => {
		if(!arr.length) { // No codeblocks found. Has the bot been mentioned for something else?
			const cmd = msg.content.toLowerCase().match(RegExp(`^<@!?${bot.user.id}>\\s*(\\w*)`));
			if(cmd) commands(cmd[1], msg);
		} else {
			const some = arr.some(e => e[0]);
			msg.reply(`${some ? "I prettified your code and" : "Unfortunately I couldn't prettify your code, but I"} uploaded it to hastebin!

${arr.map(d => `${d[1]}${some && !d[0] && " (failed to prettify this one, sorry!)" || ""}`).join("\n")}

React with ❎ to remove this message.
Say \`[@mention] info\` to find out more about this bot.`).then(m => m.react("❎").then(br => m.createReactionCollector((r, u) => u.id === msg.author.id && r.emoji.name === "❎", {time: 10000}).on("collect", m.delete.bind(m)).on("end", () => br.remove())));
		}
	}).catch(e => {
		console.error(e);

		msg.reply("Sorry, something went wrong. Couldn't upload your code!");
	});
});

bot.login(token);