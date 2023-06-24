import { LibraryFactoryManager } from '../../demo/equiv/LibraryFactoryManager'
import { BookJsonFactory } from '../../demo/equiv/BookJsonFactory'
import { Book } from '../../demo/Book'
import { User } from '../../demo/User'
import { UserJsonFactory } from '../../demo/equiv/UserJsonFactory'
import { FactoryManager } from '../../src/FactoryManager'
import { FactoryNotRegisteredException } from '../../src/exception/FactoryNotRegisteredException'

describe('Test toJson().', function() {
    const libraryFactoryManager = new LibraryFactoryManager()

    it('Test Book.', function() {
        const BOOK_NAME = 'Clean Code'
        const BOOK_AUTHOR = 'Robert Cecil Martin'

        const book = new Book(BOOK_NAME, BOOK_AUTHOR)
        const bookJsonObject = libraryFactoryManager.produceJsonObject(BookJsonFactory, book)
        expect(bookJsonObject.name).toEqual(BOOK_NAME)
        expect(bookJsonObject.author).toEqual(BOOK_AUTHOR)
    })

    it('Test User.', function() {
        const USER_USERID = 1128
        const USER_USERNAME = 'Zhuojian Chen'
        const BOOK_NAME_1 = 'Clean Code'
        const BOOK_AUTHOR_1 = 'Robert Cecil Martin'
        const BOOK_NAME_2 = 'Society of the Spectacle'
        const BOOK_AUTHOR_2 = 'Guy Debord'

        const user = new User(USER_USERID, USER_USERNAME)
        const book1 = new Book(BOOK_NAME_1, BOOK_AUTHOR_1)
        const book2 = new Book(BOOK_NAME_2, BOOK_AUTHOR_2)
        user.addBook(book1)
        user.addBook(book2)

        const userJsonObject = libraryFactoryManager.produceJsonObject(UserJsonFactory, user)
        expect(userJsonObject.userId).toBe(USER_USERID)
        expect(userJsonObject.username).toBe(USER_USERNAME)
        expect(userJsonObject.bookArray.length).toBe(2)

        expect([BOOK_NAME_1, BOOK_NAME_2]).toContain(userJsonObject.bookArray[0].name)
        expect([BOOK_AUTHOR_1, BOOK_AUTHOR_2]).toContain(userJsonObject.bookArray[1].author)
    })

    it('Test FactoryNotRegisteredException.', function() {
        const USER_USERID = 1128
        const USER_USERNAME = 'Zhuojian Chen'
        const BOOK_NAME_1 = 'Clean Code'
        const BOOK_AUTHOR_1 = 'Robert Cecil Martin'
        const BOOK_NAME_2 = 'Society of the Spectacle'
        const BOOK_AUTHOR_2 = 'Guy Debord'

        const user = new User(USER_USERID, USER_USERNAME)
        const book1 = new Book(BOOK_NAME_1, BOOK_AUTHOR_1)
        const book2 = new Book(BOOK_NAME_2, BOOK_AUTHOR_2)
        user.addBook(book1)
        user.addBook(book2)

        class FakeLibraryFactoryManger extends FactoryManager {
            constructor() {
                super()
                this.register(UserJsonFactory)
            }
        }

        const fakeLibraryFactoryManger = new FakeLibraryFactoryManger()

        expect(() => {
            fakeLibraryFactoryManger.produceJsonObject(UserJsonFactory, user)
        }).toThrow(FactoryNotRegisteredException)
    })
})