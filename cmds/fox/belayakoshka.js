const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 
    let botmessage = args.join(" ");
    message.delete();
    message.channel.send(botmessage, {
        file: "./img/lol.png" 
    });
};

module.exports.help = {
    name: 'бк'
}; 
module.exports.command = {
    name: 'belayakoshka',
    aliases: ["бк", "белаякошка", "кошкабелая"],
    description: "Отправляет сообщение с картинкой бк, чо доебался?",
    usage: "foxcommand",
    category: "fox",
    enabled: false
  }; 
 