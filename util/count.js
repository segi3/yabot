const countSchema = require('@schemas/count-schema')
const profileSchema = require('@schemas/profile-schema')

const incrementCount = async (guildId, increment) => {

    const result = await countSchema.findOneAndUpdate({
        guildId
    }, {
        $inc: {
            current_count: increment
        }
    }, {
        upsert: true,
        new: true
    })

    let { current_count } = result

    return current_count
}

const addCountContributions = async (guildId, userId, increment) => {

    await profileSchema.findOneAndUpdate({
        guildId,
        userId
    }, {
        $inc: {
            count_contributions: increment
        }
    }, {
        upsert: true
    })
}

module.exports = {
    incrementCount,
    addCountContributions
}
