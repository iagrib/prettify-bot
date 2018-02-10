const Discord = require("discord.js");
const bot = new Discord.Client;

const langs = require("./parts/langs");
const hastebin = require("./parts/hastebin");
const commands = require("./parts/commands");
const sendmessage = require("./parts/sendmessage");

const {token} = require("./parts/token");

const re = {
	code: /```(?:(\S*?)\n)?([^]+?)```/g,
	num: /^\d+$/
};

bot.on("ready", () => {
	re.flags = new RegExp(`<@!?${bot.user.id}>\\s*([\\w- ]*)`);
	re.cmd = new RegExp(`^<@!?${bot.user.id}>\\s*(\\w*)`);

	console.log(`Connected and ready to serve ${bot.guilds.size} guilds.`);
	bot.user.setPresence({game: {name: "[@mention] info"}});
});

bot.on("message", function handleMessage(msg, requester = msg.author, oflags) {
	if(!msg.mentions.users.has(bot.user.id) || requester.bot || !msg.channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) return;

	if(re.code.test(msg.content)) { // There are codeblocks in the message
		if(!oflags) msg.channel.startTyping();
		const flags = oflags || msg.content.match(re.flags)[1].split(" ").reduce((o, v) => (o[v] = true, o), {});

		const promises = [];
		const regex = new RegExp(re.code);
		for(let match; match = regex.exec(msg.content);) {
			const [lang, prettified] = langs.prettify(match[2], match[1] && match[1].toLowerCase());
			promises.push(hastebin(`${(!flags["no-prettify"] && prettified) ? prettified[1] : match[2]}\n\n${langs.comment(lang)}`).then(link => [prettified && prettified[0], `${link}${langs.extension(lang)}`]));
		}

		Promise.all(promises).then(arr => {
			const some = !flags["no-prettify"] && arr.some(e => e[0]);
			const reply = `${requester} ${flags["no-prettify"] ? "You specified `no-prettify` flag, so I didn't prettify your code, but I" : some ? "I prettified your code and" : "Unfortunately I couldn't prettify your code, but I"} uploaded it to hastebin!
\n${arr.map(d => `${d[1]}${some && !d[0] && " (couldn't prettify this one, sorry!)" || ""}`).join("\n")}\n\nSay \`[@mention] info\` to find out more about this bot.`;

			sendmessage(msg.channel, reply, requester);
		}).catch(e => {
			console.error("Failed to upload to hastebin:", e);
			sendmessage(msg.channel, `${requester} Sorry, something went wrong. Couldn't upload the code to hastebin.`, requester);
		}).then(msg.channel.stopTyping.bind(msg.channel));

		return;
	}
	// No codeblocks found. Was the bot mentioned for something else?
	if(oflags) return; // 'flags' will only be defined when message is requested to be parsed by ID. We don't want to look for commands in it in that case

	const cmd = msg.content.toLowerCase().match(re.cmd);
	if(!cmd) return;

	if(re.num.test(cmd[1])) { // If the command is numeric - try to fetch message with that id and parse codeblocks from it
		msg.channel.startTyping();
		msg.channel.fetchMessage(cmd[1]).then(m => handleMessage(m, requester, msg.content.match(re.flags)[1].split(" ").reduce((o, v) => (o[v] = true, o), {}))).catch(e => {
			console.error("Failed to fetch message with id", cmd[1], ":", e);
			sendmessage(msg.channel, `${requester} Sorry, something went wrong. Couldn't find a message with that id in this channel.`, requester);
		});
		return;
	}

	commands(cmd[1], msg);
});

bot.login(token);