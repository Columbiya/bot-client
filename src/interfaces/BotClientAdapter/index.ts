import { BotClient } from "@/interfaces"
import { Client } from "@/types/Client"

export abstract class BotClientAdapter extends Client implements BotClient {
  abstract setupListeners(): void
  abstract setupHooks(): void
}
