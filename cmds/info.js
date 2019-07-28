const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
  let infore = new Discord.RichEmbed()
  .setDescription("Информация о сервере ~Fox's Shelter~")
  .setThumbnail(message.guild.avatarURL)
  .setFooter("Твой милый бот", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
  .setTimestamp()
  .setColor("#FFDF00")
  .addField("Создатель бота и сервера:", `<@${294844223675564034}>`)
  .addField("Всего пользователей на сервере:", guild.members.size, true)
  .addField("Всего онлайн:", guild.members.filter(m => m.presence.status === 'online').size, true);


    message.channel.send({embed:infore}).then(async msg => await msg.delete(15000));

      message.delete(15000);
};
module.exports.help = {
    name: "серверинфо"
};
