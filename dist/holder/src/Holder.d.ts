/**
 * A generic Holder class that holds a variable.
 * @param <T> the type of the variable to hold.
 */
export declare class Holder<T> {
    /**
     * Creates a new Holder instance with an optional initial value.
     * @param value The initial value of the variable to hold.
     */
    static of<T>(value?: T): Holder<T>;
    /**
     * The value held by the Holder.
     * @private
     */
    private _value?;
    /**
     * Private constructor to disallow direct instantiation of the Holder.
     * @param value The initial value of the variable to hold.
     * @private
     */
    protected constructor(value?: T);
    /**
     * Checks if the variable held is undefined.
     */
    isUndefined(): boolean;
    /**
     * Assigns a new value to the variable held.
     * @param value the value to assign.
     */
    assign(value?: T): void;
    /**
     * Returns the value held by the Holder.
     * @returns the value held or undefined if the value is not set.
     */
    get(): T | undefined;
    /**
     * Returns the value held by the Holder or a specified default value if the value is undefined.
     * @param defaultValue The default value to return if the held value is undefined.
     * @returns the value held or the default value if the value is not set.
     */
    getOrDefault(defaultValue: T): T;
    /**
     * Returns the value held by the Holder or throws an exception if the value is undefined.
     * @param errorProvider A function that returns an error object to throw.
     * @returns The value held by the holder.
     * @throws The error returned by the errorProvider if the value is undefined.
     */
    getOrThrow(errorProvider: () => Error): T;
}
