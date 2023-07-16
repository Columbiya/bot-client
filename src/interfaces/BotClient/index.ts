import { Client } from "@/types/Client"

export abstract class BotClient {
  abstract init(): void
  abstract setupListeners(): void
  abstract setupGateway(): void
  abstract getClient(): Client
}
