import { DefaultPlayer } from './DefaultPlayer'
import { BoardGame, Role } from '../main'

export type DefaultBoardGameSettings = {}

/**
 * Two-player board game.
 * @author James Chan
 */
export class DefaultBoardGame extends BoardGame<DefaultBoardGameSettings, DefaultPlayer> {
    constructor() {
        super([new Role('A'), new Role('B')], DefaultPlayer)
    }
}