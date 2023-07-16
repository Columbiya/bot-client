import { Client } from "@/types/Client"
import { REST } from "@discordjs/rest"
import { WebSocketManager } from "@discordjs/ws"
import { GatewayIntentBits } from "@discordjs/core"

export class App {
  private static instance: App

  constructor(private readonly botClient: Client) {
    if (App.instance) {
      return App.instance
    }

    App.instance = this
  }

  init() {
    const token = process.env.DISCORD_PUBLIC_KEY as string
    const rest = new REST({ version: "10" }).setToken(token)
    const gateway = new WebSocketManager({
      token,
      intents:
        GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
      rest,
    })
  }
}
