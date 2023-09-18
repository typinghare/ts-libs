"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookJsonFactory = void 0;
const JsonFactory_1 = require("../../src/JsonFactory");
const Book_1 = require("../Book");
const ForClass_1 = require("../../src/decorator/ForClass");
let BookJsonFactory = class BookJsonFactory extends JsonFactory_1.JsonFactory {
    fromJson(jsonObject) {
        const { name, author } = jsonObject;
        return new Book_1.Book(name, author);
    }
    toJson(originalObject) {
        return {
            name: originalObject.name,
            author: originalObject.author,
        };
    }
};
exports.BookJsonFactory = BookJsonFactory;
exports.BookJsonFactory = BookJsonFactory = __decorate([
    (0, ForClass_1.ForClass)(Book_1.Book)
    // @ts-ignore
], BookJsonFactory);
