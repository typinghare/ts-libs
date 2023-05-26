import { Player, PlayerExtraProperties, PlayerSettings } from '../Player'
import { BoardGame, BoardGameSettings, PlayerClass } from '../BoardGame'
import { Role } from '../Role'
import { PlayerExtraPropertyProperties } from '../PlayerExtraProperty'

/**
 * Two player board game.
 * @author James Chan
 */
export class TwoPlayerBoardGame<
    G extends BoardGameSettings,
    P extends Player<S, PE, PP>,
    S extends PlayerSettings = any,
    PE extends PlayerExtraProperties = PlayerExtraProperties,
    PP extends PlayerExtraPropertyProperties = any,
> extends BoardGame<G, P, S, PE, PP> {
    constructor(playerClass: PlayerClass<P, S, PE, PP>) {
        super([new Role('A'), new Role('B')], playerClass)
    }
}