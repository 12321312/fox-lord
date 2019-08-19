const Discord = module.require("discord.js");
const fs = require("fs");
const request = require("request"),
      cheerio = require("cheerio"),
      urls = [];

exports.run = async (bot, message, args) => { 
let alfa = "74293332";
let brava = "87904708";
let charli = "39313471";

request('https://nukacrypt.com/', function(err, resp, body){
      if(!err && resp.statusCode == 200){
            var $ = cheerio.load(body);
            $('a.title', '#contenttable').each(function(){
            var url = this.attr('style');
            urls.push(url);
            });
        console.log(urls)
      }
});    

    
let a = message.author;
    let ambed = new Discord.RichEmbed()
    .setTitle("Коды запуска ракет:")
    .setTimestamp()
    .setFooter("Система запуска.", "https://vignette.wikia.nocookie.net/fallout/images/c/c2/Icon_Vault_76.png/revision/latest?cb=20181217214332&path-prefix=ru")
    .setColor('#c10020')
    .setThumbnail("https://vignette.wikia.nocookie.net/fallout/images/b/b2/Mini_nuke.png/revision/latest?cb=20110404234408")
    .addField("Альфа:", alfa)
    .addField("Брава:", brava)
    .addField("Чарли:", charli);

    message.delete(50000);
    message.channel.send({embed:ambed}).then(async msg => await msg.delete(50000));

};
module.exports.command = {
    name: 'test',
    aliases: ["тест", "т", "хуй"],
    description: "Показывает пинг, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 
