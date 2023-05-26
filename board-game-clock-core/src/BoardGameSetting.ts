import { Setting } from '@typinghare/settings'

export type BoardGameClockSettingPropertyMap = {
    // The type of this setting.
    type: 'time' | 'text' | 'bool' | 'number',

    // The label for this setting.
    label: string,

    // The detailed description for this setting.
    description: string,

    // The options for the values of this setting.
    options?: string[]
}

/**
 * The setting of board game and player.
 * @param <T> the type of the value.
 * @author James Chan
 * @see BoardGame
 * @see Player
 */
export class BoardGameSetting<T> extends Setting<T, BoardGameClockSettingPropertyMap> {
}