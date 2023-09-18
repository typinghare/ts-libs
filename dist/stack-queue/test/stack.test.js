"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const exceptions_1 = require("../src/exceptions");
describe('stack test', function () {
    it('should be constructed successfully', function () {
        const stack1 = new main_1.Stack();
        expect(stack1.size()).toEqual(0);
        const stack2 = new main_1.Stack([1, 2, 3]);
        expect(stack2.size()).toEqual(3);
        expect(stack2.peek()).toEqual(3);
    });
    it('should push and pop', function () {
        const stack = new main_1.Stack();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        expect(stack.pop()).toEqual(30);
        expect(stack.pop(2)).toEqual(10);
        expect(() => {
            stack.pop();
        }).toThrow(exceptions_1.EmptyStackException);
    });
    it('should push and poll', function () {
        const stack = new main_1.Stack();
        stack.push(10);
        stack.push(20);
        expect(stack.poll()).toEqual(20);
        expect(stack.poll()).toEqual(10);
        expect(stack.poll()).toEqual(null);
    });
    it('should element and peek', function () {
        const stack = new main_1.Stack();
        stack.push(10);
        expect(stack.element()).toEqual(10);
        expect(stack.peek()).toEqual(10);
        stack.pop();
        expect(() => {
            stack.element();
        }).toThrow(exceptions_1.EmptyStackException);
        expect(() => {
            stack.peek();
        }).not.toThrow(exceptions_1.EmptyStackException);
    });
    it('should test empty', function () {
        const stack = new main_1.Stack();
        expect(stack.empty()).toEqual(true);
        stack.push(10);
        expect(stack.empty()).toEqual(false);
    });
    it('should search', function () {
        const stack = new main_1.Stack();
        expect(stack.search(10)).toEqual(-1);
        stack.push(10);
        stack.push(20);
        stack.push(30);
        expect(stack.search(10)).toEqual(3);
        expect(stack.search(50)).toEqual(-1);
    });
    it('should find', function () {
        const stack = new main_1.Stack();
        stack.push('apple');
        stack.push('banana');
        stack.push('cat');
        stack.push('dog');
        expect(stack.find(word => word.at(0) === 'c')).toEqual(2);
        expect(stack.find(word => word.at(0) === 'e')).toEqual(-1);
    });
    it('should iterable', function () {
        const stack = new main_1.Stack();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        let count = 0;
        let number = 30;
        for (const element of stack) {
            count++;
            expect(element).toEqual(number);
            number -= 10;
        }
        expect(count).toEqual(stack.size());
    });
});
