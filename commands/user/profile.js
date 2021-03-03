const Discord = require('discord.js')
const user = require('../../user')
const { bot_channels } = require('../../config.json')

module.exports = {
    commands: ['profile'],
    description: "Displays your profile.",
    callback: async (message) => {
        const { guild, member } = message
        const guildId = guild.id
        const memberId = member.id

        try {
            const result = await user.getProfile(guildId, memberId)

            const embed = new Discord.MessageEmbed()
                .setTitle(`${member.displayName}`)
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
            
            message.reply(embed)
        }catch(err) {
            console.log(err)
            message.reply('something bad happened :( please try again')
        }
        

    }
}