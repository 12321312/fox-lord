const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    await message.delete().catch(O_o=>{});

    const a = message.guild.roles.get('537706487842340865'); // дота
    const b = message.guild.roles.get('537706608105619457'); // гмод
    const c = message.guild.roles.get('537706571015258156'); // Eve

    const filter = (reaction, user) => ['dota', 'gmod', 'eve'].includes(reaction.emoji.name) && user.id === message.author.id;

    let ombed = new Discord.RichEmbed()
        .setTitle('Выберите ключ')
        .setDescription(`
        🇦 ${a.toString()} 
        🇧 ${b.toString()} 
        🇨 ${c.toString()}
        `)
        .setColor(0xdd9323)
        .setFooter(`ID: ${message.author.id}`);
        
    message.channel.send({embed:ombed}).then(async msg => {

        await msg.react('dota');
        await msg.react('gmod');
        await msg.react('eve');

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
                        return message.channel.send('Вы уже имеете этот ключ!').then(m => m.delete(3000));
                    }
                    message.member.addRole(a).catch(err => {
                        console.log(err);
                        return message.channel.send(`Ошибка выдачи ключа: **${err.message}**.`);
                    });
                    message.channel.send(`Вам был выдан **${a.name}**!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
                case '🇧':
                    if (message.member.roles.has(b.id)) {
                        msg.delete(2000);
                        return message.channel.send('Вы уже имеете этот ключ!').then(m => m.delete(3000));
                    }
                    message.member.addRole(b).catch(err => {
                        console.log(err);
                        return message.channel.send(`Ошибка выдачи ключа: **${err.message}**.`);
                    });
                    message.channel.send(`Вам был выдан **${b.name}**!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
                case '🇨':
                    if (message.member.roles.has(c.id)) {
                        msg.delete(2000);
                        return message.channel.send('Вы уже имеете этот ключ!').then(m => m.delete(3000));
                    }
                    message.member.addRole(c).catch(err => {
                        console.log(err);
                        return message.channel.send(`Ошибка выдачи ключа: **${err.message}**.`);
                    });
                    message.channel.send(`Вам был выдан **${c.name}**!`).then(m => m.delete(3000));
                    msg.delete();
                    break;
            }
        }).catch(collected => {
            return message.channel.send(`Я не смогу вас добавить :с`);
        });

    });

};

module.exports.help = {
    name: 'ключ'
};
