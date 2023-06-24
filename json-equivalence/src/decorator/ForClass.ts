import { decoratorGenerator } from '../decorator-support'

export type AnyClass = new (...args: any[]) => any

export interface ForClassProps {
    objectiveClass: AnyClass
}

export function ForClass(objectiveClass: AnyClass): ClassDecorator {
    return decoratorGenerator.generateClassDecorator<ForClassProps>({ objectiveClass })
}