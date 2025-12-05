import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js'
import { loadCommands, initCommandHandler } from './services/commands/handler.js'
import deployCommands from './services/commands/deployer.js';
import dotenv from 'dotenv'

dotenv.config();

const discord_token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

await deployCommands();
client.commands = await loadCommands();
await initCommandHandler(client);

client.login(discord_token);
