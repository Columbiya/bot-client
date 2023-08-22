import { Command } from "@/interfaces"
import { WatcherCompositor } from "@/features"
import { EventEmitter } from "node:events"
import { EventTypes } from "@/types"

export class ShowCommand implements Command {
  private watcherCompositor = new WatcherCompositor()

  constructor(
    private readonly emitter: EventEmitter,
    private readonly channel_id: string
  ) {}

  execute(): void {
    this.watcherCompositor
      .getAllEntitiesAppearings()
      .forEach((mes) =>
        this.emitter.emit(EventTypes.SEND_MESSAGE, mes, this.channel_id)
      )
  }
}
