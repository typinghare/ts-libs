"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectiveClassNotFoundException = void 0;
class ObjectiveClassNotFoundException extends Error {
    constructor(objectiveClass) {
        super(`Objective class does not exist: [ ${objectiveClass} ]`);
    }
}
exports.ObjectiveClassNotFoundException = ObjectiveClassNotFoundException;
