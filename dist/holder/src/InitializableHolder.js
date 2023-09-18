"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializableHolder = void 0;
const Holder_1 = require("./Holder");
/**
 * A specialized Holder class that can be initialized with a value of type T.
 * @param <T> the type of the value to hold and initialize.
 */
class InitializableHolder extends Holder_1.Holder {
    constructor() {
        super(...arguments);
        /**
         * Whether the value has been initialized.
         * @private
         */
        this._hasBeenInitialized = false;
    }
    /**
     * Creates a new Holder instance with an optional initial value.
     * @param value The initial value of the variable to hold.
     */
    static of(value) {
        return new this(value);
    }
    /**
     * Initializes the holder with a value by invoking the provided initializer function.
     * If the holder has already been initialized, subsequent calls to initialize will have no effect.
     * @param initializer The function that initializes the value held by the holder.
     */
    initialize(initializer) {
        if (!this._hasBeenInitialized) {
            this._hasBeenInitialized = true;
            this.assign(initializer());
        }
    }
    /**
     * Checks if this holder has been initialized.
     */
    hasInitialized() {
        return this._hasBeenInitialized;
    }
}
exports.InitializableHolder = InitializableHolder;
