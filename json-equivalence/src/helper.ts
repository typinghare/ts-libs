import { FactoryManager } from './FactoryManager'
import { getClass } from '@typinghare/ts-reflect'
import { JsonFactoriesProps } from './decorator/JsonFactories'
import { zone } from './decorator-support'
import { JsonFactoryClass } from './JsonFactory'
import { GlobalFactoryManager } from './GlobalFactoryManager'
import { ObjectiveClassNotFoundException } from './exception/ObjectiveClassNotFoundException'

/**
 * Represents a class type for the FactoryManager.
 * @typeParam T The type of the FactoryManager.
 */
export type FactoryManagerClass<T extends FactoryManager = any> = new () => T

/**
 * Gets a factory manager instance.
 * @param factoryManagerClass The class of the FactoryManager.
 * @returns The instance of the FactoryManager.
 */
export function getFactoryManager<T extends FactoryManager>(factoryManagerClass: FactoryManagerClass<T>): T {
    const factoryManger = new factoryManagerClass()

    // Retrieves all JSON factories from @JsonFactories.
    const factoryManagerClassReflect = getClass<JsonFactoriesProps>(factoryManagerClass)
    const jsonFactoryClassArray = factoryManagerClassReflect!.getContext(zone, 'jsonFactoryClassArray')

    // Register JSON factories if is given.
    if (jsonFactoryClassArray !== undefined) {
        for (const jsonFactoryClass of jsonFactoryClassArray) {
            factoryManger.register(jsonFactoryClass)
        }
    }

    return factoryManger
}

function toJsonString<O, J>(
    originalObject: object,
): string {
    const globalFactoryManager = new GlobalFactoryManager()
    const constructor = Object.getPrototypeOf(originalObject).constructor
    const jsonFactoryClass = globalFactoryManager.getFactoryFromObjectiveClass(constructor)
    if (jsonFactoryClass === undefined) {
        throw new ObjectiveClassNotFoundException(constructor)
    }

    const jsonObject = globalFactoryManager.produceJsonObject(jsonFactoryClass, originalObject)
    return JSON.stringify(jsonObject)
}

/**
 * Converts a json string to an original object.
 * @param jsonFactoryClass
 * @param jsonObjectString
 */
export function fromJsonString<O, J>(
    jsonFactoryClass: JsonFactoryClass<O, J>,
    jsonObjectString: string,
): O {
    const jsonObject = JSON.parse(jsonObjectString) as J
    return new GlobalFactoryManager().produceOriginalObject(jsonFactoryClass, jsonObject)
}