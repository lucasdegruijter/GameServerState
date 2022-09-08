const { SlashCommandBuilder } = require('discord.js');
const index = require('../index')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showservers')
        .setDescription('Shows all registered servers'),
    async execute(interaction) {
        const servers = await index.Servers.findAll();

        for (const server of servers)
        {
            const title = server.get('title')
            interaction.user.send(title);
        }

        console.log(servers);
    },
};