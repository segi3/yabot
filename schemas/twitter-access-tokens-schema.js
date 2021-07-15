const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const twitterAccessTokensSchema = mongoose.Schema({
    username: reqString,
    discriminator: reqString,
    accessToken: reqString,
    accessTokenSecret: reqString,
    userId: reqString,
    twitterUsername: reqString
})

module.exports = mongoose.model('twitter_access_tokens', twitterAccessTokensSchema)