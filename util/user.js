const mongo = require('@util/mongo')

const profileSchema = require('@schemas/profile-schema')

module.exports.getProfile = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            return result
        } finally {
            mongoose.connection.close()
        }
    })
}