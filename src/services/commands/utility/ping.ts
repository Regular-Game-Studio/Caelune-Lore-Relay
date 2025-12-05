import { ChatInputCommandInteraction, SlashCommandBuilder, type InteractionDeferReplyOptions } from "discord.js";

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Tests the bot's latency with discord servers"),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const sent = Date.now();

        const options: InteractionDeferReplyOptions = {withResponse: true}
        await interaction.deferReply();

        const roundTrip = Date.now() - interaction.createdTimestamp;

        await interaction.editReply(
            `Pong!\n Gateway: ${interaction.client.ws.ping}ms\n Round trip: ${roundTrip}ms`
        )
    }
}
