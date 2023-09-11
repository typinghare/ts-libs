import { IntermediateCallback } from './Convertor'
import { BaseObject } from './ItemConvertor'
import { Item } from './Item'

/**
 * Plugin abstract class.
 */
export abstract class MemorablePlugin {
    public provideItemIntermediateCallback(): IntermediateCallback<Item, BaseObject> | undefined {
        return undefined
    }

    public provideObjectIntermediateCallback(): IntermediateCallback<BaseObject, Item> | undefined {
        return undefined
    }

    public afterCreateItem(item: Item): void {
    }
}