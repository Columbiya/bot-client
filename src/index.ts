import "./config"
import { App } from "@/App"
import { DiscordClientFactory } from "@/helpers"

const app = new App(new DiscordClientFactory())

app.init()
