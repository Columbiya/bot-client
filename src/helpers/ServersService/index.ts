import { DiscordServer } from "@/models/DiscordServer"
import { ErrorMessages } from "@/types"

export class ServersService {
  async findById(id: string) {
    return DiscordServer.findByPk(id)
  }

  async findByIdAndChannelId(guild_id: string, channel_id: string) {
    return DiscordServer.findOne({ where: { guild_id, channel_id } })
  }

  async getTotalAmountOfActiveServerSubscriptions() {
    const servers = await DiscordServer.findAndCountAll({
      where: { allNotificationsActive: true },
      limit: 1,
    })

    return servers.count
  }

  async findActiveSubscriptions(limit = 10, offset = 0) {
    const servers = await DiscordServer.findAll({
      where: { allNotificationsActive: true },
      limit,
      offset,
    })

    return servers
  }

  async *generateAllActiveServers(limit: number, offset: number) {
    const activeSubscriptions = await this.findActiveSubscriptions(
      limit,
      offset
    )

    for (let subs of activeSubscriptions) {
      yield subs
    }
  }

  async unregisterServer(channel_id: string, guild_id?: string) {
    let candidate: DiscordServer | null

    if (!channel_id && !guild_id) {
      throw new Error(ErrorMessages.INCORRECT_INPUT)
    }

    if (guild_id) {
      candidate = await DiscordServer.findOne({ where: { guild_id } })
    } else {
      candidate = await DiscordServer.findOne({ where: { channel_id } })
    }

    if (!candidate) {
      throw new Error(ErrorMessages.ENTITY_DOESNT_EXISTS)
    }

    candidate.allNotificationsActive = false

    await candidate.save()
  }
}
