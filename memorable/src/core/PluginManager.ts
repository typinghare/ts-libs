import { MemorablePlugin } from './MemorablePlugin'
import { Builtins } from '../Builtins'

/**
 * Plugin manager.
 */
export class PluginManager {
    /**
     * List of plugin.
     * @private
     */
    private readonly pluginList: MemorablePlugin[] = []

    /**
     * Registers a plugin
     * @param plugin
     */
    public register(plugin: MemorablePlugin): void {
        this.pluginList.push(plugin)

        const itemIntermediateCallback = plugin.provideItemIntermediateCallback()
        if (itemIntermediateCallback) {
            Builtins.ITEM_CONVERTOR.addIntermediateFunction(itemIntermediateCallback)
        }

        const objectIntermediateCallback = plugin.provideObjectIntermediateCallback()
        if (objectIntermediateCallback) {
            Builtins.OBJECT_CONVERTOR.addIntermediateFunction(objectIntermediateCallback)
        }
    }

    /**
     * Returns the plugin list.
     */
    public getPluginList(): MemorablePlugin[] {
        return this.pluginList
    }
}