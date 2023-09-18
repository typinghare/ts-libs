import { JsonFactoryClass } from '../JsonFactory';
/**
 * This exception is thrown when the JSON equivalent factory has not been registered.
 * @author James Chan
 */
export declare class FactoryNotRegisteredException extends Error {
    constructor(jsonFactoryClass: JsonFactoryClass);
}
