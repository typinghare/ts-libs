import { FactoryManager } from './FactoryManager'
import { Class, getAllClasses } from '@typinghare/ts-reflect/src/main'
import { zone } from './decorator-support'
import { ForClassProps } from './decorator/ForClass'
import { JsonFactoryClass } from './JsonFactory'

export class GlobalFactoryManager extends FactoryManager {
    constructor() {
        super()

        for (const classReflector of getAllClasses()) {
            // @ts-ignore
            const objectiveClass = (classReflector as Class<ForClassProps>).getContext(zone, 'objectiveClass')
            if (objectiveClass === undefined) continue

            this.register(classReflector.getConstructor() as JsonFactoryClass)
        }
    }
}