const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args,connection) => { 
  connection.query(`SELECT * FROM clien WHERE id = '${message.author.id}'`, async (err, rows) => { 
    if (message.member.roles.has("572598627126607882")) {
        message.reply("вы уже были признаны **натуралом**.");
        return;
      }
      if (message.member.roles.has("572598599024640010")) {
        message.reply("вы уже были признаны **пидором** :/");
        return;
      }
      
      if(rows.length == 1) {
        let pidro = rows[0].pidr;
        if (pidro > 0) return message.reply(`Вы уже проходили этот тест, восстанавливаю ваши результаты...`);
      }

      if (message.member.roles.get('537707501819396098')) return message.reply('девушки все лезби :Р');
      
      let ran1 = Math.floor(Math.random() * 30) + 1 ;
      let ran2 = Math.floor(Math.random() * 20) + 1 ;
      
      if (ran1 > ran2) {
      ranname1 = "Вы пидор, проздравляем!";
      ranscr1 = "http://www.vladtime.ru/uploads/posts/2015-05/1432221293_shutterstock_4720675.jpg";
      rolepidor = message.guild.roles.get("572598599024640010");
      } else {
      ranname1 = "Вы натурал, так держать!";
      ranscr1 = "https://pp.vk.me/c622017/v622017502/dc34/eooFYxthWT4.jpg";
      rolepidor = message.guild.roles.get("572598627126607882");
      };
      
  
      message.member.addRole(rolepidor);
      message.channel.send("проверяю вашу биографию...").then((msg) => {
      setTimeout(function() {
          msg.edit(
              {
                  "embed": {
                    "title": "Сейчас мы определим, пидор вы или нет, готовьтесь",
                    "description": "Видители ли, я бот, который способен определить являетесь ли вы пидором, поверьте, мои результаты точны на 100% и никогда не могу ошибаться, если я отнесу вас к **пидорам**, значит вы 100% пидор и никак не можете в этом сомневаться, усяно надеюсь вам? В общем, это будет голосование среди всех пользователей, естественно числа рандомные и никак не влияют на результат, но я же должен выебнуться своими знаниями и познаниями, так что готовьтесь, посмотрим сколько людей проголосуют что вы пидор.",
                    "url": "https://discordapp.com",
                    "color": 4276371,
                    "timestamp": new Date(),
                    "footer": {
                      "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Flag_of_Cusco.svg/1200px-Flag_of_Cusco.svg.png",
                      "text": "Пидорометр"
                    },
                    "image": {
                      "url": ranscr1 
                    },
                    "author": {
                      "name": message.author.username,
                      "url": "http://gaychik.com/",
                      "icon_url": message.author.avatarURL,
                    },
                    "fields": [
                      {
                        "name": "😊",
                        "value": "И да, не забывайте, моя погрешность ~~0,013%~~"
                      },
                      {
                        "name": "✅",
                        "value": ran1,
                        "inline": true
                      },
                      {
                        "name": "❌",
                        "value": ran2,
                        "inline": true
                      },
                      {
                        "name": "Результат: ",
                        "value": ranname1 
                      }
                    ]
                  }
                }
          )
      }, 1250)
  });
});  
};
module.exports.command = {
  name: 'pidor',
  aliases: ["пидор", "гей", "тестнапидора"],
  description: "измеряет член, чо доебался?",
  usage: "usercommand",
  category: "user",
  enabled: true
}; 
