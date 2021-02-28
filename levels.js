const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')
const economy = require('./economy')
const { bot_channels } = require('./config.json')

module.exports = (client) => {
    client.on('message', message => {
        if (message.author.bot) return

        const { guild, member } = message

        addXP(guild.id, member.id, 23, message)
    })
}
const getNeededXP = (level) => level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
    await mongo().then(async (mongoose)=> {
        try {
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
                message.client.channels.cache.get(bot_channels[guildId]).send(`<@${userId}> is now level ${level}!`)

                await profileSchema.updateOne({
                    guildId,
                    userId
                }, {
                    level,
                    xp
                })

                await economy.addCoins(guildId, userId, 25)
            }

        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.addXP = addXP