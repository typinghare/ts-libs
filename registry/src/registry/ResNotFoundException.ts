import { ResLoc } from '../res/ResLoc'

/**
 * Thrown when a requested resource does not exist.
 */
export class ResNotFoundException extends Error {
    /**
     * Creates a ResourceNotFoundException.
     * @param resLoc The location of the missing resource
     */
    public constructor(private readonly resLoc: ResLoc) {
        super(`Resource not found at location: [ ${resLoc.toString()} ]`)
    }

    /**
     * Returns the location of the missing resource.
     */
    public getResLoc(): ResLoc {
        return this.resLoc
    }
}