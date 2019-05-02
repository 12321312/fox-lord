const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send("Сосать", {
        file: "./img/lol.png" 
    });
};

module.exports.help = {
    name: 'ключ'
};
