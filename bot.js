const Discord = require("discord.js");
const botconfig = require("./config.json");
const client = new Discord.Client();
const prefix = "!";
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const bot.commands = new Discord.Collection();

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
    bot.commands.set(props.help.name, props);
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

 
// THIS  MUST  BE  THIS  WAY 
client.login(process.env.BOT_TOKEN); 
