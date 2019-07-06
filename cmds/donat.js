const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args,connection) => {
  connection.query(`SELECT * FROM xp,clien WHERE id = '${message.author.id}'`, (err, rows) => {

  sql = `UPDATE xp SET xp = ${xp + 1000} WHERE id = '${message.author.id}'`

  connection.query(sql);
 });
};
module.exports.help = {
    name: "донат"
};