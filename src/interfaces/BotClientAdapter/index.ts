import { BotClient } from "@/interfaces"
import { Client } from "@/types/Client"

export abstract class BotClientAdapter extends Client implements BotClient {
  abstract init(): void
  abstract setupListeners(): void
  abstract setupGateway(): void
  abstract getClient(): Client
}
