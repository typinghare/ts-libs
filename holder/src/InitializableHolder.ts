import { Holder } from './Holder'

/**
 * Returns a value or undefined.
 */
export type Initializer<T> = () => T | undefined

/**
 * A specialized Holder class that can be initialized with a value of type T.
 * @param <T> the type of the value to hold and initialize.
 */
export class InitializableHolder<T> extends Holder<T> {
    /**
     * Creates a new Holder instance with an optional initial value.
     * @param value The initial value of the variable to hold.
     */
    public static override of<T>(value?: T): InitializableHolder<T> {
        return new this(value)
    }

    /**
     * Whether the value has been initialized.
     * @private
     */
    private _hasBeenInitialized = false

    /**
     * Initializes the holder with a value by invoking the provided initializer function.
     * If the holder has already been initialized, subsequent calls to initialize will have no effect.
     * @param initializer The function that initializes the value held by the holder.
     */
    public initialize(initializer: Initializer<T>): void {
        if (!this._hasBeenInitialized) {
            this._hasBeenInitialized = true

            this.assign(initializer())
        }
    }

    /**
     * Checks if this holder has been initialized.
     */
    public hasInitialized(): boolean {
        return this._hasBeenInitialized
    }
}