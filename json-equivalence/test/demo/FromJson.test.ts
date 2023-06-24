import { LibraryFactoryManager } from '../../demo/equiv/LibraryFactoryManager'
import { BookJsonFactory, BookJsonObject } from '../../demo/equiv/BookJsonFactory'
import { UserJsonFactory, UserJsonObject } from '../../demo/equiv/UserJsonFactory'
import { DecoratedLibraryFactoryManager } from '../../demo/equiv/DecoratedLibraryFactoryManager'
import { getFactoryManager } from '../../src/helper'

describe('Test fromJson().', function() {
    const libraryFactoryManager = new LibraryFactoryManager()
    const decoratedLibraryFactoryManger = getFactoryManager(DecoratedLibraryFactoryManager)

    it('Test Book.', function() {
        const BOOK_NAME = 'Clean Code'
        const BOOK_AUTHOR = 'Robert Cecil Martin'

        const bookJsonObject: BookJsonObject = {
            name: BOOK_NAME,
            author: BOOK_AUTHOR,
        }
        const book = libraryFactoryManager.produceOriginalObject(BookJsonFactory, bookJsonObject)
        expect(book.name).toEqual(BOOK_NAME)
        expect(book.author).toEqual(BOOK_AUTHOR)
    })

    it('Test User.', function() {
        const USER_USERID = 1128
        const USER_USERNAME = 'Zhuojian Chen'
        const BOOK_NAME_1 = 'Clean Code'
        const BOOK_AUTHOR_1 = 'Robert Cecil Martin'
        const BOOK_NAME_2 = 'Society of the Spectacle'
        const BOOK_AUTHOR_2 = 'Guy Debord'

        const userJsonObject: UserJsonObject = {
            userId: USER_USERID,
            username: USER_USERNAME,
            bookArray: [
                {
                    name: BOOK_NAME_1,
                    author: BOOK_AUTHOR_2,
                },
                {
                    name: BOOK_NAME_1,
                    author: BOOK_AUTHOR_2,
                },
            ],
        }

        const user = libraryFactoryManager.produceOriginalObject(UserJsonFactory, userJsonObject)
        const bookSet = user.getBookSet()
        expect(user.userId).toBe(USER_USERID)
        expect(user.username).toBe(USER_USERNAME)
        expect(bookSet.size).toBe(2)

        bookSet.forEach(book => {
            expect([BOOK_NAME_1, BOOK_NAME_2]).toContain(book.name)
            expect([BOOK_AUTHOR_1, BOOK_AUTHOR_2]).toContain(book.author)
        })

        const user2 = decoratedLibraryFactoryManger.produceOriginalObject(UserJsonFactory, userJsonObject)
        const bookSet2 = user.getBookSet()
        expect(user2.userId).toBe(USER_USERID)
        expect(user2.username).toBe(USER_USERNAME)
        expect(bookSet2.size).toBe(2)

        bookSet2.forEach(book => {
            expect([BOOK_NAME_1, BOOK_NAME_2]).toContain(book.name)
            expect([BOOK_AUTHOR_1, BOOK_AUTHOR_2]).toContain(book.author)
        })
    })
})