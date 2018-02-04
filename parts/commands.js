const cmds = {
	info: msg => msg.reply(`I'm prettify-bot, a bot that can prettify your code and upload it to hastebin for you.
Whenever you want me to do that, just send your code (in a codeblock) and mention me in the same message.`),

	help: msg => msg.reply(`Here are all the commands currently available:\n\`${Object.keys(cmds).join("``")}\``)
}

//module.exports = (cmd, msg) => cmds[cmd] ? cmds[cmd](msg) : msg.reply(`Command not found... Try running the \`help\` command!`);
module.exports = (cmd, msg) => cmds.info(msg); // There is no need for more than one command as of now