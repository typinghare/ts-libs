import { SettingContainer } from '@typinghare/settings'
import { PlayerAttributeProperties, PlayerAttributes, Role, TimeControlSettings } from './types'
import { Game } from './Game'
import { TimeControl } from './TimeControl'
import { ClockController } from './ClockController'
import { ClockControllerNotInitializedException } from './exception/ClockControllerNotInitializedException'

/**
 * Abstract board game player.
 * @param <T> - Time control settings.
 * @param <TS> - Time control settings.
 * @param <PA> - Player attributes.
 * @param <PP> - Player attributes properties.
 * @author James Chan
 */
export abstract class Player<
    T extends TimeControl<TS> = any,
    TS extends TimeControlSettings = any,
    PA extends PlayerAttributes = any,
    PP extends PlayerAttributeProperties = any,
> {
    /**
     * Player attributes.
     * @private
     */
    protected readonly _attributes = new SettingContainer<PA, PP>()

    /**
     * The role of this player.
     * @protected
     */
    protected readonly _role: Role

    /**
     * The game creating this player.
     * @protected
     */
    protected readonly _game: Game<any, T, Player<T, TS, PA, PP>>

    /**
     * Time control.
     * @protected
     */
    protected readonly _timeControl: T

    /**
     * Clock controller.
     * @protected
     */
    protected _clockController?: ClockController<TS>

    /**
     * Creates a player.
     * @param role - The role of this player.
     * @param game - The game creating this player.
     * @param timeControl
     */
    public constructor(role: Role, game: Game<any, T, Player<T, TS, PA, PP>>, timeControl: T) {
        this._role = role
        this._game = game
        this._timeControl = timeControl
    }

    /**
     * Creates a controller.
     * @protected
     */
    protected abstract createClockController(): ClockController<TS>;

    /**
     * Updates attributes.
     * @protected
     */
    protected updateAttributes(): void {
    }

    /**
     * Player clicks the screen.
     */
    click(): void {
        // Pauses this player's clock.
        this.clockController.pauseClock()

        // Resumes next player's clock.
        const nextRole: Role = this._game.getNextRole(this._role)
        this._game.getPlayer(nextRole).clockController.resumeClock()
    }

    /**
     * Return this player's attributes.
     */
    get attributes(): SettingContainer<PA, PP> {
        this.updateAttributes()

        return this._attributes
    }

    /**
     * Return time control.
     */
    get timeControl(): T {
        return this._timeControl
    }

    get clockController(): ClockController<TS> {
        if (this._clockController === undefined) {
            throw new ClockControllerNotInitializedException()
        }

        return this._clockController
    }

    /**
     * This player runs out of time.
     */
    timeUp(): void {
        this._game.timeUp(this._role)
    }

    /**
     * Initialize controller.
     */
    initializeClockController(): void {
        this._clockController = this.createClockController()
    }
}