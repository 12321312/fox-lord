const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args,connection) => {
  let ambed = new Discord.RichEmbed()
    .setTitle("Донат меню:")
    .setTimestamp()
    .setFooter("Донат систем v1337", "http://pngimg.com/uploads/bitcoin/bitcoin_PNG47.png")
    .setColor('#FFFF00')
    .addField("!донат","Вызывает это окно")
    .addField("!донат <услуга> <кол-во>","Проводит операцию по покупке услуги.")
    .addField("!юзеринфо","Показывает ваши поинты и другую важную информацию.")
    .addField("______________________\nУслуги:","**Член**\nПокупка сантиметров члена, 1 поинт - 1 см\n**Оринтация**\nМеняет местами роли 'Пидор/Натурал' - 20 поинтов")
    .setThumbnail("https://www.buybitcoinworldwide.com/img/goodicons/doublecoin.png");
  
  if(!(args[0])) return bot.send({embed:ambed});  

  connection.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
   


  if(err) throw err;
  let sql;
  let xp = rows[0].xp;
  sql = `UPDATE xp SET xp = ${xp + 1000} WHERE id = '${message.author.id}'`
 
  connection.query(sql);
 });
};
module.exports.help = {
    name: "донат"
};