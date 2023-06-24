import { JsonFactory, JsonFactoryClass } from './JsonFactory'
import { FactoryNotRegisteredException } from './exception/FactoryNotRegisteredException'
import { AnyClass, ForClassProps } from './decorator/ForClass'
import { getClass } from '@typinghare/ts-reflect'
import { zone } from './decorator-support'

/**
 * Represents a factory manager for registering and providing JSON factories.
 * @author James Chan
 */
export abstract class FactoryManager {
    /**
     * A map of JSON factories.
     * @private
     */
    private readonly _factoryMap: Map<JsonFactoryClass, JsonFactory> = new Map()

    /**
     * A map from classes to corresponding factories.
     * @private
     */
    private readonly _classFactoryMap: Map<AnyClass, JsonFactoryClass> = new Map()

    /**
     * Register a JSON factory.
     * @param jsonFactoryClass The class of the JSON factory to register.
     * @see JsonFactory
     */
    register(jsonFactoryClass: JsonFactoryClass): void {
        this._factoryMap.set(jsonFactoryClass, new jsonFactoryClass(this, undefined))

        const classReflector = getClass<ForClassProps>(jsonFactoryClass)
        if (classReflector !== undefined) {
            const objectiveClass = classReflector.getContext(zone, 'objectiveClass')
            if (objectiveClass !== undefined) {
                this._classFactoryMap.set(objectiveClass, jsonFactoryClass)
            }
        }
    }

    /**
     * Provides a JSON factory.
     * @param jsonFactoryClass The class of the JSON factory to provide.
     * @returns The JSON factory instance.
     * @throws FactoryNotFoundException if the given class has not been registered.
     */
    provideFactory(jsonFactoryClass: JsonFactoryClass): JsonFactory {
        if (!this._factoryMap.has(jsonFactoryClass)) {
            throw new FactoryNotRegisteredException(jsonFactoryClass)
        }

        return this._factoryMap.get(jsonFactoryClass)!
    }

    /**
     * Returns the JSON factory from an objective class.
     * @param objectiveClass the objective class.
     */
    getFactoryFromObjectiveClass(objectiveClass: AnyClass): JsonFactoryClass | undefined {
        return this._classFactoryMap.get(objectiveClass)
    }

    /**
     * Produces a JSON object.
     * @param jsonFactoryClass The class of the JSON factory.
     * @param originalObject The original object to convert to a JSON object.
     * @returns The produced JSON object.
     */
    produceJsonObject<O, J>(jsonFactoryClass: JsonFactoryClass<O, J>, originalObject: O): J {
        return this.provideFactory(jsonFactoryClass).toJson(originalObject)
    }

    /**
     * Produces an original object.
     * @param jsonFactoryClass The class of the JSON factory.
     * @param jsonObject The JSON object to convert to an original object.
     * @returns The produced original object.
     */
    produceOriginalObject<O, J>(jsonFactoryClass: JsonFactoryClass<O, J>, jsonObject: J): O {
        return this.provideFactory(jsonFactoryClass).fromJson(jsonObject)
    }
}