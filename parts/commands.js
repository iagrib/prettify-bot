const cmds = {
	info: msg => msg.reply(`I'm prettify-bot, a bot that can prettify your code and upload it to hastebin for you.
Whenever you want me to do that, just send your code (in a codeblock) and mention me in the same message.

For a list of my other commands, type \`[@mention] help\``),

	codeblocks: msg => msg.reply(`Discord allows you embed codeblocks in your messages that look like this:\`\`\`js
function hello() {
	console.log("Hello world");
}\`\`\`You can insert a codeblock in your message like so:

\\\`\\\`\\\`lang
code...\\\`\\\`\\\`

\`lang\` is the programming language your code is written in (used for syntax highlighting and is optional), \`code\` is the code itself. So, the previous example would look like this:

\\\`\\\`\\\`js
function hello() {
	console.log("Hello world");
}\\\`\\\`\\\``),

	source: msg => msg.reply("https://github.com/iagrib/prettify-bot"),

	help: msg => msg.reply(`Here are all the commands available as of now:\`${Object.keys(cmds).join("` `")}\``)
}

module.exports = (cmd, msg) => cmds[cmd] && cmds[cmd](msg);