const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("нет такого пользователя!");
    if (bUser.id == "294844223675564034") { message.reply('а пизды не дать?'); return; }

    if (message.member.roles.get('537700464888643595') || message.member.roles.get('537705223301365781') || message.member.roles.get('537704565043363840')) { 
    let bReason = args.slice(1).join(" ") || "---";
    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setThumbnail("https://pngimage.net/wp-content/uploads/2018/06/%D0%B1%D0%B0%D0%BD-png-3-300x200.png")
    .setFooter("Бан систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .setColor("#bc0000")
    .addField("Забанен:", `${bUser}`)
    .addField("Администратор:", `<@${message.author.id}>`)
    .addField("Канал:", message.channel)
    .addField("Причина:", bReason)
    .addField("Время:", message.createdAt);

    let banchannel = message.guild.channels.get("537720268446236682");
    if(!banchannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");

    message.guild.member(bUser).ban(bReason);
    banchannel.send({embed:banEmbed});

} else 
{
  message.reply("А пососать не завернуть?");
};

};

module.exports.help = {
  name:"бан"
};