import {
    BoardGameSetting,
    Player,
    PlayerClass,
    PlayerExtraProperties,
    PlayerSettings,
    TwoPlayerBoardGame,
} from '@typinghare/board-game-clock-core'
import { CommonPlayerExtraPropertyProperties } from '../global'

export type GoBoardGameSettings = {
    synchronizePlayerSettings: boolean
}

/**
 * Game of Go.
 */
export class GoBoardGame<
    P extends Player<S, PlayerExtraProperties, CommonPlayerExtraPropertyProperties>,
    S extends PlayerSettings = PlayerSettings,
> extends TwoPlayerBoardGame<GoBoardGameSettings, P> {
    constructor(playerClass: PlayerClass<P, S>) {
        super(playerClass)

        this.addSetting('synchronizePlayerSettings', new BoardGameSetting(true, {
            type: 'bool',
            label: 'Synchronize Player Settings',
            description: 'When this setting is enabled, the settings of both players will be synchronized.',
        }))
    }
}