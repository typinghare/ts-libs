import { Role } from './Role'
import { ClockController } from './ClockController'
import { ClockControllerNotInitializedException } from './exception/ClockControllerNotInitializedException'
import { BoardGame, BoardGameSettings } from './BoardGame'
import { PlayerExtraProperty, PlayerExtraPropertyProperties } from './PlayerExtraProperty'
import { SettingContainer, SettingMap } from '@typinghare/settings'
import { BoardGameClockSettingPropertyMap, BoardGameSetting } from './BoardGameSetting'

export type PlayerSettings = Record<string, any> | {}

export type PlayerExtraProperties = Record<string, any> | {}

export type PlayerExtraPropertiesMap<PE extends PlayerExtraProperties, PP extends PlayerExtraPropertyProperties> = {
    [K in keyof PE]: PlayerExtraProperty<PE[K], PP>
}

/**
 * @author James Chan
 */
export abstract class Player<
    PS extends PlayerSettings = PlayerSettings,
    PE extends PlayerExtraProperties = PlayerExtraProperties,
    PP extends PlayerExtraPropertyProperties = PlayerExtraPropertyProperties
> extends SettingContainer<PS> {
    /**
     * The role of this player.
     * @protected
     */
    protected readonly _role: Role

    /**
     * The board game reference.
     * @protected
     */
    protected readonly _boardGame: BoardGame<BoardGameSettings, Player<PS, PE, PP>>

    /**
     *
     * @protected
     */
    protected _clockController?: ClockController<Player<PS>>

    /**
     * Creates a player.
     * @param role the role of this player.
     * @param boardGame
     */
    constructor(role: Role, boardGame: BoardGame<any, Player<PS, PE, PP>>) {
        super()
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
    get clockController(): ClockController<Player<PS>> {
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

    override addSetting<K extends keyof PS>(
        name: K,
        defaultValue: PS[K],
        properties?: BoardGameClockSettingPropertyMap<PS[K]>,
    ): BoardGameSetting<PS[K]> {
        return super.addSetting(name, defaultValue, properties as BoardGameClockSettingPropertyMap<PS[K]>) as BoardGameSetting<PS[K]>
    }

    override getSetting<K extends keyof PS>(name: K): BoardGameSetting<PS[K]> {
        return super.getSetting(name) as BoardGameSetting<PS[K]>
    }

    override getSettings(): SettingMap<PS, BoardGameClockSettingPropertyMap<any>> {
        return super.getSettings() as SettingMap<PS, BoardGameClockSettingPropertyMap<any>>
    }
}