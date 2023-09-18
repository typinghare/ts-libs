import { JsonFactoryClass } from '../JsonFactory';
export interface JsonFactoriesProps {
    jsonFactoryClassArray: JsonFactoryClass[];
}
export declare function JsonFactories(jsonFactoryClassArray: JsonFactoryClass[]): ClassDecorator;
