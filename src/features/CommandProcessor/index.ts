import { ChatCommands } from "@/types"
import { EventEmitter } from "node:events"
import { ShowCommand, SayCommand } from "@/features"
import { CommandProcessor as ICommandProcessor } from "@/interfaces"
import { API, GatewayMessageCreateDispatchData } from "@discordjs/core"

type processorInputType = GatewayMessageCreateDispatchData

export class CommandProcessor implements ICommandProcessor {
  private declare emitter: EventEmitter
  private declare channelId: string
  private declare message: string
  private declare messageId: string
  private declare api: API

  constructor(
    { id, channel_id, content }: processorInputType,
    emitter: EventEmitter,
    api: API
  ) {
    this.emitter = emitter
    this.channelId = channel_id
    this.message = content
    this.messageId = id
    this.api = api
  }

  processCommand(command: string) {
    if (!command) return

    const commandLower = command.toLowerCase()

    if (commandLower === ChatCommands.SHOW) {
      new ShowCommand(this.emitter, this.channelId).execute()
    }
    if (commandLower === ChatCommands.SAY) {
      new SayCommand({
        api: this.api,
        channelId: this.channelId,
        emitter: this.emitter,
        message: this.message,
        messageIdToDelete: this.messageId,
      }).execute()
    }
  }
}
