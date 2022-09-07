const { SlashCommandBuilder } = require('discord.js');
const index = require('../index')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showservers')
        .setDescription('Shows all registered servers'),
    async execute(interaction) {
        const servers = await index.Servers.findAll();

        servers.forEach(displayServer)

        function displayServer(server)
        {
            interaction.user.send('test');
        }

        console.log(servers);
    },
};