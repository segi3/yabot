const Discord = require('discord.js')
const economy = require('@features/economy')
const { bot_channels } = require('@root/config.json')

const yaboi_id = '365099627327913986'

coins = 1500

module.exports = {
    commands: ['thr'],
    permissionError: 'gak punya duit sok ngasih thr.',
    permissions: 'ADMINISTRATOR',
    description: 'sawer thr.',
    callback: async (message, arguments) => {

        const { guild, member } = message

        if (member.id != yaboi_id) {
            message.client.channels.cache.get(bot_channels[guild.id]).send(`gak punya duit sok ngasih thr.`)
            return
        }
        const embed_ucapan = new Discord.MessageEmbed()
                    .setColor('#77dd77')
                    .setDescription(`Selamat hari lebaran 🙏. Mohon maaf lahir dan batin`)
        message.client.channels.cache.get(bot_channels[guild.id]).send(embed_ucapan)

        const curr_guild = message.client.guilds.cache.get(guild.id)

        curr_guild.members.cache.each(async (member) => {
            const user = member.user
            if (user.bot){
                return
            }
            console.log(`${user.username}#${user.discriminator}`)
            console.log(user)

            try {
                const newCoins = await economy.addCoins(guild.id, user.id, coins)

                const embed = new Discord.MessageEmbed()
                    .setColor('#77dd77')
                    .setDescription(`thr untuk <@${user.id}> ${coins} koin.`)
                message.client.channels.cache.get(bot_channels[guild.id]).send(embed)
            } catch (err) {
                console.log(err)
                message.reply('gagal ngirim koin')
            }
        })

    }
}