const Discord = module.require("discord.js");
const fs = require("fs");
exports.run = async (bot, message, args) => { 

 var Hero = Array("Abaddon","Alchemist","Ancient%20Apparition","Anti-Mage","Arc%20Warden","Axe","Bane","Batrider","Beastmaster","Bloodseeker","Bounty%20Hunter","Brewmaster","Bristleback","Broodmother","Centaur%20Warrunner","Chaos%20Knight","Chen","Clinkz","Clockwerk","Crystal%20Maiden","Dark%20Seer","Dark%20Willow","Dazzle","Death%20Prophet","Disruptor","Doom","Dragon%20Knight","Drow%20Ranger","Earth%20Spirit","Earthshaker","Elder%20Titan","Ember%20Spirit","Enchantress","Enigma","Faceless%20Void","Grimstroke","Gyrocopter","Huskar","Invoker","Io","Jakiro","Juggernaut","Keeper%20of%20the%20Light","Kunkka","Legion%20Commander","Leshrac","Lich","Lifestealer","Lina","Lion","Lone%20Druid","Luna","Lycan","Magnus","Mars","Medusa","Meepo","Mirana","Monkey%20King","Morphling","Naga%20Siren","Natures%20Prophet","Necrophos","Night%20Stalker","Nyx%20Assassin","Ogre%20Magi","Omniknight","Oracle","Outworld%20Devourer","Pangolier","Phantom%20Assassin","Phantom%20Lancer","Phoenix","Puck","Pudge","Pugna","Queen%20of%20Pain","Razor","Riki","Rubick","Sand%20King","Shadow%20Demon","Shadow%20Fiend","Shadow%20Shaman","Silencer","Skywrath%20Mage","Slardar","Slark","Sniper","Spectre","Spirit%20Breaker","Storm%20Spirit","Sven","Techies","Templar%20Assassin","Terrorblade","Tidehunter","Timbersaw","Tinker","Tiny","Treant%20Protector","Troll%20Warlord","Tusk","Underlord","Undying","Ursa","Vengeful%20Spirit","Venomancer","Viper","Visage","Warlock","Weaver","Windranger","Winter%20Wyvern","Witch%20Doctor","Wraith%20King","Zeus");
 var Line = [
     {value: 1, name: 'Mid, 1 позиция'},
     {value: 2, name: 'Easy, 2 позиция'},
     {value: 3, name: 'Hard, 3 позиция'},
     {value: 4, name: 'Hard, 4 позиция'},
     {value: 5, name: 'Easy, 5 позиция'} 
 ];
 var TextAr = Array('Хорошая идея будет взять:', 'Стоит попробовать:', 'Отлично себя покажет:', 'Наверное это вам пойдет:', 'Пикайте себе на здровье:')
 const randomHero = Hero[Math.floor(Math.random()*Hero.length)];
 const randomTextAr = TextAr[Math.floor(Math.random()*TextAr.length)];
 const randomidlol = Math.floor(Math.random() * 5);   

 let a = message.author;
 let dotasend = new Discord.RichEmbed()
 .setTitle(`${randomTextAr}`)
 .setTimestamp()
 .setURL("https://dota2.ru/heroes/")
 .addField(`${randomHero}`, "Линия: "+`${Line[randomidlol].name}`, true)
 .setAuthor(a.username, a.avatarURL)
 .setImage("https://raw.githubusercontent.com/12321312/fox-lord/master/img/"+`${Line[randomidlol].value}`+".png")
 .setThumbnail("https://raw.githubusercontent.com/12321312/fox-lord/master/img/"+`${randomHero}`+".jpg")
 .setColor("#c10020")
 .setFooter("Dota Random Hero", "https://avatanplus.com/files/resources/mid/5b4d22308ef8c164a54d8dca.png")

 message.channel.send({embed:dotasend}).then(async msg => {
    await msg.react("👍");
    await msg.react("👎");
});
};
module.exports.command = {
    name: 'dotaramdom',
    aliases: ["дота", "дотарандом", "дотагерой"],
    description: "Выбирает героя для доты, чо доебался?",
    usage: "usercommand",
    category: "user",
    enabled: true
}; 