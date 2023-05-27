export type UpdateValueCallback<T> = (newValue: T, oldValue: T) => T | undefined;

/**
 * An abstract setting item.
 * @param <T> type of the value of this setting item.
 * @author James Chan
 */
export abstract class AbstractSetting<T = any> {
    /**
     * The value of this setting.
     * @private
     */
    private _value: T

    /**
     * This callback function will be called when the value is updated.
     * @private
     */
    private _updateValueCallback?: UpdateValueCallback<T>

    /**
     * Creates a setting.
     * @param defaultValue - The default value.
     */
    protected constructor(defaultValue: T) {
        this._value = defaultValue
    }

    /**
     * Gets the value of the setting.
     * @returns The current value of the setting.
     */
    get value(): T {
        return this._value
    }

    /**
     * Sets the value of the setting.
     * @param newValue - The new value to set.
     */
    set value(newValue: T) {
        this.setValue(newValue)
    }

    /**
     * Sets the value of the setting.
     * @param newValue - The new value to set.
     * @param suppressCallback - Whether to suppress callback function.
     */
    setValue(newValue: T, suppressCallback: boolean = false): void {
        if (this._updateValueCallback && !suppressCallback) {
            const res: T | undefined = this._updateValueCallback(newValue, this.value)
            if (res !== undefined) {
                newValue = res
            }
        }

        this._value = newValue
    }

    /**
     * Sets update callback.
     * @param updateCallback the callback function called when the value is updated.
     */
    set updateValueCallback(updateCallback: UpdateValueCallback<T>) {
        this._updateValueCallback = updateCallback
    }
}