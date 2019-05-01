const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);  
    let botmessage = args.join(" ");
    if (message.author.id !== "294844223675564034") { message.reply('Хитрожопых наказываю'); return; }
    if ((args[0])==null) { message.delete(); message.reply('Пустота в обращении...'); return; }
    message.delete();
    message.channel.send(botmessage);
};
module.exports.help = {
    name: "канал"
};
