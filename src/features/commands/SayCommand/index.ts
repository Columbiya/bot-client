import { Command } from "@/interfaces"
import { EventTypes } from "@/types"
import { EventEmitter } from "node:events"
import { DeleteMessageCommand, SendMessageCommand } from "@/features/commands"
import { API } from "@discordjs/core"

interface SayCommandDeps {
  api: API
  emitter: EventEmitter
  message: string
  messageIdToDelete: string
  channelId: string
}

export class SayCommand implements Command {
  commands: Command[] = []

  constructor({
    api,
    channelId,
    emitter,
    message,
    messageIdToDelete,
  }: SayCommandDeps) {
    this.commands.push(
      new DeleteMessageCommand(api, channelId, messageIdToDelete)
    )
    this.commands.push(new SendMessageCommand(api, channelId, message))
  }

  execute(): void | Promise<void> {
    this.commands.forEach((c) => c.execute())
  }
}
