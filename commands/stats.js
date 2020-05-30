const Discord = require("discord.js");
let os = require('os')
let cpuStat = require("cpu-stat")

exports.run = async (client, msg, args) => {
  let API = (client.ping).toFixed(0)
  let Ltncy = Date.now() - msg.createdTimestamp
  let cpuLol;
    cpuStat.usagePercent( async function(err, percent, seconds) {
        if (err) {
            return console.log(err);
    }
  let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username + " Stats", client.user.displayAvatarURL)
      .setColor("#0096ff")
      .setThumbnail(client.user.displayAvatarURL)
      .setDescription(`Discord.js: v${Discord.version}\nNode: ${process.version}`)
      .addField("Memory Usage", `**${(process.memoryUsage().heapUsed / 660 / 660).toFixed(0)} / ${(os.totalmem() / 7925 / 7925).toFixed(0)}** MB`, true)// / 1024 / 1024
      .addField("CPU Usage", `**${percent.toFixed(2)}**%`, true)
      .addField("CPU", `\`\`\`${os.cpus()[0].model}\`\`\``)
      .addField("Ping", "Latency: **" + Ltncy + "**ms\nAPI: **" + API + "**ms", true)
      .addField("Platform", `${os.type()} ${os.arch()}`, true)
      .addField("Uptime", parseDur(client.uptime))
      .addField("Client Stats", `• **${client.guilds.size}** Servers • **${client.channels.size}** Channels • **${client.users.size}** Users`)
  .setTimestamp()
  msg.channel.send(embed);
      });
  return
   };

function parseDur(ms){
    let seconds = ms / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    
    if (days) {
      return `**${days}** Days **${hours}** Hours **${minutes}** Minutes **${seconds}** Seconds`;
    }
    else if (hours) {
      return `**${hours}** Hours **${minutes}** Minutes **${seconds}** Seconds`;
    }
    else if (minutes) {
      return `**${minutes}** Minutes **${seconds}** Seconds`;
    }
    return `**${seconds}** Seconds`;
  }


exports.config = {
  "name": "stats",
  "aliases": ["st", "botstats"],
  "category": "🔑 Bot Owner",
  example: "stats",
  description: "A command for checking bot stats"
}