"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lathe = void 0;
/**
 * A lathe that processes raw materials with drawings.
 * @param <R> The type of raw materials
 * @param <P> The type of products
 * @param <B> The type of blanks
 */
class Lathe {
    /**
     * Creates a lathe.
     * @param initialDrawing The initial drawing
     * @param finalDrawing The final drawing
     */
    constructor(initialDrawing = undefined, finalDrawing = undefined) {
        this.initialDrawing = initialDrawing;
        this.finalDrawing = finalDrawing;
        /**
         * Semi drawing list.
         * @private
         */
        this.intermediateDrawingList = [];
    }
    /**
     * Adds an intermediate drawing.
     * @param intermediateDrawing
     */
    addIntermediateDrawings(intermediateDrawing) {
        this.intermediateDrawingList.push(intermediateDrawing);
    }
    /**
     * Process a blank, and returns a product.
     * @param raw The raw material to process
     * @param material The processing material
     */
    process(raw, material) {
        let blank = (this.initialDrawing && this.initialDrawing(raw, material)) || raw;
        this.intermediateDrawingList.forEach(intermediateDrawing => {
            blank = intermediateDrawing(blank, material, raw) || blank;
        });
        return (this.finalDrawing && this.finalDrawing(blank, material, raw)) || blank;
    }
}
exports.Lathe = Lathe;
/**
 * Constant drawing.
 * @param blank The blank to process
 */
Lathe.CONSTANT_DRAWING = (blank) => blank;
