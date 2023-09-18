"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJsonString = exports.getFactoryManager = void 0;
const ts_reflect_1 = require("@typinghare/ts-reflect");
const decorator_support_1 = require("./decorator-support");
const GlobalFactoryManager_1 = require("./GlobalFactoryManager");
const ObjectiveClassNotFoundException_1 = require("./exception/ObjectiveClassNotFoundException");
/**
 * Gets a factory manager instance.
 * @param factoryManagerClass The class of the FactoryManager.
 * @returns The instance of the FactoryManager.
 */
function getFactoryManager(factoryManagerClass) {
    const factoryManger = new factoryManagerClass();
    // Retrieves all JSON factories from @JsonFactories.
    const factoryManagerClassReflect = (0, ts_reflect_1.getClass)(factoryManagerClass);
    const jsonFactoryClassArray = factoryManagerClassReflect.getContext(decorator_support_1.zone, 'jsonFactoryClassArray');
    // Register JSON factories if is given.
    if (jsonFactoryClassArray !== undefined) {
        for (const jsonFactoryClass of jsonFactoryClassArray) {
            factoryManger.register(jsonFactoryClass);
        }
    }
    return factoryManger;
}
exports.getFactoryManager = getFactoryManager;
function toJsonString(originalObject) {
    const globalFactoryManager = new GlobalFactoryManager_1.GlobalFactoryManager();
    const constructor = Object.getPrototypeOf(originalObject).constructor;
    const jsonFactoryClass = globalFactoryManager.getFactoryFromObjectiveClass(constructor);
    if (jsonFactoryClass === undefined) {
        throw new ObjectiveClassNotFoundException_1.ObjectiveClassNotFoundException(constructor);
    }
    const jsonObject = globalFactoryManager.produceJsonObject(jsonFactoryClass, originalObject);
    return JSON.stringify(jsonObject);
}
/**
 * Converts a json string to an original object.
 * @param jsonFactoryClass
 * @param jsonObjectString
 */
function fromJsonString(jsonFactoryClass, jsonObjectString) {
    const jsonObject = JSON.parse(jsonObjectString);
    return new GlobalFactoryManager_1.GlobalFactoryManager().produceOriginalObject(jsonFactoryClass, jsonObject);
}
exports.fromJsonString = fromJsonString;
