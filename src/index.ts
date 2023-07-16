import { App } from "@/App"
import { config } from "dotenv"

config()

const app = new App()

app.start()
