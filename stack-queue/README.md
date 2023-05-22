# stack-queue
This is a lightweight library implementing Stack and Queue for TypeScript. Install it with the following command.

~~~bash
npm i @typinghare/stack-queue
~~~

> I know that many JavaScript developers can flexibly use **Array** to implement all functions of stack and queue. Nevertheless, TypeScript developers are not satisfied with Array because readers can hardly identify it as a stack or a queue through the given type definition. As to my own part, I strongly want my code to be neat, readable, and robust. Therefore, I wrote this package, and I hope this can do a favor to some of you guys.

**This package has been tested by Jest, with 100% coverage**.

## Get Started

This package contains two commonly used classes—**Stack** and **Queue**—with some easy-to-operate methods. A simple example of a stack is as follows.

~~~typescript
import { Stack } from '@typinghare/stack-queue';

const smallBag = new Stack<string>();

// push items on the top of the stack
smallBag.push('clothes');
smallBag.push('textbooks');
smallBag.push('biscuit');

// Pop the top item from the stack. This item will be removed.
console.log(smallBag.pop());  // >> biscuit

// Peek the top item from the stack. This item will not be removed.
console.log(smallBag.peek()); // >> textbooks

// Search an item from the stack.
console.log(smallBag.search('clothes'));  // >> 2
~~~

The **Queue** is similar to it.

~~~typescript
import { Queue } from '@typinghare/stack-queue';

const line = new Queue<string>();

// enqueue items to the queue
line.enqueue('Reina');
line.enqueue('Jack');
line.enqueue('Bob');

// dequeue an item
console.log(line.dequeue());  // >> Reina

// Peek the head of the queue. This item will not be removed.
console.log(line.peek());   // >> 'Jack'

// Search an item from the queue.
console.log(line.search('Jack'));  // >> 1
~~~

## Go Further

### Basic Methods

These two classes are basically copied from the Java source code. I notice that `Stack` and `Queue` are written by two different guys, and there are some incoordinations within them, so I adjusted some details and make them perfect.

| Operation | Throw Exception if Empty | Return null if Empty |
| --------- | ------------------------ |--------------------|
| Insert    | `push()` \ `enqueue()`        |    |
| Remove    | `pop()` \ `dequeue()`       | `poll()` |
| Examine   | `element()`              | `peek()`           |

As shown in the table above, method `poll()` returns and removes the top element of a stack or the head element of a queue, or returns null if it is empty; `element()` retrieves but does not remove, the top element of a stack or the head element of a queue, and throws an exception if it is empty; `peek` does as `element()` but returns null if it is empty.

Besides, you can use `size()` to count the number of elements in a stack or a queue; use `empty()` to test if a stack of a queue is empty.

### Quick Initialization

When constructing a stack or a queue, you can feed an iterable argument for a quick initialization as follows. The given elements will be added to the class in iterable order.

~~~typescript
const stack = new Stack<number>([1, 2, 3]);
const queue = new Queue<string>(new Set(['a', 'b', 'c']));
~~~

### Pop or Dequeue Multiple Times at one Invocation

You can pass a number to `pop()` or `dequeue()` and execute pop or dequeue for specified times at one invocation. The method will return the last item or throw an exception if it is empty when at the last execution.

~~~typescript
const stack = new Stack<number>();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.pop(3));	// >> 10
console.log(stack.size());	// >> 0
~~~

The `dequeue()` is the like.

### Search and Find

You can search for an item from a stack or a queue. Notice that the return value is the 1-based depth of the item, so it counts from `1`, not `0`. The method will return `-1` if the item is not in it.

~~~typescript
const stack = new Stack<number>();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.search(10));	// >> 3
console.log(stack.search(40));	// >> -1
~~~

You can also use `find()` to find an item from a stack or a queue with a predicate. The method will return `-1` if the item satisfied is not in it.

~~~typescript
const queue = new Queue<string>();
queue.enqueue('apple');
queue.enqueue('banana');
queue.enqueue('cat');
queue.enqueue('dog');

console.log(queue.find(word => word.at(0) === 'c'));	// >> 3
console.log(queue.find(word => word.at(0) === 'e'));	// >> -1
~~~

## Epilogue and Some Grumbles

I am accustomed to leaving some thoughts at the end of the documentation. NPM is a huge community and owns a large number of excellent packages. But there is not enough specification and developers follow their ideas at their like, which I think is a little bit debatable. When I was writing this package I kept thinking that why do I have to write this basic library by consuming so much time? But I could not find one that is eligible for my requirements. Many of them are old and do not support TypeScript. I really wish that one day in the future, TypeScript can become an independent language and use its own interpreter and VM, and provides more basic classes like Java. To be honest, I don't like Java's syntax, which is really bloated.

It's the eighth month since I moved to America. I am studying at a community college and FASFA said I am not eligible for financial aid. My family is experiencing a severe deficit problem and I am still unemployed. People say American companies will not accept my out-of-country diploma and thus I cannot find a good job for the time being. I cannot handle the exaggerated inflation and don't see any hope for my desolate future. I wanna suicide, but programming keeps me alive. See how many libraries and projects I can finish before the end of my fragile life. : )

