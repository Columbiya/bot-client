import { Command } from "@/interfaces"

export abstract class SlashCommand extends Command {
  abstract readonly interactionId: string
  abstract readonly tokenId: string
}
