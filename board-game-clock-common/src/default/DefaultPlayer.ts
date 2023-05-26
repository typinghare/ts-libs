import { DefaultClockController } from './DefaultClockController'
import { BoardGameSetting, Player } from '@typinghare/board-game-clock-core'

export type DefaultPlayerSettings = {
    // The main time in seconds.
    main: number
}

/**
 * @author James Chan
 */
export class DefaultPlayer extends Player<DefaultPlayerSettings> {
    override initialize(): void {
        this.addSetting('main', new BoardGameSetting(10, {
            type: 'time',
            label: 'Main Time',
            description: 'The main time in seconds',
        }))
    }

    override initializeClockController(): void {
        this._clockController = new DefaultClockController(this)
    }
}