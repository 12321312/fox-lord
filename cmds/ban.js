const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');
    if(!bUser) return message.channel.send("нет такого пользователя!");
    if (bUser.id == "294844223675564034") return message.reply('а пизды не дать?');
    if (bUser.id == "565899297187692544") return message.reply('я тя ща сам забаню, сука');
    if (bUser.roles.get("592343493905743906")) return message.reply('ботов, сука, не трогай');

    let bReason = args.slice(1).join(" ") || "---";
    let banEmbed = new Discord.RichEmbed()
    .setTitle("~Ban~")
    .setTimestamp()
    .setThumbnail("https://pngimage.net/wp-content/uploads/2018/06/%D0%B1%D0%B0%D0%BD-png-3-300x200.png")
    .setFooter("Бан систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
    .setColor("#bc0000")
    .addField("Забанен:", `${bUser}`, true)
    .addField("Администратор:", `<@${message.author.id}>`, true)
    .addField("Канал:", message.channel, true)
    .addField("Причина:", bReason, false) 
    .addField("Время:", message.createdAt, false);

    let banchannel = message.guild.channels.get("537720268446236682");
    if(!banchannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");

    message.delete();
    message.guild.member(bUser).ban(bReason);
    banchannel.send({embed:banEmbed});
    message.channel.send('Пользователь' + `<@${bUser.id}>` + ' был забанен по причине: **' + `${bReason}` + '**');

};

module.exports.help = {
  name:"бан"
};