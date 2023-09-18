import { IndefiniteLathe } from './types'

/**
 * Lathe Manager.
 */
export class LatheManager<L extends Record<string, IndefiniteLathe>> {
    /**
     * Creates a lathe manager.
     * @param latheMapping Mapping of lathes
     */
    public constructor(private readonly latheMapping: L) {
    }

    /**
     * Retrieves a lathe by its name.
     * @param name The name of the lathe
     */
    public getLathe<K extends keyof L>(name: K): L[K] {
        return this.latheMapping[name]
    }
}