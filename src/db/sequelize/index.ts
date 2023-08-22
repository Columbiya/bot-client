import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 0,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
})
