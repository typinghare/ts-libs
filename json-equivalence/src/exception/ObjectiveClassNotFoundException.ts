import { AnyClass } from '../decorator/ForClass'

export class ObjectiveClassNotFoundException extends Error {
    constructor(objectiveClass: AnyClass) {
        super(`Objective class does not exist: [ ${objectiveClass} ]`)
    }
}