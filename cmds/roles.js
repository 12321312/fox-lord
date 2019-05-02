const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send("Сосать", {
        file: "https://psv4.userapi.com/c848032/u64620891/docs/d3/3e6894ddc9af/Bez_imeni-1.png?extra=WPGm5-4ucm2-2KHYjP7dCJBlj5q0bo-8DHyLiMgrfG6Ll7T0D8ho64c6qxJ7I7XZT8I-ElF1F0EZ_-M6loK7kGDr1QR5QfK80VwHXdhR8-x_wLznptvKQRSr8ITBkmtWzjh5uNjgRt2puzrgbLyF8Q" 
    });
};

module.exports.help = {
    name: 'ключ'
};
