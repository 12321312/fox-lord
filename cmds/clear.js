const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

if (!message.member.roles.get("537700464888643595")) { message.reply('Вы не можете удалять сообщения. :с'); return; }
if (isNaN(args[0])) {message.reply('А сколько удалять то? \n Напиши: `!удалить <число>`'); return; }
if ((args[0]) >= 100) { message.reply('Больше 100 за раз не могу ;с'); return; }

const fetched = await message.channel.fetchMessages({limit: args[0]});
console.log(fetched.size + ' сообщения найдены, удаление...'); 
message.reply('удалено `' + fetched.size + '` сообщений');       
      
message.channel.bulkDelete(fetched)
.catch(error => message.channel.send(`Error: ${error}`));   

};
module.exports.help = {
    name: "удалить"
};
