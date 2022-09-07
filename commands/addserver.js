const { SlashCommandBuilder } = require('discord.js');
const index = require('../index')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addserver')
        .setDescription("Add a new server to monitor\n Usage:  /addserver game type ip_addr port")
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of the server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('game')
                .setDescription('Game name')
                .setRequired(true)),
    async execute(interaction) {
        const serverName = interaction.options.getString('name');
        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            const tag = await index.Servers.create({
                title: interaction.options.getString('title'),
                game: interaction.options.getString('game'),
            });

            return interaction.reply(`Tag ${tag.name} added.`);
        }
        catch (error) {
            console.log(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('That tag already exists.');
            }

            return interaction.reply('Something went wrong with adding a tag.');
        }
    },
};
