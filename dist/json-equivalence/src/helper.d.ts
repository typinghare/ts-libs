import { FactoryManager } from './FactoryManager';
import { JsonFactoryClass } from './JsonFactory';
/**
 * Represents a class type for the FactoryManager.
 * @typeParam T The type of the FactoryManager.
 */
export type FactoryManagerClass<T extends FactoryManager = any> = new () => T;
/**
 * Gets a factory manager instance.
 * @param factoryManagerClass The class of the FactoryManager.
 * @returns The instance of the FactoryManager.
 */
export declare function getFactoryManager<T extends FactoryManager>(factoryManagerClass: FactoryManagerClass<T>): T;
/**
 * Converts a json string to an original object.
 * @param jsonFactoryClass
 * @param jsonObjectString
 */
export declare function fromJsonString<O, J>(jsonFactoryClass: JsonFactoryClass<O, J>, jsonObjectString: string): O;
