const economy = require('../../economy')
const { bot_channels } = require('../../config.json')

module.exports = {
    commands: ['pay',],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<Target user's @> <Amount of coins>",
    description: "Displays a user's coins.",
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target) {
            // message.reply(`Please specify someone to give coin to`)
            message.client.channels.cache.get(bot_channels[guildId]).send(`Please specify someone to give coin to`)
            return
        }

        const coinsToGive = arguments [1]
        if (isNaN(coinsToGive) || coinsToGive < 0) {
            // message.reply(`Please provide a valid number of coins to give.`)
            message.client.channels.cache.get(bot_channels[guildId]).send(`Please provide a valid number of coins to give.`)
            return
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id)
        if (coinsOwned < coinsToGive) {
            // message.reply(`You do not have ${coinsToGive} coins!.`)
            message.client.channels.cache.get(bot_channels[guildId]).send(`You do not have ${coinsToGive} coins!.`)
            return
        }

        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            coinsToGive * -1
        )

        const newBalance = await economy.addCoins(
            guild.id,
            target.id,
            coinsToGive
        )

        // message.reply(`You have given <@${target.id}> ${coinsToGive} coins.`)
        message.client.channels.cache.get(bot_channels[guild.id]).send(`You have given <@${target.id}> ${coinsToGive} coins.`)
    }
}