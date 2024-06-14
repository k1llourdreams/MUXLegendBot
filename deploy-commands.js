const { REST, Routes } = require('discord.js');
const secret = require("./secret.json")

const filePath = ['./kill.js', './schedule.js', './add.js', './remove.js', './who.js'];

const commands = []

for (const path of filePath){
    const command = require(path);
    commands.push(command.data.toJSON());
}

const clientID = "1228731205382574131";
const guildID = "864966978975301653";


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(secret);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();