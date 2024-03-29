const Discord = require('discord.js')
const user = require('@util/user')
const { bot_channels } = require('@root/config.json')

module.exports = {
    commands: ['profile'],
    description: "Displays your profile.",
    callback: async (message) => {
        const { guild, member } = message
        const guildId = guild.id
        const memberId = member.id

        const username = member.user.username
        const discriminator = member.user.discriminator

        // console.log(member.user)

        try {
            const result = await user.getProfile(username, discriminator, guildId, memberId)

            const embed = new Discord.MessageEmbed()
                // .setTitle(`${member.displayName}`)
                .setAuthor(`${member.displayName}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setColor(member.displayHexColor)
                .addFields({
                    name: 'Level',
                    value: `${result.level}`,
                    inline: true
                })
                .addFields({
                    name: 'XP',
                    value: `${result.xp}`,
                    inline: true
                })
                .addFields({
                    name: 'Coins',
                    value: `${result.coins}`,
                    inline: true
                })
                .addFields({
                    name: 'Count Contributions',
                    value: `${result.count_contributions}`,
                    inline: false
                })
            
            message.reply(embed)
        }catch(err) {
            console.log(err)
            message.reply('something bad happened :( please try again')
        }
        

    }
}