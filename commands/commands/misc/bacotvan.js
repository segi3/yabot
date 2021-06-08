const Discord = require('discord.js')

module.exports = {
    commands: ['bv', 'bacot van'],
    minArgs: 0,
    maxArgs: 0,
    description: 'Replies with bacot van',
    callback: (message, arguments, text) => {

        const { guild, member } = message

        console.log(message)

        const embed = new Discord.MessageEmbed()
        .setColor('#f9b243')
        .setDescription(`bacot van`)

        message.reply(embed)

        message.delete({ timeout: 2000 })
    },
}