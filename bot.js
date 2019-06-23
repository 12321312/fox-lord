const Discord = require("discord.js");
const botconfig = require("./config.json");
const bot = new Discord.Client();
const fs = require('fs');
bot.commands = new Discord.Collection();
let config = require('./config.json');
let prefix = config.prefix;
let profile = require('./profile.json');

//Settings!
const yourID = "294844223675564034"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!роль"
let initialMessage = `**Чтобы получить **`;
const roles = ["Dota-key", "EVE-key", "Minecraft-key", "Gmod-key", "SI-key", "Secret-key"];
const reactions = [":dota:", "🖌", "😃", "🆕"];

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});


// подключение
fs.readdir('./cmds/',(err,files)=>{
  if(err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <=0) console.log("Нет комманд для загрузки!!");
  console.log(`Загружено ${jsfiles.length} комманд`);
  jsfiles.forEach((f,i) =>{
      let props = require(`./cmds/${f}`);
      console.log(`${i+1}.${f} Загружен!`);
      bot.commands.set(props.help.name,props);
  });
});

// проверка текста
bot.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  let user = message.author.username;
  let uid = message.author.id;
  bot.send = function (msg){
        message.channel.send(msg);
  };
  if(!profile[uid]){
    profile[uid] ={
        coins:10,
        warns:0,
        xp:0,
        lvl:1,
    };
  };
  let u = profile[uid];

  u.coins++;
  u.xp++;

  if(u.xp>= (u.lvl * 5)){
      u.xp = 0;
      u.lvl += 1;
  };

  fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
    if(err) console.log(err);
  });

  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if(!message.content.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot,message,args);
});

// шапка
bot.on('ready', () => {
  console.log('Запущен, сэр!');
  bot.user.setPresence({
         status: "online",
         game: {
             name: "твои нервы",
             url: "https://www.youtube.com/watch?v=6uCTdjTjbWA",
             type: "STREAMING"
         }
     });
});

// Автороль
bot.on('guildMemberAdd', member => {
  console.log('User ' + member.user.tag + ' зашёл на сервер!');
  let channel = bot.channels.get("537720268446236682");
  var role = member.guild.roles.get("537701217879588878");
  let esyy = bot.emojis.get("554122910584012800");
  channel.send("На сервер зашёл **"+member.user.tag+"**! "+`${esyy}`);
  member.addRole(role);
});

bot.on('guildMemberRemove', member => {
  console.log('User ' + member.user.tag + ' вышел с сервера!');
  let channel = bot.channels.get("537720268446236682");
  let nsyy = bot.emojis.get("554122783165251585");
  channel.send("**"+member.user.tag+"** вышел с сервера! "+`${nsyy}`);
});

// Автореакция 
bot.on('message', (receivedMessage) => {
    if (receivedMessage.author == bot.user) {
        return
    }
    if (receivedMessage.content.indexOf(prefix) == 0) {
    receivedMessage.react(bot.emojis.get("554122910584012800"))
    }
});


// login 
bot.login(process.env.BOT_TOKEN);






