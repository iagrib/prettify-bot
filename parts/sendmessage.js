module.exports = function sendmessage(channel, content, requester) {
	if(content.length > 1961) { // Todo: better handling of long messages/bot abuse than this
		sendmessage(channel, `${requester} Sorry, I couldn't send my message in this channel because it was too long.`, requester);
		console.log(`Couldn't send message to channel ${channel.id} (${channel.name}) in guild ${channel.guild.id} (${channel.guild.name}) in response to ${requester.id} (${requester.tag}) because it was too long.`);
		return;
	}

	let deleted;
	channel.send(`${content}\n*React with ❎ to remove this message.*`).then(msg => msg.react("❎").then(reaction => msg.createReactionCollector((r, u) => u.id === requester.id && r.emoji.name === "❎", {time: 10000}).on("collect", () => {
		msg.delete(msg);
		deleted = true;
	}).on("end", () => {
		if(!deleted) {
			msg.edit(content);
			reaction.remove();
		}
	}))).catch(e => console.error(`Couldn't send message to channel ${channel.id} (${channel.name}) in guild ${channel.guild.id} (${channel.guild.name}) in response to ${requester.id} (${requester.tag}):`, e));
}