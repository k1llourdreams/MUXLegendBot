const {Client, Events, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, Collection} = require('discord.js'); //permissions
const {accounts} = require("./connect.js")

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
});


module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription("Remove your main account/alts from the database.")
        .addSubcommand(subcommand =>
            subcommand
                .setName('main')
                .setDescription('Remove your main account and all alts associated with it')
                .addStringOption(option =>
                    option.setName('main')
                        .setDescription('Enter your main account username')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('alt')
                .setDescription('Remove an alt from your main account')
                .addStringOption(option =>
                    option.setName('main')
                        .setDescription('Enter your main account username')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('alt')
                        .setDescription('Enter your alt account username')
                        .setRequired(true))),

    async execute(interaction) {
        // const {commandName, options, member} = interaction;

        let main = interaction.options.getString('main');
        let alt = interaction.options.getString('alt');

        const subcommand = interaction.options.getSubcommand()

        try {
            let mainExists = await accounts.findOne({where: {main: main}});

            switch (subcommand) {
                case "main":
                    //  Check if main exists
                    mainExists = await accounts.findOne({where: {main: main}});
                    if (!mainExists) return interaction.reply(`Main account \`${main}\` doesnt exist.`);

                    //  If pass checks, remove main
                    mainExists = await accounts.destroy({where: {main: main}});
                    return interaction.reply(`Main account \`${main}\` and all associated alts have been removed.`);

                case "alt":
                    //  Check if main exists
                    mainExists = await accounts.findOne({where: {main: main}});
                    if (!mainExists) return interaction.reply(`Main account \`${main}\` doesn't exist.`);

                    //  Check if alt exists and which slot it exists in
                    let altExists = false;
                    let slot = "";
                    for (let i = 1; i <= 5; i++) {
                        if (mainExists.dataValues[`alt${i}`] === alt) {
                            slot = `alt${i}`;
                            altExists = true;
                            // Exit the loop once there is a match of an alt name.
                            break;
                        }
                    }
                    if (!altExists) return interaction.reply(`Alt account \`${alt}\` doesn't exist under \`${main}\` or doesn't exist at all.`);

                    //  If pass all checks, remove alt
                    await mainExists.update({
                        [slot]: "0"
                    })
                    interaction.reply(`Removed alt account \`${alt}\` from \`${main}\`.`);
                    break;
            }
        } catch (error) {
            await interaction.reply("An error occurred while executing your command.");
        }
    }
};

