"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryFactoryManager = void 0;
const FactoryManager_1 = require("../../src/FactoryManager");
const BookJsonFactory_1 = require("./BookJsonFactory");
const UserJsonFactory_1 = require("./UserJsonFactory");
class LibraryFactoryManager extends FactoryManager_1.FactoryManager {
    constructor() {
        super();
        // Register JSON factories here.
        this.register(UserJsonFactory_1.UserJsonFactory);
        this.register(BookJsonFactory_1.BookJsonFactory);
    }
}
exports.LibraryFactoryManager = LibraryFactoryManager;
