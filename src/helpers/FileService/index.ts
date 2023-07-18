import * as fs from "fs"

export class FileService {
  getFileContents(path: string): string {
    return fs.readFileSync(path, { encoding: "utf-8" })
  }
}
