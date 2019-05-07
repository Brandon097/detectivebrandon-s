const fs = require('fs'); 
const Discord = require('discord.js');
const { prefix, token, ownerID } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

// eslint-disable-next-line id-length
client.on("error", (e) => console.error(e));
// eslint-disable-next-line id-length
client.on("warn", (e) => console.warn(e));
// eslint-disable-next-line id-length
client.on("debug", (e) => console.info(e));

client.on('ready', () => {
  // var generalChannel = client.channels.get("537992939083923457"); // Replace with known channel ID
 // generalChannel.send("my prefix is ``d ``, my master told me he is going to update me with something about a voice channel? ```if this keep happening it means the bot has been automaticly restarted **after a file save** in order for the new added code to work.```");

    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity(`on ${client.guilds.size} servers, ping me`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);

    // Alternatively, you can set the activity to any of the following:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example:
    // client.user.setActivity("TV", {type: "WATCHING"})

      console.log(`Logged in as ${client.user.tag}!`);

    // List servers the bot is connected to
    console.log("Servers:");
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name);

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
        });
    });
  console.log('I am ready!');
});

client.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
  const { guild } = member; 
  const memberTag = member.user.tag; 
  if (guild.systemChannel) {
    guild.systemChannel.send(new Discord.RichEmbed(). // Creating instance of Discord.RichEmbed
    setTitle("someone walked in the wild west door's"). // Calling method setTitle on constructor. 
    setDescription(`${memberTag}has joined the guild, Welcome to good burger, home of the good burger`). // Setting embed description
    setThumbnail(member.user.displayAvatarURL). // The image on the top right; method requires an url, not a path to file!
    addField("Troops now", member.guild.memberCount). // Adds a field; First parameter is the title and the second is the value.
    setTimestamp() // Sets a timestamp at the end of the embed
    // eslint-disable-next-line function-paren-newline
    );
  }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!, pls notify @lamar#6227\n or allow people to dm you???');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 4) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`WHOA hold up boy, just  ${timeLeft.toFixed(1)} more second(s) before reusing your 3.6% power on \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
    message.reply(`there was a oofiee trying to execute that command!, please notfiy @lamar#6227
    well here is the error which you woudn't understand anyway\`\`\`${error}\`\`\``);
    console.error(`failed to send message to${message.user.tag}
    type of channel${message.channel.type}
    in channel${message.channel}
    in server ${message.guild}`);
  }
});

client.on('message', (receivedMessage) => {
  // Prevent bot from responding to its own messages

  if (receivedMessage.author === client.user) {
      return;
  }
  
  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.includes(client.user.toString())) {
      // Send acknowledgement message
      receivedMessage.channel.send("~~Message received from~~ hello there, my prefix is ``Dhelp`` " + receivedMessage.author.toString() + ": " + receivedMessage.content);
  }
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("dhelp")) {
    message.reply("no no not dhelp ``d help``");
  } else if (message.content.startsWith("D help")) {
    message.reply("it's lower case ``d ``");
  } else if (message.content.startsWith("Dhelp")) {
    message.reply("no, lowercase d");
  } else if (message.content.startsWith(`${prefix}dick`)) {
    message.reply("no no not me choose moto moto");
	}
});

const clean = text => {
  if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  return text;
};

client.on("message", message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith(`${prefix}eval`)) {
    if (message.author.id !== ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), { "code": "xl" });
      console.log(eval(code));
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      console.error(err);
    }
  }
});
client.login(token);