const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let randomfot = args[0];
    var ramdomcat = Array("кот","мяу","мур","Кот","кошка","котэ","котейка","котёнок","cat","cate","неко","мурка","мур","Котэ","Котейка","Котёнок","Кошечка","кошечка","коты","котейки","Кошечки");
    var ramdomdog = Array("собака","Собака","Собакин","Dog","Doge","Гаф","гаф","пёс","пес","щенок","шенок","псина");
    let a = message.author;

    if ((args[0])==null) {message.reply('А чё тебе надо то? \n Напиши например: `!рандом котэ`'); return; }
    //if ((args[0]) != ramdomcat && (args[0]) != ramdomdog) { message.reply('Хуй знает что тебе надо'); return; }
    if ((args[0]) == ramdomcat) { let inforandom = "http://aws.random.cat/meow"; };  
    if ((args[0]) == ramdomcat) { let inforandom = "https://dog.ceo/api/breeds/image/random"; };  
    let {body} = await superagent
    .get('inforandom'); 

    let ambed = new Discord.RichEmbed()
    .setTitle("Мимими")
    .setTimestamp()
    .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
    .setColor('#FFCBDB')
    .setImage(body.url);

    bot.send({embed:ambed});

};
module.exports.help = {
    name: "рандом"
};
