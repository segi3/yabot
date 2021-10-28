const Discord = require('discord.js')
const user = require('@util/user')
const { bot_channels } = require('@root/config.json')

module.exports = {
    commands: ['stab'],
    permissionError: 'NO.',
    permissions: 'ADMINISTRATOR',
    description: 'Kick a user.',
    callback: async (message, arguments) => {
        const { guild, member } = message
        const guildId = guild.id
        const memberId = member.id

        const tag = `<@${memberId}>` // salah ini, ganti ke target

        // temp, lupa cara pake base command
        if (!member.hasPermission('KICK_MEMBERS')) {
            message.reply('No permission to use command.')
        }

        const mention = message.mentions.users.first()
        if (!mention) {
            message.reply('Tag a user.')
        } else {
            const target = message.guild.members.cache.get(mention.id)
            target.kick()
            message.channel.send(`${tag} has been stabbed and is now bleeding to death.`)
        }

    }
}