"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
/**
 * @author James Chan
 */
class Queue {
    /**
     * To create an empty queue or a queue with given elements in a form of iterable.
     * @param iterable an iterable object to quickly initialize this queue.
     */
    constructor(iterable) {
        /**
         * The container of elements.
         * @private
         */
        this.internalElement = [];
        if (iterable) {
            for (const element of iterable) {
                this.enqueue(element);
            }
        }
    }
    /**
     * Iterable implementation.
     */
    *[Symbol.iterator]() {
        for (let i = 0; i < this.internalElement.length; ++i) {
            yield this.internalElement[i];
        }
    }
    /**
     * Insert the specified element into this queue.
     * @param item the item to insert
     */
    enqueue(item) {
        this.internalElement.push(item);
        return item;
    }
    /**
     * (when <count> is default) Retrieves and remove the head of this queue.
     * This method differs from poll() only in that it throws an exception if this queue is empty.
     * (when <count> is greater than 1) Executes <count> times of dequeue and return the last item.
     * Item traveled will be removed, including the returned one.
     * @param count the number of times executing dequeue, the default value is 1
     * @return the head of this queue or the last dequeue item
     * @throws EmptyQueueException (when <count> is default) if this queue is empty
     * @throws EmptyQueueException (when <count> is greater than 1) if this queue is empty when the
     * last queue is being executed
     */
    dequeue(count = 1) {
        let item;
        for (let i = 0; i < count; ++i) {
            item = this.internalElement.shift();
        }
        if (item === undefined) {
            throw new exceptions_1.EmptyQueueException();
        }
        return item;
    }
    /**
     * Retrieves and remove the head of this queue, or returns null if this queue is empty.
     * @return the head of this queue, or null if this queue is empty
     */
    poll() {
        const item = this.internalElement.shift();
        return item === undefined ? null : item;
    }
    /**
     * Retrieves, but does not remove, the head of this queue.
     * This method differs from peek() only in that it throws an exception if this queue is empty.
     * @return the head of this queue
     * @throws EmptyQueueException if this queue is empty
     */
    element() {
        if (this.internalElement.length === 0) {
            throw new exceptions_1.EmptyQueueException();
        }
        return this.internalElement[0];
    }
    /**
     * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
     * @return the head of this queue, or null if this queue is empty
     */
    peek() {
        if (this.internalElement.length === 0) {
            return null;
        }
        return this.internalElement[0];
    }
    /**
     * Returns the number of elements in this queue.
     * @return the number of elements in this queue
     */
    size() {
        return this.internalElement.length;
    }
    /**
     * Tests if this queue is empty.
     * @return true if this queue contains no items, false otherwise
     */
    empty() {
        return this.size() === 0;
    }
    /**
     * Returns the position of an item in this queue.
     * @param item the item to search for
     * @return the 1-based depth of the item, or -1 if the item is not in this queue
     */
    search(item) {
        if (this.empty()) {
            return -1;
        }
        const index = this.internalElement.indexOf(item);
        return index == -1 ? -1 : index + 1;
    }
    /**
     * Iterates over elements of this queue, returning the first element predicate returns true for.
     * @param predicate the function invoked per iteration.
     * @return the 1-based depth of the item, or -1 if the item satisfied is not in this queue
     */
    find(predicate) {
        let position = 1;
        let found = false;
        for (const element of this) {
            if (predicate(element)) {
                found = true;
                break;
            }
            position++;
        }
        return found ? position : -1;
    }
    /**
     * Returns the elements array of this queue.
     * @since 0.1.0
     */
    get elements() {
        return this.internalElement;
    }
    /**
     * A helper function of traversing elements in this queue.
     * @param callback
     * @since 0.1.0
     */
    each(callback) {
        this.internalElement.forEach(callback);
    }
    /**
     * A helper function of traversing elements backward in this queue.
     * @param callback
     * @since 0.1.0
     */
    inverseEach(callback) {
        for (let i = this.internalElement.length - 1; i >= 0; --i) {
            callback(this.internalElement[i], i, this.internalElement);
        }
    }
    /**
     * Returns the length of the queue.
     */
    get length() {
        return this.internalElement.length;
    }
    /**
     * Returns the element at the specified index.
     * @param index The index of the element to retrieve.
     */
    item(index) {
        return this.internalElement[index];
    }
}
exports.default = Queue;
