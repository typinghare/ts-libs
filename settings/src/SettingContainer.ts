import { AbstractSetting } from './AbstractSetting'

/**
 * Represents a container for settings.
 * @template S - The type of the settings objects.
 */
export interface SettingContainer<S extends Record<string, any>> {
    /**
     * Returns an iterable of all settings in the container.
     * @returns Iterable of settings.
     */
    getSettings(): Iterable<AbstractSetting<any>>;

    /**
     * Returns the setting with the specified name.
     * @param name - The name of the setting.
     * @returns The setting object.
     * @template K - The key of the setting in the settings object.
     */
    getSetting<K extends keyof S>(name: string): AbstractSetting<S[K]>;

    /**
     * Adds a new setting to the container.
     * @param name - The name of the setting.
     * @param setting - The setting object to add.
     * @template K - The key of the setting in the settings object.
     */
    addSetting<K extends keyof S>(name: string, setting: AbstractSetting<S[K]>): void;

    /**
     * Retrieves the value of a specific setting based on its name.
     * @param name - The name of the setting.
     * @returns The value of the setting.
     * @template K - The key of the setting in the settings object.
     */
    getSettingValue<K extends keyof S>(name: string): S[K];
}