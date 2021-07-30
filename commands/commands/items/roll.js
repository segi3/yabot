const Discord = require('discord.js')

const economy = require('@features/economy')
const { bot_channels } = require('@root/config.json')
const itemManager = require('@bot_modules/itemManager')
const fruitGacha = require('@bot_modules/fruitGacha')

const { fruits } = require('@bot_modules/items.json')

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const gradeColor = {
    "S": "#f9b243",
    "A": "#F2542D",
    "B": "#0E9594",
    "C": "#50FFB1",
    "D": "#1C0B19"
}

// setup
var values = []
var grades = []

fruits.forEach(fruit => {
    if (values[fruit.name] == null) values[fruit.name] = fruit.value
    if (grades[fruit.name] == null) grades[fruit.name] = fruit.grade
})

module.exports = {
    commands: ['roll'],
    minArgs: null,
    maxArgs: 2,
    expectedArgs: "<edit here>",
    description: "edit .",
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        var embed = new Discord.MessageEmbed()
            .setColor('#f9b243')
            .setDescription(`rolling fruits~~`)

        var replyMessage = message.reply(embed)
        .then(async (msg) => {
            await sleep(4000)
            var gachaRes = []

            for (r=0; r<10; r++) {

                var tmp = fruitGacha.roll1()

                if (gachaRes[tmp.name] == null) gachaRes[tmp.name] = 1
                else gachaRes[tmp.name]++
    
                embed = new Discord.MessageEmbed()
                    .setColor(`${gradeColor[tmp.grade]}`)
                    .setDescription(`you rolled **${tmp.name}**! [**${tmp.grade}**] (${r+1}/10)`)
                    
                msg.edit(embed)

                await sleep(2000)
    
            }

            // proses arr to string
            var finalmsg = ''
            for (key in gachaRes) {
                finalmsg += `[**${grades[key]}**] **${key}** — ${gachaRes[key]}\n`
            }

            embed = new Discord.MessageEmbed()
                .setColor('#f9b243')
                .setDescription('roll results')
                .addFields({
                    name: 'Item — Count',
                    value: finalmsg
                })
            msg.edit(embed)
        })
        
        

        return

        const itm = [{
            name: 'durian',
            count: 2
        }, {
            name: 'apel',
            count: 4
        }]

        itemManager.addItems(guild.id, member.id, itm)
        
        message.reply(`tested.`)
    }
}