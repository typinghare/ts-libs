/**
 * Represents the type definition for setting properties.
 * It allows arbitrary property names with values of any type.
 */
export type SettingProperties = {
    [name: string]: any;
};

/**
 * Represents the default setting properties interface.
 * It extends the SettingProperties interface and defines optional callback functions.
 * @param <T> The type of the setting value.
 */
export interface DefaultSettingProperties<T = any> {
    /**
     * Optional callback function to be invoked before getting the value of the setting.
     * @param this The Setting instance.
     * @param value The current value of the setting.
     */
    beforeGet?: (this: Setting<T>, value: T) => void;

    /**
     * Optional callback function to be invoked before setting the value of the setting.
     * @param this The Setting instance.
     * @param newValue The new value to set.
     * @param oldValue The current value of the setting.
     * @returns The updated value to be set, or undefined to use the original newValue.
     */
    beforeSet?: (this: Setting<T>, newValue: T, oldValue: T) => T | undefined;

    /**
     * Optional callback function to be invoked after setting the value of the setting.
     * @param this The Setting instance.
     * @param value The updated value of the setting.
     */
    afterSet?: (this: Setting<T>, value: T) => void;
}

export class Setting<T = any, P extends SettingProperties = DefaultSettingProperties<T>> {
    /**
     * The internal value of this setting.
     * @private
     */
    protected internalValue: T

    /**
     * Creates a new instance of the Setting class.
     * @param defaultValue The default value for the setting.
     * @param internalProperties The properties associated with the setting.
     */
    constructor(
        protected defaultValue: T,
        protected internalProperties: P = {} as P,
    ) {
        this.internalValue = defaultValue
    }

    /**
     * Gets the value of the setting.
     * @returns The current value of the setting.
     */
    get value(): T {
        return this.getValue()
    }

    /**
     * Sets the value of the setting.
     * @param newValue The new value to set.
     */
    set value(newValue: T) {
        this.setValue(newValue)
    }

    /**
     * Gets the value of the setting.
     * @param suppressCallback Whether to suppress the callback function.
     * @returns The current value of the setting.
     */
    getValue(suppressCallback: boolean = false): T {
        const properties = this.internalProperties as DefaultSettingProperties<T>

        if (!suppressCallback) {
            if (properties.beforeGet) {
                properties.beforeGet.apply(this, [this.internalValue])
            }
        }

        return this.internalValue
    }

    /**
     * Sets the value of the setting.
     * @param newValue The new value to set.
     * @param suppressCallback Whether to suppress the callback function.
     */
    setValue(newValue: T, suppressCallback: boolean = false): void {
        const properties = this.internalProperties as DefaultSettingProperties<T>

        if (suppressCallback) {
            this.internalValue = newValue
        } else {
            if (properties.beforeSet) {
                const beforeSetValue = properties.beforeSet.apply(this, [newValue, this.internalValue])
                this.internalValue = beforeSetValue !== undefined ? beforeSetValue : newValue
            } else {
                this.internalValue = newValue
            }

            if (properties.afterSet) {
                properties.afterSet.apply(this, [this.internalValue])
            }
        }
    }

    /**
     * Gets the value of a specific property associated with the setting.
     * @param name The name of the property.
     * @returns The value of the property.
     * @template K The key type of the setting properties.
     */
    getProperty<K extends keyof P>(name: K): P[K] {
        return this.internalProperties[name]
    }

    /**
     * Sets the value of a specific property associated with the setting.
     * @param name The name of the property.
     * @param propertyValue The value to set for the property.
     * @template K The key type of the setting properties.
     */
    setProperty<K extends keyof P>(name: K, propertyValue: P[K]): void {
        this.internalProperties[name] = propertyValue
    }
}