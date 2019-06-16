/* eslint-disable sort-keys */
const fetch = require('node-fetch');
const prefix = require('../config.json');
module.exports = {
    "name": 'cat',
    "description": 'gives a different cat image every time',
    "usage": `${prefix}cat`,
    "guildOnly": false,
    async execute (message) {
        const res = await fetch('https://aws.random.cat/meow'),
    { file } = await res.json();
        message.channel.send(file);
    }
};