const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const profileSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    username: reqString,
    discriminator: reqString,
    coins: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    count_contributions: {
        type: Number,
        default: 0
    },
    items: [{}]
})

module.exports = mongoose.model('profiles', profileSchema)