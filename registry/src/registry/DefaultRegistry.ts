import { Registry } from './Registry'
import { ResLoc } from '../res/ResLoc'
import { ResKey } from '../res/ResKey'
import { Ref } from '../res/Ref'
import { ResKeyConflictException } from './ResKeyConflictException'
import { ResNotFoundException } from './ResNotFoundException'
import { ResNotRegisteredException } from './ResNotRegisteredException'

/**
 * Default implementation of registry.
 */
export class DefaultRegistry<T = any> extends Registry<T> {
    /**
     * A mapping of key map and res key.
     * @private
     */
    private readonly keyMap: Map<string, ResKey> = new Map()

    /**
     * The list of references. The index of the reference serves as its ID.
     * @private
     */
    private readonly byId: Ref<T>[] = []

    /**
     * A mapping of res location and its res reference.
     * @private
     */
    private readonly byLocation: Map<ResLoc, Ref<T>> = new Map()

    /**
     * A mapping of res and its location.
     * @private
     */
    private readonly byResource: Map<T, ResLoc> = new Map

    /**
     * Creates a builtin registry.
     * @param resKey The res key of this registry
     */
    public constructor(resKey: ResKey) {
        super(resKey)
    }

    public override getByKey(resKey: ResKey): T {
        return this.getByLoc(resKey.getLoc())
    }

    public override getRef(resLoc: ResLoc): Ref<T> {
        const reference = this.byLocation.get(resLoc)

        if (!reference) {
            throw new ResNotFoundException(resLoc)
        }

        return reference
    }

    public override getByLoc(resLoc: ResLoc): T {
        return this.getRef(resLoc).getResource()
    }

    public override getResKey(resLoc: ResLoc): ResKey {
        const locationString = resLoc.toString()
        const resKey = this.keyMap.get(locationString)

        if (!resKey) {
            throw new ResNotFoundException(resLoc)
        }

        return resKey
    }

    public override register(resLoc: ResLoc, res: T): T {
        const locationString = resLoc.toString()
        const resKey = new ResKey(this.getKey().getLoc(), resLoc)
        if (this.keyMap.get(locationString)) {
            throw new ResKeyConflictException(resKey)
        }

        const reference = new Ref(resKey, res, this.byId.length)
        this.keyMap.set(resLoc.toString(), resKey)
        this.byId.push(reference)
        this.byLocation.set(resLoc, reference)
        this.byResource.set(res, resLoc)

        return res
    }

    public override getLocByRes(res: T): ResLoc {
        const location = this.byResource.get(res)

        if (!location) {
            throw new ResNotRegisteredException(res)
        }

        return location
    }

    public override getRefList(): Ref<T>[] {
        return this.byId
    }
}