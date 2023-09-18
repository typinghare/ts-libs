/**
 * A utility class collecting static helper functions.
 */
export class LatheUtil {
    private constructor() {
    }

    /**
     * Returns an empty object provider function.
     * @type <T> The type of the empty object to provide
     */
    public static emptyObjectProvider<T>(): () => T {
        return function(): T {
            return {} as T
        }
    }

    /**
     * Returns an object provider function.
     * @param object The object to provide
     * @type <T> The type of the object to provide
     */
    public static objectProvider<T>(object: T): () => T {
        return function(): T {
            return object
        }
    }
}