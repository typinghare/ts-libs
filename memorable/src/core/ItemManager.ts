import { Item, ItemID, ItemKey, ItemValue } from './Item'

export class ItemManager {
    /**
     * Mapping from items' IDs to items.
     * @private
     */
    private readonly byId: Map<ItemID, Item> = new Map()

    /**
     * Mapping from item keys to item lists.
     * @private
     */
    private readonly byKey: Map<ItemKey, Item[]> = new Map()

    /**
     * The max ID.
     * @private
     */
    private maxId: ItemID = 0

    /**
     * Retrieves an item by a specified ID.
     * @param id The specified ID
     */
    public getById(id: ItemID): Item {
        const item = this.byId.get(id)

        if (!item) {
            throw new Error('Item does not exist.')
        }

        return item
    }

    /**
     * Retrieves items by a specified key.
     * @param key The specified key
     */
    public getByKey(key: ItemKey): Item[] {
        const items = this.byKey.get(key)

        if (!items) {
            throw new Error('Item key does not exist.')
        }

        return items
    }

    /**
     * Registers an item.
     * @param key The key of the item
     * @param value The value of the item
     */
    public register(key: ItemKey, value: ItemValue): Item {
        const id = ++this.maxId
        const item = new Item(id, key, value)

        this.byId.set(id, item)

        const itemList = this.byKey.get(key)
        if (!itemList) {
            this.byKey.set(key, [item])
        } else {
            itemList.push(item)
        }

        return item
    }
}