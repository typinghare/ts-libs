/**
 * Represents a book.
 */
export class Book {
    private readonly _name: string
    private readonly _author: string

    /**
     * Creates an instance of the Book class.
     * @param name The name of the book.
     * @param author The author of the book.
     */
    constructor(name: string, author: string) {
        this._name = name
        this._author = author
    }

    get name(): string {
        return this._name
    }

    get author(): string {
        return this._author
    }
}