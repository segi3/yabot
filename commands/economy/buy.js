const economy = require('../../economy')
const { bot_channels } = require('../../config.json')
const shop_items = require('../../shop_items')

module.exports = {
    commands: ['buy'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<item name from shop items>",
    description: "Buy an item from shop.",
    callback: async (message, arguments, text) => {
        const { guild, member } = message
        const role = guild.roles.cache.find(role => role.name === arguments[0])

        if (member.roles.cache.some(role => role.name === arguments[0])) {
            message.client.channels.cache.get(bot_channels[guild.id]).send(`You already bought that item.`)
            return
        }

        if (!shop_items[arguments[0]]) {
            message.client.channels.cache.get(bot_channels[guild.id]).send(`Item is not on the shop.`)
            return
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id)
        const itemCost = shop_items[arguments[0]]
        if (coinsOwned < itemCost) {
            // message.reply(`You do not have ${coinsToGive} coins!.`)
            message.client.channels.cache.get(bot_channels[guild.id]).send(`You do not have enough coins!.`)
            return
        }

        member.roles.add(role)

        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            itemCost * -1
        )
        
        message.client.channels.cache.get(bot_channels[guild.id]).send(`You successfully bought ${arguments[0]}.`)
    }
}