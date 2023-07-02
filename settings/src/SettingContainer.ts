import { DefaultSettingProperties, Setting, SettingProperties } from './Setting'

export type Settings = {
    [name: string]: any
}

export type SettingMap<S extends Settings> = {
    [K in keyof S]: Setting<S[K]> | undefined
}

export class SettingContainer<
    S extends Settings = Record<string, any>,
    P extends SettingProperties = DefaultSettingProperties
> {
    /**
     * Creates a container of settings.
     * @param settingMap
     */
    constructor(protected settingMap: SettingMap<S> = {} as SettingMap<S>) {
    }

    /**
     * Adds a setting.
     * @param name
     * @param setting
     */
    addSetting<K extends keyof S>(name: K, setting: Setting<S[K]>): void {
        this.settingMap[name] = setting
    }

    /**
     * Gets a setting.
     * @param name
     */
    getSetting<K extends keyof S>(name: K): Setting<S[K]> | undefined {
        return this.settingMap[name]
    }

    /**
     * Gets the value of a setting.
     * @param name
     */
    getSettingValue<K extends keyof S>(name: K): S[K] | undefined {
        const setting = this.settingMap[name]

        return setting === undefined ? undefined : setting.value
    }
}