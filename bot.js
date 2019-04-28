const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";
const fs = require("fs");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
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
 
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content.indexOf(prefix) == 0) {
    receivedMessage.react(client.emojis.get("554122910584012800"))
    }
});

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

 
// THIS  MUST  BE  THIS  WAY 
client.login(process.env.BOT_TOKEN); 
