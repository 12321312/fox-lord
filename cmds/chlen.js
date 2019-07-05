const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
if (message.member.roles.get('537707501819396098')) return message.reply('у девушек нет члена о_О');
let randomclien = Math.floor(Math.random() * 30) + 1 ;
if (message.author.id == "294844223675564034") randomclien = "999999999";
if (message.author.id == "414822924005015552") randomclien = "1";
let nameclien = "Уууу блядь п@здец..."; 
if (randomclien < 25) nameclien = "Ну перед пацанами уже можно выебнуться..."; 
if (randomclien < 20) nameclien = "Ну сойдет чтобы похвастаться перед скромной тёлкой..."; 
if (randomclien < 15) nameclien = "У вас пиздец маленький, советую не показывать девочкам, описаются от смеха...";
connection.query(`SELECT * FROM clien WHERE id = '${message.author.id}'`, (err, rows) => { 
    let cms = rows[0].cm;
    if (cms > 0) return message.reply(`вы уже проходили тест, видно перезашли, я окажу услугу и выдам ваши ${cms} обратно`)
});


let clien = new Discord.RichEmbed()
.setTitle(message.author.username)
.setTimestamp()
.setFooter("Измеритель пениса v228", "https://icon2.kisspng.com/20180425/zuw/kisspng-youtube-video-animation-tenor-5ae0d876161ae1.9363982315246849180906.jpg")
.setColor('#964B00')
.addField("Размер вашего члена состоявляет:", `\`\`\`js\n${randomclien} см\`\`\``)
.addField(nameclien, "Линейка вам больше не нужна.")
.setThumbnail("http://pngimg.com/uploads/ruler/ruler_PNG22.png");
var sizepenis = 0;
for (sizepenis = 0; sizepenis < 31; sizepenis++) {
if (message.member.roles.find('name', `${sizepenis} см`)) return message.reply('Ваш размер уже определенён был...');
};
let clienrole = message.guild.roles.find('name', `${randomclien} см`);
if(!clienrole){
    try{
        clienrole = await message.guild.createRole({
            name:`${randomclien} см`,
            color: "#FFCBDB",
            permission: []
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
