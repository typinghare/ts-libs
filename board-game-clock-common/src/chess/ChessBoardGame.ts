import {
    BoardGameSetting,
    Player,
    PlayerClass,
    PlayerSettings,
    TwoPlayerBoardGame,
} from '@typinghare/board-game-clock-core'
import { CommonBoardGameSettings } from '../global'

export type ChessBoardGameSettings = CommonBoardGameSettings & {}

/**
 * Chess.
 * @author James Chan
 */
export class ChessBoardGame<P extends Player<S>, S extends PlayerSettings = any>
    extends TwoPlayerBoardGame<ChessBoardGameSettings, P> {
    constructor(playerClass: PlayerClass<P, S>) {
        super(playerClass)

        this.addSetting('synchronizePlayerSettings', new BoardGameSetting(true, {
            type: 'bool',
            label: 'Synchronize Player Settings',
            description: 'When this setting is enabled, the settings of both players will be synchronized.',
        }))
    }
}