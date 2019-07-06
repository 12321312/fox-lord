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
    .addField("______\nУслуги:","**Член**\nПокупка сантиметров члена, 1 поинт - 1 см\n**Оринтация**\nМеняет местами роли 'Пидор/Натурал' - 20 поинтов")
    .setThumbnail("https://www.buybitcoinworldwide.com/img/goodicons/doublecoin.png");
  
  if(!(args[0])) return bot.send({embed:ambed});  
  
  if((args[0])) {
  connection.query(`SELECT * FROM clien,xp WHERE clien.id = '${message.author.id}' AND xp.id = '${message.author.id}'`, (err, rows) => {
   if(err) throw err;
   let cm = rows[0].cm; 
   let point = rows[0].point;    

    if((args[0]) == "член") {
     if (!(args[1])) return message.reply(`У вас на данный момент **${cm} см**, если вы хотите купить еще см, то напишите так: \n*!донат член <кол-во>*`);
     if((args[1]) > point) return message.reply(`У вас не хватает **${Number(args[1]) - Number(point)} поинта(ов)**, на данный момент ваш баланс **${point}**`);
     for (sizepenisrole = 1; sizepenisrole < 31; sizepenisrole++) {
      if (message.member.roles.find('name', `${sizepenisrole} см`)) {
        if ((sizepenisrole+(args[1])) < 31) { 
         let clienroles = message.guild.roles.find('name', `${sizepenisrole} см`);   
         let clienrolen = message.guild.roles.find('name', `${Number(sizepenisrole) + Number(args[1])} см`);  
         let raddclien = `UPDATE xp SET point = ${point}-${args[1]} WHERE id = '${message.author.id}'`
         connection.query(raddclien);
         let addclien = `UPDATE clien SET cm = ${cm}+${args[1]} WHERE id = '${message.author.id}'`
         connection.query(addclien);
         message.member.removeRole(clienroles.id)
         message.member.addRole(clienrolen.id)
        } else return message.reply(`У вас не может быть ${Number(sizepenisrole) + Number(args[1])}! Максимальная длина члена 30`);
      }
     }
    }


 });
 }
};
module.exports.help = {
    name: "донат"
};