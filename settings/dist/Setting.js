"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const AbstractSetting_1 = require("./AbstractSetting");
/**
 * Represents a setting with additional properties.
 * @template T - The type of the setting value.
 * @template P - The type of the setting properties.
 */
class Setting extends AbstractSetting_1.AbstractSetting {
    /**
     * Creates a new instance of the Setting class.
     * @param defaultValue - The default value for the setting.
     * @param properties - Additional properties associated with the setting.
     * @param updateValueCallback - Optional callback function to be called when the value is updated.
     */
    constructor(defaultValue, properties, updateValueCallback) {
        super(defaultValue, updateValueCallback);
        this._settingProperties = properties || {};
    }
    /**
     * Gets the value of a specific property associated with the setting.
     * @param name - The name of the property.
     * @returns The value of the property.
     * @template K - The key type of the setting properties.
     */
    getProperty(name) {
        return this._settingProperties[name];
    }
    /**
     * Sets the value of a specific property associated with the setting.
     * @param name - The name of the property.
     * @param propertyValue - The value to set for the property.
     * @template K - The key type of the setting properties.
     */
    setProperty(name, propertyValue) {
        this._settingProperties[name] = propertyValue;
    }
}
exports.Setting = Setting;
