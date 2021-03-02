const Discord = require('discord.js')
const economy = require('../../economy')
const { bot_channels } = require('../../config.json')

const symbols = [4, 4, 4, 4, 3, 3, 3, 2, 2, 1]
const slotsymbols = ['Apel', 'Lemon', 'Duren', 'Kucing']
const coinCost = 10
const rewards = [0, 1000, 500, 300, 250]

const isJackPot = (number) => {
    const winner = symbols[number % 10]
    
    console.log('winner symbol: ', winner)

    for (let i = 0; i < 2; i++) {
        number = Math.floor(number/10)

        console.log('current symbol: ', symbols[number % 10])

        if (symbols[number % 10] !== winner) return 0
    }
    return winner;
}

const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// jackpot 1 = 1000 coins
// jackpot 2 = 500 coins
// jackpot 3 = 300 coins
// jackpot 4 = 250 coins

module.exports = {
    commands: ['slot'],
    description: 'bet your coins on slot machine. costs 10 coins.',
    callback: async (message, arguments) => {
        const { guild, member } = message

        // check coin purse
        const coinsOwned = await economy.getCoins(guild.id, member.id)
        if (coinsOwned < coinCost) {
            message.client.channels.cache.get(bot_channels[guild.id]).send(`You do not have enough coins!.`)
            return
        }

        var slotnum = [
            randomBetween(1, 9),
            randomBetween(1, 9),
            randomBetween(1, 9)
        ]

        var slotstring = [
            slotnum[0].toString(10),
            slotnum[1].toString(10),
            slotnum[2].toString(10)
        ]
        let slotres = +`${slotstring[0] + slotstring[1] + slotstring[2]}`
        console.log(slotres, typeof(slotres), isJackPot(slotres))

        let title = `\`| ${slotsymbols[symbols[slotnum[0]]-1]} | ${slotsymbols[symbols[slotnum[1]]-1]} | ${slotsymbols[symbols[slotnum[2]]-1]} |\``
        let des = ''
        const winNum = isJackPot(slotres)

        if (winNum == 0) {
            des = `you lost :)`
            await economy.addCoins(guild.id, member.id, coinCost * -1)
        } else if (winNum == 4) {
            des = `You won 250 coins`
            await economy.addCoins(guild.id, member.id, rewards[winNum]-coinCost)
        } else if (winNum == 3) {
            des = `You won 300 coins` 
            await economy.addCoins(guild.id, member.id, rewards[winNum]-coinCost)
        } else if (winNum == 2) {
            des = `You won 500 coins!!`
            await economy.addCoins(guild.id, member.id, rewards[winNum]-coinCost)
        } else {
            des = `YOU HIT JACKPOT!! YOU WON 1000 COINS`
            await economy.addCoins(guild.id, member.id, rewards[winNum]-coinCost)
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#f9b243')
            .setTitle(title)
            .setDescription(des)


        message.reply(embed)
        // message.reply(`you have given <@${userId}> ${coins} coins. They now have ${newCoins} coins.`)
        // message.client.channels.cache.get(bot_channels[guildId]).send(`you have given <@${userId}> ${coins} coins. They now have ${newCoins} coins.`)
    }
}