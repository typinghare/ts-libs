import { Queue } from '../src/main';
import { EmptyQueueException } from '../src/exceptions';

describe('queue test', function() {
  it('should be constructed successfully', function() {
    const queue1 = new Queue();
    expect(queue1.size()).toEqual(0);

    const queue2 = new Queue([1, 2, 3]);
    expect(queue2.size()).toEqual(3);
  });

  it('should enqueue and dequeue', function() {
    const queue = new Queue<number>();
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);

    expect(queue.dequeue()).toEqual(10);
    expect(queue.dequeue(2)).toEqual(30);
    expect(() => {
      queue.dequeue();
    }).toThrow(EmptyQueueException);
  });

  it('should enqueue and poll', function() {
    const queue = new Queue<number>();
    queue.enqueue(10);
    queue.enqueue(20);

    expect(queue.poll()).toEqual(10);
    expect(queue.poll()).toEqual(20);
    expect(queue.poll()).toEqual(null);
  });

  it('should element and peek', function() {
    const queue = new Queue();
    queue.enqueue(10);
    expect(queue.element()).toEqual(10);
    expect(queue.peek()).toEqual(10);

    queue.dequeue();
    expect(() => {
      queue.element();
    }).toThrow(EmptyQueueException);
    expect(() => {
      queue.peek();
    }).not.toThrow(EmptyQueueException);
  });

  it('should test empty', function() {
    const queue = new Queue();
    expect(queue.empty()).toEqual(true);

    queue.enqueue(10);
    expect(queue.empty()).toEqual(false);
  });

  it('should search', function() {
    const queue = new Queue<number>();

    expect(queue.search(10)).toEqual(-1);

    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);

    expect(queue.search(10)).toEqual(1);
    expect(queue.search(50)).toEqual(-1);
  });

  it('should find', function() {
    const queue = new Queue<string>();
    queue.enqueue('apple');
    queue.enqueue('banana');
    queue.enqueue('cat');
    queue.enqueue('dog');

    expect(queue.find(word => word.at(0) === 'c')).toEqual(3);
    expect(queue.find(word => word.at(0) === 'e')).toEqual(-1);
  });

  it('should iterable', function() {
    const queue = new Queue<number>();
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);

    let count = 0;
    let number = 10;
    for (const element of queue) {
      count++;
      expect(element).toEqual(number);
      number += 10;
    }
    expect(count).toEqual(queue.size());
  });
});