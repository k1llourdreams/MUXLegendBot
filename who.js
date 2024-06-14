const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, Collection} = require('discord.js');
const {accounts} = require("./connect"); //permissions

module.exports = {
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription("Get an account from a username")
        .addStringOption(option =>
            option
                .setName('username')
                .setDescription('Enter a username')
                .setRequired(true)
        ),


    async execute(interaction) {
        const {commandName, options, member} = interaction;
        try {
            let username = options.getString('username').toLowerCase();

            // Fetch all usernames and format into object/map?
            const nameCheckList = await accounts.findAll();
            const formattedAccounts = nameCheckList.map(account => account.dataValues);

            //  Check if username entered is a main or alt and pull up an object of the account
            let findMain = formattedAccounts.find(account => account.main.toLowerCase() === username)
            let findAlt = formattedAccounts.find(account => Object.keys(account).some(key => key.startsWith('alt') && account[key].toLowerCase() === username));

            if (!findMain && !findAlt) {
                return await interaction.reply("Couldn't find username.");
            }
            const account = findMain || findAlt;

            //  Push alt names into a string with line breaks for use in embed
            let alts = "";
            for (let i = 1; i <= 5; i++) {
                if (account[`alt${i}`] && account[`alt${i}`] !== "0") {
                    alts += `${account[`alt${i}`]}\n`;
                }
            }
            let accountEmbed = new EmbedBuilder()
                .setAuthor({
                    name: `MUXOnline`,
                    iconURL: "https://cdn.discordapp.com/attachments/1230562870480076901/1230859690435416144/images.png?ex=6634da6a&is=6622656a&hm=df50b602cd9769e5d4e9735c7d7865f5d6903cc64bcc2ed9fbf6f1de292fdd88&"
                })
                .setTitle(account.main)
                .setDescription(alts)
                .setColor('#005b80')
                .setFooter({
                    text: `Entered by ${member.nickname || member.user.username}`,
                })
                .setTimestamp();

            await interaction.reply({embeds: [accountEmbed]});
        } catch (error) {
            await interaction.reply("An error occurred while executing your command.");
        }
    },
};