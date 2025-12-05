import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

interface Command {
    cooldown: number,
    data: SlashCommandBuilder;
    execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export {
    type Command
}