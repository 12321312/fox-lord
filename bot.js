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
});


const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    await message.delete().catch(O_o=>{});

    const a = message.guild.roles.get('485987998794514442'); // Moderator
    const b = message.guild.roles.get('485987998165499914'); // Administrator
    const c = message.guild.roles.get('482192667766423561'); // Developer

    const filter = (reaction, user) => ['🇦', '🇧', '🇨'].includes(reaction.emoji.name) && user.id === message.author.id;

    const embed = new RichEmbed()
        .setTitle('Avaiilable Roles')
        .setDescription(`
        
        🇦 ${a.toString()}
        🇧 ${b.toString()}
        🇨 ${c.toString()}
        `)
        .setColor(0xdd9323)
        .setFooter(`ID: ${message.author.id}`);
        
    message.channel.send(embed).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        await msg.react('🇨');

        msg.awaitReactions(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(collected => {

            const reaction = collected.first();

            switch (reaction.emoji.name) {
                case '🇦':
                    if (message.member.roles.has(a.id)) {
                        msg.delete(2000);
                        return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                    }
                    message.member.addRole(a).catch(err => {
                        console.log(err);
                        return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                    });
                    message.channel.send(`You have been added to the **${a.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
                case '🇧':
                    if (message.member.roles.has(b.id)) {
                        msg.delete(2000);
                        return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                    }
                    message.member.addRole(b).catch(err => {
                        console.log(err);
                        return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                    });
                    message.channel.send(`You have been added to the **${b.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
                case '🇨':
                    if (message.member.roles.has(c.id)) {
                        msg.delete(2000);
                        return message.channel.send('You are already in this role!').then(m => m.delete(3000));
                    }
                    message.member.addRole(c).catch(err => {
                        console.log(err);
                        return message.channel.send(`Error adding you to this role: **${err.message}**.`);
                    });
                    message.channel.send(`You have been added to the **${c.name}** role!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
            }
        }).catch(collected => {
            return message.channel.send(`I couldn't add you to this role!`);
        });

    });

};

exports.help = {
    name: 'roles'
};

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN); 
