const Discord = require("discord.js");
const bot = new Discord.Client;

const langs = require("./parts/langs");
const hastebin = require("./parts/hastebin");
const commands = require("./parts/commands");

const {token} = require("./parts/token");

bot.on("ready", () => {
	console.log(`Connected and ready to serve ${bot.guilds.size} guilds.`);
	bot.user.setPresence({game: {name: "[@mention] info"}});
});

bot.on("message", msg => {
	if(!msg.mentions.users.has(bot.user.id) || msg.author.bot || !msg.channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) return;

	msg.channel.startTyping();

	const promises = [];
	const regex = /```(?:(\S*?)\n)?([^]*?)?```/g;
	for(let match; match = regex.exec(msg.content);) {
		const [lang, prettified] = langs.prettify(match[2], match[1] && match[1].toLowerCase());
		promises.push(hastebin(`${prettified ? prettified[1] : match[2]}\n\n${langs.comment(lang)}`).then(link => [prettified && prettified[0], `${link}${langs.extension(lang)}`]));
	}

	Promise.all(promises).then(arr => {
		if(!arr.length) { // No codeblocks found. Has the bot been mentioned for something else?
			const cmd = msg.content.toLowerCase().match(new RegExp(`^<@!?${bot.user.id}>\\s*(\\w*)`));
			if(cmd) commands(cmd[1], msg);
		} else {
			const some = arr.some(e => e[0]);
			const reply = `<@${msg.author.id}> ${some ? "I prettified your code and" : "Unfortunately I couldn't prettify your code, but I"} uploaded it to hastebin!\n\n${arr.map(d => `${d[1]}${some && !d[0] && " (couldn't prettify this one, sorry!)" || ""}`).join("\n")}\n\nSay \`[@mention] info\` to find out more about this bot.`;
			msg.channel.send(`${reply}\n*React with ❎ to remove this message.*`).then(m => m.react("❎").then(br => m.createReactionCollector((r, u) => u.id === msg.author.id && r.emoji.name === "❎", {time: 10000}).on("collect", m.delete.bind(m)).on("end", () => {
				m.edit(reply);
				br.remove();
			})));
		}
	}).catch(e => {
		console.error("Failed to upload to hastebin:", e);
		msg.reply("Sorry, something went wrong. Couldn't upload your code!");
	}).then(msg.channel.stopTyping.bind(msg.channel));
});

bot.login(token);