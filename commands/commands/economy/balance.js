const Discord = require('discord.js')
const economy = require('@features/economy')
const { bot_channels } = require('@root/config.json')

module.exports = {
    commands: ['balance', 'bal'],
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    description: "Displays a user's coins.",
    callback: async (message) => {

        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        try {
            const coins = await economy.getCoins(guildId, userId)

            const embed = new Discord.MessageEmbed()
                .setColor('#f9b243')
                .setDescription(`<@${userId}> has ${coins} coins`)
    
            message.client.channels.cache.get(bot_channels[guildId]).send(embed)
        }catch(err) {
            console.log(err)
            message.reply('something bad happened :( please try again')
        }
        
    }
}