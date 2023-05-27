import { SettingContainerInterface, Settings } from './SettingContainerInterface'
import { Setting } from './Setting'
import { SettingMap, SettingProperties } from './types'

/**
 * @author James Chan
 */
export class SettingContainer<
    S extends Settings,
    P extends SettingProperties = SettingProperties
> implements SettingContainerInterface<S, P> {
    protected _settings = {} as SettingMap<S, P>

    addSetting<K extends keyof S>(name: K, defaultValue: S[K], properties?: P): Setting<S[K], P> {
        const setting: Setting<S[K], P> = new Setting(defaultValue, properties)
        this._settings[name] = setting

        return setting
    }

    getSetting<K extends keyof S>(name: K): Setting<S[K], P> {
        return this._settings[name]
    }

    getSettings(): SettingMap<S, P> {
        return this._settings
    }
}