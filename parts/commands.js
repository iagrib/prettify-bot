"use strict";

const sendmessage = require("./sendmessage");

const cmds = {
	info: msg => sendmessage(msg.channel, `${msg.author} I'm prettify-bot, a bot that can prettify your code and upload it to hastebin for you.
Whenever you want me to do that, just send your code (in a codeblock) and mention me in the same message.

Find out more about things I can do: <https://github.com/iagrib/prettify-bot/blob/master/info.md>`, msg.author),

	code: msg => sendmessage(msg.channel, `${msg.author} Codeblocks:
\\\`\\\`\\\`lang
code...\\\`\\\`\\\`

Example:
\\\`\\\`\\\`js
console.log("Hello");
// code goes here...\\\`\\\`\\\`

Result:\`\`\`js
console.log("Hello");
// code goes here...\`\`\``, msg.author),

	source: msg => sendmessage(msg.channel, `${msg.author} https://github.com/iagrib/prettify-bot`, msg.author)
}

module.exports = (cmd, msg) => cmds[cmd] && cmds[cmd](msg);