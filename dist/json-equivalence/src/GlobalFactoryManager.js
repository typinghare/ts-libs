"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalFactoryManager = void 0;
const FactoryManager_1 = require("./FactoryManager");
const main_1 = require("@typinghare/ts-reflect/src/main");
const decorator_support_1 = require("./decorator-support");
class GlobalFactoryManager extends FactoryManager_1.FactoryManager {
    constructor() {
        super();
        for (const classReflector of (0, main_1.getAllClasses)()) {
            // @ts-ignore
            const objectiveClass = classReflector.getContext(decorator_support_1.zone, 'objectiveClass');
            if (objectiveClass === undefined)
                continue;
            this.register(classReflector.getConstructor());
        }
    }
}
exports.GlobalFactoryManager = GlobalFactoryManager;
