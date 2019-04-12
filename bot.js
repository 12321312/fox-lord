const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";

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
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);   
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
       
if (msg.startsWith(prefix + 'ОЧИСТИТЬ')) {
    async function deleite() {
       if (!message.member.roles.get("537700464888643595")) {
                message.reply('Вы не можете удалять сообщения. :с'); 
                return; 
       }
       if (isNaN(args[1])) {
                message.reply('А сколько удалять то? \n Напиши: `' + prefix + 'очистить <@ник> <число>`');
                return;
       }
       if ((args[1]) >= 100) {
                message.reply('Больше 100 за раз не могу ;с');
                return;
       }
     const fetched = await message.channel.fetchMessages({limit: args[1]}).then((messages) => { if (member.id) {  messages = messages.filter(m => m.author.id === member.id).array().slice(0, args[1]}});
     console.log(fetched.size + ' сообщения найдены, удаление...'); 
     message.reply('удалено `' + fetched.size + '` сообщений');       
           
     message.channel.bulkDelete(fetched)
     .catch(error => message.channel.send(`Error: ${error}`));   
 }
  deleite();
 }             
       
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN); 
