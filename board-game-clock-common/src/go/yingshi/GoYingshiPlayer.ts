import { GoYingshiClockController } from './GoYingshiClockController'
import {
    BoardGameSetting,
    Player,
    PlayerExtraProperties,
    PlayerExtraPropertiesMap,
} from '@typinghare/board-game-clock-core'
import { CommonPlayerExtraPropertyProperties } from '../../global'
import { PlayerExtraProperty } from '@typinghare/board-game-clock-core/dist/PlayerExtraProperty'

export type GoYingshiPlayerSettings = {
    main: number,
    penaltyTime: number,
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
        this.addSetting('main', new BoardGameSetting(7, {
            type: 'time',
            label: 'Main Time',
            description: 'The main time in seconds',
        }))

        this.addSetting('penaltyTime', new BoardGameSetting(4, {
            type: 'time',
            label: 'Penalty Time',
            description: 'The time of one penalty.',
        }))

        this.addSetting('maxPenalties', new BoardGameSetting(2, {
            type: 'number',
            label: 'Max Penalties',
            description: 'The maximum number of penalties.',
        }))
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