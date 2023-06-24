import { decoratorGenerator } from '../decorator-support'
import { JsonFactoryClass } from '../JsonFactory'

export interface JsonFactoriesProps {
    jsonFactoryClassArray: JsonFactoryClass[]
}

export function JsonFactories(jsonFactoryClassArray: JsonFactoryClass[]): ClassDecorator {
    return decoratorGenerator.generateClassDecorator<JsonFactoriesProps>({ jsonFactoryClassArray })
}