import { DefaultPlayer } from './DefaultPlayer'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Clock, ClockController, TimeUpCallback } from '../main'

/**
 * @author James Chan
 */
export class DefaultClockController extends ClockController<DefaultPlayer> {
    protected override initializeClock(): Clock {
        const main: HourMinuteSecond = this._player.getSetting('main').value
        const timeUpCallback: TimeUpCallback = (): HourMinuteSecond | undefined => {
            this._player.clockTimeUp()
            return undefined
        }

        return new Clock(main, timeUpCallback)
    }
}