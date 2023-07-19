import { FileService } from "@/helpers"
import { AppearableEntity } from "@/interfaces"
import { AppearTime } from "@/types"
import * as path from "path"

export class Dragon implements AppearableEntity {
  // time of appearing in UTC+3
  appearTime: AppearTime[] = []
  private entityName = "Дракон"

  constructor(private readonly fileService: FileService) {}

  fetchAppearTime() {
    const jsonPath = path.resolve(
      process.cwd(),
      "src",
      "db",
      "dragon-appearance.json"
    )
    const json = this.fileService.getFileContents(jsonPath)
    this.appearTime = JSON.parse(json)
  }

  getEntityName(): string {
    return this.entityName
  }
}
