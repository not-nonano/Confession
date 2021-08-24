const { version, MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require('discord.js');

const Humanize = require('humanize-duration');
const Os = require('os');
const Stat = require('cpu-stat');
const Util = require('util');
const Bytes = require('bytes');

module.exports = {
    slash: {
        name: 'sysinfo',
        description: 'Send System Information',
        default_permission: false
    },
    name: 'sysinfo',
    description: 'Send System Information',
    perms: [],
    guildOnly: true,
    DMOnly: false,
    run:
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
        async (interaction) => {

            const { client } = interaction;

            const {
                users,
                guilds,
                channels,
            } = client;

            try {

                if (!client.application?.owner) await client.application?.fetch();

                const cpu = Util.promisify(Stat.usagePercent);
                const cpuPercent = await cpu();

                const uptimeDuration = Humanize(client.uptime, {

                    conjunction: ' and ',
                    serialComma: false,

                });

                const description = [
                    `• Owner: **${client.application?.owner.tag}**`,
                    `• Owner ID: **${client.application?.owner.id}**`,
                    `• Bot Name: **${client.user.tag}**`,
                    `• Bot ID: **${client.user.id}**`,
                    `• Memory Usage: **${Bytes(process.memoryUsage().heapUsed)}**`,
                    `• Uptime: **${uptimeDuration}**`,
                    `• Users: **${users.cache.size.toLocaleString()}**`,
                    `• Servers: **${guilds.cache.size.toLocaleString()}**`,
                    `• Channels: **${channels.cache.size.toLocaleString()}**`,
                    `• Commands: **${client.commands.size.toLocaleString()}**`,
                    `• Created At: **${client.application?.createdAt}**`,
                    `• DiscordJS: **v${version}**`,
                    `• NodeJS: **${process.version}**`,
                    `• CPU: **${Os.cpus().map(c => c.model)[0]}**`,
                    `• CPU Usage: **${cpuPercent.toFixed(2)}%**`,
                    `• Architecture: **${Os.arch()}**`,
                    `• Platform: **${Os.platform()}**`,
                    `• API Latency: **${Math.round(client.ws.ping)}ms**`,
                ];

                const embed = new MessageEmbed()
                    .setColor('BLURPLE')
                    .setTitle('Bot Information')
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription(description.join('\n'));



                return await interaction.reply({ embeds: [embed] });

            }
            catch (error) {

                console.error(error);

            }

        },

};