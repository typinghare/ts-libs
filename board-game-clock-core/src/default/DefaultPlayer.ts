import { DefaultClockController } from './DefaultClockController'
import { BoardGameSetting, Player, PlayerExtraProperties } from '../main'

export type DefaultPlayerSettings = {
    // The main time in seconds.
    main: number
}

/**
 * @author James Chan
 */
export class DefaultPlayer extends Player<DefaultPlayerSettings> {
    override initialize(): void {
        this.addSetting('main', new BoardGameSetting(30, {
            type: 'time',
            label: 'Main',
            description: 'The main time in seconds',
        }))
    }

    override initializeClockController(): void {
        this._clockController = new DefaultClockController(this)
    }

    override getExtraProperties(): PlayerExtraProperties {
        return { 'isRunning': this.clockController.isClockRunning() ? 'true' : 'false' }
    }
}