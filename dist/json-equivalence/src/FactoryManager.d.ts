import { JsonFactory, JsonFactoryClass } from './JsonFactory';
import { AnyClass } from './decorator/ForClass';
/**
 * Represents a factory manager for registering and providing JSON factories.
 * @author James Chan
 */
export declare abstract class FactoryManager {
    /**
     * A map of JSON factories.
     * @private
     */
    private readonly _factoryMap;
    /**
     * A map from classes to corresponding factories.
     * @private
     */
    private readonly _classFactoryMap;
    /**
     * Register a JSON factory.
     * @param jsonFactoryClass The class of the JSON factory to register.
     * @see JsonFactory
     */
    register(jsonFactoryClass: JsonFactoryClass): void;
    /**
     * Provides a JSON factory.
     * @param jsonFactoryClass The class of the JSON factory to provide.
     * @returns The JSON factory instance.
     * @throws FactoryNotFoundException if the given class has not been registered.
     */
    provideFactory(jsonFactoryClass: JsonFactoryClass): JsonFactory;
    /**
     * Returns the JSON factory from an objective class.
     * @param objectiveClass the objective class.
     */
    getFactoryFromObjectiveClass(objectiveClass: AnyClass): JsonFactoryClass | undefined;
    /**
     * Produces a JSON object.
     * @param jsonFactoryClass The class of the JSON factory.
     * @param originalObject The original object to convert to a JSON object.
     * @returns The produced JSON object.
     */
    produceJsonObject<O, J>(jsonFactoryClass: JsonFactoryClass<O, J>, originalObject: O): J;
    /**
     * Produces an original object.
     * @param jsonFactoryClass The class of the JSON factory.
     * @param jsonObject The JSON object to convert to an original object.
     * @returns The produced original object.
     */
    produceOriginalObject<O, J>(jsonFactoryClass: JsonFactoryClass<O, J>, jsonObject: J): O;
}
