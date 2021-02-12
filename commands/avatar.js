/* eslint-disable sort-keys */
module.exports = {
  "name": "avatar",
  "description": "Get the avatar URL of the tagged user(s), or your own avatar",
  "aliases": [
    'icon',
    'pfp',
    'picture'
  ],
  execute (message) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
    }

    const avatarList = message.mentions.users.map(user => `${user.username}'s avatar: ${user.displayAvatarURL}`);
		
    // send the entire array of strings as a message
    // by default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);
  }
};