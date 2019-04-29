const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";

client.on('guildMemberAdd', member => {
  console.log('User ' + member.user.tag + ' зашёл на сервер!');
  let channel = client.channels.get("537720268446236682");
  var role = member.guild.roles.get("537701217879588878");
  let esyy = client.emojis.get("554122910584012800");
  channel.send("На сервер зашёл **"+member.user.tag+"**! "+`${esyy}`);
  member.addRole(role);
});

client.on('guildMemberRemove', member => {
  console.log('User ' + member.user.tag + ' вышел с сервера!');
  let channel = client.channels.get("537720268446236682");
  let nsyy = client.emojis.get("554122783165251585");
  channel.send("**"+member.user.tag+"** вышел с сервера! "+`${nsyy}`);
});
