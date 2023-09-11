import { Convertor } from './Convertor'
import { Item } from './Item'
import { BaseObject } from './ItemConvertor'

/**
 * A convertor that converts objects to items.
 */
export class ObjectConvertor extends Convertor<BaseObject, Item> {
    public override convert(object: BaseObject): Item {
        let item = new Item(object.id, object.key, object.value)

        this.intermediateCallbackList.forEach(intermediateCallback => {
            item = intermediateCallback(object, item);
        });

        return item
    }
}