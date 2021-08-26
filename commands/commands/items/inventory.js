const Discord = require('discord.js')
const profileSchema = require('@schemas/profile-schema')

const { fruits } = require('@bot_modules/items.json')

// setup
var values = []
var grades = []

fruits.forEach(fruit => {
    if (values[fruit.name] == null) values[fruit.name] = fruit.value
    if (grades[fruit.name] == null) grades[fruit.name] = fruit.grade
})

module.exports = {
    commands: ['inventory'],
    minArgs: null,
    maxArgs: 0,
    description: 'Show your inventory.',
    callback: async (message, arguments, text) => {

        const { guild, member } = message

        const result = await profileSchema.findOne({
            guildId: guild.id,
            userId: member.id
        }).exec()

        var meseg = ''
        result.items.forEach(item => {
            meseg += `[**${grades[item.name]}**] **${item.name}** — ${item.count}\n`
        });

        const embed = new Discord.MessageEmbed()
            .setColor('#f9b243')
            .setDescription(`Inventory`)
            .addFields({
                name: 'Item — Count',
                value: meseg
            })

        message.reply(embed)
    },
}