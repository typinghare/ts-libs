export type ItemKey = string
export type ItemValue = string

export type ItemPropertyKey = string

export type ItemProperties = Record<ItemPropertyKey, any>

export type ItemID = number

/**
 * An item consists of a key and a value.
 * @param P The properties of the item
 */
export class Item<P extends ItemProperties = {}> {
    /**
     * Properties of this item.
     * @private
     */
    private readonly properties: P = {} as P

    /**
     * Creates an item.
     * @param id The ID of this item
     * @param key The key of this item
     * @param value The value of this item
     */
    public constructor(
        private readonly id: ItemID,
        private readonly key: ItemKey,
        private readonly value: ItemValue,
    ) {
    }

    /**
     * Returns the ID of this item.
     */
    public getId(): ItemID {
        return this.id
    }

    /**
     * Returns the key of this item.
     */
    public getKey(): ItemKey {
        return this.key
    }

    /**
     * Returns the value of this item.
     */
    public getValue(): ItemValue {
        return this.value
    }

    /**
     * Returns the properties of this item.
     */
    public getProperties(): P {
        return this.properties
    }

    /**
     * Returns the value of a property.
     * @param key The property value
     */
    public getPropertyValue<K extends keyof P, T extends P[K]>(key: K): T {
        return this.properties[key]
    }
}