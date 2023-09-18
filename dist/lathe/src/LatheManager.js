"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatheManager = void 0;
/**
 * Lathe Manager.
 */
class LatheManager {
    /**
     * Creates a lathe manager.
     * @param latheMapping Mapping of lathes
     */
    constructor(latheMapping) {
        this.latheMapping = latheMapping;
    }
    /**
     * Retrieves a lathe by its name.
     * @param name The name of the lathe
     */
    getLathe(name) {
        return this.latheMapping[name];
    }
}
exports.LatheManager = LatheManager;
