import { DefaultPlayer } from './DefaultPlayer'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Clock, ClockController, TimeUpCallback } from '@typinghare/board-game-clock-core'

/**
 * @author James Chan
 */
export class DefaultClockController extends ClockController<DefaultPlayer> {
    protected override initializeClock(): Clock {
        const main: number = this._player.getSetting('main').value
        const initialTime: HourMinuteSecond = SlowHourMinuteSecond.ofSeconds(main)
        const timeUpCallback: TimeUpCallback = (): HourMinuteSecond | undefined => {
            this._player.clockTimeUp()
            return undefined
        }

        return new Clock(initialTime, timeUpCallback)
    }
}