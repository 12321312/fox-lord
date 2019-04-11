const Discord = require('discord.js');
const client = new Discord.Client();
const vostkl = "!";

client.on('ready', () => {
console.log('Запущен, сэр!');
client.user.setPresence({
       status: "online",
       game: {
           name: "-help | crater en directo",
           url: "https://www.twitch.tv/CraterMaik",
           type: "STREAMING"
       }
   })
});

client.on('message', message => {
    if (message.content === '!пинг') {
    	message.reply('пшёл нахуй, нормальный пинг');
  	}
});

client.on('message', message => {
    if (message.content === '!выдать') {
    if (message.member.roles.get("537700464888643595"))
      {      

      } 
    else 
      {
        message.reply("Вы не можете выдавать роли, сосать");
      }
      }
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content === vostkl) {
    let customEmoID = receivedMessage.guild.emojis.get(554122910584012800);
    receivedMessage.guild.emojis.forEach(customEmoID => {
    receivedMessage.react(customEmoID)
    })
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
