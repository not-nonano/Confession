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

                const { client, user } = interaction
                const channel = await client.confessionChannel.get(process.env.GUILD_ID)
                if (channel) {

                    const context = interaction.options.getString('context')

                    interaction.editReply({ content: 'Thank you for using this bot!' })

                    client.confessionChannel.get(process.env.GUILD_ID)
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
                } else {
                    interaction.editReply({ content: 'Bot configuration not yet set' })
                }

            })
        }
}
