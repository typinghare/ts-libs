import { FinalDrawing, InitialDrawing, IntermediateDrawing } from './types';
/**
 * A lathe that processes raw materials with drawings.
 * @param <R> The type of raw materials
 * @param <P> The type of products
 * @param <B> The type of blanks
 */
export declare class Lathe<R, P, B> {
    private readonly initialDrawing;
    private readonly finalDrawing;
    /**
     * Constant drawing.
     * @param blank The blank to process
     */
    static readonly CONSTANT_DRAWING: (blank: any) => any;
    /**
     * Semi drawing list.
     * @private
     */
    private readonly intermediateDrawingList;
    /**
     * Creates a lathe.
     * @param initialDrawing The initial drawing
     * @param finalDrawing The final drawing
     */
    constructor(initialDrawing?: InitialDrawing<R, B> | undefined, finalDrawing?: FinalDrawing<B, P, R> | undefined);
    /**
     * Adds an intermediate drawing.
     * @param intermediateDrawing
     */
    addIntermediateDrawings(intermediateDrawing: IntermediateDrawing<B, B, R>): void;
    /**
     * Process a blank, and returns a product.
     * @param raw The raw material to process
     * @param material The processing material
     */
    process(raw: R, material?: any): P;
}
