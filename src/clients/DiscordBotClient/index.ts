import { BotClient } from "@/interfaces"
import {
  GatewayDispatchEvents,
  InteractionType,
  MessageFlags,
} from "@discordjs/core"

export class DiscordBotClient extends BotClient {
  setupListeners(): void {
    this.on(
      GatewayDispatchEvents.IntegrationCreate,
      async ({ data: interaction, api }) => {
        await api.interactions.reply(interaction.id, interaction.id, {
          content: "Pong!",
          flags: MessageFlags.Ephemeral,
        })
      }
    )

    this.on(
      GatewayDispatchEvents.MessageCreate,
      async ({ data: message, api }) => {
        await api.channels.createMessage(message.channel_id, {
          content: message.content,
        })
      }
    )

    this.once(GatewayDispatchEvents.Ready, async () => {
      console.log("ready")
    })
  }
}
