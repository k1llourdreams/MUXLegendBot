const {EmbedBuilder} = require('discord.js')

const commands= {

    'help': {
        desc: 'Sends the usage for commands.',
        usage: '\n!help [command]\n!help commands',
        example: '\n!help soon\n!help commands'
    },
    'next': {
        desc: 'Tells you in how long the event will happen',
        usage: '\n!next [event]',
        example: '\n!next strange rabbits\n!next blood castle'
    },
    'soon': {
        desc: 'Responds with the next event that is going to happen',
        usage: '!soon',
        example: ''
    },
    'events': {
        desc: 'Lists the events currently in the database',
        usage: '!events',
        example: ''
    },
}



let commandOMap = Object.keys(commands).map(function (key) {
    let ret = {};
    ret[key] = commands[key];
    return ret;
});


function returnEmbeds() {
    let embedMessages = []
    for (const commandObj of commandOMap) {
        let command = Object.keys(commandObj)[0]
        let data = Object.values(commandObj)[0]

        let msg = new EmbedBuilder()
            .setColor('#6584F6')
            .setTitle(`**Command:** ${command}`)
            .setAuthor({
                name: `MUXOnline`,
                iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
            })
            .setTimestamp()
        if (data.example === '') {
            msg.setDescription(`**Description:** ${data.desc}\n**Usage:** ${data.usage}`)
        }  else {
            msg.setDescription(`**Description:** ${data.desc}\n**Usage:** ${data.usage}\n**Example:** ${data.example}`)
        }
        embedMessages.push(msg)
    }
    return embedMessages
}


function commandEmbed(command) {
    if (Object.keys(commands).indexOf(command) === -1) return "You didn't enter a valid command!"
    let embed = new EmbedBuilder()
        .setColor("#6584F6")
        .setTitle(`**Command:** ${command}`)
        .setAuthor({
            name: `MUXOnline`,
            iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
        })
        .setDescription(`**Description:** ${commands[command].desc}\n**Usage:** ${commands[command].usage} \n**Example:** ${commands[command].example}`)
        .setTimestamp()
    if (commands[command].example === '') {
        embed.setDescription(`**Description:** ${commands[command].desc}\n**Usage:** ${commands[command].usage}`)
    } else {
        embed.setDescription(`**Description:** ${commands[command].desc}\n**Usage:** ${commands[command].usage}\n**Example:** ${commands[command].example}`)
    }
    return embed
}




module.exports = {commandEmbed:commandEmbed, returnEmbeds:returnEmbeds}
