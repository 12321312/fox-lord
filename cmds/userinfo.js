const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let a = message.author;
    let ambed = new Discord.RichEmbed()
    .setTitle("Информация о участнике")
    .setTimestamp()
    .setFooter("Твой милый бот", bot.avatarURL)
    .setColor('#10c7e2').addField("Имя",a.username)
    .addField("Тэг",a.tag)
    .addField("Дискриминатор",a.discriminator)
    .addField("Создание аккаунта",a.createdAt)
    .setThumbnail(a.avatarURL);

    bot.send({embed:ambed});

};
module.exports.help = {
    name: "юзеринфо"
};
