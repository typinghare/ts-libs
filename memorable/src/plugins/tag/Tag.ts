
export type TagLabel = string

/**
 * Label tag.
 */
export class Tag {
    /**
     * Creates a tag.
     * @param label The label of this tag
     */
    public constructor(private readonly label: TagLabel) {
    }

    /**
     * returns the label of this tag.
     */
    public getLabel(): TagLabel {
        return this.label
    }
}