"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForClass = void 0;
const decorator_support_1 = require("../decorator-support");
function ForClass(objectiveClass) {
    return decorator_support_1.decoratorGenerator.generateClassDecorator({ objectiveClass });
}
exports.ForClass = ForClass;
