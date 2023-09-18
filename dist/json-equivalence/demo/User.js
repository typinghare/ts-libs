"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/**
 * Represents a user.
 */
class User {
    /**
     * Creates a user.
     * @param userId
     * @param username
     */
    constructor(userId, username) {
        this._bookSet = new Set();
        this._userId = userId;
        this._username = username;
    }
    get userId() {
        return this._userId;
    }
    get username() {
        return this._username;
    }
    /**
     * Adds a book to the user's book set.
     * @param book The book to add.
     */
    addBook(book) {
        this._bookSet.add(book);
    }
    /**
     * Retrieves the set of books owned by the user.
     * @returns The set of books owned by the user.
     */
    getBookSet() {
        return this._bookSet;
    }
}
exports.User = User;
