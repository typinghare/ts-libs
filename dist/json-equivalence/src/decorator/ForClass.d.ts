export type AnyClass = new (...args: any[]) => any;
export interface ForClassProps {
    objectiveClass: AnyClass;
}
export declare function ForClass(objectiveClass: AnyClass): ClassDecorator;
