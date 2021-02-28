const economy = require('../../economy')
const { bot_channels } = require('../../config.json')

module.exports = {
    commands: ['balance', 'bal'],
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    description: "Displays a user's coins.",
    callback: async (message) => {

        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id
        
        console.log(bot_channels[guildId])

        const coins = await economy.getCoins(guildId, userId)

        // message.reply(`that user has ${coins} coins`)

        message.client.channels.cache.get(bot_channels[guildId]).send(`<@${userId}> has ${coins} coins`)
    }
}