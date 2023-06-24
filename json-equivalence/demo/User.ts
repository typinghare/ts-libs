import { Book } from './Book'

/**
 * Represents a user.
 */
export class User {
    private readonly _userId: number

    private readonly _username: string

    private readonly _bookSet: Set<Book> = new Set<Book>()

    /**
     * Creates a user.
     * @param userId
     * @param username
     */
    constructor(userId: number, username: string) {
        this._userId = userId
        this._username = username
    }

    get userId(): number {
        return this._userId
    }

    get username(): string {
        return this._username
    }

    /**
     * Adds a book to the user's book set.
     * @param book The book to add.
     */
    addBook(book: Book): void {
        this._bookSet.add(book)
    }

    /**
     * Retrieves the set of books owned by the user.
     * @returns The set of books owned by the user.
     */
    getBookSet(): Set<Book> {
        return this._bookSet
    }
}