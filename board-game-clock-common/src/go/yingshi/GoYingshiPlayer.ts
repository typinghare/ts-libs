import { GoYingshiClockController } from './GoYingshiClockController'
import { BoardGameSetting, Player } from '@typinghare/board-game-clock-core'

export type GoYingshiPlayerSettings = {
    main: number,
    penaltyTime: number,
    maxPenalties: number
}

/**
 * Yingshi Cup time control. (应氏杯规则)
 */
export class GoYingshiPlayer extends Player<GoYingshiPlayerSettings> {
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

        this.addSetting('maxPenalties', new BoardGameSetting(3, {
            type: 'number',
            label: 'Max Penalties',
            description: 'The maximum number of penalties.',
        }))
    }

    override initializeClockController(): void {
        this._clockController = new GoYingshiClockController(this)
    }
}