import { sequelize } from "@/db/sequelize"
import { ClientFactory } from "@/interfaces/ClientFactory"

export class App {
  private static instance: App

  constructor(private readonly factory: ClientFactory) {
    if (App.instance) {
      return App.instance
    }

    App.instance = this
  }

  async init() {
    try {
      await sequelize.sync()
      await sequelize.authenticate()
      const client = this.factory.makeClient()

      client.setupListeners()
      client.setupHooks()
    } catch (e) {
      console.log(e)
    }
  }
}
