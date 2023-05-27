import { SettingMap, SettingProperties } from './types'
import { Setting } from './Setting'

export type Settings = Record<string, any>

/**
 * Represents a container for settings.
 * @template S - The type of the settings objects.
 */
export interface SettingContainerInterface<S extends Settings, P extends SettingProperties = SettingProperties> {
    /**
     * Returns an iterable of all settings in the container.
     * @returns Iterable of settings.
     */
    getSettings(): SettingMap<S>

    /**
     * Returns the setting with the specified name.
     * @param name - The name of the setting.
     * @returns The setting object.
     * @template K - The key of the setting in the settings object.
     */
    getSetting<K extends keyof S>(name: K): Setting<S[K], P>

    /**
     * Adds a new setting to the container.
     * @param name - The name of the setting.
     * @param defaultValue - The default value for the setting.
     * @param properties - Additional properties associated with the setting.
     * @template K - The key of the setting in the settings object.
     */
    addSetting<K extends keyof S>(name: K, defaultValue: any, properties?: P): Setting<S[K], P>
}