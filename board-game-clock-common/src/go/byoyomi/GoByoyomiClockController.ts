import { GoByoyomiPlayer } from './GoByoyomiPlayer'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Clock, ClockController, TimeUpCallback } from '@typinghare/board-game-clock-core'

export class GoByoyomiClockController extends ClockController<GoByoyomiPlayer> {
    /**
     * The remaining number of periods.
     * @private
     */
    private _remainingPeriods?: number

    /**
     * Whether the player has enters byoyomi phase.
     * @private
     */
    private _isEnterByoyomi: boolean = false

    protected override initializeClock(): Clock {
        const main: number = this._player.getSetting('main').value
        const timePerPeriod: number = this._player.getSetting('timePerPeriod').value
        this._remainingPeriods = this._player.getSetting('periods').value

        const clockController = this
        const initialTime: HourMinuteSecond = SlowHourMinuteSecond.ofSeconds(main)

        const timeUpCallback: TimeUpCallback = function(): HourMinuteSecond | undefined {
            clockController._isEnterByoyomi = true

            if (clockController._remainingPeriods! > 1) {
                clockController._remainingPeriods!--
                return SlowHourMinuteSecond.ofSeconds(timePerPeriod)
            } else {
                clockController._player.clockTimeUp()
                return undefined
            }
        }

        const clock = new Clock(initialTime, timeUpCallback)
        clock.beforeResume = function(): void {
            if (clockController._isEnterByoyomi) {
                this.time = SlowHourMinuteSecond.ofSeconds(timePerPeriod)
            }
        }

        return clock
    }

    /**
     * Returns the remaining number of periods.
     */
    get remainingPeriods(): number {
        return this._remainingPeriods!
    }
}