const Discord = require("discord.js");
const botconfig = require("./config.json");
const bot = new Discord.Client();
const fs = require('fs');
bot.commands = new Discord.Collection();
let config = require('./config.json');
let prefix = config.prefix;
let profile = require('./profile.json');



const yourID = "294844223675564034";
const setupCMD = "!роль";
const initialMessage = `**Поставь реакцию и получи роль!**`;
const embedMessage = `
Поставь реакцию с нужной ролью и получи эту роль!
`;
const embedFooter = "Роли по реакции"; // Must set this if "embed" is set to true
const roles = ["Dota-key", "EVE-key", "Minecraft-key", "Gmod-key"];
const reactions = ["💻", "🖌", "😃", "🆕"]; // For custom emojis, provide the name of the emoji
const embed = false; // Set to "true" if you want all roles to be in a single embed
const embedColor = "#dd2423"; // Set the embed color if the "embed" variable is set to true
const embedThumbnail = true; // Set to "true" if you want to set a thumbnail in the embed
const embedThumbnailLink = "https://i.imgur.com/P8PD7DD.png"; // The link for the embed thumbnail
const { Client, RichEmbed, Emoji, MessageReaction } = require('discord.js');
const client = new Client({ disableEveryone: true });

if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

function generateMessages() {
  let messages = [];
  for (const role of roles) messages.push({ role, message: `React below to get the **"${role}"** role!` }); //DONT CHANGE THIS
  return messages;
}

function generateEmbedFields() {
  return roles.map((r, e) => {
      return {
          emoji: reactions[e],
          role: r
      };
  });
}

function checkRole(guild, role) {
  const checkRole = guild.roles.find(r => r.name === role);
  if (checkRole) return true;
  else return false;
}

bot.on("message", message => {
  if (message.author.id == yourID && message.content.toLowerCase() == setupCMD) {

      if (!embed) {
          if (!initialMessage) throw "The 'initialMessage' property is not set. Please do this!";

          message.channel.send(initialMessage);

          const messages = generateMessages();
          messages.forEach((obj, react) => {
              if (!checkRole(message.guild, obj.role)) throw `The role '${obj.role}' does not exist!`;

              message.channel.send(obj.message).then(async m => {
                  const emoji = reactions[react];
                  const customEmote = bot.emojis.find(e => e.name === emoji);
                  
                  if (!customEmote) await m.react(emoji);
                  else await m.react(customEmote.id);
              });
          });
      } else {
          if (!embedMessage) throw "The 'embedMessage' property is not set. Please do this!";
          if (!embedFooter) throw "The 'embedFooter' property is not set. Please do this!";

          const roleEmbed = new RichEmbed()
              .setDescription(embedMessage)
              .setFooter(embedFooter);

          if (embedColor) roleEmbed.setColor(embedColor);
          if (embedThumbnail) roleEmbed.setThumbnail(embedThumbnailLink);

          const fields = generateEmbedFields();
          if (fields.length >= 25) throw "That maximum roles that can be set for an embed is 25!";

          for (const f of fields) {
              if (!checkRole(message.guild, f.role)) throw `The role '${role}' does not exist!`;

              const emoji = f.emoji;
              const customEmote = bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD) {

        if (!embed) {
            if (!initialMessage) throw "The 'initialMessage' property is not set. Please do this!";

            message.channel.send(initialMessage);

            const messages = generateMessages();
            messages.forEach((obj, react) => {
                if (!checkRole(message.guild, obj.role)) throw `The role '${obj.role}' does not exist!`;

                message.channel.send(obj.message).then(async m => {
                    const emoji = reactions[react];
                    const customEmote = bot.emojis.find(e => e.name === emoji);
                    
                    if (!customEmote) await m.react(emoji);
                    else await m.react(customEmote.id);
                });
            });
        } else {
            if (!embedMessage) throw "The 'embedMessage' property is not set. Please do this!";
            if (!embedFooter) throw "The 'embedFooter' property is not set. Please do this!";

            const roleEmbed = new RichEmbed()
                .setDescription(embedMessage)
                .setFooter(embedFooter);

            if (embedColor) roleEmbed.setColor(embedColor);
            if (embedThumbnail) roleEmbed.setThumbnail(embedThumbnailLink);

            const fields = generateEmbedFields();
            if (fields.length >= 25) throw "That maximum roles that can be set for an embed is 25!";

            for (const f of fields) {
                if (!checkRole(message.guild, f.role)) throw `The role '${role}' does not exist!`;

                const emoji = f.emoji;
                const customEmote = bot.emojis.find(e => e.name === emoji);
                
                if (!customEmote) roleEmbed.addField(emoji, f.role, true);
                else roleEmbed.addField(customEmote, f.role, true);
            }

            message.channel.send(roleEmbed).then(async m => {
                for (const r of reactions) {
                    const emoji = r;
                    const customEmote = bot.emojis.find(e => e.name === emoji);
                    
                    if (!customEmote) await m.react(emoji);
                    else await m.react(customEmote.id);
                }
            });
        }
    }
});client.emojis.find(e => e.name === emoji);
              
              if (!customEmote) roleEmbed.addField(emoji, f.role, true);
              else roleEmbed.addField(customEmote, f.role, true);
          }

          message.channel.send(roleEmbed).then(async m => {
              for (const r of reactions) {
                  const emoji = r;
                  const customEmote = bot.emojis.find(e => e.name === emoji);
                  
                  if (!customEmote) await m.react(emoji);
                  else await m.react(customEmote.id);
              }
          });
      }
  }
});

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {

  if (!events.hasOwnProperty(event.t)) return;

  const { d: data } = event;
  const user = client.users.get(data.user_id);
  const channel = client.channels.get(data.channel_id);

  const message = await channel.fetchMessage(data.message_id);
  const member = message.guild.members.get(user.id);

  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
  let reaction = message.reactions.get(emojiKey);

  if (!reaction) {
      // Create an object that can be passed through the event like normal
      const emoji = new Emoji(client.guilds.get(data.guild_id), data.emoji);
      reaction = new MessageReaction(message, emoji, 1, data.user_id === client.user.id);
  }

  let embedFooterText;
  if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

  if (message.author.id === client.user.id && (message.content !== initialMessage || (message.embeds[0] && (embedFooterText !== embedFooter)))) {

      if (!embed) {
          const re = `\\*\\*"(.+)?(?="\\*\\*)`;
          const role = message.content.match(re)[1];

          if (member.id !== client.user.id) {
              const roleObj = message.guild.roles.find(r => r.name === role);

              if (event.t === "MESSAGE_REACTION_ADD") {
                  member.addRole(roleObj.id);
              } else {
                  member.removeRole(roleObj.id);
              }
          }
      } else {
          const fields = message.embeds[0].fields;

          for (let i = 0; i < fields.length; i++) {
              if (member.id !== client.user.id) {
                  const role = message.guild.roles.find(r => r.name === fields[i].value);

                  if ((fields[i].name === reaction.emoji.name) || (fields[i].name === reaction.emoji.toString())) {
                      if (event.t === "MESSAGE_REACTION_ADD") {
                          member.addRole(role.id);
                          break;
                      } else {
                          member.removeRole(role.id);
                          break;
                      }
                  }
              }
          }
      }
  }
});

process.on('unhandledRejection', err => {
  let msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
console.error(`Unhandled Rejection: \n ${msg}`);
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






