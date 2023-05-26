import { ChessStandardClockController } from './ChessStandardClockController'
import { BoardGameSetting, Player } from '@typinghare/board-game-clock-core'

export type StandardPlayerSettings = {
    // The main time in seconds.
    main: number,

    // The time increment in seconds.
    timeIncrement: number
}

/**
 * Standard time control.
 */
export class ChessStandardPlayer extends Player<StandardPlayerSettings> {
    initialize(): void {
        this.addSetting('main', new BoardGameSetting(5, {
            label: 'Main',
            description: 'The main time in seconds',
        }))

        this.addSetting('timeIncrement', new BoardGameSetting(5, {
            label: 'Time Increment',
            description: 'The time increment in seconds',
        }))
    }

    initializeClockController(): void {
        this._clockController = new ChessStandardClockController(this)
    }
}