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
    P extends Player<PS, PE, PP>,
    PS extends PlayerSettings = PlayerSettings,
    PE extends PlayerExtraProperties = PlayerExtraProperties,
    PP extends PlayerExtraPropertyProperties = PlayerExtraPropertyProperties,
> extends BoardGame<G, P, PS, PE, PP> {
    constructor(playerClass: PlayerClass<P, PS, PE, PP>) {
        super([new Role('A'), new Role('B')], playerClass)
    }
}