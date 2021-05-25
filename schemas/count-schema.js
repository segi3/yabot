const mongoose = require('mongoose')


const coinsSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    current_count: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('counts', coinsSchema)