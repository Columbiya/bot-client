import { App } from "@/App"
import { DiscordClientFactory } from "@/helpers"
import { config } from "dotenv"

config()

const app = new App(new DiscordClientFactory())

app.init()
