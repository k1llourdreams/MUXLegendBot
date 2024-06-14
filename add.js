const Discord = require("discord.js");
const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, Collection} = require('discord.js'); //permissions
const secret = require("./secret.json");
const {accounts} = require("./connect.js")
const guildId = "864966978975301653";
const channelId = "1230562870480076901";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
});


module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription("Add your main account/alts to the database.")
        .addSubcommand(subcommand =>
            subcommand
                .setName('main')
                .setDescription('Add your main account')
                .addStringOption(option =>
                    option.setName('main')
                        .setDescription('Enter your main account username')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('alt')
                .setDescription('Add your main account')
                .addStringOption(option =>
                    option.setName('main')
                        .setDescription('Enter your main account username')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('alt')
                        .setDescription('Enter your alt account username')
                        .setRequired(true))),

    async execute(interaction) {

        let main = interaction.options.getString('main');
        let alt = interaction.options.getString('alt');

        const subcommand = interaction.options.getSubcommand()

        try {
            let mainExists = await accounts.findOne({where: {main: main}});

            switch (subcommand) {
                case "main":
                    if (main.length > 10 || main.length < 4) return interaction.reply(`Username has to be between 4-10 characters.`)
                    //  Check if main already exists as a main account
                    mainExists = await accounts.findOne({where: {main: main}});
                    if (mainExists) return interaction.reply(`Main account \`${main}\` already exists.`);

                    //  Check if main exists as an alt account (and what main it exists in)
                    let findAll = await accounts.findAll()
                    let altMain = findAll.map(account => account.dataValues).find(account => Object.keys(account).some(key => key.startsWith('alt') && account[key].toLowerCase() === main.toLowerCase()))
                    if (altMain) {
                        return interaction.reply(`\`${main}\` is already listed as an alt account under main account \`${altMain.main}\`.`);
                    }

                    // If pass checks, create main
                    mainExists = await accounts.create({
                        main: main
                    });
                    return interaction.reply(`Main account \`${main}\` added.`);

                case "alt":
                    if (alt.length > 10 || alt.length < 4) return interaction.reply(`Username has to be between 4-10 characters.`)
                    //  Check if main exists
                    mainExists = await accounts.findOne({where: {main: main}});
                    if (!mainExists) return interaction.reply(`Main account \`${main}\` doesn't exist.`);

                    //  Check if there is slot under main.
                    let slotFound = false;
                    let slot = "";

                    for (let i = 1; i <= 5; i++) {
                        if (mainExists.dataValues[`alt${i}`] === "0") {
                            slot = `alt${i}`;
                            slotFound = true;
                            // Exit the loop once the first available slot is found
                            break;
                        }
                    }

                    if (!slotFound) return interaction.reply(`No available alt slots for main account \`${main}\`.`);

                    // Fetch all usernames and format into object/map?
                    const nameCheckList = await accounts.findAll();
                    const formattedAccounts = nameCheckList.map(account => account.dataValues);

                    //  Check if alt is already a main account
                    if (formattedAccounts.find(account => account.main.toLowerCase() === alt)) return interaction.reply(`\`${alt}\` already exist as a main account.`);

                    // Check if alt name already exists as an alt in another main account
                    let altAccount = formattedAccounts.find(account => Object.keys(account).some(key => key.startsWith('alt') && account[key].toLowerCase() === alt.toLowerCase()));
                    let findMain = altAccount ? altAccount.main : undefined;

                    if (findMain === main) {
                        return interaction.reply(`You have already added \`${alt}\` to your main account.`);
                    } else if (findMain !== undefined) {
                        return interaction.reply(`That username is already taken by one of \`${findMain}\`'s alts.`);
                    }


                    //  If pass all checks, add alt
                    await mainExists.update({
                        [slot]: alt
                    })

                    interaction.reply(`Added alt account \`${alt}\` to \`${main}\`.`);
                    break;
            }
        } catch (error) {
            await interaction.reply("An error occurred while executing your command.");
        }
    }
};

