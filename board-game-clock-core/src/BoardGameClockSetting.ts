import { Setting } from '@typinghare/settings'

export type BoardGameClockSettingPropertyMap = {
    label: string,
    description: string,
}

/**
 * The setting of board game and player.
 * @author James Chan
 * @see BoardGame
 * @see Player
 */
export class BoardGameClockSetting<T> extends Setting<T, BoardGameClockSettingPropertyMap> {
}