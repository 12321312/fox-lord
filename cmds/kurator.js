const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
 if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор"].includes(r.name))) return message.reply('Отказано в доступе.');
 if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!админ <юзер упоминание> <роль> <дать/забрать>```");
 if (!(args[1])) return message.reply("Не верно указано время, напиши так: ```!админ <юзер упоминание> <роль> <дать/забрать>```");
 let toadmin = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
 if(!toadmin) return message.reply("такого участника нету");
 if (toadmin.id == "294844223675564034")  return message.reply('фоксу нельзя дать роль и снять её.');
 let prislyga = message.guild.roles.find('name', "Прислужник");
 let dozor = message.guild.roles.find('name', "Дозорный");


 message.delete();

 if ((args[2]) == "дать" || (args[2]) == "Дать" || (args[2]) == "Add" || (args[2]) == "add" || (args[2]) == "+" || (args[2]) == "Выдать" || (args[2]) == "выдать") {
     if ((args[1]) == "прислужник" || (args[1]) == "Прислужник" || (args[1]) == "<@&537703136597639178>") { 
     if (toadmin.roles.get(prislyga.id)) return message.reply('он и так в этой роли...');     
     toadmin.addRole(prislyga.id);
     message.channel.send('Пользователю' + `<@${toadmin.id}>` + ' была выдана роль ' + `<@&${prislyga.id}>`);
     } else if ((args[1]) == "дозорный" || (args[1]) == "Дозорный" || (args[1]) == "<@&537704565043363840>") {
        if (toadmin.roles.get(dozor.id)) return message.reply('он и так в этой роли...');    
        toadmin.addRole(dozor.id);
        message.channel.send('Пользователю' + `<@${toadmin.id}>` + ' была выдана роль ' + `<@&${dozor.id}>`);
     } else {
        message.reply("с ролью ошибся кажись, такую выдать не смогу.");
     };
 } else if ((args[2]) == "забрать" || (args[2]) == "Забрать" || (args[2]) == "remove" || (args[2]) == "Remove" || (args[2]) == "-") {
    if ((args[1]) == "прислужник" || (args[1]) == "Прислужник" || (args[1]) == "<@&537703136597639178>") { 
        if (!toadmin.roles.get(prislyga.id)) return message.reply('у него и нет этой роли...'); 
        toadmin.removeRole(prislyga.id);
        message.channel.send('Забрал у пользователя' + `<@${toadmin.id}>` + ' роль ' + `<@&${prislyga.id}>`);
    } else if ((args[1]) == "дозорный" || (args[1]) == "Дозорный" || (args[1]) == "<@&537704565043363840>") { 
        if (!toadmin.roles.get(dozor.id)) return message.reply('у него и нет этой роли...'); 
        toadmin.removeRole(dozor.id);
        message.channel.send('Забрал у пользователя' + `<@${toadmin.id}>` + ' роль ' + `<@&${dozor.id}>`);
    } else {
        message.reply("с ролью ошибся кажись, такую забрать не смогу.");
        }; 
 } else {  message.reply("так мне дать или забрать?") };

};
module.exports.help = {
    name: "админ"
};
