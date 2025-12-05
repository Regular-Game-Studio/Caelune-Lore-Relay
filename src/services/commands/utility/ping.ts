import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Tests the bot's latency with discord servers"),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.reply("Pong!");
    }
}
