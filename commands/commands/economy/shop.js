const economy = require('@features/economy')
const { bot_channels } = require('@root/config.json')
const shop_items = require('@util/shop_items')

module.exports = {
    commands: ['shop'],
    description: "Lists shop items.",
    callback: async (message) => {

        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id
        
        // console.log(bot_channels[guildId])

        const coins = await economy.getCoins(guildId, userId)

        let reply = 'Shop items:\n\n'

        const guildShop = shop_items[guildId]

        // console.log(guildShop)

        for (item in guildShop) {
            reply += `**${item}** - ${guildShop[item]} coins\n`
        }

        message.client.channels.cache.get(bot_channels[guildId]).send(reply)
    }
}