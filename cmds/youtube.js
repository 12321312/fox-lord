const Discord = module.require("discord.js");
const fs = require("fs");
const talkedRecently = new Set(),
      search = require('youtube-search');

module.exports.run = async (bot,message,args) => {
if ((args[0]) == null) { message.reply("так, а чё искать то тебе?"); return;}

search(args, {
    maxResults: 1,
    key: process.env.GOOGLE_KEY
  }, (err, res) => {
    if (err) return message.channel.send("**Нет результатов!**")
    if (!res) return message.channel.send("**Нет результатов!**")

    message.reply(res[0].link)
});
};
module.exports.help = {
    name: "ютуб"
};
