const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addserver')
        .setDescription("Add a new server to monitor\n Usage:  /addserver game type ip_addr port"),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
