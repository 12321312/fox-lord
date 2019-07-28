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
     sql = `INSERT INTO warn (id, one, onea, two, twoa, tri, tria) VALUES ('${target.id}', '${wReason}', '${message.author.id}', NULL, NULL, NULL, NULL)`;
     message.reply(`Выдал варн <@${target.id}> с причиной "${wReason}" аминистратор <@${message.author.id}>`);
     connection.query(sql);
     return;
     } else {
     let warn1 = rows[0].one;
     let warn1a = rows[0].onea;
     let warn2 = rows[0].two;  
     let warn2a = rows[0].twoa;
     let warn3 = rows[0].tri;
     let warn3a = rows[0].tria;              
      if (!warn2 && warn3) {
      sql = `UPDATE warn SET two = ${wReason}, twoa = ${message.author.id} WHERE id = '${target.id}'`
      message.reply(`Выдал второй варн <@${target.id}> с причиной "${wReason}" аминистратор <@${message.author.id}>`);
      connection.query(sql);
      return;
      } else if (!warn3) {
        sql = `UPDATE warn SET tri = ${wReason}, tria = ${message.author.id} WHERE id = '${target.id}'`
        message.reply(`Выдал третий варн <@${target.id}> с причиной "${wReason}" аминистратор <@${message.author.id}>`);
        connection.query(sql);
        return;
      }   
     }
});         
};
module.exports.help = {
    name: "варн"
};
