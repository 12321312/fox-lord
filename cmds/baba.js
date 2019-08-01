const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
 if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');
 if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!баба *<юзер упоминание>*```");
 let tobaba = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
 if(!tobaba) return message.reply("такого участника нету");
 if(tobaba.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник", "Барышня"].includes(r.name))) return message.reply('ебанутый шоль?');
 message.delete();
 let baba = message.guild.roles.find('name', "Барышня");

 if((args[0]) == "снять" || (args[0]) == "Снять" || (args[0]) == "-" || (args[0]) == "забрать" || (args[0]) == "Забрать") {
    tobaba.removeRole(baba.id);
    message.channel.send(`Пользователю <@${tobaba.id}> были урезаны сиськи.`);
    return;
 };
 tobaba.addRole(baba.id);
 message.channel.send(`Пользователю <@${tobaba.id}> были дарованы сиськи.`);

};
module.exports.help = {
    name: "баба"
};
