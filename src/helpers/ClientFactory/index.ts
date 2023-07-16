import { BotClient, ClientFactoryInterface } from "@/interfaces"
import { Client } from "discord.js"
import { WebSocketManager } from "@discordjs/ws"
import { type REST } from "@discordjs/rest"

export class DiscordClientFactory implements ClientFactoryInterface {
  makeClient(rest: REST, gateway: WebSocketManager): BotClient {
    return new Client({ rest, gateway })
  }
}
