// const mongo = require('@util/mongo')

const profileSchema = require('@schemas/profile-schema')
const profile = require('../commands/commands/user/profile')

module.exports.getProfile = async (username, discriminator, guildId, userId) => {

    // const result = await profileSchema.findOne({
    //     guildId,
    //     userId
    // })

    // return result

    const result = await profileSchema.findOneAndUpdate({
        guildId,
        userId
    }, {
        username: username,
        discriminator: discriminator
    }, {
        upsert: true,
        new: true
    })

    return result
}