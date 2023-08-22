import { Commands } from "@/types"
import { EventEmitter } from "node:events"
import { ShowCommand } from "@/features"
import { CommandProcessor as ICommandProcessor } from "@/interfaces"

export class CommandProcessor implements ICommandProcessor {
  constructor(
    private readonly emitter: EventEmitter,
    private readonly cameFromChatId: string
  ) {}

  processCommand(command: string) {
    if (!command) return

    const commandLower = command.toLowerCase()

    if (commandLower === Commands.SHOW) {
      new ShowCommand(this.emitter, this.cameFromChatId).execute()
    }
  }
}
