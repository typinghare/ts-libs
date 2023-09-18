"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFactory = void 0;
/**
 * Represents a factory for converting between original objects (O) and JSON objects (J).
 * @typeParam O The type of the original object.
 * @typeParam J The type of the JSON object.
 * @author James Chan
 */
class JsonFactory {
    /**
     * Creates an instance of the JsonFactory.
     * @param factoryManager The factory manager creating this factory.
     */
    constructor(factoryManager) {
        this._factoryManager = factoryManager;
    }
    /**
     * Retrieves a JSON factory from the factory manager.
     * @param jsonFactoryClass The class of the JSON factory.
     */
    getFactory(jsonFactoryClass) {
        return this._factoryManager.provideFactory(jsonFactoryClass);
    }
}
exports.JsonFactory = JsonFactory;
