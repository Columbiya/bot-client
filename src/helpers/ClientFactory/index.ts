import { BotClient, ClientFactoryInterface } from "@/interfaces"
import { Client } from "@discordjs/core"
import { WebSocketManager } from "@discordjs/ws"
import { type REST } from "@discordjs/rest"
import { DiscordBotClient } from "@/clients"

export class DiscordClientFactory implements ClientFactoryInterface {
  makeClient(rest: REST, gateway: WebSocketManager): BotClient {
    return new DiscordBotClient({ rest, gateway })
  }
}
