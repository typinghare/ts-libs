import { ItemConvertor } from './core/ItemConvertor'
import { ObjectConvertor } from './core/ObjectConvertor'
import { ItemManager } from './core/ItemManager'
import { PluginManager } from './core/PluginManager'

/**
 * A utility class storing builtin constants and objects.
 */
export class Builtins {
    /**
     * Builtin item manager.
     */
    public static readonly ITEM_MANAGER: ItemManager = new ItemManager()

    /**
     * Builtin item convertor
     */
    public static readonly ITEM_CONVERTOR: ItemConvertor = new ItemConvertor()

    /**
     * Builtin object convertor
     */
    public static readonly OBJECT_CONVERTOR: ObjectConvertor = new ObjectConvertor()

    /**
     * Builtin plugin manager.
     */
    public static readonly PLUGIN_MANAGER: PluginManager = new PluginManager()
}