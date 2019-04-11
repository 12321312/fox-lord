const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
console.log('Запущен, сэр!');
client.user.setPresence({ 
status: "Online", 
 game: { 
  name: 'Online ${client.guilds.size} ', 
  type: "Streaming"
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
        let role = msg.guild.roles.find(c => c.name === msg.content.split(" ")[1])
        let user = msg.mentions.members.first();
        user.addRole(role.id);
        message.reply(`Пользователю `+user+` была выдана роль!`);
      } 
    else 
      {
        message.reply("Вы не можете выдавать роли, сосать");
      }
      }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
