"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('Test Lathe class.', () => {
    it('Arithmetic lathe.', () => {
        class ArithmeticLathe extends src_1.FinishingLathe {
        }
        const arithmeticLathe = new ArithmeticLathe();
        arithmeticLathe.addIntermediateDrawings(num => num * 3 + 1);
        arithmeticLathe.addIntermediateDrawings(num => num / 2);
        const result = arithmeticLathe.process(5);
        expect(result).toEqual(8);
    });
});
