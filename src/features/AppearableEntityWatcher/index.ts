import { lunarVisionNotificationsChannelId } from "@/clients/DiscordBotClient/lunarVisionNotificationsChannelId"
import { Time, WordCase } from "@/helpers"
import { AppearableEntity, AppearableWatcher, BotClient } from "@/interfaces"
import { AppearTime } from "@/types"

export class AppearableEntityWatcher implements AppearableWatcher {
  declare ref: NodeJS.Timer

  private notificationPoints: [number, number] = [30, 10]
  time = new Time()
  wordCase = new WordCase()

  constructor(
    private readonly entity: AppearableEntity,
    private readonly threshold: number,
    private readonly client: BotClient
  ) {}

  didAppear(): boolean {
    const todayAppearanceSchedule = this.getAppearanceSchedule()
    const lastTimeOfAppear = this.findLastTime(
      this.time.getNowInUTC3(),
      todayAppearanceSchedule
    )

    if (!lastTimeOfAppear) return false

    const lastTimeDate = this.time.transformStringIntoDate(lastTimeOfAppear)
    const now = this.time.getNowInUTC3()

    return Number(now) - Number(lastTimeDate) < this.threshold
  }

  private getAppearanceSchedule(date?: Date): AppearTime {
    let now = this.time.getNowInUTC3()

    if (date) {
      now = date
    }

    const todayWeekDay = now.getDay()
    const todayAppearanceSchedule = this.entity.appearTime[todayWeekDay]

    return todayAppearanceSchedule
  }

  private findLastTime(now: Date, schedule: AppearTime): string | null {
    let lastTime = null

    const hours = now.getHours()
    const minutes = now.getMinutes()

    for (let i = 0; i < schedule.length; i++) {
      const [scheduleHours, scheduleMinutes] = schedule[i].split(":")

      if (
        hours > Number(scheduleHours) ||
        (hours === Number(scheduleHours) && Number(scheduleMinutes) <= minutes)
      ) {
        break
      }

      lastTime = schedule[i]
    }

    return lastTime
  }

  nextTimeToAppear(): Date | null {
    const todayAppearanceSchedule = this.getAppearanceSchedule()
    const now = this.time.getNowInUTC3()

    let nextTime = this.findNextTime(now, todayAppearanceSchedule)

    if (!nextTime) {
      // TODO refactor this
      now.setDate(now.getDate() + 1)
      nextTime = this.getAppearanceSchedule(now)[0]

      const nextTimeDate = this.time.transformStringIntoDate(nextTime)
      now.setHours(nextTimeDate.getHours())
      now.setMinutes(nextTimeDate.getMinutes())

      return now
    }

    const nextTimeDate = this.time.transformStringIntoDate(nextTime)
    return nextTimeDate
  }

  private findNextTime(now: Date, schedule: AppearTime): string | null {
    let nearest = null

    const hours = now.getHours()
    const minutes = now.getMinutes()

    for (let i = 0; i < schedule.length; i++) {
      const [scheduleHours, scheduleMinutes] = schedule[i].split(":")

      if (
        hours < Number(scheduleHours) ||
        (hours === Number(scheduleHours) && Number(scheduleMinutes) >= minutes)
      ) {
        nearest = schedule[i]
        break
      }
    }

    return nearest
  }

  startWatching(): void {
    this.ref = setInterval(
      this.checkAppearance.bind(this),
      this.time.getMsFromMinutes(1)
    )
  }

  stopWatching(): void {
    throw new Error("not implemented")
  }

  private async checkAppearance() {
    const appearsIn = this.leftTimeToAppearInMs()
    if (!appearsIn) return

    const minutesLeftToAppear = this.time.getMinutesFromMs(appearsIn)

    console.log(minutesLeftToAppear, this.entity.getEntityName())

    if (!this.notificationPoints.includes(minutesLeftToAppear)) return

    this.sendNotification(this.makeMessage(minutesLeftToAppear))
  }

  leftTimeToAppearInMs(): number | null {
    const nextTime = this.nextTimeToAppear()

    if (!nextTime) return null

    return Math.abs(Number(nextTime) - Number(this.time.getNowInUTC3()))
  }

  private sendNotification(content: string) {
    return this.client.api.channels.createMessage(
      lunarVisionNotificationsChannelId,
      {
        content,
      }
    )
  }

  private makeMessage(leftTimeInMinutes: number) {
    const units: [string, string, string] = ["минута", "минуты", "минут"]

    return `${this.entity.getEntityName()} появляется через ${leftTimeInMinutes} ${this.wordCase.getWordCaseByNumber(
      leftTimeInMinutes,
      units
    )}`
  }
}
