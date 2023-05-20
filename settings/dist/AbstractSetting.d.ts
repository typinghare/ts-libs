export type UpdateValueCallback<T> = (newValue: T, oldValue: T) => T | undefined;
/**
 * An abstract setting item.
 * @param <T> type of the value of this setting item.
 * @author James Chan
 */
export declare abstract class AbstractSetting<T> {
    /**
     * The value of this setting.
     * @private
     */
    private _value;
    /**
     * This callback function will be called when the value is updated.
     * @private
     */
    private readonly _updateValueCallback?;
    /**
     * Creates a setting.
     * @param defaultValue - The default value.
     * @param updateValueCallback - The callback function invoked when the value is updated.
     */
    protected constructor(defaultValue: T, updateValueCallback?: UpdateValueCallback<T>);
    /**
     * Gets the value of the setting.
     * @returns The current value of the setting.
     */
    get value(): T;
    /**
     * Sets the value of the setting.
     * @param newValue - The new value to set.
     */
    set value(newValue: T);
}
