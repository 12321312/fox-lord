const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("нет такого пользователя!");
    if (kUser.id == "294844223675564034") return message.reply('а пизды не дать?');
    if (kUser.id == "565899297187692544") return message.reply('я тя ща сам кину, сука');
    if (kUser.roles.get("592343493905743906")) return message.reply('ботов, сука, не трогай');

    let kReason = args.slice(1).join(" ") || "---";
    let banEmbed = new Discord.RichEmbed()
    .setTitle("~Kick~")
    .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/18/01/kickboxing-152817_960_720.png")
    .setFooter("Кик систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .setTimestamp()
    .setColor("#bc0000")
    .addField("Кикнут:", `${kUser}`, true)
    .addField("Администратор:", `<@${message.author.id}>`, true)
    .addField("Канал:", message.channel, true) 
    .addField("Причина:", kReason, false)
    .addField("Время:", message.createdAt, false);

    let banchannel = message.guild.channels.get("537720268446236682");
    if(!banchannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");

    message.delete();
    message.guild.member(kUser).kick(bReason);
    banchannel.send({embed:banEmbed});
    message.channel.send('Пользователь' + `<@${kUser.id}>` + ' был кикнут по причине: **' + `${kReason}` + '**');

};

module.exports.command = {
  name: 'kick',
  aliases: ["кик", "кикнуть", "выгнать"],
  description: "Выдаёт кик нахуй, чо доебался?",
  usage: "admincommand",
  category: "admin",
  enabled: true
}; 