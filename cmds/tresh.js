const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (client,message,args) => {
    message.channel.send('pong!');
};
module.exports.help = {
    name: "ping"
};