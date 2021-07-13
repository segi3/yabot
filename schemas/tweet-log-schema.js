const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const tweetLogsSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    username: reqString,
    discriminator: reqString,
    tweetId: reqString,
    tweetLink: reqString,
    content: reqString
})

module.exports = mongoose.model('tweetLogs', tweetLogsSchema)