import { AbstractSetting } from './AbstractSetting'

/**
 * Represents a mapping of settings where each key is mapped to an `AbstractSetting` object.
 * @template S - The type of the settings object.
 */
export type SettingMap<S> = {
    [K in keyof S]: AbstractSetting<S[K]>;
};

/**
 * Represents a mapping of setting properties where each key is a string and the value can be of any type.
 */
export type SettingPropertyMap = Record<string, any>;