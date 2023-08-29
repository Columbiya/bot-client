import { Command } from "@/interfaces"
import { EventTypes } from "@/types"
import { API } from "@discordjs/core"

export class SendMessageCommand implements Command {
  constructor(
    private readonly api: API,
    private readonly channelId: string,
    private readonly message: string
  ) {}

  execute(): void | Promise<void> {
    return void this.api.channels.createMessage(this.channelId, {
      content: this.message,
    })
  }
}
