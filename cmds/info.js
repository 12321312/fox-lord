const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

  let infore = new Discord.RichEmbed()
  .setDescription("Информация о сервере ~Fox's Shelter~")
  .setThumbnail(message.guild.iconURL)
  .setFooter("Твой милый бот", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
  .setTimestamp()
  .setColor("#FFDF00")
  .addField("Создатель бота и сервера:", `<@!294844223675564034>`)
  .addField("Всего пользователей на сервере:", message.guild.members.size, true)
  .addField("Всего онлайн:", message.guild.members.filter(m => m.presence.status === 'online').size, true)
  .addField("Мой пинг:", "-" + bot.ping , true)
  .addField("Твой пинг:", message.createdTimestamp - Date.now(), true)
  .addField("ID сервера:", message.guild.id)
  .addField("Регион сервера:", message.guild.region)
  .addField("Создан сервер:", message.guild.createdAt, true);



    message.channel.send({embed:infore}).then(async msg => await msg.delete(15000));
    message.delete(15000);
};
module.exports.help = {
    name: "серверинфо"
};
