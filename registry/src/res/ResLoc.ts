/**
 * Resource location.
 */
export class ResLoc {
    /**
     * The delimiter between the namespace and the path.
     */
    public static readonly DELIMITER = ':'

    /**
     * Creates a resource location.
     * @param namespace The namespace of this resource location.
     * @param path The path of this resource location.
     */
    public constructor(
        private readonly namespace: string,
        private readonly path: string,
    ) {
        // Validate namespace
        if (namespace.match(/^[A-Za-z0-9-]+$/) === null) {
            throw new Error(`Illegal namespace: [ ${namespace} ].`)
        }

        // Validate path
        if (namespace.match(/^[A-Za-z0-9/._-]+$/) === null) {
            throw new Error(`Illegal path: [ ${namespace} ].`)
        }
    }

    /**
     * Returns the namespace of this resource location.
     */
    public getNamespace(): string {
        return this.namespace
    }

    /**
     * Returns the path of this resource location.
     */
    public getPath(): string {
        return this.path
    }

    /**
     * Returns the resource location string.
     */
    public toString(): string {
        return this.namespace + ResLoc.DELIMITER + this.path
    }
}