"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const exceptions_1 = require("../src/exceptions");
describe('queue test', function () {
    it('should be constructed successfully', function () {
        const queue1 = new main_1.Queue();
        expect(queue1.size()).toEqual(0);
        const queue2 = new main_1.Queue([1, 2, 3]);
        expect(queue2.size()).toEqual(3);
    });
    it('should enqueue and dequeue', function () {
        const queue = new main_1.Queue();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        expect(queue.dequeue()).toEqual(10);
        expect(queue.dequeue(2)).toEqual(30);
        expect(() => {
            queue.dequeue();
        }).toThrow(exceptions_1.EmptyQueueException);
    });
    it('should enqueue and poll', function () {
        const queue = new main_1.Queue();
        queue.enqueue(10);
        queue.enqueue(20);
        expect(queue.poll()).toEqual(10);
        expect(queue.poll()).toEqual(20);
        expect(queue.poll()).toEqual(null);
    });
    it('should element and peek', function () {
        const queue = new main_1.Queue();
        queue.enqueue(10);
        expect(queue.element()).toEqual(10);
        expect(queue.peek()).toEqual(10);
        queue.dequeue();
        expect(() => {
            queue.element();
        }).toThrow(exceptions_1.EmptyQueueException);
        expect(() => {
            queue.peek();
        }).not.toThrow(exceptions_1.EmptyQueueException);
    });
    it('should test empty', function () {
        const queue = new main_1.Queue();
        expect(queue.empty()).toEqual(true);
        queue.enqueue(10);
        expect(queue.empty()).toEqual(false);
    });
    it('should search', function () {
        const queue = new main_1.Queue();
        expect(queue.search(10)).toEqual(-1);
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        expect(queue.search(10)).toEqual(1);
        expect(queue.search(50)).toEqual(-1);
    });
    it('should find', function () {
        const queue = new main_1.Queue();
        queue.enqueue('apple');
        queue.enqueue('banana');
        queue.enqueue('cat');
        queue.enqueue('dog');
        expect(queue.find(word => word[0] === 'c')).toEqual(3);
        expect(queue.find(word => word[0] === 'e')).toEqual(-1);
    });
    it('should iterable', function () {
        const queue = new main_1.Queue();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        let count = 0;
        let number = 10;
        // @ts-ignore
        for (const element of queue) {
            count++;
            expect(element).toEqual(number);
            number += 10;
        }
        expect(count).toEqual(queue.size());
    });
});
