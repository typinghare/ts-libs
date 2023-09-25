import { ResKey } from './ResKey'
import { ResLoc } from './ResLoc'
import { Registry } from '../registry/Registry'

/**
 * Reference tag.
 */
export class Tag {
    /**
     * Creates a tag.
     * @param registryKey The registry key of this tag.
     * @param location The resource location of this tag.
     */
    public constructor(
        private readonly registryKey: ResKey,
        private readonly location: ResLoc,
    ) {
    }

    /**
     * Checks whether this tag is for a specified registry.
     * @param registry The registry to check.
     */
    public isFor(registry: Registry): boolean {
        return this.registryKey === registry.getKey()
    }

    /**
     * Returns the location of this tag.
     */
    public getLocation(): ResLoc {
        return this.location
    }
}