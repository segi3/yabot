const economy = require('@features/economy')
const twtModule = require('@bot_modules/twitterModule')
const { bot_channels } = require('@root/config.json')

module.exports = {
    commands: ['tweetdariyabot', 'twtybt', 'twtb'],
    minArgs: 1,
    maxArgs: null,
    expectedArgs: "<tweet content, less than 140 characters>",
    description: "tweet stuff.",
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        // todo: kasih harga tweet
        // const coinsOwned = await economy.getCoins(guild.id, member.id)
        // const itemCost = 1000
        // if (coinsOwned < itemCost) {
        //     // message.reply(`You do not have ${coinsToGive} coins!.`)
        //     message.client.channels.cache.get(bot_channels[guild.id]).send(`You do not have 1000 coins!.`)
        //     return
        // }

        // const remainingCoins = await economy.addCoins(
        //     guild.id,
        //     member.id,
        //     itemCost * -1
        // )

        if (text.length > 140) {
            message.client.channels.cache.get(bot_channels[guild.id]).send(`<@${member.id}> bates nya 140 character.`)
            return
        }

        const { twtUsername, twtId, err } = await twtModule.tweetFromYabot({
            username: member.user.username,
            discriminator: member.user.discriminator,
            status: text
        })

        if (err == 'err:tweet') {
            message.reply(`there was an error sending tweet.`)
            return
        } else if (err == 'err:not_found') {
            const usernameParam = member.user.username
            const discriminatorParam = member.user.discriminator
            const query = `?username=${usernameParam.replace(' ', '%20')}&discriminator=${discriminatorParam}`
            message.reply(`yabot not authenticated. please use the given link https://server-yabot.herokuapp.com/twitter${query} to authenticate yabot.`)
            return
        } else {

            const statusLink = 'http://twitter.com/' + twtUsername + '/status/' + twtId

            message.reply(`successfully tweeted. ${statusLink}`)
        }

    }
}