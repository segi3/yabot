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

const cost = 2000

module.exports = {
    commands: ['roll'],
    minArgs: null,
    maxArgs: 2,
    expectedArgs: "<not yet specified as of now>",
    description: "roll fruits!",
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        if (member.id != '365099627327913986') return

        console.log(guild)

        // const coinsOwned = await economy.getCoins(guild.id, member.id)
        // if (coinsOwned < cost) {
        //     message.reply('you do not have enough coins')
        //     return
        // } else {
        //     const remainingCoins = await economy.addCoins(
        //         guild.id,
        //         member.id,
        //         cost * -1
        //     )
        // }

        var embed = new Discord.MessageEmbed()
            .setColor('#f9b243')
            .setDescription(`rolling fruits~ deducting coins~`)

        var newItems = []

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
            var totVal = 0
            for (key in gachaRes) {
                finalmsg += `[**${grades[key]}**] **${key}** — ${gachaRes[key]}\n`

                newItems.push({
                    name: key,
                    count: gachaRes[key]
                })
                totVal += (values[key] * gachaRes[key])
            }

            embed = new Discord.MessageEmbed()
                .setColor('#f9b243')
                .setDescription(`roll value ${totVal} coins`)
                .addFields({
                    name: 'Item — Count',
                    value: finalmsg
                })
            msg.edit(embed)
            console.log(newItems)

            itemManager.addItems(guild.id, member.id, newItems)
        })

        // const itm = [{
        //     name: 'durian',
        //     count: 2
        // }, {
        //     name: 'apel',
        //     count: 4
        // }]

        // itemManager.addItems(guild.id, member.id, newItems)
        
    }
}