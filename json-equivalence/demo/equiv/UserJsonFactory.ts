import { JsonFactory } from '../../src/JsonFactory'
import { User } from '../User'
import { BookJsonFactory, BookJsonObject } from './BookJsonFactory'
import { ForClass } from '../../src/decorator/ForClass'
import { Book } from '../Book'

export interface UserJsonObject {
    userId: number,
    username: string,
    bookArray: BookJsonObject[]
}

@ForClass(User)
// @ts-ignore
export class UserJsonFactory extends JsonFactory<User, UserJsonObject> {
    fromJson(userJsonObject: UserJsonObject): User {
        const { userId, username, bookArray } = userJsonObject
        const bookJsonFactory = this.getFactory(BookJsonFactory)

        const user = new User(userId, username)
        for (const book of bookArray) {
            user.addBook(bookJsonFactory.fromJson(book))
        }

        return user
    }

    toJson(user: User): UserJsonObject {
        const bookJsonFactory = this.getFactory(BookJsonFactory)
        const bookArray = [] as BookJsonObject[]
        user.getBookSet().forEach(book => {
            bookArray.push(bookJsonFactory.toJson(book))
        })

        return {
            userId: user.userId,
            username: user.username,
            bookArray: bookArray,
        }
    }
}