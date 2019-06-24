const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

if (message.member.roles.get('537700464888643595') || message.member.roles.get('537705223301365781') || message.member.roles.get('537704565043363840')) {
    let a = message.author;
    let ambed = new Discord.RichEmbed()
    .setTitle("Админ Команды:")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#c10020')
    .addField("**!админка**","Вызывает это окно")
    .addField("**!мут** <юзер> <время(1s|1m|1h|1d|1w)> <причина>","Запрещает писать в чат на указанное время")
    .addField("**!гаг** <юзер> <время(1s|1m|1h|1d|1w)> <причина>","Запрещает говорить на указанное время")
    .addField("**!унмут** <юзер>","Снимает мут")
    .addField("**!унгаг** <юзер>","Снимает гаг")
    .setThumbnail("http://www.sclance.com/pngs/admin-png/admin_png_17235.jpg");

    bot.send({embed:ambed});
} else 
{
  message.reply("А пососать не завернуть?"); 
};

};
module.exports.help = {
    name: "админка"
};
