const {EmbedBuilder} = require('discord.js')
const info = require("./info.json")

const commands= {

    'help': {
        desc: 'Outputs the usage for commands.',
        usage: '\n!help [command]\n!help commands',
        example: '\n!help soon\n!help commands'
    },
    'next': {
        desc: 'Outputs the time until the event that will happen',
        usage: '\n!next [event]',
        example: '\n!next strange rabbits\n!next blood castle'
    },
    'soon': {
        desc: 'Outputs the next event that is going to happen',
        usage: '!soon',
        example: ''
    },
    'events': {
        desc: 'Lists the events currently in the database',
        usage: '!events',
        example: ''
    },
    'info': {
        desc: 'Lists information about a special monsters/bosses',
        usage: '\n!info [monster]\n!info list',
        example: '\n!info Gold Rabbit\n!info list'
    }
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


// Function to generate embed for information about special monsters and bosses
function getInfo(commandName) {
    const commandInfo = info[commandName];

    // Check if command exists in the info
    if (!commandInfo) return "Monster not found"
    // Construct embed for the command
    let infoEmbed = new EmbedBuilder()
        .setColor('#6584F6')
        .setTitle(commandName)
        .setAuthor({
            name: `MUXOnline`,
            iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
        })
        .addFields(
            { name: 'Location', value: commandInfo.Location },
            { name: 'Spawn', value: commandInfo.Spawn },
            { name: 'Drop', value: commandInfo.Drop }
        )
        .setTimestamp();
        if (commandInfo.SpecialDrop) {
            infoEmbed.addFields({ name: 'Special Drops', value: commandInfo.SpecialDrop },)
        }
    return infoEmbed
}

function monsterEmbed() {
    let embedMessages = ""
    for (let i of Object.keys(info)) {
        embedMessages += i + "\n"
    }
    let msg = new EmbedBuilder()
        .setColor('#6584F6')
        .setTitle(`List of All Special Monsters and Bosses`)
        .setAuthor({
            name: `MUXOnline`,
            iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
        })
        .setDescription(embedMessages)
        .setTimestamp()
    return msg;
}




module.exports = { commandEmbed:commandEmbed, returnEmbeds:returnEmbeds, getInfo:getInfo, monsterEmbed:monsterEmbed}
