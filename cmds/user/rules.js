const Discord = module.require("discord.js");
const fs = require("fs");

exports.run = async (bot, message, args) => { 
    let ambed = new Discord.RichEmbed()
    ambed.setTitle("Правила сервера Fox's Shelter:");
    ambed.setDescription("Незнания правил не освобождает от отвественности.");
    ambed.setTimestamp();
    ambed.setFooter("Твой милый бот", "https://cs4.pikabu.ru/post_img/big/2016/07/16/9/1468678258134342020.jpg");
    ambed.setColor('#d95030');


    ambed.addField(`
1. Общие правила.
`,`
**1.1** Запрещена ненормативная лексика. Мат разрешен в неоскорбительном для других пользователей контексте.
**1.2** Запрещено писать бессмысленную или малосодержательную информацию, не несущую смысловой нагрузки.
**1.3** Запрещено флудить эмодзи.
**1.4** Запрещено писать сообщения сплошными заглавными буквами, сплошным жирным шрифтом, курсивом, подчеркнутым шрифтом. 
**1.5** Запрещается оскорблять других пользователей и администрации канала — будь то прямым или косвенным образом. Оскорбление остается нарушением, даже если оно скрыто под сарказмом или косвенной инсинуацией.
**1.6** Запрещается дискриминация по любому признаку — расовому, национальному, гражданскому, половому, религиозному, возрастному, по инвалидности, роду занятий или сексуальной ориентации.
**1.7** Запрещается цитировать личную переписку из привата или других средств общения одних участников форума с другими без явного согласия обеих сторон.
**1.8** Запрещается разглашение чьей бы то ни было персональной информации.
`);
ambed.addField(`
1. Общие правила (дополнение).
`,`
**1.9** Запрещается публикация материалов грубого, насильственного характера, жестокости, призывы к таковым, сообщения экстремистского толка.
**1.10** Запрещается употребление уничижительных определений различных национальностей, народов и групп, таких как "пиндосы", "хохлы", "москали" и пр.
**1.11** Запрещается обсуждение и публичное осуждение действий представителей Команды — админов и модераторов. Если вы уверены, что модератор превышает свои полномочия, обратитесь к администратору.
`);
ambed.addField(`
2. Ники.
`,`
**2.1** Запрещены ники не носящие какого-либо смысла и нечитабельные ники *(Пример: "asd", "123", "sfkwerqeq1" и т. д.)*.
**2.2** Запрещены ники, которые тем или иным образом могут оскорбить другого человека.
**2.3** Запрещены ники содержащие ненормативную лексику.
**2.4** Запрещается использовать в никах адреса веб–сайтов, адреса email и прочую контактную информацию.
**2.5** Запрещено использование визуально похожего двойника уже существующий ник.
`);
ambed.addField(`
3. Особенности:
`,`
**3.1** Приглашение на сервер твинк-аккаунтов.
**3.2** Рецедив нарушений увеличиваает срок наказания.
**3.3** Накрутка уровня карается обнулением уровня. 
**3.2** Багоюз является нарушением, использование его означает бан. 
`);
ambed.addField(`
Информация:
`,`
 *Администрация проекта в праве в любой момент, без объяснения причин, прекратить предоставление доступа к серверу конкретному пользователю или подсети в целом.
 Администрация проекта в праве в любой момент, без предупреждения, изменить текущие правила.
 При осознании вины в нарушениях правил, игрок может быть разбанен (на усмотрение администрации проекта).
 Ваш компьютер и вы отвечаете за нарушения. Нас не интересует, нарушил ли Ваш друг/брат/мама/папа/кот правила для всех одни.*
 `);

    message.delete();
    message.author.sendMessage({embed:ambed});

};

module.exports.command = {
  name: 'rules',
  aliases: ["правила", "показатьправила", "правиласервера"],
  description: "Ебанные правила, чо доебался?",
  usage: "usercommand",
  category: "user",
  enabled: true
}; 