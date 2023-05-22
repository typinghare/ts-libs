import { Player } from '../../Player'
import { BoardGameSetting } from '../../BoardGameSetting'
import { DefaultClockController } from './DefaultClockController'

export type DefaultPlayerSettings = {
    // The main time in seconds.
    main: number
}

/**
 * @author James Chan
 */
export class DefaultPlayer extends Player<DefaultPlayerSettings> {
    /**
     * @override
     */
    initialize(): void {
        this.addSetting('main', new BoardGameSetting(10, {
            label: 'Main',
            description: 'The main time in seconds',
        }))
    }

    /**
     * @override
     */
    initializeClockController(): void {
        this._clockController = new DefaultClockController(this)
    }
}