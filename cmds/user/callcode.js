const Discord = module.require("discord.js");
const fs = require("fs");
var request = require('request');
var cheerio = require('cheerio');

exports.run = async (bot, message, args) => { 
    request('https://nukacrypt.com/', function(err, resp, body) {
            if (err)
                    throw err;
            $ = cheerio.load(body);
            console.log(body);
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