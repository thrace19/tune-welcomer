const {owners_id} = require("../config.json");
const Discord = require("discord.js")
const {Canvas} = require("canvas-constructor")
const {loadImage} = require("canvas")

exports.run = async (bot, message, args) => {
  let code = args.slice(1).join(" ")
  if (!code) return
  
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
  const embed = new Discord.RichEmbed()
  let image = await loadImage(message.author.displayAvatarURL)
    //.addField('Input', '```js\n' + code + '```')
  
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
    try {
    let evaled = await eval(code)
    const attachment = new Discord.Attachment(evaled.toBuffer(), 'canvas.png')
    //embed.setTitle("Output")
    embed.attachFile(attachment)
    embed.setImage("attachment://canvas.png")
    embed.setColor("#0096ff")
    message.channel.send(embed)
    } catch (e) {
      embed.addField("Error", "```js\n"+e.message+"```")
      embed.setColor("#FF0000")
      message.channel.send(embed)
    }
  })
  })
  
}

exports.config = {
  "name": "canvas",
  "aliases": ["cv","c"],
  "category": "🔑 Bot Owner",
  example: "canvas code here",
  description: "Simple Canvas Command"
}