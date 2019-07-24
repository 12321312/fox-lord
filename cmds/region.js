const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');


if ((args[1]) == "Россия" || (args[1]) == "россия" || (args[1]) == "рус" || (args[1]) == "rus" || (args[1]) == "russia") {
bot.setRegion('Russia');
message.reply('Поставлен регион "Россия".');
} else if ((args[1]) == "Европа" || (args[1]) == "европа" || (args[1]) == "евро" || (args[1]) == "Eur" || (args[1]) == "eur") {
bot.setRegion('Central Europe');
message.reply('Поставлен регион "Центральная Европа".');
} else return message.reply('сервер не правильно указан.');

};

module.exports.help = {
    name: "регион"
};