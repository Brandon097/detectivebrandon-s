/* eslint-disable sort-keys */
module.exports = {
	"name": 'ping',
	"description": 'Ping!',
	execute (message) {
		message.channel.send("Pinging ..."). // Placeholder for pinging ... 
			then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)); // Edits message with current timestamp minus timestamp of message
			});
	}
};