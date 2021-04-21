const Discord = require('discord.js')

const dailyRewardsSchema = require('@schemas/daily-rewards-schema')

// Member claimed rewards in the last 24 hr, resets every 10 minutes
let claimedCache = []

const clearCache = () => {
    claimedCache = []
    setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache() // start when command is set up

module.exports = {
    commands: ['daily'],
    description: "Get daily rewards.",

    callback: async (message, arguments, text) => {

        const { guild, member } = message
        const { id } = member

        if (claimedCache.includes(id)) {
            message.reply('You have already claimed your daily rewards')
            return
        }

        const user_data = {
            guildId: guild.id,
            userId: id
        }

        try {

            const result = await dailyRewardsSchema.findOne(user_data)

            if (result) { // check claimed daily
                const then = new Date(result.updatedAt).getTime()
                const now = new Date().getTime()

                const diffTime = Math.abs(now - then)
                const diffDays = Math.round(difftime / (1000 * 60 * 60 * 24))

                if (diffDays <= 1) {
                    claimedCache.push(id)

                    message.reply('You have already claimed your daily rewards')
                    return
                }
            }

            await dailyRewardsSchema.findOneAndUpdate(user_data, user_data, {
                upsert: true
            })

            claimedCache.push(id)

            // TODO: give rewards
            message.reply('You have claimed your daily rewards')

        } catch(err) {

        }

    }
}