import { FactoryManager } from './FactoryManager'

/**
 * Represents a class type for the JsonEquivalentFactory.
 * @typeParam O The type of the original object.
 * @typeParam J The type of the JSON object.
 */
export type JsonEquivalentFactoryClass<O = any, J = any> = new (
    factoryManager: FactoryManager,
    originalObject?: O,
) => JsonEquivalentFactory<O, J>;

/**
 * Represents a factory for converting between original objects (O) and JSON objects (J).
 * @typeParam O The type of the original object.
 * @typeParam J The type of the JSON object.
 * @author James Chan
 */
export abstract class JsonEquivalentFactory<O = any, J = any> {
    /**
     * The factory manager creating this factory.
     * @protected
     */
    private _factoryManager: FactoryManager

    /**
     * Creates an instance of the JsonEquivalentFactory.
     * @param factoryManager The factory manager creating this factory.
     */
    protected constructor(factoryManager: FactoryManager) {
        this._factoryManager = factoryManager
    }

    /**
     * Converts the given JSON object to an original object.
     * @param jsonObject The JSON object to convert.
     * @returns The original object.
     */
    abstract fromJson(jsonObject: J): O;

    /**
     * Converts the original object to a JSON object.
     * @param originalObject The original object to convert.
     * @returns The JSON representation of the original object.
     */
    abstract toJson(originalObject: O): J;

    /**
     * Retrieves a JSON equivalent factory from the factory manager.
     * @param jsonEquivalentFactoryClass The class of the JSON equivalent factory.
     */
    getFactory<O, J>(jsonEquivalentFactoryClass: JsonEquivalentFactoryClass<O, J>): JsonEquivalentFactory {
        return this._factoryManager.provideFactory(jsonEquivalentFactoryClass)
    }
}