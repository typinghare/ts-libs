"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryNotRegisteredException = void 0;
/**
 * This exception is thrown when the JSON equivalent factory has not been registered.
 * @author James Chan
 */
class FactoryNotRegisteredException extends Error {
    constructor(jsonFactoryClass) {
        const name = jsonFactoryClass.name;
        super(`JSON equivalent factory has not been registered: [ ${name} ].`);
    }
}
exports.FactoryNotRegisteredException = FactoryNotRegisteredException;
