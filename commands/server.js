/* eslint-disable sort-keys */
module.exports = {
  "name": "server",
  "description": "Display advanced info about this server.",
  execute (message) {
    message.channel.send(`Server name: **${message.guild.name}**
created by:\`\`${message.guild.owner}\`\` who lives in the country of: **${message.guild.region}**
at: **${message.guild.createdAt}**
with icon: **${message.guild.icon}** ~~and **${message.guild.iconUrl}**~~
with population: **${message.guild.memberCount}**
with number of towns: **${message.guild.channels.size}** ~~the town hall is: **${message.guild.defaultChannel}**~~
afk channel: **${message.guild.afkChannel}** that kicks out a idle user in: **${message.guild.afkTimeout}**seconds
system channel: **${message.guild.systemChannel}**
number of roles: **${message.guild.roles.size}**
~~verficationLevel: **${message.guild.verficatonLevel}**~~
is server verified: **${message.guild.verified}**, you can verify your server at https://discordapp.com/verification
is server large(250 members) or small: **${message.guild.large}**
required MFA level: **${message.guild.mfaLevel}**
is explicit content filter enabled(scans and delete messages that contains explicit content): **${message.guild.explicitContentFilter}**`);
  }
};