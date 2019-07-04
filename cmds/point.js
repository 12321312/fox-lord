const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args,connection) => {
    let target = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!target) return message.reply("такого участника нету");

    connection.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;
    let sql;
    if(rows.length < 1) {
    sql = `INSERT INTO xp (id, point) VALUES ('${target.id}', 0)`;
    message.reply(`успешно записал пользователя <@${target.id}> в базу данных`);
    } else {
    let point = rows[0].point;
    sql = `UPDATE xp SET point = ${point} WHERE id = '${target.id}'`
    if ((args[1]) == null) {
        message.reply(`остаток баланса <@${target.id}> на данный момент: ` + `\`\`\`js\n${point}\`\`\``);
      } else {
    sql = `UPDATE xp SET point = ${point}+${args[1]} WHERE id = '${target.id}'`      
        message.reply(`Добавил пользователю <@${target.id}>, ваши ${args[1]} поинтов \n остаток баланса на данный момент: ` + `\`\`\`js\n${point}\`\`\``);
      };
    };
    connection.query(sql);

});
};
module.exports.help = {
    name: "поинт"
};
