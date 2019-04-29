const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
    if (receivedMessage.content.indexOf(prefix) == 0) {
    receivedMessage.react(client.emojis.get("554122910584012800"))
    }
});
