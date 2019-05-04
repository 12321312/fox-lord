const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
 var Hero = Array('дота1','дота2','дота3')
 const randomHero = Hero[Math.floor(Math.random()*Hero.length)];
 let a = message.author;
 let dotasend = new Discord.RichEmbed()
 .setTitle(${joker})

 bot.send({embed:dotasend});

};
module.exports.help = {
    name: "дота"
};
