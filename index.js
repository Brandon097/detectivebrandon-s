const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');
const { token, prefix, ownerID } = require('./config.json');
// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// `client.on('...')` events and such below this point
const cooldowns = new Discord.Collection();

// eslint-disable-next-line id-length
client.on("error", (e) => console.error(e));
// eslint-disable-next-line id-length
client.on("warn", (e) => console.warn(e));
// eslint-disable-next-line id-length
client.on("debug", (e) => console.info(e));

client.on('shardError', error => console.error('A websocket connection encountered an error:', error));

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  // "ready" isn't really ready. We need to wait a spell.
  wait(1000);
  // Load all invites for all guilds and save them to the cache.
  // eslint-disable-next-line id-length
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
  // List servers the bot is connected to
  console.log("Servers:");
  client.guilds.forEach((guild) => console.log("- " + guild.name + ' id: ' + guild.id));

  // Set bot status to: "Playing with JavaScript"
  client.user.setActivity(`on ${client.guilds.size} servers, for ${client.users.size} users`, { "type": "WATCHING" }).
    then(client.user.setStatus('idle')).
    then(console.log(`Logged in as ${client.user.tag}!
      Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users
      I am ready!`));
  // Alternatively, you can set the activity to any of the following:
  // PLAYING, STREAMING, LISTENING, WATCHING
  // For example:
  // client.user.setActivity("TV", {type: "WATCHING"})
});

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
  const { guild } = member;
  const memberTag = member.user.tag;
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    // eslint-disable-next-line id-length
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.get(invite.inviter.id);

    if (guild.systemChannel) {
      guild.systemChannel.send(new Discord.RichEmbed(). // Creating instance of Discord.RichEmbed
        setTitle("someone walked in the wild west door's"). // Calling method setTitle on constructor.
        setDescription(`${memberTag}has joined the night club
        using the sauce of${invite.code}
        which surrendered${invite.uses} times
        brought to us by are farvoite nuckle head${inviter.tag}
        Welcome to good burger, home of the good burger`). // Setting embed description
        setThumbnail(member.user.displayAvatarURL). // The image on the top right; method requires an url, not a path to file!
        addField("Troops now", member.guild.memberCount). // Adds a field; First parameter is the title and the second is the value.
        setTimestamp()); // Sets a timestamp at the end
    }
  });

});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('selected command can\'t be excuted in DMs!.\n or change your direct message setting to allow this');
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
  const cooldownAmount = (command.cooldown || 15) * 1000;

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
    message.reply(`there was a oofiee trying to execute that command!, please notfiy @lamar#6227.
    well here is the error which you woudn't understand anyway\`\`\`${error}\`\`\``);
  }
});

client.on('message', receivedMessage => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author === client.user) return;

  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.includes(client.user.toString())) {
    // Send acknowledgement message
    receivedMessage.channel.send('hello there' + receivedMessage.author.toString() + ', my prefix is ``Dhelp``');
  }
});

const clean = text => {
  if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  return text;
};

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.split(" ").slice(1);
  if (message.content.startsWith("dhelp")) message.channel.send("no no not dhelp ``d help``");
  else if (message.content.startsWith("D help")) message.channel.send("it's lower case ``d ``");
  else if (message.content.startsWith("Dhelp")) message.channel.send("no, lowercase d");
  else if (message.content.startsWith(`${prefix}dick`)) message.channel.send("no no not me choose moto moto");
  else if (message.content.startsWith(`${prefix}eval`)) {
    if (message.author.id !== ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { "code": "xl" });
      console.log(clean(evaled));
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      console.error(err);
    }
  }
});
// login to Discord with your app's token
client.login(token).
  catch(console.error);