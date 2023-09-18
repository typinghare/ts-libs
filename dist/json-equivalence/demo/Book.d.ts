/**
 * Represents a book.
 */
export declare class Book {
    private readonly _name;
    private readonly _author;
    /**
     * Creates an instance of the Book class.
     * @param name The name of the book.
     * @param author The author of the book.
     */
    constructor(name: string, author: string);
    get name(): string;
    get author(): string;
}
