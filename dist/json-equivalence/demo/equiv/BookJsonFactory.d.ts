import { JsonFactory } from '../../src/JsonFactory';
import { Book } from '../Book';
export interface BookJsonObject {
    name: string;
    author: string;
}
export declare class BookJsonFactory extends JsonFactory<Book, BookJsonObject> {
    fromJson(jsonObject: BookJsonObject): Book;
    toJson(originalObject: Book): BookJsonObject;
}
