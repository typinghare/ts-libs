import { TimeControl } from '../../TimeControl'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { ClockController } from '../../ClockController'
import { Clock } from '../../Clock'
import { Player } from '../../Player'

export type GoByoyomiTimeControlSettings = {
    main: HourMinuteSecond,
    timePerPeriod: HourMinuteSecond,
    periods: number
}

export type GoByoyomiPlayerAttributes = {
    remainingPeriods: number
}

export class GoByoyomiTimeControl extends TimeControl<GoByoyomiTimeControlSettings> {
    protected override initializeSettings(): void {
        this.settings.addSetting('main', SlowHourMinuteSecond.ofMinutes(10), {
            type: 'time',
            label: 'Main Time',
            description: 'The initial allotted time for a player to make moves without any additional constraints.',
            options: [
                SlowHourMinuteSecond.ofMinutes(1),
                SlowHourMinuteSecond.ofMinutes(10),
                SlowHourMinuteSecond.ofMinutes(30),
                SlowHourMinuteSecond.ofMinutes(60),
                SlowHourMinuteSecond.ofMinutes(90),
            ],
        })

        this.settings.addSetting('timePerPeriod', SlowHourMinuteSecond.ofSeconds(30), {
            type: 'time',
            label: 'Time/Period',
            description: 'The time given for each subsequent phase after the main time runs out is reduced by one ' +
                'period. If a player completes their moves within the time limit of a period, the number of periods ' +
                'remains the same and the time for the next period is reset for the next turn.',
            options: [
                SlowHourMinuteSecond.ofSeconds(30),
                SlowHourMinuteSecond.ofSeconds(40),
                SlowHourMinuteSecond.ofSeconds(60),
            ],
        })

        this.settings.addSetting('periods', 3, {
            type: 'number',
            label: 'Periods',
            description: 'The number of periods. The clock will stop running when all the periods have been used up or consumed.',
            options: [1, 3, 5, 10],
        })
    }
}

export class GoByoyomiPlayer extends Player<GoByoyomiTimeControl, GoByoyomiTimeControlSettings, GoByoyomiPlayerAttributes> {
    protected override createClockController(): GoByoyomiClockController {
        return new GoByoyomiClockController(this)
    }

    protected override updateAttributes(): void {
        const remainingPeriods: number = (this.clockController as GoByoyomiClockController).remainingPeriods!
        this._attributes.addSetting('remainingPeriods', remainingPeriods, { label: 'Remaining Periods' })
    }
}

export class GoByoyomiClockController extends ClockController<GoByoyomiTimeControlSettings> {
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
        const settings = this._timeControl.settings
        const main: HourMinuteSecond = settings.getSetting('main').value
        const timePerPeriod: HourMinuteSecond = settings.getSetting('timePerPeriod').value
        this._remainingPeriods = settings.getSetting('periods').value

        const clockController = this
        return new Clock(main, function(): HourMinuteSecond | undefined {
            clockController._isEnterByoyomi = true

            if (clockController._remainingPeriods! > 1) {
                clockController._remainingPeriods!--
                return timePerPeriod
            } else {
                clockController._player.timeUp()
                return undefined
            }
        })
    }

    /**
     * Returns the remaining number of periods.
     */
    get remainingPeriods(): number {
        return this._remainingPeriods!
    }
}