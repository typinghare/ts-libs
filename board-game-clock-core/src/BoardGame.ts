import { Player, PlayerSettings } from './Player'
import { Role } from './Role'
import { RoleNotFoundException } from './exception/RoleNotFoundException'

export type PlayerClass<P extends Player<any>> = new (role: Role, boardGame: BoardGame<P>) => P;

/**
 * Abstract board game.
 * @author James Chan.
 */
export abstract class BoardGame<P extends Player<S>, S extends PlayerSettings = any> {
    /**
     * Roles
     * @protected
     */
    protected readonly _roleArray: Role[]

    /**
     * Mapping of (Role => player).
     * @protected
     */
    protected readonly _rolePlayerMap: Map<Role, P> = new Map()

    /**
     * Creates a board game.
     * @param roleArray an array of roles participating in this board game.
     * @param playerClass the class of the player.
     * @protected
     */
    protected constructor(roleArray: Role[], playerClass: PlayerClass<P>) {
        this._roleArray = roleArray

        // Initialize players.
        for (const role of roleArray) {
            const player: P = new playerClass(role, this)
            player.initialize()

            this._rolePlayerMap.set(role, player)
        }
    }

    /**
     * Returns the array of roles.
     */
    getRoleArray(): Role[] {
        return this._roleArray
    }

    /**
     * Returns the next role.
     * @param role current role.
     */
    getNextRole(role: Role): Role {
        const roleIndex: number = this._roleArray.indexOf(role)
        if (roleIndex === -1) {
            throw new RoleNotFoundException(role)
        }

        return this._roleArray[(roleIndex + 1) % this._roleArray.length]
    }

    /**
     * Gets a player.
     * @param role
     */
    getPlayer(role: Role): P {
        if (!this._rolePlayerMap.has(role)) {
            throw new RoleNotFoundException(role)
        }

        return this._rolePlayerMap.get(role)!
    }

    /**
     * Starts this board game.
     */
    start(): void {
        // Initializes clock controllers for all players.
        for (const player of this._rolePlayerMap.values()) {
            player.initializeClockController()
        }
    }

    /**
     * This function is invoked when one of the player's clock is time up.
     * @param role
     */
    abstract clockTimeUp(role: Role): void;
}