import { ResKey } from '../res/ResKey'
import { ResLoc } from '../res/ResLoc'
import { Ref } from '../res/Ref'

/**
 * Registry.
 * @param <T> The type of the containing resources
 */
export abstract class Registry<T = any> {
    /**
     * Creates a registry.
     * @param resKey The resource key of this registry
     */
    protected constructor(private readonly resKey: ResKey) {
    }

    /**
     * Returns the key of this registry.
     */
    public getKey(): ResKey {
        return this.resKey
    }

    /**
     * Returns the resource key by a location.
     * @param resLoc The location of the resource
     */
    public abstract getResKey(resLoc: ResLoc): ResKey

    /**
     * Registers a resource.
     * @param resLoc The location of the resource
     * @param resource The resource to register
     * @throws ResKeyConflictException if the resource key conflict appears
     */
    public abstract register(resLoc: ResLoc, resource: T): T

    /**
     * Returns the reference.
     */
    public abstract getRef(resLoc: ResLoc): Ref<T>

    /**
     * Retrieves a resource by a specified resource location.
     * @param resLoc The location of the resource
     */
    public abstract getByLoc(resLoc: ResLoc): T

    /**
     * Retrieves a resource by a specified resource key.
     * @param resKey The key of the resource
     */
    public abstract getByKey(resKey: ResKey): T

    /**
     * Returns the location of a resource
     * @param resource A registered resource
     */
    public abstract getLocByRes(resource: T): ResLoc

    /**
     * Returns the list of references.
     */
    public abstract getRefList(): Ref<T>[]
}