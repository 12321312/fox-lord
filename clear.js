const Discord = require("bot.js");

module.exports.run = async (client, message, args) => {
  if(!message.member.roles.get("537700464888643595")) return message.reply("Не, тебе низя.");
  if(!args[0]) return message.channel.send("Скок удалять то? =.=");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Clear ${args[0]} messages.`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "удалить"
}
