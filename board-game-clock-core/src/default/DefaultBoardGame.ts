import { DefaultPlayer } from './DefaultPlayer'
import { TwoPlayerBoardGame } from '../main'

export type DefaultBoardGameSettings = {}

/**
 * Two-player board game.
 * @author James Chan
 */
export class DefaultBoardGame extends TwoPlayerBoardGame<DefaultBoardGameSettings, DefaultPlayer> {
    constructor() {
        super(DefaultPlayer)
    }
}