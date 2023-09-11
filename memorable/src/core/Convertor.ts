export type IntermediateCallback<I> = (intermediate: I) => I

export abstract class Convertor<T, D> {
    protected readonly intermediateCallbackList: IntermediateCallback<D>[] = []

    /**
     * Converts a target object to destination object
     * @param target The target object to convert
     */
    public abstract convert(target: T): D;

    /**
     * Adds an intermediate callback function.
     * @param intermediateCallback The intermediate callback function to add
     */
    public addIntermediateFunction(intermediateCallback: IntermediateCallback<D>): void {
        this.intermediateCallbackList.push(intermediateCallback)
    }
}