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

module.exports = {
    tweetStatusUpdate,
    tweetLogInsert
}