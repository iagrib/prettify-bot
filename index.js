"use strict";

const Discord = require("discord.js");
const bot = new Discord.Client;

const langs = require("./parts/langs");
const hastebin = require("./parts/hastebin");
const commands = require("./parts/commands");
const sendmessage = require("./parts/sendmessage");
const limits = require("./parts/limits");

const {token, mmax = 4} = require("./parts/config");
const blacklist = require("./parts/blacklist");

function getflags(msg) {
	return msg.content.match(new RegExp(`<@!?${bot.user.id}>\\s*([\\w- ]*)`))[1].split(" ").reduce((o, v) => (o[v] = true, o), {});
}

bot.on("ready", () => {
	console.log(`Connected and ready to serve ${bot.guilds.size} guilds.`);
	bot.user.setPresence({game: {name: "[@mention] info"}});
});

bot.on("message", function handleMessage(msg, requester = msg.author, oflags) {
	if(blacklist[msg.guild.id] || blacklist[requester.id] || !(oflags || msg.mentions.users.has(bot.user.id)) || requester.bot || !msg.channel.permissionsFor(msg.guild.me).has("SEND_MESSAGES")) return;

	if(/```(?:\S*?\n)?[^]+?```/.test(msg.content)) { // There are codeblocks in the message
		if(!oflags) msg.channel.startTyping();

		if(limits.get(requester.id)) {
			sendmessage(msg.channel, "Calm down, it looks like you're trying to upload too much code!\nPlease be respectful to the API and don't abuse the bot.", requester);
			console.log(`${requester.tag} (${requester.id}) tried to use the bot in #${msg.channel.name} (${msg.channel.id}) in guild ${msg.guild.name} (${msg.guild.id}) but was denied because they didn't wait long enough after reaching the limit.`);
			msg.channel.stopTyping();
			return;
		}

		const flags = oflags || getflags(msg);

		const promises = [];
		const regex = /```(?:(\S*?)\n)?([^]+?)```/g;
		for(let match; match = regex.exec(msg.content);) {
			if(promises.length === mmax) break;
			const [lang, prettified] = langs.prettify(match[2], match[1] && match[1].toLowerCase());
			promises.push(hastebin(`${(!flags["no-prettify"] && prettified) ? prettified[1] : match[2]}\n\n${langs.comment(lang)}`).then(link => [prettified && prettified[0], `${link}${langs.extension(lang)}`]));
		}

		Promise.all(promises).then(arr => {
			const some = !flags["no-prettify"] && arr.some(e => e[0]);
			const reply = `${flags["no-prettify"] ? "You specified `no-prettify` flag, so I didn't prettify your code, but I" : some ? "I prettified your code and" : "Unfortunately I couldn't prettify your code, but I"} uploaded it to hastebin!
\n${arr.map(d => `${d[1]}${some && !d[0] && " (couldn't prettify this one, sorry!)" || ""}`).join("\n")}${arr.length === mmax ? `*There is a limit of ${mmax}* processed codeblocks per message.*` : ""}\n\nSay \`[@mention] info\` to find out more about this bot.`;

			sendmessage(msg.channel, reply, requester);
		}).catch(e => {
			console.error(`Couldn't upload code to hastebin from channel ${msg.channel.id} (${msg.channel.name}) in guild ${msg.guild.id} (${msg.guild.name}) in response to ${requester.id} (${requester.tag}):`, e);
			sendmessage(msg.channel, "Sorry, something went wrong. Couldn't upload the code to hastebin.", requester);
		}).then(msg.channel.stopTyping.bind(msg.channel));

		return;
	}
	// No codeblocks found. Was the bot mentioned for something else?
	if(oflags) return true; // 'oflags' will only be defined when message is requested to be parsed by ID. We don't want to look for commands in it in that case

	const cmd = msg.content.toLowerCase().match(new RegExp(`^<@!?${bot.user.id}>\\s*(\\w*)`));
	if(!cmd) return;

	if(/^\d+$/.test(cmd[1])) { // If the command is numeric - try to fetch message with that id and parse codeblocks from it
		msg.channel.startTyping();
		msg.channel.fetchMessage(cmd[1]).then(m => {
			if(handleMessage(m, requester, getflags(msg))) {
				sendmessage(msg.channel, "That message doesn't seem to contain any codeblocks.", requester);
				msg.channel.stopTyping();
			}
		}).catch(() => sendmessage(msg.channel, "Couldn't find a message with that id in this channel.", requester));
		return;
	}

	commands(cmd[1], msg);
});

bot.login(token);