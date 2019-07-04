const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let a = message.author;
    connection.query(`SELECT * FROM xp WHERE id = '${a.id}'`, (err, rows) => {
     if(err) throw err;
     let xpi = rows[0].xp;
     let point = rows[0].point;
    
    var lvl = 1;
    if (xpi > 1000) lvl = 1; if (xpi > 2000) lvl = 2; if (xpi > 3000) lvl = 3; if (xpi > 4000) lvl = 4; if (xpi > 5000) lvl = 5; if (xpi > 7000) lvl = 7; if (xpi > 8000) lvl = 8; if (xpi > 9000) lvl = 9; if (xpi > 10000) lvl = 10; if (xpi > 11000) lvl = 11; if (xpi > 12000) lvl = 12; if (xpi > 13000) lvl = 13; if (xpi > 14000) lvl = 14; if (xpi > 15000) lvl = 15; if (xpi > 16000) lvl = 16;
    if (xpi > 17000) lvl = 17; if (xpi > 18000) lvl = 18; if (xpi > 19000) lvl = 19; if (xpi > 20000) lvl = 20; if (xpi > 21000) lvl = 21; if (xpi > 22000) lvl = 22; if (xpi > 23000) lvl = 23;  if (xpi > 24000) lvl = 24; if (xpi > 25000) lvl = 25; if (xpi > 26000) lvl = 26; if (xpi > 27000) lvl = 27; if (xpi > 28000) lvl = 28;  if (xpi > 29000) lvl = 29;  if (xpi > 30000) lvl = 30;  if (xpi > 31000) lvl = 31;
    if (xpi > 32000) lvl = 32; if (xpi > 33000) lvl = 33; if (xpi > 34000) lvl = 34; if (xpi > 35000) lvl = 35; if (xpi > 36000) lvl = 36; if (xpi > 37000) lvl = 37; if (xpi > 38000) lvl = 38; if (xpi > 39000) lvl = 39; if (xpi > 40000) lvl = 40; if (xpi > 41000) lvl = 41; if (xpi > 42000) lvl = 42; if (xpi > 43000) lvl = 43; if (xpi > 44000) lvl = 44; if (xpi > 45000) lvl = 45; if (xpi > 46000) lvl = 46; if (xpi > 47000) lvl = 47; if (xpi > 48000) lvl = 48;
    if (xpi > 49000) lvl = 49; if (xpi > 50000) lvl = 50; if (xpi > 51000) lvl = 51; if (xpi > 52000) lvl = 52; if (xpi > 53000) lvl = 53; if (xpi > 54000) lvl = 54; if (xpi > 55000) lvl = 55; if (xpi > 56000) lvl = 56; if (xpi > 57000) lvl = 57; if (xpi > 58000) lvl = 58; if (xpi > 59000) lvl = 59; if (xpi > 60000) lvl = 60; if (xpi > 50000) lvl = 61;

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
