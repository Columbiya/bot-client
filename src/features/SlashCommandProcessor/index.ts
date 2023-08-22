import { EventEmitter } from "node:events"
import { CommandProcessor as ICommandProcessor } from "@/interfaces"
import { Commands } from "@/types"
import {
  SlashShowCommand,
  SlashRegisterCommand,
  SlashUnregisterCommand,
  SlashHelpCommand,
} from "@/features/commands"
import { ServersService } from "@/helpers"

interface SlashCommandProcessorData {
  readonly emitter: EventEmitter
  readonly interactionId: string
  readonly interactionToken: string
  readonly guild_id?: string
  readonly channel_id: string
}

export class SlashCommandProcessor implements ICommandProcessor {
  declare emitter: EventEmitter
  declare interactionId: string
  declare interactionToken: string
  declare guild_id?: string
  declare channel_id: string

  constructor({
    emitter,
    interactionId,
    interactionToken,
    guild_id,
    channel_id,
  }: SlashCommandProcessorData) {
    this.emitter = emitter
    this.interactionId = interactionId
    this.interactionToken = interactionToken
    this.guild_id = guild_id
    this.channel_id = channel_id
  }

  processCommand(command: string) {
    if (!command) return

    if (command === Commands.SHOW) {
      new SlashShowCommand(
        this.emitter,
        this.interactionId,
        this.interactionToken
      ).execute()
    }
    if (command === Commands.REGISTER) {
      new SlashRegisterCommand({
        channel_id: this.channel_id,
        emitter: this.emitter,
        interactionId: this.interactionId,
        interactionToken: this.interactionToken,
        guild_id: this.guild_id,
      }).execute()
    }
    if (command === Commands.UNREGISTER) {
      new SlashUnregisterCommand(new ServersService(), {
        channel_id: this.channel_id,
        emitter: this.emitter,
        interactionId: this.interactionId,
        interactionToken: this.interactionToken,
        guild_id: this.guild_id,
      }).execute()
    }
    if (command === Commands.HELP) {
      new SlashHelpCommand(
        this.emitter,
        this.interactionId,
        this.interactionToken
      ).execute()
    }
  }
}
