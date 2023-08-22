import { SlashCommand } from "@/interfaces"
import { EventTypes, commandsInfo } from "@/types"
import { blockQuote, bold, italic } from "@discordjs/builders"
import { MessageFlags } from "@discordjs/core"
import { EventEmitter } from "node:events"

export class SlashHelpCommand implements SlashCommand {
  constructor(
    private readonly emitter: EventEmitter,
    readonly interactionId: string,
    readonly tokenId: string
  ) {}

  execute(): void | Promise<void> {
    const content = this.makeMessage()

    this.emitter.emit(
      EventTypes.REPLY_TO_INTERACTION,
      this.interactionId,
      this.tokenId,
      {
        content,
        flags: MessageFlags.Ephemeral,
      }
    )
  }

  private makeMessage(): string {
    const texts = commandsInfo.map(({ description, name }) =>
      blockQuote(
        `Название команды: ${italic(
          bold(`/${name}`)
        )}\nОписание: ${description}`
      )
    )
    return texts.join("\n\n")
  }
}
