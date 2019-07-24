const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');


if ((args[0]) == "Россия" || (args[0]) == "россия" || (args[0]) == "рус" || (args[0]) == "rus" || (args[0]) == "russia") {
Discord.setRegion('Russia');
message.reply('Поставлен регион "Россия".');
} else if ((args[0]) == "Европа" || (args[0]) == "европа" || (args[0]) == "евро" || (args[0]) == "Eur" || (args[0]) == "eur") {
Discord.setRegion('Central Europe');
message.reply('Поставлен регион "Центральная Европа".');
} else return message.reply('сервер не правильно указан.');

};

module.exports.help = {
    name: "регион"
};