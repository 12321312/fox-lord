const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');


if ((args[0]) == "Россия" || "россия" || "рус" || "rus" || "russia") {
message.guild.setRegion('Russia');
message.reply('Поставлен регион "Россия".');
} else if ((args[0]) == "Европа" || "европа" || "евро" || "Eur" || "eur") {
message.guild.setRegion('Central Europe');
message.reply('Поставлен регион "Центральная Европа".');
} else return message.reply('сервер не правильно указан.');


};

module.exports.help = {
    name: "регион"
};