import { Tag } from './Tag'
import { ResKey } from './ResKey'

/**
 * Resource reference.
 */
export class Ref<T = any> {
    /**
     * Empty tag set.
     * @private
     */
    private static readonly EMPTY_TAG_SET: Set<Tag> = new Set()

    /**
     * The set of tags.
     * @private
     */
    private tagSet: Set<Tag> = Ref.EMPTY_TAG_SET

    /**
     * Creates a reference.
     * @param resKey The key of the resource
     * @param resource The resource this reference contains
     * @param id The identifier of this reference
     */
    public constructor(
        private readonly resKey: ResKey,
        private readonly resource: T,
        private readonly id: number,
    ) {
    }

    /**
     * Returns the resource key.
     */
    public getResourceKey(): ResKey {
        return this.resKey
    }

    /**
     * Returns the resource it holds.
     */
    public getResource(): T {
        return this.resource
    }

    /**
     * Returns the id of this reference.
     */
    public getId(): number {
        return this.id
    }

    /**
     * Returns the set of tags.
     */
    public getTagSet(): Set<Tag> {
        return this.tagSet
    }

    /**
     * Binds a tag.
     * @param tag Tag to bind
     */
    public bindTag(tag: Tag): void {
        if (this.tagSet === Ref.EMPTY_TAG_SET) {
            this.tagSet = new Set()
        }

        this.tagSet.add(tag)
    }

    /**
     * Checks whether this reference contains a tag.
     * @param tag The tag to search for
     */
    public hasTag(tag: Tag): boolean {
        return this.tagSet.has(tag)
    }

    /**
     * Removes a tag.
     * @param tag The tag to remove
     */
    public removeTag(tag: Tag): void {
        this.tagSet.delete(tag)
        if (this.tagSet.size == 0) {
            this.tagSet = Ref.EMPTY_TAG_SET
        }
    }
}