"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJsonFactory = void 0;
const JsonFactory_1 = require("../../src/JsonFactory");
const User_1 = require("../User");
const BookJsonFactory_1 = require("./BookJsonFactory");
const ForClass_1 = require("../../src/decorator/ForClass");
let UserJsonFactory = class UserJsonFactory extends JsonFactory_1.JsonFactory {
    fromJson(userJsonObject) {
        const { userId, username, bookArray } = userJsonObject;
        const bookJsonFactory = this.getFactory(BookJsonFactory_1.BookJsonFactory);
        const user = new User_1.User(userId, username);
        for (const book of bookArray) {
            user.addBook(bookJsonFactory.fromJson(book));
        }
        return user;
    }
    toJson(user) {
        const bookJsonFactory = this.getFactory(BookJsonFactory_1.BookJsonFactory);
        const bookArray = [];
        user.getBookSet().forEach(book => {
            bookArray.push(bookJsonFactory.toJson(book));
        });
        return {
            userId: user.userId,
            username: user.username,
            bookArray: bookArray,
        };
    }
};
exports.UserJsonFactory = UserJsonFactory;
exports.UserJsonFactory = UserJsonFactory = __decorate([
    (0, ForClass_1.ForClass)(User_1.User)
    // @ts-ignore
], UserJsonFactory);
