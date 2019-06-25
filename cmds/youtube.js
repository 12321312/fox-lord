const Discord = module.require("discord.js");
const fs = require("fs");
const YouTube = require("discord-youtube-api");
const youtube = new YouTube("AIzaSyCsPmdU2GRkcOl4NiNdkl293PpI7PlUWhk");

module.exports.run = async (bot,message,args) => {
if ((args[0]) == null) { message.reply("так, а чё искать то тебе?"); return;}
const video = await youtube.searchVideos("big poppa biggie smalls");

message.reply(video.url); 
};

module.exports.help = {
    name: "ютуб"
};
