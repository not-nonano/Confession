const { Client } = require('discord.js')
const { readdirSync } = require('fs')

module.exports =
    /**
     * 
     * @param {Client} client 
     */
    (client) => {
        try {

            const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

            for (const file of eventFiles) {
                const event = require(`../events/${file}`);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            }

        } catch (e) {
            console.error(e)
        }
    }