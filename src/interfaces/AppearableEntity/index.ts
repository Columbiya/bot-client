export abstract class AppearableEntity {
  abstract didAppear(): boolean
  abstract leftTimeToAppearInMs(): number
  abstract nextTimeToAppear(): Date
}
