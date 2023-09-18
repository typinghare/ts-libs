"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
/**
 * Represents a book.
 */
class Book {
    /**
     * Creates an instance of the Book class.
     * @param name The name of the book.
     * @param author The author of the book.
     */
    constructor(name, author) {
        this._name = name;
        this._author = author;
    }
    get name() {
        return this._name;
    }
    get author() {
        return this._author;
    }
}
exports.Book = Book;
