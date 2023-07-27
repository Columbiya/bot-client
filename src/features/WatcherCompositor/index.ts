import { Time } from "@/helpers"
import { AppearableWatcher, WatcherCompositorInterface } from "@/interfaces"

export class WatcherCompositor implements WatcherCompositorInterface {
  private watchers: AppearableWatcher[] = []
  private time = new Time()

  add(watcher: AppearableWatcher): void {
    this.watchers.push(watcher)
  }

  getAllEntitiesAppearings(): string[] {
    return this.watchers.map(this.makeAppearString.bind(this))
  }

  private makeAppearString(w: AppearableWatcher) {
    const leftTimeInMs = w.leftTimeToAppearInMs()

    if (leftTimeInMs === null || leftTimeInMs === undefined)
      return w.makeMessage(0)

    const leftTimeInMinutes = this.time.getMinutesFromMs(leftTimeInMs)

    return w.makeMessage(leftTimeInMinutes)
  }
}
