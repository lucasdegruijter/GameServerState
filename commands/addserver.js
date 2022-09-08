const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
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
                .setRequired(true))
        .addStringOption(option =>
            option.setName('game')
                .setDescription('Game name')
                .setRequired(true)),

    async execute(interaction) {
        const serverName = interaction.options.getString('name');
        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            const server = await index.Servers.create({
                title: interaction.options.getString('title'),
                game: interaction.options.getString('game'),
            });
            makeServerEmbed(server)
            return interaction.reply(`Server added, making embed message!`);
        }
        catch (error) {
            console.log(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('That server already.');
            }

            return interaction.reply('Something went wrong with adding a server.');
        }

        // Make a new embed message for the server
        // at the top of your file

        function makeServerEmbed ()
        {
            // inside a command, event listener, etc.
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Some title')
                .setURL('https://discord.js.org/')
                .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
                .setDescription('Some description here')
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .addFields(
                    { name: 'Regular field title', value: 'Some value here' },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Inline field title', value: 'Some value here', inline: true },
                    { name: 'Inline field title', value: 'Some value here', inline: true },
                )
                .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
                .setImage('https://i.imgur.com/AfFp7pu.png')
                .setTimestamp()
                .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

            channel.send({ embeds: [exampleEmbed] });
        }
    },
};
