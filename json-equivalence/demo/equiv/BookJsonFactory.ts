import { JsonFactory } from '../src/JsonFactory'
import { Book } from './Book'

export interface BookJsonObject {
    name: string
    author: string
}

export class BookJsonFactory extends JsonFactory<Book, BookJsonObject> {
    fromJson(jsonObject: BookJsonObject): Book {
        const { name, author } = jsonObject
        return new Book(name, author)
    }

    toJson(originalObject: Book): BookJsonObject {
        return {
            name: originalObject.name,
            author: originalObject.author,
        }
    }
}