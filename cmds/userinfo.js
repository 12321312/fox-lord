const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let a = message.author;
    connection.query(`SELECT * FROM xp WHERE id = '${a.id}'`, (err, rows) => {
     if(err) throw err;
     let xpi = rows[0].xp;
     let point = rows[0].point; 

     let lvl;
     if (xpi && xpi >= 1000) {
        lvl = xpi / 1000
     } else {
        lvl = 1
     }
    let roles = message.member.roles.map(r=> "<@&" + r.id + ">").join(', ').slice(24);

    let ambed = new Discord.RichEmbed()
    .setTitle("Информация о участнике")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#10c7e2').addField("Имя",a.username, true)
    .addField("Тэг",a.tag, true)
    .addField("Статус",a.presence.status, true)
    .addField("Опыта:",xpi + " XP", true)
    .addField("Уровень:",lvl.toFixed(0), true)
    .addField("Донат поинтов:",point, true)
    .addField("ID индификатор:",a.id)
    .addField("Роли и ключи:",roles, false)
    .addField("Создание аккаунта:",a.createdAt, false)
    .setThumbnail(a.avatarURL);

    bot.send({embed:ambed});
});
};
module.exports.help = {
    name: "юзеринфо"
};
