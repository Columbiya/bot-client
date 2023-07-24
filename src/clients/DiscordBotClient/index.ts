import { EventEmitter } from "node:events"
import { BotClient } from "@/interfaces"
import { GatewayDispatchEvents } from "@discordjs/core"
import { Haman, Dragon, Ballac } from "@/models"
import { FileService } from "@/helpers"
import { AppearableEntityWatcher } from "@/features"
import { lunarVisionNotificationsChannelId } from "./lunarVisionNotificationsChannelId"
import { EventTypes } from "@/types"

export class DiscordBotClient extends BotClient {
  emitter = new EventEmitter()

  setupListeners(): void {
    this.once(GatewayDispatchEvents.Ready, () => {
      console.log("ready")
    })

    this.emitter.on(EventTypes.SEND_MESSAGE, this.sendNotification.bind(this))
  }

  async setupHooks() {
    const haman = new Haman(new FileService())
    haman.fetchAppearTime()

    const threshholdMinutes = 10
    const hamanAppearTimeWatcher = new AppearableEntityWatcher(
      haman,
      this.emitter,
      threshholdMinutes
    )

    const dragon = new Dragon(new FileService())
    dragon.fetchAppearTime()

    const dragonAppearTimeWatcher = new AppearableEntityWatcher(
      dragon,
      this.emitter,
      threshholdMinutes
    )

    const ballac = new Ballac(new FileService())
    ballac.fetchAppearTime()

    const ballacAppearTimeWatcher = new AppearableEntityWatcher(
      ballac,
      this.emitter,
      threshholdMinutes
    )

    hamanAppearTimeWatcher.startWatching()
    dragonAppearTimeWatcher.startWatching()
    ballacAppearTimeWatcher.startWatching()
  }

  private sendNotification(content: string) {
    return this.api.channels.createMessage(lunarVisionNotificationsChannelId, {
      content,
    })
  }
}
