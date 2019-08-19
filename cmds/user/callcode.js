const Discord = module.require("discord.js");
const fs = require("fs");
const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
  uri: `https://nukacrypt.com/`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

exports.run = async (bot, message, args) => { 
    rp(options)
    .then(($) => {
      let code = ($('#nuclearcodess').text());
      let alfa = code.slice(130, -79);
      let brava = code.slice(138, -71);
      let charli = code.slice(146, -64);
      
      message.channel.send(`Альфа: ${alfa} Браво: ${brava} Чарли: ${charli}`);

    })
    .catch((err) => {
      console.log(err);
    })
}; 


module.exports.command = {
    name: 'callcode',
    aliases: ["тесткод", "кодт", "кооооод"],
    description: "Показывает пинг, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 