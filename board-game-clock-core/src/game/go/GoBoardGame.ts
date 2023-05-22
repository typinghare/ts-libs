import { BoardGame, Player, PlayerClass, PlayerSettings } from '../../main'
import { Role } from '../../Role'

/**
 * Game of Go.
 */
export class GoBoardGame<P extends Player<S>, S extends PlayerSettings = any> extends BoardGame<P> {
    /**
     * @override
     * @param playerClass
     */
    constructor(playerClass: PlayerClass<P>) {
        super([new Role('A'), new Role('B')], playerClass)
    }
}