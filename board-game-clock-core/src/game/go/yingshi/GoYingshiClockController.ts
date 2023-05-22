import { Clock, ClockController, TimeUpCallback } from '../../../main'
import { GoYingshiPlayer } from './GoYingshiPlayer'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

export class GoYingshiClockController extends ClockController<GoYingshiPlayer> {
    private _remainingPenalties: number = 0

    protected initializeClock(): Clock {
        const main: number = this._player.getSettingValue('main')
        const penaltyTime: number = this._player.getSettingValue('penaltyTime')
        const maxPenalties: number = this._player.getSettingValue('maxPenalties')

        const clockController = this
        const initialTime: HourMinuteSecond = SlowHourMinuteSecond.ofSeconds(main)

        const timeUpCallback: TimeUpCallback = function(): HourMinuteSecond | undefined {
            if (clockController._remainingPenalties < maxPenalties) {
                clockController._remainingPenalties++
                return SlowHourMinuteSecond.ofSeconds(penaltyTime)
            } else {
                clockController._player.clockTimeUp()
                return undefined
            }
        }

        return new Clock(initialTime, timeUpCallback)
    }
}