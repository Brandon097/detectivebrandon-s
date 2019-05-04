/* eslint-disable no-console */
/* eslint-disable sort-keys */
var exit = require('exit');
module.exports = {
	"name": 'restart',
	"description": 'restarts the bot, use if bot starts spamming',
	execute (message) {
    message.channel.send(`restarting bot as requested by ${message.author.username}\nwith ID: ${message.author.id}`);
		// These lines should appear in the output, EVEN ON WINDOWS.
		console.log("omg");
  console.error("yay");

  // process.exit(5);
  exit(5);

  // These lines shouldn't appear in the output.
  console.log("wtf");
  console.error("bro");
	}
};