import { AppearableEntity } from "@/interfaces"
import { DaysOfWeek } from "@/types"

export class Haman implements AppearableEntity {
  // time of appearing in UTC+3
  static appearTime: [string, DaysOfWeek]

  didAppear(): boolean {
    throw new Error("not implemented")
  }

  nextTimeToAppear(): Date {
    throw new Error("not implemented")
  }

  leftTimeToAppearInMs(): number {
    throw new Error("not implemented")
  }
}
