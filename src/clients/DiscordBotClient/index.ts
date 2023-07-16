import { BotClient } from "@/interfaces"
import { GatewayDispatchEvents } from "@discordjs/core"
import { lunarVisionNotificationsChannelId } from "@/clients/DiscordBotClient/lunarVisionNotificationsChannelId"

export class DiscordBotClient extends BotClient {
  declare ref: NodeJS.Timer | null

  setupListeners(): void {
    this.on(
      GatewayDispatchEvents.MessageCreate,
      async ({ data: message, api }) => {
        await api.channels.createMessage(message.channel_id, {
          content: message.channel_id,
        })
      }
    )

    this.once(GatewayDispatchEvents.Ready, async () => {
      console.log("ready")
    })
  }

  setupHooks() {
    this.ref = setInterval(this.sendHamanNotification.bind(this), 3000)
  }

  async sendHamanNotification() {
    return this.api.channels.createMessage(lunarVisionNotificationsChannelId, {
      content: "Хаман начинается через 10 минут",
    })
  }
}
