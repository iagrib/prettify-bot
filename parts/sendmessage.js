module.exports = (channel, content, requester) => {
	let deleted;
	channel.send(`${content}\n*React with ❎ to remove this message.*`).then(msg => msg.react("❎").then(reaction => msg.createReactionCollector((r, u) => u.id === requester.id && r.emoji.name === "❎", {time: 10000}).on("collect", () => {
		msg.delete(msg);
		deleted = true;
	}).on("end", () => {
		if(!deleted) {
			msg.edit(content);
			reaction.remove();
		}
	})));
}