"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
/**
 * @author James Chan
 */
class Stack {
    /**
     * To create an empty stack or a stack with given elements in a form of iterable.
     * @param iterable an iterable object to quickly initialize this stack.
     */
    constructor(iterable) {
        /**
         * The container of elements.
         * @private
         */
        this._elements = [];
        if (iterable) {
            for (const element of iterable) {
                this.push(element);
            }
        }
    }
    /**
     * Iterable implementation.
     */
    *[Symbol.iterator]() {
        for (let i = this._elements.length - 1; i >= 0; --i) {
            yield this._elements[i];
        }
    }
    /**
     * Pushes an item onto the top of this stack.
     * @param item the item to push onto this stack
     * @return the item argument
     */
    push(item) {
        this._elements.push(item);
        return item;
    }
    /**
     * (when <count> is default) Pops an item from this stack and returns it.
     * The item popped is removed from this stack.
     * This method differs from poll() only in that it throws an exception if this stack is empty.
     * (when <count> is greater than 1) Executes <count> times of pop and return the last item.
     * Item traveled will be removed, including the returned one.
     * @param count the number of times executing pop, the default value is 1
     * @return the item popped from this stack or the last pop item
     * @throws EmptyStackException (when <count> is default) if this stack is empty
     * @throws EmptyStackException (when <count> is greater than 1) if this stack is empty when the
     * last pop is being executed
     */
    pop(count = 1) {
        let item;
        for (let i = 0; i < count; ++i) {
            item = this._elements.pop();
        }
        if (item === undefined) {
            throw new exceptions_1.EmptyStackException();
        }
        return item;
    }
    /**
     * Pops an item from this stack and returns it, or returns null if this stack is empty.
     * The item popped is removed from this stack.
     * @return the top item on this stack, or null if the stack is empty
     */
    poll() {
        const item = this._elements.pop();
        return item === undefined ? null : item;
    }
    /**
     * Returns the top item on this stack without removing it.
     * This method differs from peek() only in that it throws an exception if this stack is empty.
     * @return the top item on this stack
     * @throws EmptyStackException if this stack is empty
     */
    element() {
        if (this._elements.length === 0) {
            throw new exceptions_1.EmptyStackException();
        }
        return this._elements[this._elements.length - 1];
    }
    /**
     * Returns the top item on this stack without removing it, or returns null if this stack is empty.
     * @return the top item on this stack
     * @throws EmptyStackException if this stack is empty
     */
    peek() {
        if (this._elements.length === 0) {
            return null;
        }
        return this._elements[this._elements.length - 1];
    }
    /**
     * Returns the number of elements in this stack.
     * @return the number of elements in this stack.
     */
    size() {
        return this._elements.length;
    }
    /**
     * Tests if this stack is empty.
     * @return true if this stack contains no items, false otherwise
     */
    empty() {
        return this.size() === 0;
    }
    /**
     * Returns the 1-based position where an element is on this stack.
     * If the element occurs as an item in this stack, this method returns the distance from the
     * top of this stack of the occurrence nearest the top of this stack; the topmost item on the
     * stack is considered to be at distance 1.
     * @param item the item to search for
     * @return the 1-based depth of the item, or -1 if the item is not on this stack
     */
    search(item) {
        if (this._elements.length == 0) {
            return -1;
        }
        const index = this._elements.indexOf(item);
        return index == -1 ? -1 : this._elements.length - index;
    }
    /**
     * Iterates over elements of this stack, returning the first element predicate returns true for.
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
     * Returns the elements array of this stack.
     * @since 0.1.0
     */
    get elements() {
        return this._elements;
    }
    /**
     * A helper function of traversing elements in this stack.
     * @param callback
     * @since 0.1.0
     */
    each(callback) {
        for (let i = this._elements.length - 1; i >= 0; --i) {
            callback(this._elements[i], i, this._elements);
        }
    }
    /**
     * A helper function of traversing elements backward in this stack.
     * @param callback
     * @since 0.1.0
     */
    inverseEach(callback) {
        this._elements.forEach(callback);
    }
}
exports.default = Stack;
