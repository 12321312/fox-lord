const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
let randomclien = Math.floor(Math.random() * 30) + 1 ;
if (message.author.id !== "294844223675564034") randomclien = "999999999";
let nameclien = "Уууу блядь п@здец..."; 
if (randomclien < 25) nameclien = "Ну перед пацанами уже можно выебнуться..."; 
if (randomclien < 20) nameclien = "Ну сойдет чтобы похвастаться перед скромной тёлкой..."; 
if (randomclien < 15) nameclien = "У вас пиздец маленький, советую не показывать девочкам, описаются от смеха..."; 
let clien = new Discord.RichEmbed()
.setTitle(message.author.username)
.setTimestamp()
.setFooter("Измеритель пениса v228", "https://icon2.kisspng.com/20180425/zuw/kisspng-youtube-video-animation-tenor-5ae0d876161ae1.9363982315246849180906.jpg")
.setColor('#964B00')
.addField("Размер вашего члена состоявляет:", `\`\`\`js\n${randomclien} см\`\`\``)
.addField(nameclien, "Линейка вам больше не нужна.")
.setThumbnail("http://pngimg.com/uploads/ruler/ruler_PNG22.png");

bot.send({embed:clien});
};
module.exports.help = {
    name: "член"
};
