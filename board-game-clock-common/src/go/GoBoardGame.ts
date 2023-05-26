import { Player, PlayerSettings, TwoPlayerBoardGame } from '@typinghare/board-game-clock-core'

export type GoBoardGameSettings = {}

/**
 * Game of Go.
 */
export class GoBoardGame<P extends Player<S>, S extends PlayerSettings = any> extends TwoPlayerBoardGame<GoBoardGameSettings, P> {
}