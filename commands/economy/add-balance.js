const economy = require('../../economy')
const { bot_channels } = require('../../config.json')

module.exports = {
    commands: ['addbalance', 'addbal'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<the target's @> <coin amount>",
    permissionError: 'you must be an administrator to use this command',
    permissions: 'ADMINISTRATOR',
    description: 'gives a user coins.',
    callback: async (message, arguments) => {
        const mention = message.mentions.users.first()

        if (!mention) {
            // message.reply(`Please tag user.`)
            message.client.channels.cache.get(bot_channels[guildId]).send(`Please tag user.`)
            return
        }

        const coins = arguments[1]

        if (isNaN(coins)) {
            // message.reply(`Please provide a valid number of coins.`)
            message.client.channels.cache.get(bot_channels[guildId]).send(`Please provide a valid number of coins.`)
            return
        }

        const guildId = message.guild.id
        const userId = mention.id

        const newCoins = await economy.addCoins(guildId, userId, coins)

        // message.reply(`you have given <@${userId}> ${coins} coins. They now have ${newCoins} coins.`)
        message.client.channels.cache.get(bot_channels[guildId]).send(`you have given <@${userId}> ${coins} coins. They now have ${newCoins} coins.`)
    }
}