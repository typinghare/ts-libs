/**
 * Metadata type.
 */
export type Metadata = Record<string, any>

/**
 * @type <T> The type of the value.
 * @type <M> The type of the metadata.
 */
export class Datum<T = any, M extends Metadata = Metadata> {
    /**
     * The internal value of this datum.
     * @private
     */
    protected internalValue: T

    /**
     * Creates a new datum.
     * @param defaultValue The default value for this datum.
     * @param metadata The metadata for this datum.
     */
    constructor(
        protected defaultValue: T,
        protected metadata: M = {} as M,
    ) {
        this.internalValue = defaultValue
    }

    /**
     * Returns the value of this datum.
     * @returns The current value of this datum.
     */
    get value(): T {
        return this.internalValue
    }

    /**
     * Sets the value of this datum.
     * @param newValue The new value to set.
     */
    set value(newValue: T) {
        this.internalValue = newValue
    }

    /**
     * Returns the default value.
     */
    getDefaultValue(): T {
        return this.defaultValue
    }

    /**
     * Returns the value of a specific piece of metadata associated with this datum.
     * @param name the name of the metadata to get.
     */
    getMeta<K extends keyof M>(name: K): M[K] {
        return this.metadata[name]
    }

    /**
     * Sets the value of a specific piece of metadata associated with this datum.
     * @param name The name of the metadata to get.
     * @param value The value to set.
     */
    setMeta<K extends keyof M>(name: K, value: M[K]) {
        this.metadata[name] = value
    }

    /**
     * Returns metadata.
     * @since 1.1.0
     */
    getMetadata(): M {
        return this.metadata
    }
}