const { Client } = require('discord.js')
const { readdirSync } = require('fs')
module.exports =
    /**
     * 
     * @param {Client} client 
     */
    (client) => {
        try {

            const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../commands/${file}`);
                client.commands.set(command.name, command);
            }

        } catch (e) {
            console.error(e)
        }
    }