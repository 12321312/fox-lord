const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    function clean(text) {
        if(typeof(text) == 'string')
         return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
        else
         return text; 
    }
    try {
    var input = args.join(" ")
    let evalcode = eval(input)
    if(typeof evalcode !== 'string')
    evalcode = require('util').inspect(evalcode);

    let ambed = new Discord.RichEmbed()
    .setTitle("EVAL:")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#ffffff')
    .addField("Исходное:", `\`\`\`js\n${input}\`\`\``)
    .addField("Вывод:" ,`\`\`\`js\n${clean(evalcode)}\`\`\``)
    .addField("Тип:", `\`\`\`js\n${typeof evalcode}\`\`\``)
    .setThumbnail("https://img.icons8.com/wired/1600/code-file.png");

    bot.send({embed:ambed});

    } catch (e) {
    let erroreval = new Discord.RichEmbed()
    .setTimestamp()
    .setColor('#ff00ff')
    .addField("Ошибка:", `\`\`\`js\n${clean(e)}\`\`\``);

    bot.send({embed:erroreval});
    }

};
module.exports.help = {
    name: "евал"
};