import { Datum, Metadata } from './Datum'

/**
 * Data type.
 */
export type Data = Record<string, any>

/**
 * Data mapping type.
 */
export type DataMapping<D extends Data, M extends Metadata = Metadata> = {
    [K in keyof D]: Datum<D[K], M>
}

/**
 * Data collection.
 * @type <D> The data to collect.
 * @type <M> The metadata of each datum.
 */
export class DataCollection<
    D extends Data,
    M extends Metadata = Metadata
> {
    /**
     * Creates a data collection.
     * @param data Data mapping.
     */
    constructor(protected data: DataMapping<D, M>) {
    }

    /**
     * Returns a datum by a specified name.
     * @param name The name of the datum to get.
     * @type <K> The name of a specific datum.
     * @type <CM> The custom metadata.
     */
    getDatum<K extends keyof D, CM extends M = M>(name: K): Datum<D[K], CM> {
        return this.data[name] as Datum<D[K], CM>
    }

    /**
     * Returns data.
     * @type <CM> The custom metadata.
     */
    getData<CM extends M = M>(): DataMapping<D, CM> {
        return this.data as DataMapping<D, CM>
    }

    /**
     * Returns the value of a specific datum.
     * @param name The name of a specific datum.
     */
    getValue<K extends keyof D>(name: K): D[K] {
        return this.getDatum(name).value
    }
}