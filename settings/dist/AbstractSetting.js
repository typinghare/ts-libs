"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSetting = void 0;
/**
 * An abstract setting item.
 * @param <T> type of the value of this setting item.
 * @author James Chan
 */
class AbstractSetting {
    /**
     * Creates a setting.
     * @param defaultValue - The default value.
     * @param updateValueCallback - The callback function invoked when the value is updated.
     */
    constructor(defaultValue, updateValueCallback) {
        this._value = defaultValue;
        this._updateValueCallback = updateValueCallback;
    }
    /**
     * Gets the value of the setting.
     * @returns The current value of the setting.
     */
    get value() {
        return this._value;
    }
    /**
     * Sets the value of the setting.
     * @param newValue - The new value to set.
     */
    set value(newValue) {
        if (this._updateValueCallback) {
            const res = this._updateValueCallback(newValue, this.value);
            if (res !== undefined) {
                newValue = res;
            }
        }
        this._value = newValue;
    }
}
exports.AbstractSetting = AbstractSetting;
