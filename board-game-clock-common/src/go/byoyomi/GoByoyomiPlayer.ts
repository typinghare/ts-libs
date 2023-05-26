import { GoByoyomiClockController } from './GoByoyomiClockController'
import { BoardGameSetting, Player } from '@typinghare/board-game-clock-core'

export type GoByoyomiPlayerSettings = {
    main: number,
    timePerPeriod: number,
    periods: number
}

export class GoByoyomiPlayer extends Player<GoByoyomiPlayerSettings> {
    override initialize(): void {
        this.addSetting('main', new BoardGameSetting(8, {
            label: 'Main',
            description: 'The main time in seconds',
        }))

        this.addSetting('timePerPeriod', new BoardGameSetting(5, {
            label: 'Time/Period',
            description: 'The time of one period.',
        }))

        this.addSetting('periods', new BoardGameSetting(3, {
            label: 'Periods',
            description: 'The number of periods.',
        }))
    }

    override initializeClockController(): void {
        this._clockController = new GoByoyomiClockController(this)
    }
}