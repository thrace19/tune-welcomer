const Discord = require("discord.js")

exports.run = (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Sorry, you need Manage Server permission to run this command")
  if (!args[1]) {
    return message.channel.send("please enter a new bot prefix")
  } else if (args[1] === "reset") {
    bot.db.delete(message.guild.id);
    message.channel.send("successfully reset bot prefix");
  } else if (args[1] === "set") {
    if (!args[2]) return;
    let key = message.guild.id;
    bot.db.ensure(key, {
    prefix: bot.prefix
    });
    bot.db.setProp(key, "prefix", args[2])
    message.channel.send(`Sucessfully set bot prefix to ${bot.db.get(key,"prefix")}`);
  }
};

exports.config = {
  "name": "prefix",
  "aliases": [],
  "category": "⚙ Server Settings",
  example: "prefix set '+' or prefix reset",
  description: "Changes the bot prefix for a specific server"
}
