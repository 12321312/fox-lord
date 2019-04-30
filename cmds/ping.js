const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.reply('да нормальный у тебя пинг `' + `${message.createdTimestamp - Date.now()}` + '` м/с, успокойся');
};
module.exports.help = {
    name: "пинг"
};
