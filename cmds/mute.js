const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require("ms"); 

module.exports.run = async (bot,message,args) => {
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник"].includes(r.name))) return message.reply('Отказано в доступе.');
if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!гаг <юзер упоминание> <время> <причина>```"); 
if (!(args[1])) return message.reply("Не верно указано время, напиши так: ```!гаг <юзер упоминание> <время> <причина>```"); 
let tomute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!tomute) return message.reply("такого участника нету");
if (tomute.id == "294844223675564034") return message.reply('а пизды не дать?'); 
if (tomute.roles.get('592772182543695882')) return message.reply('он уже в молчанку играет...'); 
let muterole = message.guild.roles.find('name', "silence");
let mreason = args.slice(2).join(" ") || "---";
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
.setColor('#00FFFF')
.setTimestamp()
.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/2/29/Audio-mute.png")
.setFooter("Гаг систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
.addField("Был замучен:", `${tomute}`, true)
.addField("Администратор:", `${message.author}`, true)
.addField("Канал:", message.channel, true)
.addField("Время гага:", `${ms(ms(mutetime))}`, true)
.addField("Причина:", mreason, false)
.addField("Начало гага:", message.createdAt, false);

await(tomute.addRole(muterole.id));
message.channel.send('Пользователь' + `<@${tomute.id}>` + ' был заткнут на `'+ `${ms(ms(mutetime))}` + '` по причине: **' + `${mreason}` + '**');
mutechannel.send({embed:muteEmbed}); 

setTimeout(function(){
    tomute.removeRole(muterole.id);
},ms(mutetime));
     
};
module.exports.help = {
    name: "гаг"
};
