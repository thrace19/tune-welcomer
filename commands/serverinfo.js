const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let serverr; 
    if(message.guild.region === 'hongkong') {
    serverr = 'Hong Kong :flag_hk:'
    } 
    if(message.guild.region === 'brazil') 
    serverr = 'Brazil :flag_br:';
    if(message.guild.region === 'japan' ) {
    serverr = ':flag_jp:Japan'
    }
    if(message.guild.region === 'eu-central') {
    serverr = ':flag_eu:Central Europe'
    }
    if(message.guild.region === 'eu-west') {
    serverr = ':flag_eu:Western Europe';
    }
    if(message.guild.region === 'singapore') {
    serverr = ':flag_sg:Singapore'
    }
    if(message.guild.region === 'russia') {
    serverr = ':flag_ru:Russia'
    } 
    if(message.guild.region === 'sydney') {
    serverr = ':flag_au:Sydney'
    }
    if(message.guild.region === 'southafrica') {
    serverr = ':flag_za:South Africa'
    }
    if(message.guild.region === 'us-central') {
    serverr= ':flag_us:US Central'
    }
    if(message.guild.region === 'us-east') {
    serverr = ':flag_us:US East'
    }
    if(message.guild.region === 'us-south') {
    serverr = ':flag_us:US South'
    }
    if(message.guild.region === 'us-west') {
    serverr = ':flag_us:US West'
    }
    let online = message.guild.members.filter(member => member.user.presence.status === 'online');
    let idle = message.guild.members.filter(member => member.user.presence.status === 'idle');
    let dnd = message.guild.members.filter(member => member.user.presence.status === 'dnd');
    let offline = message.guild.members.filter(member => member.user.presence.status === 'offline');
    let emojic = message.guild.emojis.size
    let channels = message.guild.channels.size;
    let textChannels = message.guild.channels.filter(m => m.type == "text").size;
    let voiceChannels = message.guild.channels.filter(i => i.type == "voice").size;
    let day = message.guild.createdAt.getDate()
    let month = 1 + message.guild.createdAt.getMonth()
    let year = message.guild.createdAt.getFullYear()
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
   .setTitle("Server Info")
   .setFooter(`Server Created • ${day}/${month}/${year}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .addField("Name", message.guild.name, true)
   .addField("ID", message.guild.id, true)
   .addField("Owner", `<@${message.guild.owner.user.id}>`, true)
   .addField("Region", serverr, true)
   .addField("Members", `**${message.guild.memberCount}** Total Users\n**${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}** Humans\n**${message.guild.members.filter(m => m.user.bot).size}** Bots`, true)
   .addField(`Channels(${message.guild.channels.size})`, `**${textChannels}** Text\n**${voiceChannels}** Voice`, true)
   .addField(`Role(s)`, message.guild.roles.size, true)
   .addField(`Emoji(s)`, message.guild.emojis.size, true)
   .addField("Users Status", `**${online.size}** Online\n**${idle.size}** Idle\n**${dnd.size}** Do not disturb\n**${offline.size}** Offline`, true)
  //.addField("Server Roles", message.guild.roles.map(roles => roles).join(' '), true)
  //.addField("Your Roles", message.member.roles.map(roles => roles).join(' > '),true)
   
   message.channel.send(serverembed);
    }
exports.config = {
  "name": "serverinfo",
  "aliases": ["si"],
  "category": "General",
    example: "No Example",
   description: "No Description"
}