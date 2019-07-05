const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let botmessage = args.slice(0).join(" ");
    if (message.author.id !== "294844223675564034") return message.reply('Хитрожопых наказываю'); 
    if (!(args[0])) return message.reply('Пустота в обращении...');
    message.channel.send(botmessage);
    message.delete();
};
module.exports.help = {
    name: "канал"
};
