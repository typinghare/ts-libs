import { Player, PlayerExtraProperties, PlayerSettings, TwoPlayerBoardGame } from '@typinghare/board-game-clock-core'
import { CommonBoardGameSettings, CommonPlayerExtraPropertyProperties } from '../global'

export type GoBoardGameSettings = CommonBoardGameSettings & {}

/**
 * Game of Go.
 */
export class GoBoardGame<
    G extends GoBoardGameSettings,
    P extends Player<S, PlayerExtraProperties, CommonPlayerExtraPropertyProperties>,
    S extends PlayerSettings = PlayerSettings,
> extends TwoPlayerBoardGame<G, P, S> {
    override initialize(): void {
        this.addSetting('synchronizePlayerSettings', true, {
            type: 'bool',
            label: 'Synchronize Player Settings',
            description: 'When this setting is enabled, the settings of both players will be synchronized.',
        })
    }
}