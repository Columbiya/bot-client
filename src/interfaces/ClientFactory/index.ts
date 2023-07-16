import { BotClient } from "@/interfaces/index"

export abstract class ClientFactory {
  abstract makeClient(): BotClient
}
