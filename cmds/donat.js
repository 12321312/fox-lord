const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args,connection) => {
  let ambed = new Discord.RichEmbed()
    .setTitle("Донат меню:")
    .setDescription(`Купить монеты можно у <@!294844223675564034>, стоимость 1 поинт = 3 рубля. Или заработать получая уровень или выполняя поручения специальных ролей.`)
    .setTimestamp()
    .setFooter("Донат систем v1337", "https://media.cdnandroid.com/c8/6e/52/82/imagen-vernyj-kurs-kurs-rublya-0thumb.jpg")
    .setColor('#FF8000')
    .addField("!донат","Вызывает это окно")
    .addField("!донат <услуга> <кол-во>","Проводит операцию по покупке услуги.")
    .addField("!юзеринфо","Показывает ваши поинты и другую важную информацию.")
    .addField("______\nУслуги:","**XP**\nДобавляет вам опыта, *100XP - 1 поинт*\n**Член**\nПокупка сантиметров члена, *1 поинт - 1 см*\n**Ориентация**\nМеняет местами роли 'Пидор/Натурал', *20 поинтов*\n**Музыка**\nДобавляет вам роль Music-key и дает возможность использовать DJ команды, *20 поинтов*\n**Вип**\nБот выдает вам V.I.P навсегда, *100 поинтов*\n**Нитро**\nБот выдает вам Discord nitro на месяц, *150 поинтов*")
    .setThumbnail("http://pngimg.com/uploads/coin/coin_PNG36874.png");
  
  if(!(args[0])) { 
      message.delete(15000); 
      message.channel.send({embed:ambed}).then(async msg => await msg.delete(15000)); 
      return;
    } 
  
  if((args[0])) {
  connection.query(`SELECT * FROM clien,xp WHERE clien.id = '${message.author.id}' AND xp.id = '${message.author.id}'`, async (err, rows) => {
   if(err) throw err;
   let cm = rows[0].cm; 
   let point = rows[0].point; 
   let xp = rows[0].xp;    

    if((args[0]) == "член" || (args[0]) == "Член" || (args[0]) == "хуй" || (args[0]) == "Хуй" || (args[0]) == "СМ" || (args[0]) == "см" || (args[0]) == "см") {
     if (!(args[1])) return message.reply(`У вас на данный момент **${cm} см**, если вы хотите купить еще см, то напишите так: \n*!донат член <кол-во>*`);
     if((args[1]) > point) return message.reply(`У вас не хватает **${Number(args[1]) - Number(point)} поинта(ов)** на увлечения члена, на данный момент ваш баланс: **${point}**.`);
     if((args[1]) == 0) return message.reply("Это как ты себе представляешь?");
     if((args[1]) < 1) return message.reply("И зачем тебе в минус?");
     if(isNaN(args[1])) return message.reply("Чо? Цифрами пиши бл");
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

         return message.reply(`Поздравляем с покупкой, теперь у вас **${Number(sizepenisrole) + Number(args[1])} см**! Остаток вашего баланса: **${Number(point) - Number(args[1])}**.`);
        } else return message.reply(`У вас не может быть ${Number(sizepenisrole) + Number(args[1])} см! Максимальная длина члена 30 см`);
      }
     }
    } else if ((args[0]) == "Ориентация" || (args[0]) == "ориентация" || (args[0]) == "оринтация" || (args[0]) == "Оринтация") {
        if(point < 20) return message.reply(`У вас не хватает **${Number(20) - Number(point)} поинта(ов)** на смену оринтации, на данный момент ваш баланс: **${point}**.`);
        let pirddrole = message.guild.roles.find('name', `Пидор`);   
        let pirdnrole = message.guild.roles.find('name', `Натурал`);  

        if (message.member.roles.find('name', `Пидор`)) {
            let ortroleo = `UPDATE xp SET point = ${point}-20 WHERE id = '${message.author.id}'`
            connection.query(ortroleo);   
            let ortrolep = `UPDATE clien SET pidr = 2 WHERE id = '${message.author.id}'`
            connection.query(ortrolep); 
            message.member.removeRole(pirddrole.id)
            message.member.addRole(pirdnrole.id)
            return message.reply(`Поздравляем с покупкой, вы купили себе звание **"НАТУРАЛ"**, теперь смело еб@ать баб! Остаток вашего баланса: **${Number(point) - Number(20)}**.`);
        } else if (message.member.roles.find('name', `Натурал`)) {
            let ortroleon = `UPDATE xp SET point = ${point}-20 WHERE id = '${message.author.id}'`
            connection.query(ortroleon);   
            let ortrolen = `UPDATE clien SET pidr = 1 WHERE id = '${message.author.id}'`
            connection.query(ortrolen); 
            message.member.removeRole(pirdnrole.id)
            message.member.addRole(pirddrole.id)
            return message.reply(`Поздравляем с покупкой, вы купили себе звание **"ПИДОР"**, теперь можете долбиться в очко! Остаток вашего баланса: **${Number(point) - Number(20)}**.`);
        } else return message.reply(`Вы не прошли еще тест, пройдите его для начала! Напишите в чат *"!пидор"*`);
    } else if ((args[0]) == "ХП" || (args[0]) == "хп" || (args[0]) == "Хп" || (args[0]) == "xp" || (args[0]) == "XP") {
           if (!(args[1])) return message.reply(`На данный момент у вас **${xp} XP**, напишите кол-во которое вы хотите купить командой: *"!донат хп <кол-во>(поинтов за xp)"*`); 
           if((args[1]) > point) return message.reply(`У вас не хватает **${Number(args[1]) - Number(point)} поинта(ов)** на покупку XP, на данный момент ваш баланс: **${point}**.`);
           let xpon = `UPDATE xp SET point = ${point}-${args[1]} WHERE id = '${message.author.id}'`
           connection.query(xpon);
           let xpono = `UPDATE xp SET xp = ${xp}+${args[1]*100} WHERE id = '${message.author.id}'`
           connection.query(xpono);
           return message.reply(`Поздравляем с покупкой, вы купили **${args[1]*100} XP**! Теперь у вас **${Number(xp) + Number(args[1]*100)} XP**! Остаток вашего баланса: **${Number(point) - Number(args[1])}**.`);
    } else if ((args[0]) == "discord" || (args[0]) == "Discord" || (args[0]) == "дискорд" || (args[0]) == "Дискорд" || (args[0]) == "Нитро" || (args[0]) == "нитро" || (args[0]) == "Nitro" || (args[0]) == "nitro" || (args[0]) == "НИТРО") {
        if(point < 150) return message.reply(`У вас не хватает **${Number(150) - Number(point)} поинта(ов)** на покупку Nitro Discord, на данный момент ваш баланс **${point}**`);
        message.author.sendMessage(`В данный момент нитро я не смогу выдать, так как не была привязанна БД к этой команде, когда-нибудь фокс это добавит... я надеюсь. Поинты с вас сняты не были, ваш баланс: **${point}**.`);
        return message.reply(`Поздравляем с покупкой, вся инструкция по активации была высланна вам в ЛС.`);
    } else if ((args[0]) == "Музыка" || (args[0]) == "музыка" || (args[0]) == "Мьюзик" || (args[0]) == "мьюзик" || (args[0]) == "Music-key"|| (args[0]) == "music-key" || (args[0]) == "Music" || (args[0]) == "music") {
        if (point < 20) return message.reply(`У вас не хватает **${Number(20) - Number(point)} поинта(ов)** на покупку Music-key, на данный момент ваш баланс: **${point}**.`);
        if (message.member.roles.find('name', `Music-key`)) return message.reply(`У вас уже есть ключ **"Music-key"**! Повторно его купить - нельзя.`);
        let musickeypoint = `UPDATE xp SET point = ${point}-20 WHERE id = '${message.author.id}'`
        connection.query(musickeypoint);
        let musickey = message.guild.roles.find('name', `Music-key`); 
        message.member.addRole(musickey.id);
        return message.reply(`Поздравляем с покупкой, вы купили ключ **"Music-key"**. Вам открылся канал <#552433561769345029> в нём введите *"!help"* и получите весь список команд, команды в этот же чат писать.\nЗа покупку с вас снято 20 поинтов, ваш баланс: **${Number(point) - Number(20)}**. `);
    } else if ((args[0]) == "ВИП" || (args[0]) == "вип" || (args[0]) == "Вип" || (args[0]) == "мьюзик" || (args[0]) == "VIP"|| (args[0]) == "vip" || (args[0]) == "Vip" || (args[0]) == "випа") {
        if (point < 100) return message.reply(`У вас не хватает **${Number(100) - Number(point)} поинта(ов)** на покупку VIP, на данный момент ваш баланс: **${point}**.`);
        if (message.member.roles.find('name', `V.I.P`)) return message.reply(`У вас уже есть **"V.I.P"**! Повторно его купить - нельзя.`);
        let vipkeypoint = `UPDATE xp SET point = ${point}-100 WHERE id = '${message.author.id}'`
        connection.query(vipkeypoint);
        let vipkey = message.guild.roles.find('name', `V.I.P`); 
        message.member.addRole(vipkey.id);
        return message.reply(`Поздравляем с покупкой, вы купили **"V.I.P"**. Теперь у вас есть вип каналы и вы сверху в списке участников.\nЗа покупку с вас снято 100 поинтов, ваш баланс: **${Number(point) - Number(100)}**. `);
    } else return message.reply(`Не известная команда для доната, посмотрите внимательно на услуги в **"!донат"**`);
    

 });
 }
};
module.exports.help = {
    name: "донат"
};