const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require("ms"); 

exports.run = async (bot, message, args,connection) => { 
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');
if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!унмут <юзер упоминание>```");
let tomute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
connection.query(`SELECT * FROM xp WHERE id = '${tomute.id}'`, async (err, rows) => {
if(!tomute) return message.reply("такого участника нету");
if (!tomute.roles.get('592734106471628869')) return message.reply('Он не в муте, прикинь...'); 
let muterole = message.guild.roles.find('name', "muted");

let muteEmbed = new Discord.RichEmbed()
.setDescription("Мут снят")
.setColor('#00FF00')
.setTimestamp()
.setThumbnail("http://mediaseller.agency/wp-content/uploads/2018/06/pravki.png")
.setFooter("Мут систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
.addField("Снят мут с:", `${tomute}`, true)
.addField("Администратор:", `${message.author}`, true)
.addField("Канал:", message.channel, true);


let mutechannel = message.guild.channels.get("537720268446236682"); 
if(!mutechannel) return message.channel.send("Сбились настройки логирования, проверьте пожалуйста их.");
message.channel.send('Пользователь' + `<@${tomute.id}>` + ' был размутен принудительно');
message.delete();
mutechannel.send({embed:muteEmbed}); 
tomute.removeRole(muterole.id);

let mutesremove = `UPDATE xp SET mute = 0 WHERE id = '${tomute.id}'`  
connection.query(mutesremove);
});     
};
module.exports.command = {
    name: 'untempmute',
    aliases: ["унмут", "снятьмут"],
    description: "Снимает ебанный мут, чо доебался?",
    usage: "admincommand",
    category: "admin",
    enabled: true
}; 
