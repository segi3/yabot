const Discord = require('discord.js')

var responses = [
    "pastinya",
    "udah pasti gitu",
    "udah darisananya juga gitu",
    "iyala, jelas",
    "yang aku liat sih iya",
    "hmm bisa jadi",
    "keliatannya gitu",
    "ya",
    "sip",
    "yoi",
    "YOI BANGET BRO",
    "yessss",
    "akulah segitiga",
    "petunjuk petunjuk ku mengarah ke jawaban iya",

    "coba lagi",
    "YAKALI ANJIR WKWKWKWK",
    "pertanyaan laen",
    "gak mau ngasih tau",
    "hmm jawab engga ya",
    "tidak bisa diprediksi",
    "tolong fokus terus tanya lagi",
    "jangan berharap",
    "jawabanku tidak",
    "kata intel enggak",
    "keliatannya sih enggak",
    "tidak",
    "nope",
    "sama sekali tidak"
]

module.exports = {
    commands: ['kerang'],
    minArgs: 1,
    maxArgs: null,
    expectedArgs: "<you question>",
    description: 'TANYA KERANG AJAIB.',
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        var randomNumber = Math.floor(Math.random()*responses.length);
        var myResponse = responses[randomNumber]

        const embed = new Discord.MessageEmbed()
            .setColor('#f9b243')
            .setTitle(`${text}`)
            .setDescription(`${myResponse} [<@${message.author.id}>]`)

        message.reply(embed)
    }
}