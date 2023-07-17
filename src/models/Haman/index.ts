import { FileService } from "@/helpers/FileService"
import { AppearableEntity } from "@/interfaces"
import { DaysOfWeek } from "@/types"
import * as path from "path"

// console.log(__dirname) // D:\code\bns\bot\dist

export class Haman implements AppearableEntity {
  // time of appearing in UTC+3
  static appearTime: [string, DaysOfWeek]

  constructor(private readonly fileService: FileService) {}

  async fetchAppearTime() {
    const jsonPath = path.resolve(
      __dirname,
      "src",
      "db",
      "haman-appearance.json"
    )
    const json = await this.fileService.getFileContents(jsonPath)
  }

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
