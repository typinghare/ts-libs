import { ClockController } from '../../ClockController'
import { DefaultPlayer } from './DefaultPlayer'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Clock, TimeUpCallback } from '../../Clock'

/**
 * @author James Chan
 */
export class DefaultClockController extends ClockController<DefaultPlayer> {
    constructor(player: DefaultPlayer) {
        super(player)
    }

    /**
     * @override
     * @protected
     */
    protected initializeClock(): Clock {
        const main: number = this._player.getSettingValue('main')
        const initialTime: HourMinuteSecond = new SlowHourMinuteSecond(main * HourMinuteSecond.MILLISECONDS_IN_SECOND)
        const timeUpCallback: TimeUpCallback = (): HourMinuteSecond | undefined => {
            this._player.clockTimeUp()
            return undefined
        }

        return new Clock(initialTime, timeUpCallback)
    }
}