import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { TimeControl } from '../../TimeControl'
import { Player } from '../../Player'
import { ClockController } from '../../ClockController'
import { Clock } from '../../Clock'

export type GoYingshiTimeControlSettings = {
    main: HourMinuteSecond,
    penaltyTime: HourMinuteSecond,
    maxPenalties: number
}

export type GoYingshiPlayerAttributes = {
    penaltiesUsed: number
}

export class GoYingshiTimeControl extends TimeControl<GoYingshiTimeControlSettings> {
    protected override initializeSettings(): void {
        this.settings.addSetting('main', SlowHourMinuteSecond.ofMinutes(30), {
            type: 'time',
            label: 'Main Time',
            description: 'The initial allotted time for a player to make moves without any additional constraints.',
            options: [
                SlowHourMinuteSecond.ofMinutes(30),
                SlowHourMinuteSecond.ofMinutes(60),
                SlowHourMinuteSecond.ofMinutes(90),
            ],
        })

        this.settings.addSetting('penaltyTime', SlowHourMinuteSecond.ofMinutes(20), {
            type: 'time',
            label: 'Penalty Time',
            description: 'The time of one penalty. Once the main time has elapsed, penalty time will be activated and used.',
            options: [
                SlowHourMinuteSecond.ofMinutes(20),
                SlowHourMinuteSecond.ofMinutes(30),
                SlowHourMinuteSecond.ofMinutes(40),
            ],
        })

        this.settings.addSetting('maxPenalties', 2, {
            type: 'number',
            label: 'Max Penalties',
            description: 'The maximum number of penalties. The clock of a player stops when they have reached the ' +
                'maximum number of penalties.',
            options: [1, 2, 3],
        })
    }
}

export class GoYingshiPlayer extends Player<GoYingshiTimeControl, GoYingshiTimeControlSettings, GoYingshiPlayerAttributes> {
    protected override createClockController(): GoYingshiClockController {
        return new GoYingshiClockController(this)
    }

    protected override updateAttributes(): void {
        const remainingPeriods: number = (this.clockController as GoYingshiClockController).penaltiesUsed!
        this._attributes.addSetting('penaltiesUsed', remainingPeriods, { label: 'Penalties Used' })
    }
}

export class GoYingshiClockController extends ClockController<GoYingshiTimeControlSettings> {
    private _penaltiesUsed: number = 0

    protected override initializeClock(): Clock {
        const settings = this._timeControl.settings
        const main: HourMinuteSecond = settings.getSetting('main').value
        const penaltyTime: HourMinuteSecond = settings.getSetting('penaltyTime').value
        const maxPenalties: number = settings.getSetting('maxPenalties').value

        const clockController = this
        return new Clock(main, function(): HourMinuteSecond | undefined {
            if (clockController._penaltiesUsed < maxPenalties) {
                clockController._penaltiesUsed++
                return penaltyTime
            } else {
                clockController._player.timeUp()
                return undefined
            }
        })
    }

    get penaltiesUsed(): number {
        return this._penaltiesUsed
    }
}