import { GoYingshiClockController } from './GoYingshiClockController'
import {
    Player,
    PlayerExtraProperties,
    PlayerExtraPropertiesMap,
    PlayerExtraProperty,
} from '@typinghare/board-game-clock-core'
import { CommonPlayerExtraPropertyProperties } from '../../global'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

export type GoYingshiPlayerSettings = {
    main: HourMinuteSecond,
    penaltyTime: HourMinuteSecond,
    maxPenalties: number
}

export type GoYingshiPlayerExtraProperties = PlayerExtraProperties | {
    penaltiesUsed: number
}

/**
 * Yingshi Cup time control. (应氏杯规则)
 */
export class GoYingshiPlayer extends Player<GoYingshiPlayerSettings, GoYingshiPlayerExtraProperties, CommonPlayerExtraPropertyProperties> {
    override initialize(): void {
        this.addSetting('main', SlowHourMinuteSecond.ofMinutes(30), {
            type: 'time',
            label: 'Main Time',
            description: 'The initial allotted time for a player to make moves without any additional constraints.',
            options: [
                SlowHourMinuteSecond.ofMinutes(30),
                SlowHourMinuteSecond.ofMinutes(60),
                SlowHourMinuteSecond.ofMinutes(90),
            ],
        })

        this.addSetting('penaltyTime', SlowHourMinuteSecond.ofMinutes(20), {
            type: 'time',
            label: 'Penalty Time',
            description: 'The time of one penalty. Once the main time has elapsed, penalty time will be activated and used.',
            options: [
                SlowHourMinuteSecond.ofMinutes(20),
                SlowHourMinuteSecond.ofMinutes(30),
                SlowHourMinuteSecond.ofMinutes(40),
            ],
        })

        this.addSetting('maxPenalties', 2, {
            type: 'number',
            label: 'Max Penalties',
            description: 'The maximum number of penalties. The clock of a player stops when they have reached the ' +
                'maximum number of penalties.',
            options: [1, 2, 3],
        })
    }

    override initializeClockController(): void {
        this._clockController = new GoYingshiClockController(this)
    }

    override getExtraProperties(): PlayerExtraPropertiesMap<GoYingshiPlayerExtraProperties, CommonPlayerExtraPropertyProperties> | null {
        const penaltiesUsed: number = (this._clockController! as GoYingshiClockController).penaltiesUsed
        const penaltiesUsedProperty = new PlayerExtraProperty(penaltiesUsed)
        penaltiesUsedProperty.setProperty('label', 'Penalties Used')

        return {
            penaltiesUsed: penaltiesUsedProperty,
        }
    }
}