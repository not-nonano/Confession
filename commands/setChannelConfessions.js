const { CommandInteraction, MessageEmbed } = require('discord.js')
require('dotenv').config()
const sql = require('mssql')
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        enableArithAbort: true
    }
}

module.exports = {
    slash: {
        name: 'setchannel',
        description: 'Sets channel where you can see confessions',
        defaultPermission: false,
        options: [
            {
                name: 'channel',
                description: 'mention channel',
                type: 7,
                required: true
            }
        ]
    },
    name: 'setchannel',
    description: 'Sets channel where you can see confessions',
    perms: ["MANAGE_CHANNELS"],
    guildOnly: true,
    DMOnly: false,
    run:
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
        async (interaction) => {
            interaction.deferReply().then(async () => {

                return interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('NU-Anonymous')
                            .setDescription('Change into static data. DM <#428832564514390019> if you have questions')
                    ]
                })

                const { guildId, client } = interaction

                await sql.connect(sqlConfig)
                const { recordset } = await sql.query`SELECT * FROM Channel WHERE guildId = ${guildId}`
                const channel = interaction.options.getChannel('channel')

                if (recordset[0]) {
                    await sql.connect(sqlConfig)
                    await sql.query`UPDATE Channel SET channelId = ${channel.id} WHERE guildId = ${guildId}`
                    let confessionChannel = client.confessionChannel.get(guildId)
                    confessionChannel = client.guilds.cache.get(guildId).channels.cache.get(channel.id)
                } else {
                    await sql.connect(sqlConfig)
                    await sql.query`INSERT INTO Channel(guildId, channelId) VALUES(${guildId}, ${channel.id})`
                    client.confessionChannel.set(guildId, client.guilds.cache.get(guildId).channels.cache.get(channel.id))
                }
                return interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('NU-Anonymous')
                            .setDescription('Channel Set!')
                    ]
                })
            })
        }
}
