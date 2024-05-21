const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, Collection} = require('discord.js'); //permissions
const {
    readReminders
} = require("./reminder-functions")


module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Name of the monster')
        .addIntegerOption(option =>
            option
                .setName('hours')
                .setDescription('How many hours forward to check')
                .setRequired(false)
        ),


    async execute(interaction) {
        const {commandName, options, member} = interaction;
        try {
            let reminders = await readReminders();
            let reminderEntries = Object.entries(reminders);

            let respawnTimestamp = Math.floor(new Date(reminderEntries[0][1].respawnTime).getTime() / 1000);


            if (reminderEntries.length === 0) {
                await interaction.reply("There are no scheduled reminders.");
                return;
            }

            let reminderEmbed = new EmbedBuilder()
                .setTitle(`Scheduled Reminders:`)
                .setAuthor({
                    name: `MUXOnline`,
                    iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
                })
                .setColor('#005b80')
                .setFooter({
                    text: `Entered by ${member.nickname || member.user.username}`,
                })
                .setTimestamp();

            if (options.getInteger('hours') === null) {

                reminderEntries.forEach(([monsterName, reminder]) => {
                    if (!reminder.isReminder) {
                        let respawnTimestamp = Math.floor(new Date(reminder.respawnTime).getTime() / 1000);
                        reminderEmbed.addFields({
                            name: monsterName,
                            value: `<t:${respawnTimestamp}:R> on <t:${respawnTimestamp}:d> <t:${respawnTimestamp}:t>`
                        });
                    }
                });
                await interaction.reply({embeds: [reminderEmbed]});

            } else
                reminderEntries.forEach(([monsterName, reminder]) => {
                    let respawnTimestamp = Math.floor(new Date(reminder.respawnTime).getTime() / 1000);
                    if ( !reminder.isReminder && (respawnTimestamp <= (Math.floor(Date.now() / 1000) + (3600 * options.getInteger('hours')))) ) {
                        reminderEmbed.addFields({
                            name: monsterName,
                            value: `<t:${respawnTimestamp}:R> on <t:${respawnTimestamp}:d> <t:${respawnTimestamp}:t>`
                        });
                    }
                });

            await interaction.reply({embeds: [reminderEmbed]});

        } catch (error) {
            await interaction.reply("An error occurred while retrieving reminders.");
        }
    },
};