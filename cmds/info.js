const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send({
        "embed": {
          "title": "Добро пожаловать на сервер **Fox Shelter**!",
          "description": "Сервер был специально создан для разностных лиц, которые увлекаются разными вещами.",
          "url": "https://discordapp.com",
          "color": 4680435,
          "timestamp": "2019-04-30T00:14:38.627Z",
          "footer": {
            "icon_url": "https://pp.userapi.com/FaynRO8qPqBAaCDWK9OBhIPbmmu2n2oAI6xfuw/UksmaVfOhd4.jpg?ava=1",
            "text": "Не нарушай педрила"
          },
          "thumbnail": {
            "url": "https://static.tgstat.ru/public/images/channels/_0/2a/2a29043c84a2419fe23a5895ca3f24d8.jpg"
          },
          "image": {
            "url": ""
          },
          "author": {
            "name": "LousyFox.:з",
            "url": "https://discordapp.com",
            "icon_url": "https://yt3.ggpht.com/a-/AAuE7mAHy4ulOOlJr8f6za5LTbCqhy5CsWGi6mIrZQ=s900-mo-c-c0xffffffff-rj-k-no"
          },
          "fields": [
            {
              "name": "🤔",
              "value": "Вы вон там, справа..."
            },
            {
              "name": "😀",
              "value": "За хорошое поведение плюшки",
              "inline": true
            },
            {
              "name": "😠",
              "value": "За плохое поведение пизды",
              "inline": true
            }
          ]
        }
      })
};
module.exports.help = {
    name: "инфо"
};
