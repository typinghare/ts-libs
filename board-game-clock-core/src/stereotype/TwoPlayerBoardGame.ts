import { Player, PlayerSettings } from '../Player'
import { BoardGame, BoardGameSettings, PlayerClass } from '../BoardGame'
import { Role } from '../Role'

/**
 * Two player board game.
 * @author James Chan
 */
export class TwoPlayerBoardGame<G extends BoardGameSettings, P extends Player<S>, S extends PlayerSettings = any> extends BoardGame<G, P> {
    constructor(playerClass: PlayerClass<P>) {
        super([new Role('A'), new Role('B')], playerClass)
    }
}