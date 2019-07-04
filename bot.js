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
const roles = ["Dota-key", "EVE-key", "CS-key", "Minecraft-key", "Gmod-key", "SI-key", "Secret-key"];
const reactions = ["dota","eve","cs","minecraftsword", "gmod","☄","🔞"];
const embed = true; 
const embedColor = "#dd2423"; 
const embedThumbnail = true; 
const embedThumbnailLink = "http://pngimg.com/uploads/shield/shield_PNG1276.png"; 
const antispam = require("anti-spam");
const mysql = require("mysql");
 
antispam(bot, {
  warnBuffer: 3,
  maxBuffer: 5,
  interval: 2000, 
  warningMessage: "хватит спамить!", 
  roleMessage: "в мут за спам!", 
  roleName: "muted", 
  maxDuplicatesWarning: 7, 
  maxDuplicatesBan: 10, 
  time: 3600000, 
});
// бот реакции
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

function generateMessages() {
    let messages = [];
    for (const role of roles) messages.push({ role, message: `React below to get the **"${role}"** role!` }); 
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

bot.on('error', console.error);
bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD) {

            const roleEmbed = new Discord.RichEmbed()
                .setTitle(`**Ключи:**`)
                .setDescription("```Поставь реакцию под этим сообщением. И получи свой ключ от нужной категории!```")
                .setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg")
                .setTimestamp();

            if (embedColor) roleEmbed.setColor(embedColor);
            if (embedThumbnail) roleEmbed.setThumbnail(embedThumbnailLink);

            const fields = generateEmbedFields();
            if (fields.length >= 25) throw "Максимум 25 ролей!";

            for (const f of fields) {
                if (!checkRole(message.guild, f.role)) throw `Роль '${role}' не найдена!`;

                const emoji = f.emoji;
                const customEmote = bot.emojis.find(e => e.name === emoji);
                
                if (!customEmote) roleEmbed.addField(emoji, f.role, true);
                else roleEmbed.addField(customEmote, f.role, true);
            }

            message.channel.send({embed:roleEmbed}).then(async m => {
                for (const r of reactions) {
                    const emoji = r;
                    const customEmote = bot.emojis.find(e => e.name === emoji);
                    
                    if (!customEmote) await m.react(emoji);
                    else await m.react(customEmote.id);
                }
            });
        }
});


const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};


bot.on('raw', async event => {

    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = bot.users.get(data.user_id);
    const channel = bot.channels.get(data.channel_id);

    const message = await channel.fetchMessage(data.message_id);
    const member = message.guild.members.get(user.id);

    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);

    if (!reaction) {
        const emoji = new Discord.Emoji(bot.guilds.get(data.guild_id), data.emoji);
        reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
    }

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

    if (message.author.id === bot.user.id && ((message.embeds[0]))) {

            const fields = message.embeds[0].fields;

            for (let i = 0; i < fields.length; i++) {
                if (member.id !== bot.user.id) {
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
});

process.on('unhandledRejection', err => {
    let msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
	console.error(`Unhandled Rejection: \n ${msg}`);
});

// mysql
var consql = mysql.createConnection({
    host: process.env.HOST_MYSQL,
    user: process.env.LOGIN_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL
});

consql.connect(err => {
 if(err) throw err;
 console.log("Подключено к базе данных!");
});

// XP
function generateXp() {
    let min = 20;
    let max = 30;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

  consql.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
   if(err) throw err;
   console.log(rows);
   let sql;
   if(rows.length < 1) {
    sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXp()})`
   } else {
    let xp = rows[0].xp;
    sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`
   }

   consql.query(sql, console.log);
  });

  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if(!message.content.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot,message,args,consql);
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






