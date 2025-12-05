import fs from 'fs'
import path from 'path'
import type { Command } from '../../types/command.js'
import { fileURLToPath, pathToFileURL } from 'url'
import { Client, Collection, ChatInputCommandInteraction, Events, MessageFlags } from 'discord.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Loads commands from subfolders under this directory (e.g., ./utility)
async function loadCommands(): Promise<Collection<any, any>> {
  const commands = new Collection<string, any>();

  const subfolders = fs
    .readdirSync(__dirname, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const folder of subfolders) {
    const folderPath = path.join(__dirname, folder);

    const files = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith('.js'));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const url = pathToFileURL(filePath).href;
      const mod = await import(url);
      const command = mod.default ?? mod;

      if (command && 'data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
      } else {
        console.warn(`[WARNING] ${filePath} missing "data" or "execute" on default export`);
      }
    }
  }

  return commands;
}

async function initCommandHandler(client: Client): Promise<any> {
    client.on(Events.InteractionCreate, async (interaction) => {
        if(!interaction.isChatInputCommand()) return;
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
    });
}

export { loadCommands, initCommandHandler };