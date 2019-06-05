/* eslint-disable sort-keys */
/* eslint-disable radix */
module.exports = {
	"name": "prune",
	"description": "Prune up to 99 messages.",
	execute (message, args, ownerID) {
		if (message.author.id !== ownerID) return message.channel.send("only my master can use thee command");
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply("that's not a number bucko.");
		} else if (amount <= 1 || amount > 100) {
			return message.reply("you need to input a number between 1 and 99.");
		}

		message.channel.bulkDelete(amount, true).catch((err) => {
			console.error(err);
			message.channel.send("there was an error trying to prune messages in this channel!");
		});
	}
};