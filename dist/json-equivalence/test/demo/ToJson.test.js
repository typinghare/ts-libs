"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LibraryFactoryManager_1 = require("../../demo/equiv/LibraryFactoryManager");
const BookJsonFactory_1 = require("../../demo/equiv/BookJsonFactory");
const Book_1 = require("../../demo/Book");
const User_1 = require("../../demo/User");
const UserJsonFactory_1 = require("../../demo/equiv/UserJsonFactory");
const FactoryManager_1 = require("../../src/FactoryManager");
const FactoryNotRegisteredException_1 = require("../../src/exception/FactoryNotRegisteredException");
describe('Test toJson().', function () {
    const libraryFactoryManager = new LibraryFactoryManager_1.LibraryFactoryManager();
    it('Test Book.', function () {
        const BOOK_NAME = 'Clean Code';
        const BOOK_AUTHOR = 'Robert Cecil Martin';
        const book = new Book_1.Book(BOOK_NAME, BOOK_AUTHOR);
        const bookJsonObject = libraryFactoryManager.produceJsonObject(BookJsonFactory_1.BookJsonFactory, book);
        expect(bookJsonObject.name).toEqual(BOOK_NAME);
        expect(bookJsonObject.author).toEqual(BOOK_AUTHOR);
    });
    it('Test User.', function () {
        const USER_USERID = 1128;
        const USER_USERNAME = 'Zhuojian Chen';
        const BOOK_NAME_1 = 'Clean Code';
        const BOOK_AUTHOR_1 = 'Robert Cecil Martin';
        const BOOK_NAME_2 = 'Society of the Spectacle';
        const BOOK_AUTHOR_2 = 'Guy Debord';
        const user = new User_1.User(USER_USERID, USER_USERNAME);
        const book1 = new Book_1.Book(BOOK_NAME_1, BOOK_AUTHOR_1);
        const book2 = new Book_1.Book(BOOK_NAME_2, BOOK_AUTHOR_2);
        user.addBook(book1);
        user.addBook(book2);
        const userJsonObject = libraryFactoryManager.produceJsonObject(UserJsonFactory_1.UserJsonFactory, user);
        expect(userJsonObject.userId).toBe(USER_USERID);
        expect(userJsonObject.username).toBe(USER_USERNAME);
        expect(userJsonObject.bookArray.length).toBe(2);
        expect([BOOK_NAME_1, BOOK_NAME_2]).toContain(userJsonObject.bookArray[0].name);
        expect([BOOK_AUTHOR_1, BOOK_AUTHOR_2]).toContain(userJsonObject.bookArray[1].author);
    });
    it('Test FactoryNotRegisteredException.', function () {
        const USER_USERID = 1128;
        const USER_USERNAME = 'Zhuojian Chen';
        const BOOK_NAME_1 = 'Clean Code';
        const BOOK_AUTHOR_1 = 'Robert Cecil Martin';
        const BOOK_NAME_2 = 'Society of the Spectacle';
        const BOOK_AUTHOR_2 = 'Guy Debord';
        const user = new User_1.User(USER_USERID, USER_USERNAME);
        const book1 = new Book_1.Book(BOOK_NAME_1, BOOK_AUTHOR_1);
        const book2 = new Book_1.Book(BOOK_NAME_2, BOOK_AUTHOR_2);
        user.addBook(book1);
        user.addBook(book2);
        class FakeLibraryFactoryManger extends FactoryManager_1.FactoryManager {
            constructor() {
                super();
                this.register(UserJsonFactory_1.UserJsonFactory);
            }
        }
        const fakeLibraryFactoryManger = new FakeLibraryFactoryManger();
        expect(() => {
            fakeLibraryFactoryManger.produceJsonObject(UserJsonFactory_1.UserJsonFactory, user);
        }).toThrow(FactoryNotRegisteredException_1.FactoryNotRegisteredException);
    });
});
