import { ChessStandardPlayer } from './ChessStandardPlayer'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Clock, ClockController } from '@typinghare/board-game-clock-core'

export class ChessStandardClockController extends ClockController<ChessStandardPlayer> {
    private _resumedTime?: HourMinuteSecond

    protected override initializeClock(): Clock {
        const main: number = this._player.getSetting('main').value
        const timeIncrement: number = this._player.getSetting('timeIncrement').value

        const clockController = this
        const initialTime = SlowHourMinuteSecond.ofSeconds(main)
        const timeUpCallback = function(): HourMinuteSecond | undefined {
            clockController._player.clockTimeUp()
            return undefined
        }

        const clock = new Clock(initialTime, timeUpCallback)
        clock.beforeResume = function(): void {
            clockController._resumedTime = this.time
        }
        clock.beforePause = function(): void {
            const currentTime: HourMinuteSecond = this.time
            const differenceInSeconds: number
                = (currentTime.ms - clockController._resumedTime!.ms) / HourMinuteSecond.MILLISECONDS_IN_SECOND

            if (differenceInSeconds > timeIncrement) {
                this.time.extend(timeIncrement)
            }

            clockController._resumedTime = undefined
        }

        return clock
    }
}