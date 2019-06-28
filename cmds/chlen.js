const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
let randomclien = Math.floor(Math.random() * 30) + 1 ;
let clien = new Discord.RichEmbed()
.setTitle(message.author.username)
.setTimestamp()
.setFooter("Измеритель пениса v228", "https://pngimage.net/wp-content/uploads/2018/06/png-%D1%87%D0%BB%D0%B5%D0%BD.png")
.setColor('#964B00')
.addField("Размер вашего члена состоявляет", randomclien)
.setThumbnail("http://pngimg.com/uploads/ruler/ruler_PNG22.png");

bot.send({embed:clien});
};
module.exports.help = {
    name: "член"
};
