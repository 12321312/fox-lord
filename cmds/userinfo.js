const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let a = message.author;
    connection.query(`SELECT * FROM xp WHERE id = '${a.id}'`, (err, rows) => {
     if(err) throw err;
     let xpi = rows[0].xp;
     //let point = rows[0].point;
    
    var lvl = 1;
    if (xpi > 1000) lvl = 1; if (xpi > 2000) lvl = 2; if (xpi > 3000) lvl = 3; if (xpi > 4000) lvl = 4; if (xpi > 5000) lvl = 5; if (xpi > 7000) lvl = 7; if (xpi > 8000) lvl = 8; if (xpi > 9000) lvl = 9; if (xpi > 10000) lvl = 10; if (xpi > 11000) lvl = 11; if (xpi > 12000) lvl = 12; if (xpi > 13000) lvl = 13; if (xpi > 14000) lvl = 14; if (xpi > 15000) lvl = 15; if (xpi > 16000) lvl = 16;
    if (xpi > 17000) lvl = 17; if (xpi > 18000) lvl = 18; if (xpi > 19000) lvl = 19; if (xpi > 20000) lvl = 20;

    
    let ambed = new Discord.RichEmbed()
    .setTitle("Информация о участнике")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#10c7e2').addField("Имя",a.username)
    .addField("Тэг",a.tag)
    .addField("Дискриминатор",a.discriminator)
    .addField("Опыта:",xpi + " XP")
    .addField("Уровень:",lvl)
    //.addField("Донат поинтов:",point)
    .addField("Создание аккаунта",a.createdAt)
    .setThumbnail(a.avatarURL);

    bot.send({embed:ambed});
});
};
module.exports.help = {
    name: "юзеринфо"
};
