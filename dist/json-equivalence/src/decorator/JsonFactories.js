"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFactories = void 0;
const decorator_support_1 = require("../decorator-support");
function JsonFactories(jsonFactoryClassArray) {
    return decorator_support_1.decoratorGenerator.generateClassDecorator({ jsonFactoryClassArray });
}
exports.JsonFactories = JsonFactories;
