import { SlashCommand } from "@/interfaces"
import { DiscordServer } from "@/models/DiscordServer"
import { ErrorMessages, EventTypes, SuccessMessages } from "@/types"
import { MessageFlags } from "@discordjs/core"
import { EventEmitter } from "node:events"

export interface SlashRegisterCommandData {
  readonly emitter: EventEmitter
  readonly interactionId: string
  readonly interactionToken: string
  readonly guild_id?: string
  readonly channel_id: string
}

export class SlashRegisterCommand implements SlashCommand {
  declare emitter: EventEmitter
  declare interactionId: string
  declare tokenId: string
  declare guild_id?: string
  declare channel_id: string

  constructor({
    channel_id,
    emitter,
    interactionId,
    interactionToken,
    guild_id,
  }: SlashRegisterCommandData) {
    this.emitter = emitter
    this.channel_id = channel_id
    this.interactionId = interactionId
    this.tokenId = interactionToken
    this.guild_id = guild_id
  }

  async execute() {
    if (!this.guild_id) return // other logic

    const candidate = await DiscordServer.findOne({
      where: { guild_id: this.guild_id },
    })

    if (candidate?.allNotificationsActive) {
      this.emitter.emit(
        EventTypes.REPLY_TO_INTERACTION,
        this.interactionId,
        this.tokenId,
        {
          content: ErrorMessages.SUBSCRIPTION_EXISTS,
          flags: MessageFlags.Ephemeral,
        }
      )

      return
    }

    if (candidate) {
      candidate.allNotificationsActive = true
      candidate.save()
    } else {
      DiscordServer.create({
        allNotificationsActive: true,
        channel_id: this.channel_id,
        guild_id: this.guild_id,
      })
    }

    this.emitter.emit(
      EventTypes.REPLY_TO_INTERACTION,
      this.interactionId,
      this.tokenId,
      {
        content: SuccessMessages.CHANGES_SAVED_SUCCESSFULLY,
        flags: MessageFlags.Ephemeral,
      }
    )
  }
}
