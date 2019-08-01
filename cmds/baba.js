const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
 if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');
 if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!баба *<юзер упоминание>*```");
 let tobaba = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
 if(!tobaba) return message.reply("такого участника нету");
 if(tobaba.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник"].includes(r.name))) return message.reply('админам сиськи не нужны');
 let baba = message.guild.roles.find('name', "Барышня");

 if((args[1]) == "снять" || (args[1]) == "Снять" || (args[1]) == "-" || (args[1]) == "забрать" || (args[1]) == "Забрать") {
    message.delete();
    tobaba.removeRole(baba.id);
    message.channel.send(`Пользователю <@${tobaba.id}> были урезаны сиськи.`);
    return;
 };

 if(tobaba.roles.some(r=>["Барышня"].includes(r.name))) return message.reply('ебанутый шоль?');
 message.delete();
 tobaba.addRole(baba.id);
 message.channel.send(`Пользователю <@${tobaba.id}> были дарованы сиськи.`);

};
module.exports.help = {
    name: "баба"
};
