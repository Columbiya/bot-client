import { commandsInfo } from "@/types"
import { REST } from "@discordjs/rest"
import { SlashCommandBuilder } from "@discordjs/builders"
import { Routes } from "@discordjs/core"

export class CommandRegisterService {
  constructor(private readonly rest: REST) {}

  async registerCommands() {
    const clientId = process.env.DISCORD_APP_ID as string

    const commands = commandsInfo.map(
      ({ description, name, permissionsRequired }) =>
        new SlashCommandBuilder()
          .setName(name)
          .setDescription(description)
          .setDefaultMemberPermissions(permissionsRequired)
          .toJSON()
    )

    this.rest.put(Routes.applicationCommands(clientId), { body: commands })
  }
}
