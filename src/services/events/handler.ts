import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { Client, Collection, ChatInputCommandInteraction, Events, MessageFlags } from 'discord.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadEvents(client: Client): Promise<void> {
    const eventsPath = path.join(__dirname, 'utility');
    const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file)
        const url = pathToFileURL(filePath).href;
        const mod = await import(url);
        const event = mod.default ?? mod;

        if (event.once) {
            client.once(event.name, () => event.execute(client));
        } else {
            client.on(event.name, (interaction) => event.execute(client, interaction));
        }
    }
}

export {
    loadEvents
}