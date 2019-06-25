const Discord = module.require("discord.js");
const fs = require("fs");
const YouTube = require("discord-youtube-api");
const youtube = new YouTube("AIzaSyCsPmdU2GRkcOl4NiNdkl293PpI7PlUWhk");

module.exports.run = async (bot,message,args) => {

    async function searchYouTubeAsync(args) {
        var video = await youtube.searchVideos(args.toString().replace(/,/g,' '));
        console.log(video.url);
        console.log(typeof String(video.url));
        return String(video.url);
      }

if ((args[0]) == null) { message.reply("так, а чё искать то тебе?"); return;}

message.reply(searchYouTubeAsync(args)); 
};

module.exports.help = {
    name: "ютуб"
};
