const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let a = message.author;
    connection.query(`SELECT * FROM xp WHERE id = '${a.id}'`, (err, rows) => {
     if(err) throw err;
     let xpi = rows[0].xp;
     let point = rows[0].point;
    
    var lvl = 1;
    if (xp > 1000) lvl = 1; if (xp > 2000) lvl = 2; if (xp > 3000) lvl = 3; if (xp > 4000) lvl = 4; if (xp > 5000) lvl = 5; if (xp > 7000) lvl = 7; if (xp > 8000) lvl = 8; if (xp > 9000) lvl = 9; if (xp > 10000) lvl = 10; if (xp > 11000) lvl = 11; if (xp > 12000) lvl = 12; if (xp > 13000) lvl = 13; if (xp > 14000) lvl = 14; if (xp > 15000) lvl = 15; if (xp > 16000) lvl = 16;
    if (xp > 17000) lvl = 17; if (xp > 18000) lvl = 18; if (xp > 19000) lvl = 19; if (xp > 20000) lvl = 20;

    
    let ambed = new Discord.RichEmbed()
    .setTitle("Информация о участнике")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#10c7e2').addField("Имя",a.username)
    .addField("Тэг",a.tag)
    .addField("Дискриминатор",a.discriminator)
    .addField("Опыта:",xpi + " XP")
    .addField("Уровень:",lvl)
    .addField("Донат поинтов:",point)
    .addField("Создание аккаунта",a.createdAt)
    .setThumbnail(a.avatarURL);

    bot.send({embed:ambed});
});
};
module.exports.help = {
    name: "юзеринфо"
};
