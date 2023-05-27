import { Player, PlayerExtraProperties, PlayerSettings, TwoPlayerBoardGame } from '@typinghare/board-game-clock-core'
import { CommonBoardGameSettings, CommonPlayerExtraPropertyProperties } from '../global'

export type ChessBoardGameSettings = CommonBoardGameSettings & {}

/**
 * Chess.
 * @author James Chan
 */
export class ChessBoardGame<
    G extends ChessBoardGameSettings,
    P extends Player<S, PlayerExtraProperties, CommonPlayerExtraPropertyProperties>,
    S extends PlayerSettings = PlayerSettings,
> extends TwoPlayerBoardGame<G, P> {
    override initialize(): void {
        this.addSetting('synchronizePlayerSettings', true, {
            type: 'bool',
            label: 'Synchronize Player Settings',
            description: 'When this setting is enabled, the settings of both players will be synchronized.',
        })
    }
}