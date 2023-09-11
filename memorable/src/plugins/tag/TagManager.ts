import { Tag, TagLabel } from './Tag'

export class TagManager {
    /**
     * Mapping of tags' label to tags.
     * @private
     */
    private readonly tagMap: Map<TagLabel, Tag> = new Map<string, Tag>()

    /**
     * Retrieves a tag of certain tag label.
     * @param tagLabel The label of the tag to retrieve
     */
    public getTag(tagLabel: TagLabel): Tag {
        const tag = this.tagMap.get(tagLabel)

        if (tag !== undefined) {
            return tag
        } else {
            const tag = new Tag(tagLabel)
            this.tagMap.set(tagLabel, tag)

            return tag
        }
    }

    /**
     * Whether a tag label exists.
     * @param tagLabel
     */
    public tagLabelExist(tagLabel: TagLabel): boolean {
        return this.tagMap.has(tagLabel)
    }
}