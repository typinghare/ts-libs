import { Datum, Metadata } from './Datum'

/**
 * Data.
 */
export type Data = Record<string, any>

/**
 * Data mapping.
 */
export type DataMapping<D extends Record<string, any>, M extends Metadata = {}> = {
    [K in keyof D]: Datum<D[K]>
}

/**
 * Data collection.
 * @type <D> The data to collect.
 * @type <M> The metadata of each datum.
 */
export class DataCollection<
    D extends Data = {},
    M extends Metadata = {}
> {
    constructor(protected data: DataMapping<D>) {
    }

    /**
     * Gets a datum by a specified name.
     * @param name The name of the datum to get.
     * @type <K> The name of a specific datum.
     * @type <CM> The custom metadata.
     */
    getDatum<K extends keyof D, CM extends Record<string, any> = M>(name: K): Datum<D[K], CM> {
        return this.data[name] as Datum<D[K], CM>
    }

    /**
     * Gets data.
     * @type <CM> The custom metadata.
     */
    getData<CM extends Record<string, any> = M>(): DataMapping<D, CM> {
        return this.data as DataMapping<D, CM>
    }

    /**
     * Gets the value of a specific datum.
     * @param name The name of a specific datum.
     */
    getValue<K extends keyof D>(name: K): D[K] {
        return this.getDatum(name).value
    }
}