import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Player } from '../../Player'
import { TimeControl } from '../../TimeControl'
import { ClockController } from '../../ClockController'
import { Clock } from '../../Clock'

export type ChessStandardTimeControlSettings = {
    // The main time.
    main: HourMinuteSecond,

    // The time increment.
    timeIncrement: HourMinuteSecond
}

export type ChessStandardPlayerAttributes = {
    timeUsed: number
}

/**
 * Chess standard time control.
 * @author James Chan
 */
export class ChessStandardTimeControl extends TimeControl<ChessStandardTimeControlSettings> {
    protected override initializeSettings(): void {
        this.settings.addSetting('main', SlowHourMinuteSecond.ofMinutes(30), {
            type: 'time',
            label: 'Main Time',
            description: 'The initial allotted time a player has to make their moves in a chess game without any ' +
                'additional time added after each move. It is the baseline time available for a player to consider ' +
                'their moves.',
            options: [
                SlowHourMinuteSecond.ofMinutes(30),
                SlowHourMinuteSecond.ofMinutes(60),
                SlowHourMinuteSecond.ofMinutes(90),
            ],
        })

        this.settings.addSetting('timeIncrement', SlowHourMinuteSecond.ofSeconds(20), {
            type: 'time',
            label: 'Time Increment',
            description: 'An additional amount of time added to a player\'s clock after each move. It provides a ' +
                'small increase in the available time for a player to make their moves, helping to prevent time ' +
                'pressure as each move grants a time boost.',
            options: [
                SlowHourMinuteSecond.ofSeconds(20),
                SlowHourMinuteSecond.ofSeconds(30),
                SlowHourMinuteSecond.ofSeconds(40),
            ],
        })
    }
}

export class ChessStandardPlayer extends Player<
    ChessStandardTimeControl,
    ChessStandardTimeControlSettings,
    ChessStandardPlayerAttributes
> {
    protected override createClockController(): ChessStandardClockController {
        return new ChessStandardClockController(this)
    }

    protected override updateAttributes(): void {
        const usedTimeInRound = (this.clockController as ChessStandardClockController).usedTimeInRound
        this._attributes.addSetting('timeUsed', usedTimeInRound, {
            label: 'Used Time',
        })
    }
}

export class ChessStandardClockController extends ClockController<ChessStandardTimeControlSettings> {
    private _resumedTime?: HourMinuteSecond

    private _timeIncrement?: HourMinuteSecond

    protected override initializeClock(): Clock {
        const settings = this._timeControl.settings
        const main: HourMinuteSecond = settings.getSetting('main').value
        this._timeIncrement = settings.getSetting('timeIncrement').value

        const clockController = this
        const timeUpCallback = function(): HourMinuteSecond | undefined {
            clockController._player.timeUp()

            // clear before pause
            clock.beforePause = undefined

            return undefined
        }

        const clock = new Clock(main, timeUpCallback)
        clock.beforeResume = function(): void {
            clockController._resumedTime = this.time
        }
        clock.beforePause = function(): void {
            try {
                const differenceInMs: number = clockController._resumedTime!.ms - this.time.ms
                if (differenceInMs > clockController._timeIncrement!.ms) {
                    this.prototypeTime.extend(clockController._timeIncrement!)
                }
            } catch (ignore) {
            }

            clockController._resumedTime = undefined
        }

        return clock
    }

    /**
     * Used time in seconds in this round.
     */
    get usedTimeInRound(): number {
        if (this._resumedTime === undefined) return 0

        const currentTime = this._clock.time.ms
        return Math.floor((this._resumedTime.ms - currentTime) / HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }
}