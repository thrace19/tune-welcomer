const Discord = require("discord.js")
exports.run = (bot, message, args) => {
  
      if(!args[1]) {
       let help = new Discord.RichEmbed()
        .setThumbnail(bot.user.avatarURL) 
        .setColor("#0096ff")
        .addField("General", `${bot.commands.filter(cmd => cmd.config.category == 'General').map(cmd => `\`${cmd.config.name}\``).join(", ")}`, true)
        .addField("⚙ Server Settings", `${bot.commands.filter(cmd => cmd.config.category == '⚙ Server Settings').map(cmd => `\`${cmd.config.name}\``).join(", ")}`, true)
        .addField("🔑 Bot Owner", `${bot.commands.filter(cmd => cmd.config.category == '🔑 Bot Owner').map(cmd => `\`${cmd.config.name}\``).join(", ")}`, true);
        message.channel.send(help);

} else {

   let cmd = args[1]
   if(bot.commands.has(cmd) || bot.commands.get(bot.aliases.get(cmd))) {
   let command  = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
         let name = `${command.config.name}`;
      let desc = command.config.description;
      let aliases = command.config.aliases;
      let example = `${bot.prefix}${command.config.example}`; 
      
           let embed = new Discord.RichEmbed()
      .setThumbnail(bot.user.avatarURL) 
      .setTitle(`Command: ${name}`) 
      .addField('Description', `**${desc}**`)
      .addField('Aliases', `${aliases[0]}` ? `${aliases.join(`, `)}` : `No aliases`)
      .addField('Example', `**${example}**`)
      .setColor("#0096ff") 
      return message.channel.send(embed);
   }

}
  
}

exports.config = {
  "name": "help",
  "aliases": ["h","commands","command","cmd","cmds"],
  "category": "General",
  example: "help ping",
  description: "Gives info of all commands"
}