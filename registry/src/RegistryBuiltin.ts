import { ResLocBuilder } from './res/ResLocBuilder'
import { ResLoc } from './res/ResLoc'
import { Registry } from './registry/Registry'
import { DefaultRegistry } from './registry/DefaultRegistry'
import { ResKey } from './res/ResKey'

/**
 * Builtin constants and references.
 */
export class RegistryBuiltin {
    /**
     * Builtin namespace.
     */
    public static readonly NAMESPACE = 'Registry'

    /**
     * Builtin resource location builder.
     */
    public static readonly RES_LOC_BUILDER: ResLocBuilder = new ResLocBuilder(this.NAMESPACE)

    /**
     * Path of the root resource location.
     */
    public static readonly ROOT_LOC_PATH: string = 'root'

    /**
     * Builtin root location.
     */
    public static readonly ROOT_LOC: ResLoc = this.RES_LOC_BUILDER.create(this.ROOT_LOC_PATH)

    /**
     * Builtin root registry.
     */
    public static readonly ROOT_REGISTRY: Registry<Registry>
        = new DefaultRegistry(new ResKey(this.ROOT_LOC, this.ROOT_LOC))
}