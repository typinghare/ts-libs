import { GoYingshiPlayer } from './GoYingshiPlayer'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Clock, ClockController, TimeUpCallback } from '@typinghare/board-game-clock-core'

export class GoYingshiClockController extends ClockController<GoYingshiPlayer> {
    private _penaltiesUsed: number = 0

    protected override initializeClock(): Clock {
        const main: HourMinuteSecond = this._player.getSetting('main').value
        const penaltyTime: HourMinuteSecond = this._player.getSetting('penaltyTime').value
        const maxPenalties: number = this._player.getSetting('maxPenalties').value

        const clockController = this
        const timeUpCallback: TimeUpCallback = function(): HourMinuteSecond | undefined {
            if (clockController._penaltiesUsed < maxPenalties) {
                clockController._penaltiesUsed++
                return penaltyTime
            } else {
                clockController._player.clockTimeUp()
                return undefined
            }
        }

        return new Clock(main, timeUpCallback)
    }

    get penaltiesUsed(): number {
        return this._penaltiesUsed
    }
}