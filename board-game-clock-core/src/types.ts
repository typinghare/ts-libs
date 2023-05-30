import { Settings } from '@typinghare/settings'
import { Player } from './Player'
import { Game } from './Game'
import { TimeControl } from './TimeControl'

/**
 * Game settings.
 */
export type GameSettings = {}

/**
 * Time control settings.
 */
export type TimeControlSettings = {}

/**
 * Player properties.
 */
export type PlayerAttributes = Settings

/**
 * Player properties.
 */
export type PlayerAttributeProperties = {
    label: string
}

/**
 * The role.
 */
export type Role = string

/**
 * Game setting properties.
 */
export type GameSettingProperties<T = any> = {
    // The type of this setting.
    type: 'time' | 'text' | 'bool' | 'number',

    // The label for this setting.
    label: string,

    // The detailed description for this setting.
    description: string,

    // The options for the values of this setting.
    options?: T[]
}

/**
 * A class of creating a player.
 */
export type PlayerClass<
    T extends TimeControl<TS>,
    P extends Player<T, TS, PA, PP>,
    TS extends TimeControlSettings = any,
    PA extends PlayerAttributes = any,
    PP extends PlayerAttributeProperties = any,
> = new (role: Role, game: Game<any, T, P, TS, PA, PP>, timeControl: T) => P;

/**
 * A class of creating a time control.
 */
export type TimeControlClass<
    T extends TimeControl<TS>,
    TS extends TimeControlSettings = any,
> = new () => T;

export type ClockTimeUpCallback = (timeUpRole: Role) => void

export type AnyGame<
    G extends GameSettings = any,
    T extends TimeControl<TS> = TimeControl,
    P extends Player<T, TS, PA, PP> = Player<T>,
    TS extends TimeControlSettings = any,
    PA extends PlayerAttributes = any,
    PP extends PlayerAttributeProperties = any,
> = Game<G, T, P, TS, PA, PP>

export type GameSupplier<
    G extends GameSettings = any,
    T extends TimeControl<TS> = TimeControl,
    P extends Player<T, TS, PA, PP> = Player<T>,
    TS extends TimeControlSettings = any,
    PA extends PlayerAttributes = any,
    PP extends PlayerAttributeProperties = any,
> = () => Game<G, T, P, TS, PA, PP>

export type GameTimeControlType = string

export type GameTimeControl<T extends GameTimeControlType> = T[]

export type GameSupplierMap<T extends GameTimeControlType> = {
    [K in T]: GameSupplier
}