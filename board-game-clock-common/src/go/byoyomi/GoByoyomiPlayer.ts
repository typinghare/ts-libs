import { GoByoyomiClockController } from './GoByoyomiClockController'
import { BoardGameSetting, Player, PlayerExtraProperties } from '@typinghare/board-game-clock-core'

export type GoByoyomiPlayerSettings = {
    main: number,
    timePerPeriod: number,
    periods: number
}

export type GoByoyomiPlayerExtraProperties = PlayerExtraProperties | {
    'Remaining Periods': number
}

export class GoByoyomiPlayer extends Player<GoByoyomiPlayerSettings> {
    override initialize(): void {
        this.addSetting('main', new BoardGameSetting(10, {
            type: 'time',
            label: 'Main Time',
            description: 'The main time in seconds',
        }))

        this.addSetting('timePerPeriod', new BoardGameSetting(5, {
            type: 'time',
            label: 'Time/Period',
            description: 'The time of one period.',
        }))

        this.addSetting('periods', new BoardGameSetting(3, {
            type: 'number',
            label: 'Periods',
            description: 'The number of periods.',
        }))
    }

    override initializeClockController(): void {
        this._clockController = new GoByoyomiClockController(this)
    }

    override getExtraProperties(): GoByoyomiPlayerExtraProperties {
        return {
            'Remaining Periods': (this._clockController as GoByoyomiClockController).remainingPeriods,
        }
    }
}