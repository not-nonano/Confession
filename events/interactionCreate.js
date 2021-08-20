const { Interaction } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(interaction) {
        if (interaction.isCommand()) {
            if (!interaction.client.commands.has(interaction.commandName)) return;

            const command = interaction.client.commands.get(interaction.commandName)

            if (interaction.channel.type === 'GUILD_TEXT' && command.guildOnly) {
                if (!interaction.member.permissions.has(command.perms)) {
                    let neededPerms
                    command.perms.forEach(perm => {
                        neededPerms += `\`${perm}\` `
                    })
                    return interaction.reply({ content: `You don't have permission to run this command\nYou need ${neededPerms}`, ephemeral: true })
                }

                try {
                    await command.run(interaction)
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }

            } else if (interaction.channel.type === 'DM' && command.DMOnly) {
                try {
                    await command.run(interaction)
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }

            } else {
                return interaction.reply({ content: `I can\'t execute that command inside ${interaction.channel.type}!`, ephemeral: true })
            }
        }
    }
}