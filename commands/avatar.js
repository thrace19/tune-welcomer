const Discord = require("discord.js")

exports.run = (bot, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let embed = new Discord.RichEmbed()
  .setAuthor(`${user.username}'s Avatar`)
  .setTitle("Your Profile Picture Link")
  .setURL(user.displayAvatarURL)
  .setImage(user.displayAvatarURL)
  .setColor("#0096ff")
  message.channel.send(embed)
  return
}

exports.config = {
  "name": "avatar",
  "aliases": ["ava","useravatar","pfp"],
  "category": "General",
  example: "avatar @user or avatar",
  description: "Show's your profile picture"
}