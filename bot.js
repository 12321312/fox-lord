const Discord = require("discord.js");
const botconfig = require("./config.json");
const client = new Discord.Client();
const prefix = "!";
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} загружен!`);
  if (props.help && props.help.name) {
    bot.commands.set(props.help.name, props);
  } else {
    console.error(`file ${f} не имеет свойства .help или .help.name!`); }
});
});

client.on('ready', () => {
console.log('Запущен, сэр!');
client.user.setPresence({
       status: "online",
       game: {
           name: "твои нервы",
           url: "https://www.youtube.com/watch?v=qrohU75OdJ8",
           type: "STREAMING"
       }
   })
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

client.on('message', message => {
  if (message.content === prefix + 'пидор') { 
    let ran1 = Math.floor(Math.random() * 6) + 1 ;
    let ran2 = Math.floor(Math.random() * 8) + 7 ;
    message.channel.send(
    {
  "embed": {
    "title": "Сейчас мы определим, пидор вы или нет, готовьтесь",
    "description": "Видители ли, я бот, который способен определить являетесь ли вы пидором, поверьте, мои результаты точны на 100% и никогда не могут ошибаться, если я отнесу вас к **пидорам**, значит вы 100% пидор и никак не можете в этом сомневаться, усяно надеюсь вам? В общем, это будет голосование среди всех пользователей, естественно числа рандомные и никак не влияют на результат, но я же должен выебнуться своими знаниями и познаниями, так что готовьтесь, посмотрим сколько людей проголосуют что вы пидор.",
    "url": "https://discordapp.com",
    "color": 4276371,
    "timestamp": "2019-04-30T00:28:03.913Z",
    "footer": {
      "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Flag_of_Cusco.svg/1200px-Flag_of_Cusco.svg.png",
      "text": "Пидорометр"
    },
    "image": {
      "url": "http://www.vladtime.ru/uploads/posts/2015-05/1432221293_shutterstock_4720675.jpg"
    },
    "author": {
      "name": client.user.username,
      "url": "http://gaychik.com/",
      "icon_url": client.user.avatarURL,
    },
    "fields": [
      {
        "name": "😊",
        "value": "И да, не забывайте, моя погрешность ~~0,013%~~"
      },
      {
        "name": "✅",
        "value": "2",
        "inline": true
      },
      {
        "name": "❌",
        "value": "3",
        "inline": true
      },
      {
        "name": "Результат: ",
        "value": "**Вы пидор! Поздравляем!**"
      }
    ]
  }
}
    )
  }
});

client.on('message', message => {
  if (message.content === prefix + 'инфо') { 
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
});

// автороль
client.on('guildMemberAdd', member => {
  console.log('User ' + member.user.tag + ' зашёл на сервер!');
  let channel = client.channels.get("537720268446236682");
  var role = member.guild.roles.get("537701217879588878");
  let esyy = client.emojis.get("554122910584012800");
  channel.send("На сервер зашёл **"+member.user.tag+"**! "+`${esyy}`);
  member.addRole(role);
});

client.on('guildMemberRemove', member => {
  console.log('User ' + member.user.tag + ' вышел с сервера!');
  let channel = client.channels.get("537720268446236682");
  let nsyy = client.emojis.get("554122783165251585");
  channel.send("**"+member.user.tag+"** вышел с сервера! "+`${nsyy}`);
});

// Массудаление 
client.on('message', message => {
    let msg = message.content.toUpperCase();
    let sender = message.author; 
    let cont = message.content.slice(prefix.length).split(" "); 
    let args = cont.slice(1); 
if (msg.startsWith(prefix + 'УДАЛИТЬ')) {
    async function purge() {
       if (!message.member.roles.get("537700464888643595")) {
                message.reply('Вы не можете удалять сообщения. :с'); 
                return; 
       }
       if (isNaN(args[0])) {
                message.reply('А сколько удалять то? \n Напиши: `' + prefix + 'удалить <число>`');
                return;
       }
       if ((args[0]) >= 100) {
                message.reply('Больше 100 за раз не могу ;с');
                return;
       }
     const fetched = await message.channel.fetchMessages({limit: args[0]});
     console.log(fetched.size + ' сообщения найдены, удаление...'); 
     message.reply('удалено `' + fetched.size + '` сообщений');       
           
     message.channel.bulkDelete(fetched)
     .catch(error => message.channel.send(`Error: ${error}`));   
 }
  purge();
 }                
});

// Реакция
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content.indexOf(prefix) == 0) {
    receivedMessage.react(client.emojis.get("554122910584012800"))
    }
});

// Треш 
client.on('message', message => {
  if (message.content === prefix + 'лав') {
  message.author.sendMessage("Я люблю тебя ♥");
  message.delete(1);
  }
});

client.on('message', message => {
    if (message.content === prefix + 'пинг') {
    message.reply('да нормальный у тебя пинг `' + `${message.createdTimestamp - Date.now()}` + '` м/с, успокойся');
  	}
});

client.on('message', message => {
    let msg = message.content.toUpperCase();
    let cont = message.content.slice(prefix.length).split(" "); 
    let args = cont.slice(1); 
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);   
  if (msg.startsWith(prefix + 'Д')) {
  if (message.author.id !== "294844223675564034") {
  message.reply('Хитрожопых наказываю'); 
  return;
  }
  message.delete();
  message.channel.send(member + ' ' + args[1]);
  }
});


client.on('message', message => {
    let msg = message.content.toUpperCase();
    let cont = message.content.slice(prefix.length).split(" "); 
    let args = cont.slice(1); 
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);   
  if (msg.startsWith(prefix + 'Л')) {
  if (message.author.id !== "294844223675564034") { 
  message.reply('Хитрожопых наказываю'); 
  return;
  }
  message.delete(); 
  member.sendMessage(args[1]);
  }
}); 

// конец  
 
// THIS  MUST  BE  THIS  WAY 
client.login(process.env.BOT_TOKEN); 
