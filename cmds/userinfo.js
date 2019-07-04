const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let target = message.author;
    connection.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
     if(err) throw err;
     let xp = rows[0].xp;
    
    let lvl = 1;
    if (xp < 1000) lvl = 1; if (xp < 2000) lvl = 2; if (xp < 3000) lvl = 3; if (xp < 4000) lvl = 5;

    let ambed = new Discord.RichEmbed()
    .setTitle("Информация о участнике")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#10c7e2').addField("Имя",target.username)
    .addField("Тэг",target.tag)
    .addField("Дискриминатор",target.discriminator)
    .addField("Опыта:",xp + " XP")
    .addField("Уровень:",lvl)
    .addField("Создание аккаунта",target.createdAt)
    .setThumbnail(target.avatarURL);

    bot.send({embed:ambed});
});
};
module.exports.help = {
    name: "юзеринфо"
};
