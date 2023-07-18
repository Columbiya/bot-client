export class Time {
  getMsFromMinutes(minutes: number) {
    return minutes * 60 * 1000
  }

  getMsFromHours(hours: number) {
    return hours * 60 * 60 * 1000
  }

  getMinutesFromMs(ms: number) {
    return Math.floor(ms / (1000 * 60))
  }

  getHoursFromMs(ms: number) {
    return Math.floor(this.getMinutesFromMs(ms) / 60)
  }

  getNowInUTC3(): Date {
    const now = new Date()
    const utc3Hours = now.getUTCHours() + 3
    now.setHours(utc3Hours)
    return now
  }

  // mm:ss
  transformStringIntoDate(dateString: string): Date {
    const [hours, minutes] = dateString.split(":")

    const date = this.getNowInUTC3()
    date.setHours(Number(hours))
    date.setMinutes(Number(minutes))

    return date
  }
}
