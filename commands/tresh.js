const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";


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
