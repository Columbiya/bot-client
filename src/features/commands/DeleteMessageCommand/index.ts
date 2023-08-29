import { Command } from "@/interfaces"
import { API } from "@discordjs/core"

export class DeleteMessageCommand implements Command {
  constructor(
    private readonly api: API,
    private readonly channelId: string,
    private readonly messageIdToDelete: string
  ) {}

  execute(): void | Promise<void> {
    return this.api.channels.deleteMessage(
      this.channelId,
      this.messageIdToDelete
    )
  }
}
