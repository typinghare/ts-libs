import { Convertor } from './Convertor'
import { Item } from './Item'

export interface BaseObject {
    id: number
    key: string
    value: string
}

/**
 * A convertor that converts items to objects.
 */
export class ItemConvertor extends Convertor<Item, BaseObject> {
    public override convert(item: Item): BaseObject {
        let object = {} as BaseObject

        object.id = item.getId()
        object.key = item.getKey().toString()
        object.value = item.getValue().toString()

        this.intermediateCallbackList.forEach(intermediateCallback => {
            object = intermediateCallback(object) as BaseObject
        })

        return object
    }
}