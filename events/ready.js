const { Client } = require('discord.js')


module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        try {
            const command = await client.guilds.cache.get('874218440917942325')?.commands.fetch('879394156022210561');
            console.log(command)
            const permissions = [
                {
                    id: '428832564514390019',
                    type: 'USER',
                    permission: true,
                },
            ];

            await command.permissions.add({ permissions });

           

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