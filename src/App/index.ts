import { REST } from "@discordjs/rest"
import { WebSocketManager } from "@discordjs/ws"
import { ClientFactory } from "@/interfaces/ClientFactory"
import { intents } from "@/clients/DiscordBotClient/intents"
import { API } from "@discordjs/core"

export class App {
  private static instance: App

  constructor(private readonly factory: ClientFactory) {
    if (App.instance) {
      return App.instance
    }

    App.instance = this
  }

  init() {
    const token = process.env.DISCORD_BOT_TOKEN as string

    const rest = new REST({ version: "10" }).setToken(token)
    const api = new API(rest)
    const gateway = new WebSocketManager({
      token,
      intents,
      rest,
    })

    const client = this.factory.makeClient(rest, gateway)
    client.setupListeners()
    client.setupHooks()

    gateway.connect()
  }
}
