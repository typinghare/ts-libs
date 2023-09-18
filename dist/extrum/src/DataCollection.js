"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCollection = void 0;
/**
 * Data collection.
 * @type <D> The data to collect.
 * @type <M> The metadata of each datum.
 */
class DataCollection {
    /**
     * Creates a data collection.
     * @param data Data mapping.
     */
    constructor(data) {
        this.data = data;
    }
    /**
     * Returns a datum by a specified name.
     * @param name The name of the datum to get.
     * @type <K> The name of a specific datum.
     * @type <CM> The custom metadata.
     */
    getDatum(name) {
        return this.data[name];
    }
    /**
     * Returns data.
     * @type <CM> The custom metadata.
     */
    getData() {
        return this.data;
    }
    /**
     * Returns the datum list.
     * @since 1.1.0
     */
    getDatumList() {
        return Object.values(this.data);
    }
    /**
     * Returns the value of a specific datum.
     * @param name The name of a specific datum.
     */
    getValue(name) {
        return this.getDatum(name).value;
    }
    /**
     * Returns the metadata object.
     * @param name The name of the datum.
     * @since 1.1.0
     */
    getMetadata(name) {
        return this.getDatum(name).getMetadata();
    }
    /**
     * check if a name exists.
     * @param name The name to check.
     * @since 1.1.0
     */
    exist(name) {
        return this.data.hasOwnProperty(name);
    }
}
exports.DataCollection = DataCollection;
