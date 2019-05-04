/* eslint-disable sort-keys */
module.exports = {
	"name": "server",
	"description": "Display advanced info about this server.",
	execute (message) {
		message.channel.send(`Server name: **${message.guild.name}**\ncreated by: ``${message.guild.owner}`` who lives in the country of: **${message.guild.region}**\n at: **${message.guild.createdAt}**\nwith icon**${message.guild.icon}**and **${message.guild.iconUrl}**\n~~with population: **${message.guild.members}**\nwith number of towns: **${message.guild.channels}** the town hall is: **${message.guild.defaultChannel}**~~\nafk channel: **${message.guild.afkChannel}** that kicks out a idle user in: **${message.guild.afkTimeout}**seconds\nsystem channel: **${message.guild.systemChannel}**\n~~number of roles: **${message.guild.roles}**~~\n~~verficationLevel: **${message.guild.verficatonLevel}**~~\nis server verified: **${message.guild.verified}**\nis server large(250 members) or small: **${message.guild.large}**\nrequired MFA level: **${message.guild.mfaLevel}**\n is explicit content filter enabled(scans and delete messages that contains explicit content): **${message.guild.explicitContentFilter}**`);
	}
};