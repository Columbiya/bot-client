import { BotClient, ClientFactoryInterface } from "@/interfaces"
import { REST } from "@discordjs/rest"
import { WebSocketManager } from "@discordjs/ws"
import { DiscordBotClient } from "@/clients"
import { intents } from "@/helpers/DiscordClientFactory/intents"

export class DiscordClientFactory implements ClientFactoryInterface {
  makeClient(): BotClient {
    const token = process.env.DISCORD_BOT_TOKEN as string

    const rest = new REST({ version: "10" }).setToken(token)
    const gateway = new WebSocketManager({
      token,
      intents,
      rest,
    })

    const client = new DiscordBotClient({ rest, gateway })

    gateway.connect()

    return client
  }
}
