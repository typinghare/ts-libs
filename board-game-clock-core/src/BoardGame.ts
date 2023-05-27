import { Player, PlayerExtraProperties, PlayerSettings } from './Player'
import { Role } from './Role'
import { RoleNotFoundException } from './exception/RoleNotFoundException'
import { PlayerExtraPropertyProperties } from './PlayerExtraProperty'
import { SettingContainer } from '@typinghare/settings'

export type PlayerClass<
    P extends Player<PS, PE> = Player<any, any>,
    PS extends PlayerSettings = PlayerSettings,
    PE extends PlayerExtraProperties = PlayerExtraProperties,
    PP extends PlayerExtraPropertyProperties = PlayerExtraPropertyProperties
> = new (role: Role, boardGame: BoardGame<any, P, PS, PE, PP>) => P;

export type BoardGameSettings = Record<string, any> | {}

export type ClockTimeUpCallback = (timeUpRole: Role) => void

/**
 * Abstract board game.
 * @param <G> Game settings.
 * @param <PP> Player extra property properties.
 * @param <P> Player.
 * @param <S> Player Settings.
 * @author James Chan.
 */
export abstract class BoardGame<
    G extends BoardGameSettings,
    P extends Player<PS, PE>,
    PS extends PlayerSettings = PlayerSettings,
    PE extends PlayerExtraProperties = PlayerExtraProperties,
    PP extends PlayerExtraPropertyProperties = PlayerExtraPropertyProperties,
> extends SettingContainer<BoardGameSettings> {
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
     * The role whose clock is time up.
     * @protected
     */
    private _timeUpRole?: Role

    private _clockTimeUpCallback?: ClockTimeUpCallback

    /**
     * Creates a board game.
     * @param roleArray an array of roles participating in this board game.
     * @param playerClass the class of the player.
     * @protected
     */
    protected constructor(roleArray: Role[], playerClass: PlayerClass<P>) {
        super()
        this._roleArray = roleArray

        // Initialize game.
        this.initialize()

        // Initialize players.
        for (const role of roleArray) {
            const player: P = new playerClass(role, this)
            player.initialize()

            this._rolePlayerMap.set(role, player)
        }
    }

    /**
     * Initializes this game.
     * @protected
     */
    protected initialize(): void {
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
        for (const _role of this._rolePlayerMap.keys()) {
            if (_role.equalsTo(role)) {
                return this._rolePlayerMap.get(_role)!
            }
        }

        throw new RoleNotFoundException(role)
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
     * Stops this board game.
     */
    stop(): void {
        // Pause all players' clocks.
        for (const player of this._rolePlayerMap.values()) {
            player.clockController.pauseClock()
        }
    }

    /**
     * This function is invoked when one of the player's clock is time up.
     * @param role the role whose clock is time up.
     */
    clockTimeUp(role: Role): void {
        // Record the role.
        this._timeUpRole = role

        // Stop this board game.
        this.stop()

        // Invoke callback function.
        this._clockTimeUpCallback?.(role)
    }

    /**
     * Sets time up callback function.
     * @param timeUpCallback
     */
    set clockTimeUpCallback(timeUpCallback: ClockTimeUpCallback) {
        this._clockTimeUpCallback = timeUpCallback
    }

    /**
     * Whether this board game has stopped.
     */
    hasStopped(): boolean {
        return this._timeUpRole !== undefined
    }

    /**
     * Returns time up role.
     */
    get timeUpRole(): Role | undefined {
        return this._timeUpRole
    }
}