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
      let alfa = ($('#nuclearcodess').text().slice(130, -79));
      let brava = ($('#nuclearcodess').text().slice(138, -87));
      let charli = ($('#nuclearcodess').text().slice(146, -95));
      
      message.channel.send(`Альфа: ${alfa} Браво: ${brava} Чарли: ${charli}`)
    })
    .catch((err) => {
      console.log(err);
    });
}; 


module.exports.command = {
    name: 'callcode',
    aliases: ["тесткод", "кодт", "кооооод"],
    description: "Показывает пинг, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 