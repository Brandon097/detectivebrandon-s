module.exports = {
	"name": "user-info",
	// eslint-disable-next-line sort-keys
	"description": "Display info about yourself,\n please mention yourself if you want to see what info is on your user account insteaf of just doing **user-info** otherwise it will cause and erorre that i haven't found a way to fix yet",
	execute (message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your username: ${message.author.user.username}\nYour tag???: **${message.author.user.tag}**\nYour ID: **${message.author.user.id}**\nYour avatar: **${message.author.user.avatar}**\nYour avatar link: **${message.author.user.avatarURL}**\nYour default avatar link: **${message.author.user.defaultAvatarURL}**\nYour default avatar link if you have one: **${message.author.user.displayAvatarURL}**\nThe last message you sent XD: ``${message.author.user.lastMessage}``\nDiscriminator???: **${message.author.user.discriminator}**\nAccount verified: **${message.author.user.verified}`);
		}

		const userList = message.mentions.users.map(user => `their username: **${user.username}**\ntheir tag???: **${user.tag}**\ntheir ID: **${user.id}**\nYour avatar: **${user.avatar}**\ntheir avatar link: **${user.avatarURL}**\ntheir default avatar link: **${user.defaultAvatarURL}**\ntheir default avatar link if you have one: **${user.displayAvatarURL}**\nis user bot: ${user.bot}**\nThe last message they've sent XD: ``${user.lastMessage}``\nDiscriminator???: **${user.discriminator}**\nis User Account verified: **${user.verified}`);

		message.channel.send(userList);
	}
};