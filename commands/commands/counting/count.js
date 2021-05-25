const Discord = require('discord.js')
const { count_channels } = require('@root/config.json')

const count = require('@util/count')

module.exports = {
    commands: ['count'],
    description: 'count infinitely.',
    callback: async (message, arguments) => {
        const { guild, member } = message

        if (message.channel.id != count_channels[guild.id]) return

        // update count
        const result = await count.incrementCount(guild.id, 1)
        await count.addCountContributions(guild.id, member.id, 1)

        const embed = new Discord.MessageEmbed()
            .setColor('#f9b243')
            .setTitle(result)

        message.reply(embed)
    }
}