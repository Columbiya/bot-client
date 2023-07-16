import { BotClient } from "@/interfaces/index"
import { REST } from "@discordjs/rest"
import { WebSocketManager } from "@discordjs/ws"

export abstract class ClientFactory {
  abstract makeClient(rest: REST, gateway: WebSocketManager): BotClient
}
