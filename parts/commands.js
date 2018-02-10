const sendmessage = require("./sendmessage");

const cmds = {
	info: msg => sendmessage(msg.channel, `${msg.author} I'm prettify-bot, a bot that can prettify your code and upload it to hastebin for you.
Whenever you want me to do that, just send your code (in a codeblock) and mention me in the same message.`, msg.author),
	source: msg => sendmessage(msg.channel, `${msg.author} https://github.com/iagrib/prettify-bot`, msg.author)
}

module.exports = (cmd, msg) => cmds[cmd] && cmds[cmd](msg);