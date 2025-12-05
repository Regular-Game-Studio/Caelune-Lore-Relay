import { Client, Events, MessageFlags, type Interaction } from "discord.js";
import { type Command } from "../../../types/command.js";

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: Client, interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = <Command>interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.log(`[ERROR] No command found matching ${interaction.commandName} was found`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: "There was a error while executing this command!",
                    flags: MessageFlags.Ephemeral,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral,
                })
            }
        }
    },
}