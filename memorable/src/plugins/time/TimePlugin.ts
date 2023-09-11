import { MemorablePlugin } from '../../core/MemorablePlugin'
import { IntermediateCallback } from '../../core/Convertor'
import { BaseObject } from '../../core/ItemConvertor'
import { Item } from '../../core/Item'

interface TimeObject extends BaseObject {
    time: number
}

export class TimePlugin extends MemorablePlugin {
    public override provideItemIntermediateCallback(): IntermediateCallback<Item, BaseObject> {
        return function(item: Item, object: BaseObject): TimeObject {
            const timeObject = object as TimeObject
            timeObject.time = (item as Item<TimeObject>).getPropertyValue('time')

            return timeObject
        }
    }

    public override provideObjectIntermediateCallback(): IntermediateCallback<BaseObject, Item> {
        return function(object: BaseObject, item: Item): Item {
            const properties = (item as Item<TimeObject>).getProperties()
            properties.time = (object as TimeObject).time

            return item
        }
    }

    public override afterCreateItem(item: Item): void {
        (item as Item<TimeObject>).setPropertyValue('time', new Date().getTime())
    }
}