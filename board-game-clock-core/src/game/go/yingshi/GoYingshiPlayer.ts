import { BoardGameSetting, Player } from '../../../main'
import { GoYingshiClockController } from './GoYingshiClockController'

export type GoYingshiPlayerSettings = {
    main: number,
    penaltyTime: number,
    maxPenalties: number
}

export class GoYingshiPlayer extends Player<GoYingshiPlayerSettings> {
    /**
     * @override
     */
    initialize(): void {
        this.addSetting('main', new BoardGameSetting(7, {
            label: 'Main',
            description: 'The main time in seconds',
        }))

        this.addSetting('penaltyTime', new BoardGameSetting(4, {
            label: 'Penalty Time',
            description: 'The time of one penalty.',
        }))

        this.addSetting('maxPenalties', new BoardGameSetting(3, {
            label: 'Max Penalties',
            description: 'The maximum number of penalties.',
        }))
    }

    /**
     * @override
     */
    initializeClockController(): void {
        this._clockController = new GoYingshiClockController(this)
    }
}