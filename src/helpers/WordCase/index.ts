export class WordCase {
  getWordCaseByNumber(num: number, units: [string, string, string]) {
    if (num % 100 >= 11 && num % 100 <= 19) return units[2]

    switch (num % 10) {
      case 1:
        return units[0]
      case 2:
      case 3:
      case 4:
        return units[1]
      default:
        return units[2]
    }
  }
}
