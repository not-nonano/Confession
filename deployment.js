const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.slash);
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		// await rest.put(
		// 	Routes.applicationCommands('879357765850628136'),
		// 	{ body: commands },
		// );


		// await rest.put(
		//     Routes.applicationGuildCommands("879357765850628136", '874218440917942325'),
		//     { body: [] },
		// );

		// await rest.put(
		// 	Routes.applicationCommandPermissions("879357765850628136", '874218440917942325', '879394156022210561'),
		// 	{
		// 		body: 
		// 			{
		// 				id: "428832564514390019",
		// 				type: 2,
		// 				permission: true
		// 			}

		// 	},
		// );

		await rest.put(
			Routes.applicationCommandPermissions("879357765850628136", '874218440917942325', '879394156022210561'),
			{
				body:
				{
					id: "428832564514390019",
					type: 2,
					permission: true
				}
			});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();