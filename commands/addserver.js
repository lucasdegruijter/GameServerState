const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const index = require('../index')
var ms = require('minestat');

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
            option.setName('address')
                .setDescription('Ip adress')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('port')
                .setDescription('Game server port')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel where the embedded message wil be sent')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('image_url')
                .setDescription('Image to display')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('direct_join')
                .setDescription('Direct join url')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Hex color for the message, For example: 0x0099FF')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('country')
                .setDescription('Country the game server is hosted at')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('public_address')
                .setDescription('Public ip adress to access the game server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('password')
                .setDescription('Password for the game server, leave empty for no password')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('max_players')
                .setDescription('Maximum capacity of the game server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('query_type')
                .setDescription('Use the help command for more info on the correct query type.')
                .setRequired(true)
                .addChoices(
                    { name: 'Minecraft', value: 'minecraft_query' },
                    { name: 'Gamedig', value: 'gamedig_query' },
                    { name: 'none', value: 'none_query' },
                )),

    async execute(interaction) {
        try {
            // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
            const server = await index.Servers.create({
                title: interaction.options.getString('title'),
                game: interaction.options.getString('game'),
                address: interaction.options.getString('address'),
                port: interaction.options.getInteger('port'),
                channel: interaction.options._hoistedOptions.filter(obj => {
                    return obj.name === "channel"
                })[0].value,
                message_id: interaction.options.getString('message_id'),
                image_url: interaction.options.getString('image_url'),
                direct_join: interaction.options.getString('direct_join'),
                color: interaction.options.getString('color'),
                country: interaction.options.getString('country'),
                public_address: interaction.options.getString('public_address'),
                password: interaction.options.getString('password'),
                max_players: interaction.options.getInteger('max_players'),
            });
            makeServerEmbed(server)
            return interaction.reply(`Server added, making embed message!`);
        }
        catch (error) {
            console.log(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('That server already exists.');
            }

            return interaction.reply('Something went wrong with adding a server.');
        }

        // Make a new embed message for the server
        // at the top of your file

        async function makeServerEmbed(server) {

            async function getServerState() {
                return new Promise((resolve) => {
                    if (server.query_type = 'minecraft_query') {
                        ms.init(server.address, server.port, function (result) {
                            if (ms.online) {
                                resolve('🟢 Online');
                            }
                            else {
                                resolve('🔴 Offline');
                            }
                        })
                    }
                })
            }


            // inside a command, event listener, etc.
            const serverEmbed = new EmbedBuilder()
                .setColor(server.color)
                .setTitle(server.title)
                .setDescription('Connect: ' + server.direct_join)
                .setThumbnail(server.image_url)
                .addFields(
                    { name: 'Status', value: await getServerState(), inline: true },
                    { name: 'Adress and port', value: server.address + ':' + server.port, inline: true },
                    { name: 'Location', value: server.country, inline: true },
                    { name: 'Game', value: server.game, inline: true },
                    { name: 'Password', value: server.password, inline: true },
                    { name: 'Max players', value: String(server.max_players), inline: true },
                )
                .setTimestamp()
                .setFooter({ text: 'Game Server State | Made by Zeus', iconURL: 'https://i.imgur.com/wkbooD6.png' });

            const channel = interaction.client.channels.cache.get(server.channel);
            channel.send({ embeds: [serverEmbed] });

            //add the message id to the database
            index.Servers.update({ message_id: channel.lastMessageId }, { where: { id: server.id } });
        }
    },
};
