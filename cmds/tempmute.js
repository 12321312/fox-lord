const Discord = module.require("discord.js");
const fs = require("fs");
const ms = require("ms"); 

module.exports.run = async (bot,message,args) => {
let tomute = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
if(!tomute) return message.reply("такого участника нету");
if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("у вас нет прав на это, идите нахуй");
let muterole = message.guild.roles.find('name', "muted");

  if(!muterole){
      try{
          muterole = await message.guild.createRole({
              name:"muted",
              color: "#000000",
              permission: []
          })
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole,{
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
          });
      }catch(e){
          console.log(e.stack);
      }
  }

let mutetime = args[1];
if(!mutetime) return message.reply("Укажите время, блэать!");

await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> был замучен на ${ms(ms(mutetime))}`);

setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> был размучен`);
},ms(mutetime));


};
module.exports.help = {
    name: "мут"
};
