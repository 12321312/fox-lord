const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник"].includes(r.name))) return message.reply('У вас нет прав на вызов админ-меню.');
let zhanei = message.member.roles.filter(r => r.name !=="@everyone" && r.name == "Лисий повелитель" || r.name == "Куратор" || r.name == "Дозорный" || r.name == "Прислужник").map(r => r).join(', ')
    let a = message.author;
    let ambed = new Discord.RichEmbed()
    .setTitle("Админ Команды:")
    .setDescription(`Доступны для: ${zhanei}`)
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#c10020')
    .setThumbnail("http://www.sclance.com/pngs/admin-png/admin_png_17235.jpg")
    .addField("!админка","Вызывает это окно");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник"].includes(r.name))) ambed.addField("!варн *<юзер> <причина>*","Выдает варн пользователю. Подробнее '!варн'");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник"].includes(r.name))) ambed.addField("!мут *<юзер> <время(1s|1m|1h|1d|1w)> <причина>*","Запрещает писать в чат на указанное время.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник"].includes(r.name))) ambed.addField("!гаг *<юзер> <время(1s|1m|1h|1d|1w)> <причина>*","Запрещает говорить на указанное время.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) ambed.addField("!унмут *<юзер>*","Снимает мут.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) ambed.addField("!унгаг *<юзер>*","Снимает гаг.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) ambed.addField("!бан *<юзер> <причина>*","Банит юзера на сервере.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) ambed.addField("!кик *<юзер>*","Кикает юзера на сервере.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) ambed.addField("!регион *<регион>*","Меняет на нужный регион сервер.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) ambed.addField("!баба *<юзер>*","Дает роль 'Барышня'.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор"].includes(r.name))) ambed.addField("!админ *<юзер упоминание> <роль> <дать/забрать>*","Выдает или забирает админку пользователю.");
    if(message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник"].includes(r.name))) ambed.addField("!удалить *<юзер> <кол-во>*","Удаляет сообщение пользователя в указаном кол-ве, можно удалить все, указав только кол-во.");

    message.delete(15000);
    message.channel.send({embed:ambed}).then(async msg => await msg.delete(15000));

};
module.exports.help = {
    name: "админка"
};
 
