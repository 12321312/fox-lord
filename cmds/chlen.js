const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
let randomclien = Math.floor(Math.random() * 30) + 1 ;
//if (message.author.id !== "294844223675564034") randomclien = "999999999";
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
//var arrclien = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
var x = Infinity;
if (message.author.roles.find('name', `Размер члена ${x}`)) { message.reply('Ваш размер уже определенён был...'); return; }
let clienrole = message.guild.roles.find('name', `Член ${randomclien} см`);
if(!clienrole){
    try{
        clienrole = await message.guild.createRole({
            name:`Член ${randomclien} см`,
            color: "#FFCBDB",
            permission: []
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(clienrole,{
          });
        });
    }catch(e){
        console.log(e.stack);
    }
};

message.member.addRole(clienrole.id)
bot.send({embed:clien});
};
module.exports.help = {
    name: "член"
};
