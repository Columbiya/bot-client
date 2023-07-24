import { EventEmitter } from "node:events"
import { BotClient } from "@/interfaces"
import { GatewayDispatchEvents } from "@discordjs/core"
import { Haman, Dragon, Ballac } from "@/models"
import { FileService } from "@/helpers"
import { AppearableEntityWatcher, WatcherCompositor } from "@/features"
import { lunarVisionNotificationsChannelId } from "./lunarVisionNotificationsChannelId"
import { EventTypes } from "@/types"

export class DiscordBotClient extends BotClient {
  emitter = new EventEmitter()
  watcherCompositor = new WatcherCompositor()

  private botPrefix = "!bns"

  setupListeners(): void {
    this.once(GatewayDispatchEvents.Ready, () => {
      console.log("ready")
    })

    this.on(GatewayDispatchEvents.MessageCreate, ({ data }) => {
      if (data.author.bot) return

      const { content, channel_id } = data
      if (!this.messageIsCommand(content)) return

      const command = content.split(" ")[1]

      // refactor to commands pattern
      if (command === "show") {
        this.watcherCompositor
          .getAllEntitiesAppearings()
          .forEach(this.sendNotification.bind(this))
      }
    })

    this.emitter.on(EventTypes.SEND_MESSAGE, this.sendNotification.bind(this))
  }

  private messageIsCommand(message: string) {
    return message.trim().startsWith(this.botPrefix)
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

    this.watcherCompositor.add(hamanAppearTimeWatcher)
    this.watcherCompositor.add(dragonAppearTimeWatcher)
    this.watcherCompositor.add(ballacAppearTimeWatcher)
  }

  private sendNotification(content: string) {
    return this.api.channels.createMessage(lunarVisionNotificationsChannelId, {
      content,
    })
  }
}
