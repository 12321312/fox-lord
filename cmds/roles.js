const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let botmessage = args.join(" ");
    message.delete();
    message.channel.send(botmessage, {
        file: "./img/lol.png" 
    });
};

module.exports.help = {
    name: 'ключ'
};
