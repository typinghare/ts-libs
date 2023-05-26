import { DefaultClockController } from './DefaultClockController'
import { BoardGameSetting, Player } from '@typinghare/board-game-clock-core'
import {
    PlayerExtraProperty,
    PlayerExtraPropertyProperties,
} from '@typinghare/board-game-clock-core/dist/PlayerExtraProperty'

export type DefaultPlayerExtraPropertyProperties = PlayerExtraPropertyProperties & {}

export type DefaultPlayerExtraProperties = {
    isRunning: boolean
}

export type DefaultPlayerSettings = {
    // The main time in seconds.
    main: number
}

/**
 * @author James Chan
 */
export class DefaultPlayer extends Player<DefaultPlayerSettings, DefaultPlayerExtraProperties, DefaultPlayerExtraPropertyProperties> {
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

    override getExtraProperties() {
        const extraProperty
            = new PlayerExtraProperty<boolean, DefaultPlayerExtraPropertyProperties>(this.clockController.isClockRunning())
        extraProperty.setProperty('label', 'Running')

        return { 'isRunning': extraProperty }
    }
}