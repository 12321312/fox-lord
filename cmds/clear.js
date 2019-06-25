const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
let mention = message.mentions.users.first();
if (message.member.roles.get('537700464888643595') || message.member.roles.get('537705223301365781') || message.member.roles.get('537704565043363840')) {
if (!mention) {
if (isNaN(args[0])) {message.reply('А сколько удалять то? \n Напиши: `!удалить <число>`'); return; }
if ((args[0]) >= 100) { message.reply('Больше 100 за раз не могу ;с'); return; }


const fetched = await message.channel.fetchMessages({limit: args[0]});
console.log(fetched.size + ' сообщения найдены, удаление...'); 
message.reply('удалено `' + fetched.size + '` сообщений');       
      
message.channel.bulkDelete(fetched)
.catch(error => message.channel.send(`Error: ${error}`));   
} else {
    if (isNaN(args[1])) {message.reply('А сколько удалять то? \n Напиши: `!удалить <упоминание> <число>`'); return; }
    if ((args[1]) >= 100) { message.reply('Больше 100 за раз не могу ;с'); return; }
  let mention = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  fetched = await message.channel.fetchMessages({limit: args[1]});
  if (mention) fetched = fetched.filter(m => m.author.id === mention.id || m.content === message.content);

  console.log(fetched.size + ' сообщения пользователя ' + `${mention.user.tag}` + ' найдены, удаление...'); 
  message.reply('удалено `' + fetched.size + '` сообщений пользователя ' + `<@${mention.id}>`);       
      
  message.channel.bulkDelete(fetched)
};
} else 
{
  message.reply("А пососать не завернуть?");
};
};
module.exports.help = {
    name: "удалить"
};
