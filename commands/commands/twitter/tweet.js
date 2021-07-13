const economy = require('@features/economy')
const twtModule = require('@bot_modules/twitterModule')
const { bot_channels } = require('@root/config.json')

module.exports = {
    commands: ['tweet', 'twt'],
    minArgs: 1,
    maxArgs: null,
    expectedArgs: "<tweet content, less than 140 characters>",
    description: "tweet stuff.",
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        // todo: kasih harga tweet
        const coinsOwned = await economy.getCoins(guild.id, member.id)
        const itemCost = 1000
        if (coinsOwned < itemCost) {
            // message.reply(`You do not have ${coinsToGive} coins!.`)
            message.client.channels.cache.get(bot_channels[guild.id]).send(`You do not have 1000 coins!.`)
            return
        }

        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            itemCost * -1
        )

        if (text.length > 140) {
            message.client.channels.cache.get(bot_channels[guild.id]).send(`<@${member.id}> bates nya 140 character.`)
            return
        }

        const twtId = await twtModule.tweetStatusUpdate(text)

        if (twtId == 'err:tweet') {
            message.client.channels.cache.get(bot_channels[guild.id]).send(`there was an error sending tweet.`)
            return

        } else {
            const statusLink = 'https://twitter.com/YabotYa/status/' + twtId

            const log_data = {
                guildId: guild.id,
                userId: member.user.id,
                username: member.user.username,
                discriminator: member.user.discriminator,
                tweetId: twtId,
                tweetLink: statusLink,
                content: text
            }

            await twtModule.tweetLogInsert(log_data)

            message.client.channels.cache.get(bot_channels[guild.id]).send(`You successfully tweeted. ${statusLink}`)
        }

    }
}