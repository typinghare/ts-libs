import { DefaultPlayer } from './DefaultPlayer'
import { BoardGame, Role } from '@typinghare/board-game-clock-core'

export type DefaultBoardGameSettings = {}

/**
 * Two-player board game. This class is only for local test.
 * @author James Chan
 */
export class DefaultBoardGame extends BoardGame<DefaultBoardGameSettings, DefaultPlayer> {
    constructor() {
        super([new Role('A'), new Role('B')], DefaultPlayer)
    }
}