import { JsonFactory } from '../../src/JsonFactory';
import { User } from '../User';
import { BookJsonObject } from './BookJsonFactory';
export interface UserJsonObject {
    userId: number;
    username: string;
    bookArray: BookJsonObject[];
}
export declare class UserJsonFactory extends JsonFactory<User, UserJsonObject> {
    fromJson(userJsonObject: UserJsonObject): User;
    toJson(user: User): UserJsonObject;
}
