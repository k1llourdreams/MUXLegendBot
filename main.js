const Discord = require('discord.js');
const { Client, Events, GatewayIntentBits, managerToFetchingStrategyOptions, ActivityType, EmbedBuilder} = require('discord.js'); //permissions
const Cron = require("croner");
const moment = require("moment");
const embeds = require('./help');

let answers = ['!help', 'Afking Lost Tower 7', 'failed wings attempt #23034']


const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] // perms also?
});

let prefix = "!"

function schedule(channel) {
    const bloodCastle = Cron("30 * * * *", {name: "blood castle"}, function () {      // At 30 minutes past the hour
        channel.send(`Blood Castle has begun.`)
    });
    const devilSquare = Cron("0 0-23/2 * * *", {name: "devil square"}, function () { // Every 2 hours, starting from 12AM
        channel.send(`Devil Square has begun.`)
    });
    const chaosCastle = Cron("0 1-23/2 * * *", {name: "chaos castle"}, function () { // Every 2 hours, starting from 1AM
        channel.send(`Chaos Castle has begun.`)
    });
    const redDragon = Cron("10 1-23/2 * * *", {name: "red dragon"}, function () {   //  Every 2 hours, starting from 1:10AM
        channel.send(`Red Dragon has appeared.`)
    });
    const goldenDragon = Cron("12 1-23/2 * * *", {name: "golden dragon"}, function () {    // Every 2 hours, starting from 1:12AM
        channel.send(`Golden Dragons have appeared.`)
    });
    const dungeonsUndine = Cron("50 0-23/4 * * *", {name: "dungeons undine"}, function () { // Every 4 hours, starting from 12:50AM
        channel.send(`Dungeon's Undine has appeared.`)
    });
    const medusa = Cron("30 17 * * *", {name: "medusa"}, function () {     // At 5:30PM every day
        channel.send(`Medusa has appeared`)
    });
    const lorenDeep = Cron("0 18 * * *", {name: "loren deep"}, function () { // At 6PM every day
        channel.send(`The Loren Deep Event has begun.`)
    });
    const strangeRabbits = Cron("15 18 * * *", {name: "strange rabbits"}, function () { //  At 6:15PM every day
        channel.send(`Strange Rabbits have appeared.`)
    });
    const whiteRooster = Cron("30 18 * * *", {name: "white rooster"}, function () { //  At 6:30PM every day
        channel.send(`The White Rooster has appeared.`)
    });
    const bloodyOrc = Cron("35 18 * * *", {name: "bloody orc"}, function () { //  At 6:30PM every day
        channel.send(`The Bloody Orc has appeared. Most likely locations are\n125,75\n180,110\n155,55`)
    });
    const asteroth = Cron("45 18 * * 1,2,5-7", {name: "asteroth"}, function () { //  At 6:45PM every day
        channel.send(`The Asteroth Guardian event has begun.`)
    });
    const crywolf = Cron("45 18 * * 3", {name: "crywolf"}, function () { //  At 6:45PM every Wednesday
        channel.send(`Crywolf event has begun.`)
    });
    const arcaWar = Cron("45 18 * * 4", {name: "arca war"}, function () { //  At 6:45PM every Thursday
        channel.send(`The Arca War event has begun.`)
    });
    const castleSiege = Cron("30 18 * * 7", {name: "castle siege"}, function () { //  At 6:30PM every Sunday
        channel.send(`Castle Siege has begun.`)
    });
    const bossBattleTogether = Cron("15 18 * * *", {name: "boss battle together"}, function () { //  At 6:15PM every day
        channel.send(`Boss Battle Together has begun.`)
    });

    const bloodCastle5 = Cron("25 * * * *", {name: "blood castle5"}, function () {      // At 30 minutes past the hour
        channel.send(`Blood Castle is starting in 5 minutes.`)
    });
    const devilSquare5 = Cron("55 23,1-21/2 * * *", {name: "devil square5"}, function () { // Every 2 hours, starting from 12AM
        channel.send(`Devil Square is starting in 5 minutes.`)
    });
    const chaosCastle5 = Cron("55 0-23/2 * * *", {name: "chaos castle5"}, function () { // Every 2 hours, starting from 1AM
        channel.send(`Chaos Castle is starting in 5 minutes.`)
    });
    const redDragon5 = Cron("5 1-23/2 * * *", {name: "red dragon5"}, function () {   //  Every 2 hours, starting from 1:10AM
        channel.send(`Red Dragon is spawning in 5 minutes.`)
    });
    const goldenDragon5 = Cron("7 1-23/2 * * *", {name: "golden dragon5"}, function () {    // Every 2 hours, starting from 1:12AM
        channel.send(`Golden Dragons are spawning in 5 minutes.`)
    });
    const dungeonsUndine15 = Cron("35 0-23/4 * * *", {name: "dungeons undine15"}, function () { // Every 4 hours, starting from 12:50AM
        channel.send(`Dungeon's Undine is spawning in 15 minutes.`)
    });
    const dungeonsUndine5 = Cron("45 0-23/4 * * *", {name: "dungeons undine5"}, function () { // Every 4 hours, starting from 12:50AM
        channel.send(`Dungeon's Undine is spawning in 5 minutes.`)
    });
    const medusa10 = Cron("20 17 * * *", {name: "medusa10"}, function () {     // At 5:30PM every day
        channel.send(`Medusa is spawning in 10 minutes`)
    });
    const medusa5 = Cron("25 17 * * *", {name: "medusa5"}, function () {     // At 5:30PM every day
        channel.send(`Medusa is spawning in 5 minutes`)
    });
    const lorenDeep5 = Cron("55 17 * * *", {name: "loren deep5"}, function () { // At 6PM every day
        channel.send(`The Loren Deep Event is starting in 5 minutes.`)
    });
    const strangeRabbits10 = Cron("5 18 * * *", {name: "strange rabbits10"}, function () { //  At 6:15PM every day
        channel.send(`Strange Rabbits are spawning in 10 minutes.`)
    });
    const strangeRabbits5 = Cron("10 18 * * *", {name: "strange rabbits5"}, function () { //  At 6:15PM every day
        channel.send(`Strange Rabbits are spawning in 5 minutes.`)
    });
    const whiteRooster5 = Cron("25 18 * * *", {name: "white rooster5"}, function () { //  At 6:30PM every day
        channel.send(`The White Rooster is spawning in 5 minutes.`)
    });
    const bloodyOrc5 = Cron("30 18 * * *", {name: "bloody orc5"}, function () { //  At 6:30PM every day
        channel.send(`The Bloody Orc is spawning in 5 minutes. Most likely locations are\n125,75\n180,110\n155,55`)
    });
    const asteroth5 = Cron("40 18 * * 1,2,5-7", {name: "asteroth5"}, function () { //  At 6:45PM every day
        channel.send(`The Asteroth Guardian event is starting in 5 minutes.`)
    });
    const crywolf5 = Cron("40 18 * * 3", {name: "crywolf5"}, function () { //  At 6:45PM every Wednesday
        channel.send(`Crywolf event is starting in 5 minutes.`)
    });
    const arcaWar5 = Cron("40 18 * * 4", {name: "arca war5"}, function () { //  At 6:45PM every Thursday
        channel.send(`The Arca War event is starting in 5 minutes.`)
    });
    const castleSiege5 = Cron("25 18 * * 7", {name: "castle siege5"}, function () { //  At 6:30PM every Sunday
        channel.send(`Castle Siege is starting in 5 minutes.`)
    });
    const bossBattleTogether5 = Cron("10 18 * * *", {name: "boss battle together5"}, function () { //  At 6:15PM every day
        channel.send(`Boss Battle Together is starting in 5 minutes.`)
    });


    client.on('messageCreate', async message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        let channel = client.channels.cache.find(channel => channel.id === '1228766904085119047');

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase();


        if (command === "help") {
            try {
                if (!args[0]) {                                     // if no command is given, send help embed
                    await message.channel.send(`You didnt enter any arguments.`)
                    await message.channel.send({embeds: [embeds.commandEmbed(command)]})
                } else if (args[0] === "commands") {                 //  if the argument is "commands", send every command embed
                    for (let i = 0; i <= 3; i++) {
                        await message.channel.send({embeds: [embeds.returnEmbeds()[i]]})
                    }
                } else {                               //if command is given, send command embed
                    await message.channel.send({embeds: [embeds.commandEmbed(args[0])]})
                }
            } catch (error)  {
                return error
            }
        }

        if (command === "next") {
            let findJob = Cron.scheduledJobs.find(j => j.name === `${args.join(" ")}`)

            if (!args[0]) {
                await message.channel.send("Please provide an event after '!next'.");
            } else {
                if (findJob === undefined) {
                    await message.channel.send(`Event is not in the database.`);
                    return
                }
                let hours = Math.floor(findJob.msToNext() / (1000 * 60 * 60));
                let minutes = Math.floor((findJob.msToNext() % (1000 * 60 * 60)) / (1000 * 60));
                if (hours === 0) {
                    await message.channel.send(`The next ${args.join(" ").replace(/\b\w/g, l => l.toUpperCase())} is in ${minutes} minutes`);
                } else if (hours !== 0 && minutes === 0) {
                    if (hours === 1 && minutes === 0) {
                        await message.channel.send(`The next ${args.join(" ").replace(/\b\w/g, l => l.toUpperCase())} is in ${hours} hour`);
                    } else await message.channel.send(`The next ${args.join(" ").replace(/\b\w/g, l => l.toUpperCase())} is in ${hours} hours`);
                } else if (minutes === 0) {
                    await message.channel.send(`The next ${args.join(" ").replace(/\b\w/g, l => l.toUpperCase())} is now`);
                } else
                    await message.channel.send(`The next ${args.join(" ").replace(/\b\w/g, l => l.toUpperCase())} is in ${hours} hours and ${minutes} minutes`);
            }
        }

        if (command === "soon") {
            let tempJob = null;
            let minMsToNext = Infinity; // Initialize to a large value

            for (let jobName = 0; jobName <= 15; jobName++) {
                let job = Cron.scheduledJobs[jobName];
                let msToNext = job.msToNext();

                if (msToNext < minMsToNext) {
                    minMsToNext = msToNext;
                    tempJob = job;
                }
            }

            let hours = Math.floor(minMsToNext / (1000 * 60 * 60));
            let minutes = Math.floor((minMsToNext % (1000 * 60 * 60)) / (1000 * 60));
            if (hours === 0) {
                await message.channel.send(`The next event is ${tempJob.name.replace(/\b\w/g, l => l.toUpperCase())} in ${minutes} minutes`);
            } else if (minutes === 0) {
                await message.channel.send(`The next event is in a few seconds`);
            } else
            await message.channel.send(`The next event is in ${hours} hours and ${minutes} minutes`);
        }

        if (command === "events") {
            const events = new EmbedBuilder()
                .setColor("#6584F6")
                .setTitle('List of events currently in the database')
                .setAuthor({
                    name: `MUXOnline`,
                    iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
                })
                .setDescription(`Blood Castle\nDevil Square\nChaos Castle\nRed Dragon\nGolden Dragon\nDungeons Undine\nMedusa\nLoren Deep\nStrange Rabbits\nWhite Rooster\nBloody Orc\nAsteroth\nBoss Battle Together\nCrywolf\nArca War\nCastle Siege`)
                .setTimestamp()

            message.channel.send({ embeds: [events] });
        }
    })
}


client.on("ready", async () => {
    let channel = client.channels.cache.find(channel => channel.id === '1228766904085119047');
    await schedule(channel)
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(async () => {
        let randomAnswers = answers[Math.floor(Math.random() * answers.length)]
        client.user.setActivity({name: randomAnswers, type: 0})
    },  30 * 1000)

});






client.login('MTIyODczMTIwNTM4MjU3NDEzMQ.Gb4xEA.n29g1tN_bQSc8abPDpxZda6JbghL3sR_EPrrbA')