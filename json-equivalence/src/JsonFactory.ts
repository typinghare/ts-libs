import { FactoryManager } from './FactoryManager'

/**
 * Represents a class type for the JsonFactory.
 * @typeParam O The type of the original object.
 * @typeParam J The type of the JSON object.
 */
export type JsonFactoryClass<O = any, J = any> = new (
    factoryManager: FactoryManager,
    originalObject?: O,
) => JsonFactory<O, J>;

/**
 * Represents a factory for converting between original objects (O) and JSON objects (J).
 * @typeParam O The type of the original object.
 * @typeParam J The type of the JSON object.
 * @author James Chan
 */
export abstract class JsonFactory<O = any, J = any> {
    /**
     * The factory manager creating this factory.
     * @protected
     */
    private _factoryManager: FactoryManager

    /**
     * Creates an instance of the JsonFactory.
     * @param factoryManager The factory manager creating this factory.
     */
    public constructor(factoryManager: FactoryManager) {
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
     * Retrieves a JSON factory from the factory manager.
     * @param jsonFactoryClass The class of the JSON factory.
     */
    getFactory<AO, AJ>(jsonFactoryClass: JsonFactoryClass<AO, AJ>): JsonFactory<AO, AJ> {
        return this._factoryManager.provideFactory(jsonFactoryClass)
    }
}