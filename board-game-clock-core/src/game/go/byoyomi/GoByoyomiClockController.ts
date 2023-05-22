import { ClockController } from '../../../ClockController'
import { Clock, TimeUpCallback } from '../../../Clock'
import { GoByoyomiPlayer } from './GoByoyomiPlayer'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

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

    /**
     * @override
     * @protected
     */
    protected initializeClock(): Clock {
        const main: number = this._player.getSettingValue('main')
        const timePerPeriod: number = this._player.getSettingValue('timePerPeriod')
        this._remainingPeriods = this._player.getSettingValue('periods')

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