import { Client, Collection, SlashCommandBuilder } from "discord.js"

declare module "discord.js" {
    interface Client {
        cooldowns: Collection<string, number>
        commands: Collection<string, unknown>
    }
}