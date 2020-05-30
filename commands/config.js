const Discord = require("discord.js")
exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Sorry, you need Administration permission to run this command");
  let key = message.guild.id;
  if(!args[1]) {
    let help = new Discord.RichEmbed()
    .setThumbnail(bot.user.avatarURL)
    .addField(`${bot.prefix}config autorole @role`,`Set AutoRole For Server`)
    .addField(`${bot.prefix}config wch #channel`,`Set Welcome Channel For Server`)
    .addField(`${bot.prefix}config gch #channel`,`Set Goodbye Channel For Server`)
    .addField(`${bot.prefix}config wtest`,`To Test Your Welcomer Image`)
    .addField(`${bot.prefix}config gtest`,`To Test Your Goodbye Image`)
    .setColor(`#0096ff`)
     return message.channel.send(help);
     }
  else if (args[1] === "wch") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({embed: {color: 0xFFC100, description: "Mention a channel to set welcome channel."}});
    bot.sdB.setProp(key,"welcomeChannel", channel.id)
    message.channel.send({embed: {color: 0xFFC100, description:`Welcome channel is set to **#${channel.name}.**`}});
  } else if (args[1] === "gch") {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({embed: {color: 0xFFC100, description: "Mention a channel to set Goodbye channel."}});
    bot.sdB.setProp(key,"leaveChannel",channel.id)
    message.channel.send({embed: {color: 0xFFC100, description:`Goodbye channel is set to **#${channel.name}.**`}});
  }
  else if(args[1] === "wtest") {
  const wtest = await bot.sdB.get(key,"welcomeChannel"); 
  if(!wtest) return message.channel.send({color: 0xFFC100, embed: {description: "Set a Welcome channel first to use this command."}});
  bot.emit('guildMemberAdd',message.member);
  }
  else if(args[1] === "gtest") {
  const wtest = await bot.sdB.get(key,"leaveChannel"); 
  if(!wtest) return message.channel.send({color: 0xFFC100,embed: {description: "Set a Goodbye channel first to use this command."}});
  bot.emit('guildMemberRemove', message.member);
  }
  else if(args[1] === "autorole") {
  let role = message.mentions.roles.first();
  if(!role) return message.channel.send({embed: {color: 0xFFC100, description: "Mention a role to set auto role."}});
  bot.adB.setProp(key,"autorole",role.id);
  message.channel.send({embed: {color: 0xFFC100, description:`Auto role is set to **@${role.name}.**`}});
  }
  return;
}

exports.config = {
  "name": "config",
  "aliases": ["cfg"],
  "category": "⚙ Server Settings",
    example: "config help for better example",
  description: "Set's welcome or goodbye channel"
}