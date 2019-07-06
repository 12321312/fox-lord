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
    .addField("______\nУслуги:","**Член**\nПокупка сантиметров члена, *1 поинт - 1 см*\n**Ориентация**\nМеняет местами роли 'Пидор/Натурал', *20 поинтов*\n**XP**\nДобавляет вам опыта, *100XP - 1 поинт*\n**Нитро**\nБот выдает вам Discord nitro на месяц, *150 поинтов*")
    .setThumbnail("https://www.buybitcoinworldwide.com/img/goodicons/doublecoin.png");
  
  if(!(args[0])) return bot.send({embed:ambed});  
  
  if((args[0])) {
  connection.query(`SELECT * FROM clien,xp WHERE clien.id = '${message.author.id}' AND xp.id = '${message.author.id}'`, async (err, rows) => {
   if(err) throw err;
   let cm = rows[0].cm; 
   let point = rows[0].point; 
   let xp = rows[0].xp;    

    if((args[0]) == "член" || (args[0]) == "Член") {
     if (!(args[1])) return message.reply(`У вас на данный момент **${cm} см**, если вы хотите купить еще см, то напишите так: \n*!донат член <кол-во>*`);
     if((args[1]) > point) return message.reply(`У вас не хватает **${Number(args[1]) - Number(point)} поинта(ов)** на увлечения члена, на данный момент ваш баланс **${point}**`);
     for (sizepenisrole = 1; sizepenisrole < 31; sizepenisrole++) {
      if (message.member.roles.find('name', `${sizepenisrole} см`)) {
        if (Number(sizepenisrole) + Number(args[1]) < 31) { 
         let clienroles = message.guild.roles.find('name', `${sizepenisrole} см`);   
         let clienrolen = message.guild.roles.find('name', `${Number(sizepenisrole) + Number(args[1])} см`);  
         let raddclien = `UPDATE xp SET point = ${point}-${args[1]} WHERE id = '${message.author.id}'`
         connection.query(raddclien);
         let addclien = `UPDATE clien SET cm = ${cm}+${args[1]} WHERE id = '${message.author.id}'`
         connection.query(addclien);
         message.member.removeRole(clienroles.id)

         if(!clienrolen){
            try{
                clienrolen = await message.guild.createRole({
                    name:`${Number(sizepenisrole) + Number(args[1])}  см`,
                    color: "#FFCBDB",
                    permission: []
                });
            }catch(e){
                console.log(e.stack);
            }
        };

         message.member.addRole(clienrolen.id)

         return message.reply(`Поздравляем с покупкой, теперь у вас **${Number(sizepenisrole) + Number(args[1])} см**! Остаток вашего баланса **${Number(point) - Number(args[1])}**`);
        } else return message.reply(`У вас не может быть ${Number(sizepenisrole) + Number(args[1])} см! Максимальная длина члена 30 см`);
      }
     }
    } else if ((args[0]) == "Ориентация" || (args[0]) == "ориентация" || (args[0]) == "оринтация" || (args[0]) == "Оринтация") {
        if(point < 20) return message.reply(`У вас не хватает **${Number(20) - Number(point)} поинта(ов)** на смену оринтации, на данный момент ваш баланс **${point}**`);
        let pirddrole = message.guild.roles.find('name', `Пидор`);   
        let pirdnrole = message.guild.roles.find('name', `Натурал`);  

        if (message.member.roles.find('name', `Пидор`)) {
            let ortroleo = `UPDATE xp SET point = ${point}-20 WHERE id = '${message.author.id}'`
            connection.query(ortroleo);   
            let ortrolep = `UPDATE clien SET pidr = 2 WHERE id = '${message.author.id}'`
            connection.query(ortrolep); 
            message.member.removeRole(pirddrole.id)
            message.member.addRole(pirdnrole.id)
            return message.reply(`Поздравляем с покупкой, вы купили себе звание **"НАТУРАЛ"**, теперь смело еб@ать баб! Остаток вашего баланса **${Number(point) - Number(20)}**`);
        } else if (message.member.roles.find('name', `Натурал`)) {
            let ortroleon = `UPDATE xp SET point = ${point}-20 WHERE id = '${message.author.id}'`
            connection.query(ortroleon);   
            let ortrolen = `UPDATE clien SET pidr = 1 WHERE id = '${message.author.id}'`
            connection.query(ortrolen); 
            message.member.removeRole(pirdnrole.id)
            message.member.addRole(pirddrole.id)
            return message.reply(`Поздравляем с покупкой, вы купили себе звание **"ПИДОР"**, теперь можете долбиться в очко! Остаток вашего баланса **${Number(point) - Number(20)}**`);
        } else return message.reply(`Вы не прошли еще тест, пройдите его для начала! Напишите в чат *"!пидор"*`);
    } else if ((args[0]) == "ХП" || (args[0]) == "хп" || (args[0]) == "Хп" || (args[0]) == "xp" || (args[0]) == "XP") {
           if (!(args[1])) return message.reply(`На данный момент у вас **${xp} XP**, напишите кол-во которое вы хотите купить командой: *"!донат хп <кол-во>(поинтов за xp)"*`); 
           if((args[1]) > point) return message.reply(`У вас не хватает **${Number(args[1]) - Number(point)} поинта(ов)** на покупку XP, на данный момент ваш баланс **${point}**`);
           let xpon = `UPDATE xp SET point = ${point}-${args[1]} WHERE id = '${message.author.id}'`
           connection.query(xpon);
           let xpono = `UPDATE xp SET xp = ${xp}+${args[1]*100} WHERE id = '${message.author.id}'`
           connection.query(xpono);
           return message.reply(`Поздравляем с покупкой, вы купили **${args[1]*100} XP**! Теперь у вас **${Number(xp) + Number(args[1]*100)} XP**! Остаток вашего баланса **${Number(point) - Number(args[1])}**.`);
    } else if ((args[0]) == "Нитро" || (args[0]) == "нитро" || (args[0]) == "Nitro" || (args[0]) == "nitro" || (args[0]) == "НИТРО") {
        if(point < 150) return message.reply(`У вас не хватает **${Number(150) - Number(point)} поинта(ов)** на покупку Nitro Discord, на данный момент ваш баланс **${point}**`);
        message.author.sendMessage(`В данный момент нитро я не смогу выдать, так как не была привязанна БД к этой команде, когда-нибудь фокс это добавит... я надеюсь. Поинты с вас сняты не были, ваш баланс: **${point}**.`);
        return message.reply(`Поздравляем с покупкой, вся инструкция по активации была высланна вам в ЛС.`);
   } else return message.reply(`Не известная команда для доната, посмотрите внимательно на услуги в **"!донат"**`);
    

 });
 }
};
module.exports.help = {
    name: "донат"
};