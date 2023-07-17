import { ClientFactory } from "@/interfaces/ClientFactory"

export class App {
  private static instance: App

  constructor(private readonly factory: ClientFactory) {
    if (App.instance) {
      return App.instance
    }

    App.instance = this
  }

  init() {
    const client = this.factory.makeClient()
    client.setupListeners()
    client.setupHooks()
  }
}
