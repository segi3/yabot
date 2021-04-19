const Discord = require('discord.js')
// const mongo = require('@util/mongo')
const profileSchema = require('@schemas/profile-schema')
const economy = require('@features/economy')
const { bot_channels } = require('@root/config.json')

module.exports = (client) => {
    client.on('message', message => {
        if (message.author.bot) return

        const { guild, member } = message

        const min = 15
        const max = 23
        let xp = Math.floor(
            Math.random() * (max - min + 1) + min
        )
        
        addXP(guild.id, member.id, xp, message)
    })
}
const getNeededXP = (level) => level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
    const result = await profileSchema.findOneAndUpdate({
        guildId,
        userId
    }, {
        guildId,
        userId,
        $inc: {
            xp: xpToAdd
        }
    }, {
        upsert: true,
        new: true
    })

    let { xp, level } = result

    const needed = getNeededXP(level)

    if (xp >= needed) {
        ++level
        xp -= needed

        // message.reply(`You are now level ${level} with ${xp} xp!`)
        const embed = new Discord.MessageEmbed()
            .setColor('#f9b243')
            .setDescription(`<@${userId}> is now level ${level}!`)
        message.client.channels.cache.get(bot_channels[guildId]).send(embed)

        await profileSchema.updateOne({
            guildId,
            userId
        }, {
            level,
            xp
        })

        let coinFromLevelUp = level * 50

        await economy.addCoins(guildId, userId, coinFromLevelUp)
    }
}

module.exports.addXP = addXP