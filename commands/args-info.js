/* eslint-disable sort-keys */
module.exports = {
  "name": 'args-info',
  "description": 'Information about the arguments provided.',
  "args": true,
  execute (message, args) {
    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  }
};