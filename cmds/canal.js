const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    if (message.author.id !== "294844223675564034") { message.reply('Хитрожопых наказываю'); return; }
    message.delete();
    message.channel.send(member + ' ' + args[1]);
};
module.exports.help = {
    name: "!канал"
};
