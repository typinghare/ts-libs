import { BoardGame } from '../../BoardGame'
import { DefaultPlayer } from './DefaultPlayer'
import { Role } from '../../Role'

/**
 * Two-player board game.
 * @author James Chan
 */
export class DefaultBoardGame extends BoardGame<DefaultPlayer> {
    constructor() {
        super([new Role('A'), new Role('B')], DefaultPlayer)
    }

    /**
     * @override
     */
    clockTimeUp(role: Role): void {
        super.clockTimeUp(role)
        console.log("Clock is time up: " + role.toString())
    }
}