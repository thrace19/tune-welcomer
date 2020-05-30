const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
  const { body } = await require("node-superfetch").get('https://api-to.get-a.life/meme');
  let emb = new Discord.RichEmbed()
  .setDescription(`**${body.text}**`)
  .setImage(body.url)
  .setColor("#0096ff")
  message.channel.send(emb)
}

exports.config = {
  "name": "meme",
  "aliases": ["memes"],
  "category": "Fun",
  example: "meme",
  description: "A command which can make you laugh"
}