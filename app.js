// discord
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

// load commands
const loadCommands = require('./commands/load-commands')

// levels
const levels = require('./levels')

// pass event emitter limit
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;

client.on('ready', () => {

    // load commands
    loadCommands(client)

    // levels
    levels(client)

    console.log('bot is ready')
})

client.login(config.token)