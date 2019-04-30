const Discord = require("discord.js");
const botconfig = require("./config.json");
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
let config = require('./config.json');
let prefix = config.prefix;

// подключение
fs.readdir('./cmds/',(err,files)=>{
  if(err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <=0) console.log("Нет комманд для загрузки!!");
  console.log(`Загружено ${jsfiles.length} комманд`);
  jsfiles.forEach((f,i) =>{
      let props = require(`./cmds/${f}`);
      console.log(`${i+1}.${f} Загружен!`);
      client.commands.set(props.help.name,props);
  });
});

// проверка текста
client.on('message', async message => {
  if(message.author.client) return;
  if(message.channel.type == "dm") return;
  let user = message.author.username;
  let uid = message.author.id;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if(!message.content.startsWith(prefix)) return;
  let cmd = client.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(client,message,args);
});

// шапка
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
  
// login
client.login(process.env.BOT_TOKEN); 
