export abstract class AppearableWatcher {
  abstract didAppear(): boolean
  abstract leftTimeToAppearInMs(): number | null
  abstract nextTimeToAppear(): Date | null
  abstract startWatching(): void
  abstract stopWatching(): void
}
