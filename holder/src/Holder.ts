/**
 * A generic Holder class that holds a variable.
 * @param <T> the type of the variable to hold.
 */
export class Holder<T> {
    /**
     * Creates a new Holder instance with an optional initial value.
     * @param value The initial value of the variable to hold.
     */
    public static of<T>(value?: T): Holder<T> {
        return new this(value)
    }

    /**
     * The value held by the Holder.
     * @private
     */
    private _value?: T

    /**
     * Private constructor to disallow direct instantiation of the Holder.
     * @param value The initial value of the variable to hold.
     * @private
     */
    protected constructor(value?: T) {
        this._value = value
    }

    /**
     * Checks if the variable held is undefined.
     */
    public isUndefined(): boolean {
        return this._value === undefined
    }

    /**
     * Assigns a new value to the variable held.
     * @param value the value to assign.
     */
    public assign(value?: T): void {
        this._value = value
    }

    /**
     * Returns the value held by the Holder.
     * @returns the value held or undefined if the value is not set.
     */
    public get(): T | undefined {
        return this._value
    }

    /**
     * Returns the value held by the Holder or a specified default value if the value is undefined.
     * @param defaultValue The default value to return if the held value is undefined.
     * @returns the value held or the default value if the value is not set.
     */
    public getOrDefault(defaultValue: T): T {
        return this._value || defaultValue
    }

    /**
     * Returns the value held by the Holder or throws an exception if the value is undefined.
     * @param errorProvider A function that returns an error object to throw.
     * @returns The value held by the holder.
     * @throws The error returned by the errorProvider if the value is undefined.
     */
    public getOrThrow(errorProvider: () => Error): T {
        if (this._value === undefined) {
            throw errorProvider()
        }

        return this._value
    }
}