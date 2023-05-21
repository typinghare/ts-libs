import { AbstractSetting, UpdateValueCallback } from './AbstractSetting'
import { SettingPropertyMap } from './types'

/**
 * Represents a setting with additional properties.
 * @template T - The type of the setting value.
 * @template P - The type of the setting properties.
 */
export class Setting<T, P extends SettingPropertyMap = {}> extends AbstractSetting<T> {
    protected readonly _settingProperties: P

    /**
     * Creates a new instance of the Setting class.
     * @param defaultValue - The default value for the setting.
     * @param properties - Additional properties associated with the setting.
     * @param updateValueCallback - Optional callback function to be called when the value is updated.
     */
    constructor(defaultValue: T, properties?: P, updateValueCallback?: UpdateValueCallback<T>) {
        super(defaultValue, updateValueCallback)
        this._settingProperties = properties || {} as P
    }

    /**
     * Gets the value of a specific property associated with the setting.
     * @param name - The name of the property.
     * @returns The value of the property.
     * @template K - The key type of the setting properties.
     */
    getProperty<K extends keyof P>(name: K): P[K] {
        return this._settingProperties[name]
    }

    /**
     * Sets the value of a specific property associated with the setting.
     * @param name - The name of the property.
     * @param propertyValue - The value to set for the property.
     * @template K - The key type of the setting properties.
     */
    setProperty<K extends keyof P>(name: K, propertyValue: P[K]): void {
        this._settingProperties[name] = propertyValue
    }
}
