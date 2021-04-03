require('module-alias/register')

// discord
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('@root/config.json');
const mongo = require('@util/mongo')

const loadCommands = require('@root/commands/load-commands') // load commands
const loadFeatures = require('@root/features/load-features') // load features

// levels
// const levels = require('@features/levels')

// pass event emitter limit
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;

client.on('ready', async () => {

    await mongo()
    
    loadCommands(client) // load commands
    loadFeatures(client) // load features

    // levels
    // levels(client)

    // activity
    client.user.setActivity('TWICE', { type: 'LISTENING' })

    console.log('bot is ready')
})

client.login(config.token)