const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let target = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]) || message.author);
    connection.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
     if(err) throw err;
     let xp = rows[0].xp;
    });
    let a = message.author;
    let ambed = new Discord.RichEmbed()
    .setTitle("Информация о участнике")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#10c7e2').addField("Имя",a.username)
    .addField("Тэг",a.tag)
    .addField("Дискриминатор",a.discriminator)
    .addField("Опыта:",xp)
    .addField("Создание аккаунта",a.createdAt)
    .setThumbnail(a.avatarURL);

    bot.send({embed:ambed});

};
module.exports.help = {
    name: "юзеринфо"
};
