const { owners_id } = require("../config.json");
const { RichEmbed } = require("discord.js");
const { post } = require('node-superfetch');
const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  
  var msg = message;
  var client = bot; // ea :v
  
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;

    const embed = new RichEmbed()
    .addField('Input', '```js\n' + args.slice(1).join(" ") + '```')
    .setFooter(`⏱️ ${Date.now() - message.createdTimestamp}ms`)

    try {
      const code = args.slice(1).join(" ");
      if (!code) return;
      let evaled;
      if (code.includes("token") || code.includes("env")) {
        evaled = ":P";
      } else {
        evaled = eval(code);
      }
      
      let type = typeof evaled

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});
      let output = clean(evaled);
      
      if (output.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(output);
          embed.setColor('#0096ff')
          embed.addField('Output', `https://www.hastebin.com/${body.key}.js`);
          embed.addField("Type", `\`\`\`js\n${type}\n\`\`\``)
      } else {
          embed.setColor('#0096ff')
          embed.addField('Output', '```js\n' + output + '```');
          embed.addField("Type", `\`\`\`js\n${type}\n\`\`\``)
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(error);
          embed.setColor('0xff0000')
          embed.addField('Error', `https://www.hastebin.com/${body.key}.js`);
          embed.addField("Type", `\`\`\`js\n${this.type}\n\`\`\``)
      } else {
          embed.setColor('0xff0000')
          embed.addField('Error', '```js\n' + error + '```');
          embed.addField("Type", `\`\`\`js\n${this.type}\n\`\`\``)
      }
      message.channel.send(embed);
    }
  })
  return
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


exports.config = {
  "name": "eval",
  "aliases": ["ev", "e"],
  "category": "🔑 Bot Owner",
  example: "eval this",
  description: "A command for managing the bot"
}
