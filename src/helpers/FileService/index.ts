import * as fs from "fs"

export class FileService {
  async getFileContents(path: string): Promise<string> {
    let content = ""

    await fs.readFile(path, "utf-8", (err, data) => {
      if (err) throw new Error(err.message)

      content = data
    })

    return content
  }
}
