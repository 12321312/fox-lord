const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require("ms"); 

module.exports.run = async (bot,message,args) => {
if ((args[0]) == null) {message.reply("Не верно указан пользователь, напиши так: ```!гаг <юзер упоминание> <время> <причина>```"); return; }
if ((args[1]) == null) {message.reply("Не верно указано время, напиши так: ```!гаг <юзер упоминание> <время> <причина>```"); return; }
let tomute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!tomute) return message.reply("такого участника нету");
if (tomute.id == "294844223675564034") { message.reply('а пизды не дать?'); return; }
let muterole = message.guild.roles.find('name', "muted");
let mreason = args.join(" ").slice(26) || "---";

if (message.member.roles.get('537700464888643595') || message.member.roles.get('537705223301365781') || message.member.roles.get('537704565043363840')) {          
  if(!muterole){
      try{
          muterole = await message.guild.createRole({
              name:"silence",
              color: "#000000",
              permission: []
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole,{
                CONNECT: false,
                SPEAK: false
            });
          });
      }catch(e){
          console.log(e.stack);
      }
  }
message.delete();

let mutechannel = message.guild.channels.get("537720268446236682");
if(!mutechannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");
let mutetime = args[1];
if(!mutetime) return message.reply("Укажите время, блэать!");
let muteEmbed = new Discord.RichEmbed()
.setDescription("Гаг")
.setColor('#00538A')
.setThumbnail("https://freepngimg.com/thumb/silence/7-2-silence-picture-thumb.png")
.setFooter("Гаг систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
.addField("Был замучен:", `${tomute}`)
.addField("Администратор:", `${message.author}`)
.addField("Канал:", message.channel)
.addField("Причина:", mreason)
.addField("Время гага:", `${ms(ms(mutetime))}`)
.addField("Начало гага:", message.createdAt);

await(tomute.addRole(muterole.id));
message.channel.send('Пользователь' + `<@${tomute.id}>` + ' был заткнут на `'+ `${ms(ms(mutetime))}` + '` по причине: **' + `${mreason}` + '**');
mutechannel.send({embed:muteEmbed}); 

setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> снова может говорить`);
},ms(mutetime));
} else 
      {
        message.reply("А пососать не завернуть?");
      };
     
};
module.exports.help = {
    name: "гаг"
};
