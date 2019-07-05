const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("нет такого пользователя!");
    if (kUser.id == "294844223675564034") { message.reply('а пизды не дать?'); return; }

    if (message.member.roles.get('537700464888643595') || message.member.roles.get('537705223301365781') || message.member.roles.get('537704565043363840')) { 
    let bReason = args.slice(1).join(" ") || "---";
    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/18/01/kickboxing-152817_960_720.png")
    .setFooter("Кик систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .setColor("#bc0000")
    .addField("Кикнут:", `${kUser}`)
    .addField("Администратор:", `<@${message.author.id}>`)
    .addField("Канал:", message.channel) 
    .addField("Причина:", bReason)
    .addField("Время:", message.createdAt);

    let banchannel = message.guild.channels.get("537720268446236682");
    if(!banchannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");

    message.delete();
    message.guild.member(kUser).kick(bReason);
    banchannel.send({embed:banEmbed});
    message.channel.send('Пользователь' + `<@${kUser.id}>` + ' был кикнут по причине: **' + `${bReason}` + '**');

} else 
{
  message.reply("А пососать не завернуть?");
};

};

module.exports.help = {
  name:"кик"
};