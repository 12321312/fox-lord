const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);  
    let botmessage = args.join(" ");
    if (message.author.id !== "294844223675564034") { message.reply('Хитрожопых наказываю'); return; }
    if (!(args[0]) && (args[1])) { message.delete(); message.reply('пусто везде бл...'); return; }
    if ((args[0])) { message.delete(); message.reply('Пустота в обращении...'); return; }
    if (!member) { message.delete(); message.reply('Такого нету...'); return; }
    if ((args[1])) { message.delete(); message.reply('Пустота в описании...'); return; }

    message.delete();
    member.sendMessage(botmessage);
};
module.exports.command = {
    name: 'ls',
    aliases: ["лс", "отправить в лс"],
    description: "Отправляет в лс какую-то дичь, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
}; 
