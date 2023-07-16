import { BotClient, ClientFactoryInterface } from "@/interfaces"
import { REST } from "@discordjs/rest"
import { WebSocketManager } from "@discordjs/ws"
import { DiscordBotClient } from "@/clients"

export class DiscordClientFactory implements ClientFactoryInterface {
  makeClient(rest: REST, gateway: WebSocketManager): BotClient {
    return new DiscordBotClient({ rest, gateway })
  }
}
