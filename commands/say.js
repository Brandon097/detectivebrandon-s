/* eslint-disable sort-keys */
const prefix = require('../config.json');
module.exports = {
  "name": 'say',
  "description": 'i will say what you say, like im saying what your reeading in your head right now, dam am im so good at being a genie',
  "usage": `${prefix}`,
  "cooldown": 25,
  execute (message, args) {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    if (message.channel.type === 'text') message.delete();
    // And we get the bot to say the thing: 
    message.channel.send(`${message.author}likes to\`\`\`${sayMessage}\`\`\``);
    console.log(sayMessage);
  }
};