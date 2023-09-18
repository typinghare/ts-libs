"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryManager = void 0;
const FactoryNotRegisteredException_1 = require("./exception/FactoryNotRegisteredException");
const ts_reflect_1 = require("@typinghare/ts-reflect");
const decorator_support_1 = require("./decorator-support");
/**
 * Represents a factory manager for registering and providing JSON factories.
 * @author James Chan
 */
class FactoryManager {
    constructor() {
        /**
         * A map of JSON factories.
         * @private
         */
        this._factoryMap = new Map();
        /**
         * A map from classes to corresponding factories.
         * @private
         */
        this._classFactoryMap = new Map();
    }
    /**
     * Register a JSON factory.
     * @param jsonFactoryClass The class of the JSON factory to register.
     * @see JsonFactory
     */
    register(jsonFactoryClass) {
        this._factoryMap.set(jsonFactoryClass, new jsonFactoryClass(this, undefined));
        const classReflector = (0, ts_reflect_1.getClass)(jsonFactoryClass);
        if (classReflector !== undefined) {
            const objectiveClass = classReflector.getContext(decorator_support_1.zone, 'objectiveClass');
            if (objectiveClass !== undefined) {
                this._classFactoryMap.set(objectiveClass, jsonFactoryClass);
            }
        }
    }
    /**
     * Provides a JSON factory.
     * @param jsonFactoryClass The class of the JSON factory to provide.
     * @returns The JSON factory instance.
     * @throws FactoryNotFoundException if the given class has not been registered.
     */
    provideFactory(jsonFactoryClass) {
        if (!this._factoryMap.has(jsonFactoryClass)) {
            throw new FactoryNotRegisteredException_1.FactoryNotRegisteredException(jsonFactoryClass);
        }
        return this._factoryMap.get(jsonFactoryClass);
    }
    /**
     * Returns the JSON factory from an objective class.
     * @param objectiveClass the objective class.
     */
    getFactoryFromObjectiveClass(objectiveClass) {
        return this._classFactoryMap.get(objectiveClass);
    }
    /**
     * Produces a JSON object.
     * @param jsonFactoryClass The class of the JSON factory.
     * @param originalObject The original object to convert to a JSON object.
     * @returns The produced JSON object.
     */
    produceJsonObject(jsonFactoryClass, originalObject) {
        return this.provideFactory(jsonFactoryClass).toJson(originalObject);
    }
    /**
     * Produces an original object.
     * @param jsonFactoryClass The class of the JSON factory.
     * @param jsonObject The JSON object to convert to an original object.
     * @returns The produced original object.
     */
    produceOriginalObject(jsonFactoryClass, jsonObject) {
        return this.provideFactory(jsonFactoryClass).fromJson(jsonObject);
    }
}
exports.FactoryManager = FactoryManager;
