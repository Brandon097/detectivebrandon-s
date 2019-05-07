/* eslint-disable sort-keys */
const { prefix } = require('../config.json');

module.exports = {
	"name": 'help',
	"description": 'List all of my commands or info about a specific command.',
	"aliases": ['commands'],
	"usage": '[command name]',
	"cooldown": 5,
	execute (message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Here\'s a collection of all my microsoft infinity stonmands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { "split": true }).
				then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Im in your DMs now :stuck_out_tongue_winking_eye: :stuck_out_tongue_winking_eye: :stuck_out_tongue_winking_eye: uhhhh so you can use my commands');
				}).
				catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply(`could not send help DM to ${message.author}!
					best if you find shelter until help arrives.
					when you find a payphone,
					craft a quarter then,
					 please ping/DM \`\`\`lamar#6227\`\`\` as i am too lazy/unable to notify my own master`);
				});
		}

		const name = args[0].toLowerCase();
		// eslint-disable-next-line id-length
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that thing doesn\'t exist :thinking: :thinking: :thinking:');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**reason for arrest:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**time to be spent in prison:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { "split": true });
	}
};