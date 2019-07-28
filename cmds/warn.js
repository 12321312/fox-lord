const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
if (!(args[0])) return message.reply("Не верно указан пользователь, напиши так: ```!варн <юзер упоминание> <+/-поинты>```");
let wReason = args.slice(1).join(" ") || "---";
let target = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!target) return message.reply("такого участника нету");
if (message.author.id !== "294844223675564034") return message.reply('Хитрожопых наказываю');    

connection.query(`SELECT * FROM warn WHERE id = '${target.id}'`, (err, rows) => {
 if(err) throw err;
   let sql;
    if(rows.length < 1) {
      if (!(args[1])) return message.reply(`у пользователя <@${target.id}> нет варнов.`).then(async msg => await msg.delete(15000));    
      sql = `INSERT INTO warn (id, one, onea, two, twoa, tri, tria) VALUES ('${target.id}', '${wReason}', '${message.author.id}', NULL, NULL, NULL, NULL)`;
      bot.send(`Выдал варн <@${target.id}> с причиной "${wReason}" аминистратор <@${message.author.id}>`);
      connection.query(sql);
      message.delete();
     } else {
     let warn1 = rows[0].one;
     let warn1a = rows[0].onea;
     let warn2 = rows[0].two;  
     let warn2a = rows[0].twoa;
     let warn3 = rows[0].tri;
     let warn3a = rows[0].tria;
     

     if (!(args[1])) {
        let WarnEmbed = new Discord.RichEmbed()
        .setTitle(`Варны пользователя ${target}`)
        .setTimestamp()
        .setThumbnail("https://pngimage.net/wp-content/uploads/2018/06/%D0%B1%D0%B0%D0%BD-png-3-300x200.png")
        .setFooter("Варн систем v2000", "https://www.meme-arsenal.com/memes/5fb377d05d9593b7eb0344b79532afe0.jpg")
        .setColor("#bc0000")
        .addField(`Первый варн от <@${warn1a}>`, `${warn1}`);
        if (warn2) WarnEmbed.addField(`Второй варн`, `От <@${warn2a}> с причиной: ${warn2}`);
        if (warn3) WarnEmbed.addField(`Третий варн`, `От <@${warn3a}> с причиной: ${warn3}`);

         message.channel.send({embed:WarnEmbed}).then(async msg => await msg.delete(15000));
         message.delete(15000);
         return; 
     }                   
      if (!warn2) {
      sql = `UPDATE warn SET two = '${wReason}', twoa = ${message.author.id} WHERE id = '${target.id}'`
      message.channel.send(`Выдал второй варн <@${target.id}> с причиной "${wReason}" аминистратор <@${message.author.id}>`);
      connection.query(sql);
      message.delete();
      } else if (!warn3) {
        sql = `UPDATE warn SET tri = '${wReason}', tria = ${message.author.id} WHERE id = '${target.id}'`
        message.channel.send(`Выдал третий варн <@${target.id}> с причиной "${wReason}" аминистратор <@${message.author.id}>`);
        connection.query(sql);
        message.delete();
      }   
     }
});         
};
module.exports.help = {
    name: "варн"
};
