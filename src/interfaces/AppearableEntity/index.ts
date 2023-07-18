import { AppearTime } from "@/types"

export abstract class AppearableEntity {
  declare appearTime: AppearTime[]
  abstract fetchAppearTime(): void
  abstract getEntityName(): string
}
