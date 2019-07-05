const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let botmessage = args.join(" ");
    if (message.author.id !== "294844223675564034") return message.reply('Хитрожопых наказываю'); 
    if (!(args[0])) return message.reply('Пустота в обращении...');
    message.delete().then(message.channel.send(botmessage));
    
    if(message.deleted) {
        console.log(`Всё, пиздец блять, удалено нахуй`);
        return;
      }

};
module.exports.help = {
    name: "канал"
};
