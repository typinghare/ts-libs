import { IndefiniteLathe } from './types';
/**
 * Lathe Manager.
 */
export declare class LatheManager<L extends Record<string, IndefiniteLathe>> {
    private readonly latheMapping;
    /**
     * Creates a lathe manager.
     * @param latheMapping Mapping of lathes
     */
    constructor(latheMapping: L);
    /**
     * Retrieves a lathe by its name.
     * @param name The name of the lathe
     */
    getLathe<K extends keyof L>(name: K): L[K];
}
