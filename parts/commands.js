const cmds = {
	info: msg => msg.reply(`I'm prettify-bot, a bot that can prettify your code and upload it to hastebin for you.
Whenever you want me to do that, just send your code (in a codeblock) and mention me in the same message.`),
	source: msg => msg.reply("https://github.com/iagrib/prettify-bot")
}

module.exports = (cmd, msg) => cmds[cmd] && cmds[cmd](msg);