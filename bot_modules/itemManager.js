const profileSchema = require('@schemas/profile-schema')

const addItems = async (guildId, userId, newItems) => {

    const result = await profileSchema.findOne({
        guildId,
        userId
    }).exec()

    var currItems = result.items

    newItems.forEach(item => {
        for (i=0; i<currItems.length; i++) {
            if (currItems[i].name == item.name) {
                currItems[i].count += item.count
                return
            }
        }
        currItems.push({
            name: item.name,
            count: item.count
        })
    })

    const updateResult = await profileSchema.findOneAndUpdate({
        guildId,
        userId
    }, {
        guildId,
        userId,
        items: currItems
    }, {
        upsert: true,
        new: true
    })

    return currItems
}

module.exports = {
    addItems
}