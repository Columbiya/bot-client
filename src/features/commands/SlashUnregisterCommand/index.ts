import { SlashCommand } from "@/interfaces"
import { ErrorMessages, EventTypes, SuccessMessages } from "@/types"
import { MessageFlags } from "@discordjs/core"
import { EventEmitter } from "node:events"
import { SlashRegisterCommandData } from "../SlashRegisterCommand"
import { ServersService } from "@/helpers"

export class SlashUnregisterCommand implements SlashCommand {
  declare emitter: EventEmitter
  declare interactionId: string
  declare tokenId: string
  declare guild_id?: string
  declare channel_id: string

  constructor(
    readonly discordServerService: ServersService,
    {
      channel_id,
      emitter,
      interactionId,
      interactionToken,
      guild_id,
    }: SlashRegisterCommandData
  ) {
    this.emitter = emitter
    this.channel_id = channel_id
    this.interactionId = interactionId
    this.tokenId = interactionToken
    this.guild_id = guild_id
  }

  async execute() {
    try {
      await this.discordServerService.unregisterServer(
        this.channel_id,
        this.guild_id
      )

      this.emitter.emit(
        EventTypes.REPLY_TO_INTERACTION,
        this.interactionId,
        this.tokenId,
        {
          content: SuccessMessages.UNREGISTER_SUCCESS,
          flags: MessageFlags.Ephemeral,
        }
      )
    } catch (e) {
      this.emitter.emit(
        EventTypes.REPLY_TO_INTERACTION,
        this.interactionId,
        this.tokenId,
        {
          content: ErrorMessages.ENTITY_DOESNT_EXISTS,
          flags: MessageFlags.Ephemeral,
        }
      )
    }
  }
}
