const Discord = require("discord.js");
const embeds = require("./help.js");
const fs = require("fs").promises;
const path = require("path");
const secret = require("./secret.json");
const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, Collection} = require('discord.js'); //permissions
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
});


const guildId = "864966978975301653";
const eventAlert = "1241355305724547223";
const bossAlert = "1241355369239023628"

const remindersFilePath = path.join(__dirname, "reminders.json");


async function readReminders() {
    try {
        let data = await fs.readFile(remindersFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading reminders file:", error);
        return {};
    }
}

async function writeReminders(reminders) {
    let tempFilePath = remindersFilePath + ".temp";
    try {
        await fs.writeFile(tempFilePath, JSON.stringify(reminders, null, 2), "utf8");
        await fs.rename(tempFilePath, remindersFilePath);
    } catch (error) {
        console.error("Error writing reminders file:", error);
    }
}

async function createReminder(monsterName, killTime, respawnTime) {

    // Convert respawnTime to a Date object (doesn't work without this??)
    if (!(respawnTime instanceof Date)) {
        respawnTime = new Date(respawnTime);
    }

    let reminders = await readReminders();

    reminders[monsterName] = {killTime, respawnTime};

    // Calculate 5 minutes before the respawn time
    let reminderTime = new Date(respawnTime.getTime() - 5 * 60000); // 5 minutes in milliseconds

    // Add new reminder 5 minutes before with an identifier
    reminders[`${monsterName} Reminder`] = {killTime, respawnTime: reminderTime, isReminder: true};

    //  If the monster is God of Darkness or Lord Ferea
    if (monsterName === "God of Darkness" || monsterName === "Ferea") {
        // Add new reminder 1h-2h-3h-4h after with an identifier
        for (let i = 1; i <= 3; i++){
            reminderTime = new Date(respawnTime.getTime() + i * 60 * 60000); // i * hours in milliseconds
            reminders[`${monsterName} Reminder + ${i} hour(s)`] = {killTime, respawnTime: reminderTime, isReminder: true};
        }
    }


    await writeReminders(reminders);
    scheduleReminder(monsterName, respawnTime);
    scheduleReminder(`${monsterName} Reminder`, reminderTime, true);
}

function scheduleReminder(monsterName, respawnTime, isReminder = false) {
    let timeUntilRespawn = new Date(respawnTime) - new Date();
    let respawnMessage = isReminder ? "**Will appear in 5 minutes.**" : "**Has appeared!**";
    let respawnEmbed = new EmbedBuilder()
        .setTitle(`${monsterName}`)
        .setAuthor({
            name: `MUXOnline`,
            iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
        })
        .setDescription(respawnMessage)
        .setColor("#1dff00")
        .setTimestamp();

    setTimeout(async () => {
        try {
            let channel = client.channels.cache.find(channel => channel.id === bossAlert);
            let respawnMessage = isReminder ? "**Will appear in 5 minutes.**" : "**Has appeared!**";
            if (channel) {
                respawnEmbed = new EmbedBuilder()
                    .setTitle(`${monsterName}`)
                    .setAuthor({
                        name: `MUXOnline`,
                        iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
                    })
                    .setDescription(respawnMessage)
                    .setColor("#1dff00")
                    .setTimestamp();
                await channel.send({embeds: [respawnEmbed]});
            } else {
                console.error(`Channel with ID ${bossAlert} not found.`);
            }
        } catch (error) {
            console.error(`Failed to send respawn message for ${monsterName}:`, error);
        }
        await handleExpiredReminders()
    }, timeUntilRespawn);
}

async function handleExpiredReminders() {
    let reminders = await readReminders();
    let currentTimestamp = Date.now();

    for (let [monsterName, reminder] of Object.entries(reminders)) {
        let respawnTime = new Date(reminder.respawnTime).getTime();

        if (respawnTime <= currentTimestamp) {
            delete reminders[monsterName];
            await writeReminders(reminders);
        }
    }
}

function parseRespawnTime(spawnTime) {
    const timeMultipliers = {
        'h': 3600000, // hours to milliseconds
        'm': 60000    // minutes to milliseconds
    };
    let timeUnit = spawnTime.slice(-1);
    let timeAmount = parseFloat(spawnTime.slice(0, -1));

    return timeAmount * timeMultipliers[timeUnit];
}

client.login(secret)

module.exports = {
    readReminders: readReminders,
    writeReminders: writeReminders,
    createReminder: createReminder,
    scheduleReminder: scheduleReminder,
    handleExpiredReminders: handleExpiredReminders,
    parseRespawnTime: parseRespawnTime
};
