const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    if(args[0] == "help"){
      message.reply("Не правильная жалоба, напиши так: ```!report <юзер упоминание> <причина>```");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Такого участника нету, иди нахуй.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Репорт")
    .setColor('#c10020')
    .addField("На:", `${rUser} смотреть ID: ${rUser.id}`)
    .addField("От:", `${message.author} Смотреть ID: ${message.author.id}`)
    .addField("Канал:", message.channel)
    .addField("Время:", message.createdAt)
    .addField("Причина:", rreason);

    let reportschannel = message.guild.channels.get("592383011581067274");
    if(!reportschannel) return message.channel.send("Нет такого канала.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "репорт"
}