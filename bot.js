const Discord = require('discord.js');
const client = new Discord.Client();
const vostkl = "!";

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
    if (receivedMessage.content.indexOf(vostkl) == 0) {
    receivedMessage.react(client.emojis.get("554122910584012800"))
    }
});

client.on('message', message => {
  if (message.content === vostkl + 'лав') {
  message.author.sendMessage("Я люблю тебя ♥");
  message.delete(1);
  }
});

client.on('message', message => {
    if (message.content === vostkl + 'пинг') {
    message.reply('да нормальный у тебя пинг `' + `${message.createdTimestamp - Date.now()}` + '` м/с, успокойся');
  	}
});

client.on('message', message => {
    if (message.content === vostkl + 'Удалить') {
    if (message.member.roles.get("537700464888643595")) {      
       if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length;
            message.channel.sendMessage("Сообщения успешно удалены, всего удалено: "+`messagesDeleted`);
            console.log('Сообщения успешно удалены, всего удалено: '+messagesDeleted)
          })
       }
    }
    else  {
        message.reply("Вы не можете удалять, сосать");
      }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN); 
