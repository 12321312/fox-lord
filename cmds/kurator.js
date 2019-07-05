const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
 if ((args[0]) == null) {message.reply("Не верно указан пользователь, напиши так: ```!админ <юзер упоминание> <роль> <дать/забрать>```"); return; }
 if ((args[1]) == null) {message.reply("Не верно указано время, напиши так: ```!админ <юзер упоминание> <роль> <дать/забрать>```"); return; }
 let toadmin = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
 if(!toadmin) return message.reply("такого участника нету");
 if (toadmin.id == "294844223675564034")  return message.reply('фоксу нельзя дать роль и снять её.');
 let prislyga = message.guild.roles.find('name', "Прислужник");
 let dozor = message.guild.roles.find('name', "Дозорный");
 if (message.member.roles.get('537700464888643595') || message.member.roles.get('537705223301365781')) { 
 if ((args[2]) == "дать") {
     if ((args[1]) == "прислужник") { 
     if (toadmin.roles.get(prislyga.id)) return message.reply('он и так в этой роли...');     
     toadmin.addRole(prislyga.id);
     message.channel.send('Пользователю' + `<@${toadmin.id}>` + ' была выдана роль ' + `<@${prislyga.id}>`);
     } else if ((args[1]) == "дозорный") {
        if (toadmin.roles.get(dozor.id)) return message.reply('он и так в этой роли...');    
        toadmin.addRole(dozor.id);
        message.channel.send('Пользователю' + `<@${toadmin.id}>` + ' была выдана роль ' + `<@${dozor.id}>`);
     } else {
        message.reply("с ролью ошибся кажись, такую выдать не смогу.");
     };
 } else if ((args[2]) == "забрать") {
    if ((args[1]) == "прислужник") { 
        if (!toadmin.roles.get(prislyga.id)) return message.reply('у него и нет этой роли...'); 
        toadmin.removeRole(prislyga.id);
        message.channel.send('Забрал у пользователя' + `<@${toadmin.id}>` + ' роль ' + `<@${prislyga.id}>`);
    } else if ((args[1]) == "дозорный") { 
        if (!toadmin.roles.get(dozor.id)) return message.reply('у него и нет этой роли...'); 
        toadmin.removeRole(dozor.id);
        message.channel.send('Забрал у пользователя' + `<@${toadmin.id}>` + ' роль ' + `<@${dozor.id}>`);
    } else {
        message.reply("с ролью ошибся кажись, такую забрать не смогу.");
        }; 
 };
} else { message.reply("А пососать не завернуть?"); }


};
module.exports.help = {
    name: "админ"
};
