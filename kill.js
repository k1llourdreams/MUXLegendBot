const Discord = require("discord.js");
const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, Collection} = require('discord.js'); //permissions
const info = require("./info2.json");
const fs = require('node:fs');
const path = require('node:path');
const {parseRespawnTime, readReminders , writeReminders, createReminder, scheduleReminder, handleExpiredReminders} = require("./reminder-functions")
const secret = require("./secret.json");

const guildId = "864966978975301653";
const channelId = "1230562870480076901";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('Name of the monster')
        .addStringOption(option =>
            option.setName('monster')
                .setDescription('Name of the monster')
                .setAutocomplete(true)
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('minutes-ago')
                .setDescription('How many minutes ago it was killed')
                .setRequired(true)
        ),

    async autocomplete(interaction) {
        let choices = [];
        const focusedValue = interaction.options.getFocused(false).toLowerCase(); // Convert input to lower case
        let first = focusedValue.charAt();

        if (focusedValue.length === 0) {
            for (let n = 0; n < info.length; n++) {
                let picked = info[n].Name;   //assign picked to item name at position n in the items list found
                choices.push(picked.toString());    //push each name one by one into the choices array
            }

            const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedValue)); // Compare in lower case
            await interaction.respond(
                filtered.map(choice => ({name: choice, value: choice})).slice(0, 25)
            ).catch(() => {
            });
        } else {
            for (let n = 0; n < info.length; n++) {
                if (info[n].Name.charAt().toLowerCase() === first) {   // Check for enemy starting with the letter provided
                    let picked = info[n].Name;   //assign picked to item name at position n in the items list found
                    choices.push(picked.toString());    //push each name one by one into the choices array
                } else {
                    //Enemy name does not match, keep looking
                }
            }

            const filtered = choices.filter(choice => choice.toLowerCase().startsWith(focusedValue)); // Compare in lower case
            await interaction.respond(
                filtered.map(choice => ({name: choice, value: choice})).slice(0, 25)
            ).catch(() => {
            });
        }
    },
    async execute(interaction) {
        const {commandName, options, member} = interaction;

        let monsterName = options.getString('monster');
        let minutesAgo = options.getInteger('minutes-ago');
        let theMonster = info.filter(mons => mons.Name === monsterName);
        theMonster = theMonster[0]

        if (theMonster) {

            let respawnTime = parseRespawnTime(theMonster.Spawn);
            let respawnInMs = respawnTime - (minutesAgo * 60 * 1000);

            let killTime = new Date(Date.now() - (minutesAgo * 60 * 1000));
            let respawnTimeDate = new Date(Date.now() + respawnInMs);

            await createReminder(monsterName, killTime.toISOString(), respawnTimeDate.toISOString());
            // await scheduleReminder(monsterName, respawnTime)

            let killTimeUnix = Math.floor(killTime.getTime() / 1000);
            let respawnTimeUnix = Math.floor(respawnTimeDate.getTime() / 1000);

            let scheduleEmbed = new EmbedBuilder()
                .setTitle(`${monsterName}`)
                .setAuthor({
                    name: `MUXOnline`,
                    iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
                })
                .addFields(
                    {
                        name: "Killed",
                        value: `<t:${killTimeUnix}:F>`,
                        inline: false
                    },
                    {
                        name: "Appear:",
                        value: `<t:${respawnTimeUnix}:F>`,
                        inline: false
                    },
                )
                .setColor('#b70000')
                .setFooter({
                    text: `Entered by ${member.nickname || member.user.username}`,
                })
                .setTimestamp();

            await interaction.reply({embeds: [scheduleEmbed]});

        } else {
            await interaction.reply('Monster not found in the database.');
        }
    },
};
