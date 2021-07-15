const config = require('@root/config.json')

const { TwitterClient } = require('twitter-api-client')

const twitterClient = new TwitterClient({
    apiKey: config.TWITTER_API_KEY,
    apiSecret: config.TWITTER_API_SECRET,
    accessToken: config.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: config.TWITTER_ACCESS_TOKEN_SECRET
})

// https://github.com/FeedHive/twitter-api-client/blob/main/REFERENCES.md#tweets

const tweetStatusUpdate = async (status) => {
    try {
        const respond = await twitterClient.tweets.statusesUpdate({
            status: status
        })
    
        return respond.id_str
        

    }catch (err) {
        return 'err:tweet'
    }

}

const tweetLogSchema = require('@schemas/tweet-log-schema')

const tweetLogInsert = async (log) => {

    try {

        console.log(log)

        const result = await tweetLogSchema(log).save()

        console.log(result)

        return true

    } catch (err) {

        console.log(err)

        return false
    }
}

// tweet from yabot

// ? https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens
const tweetAccessToken = require('@schemas/twitter-access-tokens-schema')
const tweetFromYabot = async (user) => {

    const user_token = await tweetAccessToken.findOne({ 
        username: user.username,
        discriminator: user.discriminator
    }).exec()

    // console.log(user_token.accessToken, user_token.accessTokenSecret)
    // console.log(user_token)
    if (user_token == null) {
        return {
            twtUsername: null,
            twtId: null,
            err: 'err:not_found'
        }
    }

    const twitterClientUser = new TwitterClient({
        apiKey: config.TWITTER_DARI_YABOT_API_KEY,
        apiSecret: config.TWITTER_DARI_YABOT_API_SECRET,
        accessToken: user_token.accessToken,
        accessTokenSecret: user_token.accessTokenSecret
    })

    try {
        const respond = await twitterClientUser.tweets.statusesUpdate({
            status: user.status
        })

        return {
            twtUsername: respond.user.screen_name,
            twtId: respond.id_str,
            err: null
        }

    }catch (err) {
        console.log(err)
        return {
            twtUsername: null,
            twtId: null,
            err: 'err:tweet'
        }
    }
}

module.exports = {
    tweetStatusUpdate,
    tweetLogInsert,
    tweetFromYabot
}