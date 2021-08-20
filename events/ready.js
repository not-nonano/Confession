const { Client } = require('discord.js')
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
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        try {

            client.guilds.cache.forEach(async guild => {
                await sql.connect(sqlConfig)
                const { recordset } = await sql.query`SELECT * FROM Channel WHERE guildId = ${guild.id}`
                if (recordset[0]) {
                    client.confessionChannel.set(guild.id, client.guilds.cache.get(recordset[0].guildId).channels.cache.get(recordset[0].channelId))
                }
            })

            const stringlength = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Discord Bot is online!`.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` /--/ ${client.user.tag} /--/ `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
        } catch { /* */ }

    }
}