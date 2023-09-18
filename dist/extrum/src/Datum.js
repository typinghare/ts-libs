"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datum = void 0;
/**
 * @type <T> The type of the value.
 * @type <M> The type of the metadata.
 */
class Datum {
    /**
     * Creates a new datum.
     * @param defaultValue The default value for this datum.
     * @param metadata The metadata for this datum.
     */
    constructor(defaultValue, metadata = {}) {
        this.defaultValue = defaultValue;
        this.metadata = metadata;
        this.internalValue = defaultValue;
    }
    /**
     * Returns the value of this datum.
     * @returns The current value of this datum.
     */
    get value() {
        return this.internalValue;
    }
    /**
     * Sets the value of this datum.
     * @param newValue The new value to set.
     */
    set value(newValue) {
        this.internalValue = newValue;
    }
    /**
     * Returns the default value.
     */
    getDefaultValue() {
        return this.defaultValue;
    }
    /**
     * Returns the value of a specific piece of metadata associated with this datum.
     * @param name the name of the metadata to get.
     */
    getMeta(name) {
        return this.metadata[name];
    }
    /**
     * Sets the value of a specific piece of metadata associated with this datum.
     * @param name The name of the metadata to get.
     * @param value The value to set.
     */
    setMeta(name, value) {
        this.metadata[name] = value;
    }
    /**
     * Returns metadata.
     * @since 1.1.0
     */
    getMetadata() {
        return this.metadata;
    }
}
exports.Datum = Datum;
