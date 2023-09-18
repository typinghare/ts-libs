import { FinalDrawing, InitialDrawing, IntermediateDrawing } from './types'

/**
 * A lathe that processes raw materials with drawings.
 * @param <R> The type of raw materials
 * @param <P> The type of products
 * @param <B> The type of blanks
 */
export class Lathe<R, P, B> {
    /**
     * Constant drawing.
     * @param blank The blank to process
     */
    public static readonly CONSTANT_DRAWING = (blank: any) => blank

    /**
     * Semi drawing list.
     * @private
     */
    private readonly intermediateDrawingList: IntermediateDrawing<B, B, R>[] = []

    /**
     * Creates a lathe.
     * @param initialDrawing The initial drawing
     * @param finalDrawing The final drawing
     */
    public constructor(
        private readonly initialDrawing: InitialDrawing<R, B> | undefined = undefined,
        private readonly finalDrawing: FinalDrawing<B, P, R> | undefined = undefined,
    ) {
    }

    /**
     * Adds an intermediate drawing.
     * @param intermediateDrawing
     */
    public addIntermediateDrawings(intermediateDrawing: IntermediateDrawing<B, B, R>): void {
        this.intermediateDrawingList.push(intermediateDrawing)
    }

    /**
     * Process a blank, and returns a product.
     * @param raw The raw material to process
     * @param material The processing material
     */
    public process(raw: R, material?: any): P {
        let blank: B = (this.initialDrawing && this.initialDrawing(raw, material)) || raw as unknown as B

        this.intermediateDrawingList.forEach(intermediateDrawing => {
            blank = intermediateDrawing(blank, material, raw) || blank
        })

        return (this.finalDrawing && this.finalDrawing(blank, material, raw)) || blank as unknown as P
    }
}