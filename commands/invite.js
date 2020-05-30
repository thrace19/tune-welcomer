const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  let inviteembed = new Discord.RichEmbed()
      .setTitle('You Want Me In Your Server?')
      .setDescription('Hello Buddies! You Want A Amazing Bot For Your Server.Click Below To Invite Me!')
      .setColor('#22B0FA')
      .addField("Invite", `[Click Here](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=2146958847)`)
      .setTimestamp()
  message.channel.send(inviteembed)

};

exports.config = {
  "name": "invite",
  "aliases": ["invme"],
  "category": "General",
    example: "invite",
   description: "No Description"
}