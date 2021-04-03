const mongo = require('@util/mongo')

const profileSchema = require('@schemas/profile-schema')

const coinsCache = {}

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {

    let userCoins = 0

    await mongo().then(async (mongoose) => {
        try {
            // console.log('running findOneAndUpdate()')

            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $inc: {
                    coins
                }
            }, {
                upsert: true,
                new: true
            })
            // console.log(result)

            coinsCache[`${guildId}-${userId}`] = result.coins

            userCoins =  result.coins

        } catch (err) {
            console.log('addcoin: ',err)
            throw new Error('Failed to fetch data')
        } finally {
            mongoose.connection.close()
        }
    })

    return userCoins
}

module.exports.getCoins = async (guildId, userId) => {

    const cachedValue = coinsCache[`${guildId}-${userId}`]

    if (cachedValue) {
        return cachedValue
    }

    let coins = 0
    await mongo().then(async (mongoose) => {
        try {
            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            // console.log(result)

            if (result) {
                coins = result.coins
            } else {
                // console.log('inserting a doc')
                await new profileSchema({
                    guildId,
                    userId,
                    coins
                }).save()
            }

            coinsCache[`${guildId}-${userId}`] = coins

            return coins

        } catch (err) {
            console.log('getcoin: ',err)
            throw new Error('Failed to fetch data')
        } finally {
            mongoose.connection.close()
        }
    })

    return coins
}