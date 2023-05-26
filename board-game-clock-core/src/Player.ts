import { Role } from './Role'
import { AbstractSetting, SettingContainer, SettingMap } from '@typinghare/settings'
import { ClockController } from './ClockController'
import { ClockControllerNotInitializedException } from './exception/ClockControllerNotInitializedException'
import { BoardGame, BoardGameSettings } from './BoardGame'

export type PlayerSettings = Record<string, any>

export type PlayerExtraProperties = Record<string, any>

/**
 * @author James Chan
 */
export abstract class Player<S extends PlayerSettings> implements SettingContainer<S> {
    /**
     * Player settings.
     * @protected
     */
    protected _settings: SettingMap<S> = {} as SettingMap<S>

    /**
     * The role of this player.
     * @protected
     */
    protected readonly _role: Role

    /**
     * The board game reference.
     * @protected
     */
    protected readonly _boardGame: BoardGame<BoardGameSettings, Player<S>>

    /**
     *
     * @protected
     */
    protected _clockController?: ClockController<Player<S>>

    /**
     * Creates a player.
     * @param role the role of this player.
     * @param boardGame
     */
    constructor(role: Role, boardGame: BoardGame<any, Player<S>>) {
        this._role = role
        this._boardGame = boardGame
    }

    /**
     * Initialize the settings of this player.
     * @protected
     */
    abstract initialize(): void

    /**
     * Initialize the clock controller of this player.
     */
    abstract initializeClockController(): void

    /**
     * Returns clock controller.
     */
    get clockController(): ClockController<Player<S>> {
        if (this._clockController === undefined) {
            throw new ClockControllerNotInitializedException()
        }

        return this._clockController
    }

    /**
     * The clock for this player is time up.
     */
    clockTimeUp(): void {
        this._boardGame.clockTimeUp(this._role)
    }

    /**
     * This function is invoked when the player clicks the screen.
     */
    onClick(): void {
        // Pauses this player's clock.
        this.clockController.pauseClock()

        // Resumes next player's clock.
        const nextPlayer = this._boardGame.getPlayer(this._boardGame.getNextRole(this._role))
        nextPlayer.clockController.resumeClock()
    }

    /**
     * Returns extra properties of this player.
     */
    getExtraProperties(): PlayerExtraProperties | null {
        return null
    }

    addSetting<K extends keyof S>(name: K, setting: AbstractSetting<S[K]>): void {
        this._settings[name] = setting
    }

    getSetting<K extends keyof S>(name: K): AbstractSetting<S[K]> {
        return this._settings[name]
    }

    getSettings(): Iterable<AbstractSetting> {
        return Object.values(this._settings)
    }
}