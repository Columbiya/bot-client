import { FileService } from "@/helpers"
import { AppearableEntity } from "@/interfaces"
import { AppearTime } from "@/types"
import * as path from "path"

export class Ballac implements AppearableEntity {
  appearTime: AppearTime[] = []
  private entityName = "Темный Баллак"

  constructor(private readonly fileService: FileService) {}

  fetchAppearTime(): void {
    const jsonPath = path.resolve(
      process.cwd(),
      "src",
      "db",
      "ballac-appearance.json"
    )
    const json = this.fileService.getFileContents(jsonPath)
    this.appearTime = JSON.parse(json)
  }

  getEntityName(): string {
    return this.entityName
  }
}
