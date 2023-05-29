import {
    ClockTimeUpCallback,
    GameSettingProperties,
    GameSettings,
    PlayerAttributeProperties,
    PlayerAttributes,
    PlayerClass,
    Role,
    TimeControlClass,
    TimeControlSettings,
} from './types'
import { SettingContainer } from '@typinghare/settings'
import { Player } from './Player'
import { RoleNotFoundException } from './exception/RoleNotFoundException'
import { TimeControl } from './TimeControl'

export enum GameStatus {
    PENDING, STARTED, STOPPED
}

// noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
/**
 * Abstract board game. We simplify "board game" to "game" in this library because "board game" is too long.
 * @param <G> - Game settings.
 * @param <T> - Time control settings.
 * @param <P> - Player.
 * @param <TS> - Time control settings.
 * @param <PA> - Player attributes.
 * @param <PP> - Player attributes properties.
 * @author James Chan
 */
export abstract class Game<
    G extends GameSettings,
    T extends TimeControl<TS>,
    P extends Player<T, TS, PA, PP>,
    TS extends TimeControlSettings = any,
    PA extends PlayerAttributes = any,
    PP extends PlayerAttributeProperties = any,
> {
    /**
     * Game settings.
     * @private
     */
    protected readonly _settings = new SettingContainer<G, GameSettingProperties>()

    /**
     * An array of roles.
     * @private
     */
    protected readonly _roleArray: Role[]

    /**
     * Mapping of roles to players.
     * @private
     */
    protected readonly _playerMap: Map<Role, P> = new Map()

    /**
     * Game status.
     * @private
     */
    protected _gameStatus: GameStatus = GameStatus.PENDING

    /**
     * Clock time up callback.
     * @private
     */
    protected _clockTimeUpCallback?: ClockTimeUpCallback

    /**
     * Role that runs out of time.
     * @private
     */
    protected _timeUpRole?: Role

    /**
     * Creates a board game.
     * @param roleArray - An array of roles.
     * @param timeControlClass - Class of creating a time control.
     * @param playerClass - Mapping of roles to players.
     * @protected
     */
    public constructor(roleArray: Role[], timeControlClass: TimeControlClass<T>, playerClass: PlayerClass<T, P>) {
        this._roleArray = roleArray

        // Initialize players.
        for (const role of roleArray) {
            this._playerMap.set(role, new playerClass(role, this, new timeControlClass()))
        }

        // Initialize settings for this board game.
        this.initializeSettings()
    }

    /**
     * Initialize settings for this board game.
     * @protected
     */
    protected initializeSettings(): void {
    }

    /**
     * Returns this board game's settings.
     */
    get settings(): SettingContainer<G, GameSettingProperties> {
        return this._settings
    }

    /**
     * Returns the role array.
     */
    get roleArray(): Role[] {
        return this._roleArray
    }

    /**
     * Gets a player.
     * @param role the role of the player.
     */
    getPlayer(role: Role): P {
        if (!this._playerMap.has(role)) {
            throw new RoleNotFoundException(role)
        }

        return this._playerMap.get(role)!
    }

    /**
     * Returns the next role.
     * @param role the current role.
     */
    getNextRole(role: Role): Role {
        const roleIndex: number = this._roleArray.indexOf(role)
        if (roleIndex === -1) {
            throw new RoleNotFoundException(role)
        }

        return this._roleArray[(roleIndex + 1) % this._roleArray.length]
    }

    /**
     * Starts this game.
     */
    start(): void {
        // Initialize clock controllers for all players.
        for (const player of this._playerMap.values()) {
            player.initializeClockController()
        }

        this._gameStatus = GameStatus.STARTED
    }

    /**
     * Stops this game.
     */
    stop(): void {
        this._gameStatus = GameStatus.STOPPED

        // Pause clock controllers for all players.
        for (const player of this._playerMap.values()) {
            player.clockController.pauseClock()
        }
    }

    /**
     * Returns game status.
     */
    get gameStatus(): GameStatus {
        return this._gameStatus
    }

    /**
     * Sets time up callback function.
     * @param timeUpCallback
     */
    set clockTimeUpCallback(timeUpCallback: ClockTimeUpCallback) {
        this._clockTimeUpCallback = timeUpCallback
    }

    /**
     * A specified role runs out of time.
     * @param role
     */
    timeUp(role: Role): void {
        this.getPlayer(role)
        this._timeUpRole = role

        // Stop this board game.
        this.stop()

        // Invoke callback function.
        this._clockTimeUpCallback?.(role)
    }

    /**
     * Returns role that runs out of time; undefined if no role runs out of time.
     */
    get timeUpRole(): Role | undefined {
        return this._timeUpRole
    }
}
