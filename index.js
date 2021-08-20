const { Client, Collection } = require('discord.js');
const color = require('colors')
require('dotenv').config()

const client = new Client({
    intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.commands = new Collection();
client.confessionChannel = new Collection();

['command', 'event'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN)

