const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);  
    let botmessage = args[2].join(" ");
    if (message.author.id !== "294844223675564034") { message.reply('Хитрожопых наказываю'); return; }
    if ((args[0])==null && (args[1])==null) { message.delete(); message.reply('пусто везде бл...'); return; }
    if ((args[0])==null) { message.delete(); message.reply('Пустота в обращении...'); return; }
    if (!member) { message.delete(); message.reply('Такого нету...'); return; }
    if ((args[1])==null) { message.delete(); message.reply('Пустота в описании...'); return; }

    message.channel.send(member + ' ' + botmessage);
};
module.exports.help = {
    name: "канал"
};
