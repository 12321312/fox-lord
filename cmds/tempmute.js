const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require("ms"); 

module.exports.run = async (bot,message,args,connection) => {
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник"].includes(r.name))) return message.reply('Отказано в доступе.');
if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!мут <юзер упоминание> <время> <причина>```");
if (!(args[1])) return message.reply("Не верно указано время, напиши так: ```!мут <юзер упоминание> <время> <причина>```");
let tomute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));

connection.query(`SELECT * FROM xp WHERE id = '${tomute.id}'`, async (err, rows) => {
if(!tomute) return message.reply("такого участника нету");
if (tomute.id == "294844223675564034") return message.reply('а пизды не дать?');
if (tomute.roles.get('592734106471628869')) return message.reply('он уже писать не может...');
let muterole = message.guild.roles.find('name', "muted");
let mreason = args.slice(2).join(" ") || "---";


  if(!muterole){
      try{
          muterole = await message.guild.createRole({
              name:"muted",
              color: "#000000",
              permission: []
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole,{
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
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
.setDescription("Мут")
.setColor('#00538A')
.setThumbnail("https://cdn1.iconfinder.com/data/icons/ui-controls-miscellaneous/32/chat-off-512.png")
.setFooter("Мут систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
.setTimestamp()
.addField("Был замучен:", `${tomute}`, true)
.addField("Администратор:", `${message.author}`, true)
.addField("Канал:", message.channel, true)
.addField("Время мута:", `${ms(ms(mutetime))}`, true)
.addField("Причина:", mreason, false)
.addField("Начало мута:", message.createdAt, false);

await(tomute.addRole(muterole.id));
message.channel.send('Пользователь' + `<@${tomute.id}>` + ' был замучен на `'+ `${ms(ms(mutetime))}` + '` по причине: **' + `${mreason}` + '**');
mutechannel.send({embed:muteEmbed}); 

let mutesql = `UPDATE xp SET mute = ${ms(mutetime)} WHERE id = '${tomute.id}'`  
connection.query(mutesql);


setTimeout(function(){
    tomute.removeRole(muterole.id);
    let mutesqlq = `UPDATE xp SET mute = 0 WHERE id = '${tomute.id}'`  
    connection.query(mutesqlq);
},ms(mutetime));
});


};
module.exports.help = {
    name: "мут"
};
