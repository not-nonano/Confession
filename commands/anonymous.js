const { CommandInteraction, MessageEmbed } = require('discord.js')


module.exports = {
    slash: {
        name: 'confession',
        description: 'Send confession',
        options: [
            {
                name: 'context',
                description: 'the context.',
                type: 3,
                required: true
            }
        ]
    },
    name: 'confession',
    description: 'Send confession',
    perms: [],
    guildOnly: false,
    DMOnly: true,
    run:
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
        async (interaction) => {
            interaction.deferReply().then(async () => {

                const { client, user, guildId } = interaction

                const context = interaction.options.getString('context')

                interaction.editReply({ content: 'Thank you for using this bot!' })

                client.guilds.cache.get('874218440917942325').channels.cache.get('879364771902799874')
                    .send({
                        embeds: [
                            new MessageEmbed()
                                .setColor('BLUE')
                                .setAuthor(user.tag, user.avatarURL())
                                .setTitle('Student Grievance')
                                .setDescription(context)
                                .setFooter(`USER_ID: ${user.id}`)
                        ]
                    })

            })
        }
}
