const { exec } = require("child_process");
const { owners_id } = require("../config.json");

exports.run = async (bot, msg, args) => {
  var message = msg
  owners_id.forEach(async function(owner) {
    if(message.author.id !== owner) return;
    exec(args.slice(1).join(" "), async (err, stdout, stderr) => { 
        if(!stderr.length){
            return message.channel.send(stdout, { code: 'bash'});
        }
      
        return message.channel.send(stderr, { code: 'bash'});
    });
  })
  return
}

exports.config = {
  "name": "exec",
  "aliases": ["ex", "$"],
  "category": "🔑 Bot Owner",
  example: "exec uptime -p",
  description: "A command for managing bot process"
}