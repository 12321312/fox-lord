const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Название сервера:", message.guild.name)
    .addField("Создан:", message.guild.createdAt)
    .addField("Вы зашли:", message.member.joinedAt)
    .addField("Всего участников:", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"инфо"
}
