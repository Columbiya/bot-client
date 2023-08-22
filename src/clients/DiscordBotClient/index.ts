import { EventEmitter } from "node:events"
import { BotClient } from "@/interfaces"
import {
  APIInteractionResponseCallbackData,
  GatewayDispatchEvents,
  InteractionType,
} from "@discordjs/core"
import { Haman, Dragon, Ballac } from "@/models"
import { FileService, ServersService } from "@/helpers"
import {
  AppearableEntityWatcher,
  CommandProcessor,
  SlashCommandProcessor,
  WatcherCompositor,
} from "@/features"
import { EventTypes } from "@/types"

export class DiscordBotClient extends BotClient {
  emitter = new EventEmitter()
  watcherCompositor = new WatcherCompositor()
  discordServerService = new ServersService()
  devChannel = "1130031485802512445"

  private botPrefix = "!bns"

  setupListeners(): void {
    this.once(GatewayDispatchEvents.Ready, () => {
      console.log("ready")
    })

    this.on(GatewayDispatchEvents.MessageCreate, ({ data, api }) => {
      if (data.author.bot) return

      const { content, channel_id } = data
      if (!this.messageIsCommand(content)) return

      const command = content.split(" ")[1]

      const commandProcessor = new CommandProcessor(this.emitter, channel_id)
      commandProcessor.processCommand(command)
    })

    this.on(
      GatewayDispatchEvents.InteractionCreate,
      ({ data: interaction, api }) => {
        if (
          !interaction.data ||
          !("name" in interaction.data) ||
          interaction.type !== InteractionType.ApplicationCommand
        )
          return

        const {
          id,
          token,
          guild_id,
          channel: { id: channel_id },
        } = interaction

        const slashCommandProcessor = new SlashCommandProcessor({
          channel_id,
          guild_id,
          interactionId: id,
          interactionToken: token,
          emitter: this.emitter,
        })

        slashCommandProcessor.processCommand(interaction.data.name)
      }
    )

    this.emitter.on(EventTypes.SEND_MESSAGE, this.sendNotification.bind(this))
    this.emitter.on(
      EventTypes.SEND_TO_ALL_MESSAGE,
      this.sendNotificationToAllSubscribedChannels.bind(this)
    )
    this.emitter.on(
      EventTypes.REPLY_TO_INTERACTION,
      this.replyToInteraction.bind(this)
    )
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

  private async sendNotificationToAllSubscribedChannels(content: string) {
    const total =
      await this.discordServerService.getTotalAmountOfActiveServerSubscriptions()
    const limit = 10
    let page = 1

    do {
      const generator = this.discordServerService.generateAllActiveServers(
        limit,
        page * limit - limit
      )

      for await (let subs of generator) {
        if (!subs.channel_id) continue

        this.api.channels.createMessage(subs.channel_id, { content })
      }

      page += 1
    } while (limit * page < total)
  }

  private sendNotification(content: string, channelId: string) {
    const devMode = process.env.NODE_ENV === "development"

    if (devMode) {
      this.api.channels.createMessage(this.devChannel, { content })
      return
    }

    return this.api.channels.createMessage(channelId, { content })
  }

  private replyToInteraction(
    interactionId: string,
    interactionToken: string,
    data: APIInteractionResponseCallbackData
  ) {
    // refactor the amount of the parameters

    return this.api.interactions.reply(interactionId, interactionToken, data)
  }
}
