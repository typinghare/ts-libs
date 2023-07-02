import { EmptyQueueException } from './exceptions';
import { SearchPredicate } from './type';

/**
 * @author James Chan
 */
export default class Queue<E = any> implements Iterable<E>, ArrayLike<E>{
    /**
     * The container of elements.
     * @private
     */
    private internalElement: E[] = [];

    /**
     * To create an empty queue.
     */
    public constructor();
    /**
     * To create an empty queue or a queue with given elements in a form of iterable.
     * @param iterable an iterable object to quickly initialize this queue.
     */
    public constructor(iterable: Iterable<E>);
    /**
     * To create an empty queue or a queue with given elements in a form of iterable.
     * @param iterable an iterable object to quickly initialize this queue.
     */
    public constructor(iterable?: Iterable<E>) {
        if (iterable) {
            for (const element of iterable) {
                this.enqueue(element);
            }
        }
    }

    /**
     * Iterable implementation.
     */
    * [Symbol.iterator](): Generator<E, void> {
        for (let i = 0; i < this.internalElement.length; ++i) {
            yield this.internalElement[i];
        }
    }

    /**
     * Insert the specified element into this queue.
     * @param item the item to insert
     */
    public enqueue(item: E): E {
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
    public dequeue(count: number = 1): E {
        let item;

        for (let i = 0; i < count; ++i) {
            item = this.internalElement.shift();
        }

        if (item === undefined) {
            throw new EmptyQueueException();
        }

        return item;
    }

    /**
     * Retrieves and remove the head of this queue, or returns null if this queue is empty.
     * @return the head of this queue, or null if this queue is empty
     */
    public poll(): E | null {
        const item = this.internalElement.shift();
        return item === undefined ? null : item;
    }

    /**
     * Retrieves, but does not remove, the head of this queue.
     * This method differs from peek() only in that it throws an exception if this queue is empty.
     * @return the head of this queue
     * @throws EmptyQueueException if this queue is empty
     */
    public element(): E {
        if (this.internalElement.length === 0) {
            throw new EmptyQueueException();
        }

        return this.internalElement[0];
    }

    /**
     * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
     * @return the head of this queue, or null if this queue is empty
     */
    public peek(): E | null {
        if (this.internalElement.length === 0) {
            return null;
        }

        return this.internalElement[0];
    }

    /**
     * Returns the number of elements in this queue.
     * @return the number of elements in this queue
     */
    public size(): number {
        return this.internalElement.length;
    }

    /**
     * Tests if this queue is empty.
     * @return true if this queue contains no items, false otherwise
     */
    public empty(): boolean {
        return this.size() === 0;
    }

    /**
     * Returns the position of an item in this queue.
     * @param item the item to search for
     * @return the 1-based depth of the item, or -1 if the item is not in this queue
     */
    public search(item: E): number {
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
    public find(predicate: SearchPredicate<E>): number {
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
    public get elements(): E[] {
        return this.internalElement;
    }

    /**
     * A helper function of traversing elements in this queue.
     * @param callback
     * @since 0.1.0
     */
    public each(callback: (value: E, index?: number, array?: E[]) => void) {
        this.internalElement.forEach(callback);

    }

    /**
     * A helper function of traversing elements backward in this queue.
     * @param callback
     * @since 0.1.0
     */
    public inverseEach(callback: (value: E, index?: number, array?: E[]) => void) {
        for (let i = this.internalElement.length - 1; i >= 0; --i) {
            callback(this.internalElement[i], i, this.internalElement);
        }
    }

    /**
     * Returns the length of the queue.
     */
    public get length(): number {
        return this.internalElement.length;
    }

    /**
     * Returns the element at the specified index.
     * @param index The index of the element to retrieve.
     */
    public item(index: number): E {
        return this.internalElement[index];
    }

    /**
     * Index signature required by ArrayLike<E> interface.
     */
    [index: number]: E;
}