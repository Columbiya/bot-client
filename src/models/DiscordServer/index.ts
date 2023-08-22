import { sequelize } from "@/db/sequelize"

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize"

export class DiscordServer extends Model<
  InferAttributes<DiscordServer>,
  InferCreationAttributes<DiscordServer>
> {
  declare id: CreationOptional<number>
  declare guild_id: CreationOptional<string>
  declare channel_id: CreationOptional<string>
  declare allNotificationsActive: CreationOptional<boolean>
}

DiscordServer.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    guild_id: { type: DataTypes.STRING, allowNull: true },
    channel_id: { type: DataTypes.STRING, allowNull: true },
    allNotificationsActive: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, tableName: "discord_servers" }
)
