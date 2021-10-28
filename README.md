### YA-BOT

personal bot made for fun

```
mv config.example.json config.json
```

this bot utilize mongodb as primary database so `mongopath` must be filled.

`bot_channels` use pair of server id and channel id, to dedicate a channel for bot command.

`count_channels` dedicate a channel for counting, enable in `commands/load-commands.js`

to use twitter commands, provide the neccessary api keys, then enable in `commands/load-commands.js`. The `tweet` command tweets from a bot account, while `tweetdariyabot` tweets from user account through yabot, keep in mind that to use `tweetdariyabot` user need to provide their access tokens. read more here https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens

