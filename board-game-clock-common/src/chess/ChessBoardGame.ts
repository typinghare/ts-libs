import { Player, PlayerSettings, TwoPlayerBoardGame } from '@typinghare/board-game-clock-core'

export type ChessBoardGameSettings = {}

/**
 * Chess.
 * @author James Chan
 */
export class ChessBoardGame<P extends Player<S>, S extends PlayerSettings = any>
    extends TwoPlayerBoardGame<ChessBoardGameSettings, P> {
}