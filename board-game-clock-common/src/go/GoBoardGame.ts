import { Player, PlayerSettings, TwoPlayerBoardGame } from '@typinghare/board-game-clock-core'
import { CommonPlayerExtraPropertyProperties } from '../global'

export type GoBoardGameSettings = {}

/**
 * Game of Go.
 */
export class GoBoardGame<
    P extends Player<S, any, CommonPlayerExtraPropertyProperties>,
    S extends PlayerSettings = any,
> extends TwoPlayerBoardGame<GoBoardGameSettings, P> {
}