import { BotClient } from "@/interfaces"
import { GatewayDispatchEvents } from "@discordjs/core"
import { Haman } from "@/models"
import { FileService } from "@/helpers"
import { AppearableEntityWatcher } from "@/features"

export class DiscordBotClient extends BotClient {
  declare ref: NodeJS.Timer | null

  setupListeners(): void {
    this.once(GatewayDispatchEvents.Ready, async () => {
      console.log("ready")
    })
  }

  async setupHooks() {
    const haman = new Haman(new FileService())
    await haman.fetchAppearTime()

    const threshholdMinutes = 10
    const hamanAppearTimeWatcher = new AppearableEntityWatcher(
      haman,
      threshholdMinutes,
      this
    )

    hamanAppearTimeWatcher.startWatching()
  }
}
