import { Player } from '../../Player'
import { BoardGameClockSetting } from '../../BoardGameClockSetting'
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
        const mainSetting: BoardGameClockSetting<number> = new BoardGameClockSetting(60)
        mainSetting.setProperty('label', 'Main')
        mainSetting.setProperty('description', 'The main time in seconds.')

        this.addSetting('main', mainSetting)
    }

    /**
     * @override
     */
    initializeClockController(): void {
        this._clockController = new DefaultClockController(this)
    }
}