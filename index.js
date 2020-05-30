const Discord = require('discord.js');
const fs = require("fs")
const { Canvas } = require("canvas-constructor")
const { loadImage } = require("canvas")
const num_ord = require('./num-parse.js');
const config = require("./config.json");
const fetch = require("node-fetch");
const bot = new Discord.Client({
  disableEveryone: true
});

bot.fetch = require("node-superfetch");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection()
bot.prefix = 'w.';
bot.api = require("./util/api.js");
bot.Tuney_Version = '1.0';

//const PBL = require('pbl-api');
///const PBLClient = new PBL.Client({id: '538346180242046978', botToken: 'WSuidw6KyJNuap9bHViklLbSh'});
const Enmap = require('enmap');

bot.db = new Enmap({
  name: "PrefixDB",
  fetchAll: true,
  autoFetch: true
});
bot.sdB = new Enmap({
name: "Welcome_GoodbyeDB",
fetchAll: true,
autoFetch: true
});
bot.adB = new Enmap({
name: "AutoroleDB",
fetchAll: true,
autoFetch: true
});

bot.on("ready", async () => {
    console.log("Bot Online");
     
    await bot.api.load(bot);
    
     setInterval(() => {
      let statuses = [`Need help? Try ${bot.prefix}help`,'Wishing peoples'];
      let ranstatus = Math.floor(Math.random() * statuses.length);
         bot.user.setActivity(statuses[ranstatus], { type: "STREAMING", url: "https://www.twitch.tv/untitleeed" })
     }, 5000);
        /*
    const headers = {
       "Authorization": "WSuidw6KyJNuap9bHViklLbSh",
      "Content-Type": "application/json"
};
var requestOptions = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({"server_count": bot.guilds.size})
};

fetch(`https://pbl.glitch.me/api/post/stats/${bot.user.id}`, requestOptions) 
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  */
//PBLClient.postServerCount(10);
  /*
let chn = bot.channels.get('664670682617217035'); 
PBLClient.getBot(bot.user.id).then(bot => {
console.log(bot)
});
PBLClient.getUser("525322591796199445").then(user => {
console.log(user)
});
*/
}); 

//WSuidw6KyJNuap9bHViklLbSh
fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err)
  
  let jsfile = files.filter(cmd => cmd.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    return console.log("couldn't find command")
  }
  jsfile.forEach((f, i) => {
    let cmd = require(`./commands/${f}`)
    //console.log(`${f} loaded`);
    bot.commands.set(cmd.config.name, cmd)
    cmd.config.aliases.forEach(alias => {
      bot.aliases.set(alias, cmd.config.name)
    })
  })
});

bot.on("message", async message => {
  let key = message.guild.id;
  
  bot.db.ensure(key, {
  prefix: bot.prefix
  });
  
  const prefix = bot.db.get(key, "prefix");
  
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.split(" ");
  let command = message.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length);

  
  try {
    let commandFile = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
    if (commandFile) commandFile.run(bot, message, args)
  } catch (e) {
    return console.log(e.stack)
  } finally {
    console.log(`${message.author.tag} used ${command} command on ${message.guild.name}.`)
  }
})

bot.on("guildMemberAdd", async member => {
  let key = member.guild.id;
  let welcomech = member.guild.channels.get(bot.sdB.get(key, "welcomeChannel"))
  if(!bot.sdB.get(key,"welcomeChannel")) return;
  if (!welcomech) return;
  let mCount = num_ord(member.guild.memberCount);
  let memberpp = await loadImage(member.user.displayAvatarURL);
  const {body: background} = await bot.fetch.get("https://cdn.discordapp.com/attachments/533877198885486603/533877255810842635/800px-Thank-you-2017-background-320.svg.png");
  let welcomecv = new Canvas(800, 350)
    .setColor("#f9f9f9")
    .addBeveledImage(background, 0, 0, 800, 350,true)
    .setColor("#efefef")
    .addCircle(400, 120, 110)
    .addCircularImage(memberpp, 400, 120, 100)
    .setTextAlign("center")
    .setTextFont('27px Impact')
    .addText(`Welcome ${member.user.username} to ${member.guild.name}!`, 400, 265)
    .addText(`You're the ${mCount} member!`, 400, 300)
  let attachment = new Discord.Attachment(welcomecv.toBuffer(), 'welcome-image.png')
  welcomech.send(attachment)
});

bot.on("guildMemberRemove", async member => {
  let key = member.guild.id;
  let leavech = member.guild.channels.get(bot.sdB.get(key,"leaveChannel"))
  if(!bot.sdB.get(key,"leaveChannel")) return;
  if (!leavech) return
    let mCount = num_ord(member.guild.memberCount);
  let memberpp = await loadImage(member.user.displayAvatarURL);
  const {body: background} = await bot.fetch.get("https://cdn.discordapp.com/attachments/533877198885486603/533877255810842635/800px-Thank-you-2017-background-320.svg.png");
  let leavecv = new Canvas(800, 350)
    .setColor("#f9f9f9")
    .addBeveledImage(background, 0, 0, 800, 350,true)
    .setColor("#efefef")
    .addCircle(400, 120, 110)
    .addCircularImage(memberpp, 400, 120, 100)
    .setTextAlign("center")
    .setTextFont('27px Impact')
    .addText(`Goodbye ${member.user.username},`, 400, 290)
    .addText(`This server has now ${member.guild.memberCount} members!`, 400, 330)
  let attachment = new Discord.Attachment(leavecv.toBuffer(), 'goodbye-image.png');
  leavech.send(attachment);
});

bot.on('guildCreate', async guild => {

   let bicon = bot.user.displayAvatarURL;
  let support = new Discord.RichEmbed()
.setThumbnail(bicon)
.setColor("RANDOM")
.setTitle(`Hello! I'm **${bot.user.username}**`)
.addField(`My prefix is **${bot.prefix}**`,`and my help command is **${bot.prefix}help**`)
.setTimestamp()
  guild.owner.send(support);

});
bot.on('guildDelete', async guild => {
let prefix = bot.db.get(guild.id);
if(prefix) {
bot.db.delete(guild)
} else {
return;
}
let welcomer = bot.sdB.get(guild.id);
if(welcomer) {
bot.sdB.delete(guild.id)
} else {
return;
}
let autorole = bot.adB.get(guild.id);
if(autorole) {
bot.adB.delete(guild.id);
} else {
return;
}
  
});

bot.on('guildMemberAdd',async member => {
    let key = member.guild.id;
    let autoRole = await bot.adB.get(key,"autorole");
  
    if(!autoRole) return;
  
     if (!member.guild.roles.get(autoRole)) return;
  
  
  
  
     if (member.user.bot) {
       
         return;
       
         } else {
           
         member.addRole(autoRole);
           
         }

});
bot.login(process.env.TOKEN)
