const { bot_channels } = require('@root/config.json')
const sem6_items = require('@util/role_sem6')

module.exports = {
    commands: ['sem6'],
    minArgs: 0,
    maxArgs: 2,
    expectedArgs: '<list=list role yang ada> | <nama role=dapetin role>',
    description: "Lists role semester 6.",
    callback: async (message, arguments) => {

        const { guild, member } = message

        if (guild.id != '762982733747060736' && guild.id != '469143644524380164') {
            console.log('salah server')
            return

        } else if (!arguments[0]) {
            message.reply('no arguments')

        } else if (arguments[0].toLowerCase() == 'list') {
            const semRoles = sem6_items[guild.id]
            let reply = 'sem6 Roles (buat kalau mau di tag untuk matkul tertentu):\n\n'
            // console.log(semRoles)

            for (item in semRoles) {
                reply += `**${item}** - ${semRoles[item]}\n`
            }

            reply += `\n\`!sem6 get <nama role>\`\n`

            message.client.channels.cache.get(bot_channels[guild.id]).send(reply)

        } else if (arguments[0].toLowerCase() == 'get') {
            const role = guild.roles.cache.find(role => role.name === arguments[1])
            if (typeof(role) == 'undefined') {
                message.reply('role engga ada')
            } else if (member.roles.cache.some(role => role.name === arguments[1])) {
                message.reply(`rolenya dah ada cok`)
            } else {
                member.roles.add(role)
                message.reply(`tambah role **${arguments[1]}**`)
            }

        }
    }
}