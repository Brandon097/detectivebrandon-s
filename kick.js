/* eslint-disable sort-keys */
module.exports = {
	"name": 'kick',
	"description": 'Tag a member and kick them',
	execute (message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}
        not going to happen, sorry`);
	}
};