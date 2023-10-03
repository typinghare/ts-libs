import { ResLoc } from './ResLoc'

/**
 * Resource key represents a unique key that identifies a resource.
 */
export class ResKey {
    /**
     * The delimiter between the parent and the location.
     */
    public static readonly DELIMITER = '@'

    /**
     * Creates a resource key.
     * @param parent The parent of this resource key.
     * @param loc The location of this resource key.
     * @private
     */
    public constructor(
        private readonly parent: ResLoc,
        private readonly loc: ResLoc,
    ) {
    }

    /**
     * Returns the parent of this resource key.
     */
    public getParent(): ResLoc {
        return this.parent
    }

    /**
     * Returns the location of this resource key.
     */
    public getLoc(): ResLoc {
        return this.loc
    }

    /**
     * Returns the resource key string.
     */
    public toString(): string {
        return this.loc + ResKey.DELIMITER + this.parent
    }
}