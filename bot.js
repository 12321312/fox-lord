const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
bot.commands = new Discord.Collection();
let config = require('./config.json');
let prefix = config.prefix;
const yourID = "294844223675564034"; 
const setupCMD = "!роль";
const roles = ["Dota-key", "EVE-key", "CS-key", "Minecraft-key", "Gmod-key", "SI-key", "Secret-key"];
const reactions = ["dota","eve","cs","minecraftsword", "gmod","☄","🔞"];
const embedColor = "#dd2423"; 
const embedThumbnail = true; 
const embedThumbnailLink = "http://pngimg.com/uploads/shield/shield_PNG1276.png"; 
const mysql = require("mysql");
const invites = {};
let cooldown = new Set();
let cdseconds = 7;

// бот реакции
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

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
var consql = {
    host: process.env.HOST_MYSQL,
    user: process.env.LOGIN_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL
};

var connection;
 function handleDisconnect() {
    connection = mysql.createConnection(consql); 

    connection.connect(function(err) {              
        if(err) {                                     
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); 
        }                                    
      });  
      connection.on('error', function(err) {
        //console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
          handleDisconnect();                         
        } else {                                      
          throw err;                                  
        }
      });
    }
    handleDisconnect();

// XP
function generateXp() {
    let min = 2;
    let max = 22;
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
  bot.send = function (msg){
        message.channel.send(msg);
  };

  connection.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
   if(err) throw err;
   let sql;
   if(rows.length < 1) {
    sql = `INSERT INTO xp (id, xp, point) VALUES ('${message.author.id}', ${generateXp()}, 0)`
   } else {
    let xp = rows[0].xp;
    let point = rows[0].point;
    sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`

   let xprole0 = message.guild.roles.find('name', "Прозелит");
   let xprole1 = message.guild.roles.find('name', "Искушенный");
   let xprole2 = message.guild.roles.find('name', "Штуцер");
   let xprole3 = message.guild.roles.find('name', "Шнурок");
   let xprole4 = message.guild.roles.find('name', "Просвещенный");
   let xprole5 = message.guild.roles.find('name', "Знаток");
   let xprole6 = message.guild.roles.find('name', "Божество");

   if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор"].includes(r.name)) ){
   if (xp > 5000 && xp < 10000) { 
       if (!message.member.roles.find('name', "Искушенный")) {
       message.member.removeRole(xprole0.id); 
       message.member.addRole(xprole1.id); 
       message.reply("поздравляю с новым званием <@&537701837000802304>! Вы набрали 5 уровень. Выдал вам 5 поинтов за уровень!");
       let pointlvladd = `UPDATE xp SET point = ${point}+5 WHERE id = '${message.author.id}'`;
       connection.query(pointlvladd);
    }}
    if (xp > 10000 && xp < 20000) { 
        if (!message.member.roles.find('name', "Штуцер")) {
        message.member.removeRole(xprole1.id); 
        message.member.addRole(xprole2.id); 
        message.reply("поздравляю с новым званием <@&537702291059507213>! Вы набрали 10 уровень. Выдал вам 10 поинтов за уровень!");
        let pointlvladd = `UPDATE xp SET point = ${point}+10 WHERE id = '${message.author.id}'`;
        connection.query(pointlvladd);
    }}
    if (xp > 20000 && xp < 35000) { 
        if (!message.member.roles.find('name', "Шнурок")) {
        message.member.removeRole(xprole2.id); 
        message.member.addRole(xprole3.id); 
        message.reply("поздравляю с новым званием <@&537706999845093377>! Вы набрали 20 уровень. Выдал вам 20 поинтов за уровень!");
        let pointlvladd = `UPDATE xp SET point = ${point}+20 WHERE id = '${message.author.id}'`;
        connection.query(pointlvladd);
    }}
    if (xp > 35000 && xp < 70000) { 
        if (!message.member.roles.find('name', "Просвещенный")) {
        message.member.removeRole(xprole3.id); 
        message.member.addRole(xprole4.id); 
        message.reply("поздравляю с новым званием <@&596398929718018049>! Вы набрали 35 уровень. Выдал вам 35 поинтов за уровень!");
        let pointlvladd = `UPDATE xp SET point = ${point}+35 WHERE id = '${message.author.id}'`;
        connection.query(pointlvladd);
    }}
    if (xp > 70000 && xp < 100000) { 
        if (!message.member.roles.find('name', "Знаток")) {
        message.member.removeRole(xprole4.id); 
        message.member.addRole(xprole5.id); 
        message.reply("поздравляю с новым званием <@&596399524847812621>! Вы набрали 70 уровень. Выдал вам 70 поинтов за уровень!");
        let pointlvladd = `UPDATE xp SET point = ${point}+35 WHERE id = '${message.author.id}'`;
        connection.query(pointlvladd);
    }}
    if (xp > 100000) { 
        if (!message.member.roles.find('name', "Божество")) {
        message.member.removeRole(xprole5.id); 
        message.member.addRole(xprole6.id); 
        message.reply("поздравляю с новым званием <@&596399865274171461>! Вы набрали 100 уровень, максимальный на этом сервере. Дарю вам за это 150 поинтов!");
        let pointlvladd = `UPDATE xp SET point = ${point}+150 WHERE id = '${message.author.id}'`;
        connection.query(pointlvladd);
    }}
    };
}

   connection.query(sql);
  });

connection.query(`SELECT * FROM clien WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) throw err;
 
    
    if(rows.length < 1) {
       let sqladddl = `INSERT INTO clien (id, cm, pidr) VALUES ('${message.author.id}', 0, 0)`
       connection.query(sqladddl);
    } else {
      let cms = rows[0].cm;
      let pidor = rows[0].pidr;
       if (cms == 0) {
        for (sizepenisrole = 1; sizepenisrole < 31; sizepenisrole++) {
         if (message.member.roles.find('name', `${sizepenisrole} см`)) {
          let sqladdcm = `UPDATE clien SET cm = ${sizepenisrole} WHERE id = '${message.author.id}'` 
          connection.query(sqladdcm); 
         };
        };
       };
       
       if (pidor == 0) {
        if (message.member.roles.find('name', 'Пидор')) {
         let sqladd = `UPDATE clien SET pidr = 1 WHERE id = '${message.author.id}'`
         connection.query(sqladd);  
        } else if (message.member.roles.find('name', 'Натурал')) {
         let sqladd2 = `UPDATE clien SET pidr = 2 WHERE id = '${message.author.id}'`
         connection.query(sqladd2);  
         }
        };
       
       if (cms > 0) {
        if (!message.member.roles.find('name', `${cms} см`)) {
         let clienroleadd = message.guild.roles.find('name', `${cms} см`);
         message.member.addRole(clienroleadd.id)
        }
       };
       
       if (pidor > 0) {
        if (pidor == 1) {
          let pidorrole1 = message.guild.roles.find('name', 'Пидор');  
          message.member.addRole(pidorrole1.id)
        } else if (pidor == 2) {
            let pidorrole2 = message.guild.roles.find('name', 'Натурал');  
            message.member.addRole(pidorrole2.id)
        };
       };
    };
});  



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

  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("хэй! Подожди 7 секунд и пиши команду...")
}
  if(!message.member.roles.some(r=>["Лисий повелитель", "Куратор", "Дозорный", "Прислужник", "Music-key", "Nsfw-знаток", "Божество"].includes(r.name)) ){
    cooldown.add(message.author.id);
} 

  await message.react(bot.emojis.get("554122910584012800"));

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  let cmd = bot.commands.get(command);
  if(cmd) cmd.run(bot,message,args,connection);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
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
    bot.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
  const ei = invites[member.guild.id];
  invites[member.guild.id] = guildInvites;
  const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
  const inviter = bot.users.get(invite.inviter.id);
});
});
  console.log('User ' + member.user.tag + ' зашёл на сервер!');
  let channel = bot.channels.get("537720268446236682");
  var role = member.guild.roles.get("537701217879588878");
  let esyy = bot.emojis.get("554122910584012800");
  channel.send(`На сервер зашёл **${member.user.tag}** используя приглашение от ${inviter.tag}! (${invite.uses}) `+`${esyy}`);
  member.addRole(role);
});

bot.on('guildMemberRemove', member => {
  console.log('User ' + member.user.tag + ' вышел с сервера!');
  let channel = bot.channels.get("537720268446236682");
  let nsyy = bot.emojis.get("554122783165251585");
  channel.send("**"+member.user.tag+"** вышел с сервера! "+`${nsyy}`);
});


// login 
bot.login(process.env.BOT_TOKEN);






