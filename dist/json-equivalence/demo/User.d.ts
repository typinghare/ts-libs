import { Book } from './Book';
/**
 * Represents a user.
 */
export declare class User {
    private readonly _userId;
    private readonly _username;
    private readonly _bookSet;
    /**
     * Creates a user.
     * @param userId
     * @param username
     */
    constructor(userId: number, username: string);
    get userId(): number;
    get username(): string;
    /**
     * Adds a book to the user's book set.
     * @param book The book to add.
     */
    addBook(book: Book): void;
    /**
     * Retrieves the set of books owned by the user.
     * @returns The set of books owned by the user.
     */
    getBookSet(): Set<Book>;
}
