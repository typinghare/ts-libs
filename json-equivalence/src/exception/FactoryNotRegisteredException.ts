import { JsonFactoryClass } from '../JsonFactory'

/**
 * This exception is thrown when the JSON equivalent factory has not been registered.
 * @author James Chan
 */
export class FactoryNotRegisteredException extends Error {
    constructor(jsonFactoryClass: JsonFactoryClass) {
        const name = jsonFactoryClass.name
        super(`JSON equivalent factory has not been registered: [ ${name} ].`)
    }
}