import { PermissionFlagsBits } from "@discordjs/core"

export enum Commands {
  SHOW = "show",
  UNREGISTER = "unregister",
  REGISTER = "register",
  HELP = "help",
}

export const helpCommandsInfo: CommandDetails[] = []

interface CommandDetails {
  name: string
  description: string
  permissionsRequired?: typeof PermissionFlagsBits.KickMembers // fix this
}

export const commandsInfo: CommandDetails[] = [
  { name: "show", description: "Показать время до появления всех боссов" },
  {
    name: "register",
    description: "Зарегистрировать сервер для получения уведомлений",
    permissionsRequired: PermissionFlagsBits.KickMembers,
  },
  {
    name: "unregister",
    description: "Отписаться от получения уведомлений на этом сервере",
    permissionsRequired: PermissionFlagsBits.KickMembers,
  },
  {
    name: "help",
    description: "Посмотреть информацию о всех доступных командах бота",
  },
]

// come up with a way to write this more appropriately
