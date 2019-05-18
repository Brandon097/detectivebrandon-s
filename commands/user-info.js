/* eslint-disable sort-keys */
module.exports = {
	"name": "user-info",
	"description": "Display info about yourself",
	"cooldown": 60,
	execute (message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your reflection: **${message.author.username}**
Your tag???: **${message.author.tag}**
Your user ID: **${message.author.id}**
Your avatar: **${message.author.avatar}**
Your avatar link: **${message.author.avatarURL}**
Your default avatar link: **${message.author.defaultAvatarURL}**
Your default avatar link if you have one: **${message.author.displayAvatarURL}**
is you bot **${message.author.bot}**
The last message you sent XD: __${message.author.lastMessage}__
Discriminator???: **${message.author.discriminator}**
\`\`\`other infomation\`\`\`
current statues: \`\`${message.author.presence.status}\`\`
likes to be a\`\`${message.author.presence.game}\`\`model`);
		}

		const userList = message.mentions.users.map(user => `their username: **${user.username}**
their tag???: **${user.tag}**
their ID: **${user.id}**
their avatar: **${user.avatar}**
their avatar link: **${user.avatarURL}**
their default avatar link: **${user.defaultAvatarURL}**
their default avatar link if you have one: **${user.displayAvatarURL}**
are they bot: **${user.bot}**
The last message they've sent XD: __${user.lastMessage}__
Discriminator???: **${user.discriminator}**
\`\`\`other infomation\`\`\`
current statues: \`\`${user.presence.status}\`\`
likes to be a\`\`${user.presence.game}\`\`model, (if \`\`null\`\`=user is not playing a game)`);

		message.channel.send(userList);
	}
};