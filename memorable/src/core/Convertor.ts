/**
 * Intermediate callback.
 */
export type IntermediateCallback<T, I> = (target: T, intermediate: I) => I

/**
 * Abstract convertor.
 */
export abstract class Convertor<T, D> {
    /**
     * Intermediate callback list.
     * @protected
     */
    protected readonly intermediateCallbackList: IntermediateCallback<T, D>[] = []

    /**
     * Converts a target object to destination object
     * @param target The target object to convert
     */
    public abstract convert(target: T): D;

    /**
     * Adds an intermediate callback function.
     * @param intermediateCallback The intermediate callback function to add
     */
    public addIntermediateFunction(intermediateCallback: IntermediateCallback<T, D>): void {
        this.intermediateCallbackList.push(intermediateCallback)
    }
}