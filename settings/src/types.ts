import { Setting } from './Setting'

/**
 * Represents a mapping of settings where each key is mapped to a `Setting` object.
 * @template S - The type of the settings object.
 */
export type SettingMap<S, P extends SettingProperties = SettingProperties> = {
    [K in keyof S]: Setting<S[K], P>
};

/**
 * Represents a mapping of setting properties where each key is a string and the value can be of any type.
 */
export type SettingProperties = Record<string, any>