module.exports = {
	"name": "avatar",
	// eslint-disable-next-line sort-keys
	"description": "Get the avatar URL of the tagged user(s), or your own avatar",
	execute (message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
		}

		const avatarList = message.mentions.users.map(user => `${user.username}'s avatar: ${user.displayAvatarURL}`);

		message.channel.send(avatarList);
	}
};