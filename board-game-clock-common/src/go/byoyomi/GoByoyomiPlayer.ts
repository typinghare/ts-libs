import { GoByoyomiClockController } from './GoByoyomiClockController'
import { Player, PlayerExtraProperties, PlayerExtraPropertiesMap } from '@typinghare/board-game-clock-core'
import { CommonPlayerExtraPropertyProperties } from '../../global'
import { PlayerExtraProperty } from '@typinghare/board-game-clock-core'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

export type GoByoyomiPlayerSettings = {
    main: HourMinuteSecond,
    timePerPeriod: HourMinuteSecond,
    periods: number
}

export type GoByoyomiPlayerExtraProperties = PlayerExtraProperties | {
    remainingPeriods: number
}

export class GoByoyomiPlayer extends Player<GoByoyomiPlayerSettings, GoByoyomiPlayerExtraProperties, CommonPlayerExtraPropertyProperties> {
    override initialize(): void {
        this.addSetting('main', SlowHourMinuteSecond.ofMinutes(10), {
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

        this.addSetting('timePerPeriod', SlowHourMinuteSecond.ofSeconds(30), {
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

        this.addSetting('periods', 3, {
            type: 'number',
            label: 'Periods',
            description: 'The number of periods. The clock will stop running when all the periods have been used up or consumed.',
            options: [1, 3, 5, 10],
        })
    }

    override initializeClockController(): void {
        this._clockController = new GoByoyomiClockController(this)
    }

    override getExtraProperties(): PlayerExtraPropertiesMap<GoByoyomiPlayerExtraProperties, CommonPlayerExtraPropertyProperties> | null {
        const remainingPeriods: number = (this._clockController! as GoByoyomiClockController).remainingPeriods
        const remainingPeriodsProperty = new PlayerExtraProperty(remainingPeriods)
        remainingPeriodsProperty.setProperty('label', 'Remaining Periods')

        return {
            remainingPeriods: remainingPeriodsProperty,
        }
    }
}