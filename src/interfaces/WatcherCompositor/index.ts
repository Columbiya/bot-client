import { AppearableWatcher } from "@/interfaces"

export abstract class WatcherCompositor {
  abstract getAllEntitiesAppearings(): string[]
  abstract add(_: AppearableWatcher): void
}
