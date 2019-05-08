/* eslint-disable sort-keys */
module.exports = {
	"name": "user-info",
	"description": "Display info about yourself,\nplease mention yourself if you want to see what info is on your user account insteaf of just doing **user-info** otherwise it will cause and erorre that i haven't found a way to fix yet",
	execute (message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your username: ${message.author.username}
			Your tag???: **${message.author.tag}**
			Your ID: **${message.author.id}**
			Your avatar: **${message.author.avatar}**
			Your avatar link: **${message.author.avatarURL}**
			Your default avatar link: **${message.author.defaultAvatarURL}**
			Your default avatar link if you have one: **${message.author.displayAvatarURL}**
			The last message you sent XD: ``${message.author.lastMessage}``
			Discriminator???: **${message.author.discriminator}**
			Account verified: **${message.author.verified}`);
		}

		const userList = message.mentions.users.map(user => `their username: **${user.username}**
		their tag???: **${user.tag}**
		their ID: **${user.id}**
		their avatar: **${user.avatar}**
		their avatar link: **${user.avatarURL}**
		their default avatar link: **${user.defaultAvatarURL}**
		their default avatar link if you have one: **${user.displayAvatarURL}**
		are they bot: ${user.bot}**
		The last message they've sent XD: ``${user.lastMessage}``
		Discriminator???: **${user.discriminator}**
		is User Account verified: **${user.verified}`);

		message.channel.send(userList);
	}
};