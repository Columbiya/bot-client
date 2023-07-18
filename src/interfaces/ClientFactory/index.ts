import { BotClient } from "@/interfaces"

export abstract class ClientFactory {
  abstract makeClient(): BotClient
}
