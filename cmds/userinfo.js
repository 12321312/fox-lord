const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let a = message.author;
    var one = null;
    var two = null;
    var tri = null;
    connection.query(`SELECT * FROM xp,warn WHERE xp.id = '${message.author.id}' AND warn.id = '${message.author.id}'`, async (err, rows) => {
     if(err) throw err;
     let warn1 = rows[0].one;
     let warn2 = rows[0].two;  
     let warn3 = rows[0].tri;
     let xpi = rows[0].xp;
     let point = rows[0].point; 

     let lvl;
     if (xpi && xpi >= 1000) {
        lvl = xpi / 1000
     } else {
        lvl = 1
     }

    if (lvl < lvl.toFixed(0)) lvl -= 1;

    let zhanei = message.member.roles.filter(r => r.name !=="@everyone" && r.name == "Лисий повелитель" || r.name == "Куратор" || r.name == "Дозорный" || r.name == "Прислужник" || r.name == "Божество" || r.name == "Знаток" || r.name == "Просвещенный" || r.name == "Шнурок" || r.name == "Штуцер" || r.name == "Искушенный" || r.name == "Прозелит" || r.name == "V.I.P").map(r => r).join(', ')
    if(!zhanei) zhanei = "нету";
    
    let keys = message.member.roles.filter(r => r.name !=="@everyone" && r.name == "Dota-key" || r.name == "EVE-key" || r.name == "Music-key" || r.name == "Minecraft-key" || r.name == "Gmod-key" || r.name == "SI-key" || r.name == "CS-key" || r.name == "Secret-key").map(r => r).join(', ')
    let pole = "Мужской"; 
    if (message.member.roles.find('name', `Барышня`)) pole = "Женский";
    let oritn = "Не установленно"; 
    if (message.member.roles.find('name', `Пидор`)) oritn = "Пидор";
    if (message.member.roles.find('name', `Натурал`)) oritn = "Натурал";
    if (message.member.roles.find('name', `Лисий повелитель`)) oritn = "Ебет лисичек";

    let ambed = new Discord.RichEmbed()
    .setTitle("Информация о участнике")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setThumbnail(a.avatarURL)
    .setColor('#10c7e2')
    .addField("Имя",a.username, true)
    .addField("Тэг",a.tag, true)
    .addField("Пол:",pole, true)
    .addField("Ориентация:",oritn, true)
    .addField("Статус",a.presence.status, true)
    .addField("Опыта:",xpi + " XP", true)
    .addField("Уровень:",lvl.toFixed(0), true) 
    .addField("Донат поинтов:",point, true)
    .addField("Звание:",zhanei, true)
    .addField("ID индификатор:",a.id, true);
    if(keys) { ambed.addField("Ключи:", keys, true) };
    if(warn1 && !warn2) { ambed.addField("Варны:", `**1:** ${warn1}`, true) };
    if(warn2 && !warn3) { ambed.addField("Варны:", `**1:** ${warn1}\n**2:** ${warn2}`, true) };
    if(warn3) { ambed.addField("Варны:", `**1:** ${warn1}\n**2:** ${warn2}\n**3:** ${warn3}`, true) };
    ambed.addField("Создание аккаунта:",a.createdAt, false);
     
     message.delete(15000);
     message.channel.send({embed:ambed}).then(async msg => await msg.delete(15000));
});
};
module.exports.help = {
    name: "юзеринфо"
};
