import { Role } from './Role'
import { AbstractSetting, SettingContainer, SettingMap } from '@typinghare/settings'
import { ClockController } from './ClockController'
import { ClockControllerNotInitializedException } from './exception/ClockControllerNotInitializedException'
import { BoardGame, BoardGameSettings } from './BoardGame'
import { PlayerExtraProperty, PlayerExtraPropertyProperties } from './PlayerExtraProperty'

export type PlayerSettings = Record<string, any>

export type PlayerExtraProperties = {}

export type PlayerExtraPropertiesMap<PE extends PlayerExtraProperties, PP extends PlayerExtraPropertyProperties> = {
    [K in keyof PE]: PlayerExtraProperty<PE[K], PP>
}

/**
 * @author James Chan
 */
export abstract class Player<
    S extends PlayerSettings = PlayerSettings,
    PE extends PlayerExtraProperties = PlayerExtraProperties,
    PP extends PlayerExtraPropertyProperties = PlayerExtraPropertyProperties
> implements SettingContainer<S> {
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
    protected readonly _boardGame: BoardGame<BoardGameSettings, Player<S, PE>>

    /**
     *
     * @protected
     */
    protected _clockController?: ClockController<Player<S, PE>>

    /**
     * Creates a player.
     * @param role the role of this player.
     * @param boardGame
     */
    constructor(role: Role, boardGame: BoardGame<any, Player<S, PE>>) {
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
    get clockController(): ClockController<Player<S, PE>> {
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
    getExtraProperties(): PlayerExtraPropertiesMap<PE, PP> | null {
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