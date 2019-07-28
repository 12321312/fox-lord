const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');


if ((args[0]) == "Россия" || "россия" || "рус" || "rus" || "russia" || "Russia") {
message.guild.setRegion('russia');
message.reply('поставлен регион сервера: *"Россия"*.');
return;
} else if ((args[0]) == "Европа" || "европа" || "евро" || "Eur" || "eur" || "eu-central") {
message.guild.setRegion('eu-central');
message.reply('поставлен регион сервера: *"Центральная Европа"*.');
return;
} else if ((args[0]) == "japan" || "singapore" || "eu-central" || "india" || "us-central" || "london" || "eu-west" || "amsterdam" || "brazil" || "dubai" || "us-west" || "hongkong" || "us-south" || "southafrica" || "us-east" || "sydney" || "frankfurt" || "russia") {
message.guild.setRegion(args[0]);
message.reply(`поставлен регион сервера: *"${args[0]}"*.`);
} else if (!(args[0])) {
message.reply("укажите нужный вам регион: /nСписок: 'japan', 'singapore', 'eu-central', 'india', 'us-central', 'london', 'eu-west', 'amsterdam', 'brazil', 'dubai', 'us-west', 'hongkong', 'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt', 'russia'.");
return;
} else return message.reply('сервер не правильно указан.');
};

module.exports.help = {
    name: "регион"
};