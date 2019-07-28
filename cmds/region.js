const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный"].includes(r.name))) return message.reply('Отказано в доступе.');


if ((args[0]) == "Россия" || (args[0]) == "россия" || (args[0]) == "рус" || (args[0]) == "rus" || (args[0]) == "russia" || (args[0]) == "Russia") {
message.guild.setRegion('russia');
message.reply('поставлен регион сервера: *"Россия"*.');
return;
} else if ((args[0]) == "Европа" || (args[0]) == "европа" || (args[0]) == "евро" || (args[0]) == "Eur" || (args[0]) == "eur" || (args[0]) == "eu-central") {
message.guild.setRegion('eu-central');
message.reply('поставлен регион сервера: *"Центральная Европа"*.');
return;
} else if ((args[0]) == "japan" || (args[0]) == "singapore" || (args[0]) == "eu-central" || (args[0]) == "india" || (args[0]) == "us-central" || (args[0]) == "london" || (args[0]) == "eu-west" || (args[0]) == "amsterdam" || (args[0]) == "brazil" || (args[0]) == "dubai" || (args[0]) == "us-west" || (args[0]) == "hongkong" || (args[0]) == "us-south" || (args[0]) == "southafrica" || (args[0]) == "us-east" || (args[0]) == "sydney" || (args[0]) == "frankfurt" || (args[0]) == "russia") {
message.guild.setRegion(args[0]);
message.reply(`поставлен регион сервера: *"${args[0]}"*.`);
} else if (!(args[0])) {
message.reply("укажите нужный вам регион. Регион сейчас установлен: " + `*${message.guild.region}*` + "\n```js\n'japan', 'singapore', 'eu-central', 'india', 'us-central', 'london', 'eu-west', 'amsterdam', 'brazil', 'dubai', 'us-west', 'hongkong', 'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt', 'russia'```");
return;
} else return message.reply('сервер не правильно указан.');
};

module.exports.help = {
    name: "регион"
};