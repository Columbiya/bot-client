import { Command, SlashCommand } from "@/interfaces"
import { WatcherCompositor } from "@/features"
import { EventEmitter } from "node:events"
import { EventTypes } from "@/types"
import {
  APIInteractionResponseCallbackData,
  MessageFlags,
} from "@discordjs/core"

export class SlashShowCommand implements SlashCommand {
  watcherCompositor = new WatcherCompositor()

  constructor(
    private readonly emitter: EventEmitter,
    readonly interactionId: string,
    readonly tokenId: string
  ) {}

  execute(): void {
    const content = this.watcherCompositor.getAllEntitiesAppearings().join("\n")

    const data: APIInteractionResponseCallbackData = {
      flags: MessageFlags.Ephemeral,
      content,
    }

    this.emitter.emit(
      EventTypes.REPLY_TO_INTERACTION,
      this.interactionId,
      this.tokenId,
      data
    )
  }
}
