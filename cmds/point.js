const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let target = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!target) return message.reply("такого участника нету");

    connection.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;
    let sql;
    if(rows.length < 1) {
    sql = `INSERT INTO xp (id, point) VALUES ('${target.id}', 0)`
    } else {
    let point = rows[0].point;
    sql = `UPDATE xp SET point = ${point} WHERE id = '${target.id}'`
    if ((args[1]) == null) {
        message.reply(`<@${target.id}> имеет на счету ` + point)
      }
    }
    connection.query(sql);

});
};
module.exports.help = {
    name: "поинт"
};
