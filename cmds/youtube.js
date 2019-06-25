const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

if ((args[0]) == null) { message.reply("так, а чё искать то тебе?"); return;}
let video = await searchYouTubeAsync(args);
message.reply(video.url); 
};

module.exports.help = {
    name: "ютуб"
};
