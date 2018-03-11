"use strict";

module.exports = (channel, body, requester) => {
	const content = `${requester} ${body}`;
	let deleted;
	channel.send(`${content}\n*React with ❎ to remove this message.*`).then(msg => msg.react("❎").then(reaction => msg.createReactionCollector((r, u) => u.id === requester.id && r.emoji.name === "❎", {time: 10000}).on("collect", () => {
		msg.delete(msg);
		deleted = true;
	}).on("end", () => {
		if(!deleted) {
			msg.edit(content);
			reaction.remove();
		}
	}))).catch(console.error.bind(console, `Couldn't send message to channel ${channel.id} (${channel.name}) in guild ${channel.guild.id} (${channel.guild.name}) in response to ${requester.id} (${requester.tag}):`));
}