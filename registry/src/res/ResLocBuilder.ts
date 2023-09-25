import { ResLoc } from './ResLoc'

/**
 * Resource location builder.
 */
export class ResLocBuilder {
    /**
     * Creates a resource location builder.
     * @param defaultNamespace The default namespace for created resource locations
     */
    public constructor(private readonly defaultNamespace: string) {
    }

    /**
     * Creates a resource location by using the default namespace.
     * @param path The path of the resource location
     */
    public create(path: string): ResLoc;
    /**
     * Creates a resource location.
     * @param namespace The namespace of the resource location
     * @param path The path of the resource location
     */
    public create(namespace: string, path: string): ResLoc;
    public create(namespace: string, path?: string): ResLoc {
        return path === undefined ?
            this.create(this.defaultNamespace, namespace) :
            new ResLoc(namespace, path)
    }
}