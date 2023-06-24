import { JsonFactory } from '../../src/JsonFactory'
import { Book } from '../Book'
import { ForClass } from '../../src/decorator/ForClass'

export interface BookJsonObject {
    name: string
    author: string
}

@ForClass(Book)
// @ts-ignore
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