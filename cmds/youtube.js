const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    async function searchYouTubeAsync(args) {
        var video = await youtube.searchVideos(args.toString().replace(/,/g,' '));
        console.log(video.url);
        console.log(typeof String(video.url));
        return String(video.url);
      }

if ((args[0]) == null) { message.reply("так, а чё искать то тебе?"); return;}
let video = await searchYouTubeAsync(args);
message.reply(video.url); 
};

module.exports.help = {
    name: "ютуб"
};
